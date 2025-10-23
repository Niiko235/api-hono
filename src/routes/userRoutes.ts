import { Hono } from "hono";
import { singIn } from "../mysql/sql/singIn.js";

const userRoutes = new Hono();


userRoutes.get("/", (c) => {
    return c.text('Hola nico, andas bien bellako')
})

userRoutes.get('/estudiante/login/:correo/:contrasenia', async (c) => {
    const correo = c.req.param('correo')
    const contrasenia = c.req.param('contrasenia')

    const response = await singIn({correo, contrasenia})

    return c.json(response)
})

export default userRoutes;