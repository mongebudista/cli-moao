import { Answers } from "./types";
import inquirer from "./utils/inquirer";
import { ReactCli } from "./cli/react";
import { VueCli } from "./cli/vue";

export class App {
  public inquirer;
  public using: "Next" | "Vite";

  constructor() {
    this.inquirer = inquirer;
    this.using = "Next" || "Vite";
  }

  get usingBase() {
    return this.using;
  }

  set usingBase(value: "Next" | "Vite") {
    this.using = value;
  }

  askFramework() {
    this.inquirer
      .prompt([
        {
          type: "list",
          name: "framework",
          message: "What framework you are using now?",
          choices: ["React 🔵", "Vue 🟢"],
        },
      ])
      .then(async (answers: Answers) => {
        if (answers.framework === "React 🔵") {
          const reactCli = new ReactCli();
          reactCli.prompt();
        }

        if (answers.framework === "Vue 🟢") {
          const vueCli = new VueCli();
          vueCli.prompt();
        }
      });
  }
}

export const app = new App();
