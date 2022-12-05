#! /usr/bin/env node

import { Cli } from "../../models/cli";
import fs from "fs";
import { app } from "../../app";
import { componentTemplate, layoutTemplate } from "../../templates/react";
import { Answers } from "../../types";

export class ReactCli implements Cli {
  private componentFolderVite: boolean = fs.existsSync("./src/components");
  private componentFolderNext: boolean = fs.existsSync("./components");
  private srcFolder: boolean = fs.existsSync("./src");
  private tsConfig: boolean = fs.existsSync("./tsconfig.json");

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
          if (!this.srcFolder) {
            app.usingBase = "Next";
          }

          if (this.srcFolder) {
            app.usingBase = "Vite";
          }

          switch (app.usingBase) {
            case "Next":
              console.log("You're using Next.js 🍫");

              if (this.tsConfig) {
                console.log("Typescript detected! 🧊");
              }

              if (!this.componentFolderNext) {
                fs.mkdirSync("./components");
                console.log("Components folder created! 📁");
              }
              console.log("Creating component...");

              setTimeout(() => {
                if (this.tsConfig) {
                  if (answers.componentName === "Layout") {
                    // console.log(answers.componentName);
                    fs.writeFileSync(
                      `./components/${answers.componentName}.tsx`,
                      layoutTemplate(answers)
                    );
                  }

                  if (answers.componentName !== "Layout") {
                    fs.writeFileSync(
                      `./components/${answers.componentName}.tsx`,
                      componentTemplate(answers)
                    );
                  }

                  console.log(`Component "${answers.componentName}" created! ✅`);
                }

                if (!this.tsConfig) {
                  fs.writeFileSync(
                    `./components/${answers.componentName}.jsx`,
                    componentTemplate(answers)
                  );
                  console.log(`Component "${answers.componentName}" created! ✅`);
                }
              }, 2000);

              break;
            case "Vite":
              console.log("You're using Vite ⚡");

              if (this.tsConfig) {
                console.log("Typescript detected! 🧊");
              }

              if (!this.componentFolderVite) {
                fs.mkdirSync("./src/components");
                console.log("Components folder created! 📁");
              }
              console.log("Creating component...");

              setTimeout(() => {
                if (this.tsConfig) {
                  if (answers.componentName === "Layout") {
                    // console.log(answers.componentName);
                    fs.writeFileSync(
                      `./src/components/${answers.componentName}.tsx`,
                      layoutTemplate(answers)
                    );
                  }

                  if (answers.componentName !== "Layout") {
                    fs.writeFileSync(
                      `./src/components/${answers.componentName}.tsx`,
                      componentTemplate(answers)
                    );
                  }

                  console.log(`Component "${answers.componentName}" created! ✅`);
                }

                if (!this.tsConfig) {
                  fs.writeFileSync(
                    `./src/components/${answers.componentName}.jsx`,
                    componentTemplate(answers)
                  );
                  console.log(`Component "${answers.componentName}" created! ✅`);
                }
              }, 2000);
            default:
              break;
          }
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
          if (!this.srcFolder) {
            app.usingBase = "Next";
          }

          if (this.srcFolder) {
            app.usingBase = "Vite";
          }

          switch (app.usingBase) {
            case "Next":
              if (this.tsConfig) {
                fs.rmSync(`./components/${answers.componentName}.tsx`);
              }

              if (!this.tsConfig) {
                fs.rmSync(`./components/${answers.componentName}.jsx`);
              }

              console.log(`Component deleted: ${answers.componentName} 🗑`);
              break;
            case "Vite":
              if (this.tsConfig) {
                fs.rmSync(`./src/components/${answers.componentName}.tsx`);

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

              }

              if (!this.tsConfig) {
                fs.rmSync(`./src/components/${answers.componentName}.jsx`);
              }

              console.log(`Component deleted: ${answers.componentName} 🗑`);
              break;
            default:
              break;
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
          message: "React 🔵: What you want to do?",
          choices: ["Create Component", "Delete Component"],
          filter(val: string) {
            return val.toLowerCase();
          },
        },
      ])
      .then(async (answers: Answers) => {
        // console.log(JSON.stringify(answers, null, "  "));
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
  const reactCli = new ReactCli();
  reactCli.prompt();
}
