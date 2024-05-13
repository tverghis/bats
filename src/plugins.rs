use std::{
    collections::HashMap,
    ffi::OsString,
    fs::{self, DirEntry},
    ops::Not,
};

use anyhow::Context;
use log::info;

use crate::settings::Settings;

const IGNORE_FILES: [&str; 1] = [".DS_Store"];

pub fn discover_plugins(settings: &Settings) -> anyhow::Result<HashMap<OsString, Vec<OsString>>> {
    info!(
        "Discovering After Effects application directories in {:?}",
        &settings.ae_parent_dir
    );

    let mut out: HashMap<OsString, Vec<OsString>> = HashMap::new();

    let ae_application_dirs: Vec<_> = fs::read_dir(&settings.ae_parent_dir)
        .with_context(|| {
            format!(
                "Could not list entries in After Effects parent directory {}",
                settings.ae_parent_dir.to_string_lossy()
            )
        })?
        .filter_map(|e| match e {
            Ok(dir_entry) => validate_ae_dir_entry(dir_entry),
            Err(_) => None,
        })
        .collect();

    for app_dir in ae_application_dirs.iter() {
        let plugins = dir_plugins(app_dir).with_context(|| {
            format!(
                "Could not read plugins for {}",
                app_dir.file_name().to_string_lossy()
            )
        })?;

        for plugin in plugins.iter() {
            let e = out.entry(plugin.file_name()).or_insert(Vec::new());
            e.push(app_dir.file_name());
        }
    }

    Ok(dbg!(out))
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

fn dir_plugins(dir_entry: &DirEntry) -> anyhow::Result<Vec<DirEntry>> {
    let plugin_dir = dir_entry.path().join("Plug-ins");

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
