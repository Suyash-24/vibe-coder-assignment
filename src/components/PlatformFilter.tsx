import type { Platform } from "@/types";
import { PLATFORMS, getPlatformLabel } from "@/utils/dataHelpers";


interface PlatformFilterProps {
  selected: Platform;
  onChange: (platform: Platform) => void;
  searchQuery: string;
  onSearchChange: (value: string) => void;
}

const platformIcons: Record<Platform, string> = {
  instagram: "📷",
  youtube: "▶",
  tiktok: "♪",
};

export function PlatformFilter({
  selected,
  onChange,
  searchQuery,
  onSearchChange,
}: PlatformFilterProps) {
  return (
    <div className="mb-8">
      {/* Search bar */}
      <div className="relative max-w-lg mx-auto mb-8">
        <svg
          className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 pointer-events-none"
          style={{ color: '#A8A29E' }}
          viewBox="0 0 24 24"
          fill="none"
          stroke="currentColor"
          strokeWidth="2"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <circle cx="11" cy="11" r="8" />
          <path d="m21 21-4.35-4.35" />
        </svg>
        <input
          type="text"
          value={searchQuery}
          onChange={(e) => onSearchChange(e.target.value)}
          placeholder="Search by name or username..."
          style={{
            width: '100%',
            paddingLeft: '44px',
            paddingRight: '16px',
            paddingTop: '13px',
            paddingBottom: '13px',
            backgroundColor: '#FFFFFF',
            border: '1px solid rgba(28, 25, 23, 0.1)',
            borderRadius: '14px',
            fontSize: '14px',
            color: '#1C1917',
            outline: 'none',
            boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
            transition: 'border-color 0.2s, box-shadow 0.2s',
          }}
          onFocus={(e) => {
            e.target.style.borderColor = '#1C1917';
            e.target.style.boxShadow = '0 0 0 3px rgba(28, 25, 23, 0.06)';
          }}
          onBlur={(e) => {
            e.target.style.borderColor = 'rgba(28, 25, 23, 0.1)';
            e.target.style.boxShadow = '0 1px 4px rgba(0,0,0,0.04)';
          }}
        />
      </div>

      {/* Platform Tabs */}
      <div className="flex justify-center">
        <div
          className="flex gap-1 p-1 rounded-xl"
          style={{ backgroundColor: 'rgba(28, 25, 23, 0.06)' }}
        >
          {PLATFORMS.map((p) => (
            <button
              key={p}
              type="button"
              onClick={() => onChange(p)}
              className="flex items-center gap-2 transition-all duration-200"
              style={{
                padding: '8px 20px',
                borderRadius: '10px',
                fontSize: '13px',
                fontWeight: selected === p ? 600 : 400,
                border: 'none',
                cursor: 'pointer',
                backgroundColor: selected === p ? '#1C1917' : 'transparent',
                color: selected === p ? '#F5F2ED' : '#78716C',
                boxShadow: selected === p ? '0 2px 8px rgba(28,25,23,0.2)' : 'none',
                letterSpacing: '0.01em',
              }}
            >
              <span style={{ fontSize: '12px' }}>{platformIcons[p]}</span>
              {getPlatformLabel(p)}
            </button>
          ))}
        </div>
      </div>
    </div>
  );
}
