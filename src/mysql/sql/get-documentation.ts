import { RowDataPacket } from 'mysql2'
import { createMySqlClient } from '../client/create-mysql-client.js'


type RowDocumentation = {
  id: number
  title: string
  color_primario: string
  color_secundario: string
}
type RowTheory = {
  id: number
  contenido: string
  tipo: string
  orden: number
}
type RowVideos = {
  id: number
  titulo: string
  descripcion: string
  url: string
}
type RowLinks = {
  id: number
  titulo: string
  descripcion: string
  url: string
  pagina: string
}

export async function getDocumentation(idMicrocapsula: number) {
  let mysql
  try {
    mysql = await createMySqlClient()

    const [rowsDocumentation] = await mysql.query<
      (RowDataPacket & RowDocumentation)[]
    >(
      'SELECT id, title, color_primario, color_secundario FROM documentaciones where microcapsula = ?',
      [idMicrocapsula]
    )

    if (rowsDocumentation.length === 0) {
      throw new Error(
        'No se encontro documentación sobre el tema que intenta investigar'
      )
    }

    const [rowsTheory] = await mysql.query<(RowDataPacket & RowTheory)[]>(
      'SELECT id, contenido, tipo, orden FROM teorias where documentacion = ?',
      [rowsDocumentation[0].id]
    )
    const [rowsVideos] = await mysql.query<(RowDataPacket & RowVideos)[]>(
      'SELECT id, titulo, descripcion, url FROM videos_externos where documentacion = ?',
      [rowsDocumentation[0].id]
    )
    const [rowsLinks] = await mysql.query<(RowDataPacket & RowLinks)[]>(
      'SELECT id, titulo, descripcion, url, pagina FROM url_externos  where  documentation = ?',
      [rowsDocumentation[0].id]
    )

    return {
      ok: true,
      dataDocumentation: rowsDocumentation[0],
      dataTheory: rowsTheory,
      dataVideos: rowsVideos,
      dataLinks: rowsLinks,
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
