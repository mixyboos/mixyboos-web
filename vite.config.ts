import reactRefresh from '@vitejs/plugin-react-refresh'
import * as fs from 'fs'
import { defineConfig } from 'vite'

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [reactRefresh()],
  server: {
    https: {
      key: fs.readFileSync('../certs/dev.mixyboos.com.key'),
      cert: fs.readFileSync('../certs/dev.mixyboos.com.crt'),
    },
  },
})
