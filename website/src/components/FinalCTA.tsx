import { GitHubIcon } from './icons'
import { InstallBar } from './InstallBar'

export function FinalCTA() {
  return (
    <section className="section final-cta" id="get-started" aria-labelledby="final-title">
      <div className="container final-cta__inner reveal">
        <h2 id="final-title">Ready to add integrity to your build?</h2>
        <p>
          Install Rollup Subresource Integrity and let your build handle the hashes for you.
        </p>
        <InstallBar />
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
      </div>
    </section>
  )
}
