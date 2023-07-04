describe("Jest Test", () => {
  it("Should work", () => {
    const result = 1 + 1;
    expect(result).toBe(2);
  });
});

const request = require("supertest");
const app = require("../../app");

describe("api server", () => {
  let api;

  beforeAll(() => {
    api = app.listen(5000, () => {
      console.log("Test server running on port 5000");
    });
  });

  afterAll((done) => {
    console.log("Stopping test server");
    api.close(done);
  });

  describe("Login functionality", () => {
    test("it should authenticate a user", (done) => {
      // login tests to go here
      done();
    });
    //further log in tests to follow
  });

  describe("General app functionality", () => {
    test("it responds to GET / with status 200", (done) => {
      request(api).get("/").expect(200, done);
    });
    //council app tests go in here
  });
});
