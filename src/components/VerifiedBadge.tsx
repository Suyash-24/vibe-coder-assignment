export function VerifiedBadge({ verified }: { verified: boolean }) {
  if (!verified) return null;
  return (
    <svg
      className="w-3.5 h-3.5 inline-block ml-0.5 shrink-0"
      viewBox="0 0 24 24"
      fill="none"
      style={{ color: '#92400E' }}
    >
      <path
        d="M9 12.75L11.25 15 15 9.75M21 12a9 9 0 1 1-18 0 9 9 0 0 1 18 0Z"
        stroke="currentColor"
        strokeWidth="1.75"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
