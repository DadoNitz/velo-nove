import { readdirSync } from 'node:fs'
import { defineConfig } from 'vite'
import react from '@vitejs/plugin-react'

// base './' keeps every asset path relative, so the build works on GitHub Pages under any repo name.
// __IMG__: what is in public/img at build time, so briefed photos (docs/image-briefs.md) are used only once they exist.
export default defineConfig({ base: './', plugins: [react()], define: { __IMG__: JSON.stringify(readdirSync('public/img')) } })
