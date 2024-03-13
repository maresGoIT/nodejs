const request = require("supertest");
const app = require("./app");

describe("Route /users", () => {
  it("responds with a list of users", async () => {
    const response = await request(app).get("/users");
    expect(response.statusCode).toBe(200);
    expect(response.body).toEqual([{ name: "John Doe" }]);
  });
});
