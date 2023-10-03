import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

export async function GET() {
    const publicaciones = await prisma.publicaciones.findMany()

    return new Response(JSON.stringify(publicaciones))
}