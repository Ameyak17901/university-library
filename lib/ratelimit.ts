import redis from "@/database/redis";
import { Ratelimit } from "@upstash/ratelimit";

const ratelimit = new Ratelimit({
  redis: redis,
  limiter: Ratelimit.fixedWindow(5, "1m"),
  prefix: "@upstash/ratelimit",
});

export default ratelimit;
