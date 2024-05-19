use log::{error, info};

use crate::{
    plugins::{self, AeVersion, PluginMap},
    settings::Settings,
};

use tap::tap::{TapFallible, TapOptional};

#[tauri::command]
pub fn discover_ae_app_dirs() -> Vec<AeVersion> {
    info!("discover_ae_app_dirs invoked");

    let settings = Settings::load_fallible();

    plugins::discover_ae_app_dirs(&settings)
        .tap_err(|err| error!("Failed to discover AE app directories: {}", err))
        .unwrap_or(Vec::new())
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

    let settings = Settings::load_fallible();
    let dirs = plugins::discover_ae_app_dirs(&settings).unwrap();

    plugins::discover_plugins(&dirs).unwrap()
}
