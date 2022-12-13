#! /usr/bin/env node

import fs from "fs";
import { app } from "../../app";
import { Cli } from "../../models/cli";
import { componentTemplate } from "../../templates/vue";
import type { Answers } from "../../types";

export class VueCli implements Cli {
  private componentFolderVue: boolean = fs.existsSync("./src/components");

  async createComponent() {
    try {
      await app.inquirer
        .prompt([
          {
            type: "input",
            name: "componentName",
            message: "Which component do you want to create?",
          },
        ])
        .then((answers: Answers) => {
          if (!this.componentFolderVue) {
            fs.mkdirSync("./src/components");
            console.log("Components folder created! 📁");
          }
          console.log("Creating component...");

          setTimeout(() => {
            fs.writeFileSync(
              `./src/components/${answers.componentName}.vue`,
              componentTemplate(answers)
            );
          }, 2000);
        });
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error(err.message);
      }
    }
  }

  async deleteComponent() {
    try {
      await app.inquirer
        .prompt([
          {
            type: "input",
            name: "componentName",
            message: "Which component do you want to delete?",
          },
        ])
        .then((answers: Answers) => {
          fs.rmSync(`./src/components/${answers.componentName}.vue`);
          console.log(`Component deleted: ${answers.componentName} 🗑`);

          const folder = fs.readdirSync("./src/components", {
            withFileTypes: false,
          });

          if (folder.length === 0) {
            fs.rmdirSync("./src/components");
            setTimeout(() => {
              console.log(
                "Components folder deleted because it was empty 🍃"
              );
            }, 1000);
          }
        });
    } catch (err: unknown) {
      if (err instanceof Error) {
        console.error(err.message);
      }
    }

  }

  async prompt() {
    await app.inquirer
      .prompt([
        {
          type: "list",
          name: "action",
          message: "Vue 🟢: What you want to do?",
          choices: ["Create Component", "Delete Component"],
          filter(val: string) {
            return val.toLowerCase();
          },
        },
      ])
      .then(async (answers: Answers) => {
        if (answers.action === "create component") {
          await this.createComponent();
        }

        if (answers.action === "delete component") {
          await this.deleteComponent();
        }
      });

  }

}

if (require.main === module) {
  const vueCli = new VueCli();
  vueCli.prompt();
}
