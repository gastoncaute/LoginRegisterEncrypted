import { PrismaClient } from "@prisma/client"

const prisma = new PrismaClient()

export async function GET() {
    const usuarios = await prisma.usuarios.findMany()

    return new Response(JSON.stringify(usuarios))
}

export async function POST(request: Request) {
    const usuarioASubir = await request.json()

    const usuarioSubido = await prisma.usuarios.create({ data: usuarioASubir })

    if(!usuarioASubir) {return new Response("Error! No se pudo subir")}

    return new Response("Usuiario subido exitosamente!")
}