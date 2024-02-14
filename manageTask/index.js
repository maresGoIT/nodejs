import chalk from "chalk";
import inquirer from "inquirer";
import fs from "fs";

fs.readFile("tasks.txt", "utf8", (err, data) => {
  if (err) {
    console.error("An error has occurred");

    return;
  }

  global.tasks = data.split(",");
});

// Function to display menu options
function displayMenu() {
  console.log(chalk.blue.bold("=== Task Management App ==="));
  inquirer
    .prompt([
      {
        type: "list",
        name: "choice",
        message: "Choose an option:",
        choices: ["View tasks", "Add task", "Exit"],
      },
    ])
    .then((answer) => {
      switch (answer.choice) {
        case "View tasks":
          viewTasks();
          break;
        case "Add task":
          addTask();
          break;
        case "Exit":
          console.log(chalk.red.bold("Exiting app."));
          return; // Exit the app
      }
    });
}

// Function to display tasks
function viewTasks() {
  console.log(chalk.blue.bold("=== Your Tasks ==="));
  if (global.tasks.length === 0) {
    console.log(chalk.yellow("No tasks available."));
  } else {
    global.tasks.forEach((task, index) => {
      console.log(chalk.white(`${index + 1}. ${task}`));
    });
  }

  displayMenu(); // Show menu again
}

// Function to add a new task
function addTask() {
  console.log(chalk.yellow.bold("=== Add Task ==="));
  inquirer
    .prompt([
      {
        type: "input",
        name: "task",
        message: "Enter task:",
      },
    ])
    .then((answer) => {
      global.tasks.push(answer.task); // Add task to array
      console.log(chalk.green("Task added successfully!"));

      fs.writeFile("tasks.txt", global.tasks.join(","), (err) => {
        if (err) {
          console.error(err);
        } else {
          // file written successfully
        }
      });

      displayMenu(); // Show menu again
    });
}

// Function to start the app
function startApp() {
  displayMenu();
}

// Start the app
startApp();
