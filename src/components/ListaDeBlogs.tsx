import fs from "fs"
import path from "path";
import matter from "gray-matter";
import Image from "next/image";
import Link from "next/link";

export default function ListaDeBlogs() {
  const direccionDeMisBlog = "src/blogs"
  const archivos = fs.readdirSync(path.join(direccionDeMisBlog))

  const blogs = archivos.map((nombreDeArchivo) => {
    const contenidoDelArchivo = fs.readFileSync(path.join(direccionDeMisBlog, nombreDeArchivo), "utf-8")

    const { data: frontMatter } = matter(contenidoDelArchivo)

    return {
      meta: frontMatter,
      slug: nombreDeArchivo.replace(".mdx", "")
    }
  })

  return(
    <>
    <h2>Blogs de Roberto</h2>

    {
    blogs.map((blog, index) => (
      <Link key={index} href={`/blogs/${blog.slug}`}>
      <article>
        <h3>{blog.meta.title}</h3>
        <p>{blog.meta.description}</p>
        <span>{blog.meta.date}</span>
      </article>
      </Link>
    ))
    }
    </>
  )
}