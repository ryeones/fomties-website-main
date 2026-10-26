import { defineConfig } from 'astro/config'

export default defineConfig({
  site: 'https://www.fomties.com',
  trailingSlash: 'never',
  build: { format: 'file' },
})
