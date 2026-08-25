import { StrictMode } from 'react'
import { createRoot, hydrateRoot } from 'react-dom/client'
import App from './App'
import './styles/global.css'
import './styles/components.css'
import { useRevealOnScroll } from './hooks/useReveal'

function Root() {
  useRevealOnScroll()
  return <App />
}

function mount() {
  const container = document.getElementById('root')!
  const tree = (
    <StrictMode>
      <Root />
    </StrictMode>
  )

  // When the prerendered HTML (from scripts/prerender.mjs) is present, hydrate so the
  // server-rendered markup is reused. In dev (no prerender) fall back to a client render.
  if (container.hasChildNodes()) {
    hydrateRoot(container, tree)
  } else {
    createRoot(container).render(tree)
  }
}

mount()
