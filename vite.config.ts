import react from '@vitejs/plugin-react'
import { defineConfig } from 'vite'

export default defineConfig({
  // GitHub Pages serves a project site from a subpath, so the deploy
  // workflow sets BASE=/polaris/. Local dev and preview stay at the root.
  base: process.env.BASE ?? '/',
  plugins: [react()],
})
