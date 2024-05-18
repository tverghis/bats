use log::{error, info, warn};
use std::{fs::File, io::Read, path::PathBuf};

use serde::{Deserialize, Serialize};

/// Settings that drive Bats functionality
#[derive(Debug, Serialize, Deserialize)]
pub struct Settings {
    /// Directory in which the After Effects applications are installed
    pub ae_parent_dir: PathBuf,
}

impl Settings {
    /// Load settings from expected locations.
    /// First, we try to load it from the configuration directory for Bats.
    /// If that file does not exist, cannot be read, or TOML deserialization fails, then the default settings are used.
    pub fn load() -> anyhow::Result<Self> {
        let config_file_path = format!(
            "{}/Library/Application Support/bats/config.toml",
            env!("HOME")
        );

        match File::open(&config_file_path) {
            Ok(file) => Self::from_config_file_or_default(file),
            Err(e) => {
                warn!(
                    "Failed to load config file from {}: {}. Using default settings.",
                    config_file_path, e
                );
                Ok(Self::default())
            }
        }
    }

    fn from_config_file_or_default(mut file: File) -> anyhow::Result<Self> {
        let mut buf = String::new();

        file.read_to_string(&mut buf)?;
        match toml::from_str(&buf) {
            Ok(s) => {
                info!("Successfully loaded config.toml.");
                Ok(s)
            }
            Err(_) => {
                error!("Failed to parse config.toml. Using default settings.");
                Ok(Self::default())
            }
        }
    }
}

impl Default for Settings {
    fn default() -> Self {
        let ae_parent_dir = PathBuf::from("/Applications");
        Self { ae_parent_dir }
    }
}
