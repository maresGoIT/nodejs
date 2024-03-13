const logger = {
  info(message) {
    console.log(`Info: ${message}`);
  },
  error(message) {
    console.error(`Error: ${message}`);
  },
};

module.exports = logger;
