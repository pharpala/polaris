import type { ReactNode } from 'react'

/** A bottom sheet inside the device. Used for language and for any choice
 *  that belongs behind a field rather than on the page. */
export default function Sheet({
  open,
  onClose,
  title,
  body,
  done,
  children,
}: {
  open: boolean
  onClose: () => void
  title: string
  body?: string
  done: string
  children: ReactNode
}) {
  return (
    <div className={`sheet${open ? ' sheet--open' : ''}`}>
      <button
        className="sheet__scrim"
        onClick={onClose}
        aria-label={done}
        tabIndex={open ? 0 : -1}
      />
      <div className="sheet__panel" role="dialog" aria-modal="true" aria-label={title}>
        <h2 className="sheet__h">{title}</h2>
        {body && <p className="sheet__p">{body}</p>}
        {children}
        <button className="btn btn--primary" onClick={onClose}>
          {done}
        </button>
      </div>
    </div>
  )
}
