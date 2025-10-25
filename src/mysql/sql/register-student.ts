import { ResultSetHeader, RowDataPacket } from 'mysql2'
import { createMySqlClient } from '../client/create-mysql-client.js'

type registerProps = {
  nombres: string
  apellidos: string
  correo: string
  numero_telefonico: string
  contrasenia: string
}

export async function registerStudent({
  nombres,
  apellidos,
  correo,
  numero_telefonico,
  contrasenia,
}: registerProps) {
  let mysql
  try {
    mysql = await createMySqlClient()

    const [responseCorreo] = await mysql.query<(string & RowDataPacket) []>(
      'SELECT id, correo FROM estudiantes WHERE correo = ?', [correo]
    )

    if(responseCorreo.length != 0){
      throw new Error('El correo digitado ya esta en uso')
    }

    const [responseNumero] = await mysql.query<(string & RowDataPacket) []>(
      'SELECT id, numero_telefonico FROM estudiantes WHERE numero_telefonico = ?', [numero_telefonico]
    )

    if(responseNumero.length != 0){
      throw new Error('Numero telefonico digitado ya esta en uso')
    }

    const [response] = await mysql.execute<ResultSetHeader>('INSERT INTO estudiantes (nombres, apellidos, correo, numero_telefonico, contrasenia) VALUES (?, ?, ?, ?, ?)', [nombres, apellidos, correo, numero_telefonico, contrasenia])

    if(response?.affectedRows != 1){
        throw new Error("Error al registrarse, intentelo nuevamente")
    }

    return{
        ok: true
    }

  } catch(error){
    console.log(error)
    return {
      ok: false,
      error:
        error instanceof Error
          ? error.message
          : 'Error desconocido en el registro',
    }
  } finally {
    if (mysql) {
      await mysql.end()
    }
  }
}
