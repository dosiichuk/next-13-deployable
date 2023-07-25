import { validateJWT } from "@/lib/auth";
import { db } from "@/lib/db";
import { NextRequest, NextResponse } from 'next/server';


export async function POST(request: NextRequest) {
  console.log('user', request.cookies.get(process.env.COOKIE_NAME!))
  const user = await validateJWT(request.cookies.get(process.env.COOKIE_NAME!)?.value);

  const data = await request.json()
  await db.project.create({
    data: {
      name: data.name,
      ownerId: user.id,
    },
  });
  return NextResponse.json({ data: { message: "ok" } })

}