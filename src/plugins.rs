use std::{
    collections::HashMap,
    ffi::OsString,
    fs::{self, DirEntry},
    ops::Not,
    path::{Path, PathBuf},
};

use anyhow::Context;
use log::info;

use crate::settings::Settings;

const IGNORE_FILES: [&str; 1] = [".DS_Store"];

pub type PluginMap = HashMap<OsString, Vec<OsString>>;

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
    let mut out: HashMap<OsString, Vec<OsString>> = HashMap::new();
    let mut total_plugin_count: u32 = 0;

    for app_dir in app_dirs.iter() {
        // .unwrap() is justified -- these directories must have names, since we are iterating through a Vec of directories.
        let dir_name = app_dir.file_name().unwrap();

        let plugins = dir_plugins(app_dir).with_context(|| {
            format!("Could not read plugins for {}", dir_name.to_string_lossy())
        })?;

        for plugin in plugins.iter() {
            let e = out.entry(plugin.file_name()).or_default();
            e.push(dir_name.to_owned());
            total_plugin_count += 1;
        }
    }

    info!(
        "Discovered {} plugins in {} application directories.",
        total_plugin_count,
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

fn dir_plugins(dir: &Path) -> anyhow::Result<Vec<DirEntry>> {
    let plugin_dir = dir.join("Plug-ins");

    Ok(fs::read_dir(plugin_dir)?
        .filter_map(Result::ok)
        .filter(is_ignored_file)
        .collect())
}

fn is_ignored_file(dir_entry: &DirEntry) -> bool {
    let path = dir_entry.path();

    IGNORE_FILES
        .iter()
        .any(|ignore| path.ends_with(ignore))
        .not()
}
