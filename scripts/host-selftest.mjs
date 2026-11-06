import { dirname, join } from 'node:path'
import { fileURLToPath, pathToFileURL } from 'node:url'

const here = dirname(fileURLToPath(import.meta.url))
const entry = pathToFileURL(join(here, '..', 'index.js')).href
const mod = await import(entry)

console.log('exports:', Object.keys(mod).join(', '))
console.log('inject:', JSON.stringify(mod.inject))
if (!Array.isArray(mod.inject) || !mod.inject.includes('webServer')) {
  console.log('FAIL: inject must declare webServer')
  process.exitCode = 1
}

const registrations = []
const effects = []
const fakeCtx = {
  webServer: {
    register(route) {
      registrations.push({ kind: route.kind, path: route.path })
      return () => {}
    },
  },
  get(name) {
    return undefined
  },
  logger: { info() {}, warn() {} },
  effect(factory, label) {
    const disposer = factory()
    effects.push({ label, disposer })
    return () => {}
  },
}

mod.apply(fakeCtx, {})
console.log('route registrations:', JSON.stringify(registrations))
console.log('effects:', effects.map((item) => item.label).join(' | '))
const route = registrations[0]
if (!route || route.kind !== 'prefix' || route.path !== '/api/inspiration') {
  console.log('FAIL: expected a prefix route on /api/inspiration')
  process.exitCode = 1
} else {
  console.log('PASS: HTTP surface registered through ctx.webServer')
}

// A cold-start ctx whose webServer is missing must not be reached at all once
// `inject` is declared, but the body should still be safe if it ever is.
const noServer = {
  get() {
    return undefined
  },
  logger: { info() {}, warn() {} },
  effect() {
    return () => {}
  },
}
try {
  mod.apply(noServer, {})
  console.log('PASS: apply with missing services stays harmless')
} catch (error) {
  console.log('FAIL: apply threw without services:', error.message)
  process.exitCode = 1
}