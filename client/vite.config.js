import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

export default defineConfig({
  plugins: [react()],
  // let Vite auto-detect PostCSS config (postcss.config.cjs)
})