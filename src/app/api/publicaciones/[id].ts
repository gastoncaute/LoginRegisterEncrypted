import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient()

export async function GET(
    request: Request,
    { params } : { params: { id: string } }
) {
    const idDeBudqueda: number = Number(params.id)

    const publicaciones = await prisma.publicaciones.findUnique({
        where: { id: idDeBudqueda }
    })

    return new Response(JSON.stringify(publicaciones))
}