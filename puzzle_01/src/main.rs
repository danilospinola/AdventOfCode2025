use clap::{Parser, Subcommand};
use tracing::{error, info};

use puzzle_01::instructions::{
    calculate_next_position, calculate_next_position_with_counter, load_input,
};

#[derive(Parser)]
struct Cli {
    #[clap(subcommand)]
    command: Commands,
}

#[derive(Subcommand)]
enum Commands {
    SolveOne {
        #[clap(long, default_value = "data/clue.txt")]
        path: String,

        #[clap(short, long, default_value_t = 50)]
        start: i32,

        #[clap(long, default_value_t = 0)]
        position_to_count: i32,
    },
    SolveTwo {
        #[clap(long, default_value = "data/clue.txt")]
        path: String,

        #[clap(short, long, default_value_t = 50)]
        start: i32,

        #[clap(long, default_value_t = 0)]
        position_to_count: i32,
    },
}

fn main() {
    tracing_subscriber::fmt().init();

    let args = Cli::parse();

    match args.command {
        Commands::SolveOne {
            path,
            start,
            position_to_count,
        } => {
            info!("Solve input={} start={}", path, start);

            let input = match load_input(&path) {
                Ok(instructions) => {
                    info!("Loaded {} instructions", instructions.len());
                    instructions
                }
                Err(e) => {
                    error!("Load failed: {}", e);
                    return;
                }
            };

            // Loop through instructions, and collect positions in a vector
            let mut position = start;
            let mut positions = Vec::new();
            for instruction in input.iter() {
                position =
                    calculate_next_position(position, &instruction.direction, instruction.steps);
                positions.push(position);
            }

            // Count occurrences of position_to_count in positions
            let count = positions
                .iter()
                .filter(|&&p| p == position_to_count)
                .count();
            info!("Position {} was visited {} times", position_to_count, count);
        }
        Commands::SolveTwo {
            path,
            start,
            position_to_count,
        } => {
            info!("Solve input={} start={}", path, start);

            let input = match load_input(&path) {
                Ok(instructions) => {
                    info!("Loaded {} instructions", instructions.len());
                    instructions
                }
                Err(e) => {
                    error!("Load failed: {}", e);
                    return;
                }
            };

            // Loop through instructions, and collect positions in a vector
            let mut position = start;
            let mut positions = Vec::new();
            let mut crosses = 0;
            let mut crossed: i32;
            for instruction in input.iter() {
                (position, crossed) = calculate_next_position_with_counter(
                    position,
                    &instruction.direction,
                    instruction.steps,
                );
                if crossed > 0 {
                    crosses += crossed;
                }
                positions.push(position);
            }

            // Count occurrences of position_to_count in positions
            let count: i32 = positions
                .iter()
                .filter(|&&p| p == position_to_count)
                .count() as i32;
            info!("Position {} was visited {} times", position_to_count, count);
            info!("Crossed zero {} times", crosses);

            let total = count + crosses;

            info!(
                "Total times it hits position {}: {}",
                position_to_count, total
            );
        }
    }
}
