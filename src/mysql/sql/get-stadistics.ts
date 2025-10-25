import { RowDataPacket } from "mysql2";
import { createMySqlClient } from "../client/create-mysql-client.js";

type Row = {
    promedio: number,
    partidas: number,
}
export async function getStadistics(idEstudiante: number){
    let mysql
  try {
    mysql = await createMySqlClient();

    const [rows] = await mysql.query<(RowDataPacket & Row)[]>('SELECT AVG(tiempo) as promedio, COUNT(*) as partidas FROM partidas WHERE estudiante = ?', [idEstudiante])

    const data = {
        promedio: 0,
        partidas: 0,
    }

    if(rows.length > 0){
        data.promedio = rows[0].promedio ?? 0
        data.partidas = rows[0].partidas
    }
    
    return {
      ok: true,
      data
    }
  } catch (error) {
    return {
      ok: false,
      error:
        error instanceof Error
          ? error.message
          : 'Error desconocido al obtener las estadisticas del estudiante',
    }
  } finally {
    if (mysql) {
      await mysql.end()
    }
  }
}