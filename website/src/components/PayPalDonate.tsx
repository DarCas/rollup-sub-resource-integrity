import { HeartIcon } from './icons'

const HOSTED_BUTTON_ID = 'YZQDE3TEYDBWA'

export function PayPalDonate({ className = 'btn btn--donate' }: { className?: string }) {
  return (
    <form
      action="https://www.paypal.com/cgi-bin/webscr"
      method="post"
      target="_blank"
      rel="noopener noreferrer"
    >
      <input type="hidden" name="cmd" value="_s-xclick" />
      <input type="hidden" name="hosted_button_id" value={HOSTED_BUTTON_ID} />
      <button type="submit" className={className}>
        <HeartIcon size={16} />
        Buy me a coffee
      </button>
    </form>
  )
}
