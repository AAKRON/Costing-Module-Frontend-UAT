import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  server: {
    port: 3000,
  },
  build: {
    outDir: 'build',
  },
  define: {
    // Polyfill process.env so any missed REACT_APP_ refs degrade to undefined
    'process.env': {},
  },
})
