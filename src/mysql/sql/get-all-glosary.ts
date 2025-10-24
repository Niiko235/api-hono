import { RowDataPacket } from "mysql2";
import { createMySqlClient } from "../client/create-mysql-client.js";


type Row = {
    id: number,
    palabra: string,
    significado: string,
}

export async function getAllGlosary(){
    let mysql
  try {
    mysql = await createMySqlClient();

    const [rows] = await mysql.query<(RowDataPacket & Row)[]>('SELECT id, palabra, significado FROM glosario')

    return {
      ok: true,
      data: rows
    }
  } catch (error) {
    return {
      ok: false,
      error:
        error instanceof Error
          ? error.message
          : 'Error desconocido al obtener el glosario',
    }
  } finally {
    if (mysql) {
      await mysql.end()
    }
  }
}