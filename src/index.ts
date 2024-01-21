import { OptionValues, program } from "commander";
import serverAction from "./server";
import clientAction from "./client";

program.option("-u, --user <type>", "choose user type");
program.parse(process.argv);

const options: OptionValues & { user?: string } = program.opts();

const invokeAction = async ({ user }: { user?: string }) => {
  switch (user) {
    case "server":
      serverAction();
      break;

    case "client":
      clientAction();
      break;

    default:
      console.log("Unknown action");
  }
};

invokeAction(options);
