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
    @Field()
    link: string
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

    @Mutation(() => project || null)
    async createPost(
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

    @Mutation(() => project, { nullable: true })
    async updateproject(
        @Arg("id") id: number,
        @Arg("title") title: string,
        @Arg("text") text: string,
        @Arg("picture") picture: string,
        @Arg("link") link: string,
        @Arg("pass") password: string,
    ): Promise<project | null> {
        if (password === process.env.DB_PASS) {
            const findproject = await project.findOne({ id })
            if (!findproject) {
                return null
            }
            if (title !== "") {
                findproject.title = title
            }
            if (text !== "") {
                findproject.text = text
            }
            if (picture !== "") {
                findproject.picture = picture
            }
            if (link !== "") {
                findproject.link = link
            }
            await project.save(findproject)
            return findproject
        } else {
            return null;
        }
    }


    @Mutation(() => Boolean)
    async deleteproject(
        @Arg("id") id: number,
        @Arg("pass") password: string,
    ): Promise<boolean> {
        if (password === process.env.DB_PASS) {
            const findproject = await project.findOne({ id })
            if (!findproject) {
                return false
            } else {
                await project.delete({ id })
                return true
            }

        } return false
    }



}