import react from '@vitejs/plugin-react'
import { defineConfig, loadEnv, type Plugin } from 'vite'
import chatHandler from './api/chat.ts'

function apiChatPlugin(mode: string, env: Record<string, string>): Plugin {
  return {
    name: 'api-chat-plugin',
    configureServer(server) {
      // Ensure GROQ_API_KEY and GROQ_MODEL loaded from .env are available in process.env
      if (env.GROQ_API_KEY) {
        process.env.GROQ_API_KEY = env.GROQ_API_KEY
      }
      if (env.GROQ_MODEL) {
        process.env.GROQ_MODEL = env.GROQ_MODEL
      }

      server.middlewares.use('/api/chat', async (req, res) => {
        try {
          const freshEnv = loadEnv(mode, process.cwd(), '')
          if (freshEnv.GROQ_API_KEY) {
            process.env.GROQ_API_KEY = freshEnv.GROQ_API_KEY
          }
          if (freshEnv.GROQ_MODEL) {
            process.env.GROQ_MODEL = freshEnv.GROQ_MODEL
          }
          await chatHandler(req, res)
        } catch (err) {
          console.error('Unhandled error in local /api/chat:', err)
          res.statusCode = 500
          res.setHeader('Content-Type', 'application/json')
          res.end(
            JSON.stringify({
              error: 'Internal server error in local development middleware',
            }),
          )
        }
      })
    },
  }
}

// https://vite.dev/config/
export default defineConfig(({ mode }) => {
  const env = loadEnv(mode, process.cwd(), '')
  return {
    plugins: [react(), apiChatPlugin(mode, env)],
  }
})
