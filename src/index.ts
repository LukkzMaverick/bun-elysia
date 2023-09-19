import { Elysia } from "elysia";
import groupRouter from "elysia-group-router";

export const app = new Elysia().use((app) => groupRouter(app, 'routes')).listen(process.env.PORT as string || 3000);

console.log(
  `🦊 Elysia is running at ${app.server?.hostname}:${app.server?.port}`
);

