import { ResultSetHeader } from 'mysql2'
import { createMySqlClient } from '../client/create-mysql-client.js'

type UpdateProfileProps = {
  id: number
  nombres: string
  apellidos: string
  numero_telefonico: string
  contrasenia: string
}

export async function updateProfile({
  id,
  nombres,
  apellidos,
  numero_telefonico,
  contrasenia,
}: UpdateProfileProps) {
  let mysql
  try {
    mysql = await createMySqlClient()

    const response = await mysql.execute<ResultSetHeader>(
      'UPDATE estudiantes SET nombres = ?, apellidos = ?, numero_telefonico = ?, contrasenia = ? WHERE id = ?',
      [nombres, apellidos, numero_telefonico, contrasenia, id]
    )

    if (response[0].affectedRows === 0) {
      throw new Error('No se pudo actualizar el perfil')
    }

    return {
      ok: true,
    }
  } catch (error) {
    return {
      ok: false,
      error:
        error instanceof Error
          ? error.message
          : 'Error desconocido al actualizar el perfil',
    }
  } finally {
    if (mysql) {
      await mysql.end()
    }
  }
}
