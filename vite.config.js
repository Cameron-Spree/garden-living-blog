import { defineConfig } from 'vite'

export default defineConfig({
    server: {
        host: true, // Needed for Codespaces to map the port correctly
        port: 5173
    }
})
