import { createConnection } from "typeorm"
import 'dotenv/config'

const conn = async () => {
    await createConnection({
        type: "postgres",
        database: "nasa",
        username: "postgres",
        password: process.env.DB_PASS,
        logging: true,
        synchronize: true,
        entities: [],
    })
}

export default conn