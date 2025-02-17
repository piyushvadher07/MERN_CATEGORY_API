import mongoose from "mongoose";
import Category from "../models/Category";
import request from "supertest";
import app from "../server";

describe("Category API Tests", () => {
  let token;

  beforeAll(async () => {
    const res = await request(app).post("/api/auth/login").send({
      email: "testuser@example.com",
      password: "password123",
    });
    token = res.body.token;
  });

  it("should create a new category", async () => {
    const res = await request(app)
      .post("/api/category")
      .set("Authorization", `Bearer ${token}`)
      .send({ name: "Test Category" });
    expect(res.statusCode).toEqual(201);
    expect(res.body).toHaveProperty("_id");
  });

  afterAll(async () => {
    await mongoose.connection.close();
  });
});
