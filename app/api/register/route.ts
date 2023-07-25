import { db } from "@/lib/db";
import { createJWT, hashPassword } from "@/lib/auth";
import { serialize } from "cookie";


export async function POST(request: Request) {

  const data = await request.json();
  const user = await db.user.create({
    data: {
      email: data.email,
      password: await hashPassword(data.password),
      firstName: data.firstName,
      lastName: data.lastName,
    },
  });
  const jwt = await createJWT(user);
  return new Response(null, {
    status: 201,
    headers: {
      'Set-Cookie': serialize(process.env.COOKIE_NAME!, jwt, {
        httpOnly: true,
        path: "/",
        maxAge: 60 * 60 * 24 * 7,
      })
    },
  })

}