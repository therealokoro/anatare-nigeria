import { eq } from "drizzle-orm"
import { db } from "@nuxthub/db"
import { user } from "#auth/schema"

export default defineTask({
  meta: {
    name: "db:seed",
    description: "Run database seed",
  },
  async run() {
    console.log("Running DB seed task...");

    const config = useRuntimeConfig()
    const auth = serverAuth()

    const [adminExist] = await db.select().from(user).where(eq(user.email, config.adminEmail))

    if (adminExist) {
      console.log("Admin already exists, skipping seed.")
      return { result: "Skipped" }
    }

    console.log("Creating admin...")

    await auth.api.signUpEmail({
      body: {
        name: "Administrator",
        email: config.adminEmail,
        password: config.adminPass
      }
    })

    console.log("Admin created successfully.")
    return { result: "Success" }
  },
})