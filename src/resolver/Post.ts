import { post } from "../entity/post";
import { MyContext } from "../types";
import {
    InputType,
    Field,
    Query,
    Arg,
    Mutation,
    Resolver,
    Ctx
} from "type-graphql"
import 'dotenv/config'
import { fakers } from "../utils/moc";

@InputType()
export class PostInput {
    @Field()
    title: string
    @Field()
    text: string
    @Field()
    author: string
    @Field()
    picture: string
}

@Resolver()
export class PostResolver {
    @Query(() => [post])
    async posts(): Promise<post[]> {
        return post.find()
    }

    @Query(() => post, { nullable: true })
    post(
        @Arg("id") id: string
    ): Promise<post | undefined> {
        return post.findOne(id)
    }

    @Mutation(() => post || null)
    async createPost(
        @Arg("input") input: PostInput,
        @Arg("pass") password: string,
        @Ctx() { }: MyContext
    ) {
        if (password === process.env.DB_PASS) {
            return post.create({
                ...input,
            }).save()
        } else {
            return fakers
        }
    }

    @Mutation(() => post, { nullable: true })
    async updatePost(
        @Arg("id") id: number,
        @Arg("title") title: string,
        @Arg("text") text: string,
        @Arg("picture") picture: string,
        @Arg("pass") password: string,
    ): Promise<post | null> {
        if (password === process.env.DB_PASS) {
            const findPost = await post.findOne({ id })
            if (!findPost) {
                return null
            }
            if (title !== "") {
                findPost.title = title
            }
            if (text !== "") {
                findPost.text = text
            }
            if (picture !== "") {
                findPost.picture = picture
            }
            await post.save(findPost)
            return findPost
        } else {
            return null;
        }
    }


    @Mutation(() => Boolean)
    async deletePost(
        @Arg("id") id: number,
        @Arg("pass") password: string,
    ): Promise<boolean> {
        if (password === process.env.DB_PASS) {
            const findPost = await post.findOne({ id })
            if (!findPost) {
                return false
            } else {
                await post.delete({ id })
                return true
            }

        } return false
    }

}