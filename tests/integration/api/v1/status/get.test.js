import orchestrator from "tests/orchestrator.js";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
});

test("GET api/v1/status should return status code 200", async () => {
  const result = await fetch("http://localhost:3000/api/v1/status");
  expect(result.status).toBe(200);

  const responseBody = await result.json();

  const parsedUpdatedAt = new Date(responseBody.updated_At).toISOString();
  expect(responseBody.updated_At).toEqual(parsedUpdatedAt);

  const resDepDatabase = responseBody.dependencies.database;

  expect(resDepDatabase.version).toBe("16.0");
  expect(resDepDatabase.max_connections).toBe(100);
  expect(resDepDatabase.opened_connections).toBe(1);
});
