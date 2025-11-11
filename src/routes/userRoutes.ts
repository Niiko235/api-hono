import { Hono } from 'hono'
import { singIn } from '../mysql/sql/singIn.js'
import { getAllGlosary } from '../mysql/sql/get-all-glosary.js'
import { getAllMicrocapsules } from '../mysql/sql/get-all-microcapsules.js'
import { getDocumentation } from '../mysql/sql/get-documentation.js'
import { logGame } from '../mysql/sql/log-game.js'
import { registerStudent } from '../mysql/sql/register-student.js'
import { getStadistics } from '../mysql/sql/get-stadistics.js'
import { cors } from 'hono/cors'


const userRoutes = new Hono()

userRoutes.use('*', cors({
  origin: ['https://movi-lab-ua.vercel.app', 'http://localhost:8080', 'http://localhost:3000'],
  allowMethods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
  allowHeaders: ['Content-Type', 'Authorization'],
}))

userRoutes.get('/', (c) => {
  return c.text('Hola nicolas, esta es tu primera api con hono :3, estoy muy orgulloso de ti y lo que lograste, no estes triste, sigue adelante, estoy muy orgulloso de ti :)')
})

userRoutes.get('/estudiante/login/:correo/:contrasenia', async (c) => {
  const correo = c.req.param('correo')
  const contrasenia = c.req.param('contrasenia')

  const response = await singIn({ correo, contrasenia })

  return c.json(response)
})

userRoutes.get('/glosario', async (c) => {
  const response = await getAllGlosary()
  return c.json(response)
})

userRoutes.get('/microcapsulas', async (c) => {
  const response = await getAllMicrocapsules()
  return c.json(response)
})

userRoutes.get('/documentacion/:idMicrocapsula', async (c) => {
  const idMicrocapsula = Number(c.req.param('idMicrocapsula'))

  const response = await getDocumentation(idMicrocapsula)
  return c.json(response)
})

userRoutes.put('/partida', async (c) => {
  const body = await c.req.json()
  const { estudiante_id, juego_id, tiempo } = body

  const response = await logGame({
    estudiante_id,
    juego_id,
    tiempo,
  })

  return c.json(response)
})

userRoutes.put('/registrar-estudiante', async (c) => {
  const body = await c.req.json()
  const {nombres, apellidos, correo, numero_telefonico, contrasenia} = body

  const response = await registerStudent({nombres, apellidos, correo, numero_telefonico, contrasenia})

  return c.json(response)
})

userRoutes.get('/estadisticas/:idEstudiante', async (c) => {
  const idEstudiante = Number(c.req.param('idEstudiante'))

  const response = await getStadistics(idEstudiante)
  return c.json(response)
})

export default userRoutes
