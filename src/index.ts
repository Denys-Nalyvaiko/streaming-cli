import { program } from "commander";
import inquirer, { Answers, QuestionCollection } from "inquirer";
import StreamManager from "./models/StreamManager";
import Viewer from "./models/Viewer";
import StreamHandler from "./models/StreamHandler";

const questions: QuestionCollection = [
  {
    type: "input",
    name: "name",
    message: "Enter srtream name:",
  },
  {
    type: "input",
    name: "description",
    message: "Enter strean description:",
  },
];

let streamHandler: StreamHandler;

program
  .command("start")
  .description("Start a new stream")
  .action(async () => {
    const answers: Answers = await inquirer.prompt(questions);

    streamHandler = StreamHandler.getInstance();
    await streamHandler.startStream(answers.name, answers.description);
  });

program
  .command("join <streamId>")
  .description("Join an existing steram")
  .action(async (streamId) => {
    streamHandler = StreamHandler.getInstance();
    await streamHandler.joinStream(streamId);
  });

program.parse(process.argv);
