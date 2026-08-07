test("GET api/v1/status should return status code 200", async () => {
  const result = await fetch("http://localhost:3000/api/v1/status");
  expect(result.status).toBe(200);
});
