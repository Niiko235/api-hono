import mysql from 'mysql2/promise'

export async function createMySqlClient() {
  // const connection = await mysql.createConnection({
  //   host: process.env.MYSQL_HOST,
  //   port: Number(process.env.MYSQL_PORT),
  //   user: process.env.MYSQL_USER,
  //   password: process.env.MYSQL_PASSWORD,
  //   database: process.env.MYSQL_DATABASE,
  // })

  // const connectionProduct = await mysql.createConnection(
  //   String(process.env.DATABASE_URL)
  // )
  
  const connectionProduct = await mysql.createConnection(
    String(process.env.DATABASE_URL_V2)
  )

  return connectionProduct
}
