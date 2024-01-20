import { program } from "commander";
import inquirer, { Answers, QuestionCollection } from "inquirer";
import StreamManager from "./models/StreamManager";
import Viewer from "./models/Viewer";

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

program
  .command("start")
  .description("Start a new stream")
  .action(async () => {
    const answers: Answers = await inquirer.prompt(questions);

    const streamManager = StreamManager.getInstance();
    const streamId = streamManager.createStream(
      answers.name,
      answers.description
    );

    console.log(`Stream started with ID: ${streamId}`);
  });

program
  .command("join <streamId>")
  .description("Join an existing steram")
  .action((streamId) => {
    const viewer = new Viewer(StreamManager.getInstance());
    viewer.watchStream(streamId);
  });

program.parse(process.argv);
