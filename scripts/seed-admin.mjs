import { hashPassword } from "better-auth/crypto"

const {
  NUXT_ADMIN_EMAIL: email,
  NUXT_ADMIN_PASS: password,
} = process.env

if (!email || !password) {
  console.error("❌ Missing NUXT_ADMIN_EMAIL or NUXT_ADMIN_PASS")
  process.exit(1)
}

const hashed = await hashPassword(password)

// Write only the hash to stdout so the workflow can capture it cleanly
process.stdout.write(hashed)