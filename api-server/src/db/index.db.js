import { Low, JSONFile } from 'lowdb'

const adapter = new JSONFile(`./src/db/${process.env.DB_FILE_NAME}`)

const db = new Low(adapter);

// db.data ||= { posts: [] }

(async () => await db.write())()

export { db }
