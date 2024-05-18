use std::path::PathBuf;

use log::info;

use crate::{plugins, settings::Settings};

#[tauri::command]
pub fn discover_ae_app_dirs() -> Vec<PathBuf> {
    info!("discover_ae_app_dirs invoked");

    let settings = Settings::load().unwrap();

    plugins::discover_ae_app_dirs(&settings).unwrap()
}
