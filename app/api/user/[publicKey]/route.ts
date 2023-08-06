import { NextResponse } from "next/server";
import { prismadb } from "@/lib/prisma";

export async function GET(
  req: Request,
  { params }: { params: { publicKey: string } }
) {
  //TODO: protect route with token
  const { publicKey } = params;
  if (!publicKey) {
    return new NextResponse("Public key is required", { status: 401 });
  }

  const activeUsers = await prismadb.users.count({
    where: {
      publicKey: publicKey,
    },
  });

  return NextResponse.json({ activeUsers }, { status: 200 });
}
