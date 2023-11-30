import { Elysia } from "elysia";
import groupRouter from "elysia-group-router";
import { swagger } from "@elysiajs/swagger";
import { get } from "js-runtime";

export const app = new Elysia()
  .use(swagger())
  .use((app) => groupRouter(app, "routes"))
  .get("/", () => new Date().toISOString())
  .listen((process.env.PORT as string) || 3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);

console.log(`Running with ${get()}`);
