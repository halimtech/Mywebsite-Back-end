import { createConnection } from "typeorm"
import 'dotenv/config'
import { post } from "./entity/post"

const conn = async () => {
    await createConnection({
        type: "postgres",
        database: "nasa",
        username: "postgres",
        password: process.env.DB_PASS,
        logging: true,
        synchronize: true,
        entities: [post],
    })
}

export default conn