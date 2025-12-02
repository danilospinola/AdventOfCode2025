//! Instructions and related functionality

use crate::errors::LoadError;
use regex::Regex;
use std::{str::FromStr, sync::LazyLock};
use tracing::error;

/// Represents a turning direction
#[derive(Debug)]
pub enum Direction {
    /// Turn left
    Left,
    /// Turn right
    Right,
}

impl FromStr for Direction {
    type Err = LoadError;

    fn from_str(s: &str) -> Result<Self, Self::Err> {
        match s {
            "L" => Ok(Direction::Left),
            "R" => Ok(Direction::Right),
            s => Err(LoadError::InvalidDirection(s.to_string())),
        }
    }
}

/// Represents a movement instruction with direction and steps
#[derive(Debug)]
pub struct Instruction {
    pub direction: Direction,
    pub steps: i32,
}

/// Regular expression to validate instruction lines loaded Lazily
static REGEX: LazyLock<Regex> = LazyLock::new(|| Regex::new(r"^[LR][A-Za-z0-9_]*\d+$").unwrap());

/// Load instructions from a file at the given path, and parse them into a vector of `Instruction`s.
/// where each line in the file should match the expected format. L or R followed by an integer,
/// e.g., "L45" or "R10", becomes an `Instruction`.
pub fn load_input(path: &str) -> Result<Vec<Instruction>, LoadError> {
    let content = std::fs::read_to_string(path)?;
    let mut out = Vec::new();

    for line in content.lines() {
        if !REGEX.is_match(line) {
            error!("Regex mismatch '{}'", line);
            return Err(LoadError::InvalidLine(line.to_string()));
        }

        let (dir_text, steps_text) = line.split_at(1);
        let direction = Direction::from_str(dir_text)?;
        let steps = steps_text
            .parse::<i32>()
            .map_err(|e| LoadError::ParseSteps {
                line: line.to_string(),
                source: e,
            })?;

        out.push(Instruction { direction, steps });
    }

    Ok(out)
}

/// Calculate next position without counter for passing through zero
pub fn calculate_next_position(current: i32, direction: &Direction, steps: i32) -> i32 {
    let raw = match direction {
        Direction::Left => current - steps,
        Direction::Right => current + steps,
    };

    raw.rem_euclid(100)
}

/// Calculate next position with counter for passing through zero
pub fn calculate_next_position_with_counter(
    current: i32,
    direction: &Direction,
    steps: i32,
) -> (i32, i32) {
    let raw = match direction {
        Direction::Left => current - steps,
        Direction::Right => current + steps,
    };
    let final_pos = raw.rem_euclid(100);

    let crossings = if raw < 0 {

        if current == 0 {
            -raw / 100
        } else {
            (-raw / 100) + 1
        }
    } else if raw > 100 {
        raw / 100
    } else {
        0
    };

    if final_pos == 0 && crossings > 0 {
        (final_pos, crossings - 1)
    } else {
        (final_pos, crossings)
    }
}

#[cfg(test)]
mod tests {
    use super::*;

    #[test]
    fn single_moves_without_counter() {
        assert_eq!(calculate_next_position(50, &Direction::Left, 10), 40);
        assert_eq!(calculate_next_position(50, &Direction::Right, 10), 60);
        assert_eq!(calculate_next_position(5, &Direction::Left, 10), 95);
        assert_eq!(calculate_next_position(95, &Direction::Right, 10), 5);
    }

