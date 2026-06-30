import { memo } from "react";
import { useNavigate } from "react-router-dom";
import { Bookmark, BookmarkCheck } from "lucide-react";
import type { Platform, UserProfileSummary } from "@/types";
import { VerifiedBadge } from "./VerifiedBadge";
import { useStore } from "@/store/useStore";
import { proxyImageUrl } from "@/utils/styles";

interface ProfileCardProps {
  profile: UserProfileSummary;
  platform: Platform;
  onProfileClick?: (username: string) => void;
}

function formatFollowersLocal(count: number) {
  if (count >= 1000000) return (count / 1000000).toFixed(1) + "M";
  if (count >= 1000) return (count / 1000).toFixed(0) + "K";
  return count.toString();
}

export const ProfileCard = memo(function ProfileCard({
  profile,
  platform,
  onProfileClick,
}: ProfileCardProps) {
  const navigate = useNavigate();
  const { addProfile, removeProfile, isProfileSaved } = useStore();
  const isSaved = isProfileSaved(profile.username);

  const handleClick = () => {
    if (onProfileClick) onProfileClick(profile.username);
    navigate(`/profile/${profile.username}?platform=${platform}`);
  };

  const handleListToggle = (e: React.MouseEvent) => {
    e.stopPropagation();
    if (isSaved) {
      removeProfile(profile.username);
    } else {
      addProfile(profile, platform);
    }
  };

  return (
    <div
      onClick={handleClick}
      className="group"
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '20px',
        padding: '20px',
        border: '1px solid rgba(28, 25, 23, 0.07)',
        cursor: 'pointer',
        transition: 'all 0.25s ease',
        boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
        position: 'relative',
        overflow: 'hidden',
      }}
      onMouseEnter={(e) => {
        (e.currentTarget as HTMLElement).style.transform = 'translateY(-3px)';
        (e.currentTarget as HTMLElement).style.boxShadow = '0 12px 40px rgba(0,0,0,0.10)';
        (e.currentTarget as HTMLElement).style.borderColor = 'rgba(28, 25, 23, 0.14)';
      }}
      onMouseLeave={(e) => {
        (e.currentTarget as HTMLElement).style.transform = 'translateY(0)';
        (e.currentTarget as HTMLElement).style.boxShadow = '0 1px 4px rgba(0,0,0,0.04)';
        (e.currentTarget as HTMLElement).style.borderColor = 'rgba(28, 25, 23, 0.07)';
      }}
    >
      {/* Top section */}
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '16px' }}>
        <div style={{ position: 'relative' }}>
          <img
            src={proxyImageUrl(profile.picture)}
            alt={profile.username}
            onError={(e) => {
              e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(profile.fullname || profile.username)}&background=E7E5E4&color=44403C&bold=true&size=128`;
            }}
            referrerPolicy="no-referrer"
            style={{
              width: '56px',
              height: '56px',
              borderRadius: '50%',
              objectFit: 'cover',
              border: '2px solid rgba(28,25,23,0.07)',
              display: 'block',
            }}
          />
        </div>

        <button
          onClick={handleListToggle}
          title={isSaved ? "Remove from saved" : "Save creator"}
          style={{
            padding: '7px',
            borderRadius: '10px',
            border: '1px solid',
            borderColor: isSaved ? 'rgba(146, 64, 14, 0.2)' : 'rgba(28,25,23,0.08)',
            backgroundColor: isSaved ? 'rgba(146, 64, 14, 0.06)' : 'transparent',
            color: isSaved ? '#92400E' : '#A8A29E',
            cursor: 'pointer',
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            transition: 'all 0.2s ease',
          }}
          onMouseEnter={(e) => {
            if (!isSaved) {
              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(28,25,23,0.2)';
              (e.currentTarget as HTMLElement).style.color = '#1C1917';
            }
          }}
          onMouseLeave={(e) => {
            if (!isSaved) {
              (e.currentTarget as HTMLElement).style.borderColor = 'rgba(28,25,23,0.08)';
              (e.currentTarget as HTMLElement).style.color = '#A8A29E';
            }
          }}
        >
          {isSaved
            ? <BookmarkCheck style={{ width: '14px', height: '14px' }} />
            : <Bookmark style={{ width: '14px', height: '14px' }} />
          }
        </button>
      </div>

      {/* Content */}
      <div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '4px', marginBottom: '2px' }}>
          <span style={{ fontSize: '14px', fontWeight: 600, color: '#1C1917', letterSpacing: '-0.01em' }}>
            @{profile.username}
          </span>
          <VerifiedBadge verified={profile.is_verified} />
        </div>
        <p style={{ fontSize: '12px', color: '#A8A29E', marginBottom: '16px', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
          {profile.fullname}
        </p>

        {/* Divider */}
        <div style={{ borderTop: '1px solid rgba(28,25,23,0.06)', paddingTop: '14px', display: 'flex', alignItems: 'baseline', gap: '4px' }}>
          <span style={{ fontSize: '18px', fontWeight: 700, color: '#1C1917', fontFamily: "'Playfair Display', serif", letterSpacing: '-0.02em' }}>
            {formatFollowersLocal(profile.followers)}
          </span>
          <span style={{ fontSize: '11px', color: '#A8A29E', fontWeight: 500, textTransform: 'uppercase', letterSpacing: '0.06em' }}>
            followers
          </span>
        </div>
      </div>
    </div>
  );
});
