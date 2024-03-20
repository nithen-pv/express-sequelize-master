export function setupCloseOnExit(server) {
  // from https://stackoverflow.com/a/14032965/971592
  async function exitHandler(options = {}) {
    try {
      await server.close();
      console.log("🛑 Server successfully closed");
    } catch (error) {
      console.log("Something went wrong closing the server", error.stack);
    }

    // eslint-disable-next-line no-process-exit
    if (options.exit) process.exit();
  }

  process.on("exit", exitHandler);
  // catches ctrl+c event
  process.on("SIGINT", exitHandler.bind(null, { exit: true }));
  // catches "kill pid" (for example: nodemon restart)
  process.on("SIGUSR1", exitHandler.bind(null, { exit: true }));
  process.on("SIGUSR2", exitHandler.bind(null, { exit: true }));
  // catches uncaught exceptions
  process.on("uncaughtException", exitHandler.bind(null, { exit: true }));
}
