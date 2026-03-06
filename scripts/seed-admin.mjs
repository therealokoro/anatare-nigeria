import { randomUUID } from "crypto"

const {
  NUXT_ADMIN_EMAIL: email,
  NUXT_ADMIN_PASS: password,
} = process.env

if (!email || !password) {
  console.error("❌ Missing NUXT_ADMIN_EMAIL or NUXT_ADMIN_PASS")
  process.exit(1)
}

// Generate a random salt
const salt = crypto.getRandomValues(new Uint8Array(16))
const saltHex = Buffer.from(salt).toString("hex")

// Hash the password with the salt using SHA-256 (Web Crypto API — same as Cloudflare Workers)
const encoder = new TextEncoder()
const data = encoder.encode(saltHex + password)
const hash = await crypto.subtle.digest("SHA-256", data)
const hashHex = Buffer.from(hash).toString("hex")

// Output in salt:hash format — matches the verify function in auth config
process.stdout.write(`${saltHex}:${hashHex}`)