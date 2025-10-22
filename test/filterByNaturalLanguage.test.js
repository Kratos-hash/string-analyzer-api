// test/filterByNaturalLanguage.test.js
import request from "supertest";
import app from "../server.js";

let server;

beforeAll(() => {
  server = app.listen(0);
});

afterAll(() => {
  server.close();
});

describe("Filter by Natural Language", () => {
  beforeAll(async () => {
    await request(server).post("/api/strings").send({ input: "Hello world" });
    await request(server).post("/api/strings").send({ input: "This is a test" });
    await request(server).post("/api/strings").send({ input: "Another random phrase" });
  });

  it("should return matches containing the word 'test'", async () => {
    const res = await request(server).get("/api/strings?query=test");
    expect(res.statusCode).toBe(200);
    expect(res.body.count).toBeGreaterThanOrEqual(1);
  });
});
