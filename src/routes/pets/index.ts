import type { Elysia } from 'elysia';

export default function petsRoutes(app: Elysia, prefix: string) {
  return app.group(prefix, (app) => app.get('', () => 'hello pest').post('/', ({body}) => body));
}