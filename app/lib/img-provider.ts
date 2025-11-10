import { defineProvider, createOperationsGenerator } from '@nuxt/image/runtime'
import { joinURL } from 'ufo'

const operationsGenerator = createOperationsGenerator()

export default defineProvider<{ baseURL?: string }>({
  getImage (src, { modifiers, baseURL }) {
    // Use configured baseURL or fallback to runtimeConfig
    if (!baseURL) {
      baseURL = "/"
    }
    
    const ops = operationsGenerator(modifiers)
    const url = joinURL(baseURL, src + (ops ? '?' + ops : ''))
    return { url }
  }
})