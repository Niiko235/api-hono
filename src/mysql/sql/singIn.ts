'use server'
import { RowDataPacket } from 'mysql2'
import { createMySqlClient } from '../client/create-mysql-client.js'


type credentialsProps = {
  correo: string
  contrasenia: string
}

type User = {
  id: number
  nombres: string
  apellidos: string
  contrasenia: string
  numero_telefonico: string
  email: string
  onboarding_terminado: boolean
}


// validar si el correo existe
// hashear la contraseña
// consulta de la contraseña hasheada y el correo

export async function singIn({ correo, contrasenia }: credentialsProps) {
  let mysql
  try {
    mysql = await createMySqlClient()

    const [response] = await mysql.query<(User & RowDataPacket)[]>(
      'SELECT id, nombres, apellidos, correo, numero_telefonico, contrasenia, onboarding_terminado FROM estudiantes WHERE correo = ? AND contrasenia = ?',
      [correo, contrasenia]
    )

    if (response.length === 0) {
      throw new Error('Credenciales invalidas')
    }

    const data = {
      id: response[0].id,
      nombres: response[0].nombres,
      email: response[0].correo,
      onboarding_termiando: response[0].onboarding_terminado,
      apellidos: response[0].apellidos,
      numero_telefonico: response[0].numero_telefonico,
      contrasenia: response[0].contrasenia,
    }
    return {
      ok: true,
      error: null,
      data
    }
  } catch (error) {
    console.log(error)
    return {
      ok: false,
      data: null,
      error:
        error instanceof Error
          ? error.message
          : 'Error desconocido en el inicio de sesión',
    }
  } finally {
    if (mysql) {
      await mysql.end()
    }
  }
}
