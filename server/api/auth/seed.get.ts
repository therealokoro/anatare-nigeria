import { eq } from "drizzle-orm"
import { db } from "@nuxthub/db"
import { user } from "#auth/schema"


export default eventHandler(async (event) => {  
  console.log("Running DB seed task...");

  const requestHeaders = getRequestHeaders(event)
  console.log("Request headers:", requestHeaders)

  const config = useRuntimeConfig()
  const auth = serverAuth()

  console.log("credentials", { email: config.adminEmail, pass: config.adminPass })

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
    },
    headers: new Headers(requestHeaders as HeadersInit)
  })

  console.log("Admin created successfully.")
  return { result: "Success" }  
});
