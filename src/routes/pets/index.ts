import { t, type Elysia } from "elysia";
import { prisma } from "../../prisma";

export default function petsRoutes(app: Elysia, prefix: string) {
  return app.group(prefix, (app) =>
    app
      .get(
        ":id",
        async ({ set, params: { id } }): Promise<any> => {
          try {
            const pet = await prisma.pet.findUnique({ where: { id } });
            if (!pet) {
              set.status = 404;
              return responseException("Pet Not Found", 404);
            }
            return pet;
          } catch (error) {
            set.status = 500;
            return responseException("Internal Server Error", 500);
          }
        },
        {
          params: t.Object({ id: t.Numeric() }),
          response: {
            200: postResponse,
            404: HttpException("Pet Not Found", 404),
            500: HttpException("Internal Server Error", 500),
          },
          detail: { tags: ["Pets"] },
        }
      )
      .get(
        "",
        async ({ set }): Promise<any> => {
          try {
            return await prisma.pet.findMany();
          } catch {
            set.status = 500;
            return responseException("Internal Server Error", 500);
          }
        },
        {
          response: {
            200: t.Array(postResponse),
            500: HttpException("Internal Server Error", 500),
          },
          detail: { tags: ["Pets"] },
        }
      )
      .post(
        "/",
        async ({ set, body }): Promise<any> => {
          try {
            set.status = 201;
            return await prisma.pet.create({ data: body });
          } catch (error) {
            set.status = 500;
            return responseException("Internal Server Error", 500);
          }
        },
        {
          body: t.Object({
            name: t.String({ example: "Afonso" }),
            age: t.Integer({ example: 2 }),
            favoriteFood: t.Optional(t.String({ example: "Chicken" })),
          }),
          response: {
            201: postResponse,
            500: HttpException("Internal Server Error", 500),
          },
          detail: { tags: ["Pets"] },
        }
      )
  );
}

const postResponse = t.Object({
  id: t.Integer({ example: 1 }),
  name: t.String({ example: "Afonso" }),
  age: t.Integer({ example: 2 }),
  favoriteFood: t.String({ example: "Chicken" }),
});

const HttpException = (msg: string, status: number) =>
  t.Object({
    message: t.String({ example: msg }),
    status: t.Number({ example: status }),
  });

const responseException = (message: string, status: number): HttpInterface => {
  return { message, status };
};
interface HttpInterface {
  message: string;
  status: number;
}
