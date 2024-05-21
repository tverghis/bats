use std::{
    collections::HashMap,
    fs::{self, DirEntry},
    ops::Not,
    path::{Path, PathBuf},
};

use anyhow::Context;
use log::info;

use crate::settings::Settings;

const IGNORE_FILES: [&str; 1] = [".DS_Store"];

pub type AeVersion = String;
pub type PluginName = String;
pub type PluginMap = HashMap<PluginName, HashMap<AeVersion, bool>>;

/// Discovers all After Effects installations in the configured location.
/// Returns a `Vec` of the absolute paths pointing to the discovered directories.
pub fn discover_ae_app_dirs(settings: &Settings) -> anyhow::Result<Vec<PathBuf>> {
    info!(
        "Discovering After Effects application directories in {:?}",
        &settings.ae_parent_dir
    );

    let dirs = fs::read_dir(&settings.ae_parent_dir)?
        .filter_map(|e| match e {
            Ok(dir_entry) => validate_ae_dir_entry(dir_entry),
            Err(_) => None,
        })
        .map(|e| e.path())
        .collect();

    Ok(dirs)
}

pub fn discover_plugins(app_dirs: &[PathBuf]) -> anyhow::Result<PluginMap> {
    let mut out: PluginMap = HashMap::new();

    for app_dir in app_dirs.iter() {
        // .unwrap() is justified -- these directories must have names, since we are iterating through a Vec of directories.
        let dir_name = app_dir.file_name().unwrap().to_string_lossy().to_string();

        let plugins = dir_plugins(app_dir)
            .with_context(|| format!("Could not read plugins for {}", dir_name))?;

        for plugin in plugins.iter() {
            let e = out.entry(plugin.to_owned()).or_default();

            e.insert(dir_name.clone(), true);
        }
    }

    for (_, m) in out.iter_mut() {
        for app_dir in app_dirs.iter() {
            let dir_name = app_dir.file_name().unwrap().to_string_lossy().to_string();
            m.entry(dir_name).or_insert(false);
        }
    }

    info!(
        "Discovered {} plugins in {} application directories.",
        out.values().len(),
        app_dirs.len()
    );

    Ok(out)
}

// Check if a `DirEntry` represents an Adobe After Effects application directory
fn validate_ae_dir_entry(dir_entry: DirEntry) -> Option<DirEntry> {
    if !dir_entry
        .file_name()
        .to_string_lossy()
        .starts_with("Adobe After Effects")
    {
        return None;
    }

    match dir_entry.file_type() {
        Ok(ft) if ft.is_dir() => Some(dir_entry),
        _ => None,
    }
}

fn dir_plugins(dir: &Path) -> anyhow::Result<Vec<PluginName>> {
    let plugin_dir = dir.join("Plug-ins");

    if let Err(e) = fs::metadata(&plugin_dir) {
        match e.kind() {
            std::io::ErrorKind::NotFound => return Ok(Vec::new()),
            _ => anyhow::bail!(e),
        }
    }

    Ok(fs::read_dir(&plugin_dir)?
        .filter_map(Result::ok)
        .filter(is_ignored_file)
        .map(|dir_entry| dir_entry.file_name().to_string_lossy().to_string())
        .collect())
}

fn is_ignored_file(dir_entry: &DirEntry) -> bool {
    let path = dir_entry.path();

    IGNORE_FILES
        .iter()
        .any(|ignore| path.ends_with(ignore))
        .not()
}
