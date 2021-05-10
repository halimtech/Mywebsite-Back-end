import { MyContext } from "../types";
import {
    InputType,
    Field,
    Query,
    Arg,
    Mutation,
    Resolver,
    Ctx
} from "type-graphql";
import { project } from "../entity/project";
import { fakersProj } from "../utils/moc";
import 'dotenv/config'

@InputType()
export class ProjectInput {
    @Field()
    title: string
    @Field()
    text: string
    @Field()
    picture: string
}

@Resolver()
export class ProjectResolver {
    @Query(() => [project])
    async projects(): Promise<project[]> {
        return project.find()
    }

    @Mutation(() => project)
    async createProject(
        @Arg("input") input: ProjectInput,
        @Arg("pass") password: string,
        @Ctx() { }: MyContext
    ) {
        if (password === process.env.DB_PASS) {
            return project.create({
                ...input,
            }).save()
        } else {
            return fakersProj
        }
    }

}