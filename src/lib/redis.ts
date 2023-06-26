import {Redis} from "@upstash/redis"

export const redis= new Redis({
    url: process.env.REDIS_SECRET!,
    token: process.env.REDIS_SECRET!,
})