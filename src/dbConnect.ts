import { createConnection } from "typeorm"
import 'dotenv/config'
import { post } from "./entity/post"
import { project } from "./entity/project"

const conn = async () => {
    try {
        await createConnection({
            type: "postgres",
            database: process.env.DB_NAME,
            host: process.env.DB_URL,
            port: 5432,
            username: process.env.DB,
            password: process.env.DB_PASS,
            logging: true,
            synchronize: true,
            ssl: {
                require: true,
                rejectUnauthorized: false,
            },

            entities: [post, project],
        })
    } catch (error) {
        console.log(error);

    }


}

export default conn