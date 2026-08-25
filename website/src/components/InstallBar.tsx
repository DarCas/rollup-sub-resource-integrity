import { useCopy } from '../hooks/useCopy'
import { CheckIcon, CopyIcon } from './icons'

const INSTALL_CMD = 'npm i -D @darcas/rollup-sub-resource-integrity'

export function InstallBar({ id }: { id?: string }) {
  const [copied, copy] = useCopy()

  return (
    <div className="install-bar" id={id}>
      <code className="install-bar__cmd" aria-label="Install command">
        <span aria-hidden className="tok-punct">$&nbsp;</span>
        {INSTALL_CMD}
      </code>
      <button
        type="button"
        className={`install-bar__copy${copied ? ' is-copied' : ''}`}
        onClick={() => copy(INSTALL_CMD)}
        aria-label={copied ? 'Copied to clipboard' : 'Copy install command'}
      >
        {copied ? <CheckIcon /> : <CopyIcon size={16} />}
      </button>
    </div>
  )
}
