import type { Answers } from "../../@types";
import { app } from "../../app";
import { createReactComponent } from "./createReactComponent";
import { deleteReactComponent } from "./deleteReactComponent";

async function promptReact() {
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
        await createReactComponent();
      }

      if (answers.action === "delete component") {
        await deleteReactComponent();
      }
    });
}

export default promptReact;
