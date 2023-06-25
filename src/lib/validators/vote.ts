import {z} from "zod"

//for post votes
export const PostVoteValidator = z.object({
    postId:z.string(),
    voteType:z.enum(['UP' , 'DOWN']),
})

export type PostVoteRequest= z.infer<typeof PostVoteValidator>


//for comment votes

export const CommentVoteValidator = z.object({
    commentId:z.string(),
    voteType:z.enum(['UP' , 'DOWN']),
})

export type CommentVoteRequest= z.infer<typeof CommentVoteValidator>



