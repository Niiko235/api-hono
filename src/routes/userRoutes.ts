import { Hono } from "hono";
import { singIn } from "../mysql/sql/singIn.js";
import { getAllGlosary } from "../mysql/sql/get-all-glosary.js";
import { getAllMicrocapsules } from "../mysql/sql/get-all-microcapsules.js";
import { getDocumentation } from "../mysql/sql/get-documentation.js";

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

userRoutes.get('/glosario',  async (c) => {
    const response = await getAllGlosary()
    return c.json(response)
})

userRoutes.get('/microcapsulas',  async (c) => {
    const response = await getAllMicrocapsules()
    return c.json(response)
})

userRoutes.get('/documentacion/:idMicrocapsula',  async (c) => {

    const idMicrocapsula = Number(c.req.param('idMicrocapsula'))

    const response = await getDocumentation(idMicrocapsula)
    return c.json(response)
})



export default userRoutes;