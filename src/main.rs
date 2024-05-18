use anyhow::Context;
use bats::{
    plugins::{discover_ae_app_dirs, discover_plugins, PluginMap},
    settings::Settings,
};
use eframe::egui;

fn main() -> anyhow::Result<()> {
    env_logger::init();

    let settings = Settings::load().with_context(|| "Failed to load settings")?;

    let app_dirs = discover_ae_app_dirs(&settings).with_context(|| {
        format!(
            "Could not discover AE application directories in {}",
            settings.ae_parent_dir.to_string_lossy()
        )
    })?;

    let plugin_map = discover_plugins(&app_dirs).with_context(|| {
        format!(
            "Could not discover plugins in {}",
            settings.ae_parent_dir.to_string_lossy()
        )
    })?;

    let native_options = eframe::NativeOptions::default();
    eframe::run_native(
        "Bats!",
        native_options,
        Box::new(|cc| Box::new(BatsApp::new(cc, plugin_map))),
    )
    .unwrap();

    Ok(())
}

#[derive(Default)]
struct BatsApp {
    plugin_map: PluginMap,
}

impl BatsApp {
    fn new(_cc: &eframe::CreationContext<'_>, plugin_map: PluginMap) -> Self {
        Self { plugin_map }
    }
}

impl eframe::App for BatsApp {
    fn update(&mut self, ctx: &egui::Context, _frame: &mut eframe::Frame) {
        egui::CentralPanel::default().show(ctx, |_ui| {});
    }
}
