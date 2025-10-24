import { RowDataPacket } from "mysql2";
import { createMySqlClient } from "../client/create-mysql-client.js";


type Row = {
    id: number,
    titulo: string,
    descripcion: string,
    ecuacion: string,
    footer: string,
    color_titulo: string,
}

export async function getAllMicrocapsules(){
    let mysql
  try {
    mysql = await createMySqlClient();

    const [rows] = await mysql.query<(RowDataPacket & Row)[]>('SELECT id, titulo, descripcion, ecuacion, footer, color_titulo FROM microcapsulas')

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
          : 'Error desconocido al obtener todas las capsulas',
    }
  } finally {
    if (mysql) {
      await mysql.end()
    }
  }
}