// Generates docs/preview.png (real-time wait so entrances finish). Needs `npx vite preview --port 4791` running.
// Usage: node scripts/preview.mjs [url] [out.png] [scrollY] [reduce]
import { spawn } from 'node:child_process'
import { existsSync, mkdirSync, writeFileSync } from 'node:fs'

const chrome = [process.env.CHROME_PATH, 'C:/Program Files/Google/Chrome/Application/chrome.exe', '/usr/bin/google-chrome', '/usr/bin/chromium'].find((p) => p && existsSync(p))
if (!chrome) throw new Error('Chrome not found: set CHROME_PATH')
const [url = 'http://localhost:4791/', out = 'docs/preview.png', scrollY = '0', reduce] = process.argv.slice(2)
mkdirSync('docs', { recursive: true })
const proc = spawn(chrome, ['--headless=new', '--hide-scrollbars', '--remote-debugging-port=9333', '--window-size=1440,900', '--user-data-dir=' + process.env.TEMP + '/velo-prev', 'about:blank'], { stdio: 'ignore' })
const sleep = (ms) => new Promise((r) => setTimeout(r, ms))
let tabs
for (let i = 0; i < 40 && !tabs; i++) { await sleep(250); tabs = await fetch('http://localhost:9333/json').then((r) => r.json()).catch(() => null) }
const ws = new WebSocket(tabs.find((t) => t.type === 'page').webSocketDebuggerUrl)
await new Promise((r) => (ws.onopen = r))
let id = 0; const pending = new Map()
ws.onmessage = (m) => { const d = JSON.parse(m.data); pending.get(d.id)?.(d.result) }
const cdp = (method, params = {}) => new Promise((r) => { pending.set(++id, r); ws.send(JSON.stringify({ id, method, params })) })
await cdp('Emulation.setDeviceMetricsOverride', { width: 1440, height: 900, deviceScaleFactor: 1, mobile: false })
if (reduce) await cdp('Emulation.setEmulatedMedia', { features: [{ name: 'prefers-reduced-motion', value: 'reduce' }] })
await cdp('Page.navigate', { url })
await sleep(2500)
if (+scrollY) { await cdp('Runtime.evaluate', { expression: `document.documentElement.style.scrollBehavior='auto';scrollTo(0,${+scrollY})` }); await sleep(3500) } else await sleep(2500)
if (process.env.EVAL) console.log((await cdp('Runtime.evaluate', { expression: process.env.EVAL, returnByValue: true })).result.value)
const { data } = await cdp('Page.captureScreenshot', { format: 'png' })
writeFileSync(out, Buffer.from(data, 'base64'))
ws.close(); proc.kill()
