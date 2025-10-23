import { Hono } from 'hono'
import userRoutes from './routes/userRoutes.js'

const app = new Hono()

app.route('/movi_lab', userRoutes)

export default app