import { t, type Elysia } from 'elysia';
import { prisma } from '../../prisma';

export default function petsRoutes(app: Elysia, prefix: string) {
  return app.group(prefix, (app) => app.get('', () => 'hello pets').post('/', async ({set, body}) => {
    set.status = 201
    return await prisma.pet.create({data: body})
  }, {
    body: t.Object({
      name: t.String({example: "Afonso"}),
      age: t.Integer({example: 2}),
      favoriteFood: t.Optional(t.String({example: "Chicken"}))
    }),
    response: {
      201: t.Object({
        id: t.Integer({example: 1}),
        name: t.String({example: "Afonso"}),
        age: t.Integer({example: 2}),
        favoriteFood: t.Optional(t.String({example: "Chicken"}))
      })
  } as any
}));
}