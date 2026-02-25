import { eq } from "drizzle-orm"
import { db } from "@nuxthub/db"
import { user } from "#auth/schema"

export async function seedCommand(){
  console.log("Running DB seed task...");

  const config = useRuntimeConfig()
  const auth = serverAuth()

  const [adminExist] = await db.select().from(user).where(eq(user.email, config.adminEmail))

  console.log(adminExist)

  if(!adminExist){
    console.log('Creating admin...')
    await auth.api.signUpEmail({
      body: {
        name: "Administrator",
        email: config.adminEmail,
        password: config.adminPass
      }
    })
    console.log('Finished creating admin....')
  }
  return { result: "Success" };
}

export default defineTask({
  meta: {
    name: "db:seed",
    description: "Run database seed",
  },
  async run() {
    return seedCommand()
  },
});
