use std::{collections::HashMap, path::PathBuf};

use log::{error, info};

use crate::{
    plugins::{self, AeVersion, PluginMap},
    settings::Settings,
};

use tap::{
    tap::{TapFallible, TapOptional},
    Pipe,
};

#[tauri::command]
pub fn discover_ae_app_dirs() -> Vec<AeVersion> {
    info!("discover_ae_app_dirs invoked");

    get_app_dirs()
        .iter()
        .map(|dir| {
            dir.file_name()
                .map(|name| name.to_string_lossy().into_owned())
                .tap_none(|| error!("File name is None for {:?}", dir))
                .unwrap_or(String::from("undefined"))
        })
        .collect()
}

#[tauri::command]
pub fn discover_plugins() -> PluginMap {
    info!("discover_plugins invoked");

    get_app_dirs()
        .pipe(|dirs| plugins::discover_plugins(&dirs))
        .tap_err(|err| error!("Failed to discover plugins: {}", err))
        .unwrap_or(HashMap::new())
}

fn get_app_dirs() -> Vec<PathBuf> {
    let settings = Settings::load_fallible();

    plugins::discover_ae_app_dirs(&settings)
        .tap_err(|err| error!("Failed to discover AE app directories: {}", err))
        .unwrap_or(Vec::new())
}
