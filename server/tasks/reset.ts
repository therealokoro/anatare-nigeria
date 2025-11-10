import { articles, user } from "../database/schema"

export default defineTask({
  meta: {
    name: "db:reset",
    description: "Run database reset",
  },
  async run() {
    console.log("Running DB reset task...");
    await useDB().delete(articles)
    return { result: "Success" };
  },
});
