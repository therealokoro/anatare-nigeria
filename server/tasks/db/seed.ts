import { eq } from "drizzle-orm"
import { db } from "@nuxthub/db"
import { user } from "#auth/schema"

// ✅ Singleton — initialized once at module level, not per-request
const auth = serverAuth()

export default defineTask({
  meta: {
    name: "db:seed",
    description: "Seed the database with the admin user",
  },
  async run() {
    console.log("Running db:seed task...")

    const config = useRuntimeConfig()

    if (!config.adminEmail || !config.adminPass) {
      return { result: "Missing admin credentials in runtime config" }
    }

    const [adminExists] = await db
      .select()
      .from(user)
      .where(eq(user.email, config.adminEmail))

    if (adminExists) {
      console.log("Admin already exists, skipping.")
      return { result: "Skipped" }
    }

    console.log("Creating admin user...")

    await auth.api.signUpEmail({
      body: {
        name: "Administrator",
        email: config.adminEmail,
        password: config.adminPass,
      },
    })

    console.log("Admin created successfully.")
    return { result: "Success" }
  },
})