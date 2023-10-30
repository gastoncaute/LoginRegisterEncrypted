import fs from "fs"
import path from "path"
import matter from "gray-matter";
import { MDXRemote } from "next-mdx-remote/rsc";
import { ROUTES_MANIFEST } from "next/dist/shared/lib/constants";

export async function generateStaticParams() {
    const archivos = fs.readdirSync(path.join("src/blogs/"))

    const rutas = archivos.map((nombreDeArchivo) => ({
        slug: nombreDeArchivo.replace(".mdx", "")
    }))
    return ROUTES_MANIFEST
}

function obtenerBlog({ slug }: {slug: string}) {
    const archivoDeBlog = fs.readFileSync(path.join("src/blogs/" + slug + ".mdx"), "utf-8")

    const { data: frontMatter, content } = matter(archivoDeBlog)
    
    return {
        metadatos: frontMatter,
        slug,
        content,
    }
}

export default function Page({ params }: { params: { slug: string } }) {
    const blog = obtenerBlog(params)
    return(
        <article >
            <h1>{blog.metadatos.title}</h1>
            {/* @ts-ignore */}
            <MDXRemote source={blog.content}></MDXRemote>
        </article>
    )
}