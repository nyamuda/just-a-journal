// we will use supertest to test HTTP requests/responses
import request from "supertest";
// we also need our app for the correct routes!
import app from "../app";

describe("GET / ", () => {
    test("It should respond with an object with a message property", async () => {
        const response = await request(app).get("/");
        expect(response.body).toEqual({ message: "Welcome to Just a Journal" });
        expect(response.statusCode).toBe(200);
    });
});