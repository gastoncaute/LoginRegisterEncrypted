'use client'
import { verify } from "jsonwebtoken"
import { FormEvent, useRef } from "react"
import { useContext } from "react"
import { UserContext } from "@/context/UserContext"
import Link from "next/link"

export default function FormularioDeRegistro() {
    const nombreRef = useRef(null)
    const edadRef = useRef(null)
    const emailRef = useRef(null)
    const passwordRef = useRef(null)
    const recordarmeRef = useRef(null)

    const { user, setUser } = useContext(UserContext)

    async function mandarDatosDeRegistro(e: FormEvent) {
        e.preventDefault()

        const datosAEnviar = {
            //@ts-ignore
            nombre: nombreRef.current?.value,
            //@ts-ignore
            edad: Number(edadRef.current?.value),
            //@ts-ignore
            email: emailRef.current?.value,
            //@ts-ignore
            password: passwordRef.current?.value,
        }

        console.log(datosAEnviar)

        const res = await fetch("http://localhost:3000/api/usuarios/register", {
            method: "POST",
            headers: {
                "Content-Type": "application/json"
            },
            body: JSON.stringify({datosAEnviar}),
        });

        if(res.status != 201) {
            const err = await res.json()
            alert(err.msg);
        }
        const { token } = await res.json()

        setUser({ ...datosAEnviar, token})

        // @ts-ignore
        if(recordarmeRef.current?.value) {
            localStorage.setItem("usuario", JSON.stringify(datosAEnviar))
        }
        console.log(user)
    }

    return(
        <>
            <form onSubmit={mandarDatosDeRegistro} className="text-black">
                <input ref={nombreRef} type="text" placeholder="Nombre completo" />
                <input ref={edadRef} type="number" inputMode="numeric" placeholder="Edad" />
                <input ref={emailRef} type="email" placeholder="Correo electronico" />
                <input ref={passwordRef} type="password" placeholder="Contrasena" />
                <input type="checkbox" ref={recordarmeRef} />Recordarme
                <input type="submit" className="text-white" value="Registrarse" />
            </form>
            <button onClick={() => console.log(user)}>Click</button>
            <Link href={"/perfil"}>Ir al Inicio</Link>
        </>
    )
}