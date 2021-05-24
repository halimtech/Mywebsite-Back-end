import { createConnection } from "typeorm"
import 'dotenv/config'
import { post } from "./entity/post"
import { project } from "./entity/project"
//postgres://bgferstsbiefeu:088a89164fe9a2fa8dd1e84c2fb32d495e243fa47896157c2c4cb45536eb2e2a@ec2-54-216-202-161.eu-west-1.compute.amazonaws.com:5432/d2tf5botks36mn

const conn = async () => {
    await createConnection({
        type: "postgres",
        database: process.env.DB_NAME,
        host: process.env.DB_URL,
        port: 5432,
        username: process.env.DB_NAME,
        password: process.env.DB_PASS,
        logging: true,
        synchronize: true,
        ssl: true,
        entities: [post, project],
    })
}

export default conn