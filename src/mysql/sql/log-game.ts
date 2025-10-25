import { ResultSetHeader, RowDataPacket } from 'mysql2'
import { createMySqlClient } from '../client/create-mysql-client.js'

type gameProps = {
  estudiante_id: number
  juego_id: number
  tiempo: number
}

export async function logGame({
  estudiante_id,
  juego_id,
  tiempo,
}: gameProps) {
  let mysql
  try {
    mysql = await createMySqlClient()

    const [response] = await mysql.execute<ResultSetHeader>(
      'INSERT INTO partidas (estudiante, juego, tiempo) VALUES (?, ?, ?)',
      [estudiante_id, juego_id, tiempo]
    )

    if (response?.affectedRows != 1) {
      throw new Error('Error al registrar la partida')
    }

    return {
      ok: true,
    }
  } catch (error) {
    console.log(error)
    return {
      ok: false,
      error:
        error instanceof Error
          ? error.message
          : 'Error desconocido en el registro de la partida',
    }
  } finally {
    if (mysql) {
      await mysql.end()
    }
  }
}
