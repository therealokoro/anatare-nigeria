import { seedCommand } from "~~/server/tasks/seed"

export default defineEventHandler(async () => {
  return seedCommand()
});
