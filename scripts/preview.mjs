// Generates docs/preview.png with headless Chrome. Usage: npm run build && npx vite preview --port 4791 & node scripts/preview.mjs
import { spawnSync } from 'node:child_process'
import { existsSync, mkdirSync } from 'node:fs'
import { resolve } from 'node:path'

const chrome = [process.env.CHROME_PATH, 'C:/Program Files/Google/Chrome/Application/chrome.exe', '/usr/bin/google-chrome', '/usr/bin/chromium'].find((p) => p && existsSync(p))
if (!chrome) throw new Error('Chrome not found: set CHROME_PATH')
mkdirSync('docs', { recursive: true })
spawnSync(chrome, ['--headless=new', '--hide-scrollbars', '--window-size=1440,900', '--virtual-time-budget=4000', '--screenshot=' + resolve('docs/preview.png'), process.argv[2] ?? 'http://localhost:4791/'], { stdio: 'inherit' })
