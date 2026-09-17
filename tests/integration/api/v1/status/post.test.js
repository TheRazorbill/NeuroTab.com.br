import orchestrator from "tests/orchestrator.js";

beforeAll(async () => {
  await orchestrator.waitForAllServices();
});

describe("POST /api/v1/status", () => {
  describe("Anonymous user", () => {
    test("Retrieving current system status", async () => {
      const result = await fetch("http://localhost:3000/api/v1/status", {
        method: "POST",
      });
      expect(result.status).toBe(405);

      const responseBody = await result.json();

      expect(responseBody).toEqual({
        name: "MethodNotAllowedError",
        message: "Metodo nao permitido para este endpoint.",
        action: "Verifique se o metodo HTTP é valido para este endpoint.",
        status_code: 405,
      });
    });
  });
});
