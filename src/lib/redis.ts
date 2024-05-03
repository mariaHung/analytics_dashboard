import { Redis } from '@upstash/redis'

export const redis = new Redis({
  url: 'https://us1-key-imp-40934.upstash.io',
  token: process.env.REDIS_KEY!,
})