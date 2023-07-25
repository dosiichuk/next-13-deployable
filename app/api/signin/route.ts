import { db } from "@/lib/db";
import { comparePasswords, createJWT } from "@/lib/auth";

import { serialize } from "cookie";
import { NextResponse } from 'next/server';


export async function POST(request: Request) {
  const data = await request.json();
  const user = await db.user.findUnique({
    where: {
      email: data.email,
    },
  });
  if (!user) {
    return NextResponse.json({ status: 401, error: "invalid login" })
  }
  const isUser = await comparePasswords(data.password, user.password);
  if (isUser) {
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

  } else {
    return NextResponse.json({ status: 401, error: "invalid login" })
  }

}