import type { Answers } from "../../@types";
import { app } from "../../app";
import fs from "fs";

async function deleteVueComponent() {
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
      });
  } catch (err: unknown) {
    if (err instanceof Error) {
      console.error(err.message);
    }
  }
}

export { deleteVueComponent };
