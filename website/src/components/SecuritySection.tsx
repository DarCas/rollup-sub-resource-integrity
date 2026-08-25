import { CheckIcon, ChevronDownIcon, XIcon } from './icons'

export function SecuritySection() {
  return (
    <section className="section section--divided" id="security" aria-labelledby="security-title">
      <hr className="section-divider" />
      <div className="container" style={{ paddingTop: 'clamp(64px, 9vw, 112px)' }}>
        <div className="reveal section-head" style={{ textAlign: 'center' }}>
          <p className="eyebrow" style={{ justifyContent: 'center' }}>Security</p>
          <h2 className="section-title" id="security-title">
            Integrity you can verify.
          </h2>
        </div>

        <div className="sec-flow reveal" role="img" aria-label="Verification flow: the expected resource is hashed with SHA-384; the downloaded resource is hashed in the browser; if the hashes match the resource is executed, otherwise it is blocked.">
          <div className="sec-step">
            <p className="sec-step__label">
              <strong>Expected resource</strong> — declared in HTML
            </p>
            <span className="sec-step__hash">sha384-V9kQ3mZxL8fJ…</span>
          </div>

          <span className="sec-link" aria-hidden><ChevronDownIcon /></span>

          <div className="sec-step">
            <p className="sec-step__label">
              <strong>Downloaded resource</strong> — hashed by the browser
            </p>
            <span className="sec-step__hash">sha384-V9kQ3mZxL8fJ…</span>
          </div>

          <span className="sec-link" aria-hidden><ChevronDownIcon /></span>

          <div className="sec-step">
            <p className="sec-step__label"><strong>Browser verification</strong> — hash comparison</p>
          </div>

          <div className="sec-verdicts">
            <p className="sec-verdict sec-verdict--match">
              <CheckIcon size={14} /> MATCH → executes
            </p>
            <p className="sec-verdict sec-verdict--mismatch">
              <XIcon size={14} /> MISMATCH → blocked
            </p>
          </div>
        </div>
      </div>
    </section>
  )
}
