import { createConnection } from "typeorm"
import 'dotenv/config'
import { post } from "./entity/post"
import { project } from "./entity/project"
//postgres://bgferstsbiefeu:088a89164fe9a2fa8dd1e84c2fb32d495e243fa47896157c2c4cb45536eb2e2a@ec2-54-216-202-161.eu-west-1.compute.amazonaws.com:5432/d2tf5botks36mn
//postgres://xzbvqaitsifnsk:@ec2-54-228-174-49.eu-west-1.compute.amazonaws.com:5432/decl3pamrq7i3o
const conn = async () => {
    try {
        await createConnection({
            type: "postgres",
            database: process.env.DB_NAME,
            host: process.env.DB_URL,
            port: 5432,
            username: process.env.DB,
            password: process.env.DB_PASS,
            // url: "postgres://xzbvqaitsifnsk:ade15893c05c0ef7fdafaa638f037a99c800d549ba5d8fa97c5e3f5fd03f2477@ec2-54-228-174-49.eu-west-1.compute.amazonaws.com:5432/decl3pamrq7i3o",
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
    // await createConnection({
    //     type: "postgres",
    //     database: "nasa",
    //     host: "localhost",
    //     port: 5432,
    //     username: "postgres",
    //     password: "overwatch2014",
    //     logging: true,
    //     synchronize: true,
    //     entities: [post, project],
    // })

}

export default conn