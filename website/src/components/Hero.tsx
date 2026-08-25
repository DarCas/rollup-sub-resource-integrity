import { InstallBar } from './InstallBar'
import type { ReactNode } from 'react'
import { CheckIcon, GitHubIcon, ShieldIcon } from './icons'

function PipelineNodeBox({ label, column, children }: { label: string; column: number; children: ReactNode }) {
  return (
    <>
      <div className="pipeline__node-box">{children}</div>
      <span className="pipeline__node-label" style={{ gridRow: 2, gridColumn: column }}>
        {label}
      </span>
    </>
  )
}

export function Hero() {
  return (
    <section className="hero" id="top" aria-labelledby="hero-title">
      <div className="container hero__inner">
        <p className="eyebrow">Security / Build Tooling</p>

        <h1 id="hero-title">Subresource Integrity for Rollup.</h1>

        <p className="hero__subtitle">
          Automatically generate Subresource Integrity hashes for assets produced by
          your Rollup build.
        </p>

        <div className="hero__actions">
          <a className="btn btn--primary" href="#install">
            Get Started
          </a>
          <a
            className="btn btn--secondary"
            href="https://github.com/DarCas/rollup-sub-resource-integrity"
            target="_blank"
            rel="noopener noreferrer"
          >
            <GitHubIcon size={16} />
            View on GitHub
          </a>
        </div>

        <InstallBar />

        <div className="pipeline" role="img" aria-label="Pipeline: Rollup build produces assets, assets are hashed with SHA-384, integrity attribute is injected into HTML, browser verifies the resource.">
          <div className="pipeline__track">
            <PipelineNodeBox label="Rollup Build" column={1}>
              <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinejoin="round" aria-hidden>
                <path d="M12 3 4 7.5v9L12 21l8-4.5v-9L12 3Z" />
                <path d="M4 7.5 12 12l8-4.5M12 12v9" opacity="0.6" />
              </svg>
            </PipelineNodeBox>
            <span className="pipeline__connector">
              <span className="pipeline__dot" />
            </span>
            <PipelineNodeBox label="SHA‑384 Hash" column={3}>
              <span className="mono" style={{ fontSize: 15 }} aria-hidden>#</span>
            </PipelineNodeBox>
            <span className="pipeline__connector">
              <span className="pipeline__dot" style={{ animationDelay: '-1.75s' }} />
            </span>
            <PipelineNodeBox label="Integrity Attr" column={5}>
              <ShieldIcon size={22} />
            </PipelineNodeBox>
            <span className="pipeline__connector">
              <span className="pipeline__dot" style={{ animationDelay: '-3.5s' }} />
            </span>
            <PipelineNodeBox label="Verified Resource" column={7}>
              <CheckIcon size={20} />
            </PipelineNodeBox>
          </div>
        </div>
      </div>
    </section>
  )
}
