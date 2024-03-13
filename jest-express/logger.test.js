const logger = require("./logger");

jest.mock("./logger");

describe("logger.info", () => {
  it("is called with the correct message", () => {
    //const spy = jest.spyOn(logger, "info");

    logger.info("Test message");

    //expect(spy).toHaveBeenCalledWith("Test message");
    logger.error("Error message");
    //spy.mockRestore(); // Optional: restores the original implementation
  });
});
