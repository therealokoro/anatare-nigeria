import { user } from "../../database/schema"

export default defineEventHandler(async () => {
  console.log("Running DB seed task...");

  const config = useRuntimeConfig()
  const auth = useServerAuth()

  const adminExist = await useDB().query.user.findFirst({ where: eq(user.email, config.adminEmail) })

  if(!adminExist){ 
    await auth.api.signUpEmail({
      body: {
        name: "Administrator",
        email: config.adminEmail,
        password: config.adminPass
      }
    })
  }

  return { result: 'Success' }
});
