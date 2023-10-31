"use client"
import { useRef } from "react"
import { useRouter } from "next/navigation"

export default function Page() {

  const router = useRouter()
  const emailRef = useRef(null)
  const passwordRef = useRef(null)

  const getData = async () => {
    try {
      const api = "http://localhost:3000/api/usuarios/login"
      const response = await (fetch(api, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        //@ts-ignore
        body: JSON.stringify({ email: emailRef.current?.value, password: passwordRef.current?.value })
      }))
      const data = await response.json()

      if (response.status === 201) {
        alert("Inicio de sesión exitoso");
      } else if (response.status === 400) {
        alert(data.error);
      } else if (response.status === 403) {
        alert(data.error);
      } else if (response.status === 401) {
        alert(data.error);
      } else {
        alert("Ocurrió un error inesperado");
      }
    } catch (error) {
      console.log(error)
    }
  }

  async function formularioAEnviar(evento: any) {
    evento.preventDefault()

    //@ts-ignore
    if (!emailRef.current?.value || !passwordRef.current?.value) {
      alert("Completa los datos, por favor")
      return
    }

    await getData()
  }

  return (
    <>
      <form onSubmit={formularioAEnviar} className="text-black">
        <input ref={emailRef} type="email" placeholder="Email" />
        <input ref={passwordRef} type="password" placeholder="Contraseña" />
        <input className="text-white" type="submit" value="Iniciar sesion" />
      </form>

      <button onClick={() => router.push("/")}>Volver al inicio</button>
    </>
  )
}