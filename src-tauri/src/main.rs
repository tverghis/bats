// Prevents additional console window on Windows in release, DO NOT REMOVE!!
#![cfg_attr(not(debug_assertions), windows_subsystem = "windows")]

use bats::commands;

fn main() {
    env_logger::init();

    tauri::Builder::default()
        .invoke_handler(tauri::generate_handler![commands::discover_ae_app_dirs])
        .run(tauri::generate_context!())
        .expect("error while running tauri application");
}
