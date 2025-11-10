import { useServerAuth } from "~~/server/utils/auth"

export default eventHandler(event => useServerAuth().handler(toWebRequest(event)))