    #[test]
    fn single_moves_with_counter() {
        let (pos, crossed) = calculate_next_position_with_counter(50, &Direction::Left, 10);
        assert_eq!(pos, 40);
        assert_eq!(crossed, 0);

        let (pos, crossed) = calculate_next_position_with_counter(50, &Direction::Right, 10);
        assert_eq!(pos, 60);
        assert_eq!(crossed, 0);

        let (pos, crossed) = calculate_next_position_with_counter(5, &Direction::Left, 10);
        assert_eq!(pos, 95);
        assert_eq!(crossed, 1);

        let (pos, crossed) = calculate_next_position_with_counter(95, &Direction::Right, 10);
        assert_eq!(pos, 5);
        assert_eq!(crossed, 1);

        let (pos, crossed) = calculate_next_position_with_counter(10, &Direction::Left, 450);
        assert_eq!(pos, 60);
        assert_eq!(crossed, 5);

        let (pos, crossed) = calculate_next_position_with_counter(10, &Direction::Right, 450);
        assert_eq!(pos, 60);
        assert_eq!(crossed, 4);

        let (pos, crossed) = calculate_next_position_with_counter(0, &Direction::Left, 200);
        assert_eq!(pos, 0);
        assert_eq!(crossed, 1);

        let (pos, crossed) = calculate_next_position_with_counter(0, &Direction::Left, 201);
        assert_eq!(pos, 99);
        assert_eq!(crossed, 2);
    }

    #[test]
    fn full_sequence_example_without_counter() {
        let mut pos = 50;

        pos = calculate_next_position(pos, &Direction::Left, 68);
        assert_eq!(pos, 82);

        pos = calculate_next_position(pos, &Direction::Left, 30);
        assert_eq!(pos, 52);

        pos = calculate_next_position(pos, &Direction::Right, 48);
        assert_eq!(pos, 0);

        pos = calculate_next_position(pos, &Direction::Left, 5);
        assert_eq!(pos, 95);

        pos = calculate_next_position(pos, &Direction::Right, 60);
        assert_eq!(pos, 55);

        pos = calculate_next_position(pos, &Direction::Left, 55);
        assert_eq!(pos, 0);

        pos = calculate_next_position(pos, &Direction::Left, 1);
        assert_eq!(pos, 99);

        pos = calculate_next_position(pos, &Direction::Left, 99);
        assert_eq!(pos, 0);

        pos = calculate_next_position(pos, &Direction::Right, 14);
        assert_eq!(pos, 14);

        pos = calculate_next_position(pos, &Direction::Left, 82);
        assert_eq!(pos, 32);
    }

    #[test]
    fn full_sequence_example_with_counter() {
        let mut pos = 50;
        let mut crosses: i32;

        (pos, crosses) = calculate_next_position_with_counter(pos, &Direction::Left, 68);
        assert_eq!(pos, 82);
        assert_eq!(crosses, 1);

        (pos, crosses) = calculate_next_position_with_counter(pos, &Direction::Left, 30);
        assert_eq!(pos, 52);
        assert_eq!(crosses, 0);

        (pos, crosses) = calculate_next_position_with_counter(pos, &Direction::Right, 48);
        assert_eq!(pos, 0);
        assert_eq!(crosses, 0);

        (pos, crosses) = calculate_next_position_with_counter(pos, &Direction::Left, 5);
        assert_eq!(pos, 95);
        assert_eq!(crosses, 0);

        (pos, crosses) = calculate_next_position_with_counter(pos, &Direction::Right, 60);
        assert_eq!(pos, 55);
        assert_eq!(crosses, 1);

        (pos, crosses) = calculate_next_position_with_counter(pos, &Direction::Left, 55);
        assert_eq!(pos, 0);
        assert_eq!(crosses, 0);

        (pos, crosses) = calculate_next_position_with_counter(pos, &Direction::Left, 1);
        assert_eq!(pos, 99);
        assert_eq!(crosses, 0);

        (pos, crosses) = calculate_next_position_with_counter(pos, &Direction::Left, 99);
        assert_eq!(pos, 0);
        assert_eq!(crosses, 0);

        (pos, crosses) = calculate_next_position_with_counter(pos, &Direction::Right, 14);
        assert_eq!(pos, 14);
        assert_eq!(crosses, 0);

        (pos, crosses) = calculate_next_position_with_counter(pos, &Direction::Left, 82);
        assert_eq!(pos, 32);
        assert_eq!(crosses, 1);
    }
}
