import { useState, type ReactNode } from "react";
import { Link } from "react-router-dom";
import { BookmarkCheck } from "lucide-react";
import { useStore } from "@/store/useStore";
import { SavedProfilesDrawer } from "./SavedProfilesDrawer";
import { cn } from "@/utils/styles";

interface LayoutProps {
  children: ReactNode;
  className?: string;
}

export function Layout({ children, className }: LayoutProps) {
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const { savedProfiles } = useStore();

  return (
    <div className="min-h-screen" style={{ backgroundColor: '#F5F2ED' }}>
      {/* Navbar */}
      <header
        className="sticky top-0 z-30"
        style={{
          backgroundColor: 'rgba(245, 242, 237, 0.85)',
          backdropFilter: 'blur(16px)',
          WebkitBackdropFilter: 'blur(16px)',
          borderBottom: '1px solid rgba(28, 25, 23, 0.07)',
        }}
      >
        <div className="max-w-6xl mx-auto px-6 h-16 flex items-center justify-between">
          <Link to="/" className="flex items-center gap-2 group">
            <span
              className="font-display text-xl font-semibold tracking-tight"
              style={{ color: '#1C1917', fontFamily: "'Playfair Display', serif" }}
            >
              Vibe<em className="not-italic" style={{ color: '#92400E' }}>Coder</em>
            </span>
          </Link>

          <button
            onClick={() => setIsDrawerOpen(true)}
            className="flex items-center gap-2.5 group transition-all duration-200"
            style={{
              padding: '8px 16px',
              backgroundColor: '#1C1917',
              color: '#F5F2ED',
              borderRadius: '99px',
              fontSize: '13px',
              fontWeight: 500,
              letterSpacing: '0.01em',
              border: 'none',
              cursor: 'pointer',
            }}
          >
            <BookmarkCheck className="w-3.5 h-3.5 opacity-80" />
            <span>Saved</span>
            {savedProfiles.length > 0 && (
              <span
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  width: '18px',
                  height: '18px',
                  backgroundColor: '#92400E',
                  borderRadius: '99px',
                  fontSize: '11px',
                  fontWeight: 600,
                  color: '#fff',
                }}
              >
                {savedProfiles.length}
              </span>
            )}
          </button>
        </div>
      </header>

      {/* Main */}
      <main className={cn("max-w-6xl mx-auto px-6 pb-16", className)}>
        {children}
      </main>

      <SavedProfilesDrawer
        isOpen={isDrawerOpen}
        onClose={() => setIsDrawerOpen(false)}
      />
    </div>
  );
}
