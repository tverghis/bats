use bats::{plugins::discover_plugins, settings::Settings};
use eframe::egui;

fn main() {
    env_logger::init();

    let settings = Settings::load().unwrap();
    let _ = discover_plugins(&settings);

    let native_options = eframe::NativeOptions::default();
    eframe::run_native(
        "Bats!",
        native_options,
        Box::new(|cc| Box::new(BatsApp::new(cc))),
    )
    .unwrap();
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
