import type { Elysia } from 'elysia';

export default function userRoutes(app: Elysia, prefix: string) {
  return app.group(prefix, (app) => app.get('', () => 'hello user'));
}