/**
 * Shown when a data-driven collection has no entries — for example, no
 * projects matching the current filter, or no certifications on record.
 * A blank region would read as a bug; this reads as an intentional state.
 */
export default function EmptyState({ title, message, action }) {
  return (
    <div className="empty-state" role="status">
      <span className="empty-state-mark" aria-hidden="true">
        {'{ }'}
      </span>
      <p className="empty-state-title">{title}</p>
      {message && <p className="empty-state-message">{message}</p>}
      {action}
    </div>
  );
}
