use anyhow::Context;
use bats::{
    plugins::{discover_ae_app_dirs, discover_plugins},
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

    let _ = discover_plugins(&app_dirs);

    let native_options = eframe::NativeOptions::default();
    eframe::run_native(
        "Bats!",
        native_options,
        Box::new(|cc| Box::new(BatsApp::new(cc))),
    )
    .unwrap();

    Ok(())
}

#[derive(Default)]
struct BatsApp {}

impl BatsApp {
    fn new(_cc: &eframe::CreationContext<'_>) -> Self {
        Self::default()
    }
}

impl eframe::App for BatsApp {
    fn update(&mut self, ctx: &egui::Context, _frame: &mut eframe::Frame) {
        egui::CentralPanel::default().show(ctx, |_ui| {});
    }
}
