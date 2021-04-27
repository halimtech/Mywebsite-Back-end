import { post } from "../entity/post";
import { MyContext } from "src/types";
import {
    InputType,
    Field,
    Query,
    Arg,
    Mutation,
    Resolver,
    Ctx
} from "type-graphql";

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

    @Mutation(() => post)
    async createPost(
        @Arg("input") input: PostInput,
        @Ctx() { }: MyContext
    ): Promise<post> {
        return post.create({
            ...input,
        }).save()
    }

    @Mutation(() => post, { nullable: true })
    async updatePost(
        @Arg("id") id: number,
        @Arg("title") title: string,
        @Arg("text") text: string,
        @Arg("picture") picture: string,
    ): Promise<post | null> {
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
    }


    @Mutation(() => Boolean)
    async deletePost(
        @Arg("id") id: number,
    ): Promise<boolean> {
        const findPost = await post.findOne({ id })
        if (!findPost) {
            return false
        } else {
            await post.delete({ id })
            return true
        }

    }

}