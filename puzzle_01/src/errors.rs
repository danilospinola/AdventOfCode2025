//! Errors
use thiserror::Error;

#[derive(Error, Debug)]
pub enum LoadError {
    #[error("IO error: {0}")]
    Io(#[from] std::io::Error),

    #[error("Invalid line format: {0}")]
    InvalidLine(String),

    #[error("Invalid direction: {0}")]
    InvalidDirection(String),

    #[error("Failed to parse steps in '{line}': {source}")]
    ParseSteps {
        line: String,
        source: std::num::ParseIntError,
    },
}
