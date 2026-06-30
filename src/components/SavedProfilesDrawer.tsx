import { X, Trash2, BookmarkCheck } from "lucide-react";
import { motion, AnimatePresence } from "framer-motion";
import { useStore } from "@/store/useStore";
import { getPlatformLabel } from "@/utils/dataHelpers";
import { proxyImageUrl } from "@/utils/styles";

interface SavedProfilesDrawerProps {
  isOpen: boolean;
  onClose: () => void;
}

export function SavedProfilesDrawer({ isOpen, onClose }: SavedProfilesDrawerProps) {
  const { savedProfiles, removeProfile } = useStore();

  return (
    <AnimatePresence>
      {isOpen && (
        <>
          {/* Backdrop */}
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            onClick={onClose}
            style={{
              position: 'fixed',
              inset: 0,
              backgroundColor: 'rgba(28, 25, 23, 0.35)',
              backdropFilter: 'blur(4px)',
              zIndex: 40,
            }}
          />

          {/* Drawer */}
          <motion.div
            initial={{ x: "100%" }}
            animate={{ x: 0 }}
            exit={{ x: "100%" }}
            transition={{ type: "spring", bounce: 0.05, duration: 0.45 }}
            style={{
              position: 'fixed',
              right: 0,
              top: 0,
              height: '100%',
              width: '100%',
              maxWidth: '400px',
              backgroundColor: '#FAFAF8',
              boxShadow: '-20px 0 60px rgba(0,0,0,0.12)',
              zIndex: 50,
              display: 'flex',
              flexDirection: 'column',
            }}
          >
            {/* Header */}
            <div
              style={{
                padding: '24px',
                borderBottom: '1px solid rgba(28, 25, 23, 0.07)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'space-between',
              }}
            >
              <div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '8px', marginBottom: '2px' }}>
                  <BookmarkCheck style={{ width: '16px', height: '16px', color: '#92400E' }} />
                  <h2 style={{ fontFamily: "'Playfair Display', serif", fontSize: '20px', fontWeight: 600, color: '#1C1917', letterSpacing: '-0.01em' }}>
                    Saved Creators
                  </h2>
                </div>
                <p style={{ fontSize: '12px', color: '#A8A29E' }}>
                  {savedProfiles.length} {savedProfiles.length === 1 ? 'creator' : 'creators'} in your list
                </p>
              </div>
              <button
                onClick={onClose}
                style={{
                  padding: '8px',
                  borderRadius: '10px',
                  border: '1px solid rgba(28,25,23,0.08)',
                  backgroundColor: 'transparent',
                  cursor: 'pointer',
                  color: '#78716C',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  transition: 'all 0.2s',
                }}
                onMouseEnter={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor = '#FFFFFF';
                  (e.currentTarget as HTMLElement).style.color = '#1C1917';
                }}
                onMouseLeave={(e) => {
                  (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent';
                  (e.currentTarget as HTMLElement).style.color = '#78716C';
                }}
              >
                <X style={{ width: '16px', height: '16px' }} />
              </button>
            </div>

            {/* Body */}
            <div style={{ flex: 1, overflowY: 'auto', padding: '16px' }}>
              {savedProfiles.length === 0 ? (
                <div style={{ textAlign: 'center', padding: '60px 20px' }}>
                  <div
                    style={{
                      width: '56px',
                      height: '56px',
                      borderRadius: '50%',
                      backgroundColor: 'rgba(146, 64, 14, 0.07)',
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      margin: '0 auto 16px',
                    }}
                  >
                    <BookmarkCheck style={{ width: '24px', height: '24px', color: '#92400E', opacity: 0.5 }} />
                  </div>
                  <p style={{ fontSize: '15px', fontWeight: 600, color: '#1C1917', marginBottom: '6px' }}>No creators saved yet</p>
                  <p style={{ fontSize: '13px', color: '#A8A29E', lineHeight: 1.5 }}>
                    Browse and save creators to build your campaign list
                  </p>
                </div>
              ) : (
                <div style={{ display: 'flex', flexDirection: 'column', gap: '8px' }}>
                  {savedProfiles.map((profile) => (
                    <div
                      key={profile.username}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '12px',
                        padding: '12px 14px',
                        backgroundColor: '#FFFFFF',
                        borderRadius: '14px',
                        border: '1px solid rgba(28, 25, 23, 0.07)',
                        boxShadow: '0 1px 3px rgba(0,0,0,0.03)',
                      }}
                    >
                      <img
                        src={proxyImageUrl(profile.picture)}
                        alt={profile.username}
                        onError={(e) => {
                          e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(profile.fullname || profile.username)}&background=E7E5E4&color=44403C&bold=true&size=64`;
                        }}
                        referrerPolicy="no-referrer"
                        style={{
                          width: '44px',
                          height: '44px',
                          borderRadius: '50%',
                          objectFit: 'cover',
                          border: '1.5px solid rgba(28,25,23,0.07)',
                          flexShrink: 0,
                        }}
                      />
                      <div style={{ flex: 1, minWidth: 0 }}>
                        <p style={{ fontSize: '13px', fontWeight: 600, color: '#1C1917', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          {profile.fullname}
                        </p>
                        <p style={{ fontSize: '11px', color: '#A8A29E', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                          @{profile.username} · {getPlatformLabel(profile.platform)}
                        </p>
                      </div>
                      <button
                        onClick={() => removeProfile(profile.username)}
                        title="Remove"
                        style={{
                          padding: '6px',
                          borderRadius: '8px',
                          border: 'none',
                          backgroundColor: 'transparent',
                          color: '#D4B896',
                          cursor: 'pointer',
                          flexShrink: 0,
                          display: 'flex',
                          alignItems: 'center',
                          transition: 'all 0.2s',
                        }}
                        onMouseEnter={(e) => {
                          (e.currentTarget as HTMLElement).style.backgroundColor = '#FEF2F2';
                          (e.currentTarget as HTMLElement).style.color = '#B91C1C';
                        }}
                        onMouseLeave={(e) => {
                          (e.currentTarget as HTMLElement).style.backgroundColor = 'transparent';
                          (e.currentTarget as HTMLElement).style.color = '#D4B896';
                        }}
                      >
                        <Trash2 style={{ width: '13px', height: '13px' }} />
                      </button>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {savedProfiles.length > 0 && (
              <div
                style={{
                  padding: '16px 24px',
                  borderTop: '1px solid rgba(28, 25, 23, 0.07)',
                  backgroundColor: '#FAFAF8',
                }}
              >
                <p style={{ fontSize: '12px', color: '#A8A29E', textAlign: 'center' }}>
                  {savedProfiles.length} creator{savedProfiles.length !== 1 ? 's' : ''} selected for your campaign
                </p>
              </div>
            )}
          </motion.div>
        </>
      )}
    </AnimatePresence>
  );
}
