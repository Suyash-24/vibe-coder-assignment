import { useEffect, useState } from "react";
import { Link, useParams, useSearchParams } from "react-router-dom";
import { ArrowLeft, Bookmark, BookmarkCheck } from "lucide-react";
import { Layout } from "@/components/Layout";
import { VerifiedBadge } from "@/components/VerifiedBadge";
import type { FullUserProfile, ProfileDetailResponse, Platform, UserProfileSummary } from "@/types";
import { loadProfileByUsername } from "@/utils/profileLoader";
import { useStore } from "@/store/useStore";
import { getPlatformLabel } from "@/utils/dataHelpers";
import { proxyImageUrl } from "@/utils/styles";

function formatStat(count: number | undefined) {
  if (count === undefined || count === null) return "—";
  if (count >= 1000000) return (count / 1000000).toFixed(2) + "M";
  if (count >= 1000) return (count / 1000).toFixed(1) + "K";
  return count.toLocaleString();
}

function StatCard({ label, value, sub }: { label: string; value: React.ReactNode; sub?: string }) {
  return (
    <div
      style={{
        backgroundColor: '#FFFFFF',
        borderRadius: '16px',
        padding: '20px',
        border: '1px solid rgba(28, 25, 23, 0.07)',
        boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
      }}
    >
      <p style={{ fontSize: '11px', fontWeight: 500, color: '#A8A29E', textTransform: 'uppercase', letterSpacing: '0.06em', marginBottom: '8px' }}>
        {label}
      </p>
      <p style={{ fontSize: '24px', fontWeight: 700, color: '#1C1917', fontFamily: "'Playfair Display', serif", letterSpacing: '-0.02em', lineHeight: 1 }}>
        {value}
      </p>
      {sub && <p style={{ fontSize: '11px', color: '#A8A29E', marginTop: '4px' }}>{sub}</p>}
    </div>
  );
}

const PLATFORM_COLORS: Record<string, string> = {
  instagram: '#C13584',
  youtube: '#FF0000',
  tiktok: '#010101',
  unknown: '#78716C',
};

export function ProfileDetailPage() {
  const { username } = useParams<{ username: string }>();
  const [searchParams] = useSearchParams();
  const platform = (searchParams.get("platform") as Platform) || "instagram";

  const [profileData, setProfileData] = useState<ProfileDetailResponse | null>(null);
  const [loaded, setLoaded] = useState(false);

  const { addProfile, removeProfile, isProfileSaved } = useStore();
  const isSaved = username ? isProfileSaved(username) : false;

  useEffect(() => {
    if (!username) return;
    loadProfileByUsername(username).then((data) => {
      setProfileData(data);
      setLoaded(true);
    });
  }, [username]);

  if (!username) {
    return (
      <Layout>
        <div style={{ textAlign: 'center', padding: '80px 0' }}>
          <p style={{ color: '#78716C' }}>Invalid profile</p>
          <Link to="/" style={{ color: '#92400E', textDecoration: 'underline', marginTop: '12px', display: 'inline-block' }}>Back to search</Link>
        </div>
      </Layout>
    );
  }

  if (!loaded) {
    return (
      <Layout>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', justifyContent: 'center', padding: '100px 0', gap: '16px' }}>
          <div
            style={{
              width: '36px',
              height: '36px',
              border: '2px solid rgba(28,25,23,0.1)',
              borderTopColor: '#1C1917',
              borderRadius: '50%',
              animation: 'spin 0.7s linear infinite',
            }}
          />
          <p style={{ color: '#A8A29E', fontSize: '14px' }}>Loading profile…</p>
          <style>{`@keyframes spin { to { transform: rotate(360deg); } }`}</style>
        </div>
      </Layout>
    );
  }

  if (!profileData) {
    return (
      <Layout>
        <div style={{ textAlign: 'center', padding: '80px 0' }}>
          <p style={{ color: '#92400E', marginBottom: '12px' }}>Could not load profile for {username}</p>
          <Link to="/" style={{ color: '#1C1917', fontWeight: 500, textDecoration: 'underline' }}>← Back to search</Link>
        </div>
      </Layout>
    );
  }

  const user: FullUserProfile = profileData.data.user_profile;

  const handleListToggle = () => {
    if (isSaved) {
      removeProfile(user.username);
    } else {
      const summary: UserProfileSummary = {
        user_id: user.user_id,
        username: user.username,
        fullname: user.fullname,
        picture: user.picture,
        is_verified: user.is_verified,
        followers: user.followers,
        url: user.url,
      };
      addProfile(summary, platform);
    }
  };

  return (
    <Layout>
      {/* Back */}
      <div style={{ paddingTop: '32px', marginBottom: '32px' }}>
        <Link
          to="/"
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            fontSize: '13px',
            fontWeight: 500,
            color: '#78716C',
            textDecoration: 'none',
            padding: '8px 14px',
            backgroundColor: '#FFFFFF',
            border: '1px solid rgba(28,25,23,0.08)',
            borderRadius: '99px',
            boxShadow: '0 1px 4px rgba(0,0,0,0.04)',
            transition: 'all 0.2s',
          }}
          onMouseEnter={(e) => {
            (e.currentTarget as HTMLElement).style.color = '#1C1917';
            (e.currentTarget as HTMLElement).style.borderColor = 'rgba(28,25,23,0.2)';
          }}
          onMouseLeave={(e) => {
            (e.currentTarget as HTMLElement).style.color = '#78716C';
            (e.currentTarget as HTMLElement).style.borderColor = 'rgba(28,25,23,0.08)';
          }}
        >
          <ArrowLeft style={{ width: '14px', height: '14px' }} />
          Back to Search
        </Link>
      </div>

      {/* Profile Hero Card */}
      <div
        style={{
          backgroundColor: '#FFFFFF',
          borderRadius: '24px',
          border: '1px solid rgba(28, 25, 23, 0.07)',
          boxShadow: '0 2px 20px rgba(0,0,0,0.05)',
          marginBottom: '24px',
          overflow: 'hidden',
        }}
      >
        {/* Top band */}
        <div
          style={{
            height: '100px',
            background: 'linear-gradient(135deg, #F5F2ED 0%, #E7E5E4 100%)',
            position: 'relative',
          }}
        />
        {/* Profile content */}
        <div style={{ padding: '0 32px 32px', marginTop: '-52px' }}>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '20px' }}>
            {/* Avatar row */}
            <div style={{ display: 'flex', alignItems: 'flex-end', justifyContent: 'space-between' }}>
              <img
                src={proxyImageUrl(user.picture)}
                alt={user.username}
                onError={(e) => {
                  e.currentTarget.src = `https://ui-avatars.com/api/?name=${encodeURIComponent(user.fullname || user.username)}&background=E7E5E4&color=44403C&bold=true&size=128`;
                }}
                referrerPolicy="no-referrer"
                style={{
                  width: '96px',
                  height: '96px',
                  borderRadius: '50%',
                  objectFit: 'cover',
                  border: '4px solid #FFFFFF',
                  boxShadow: '0 4px 16px rgba(0,0,0,0.12)',
                }}
              />

              <button
                onClick={handleListToggle}
                style={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: '8px',
                  padding: '10px 20px',
                  borderRadius: '99px',
                  fontSize: '13px',
                  fontWeight: 600,
                  cursor: 'pointer',
                  transition: 'all 0.2s',
                  border: '1.5px solid',
                  borderColor: isSaved ? 'rgba(146, 64, 14, 0.3)' : '#1C1917',
                  backgroundColor: isSaved ? 'rgba(146, 64, 14, 0.06)' : '#1C1917',
                  color: isSaved ? '#92400E' : '#F5F2ED',
                }}
              >
                {isSaved
                  ? <><BookmarkCheck style={{ width: '15px', height: '15px' }} /> Saved</>
                  : <><Bookmark style={{ width: '15px', height: '15px' }} /> Save Creator</>
                }
              </button>
            </div>

            {/* Name & info */}
            <div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '6px', marginBottom: '4px' }}>
                <h1 style={{ fontFamily: "'Playfair Display', serif", fontSize: '28px', fontWeight: 700, color: '#1C1917', letterSpacing: '-0.02em' }}>
                  {user.fullname}
                </h1>
                <VerifiedBadge verified={user.is_verified} />
              </div>
              <div style={{ display: 'flex', alignItems: 'center', gap: '10px', flexWrap: 'wrap' }}>
                <span style={{ fontSize: '14px', color: '#78716C' }}>@{user.username}</span>
                <span
                  style={{
                    padding: '2px 10px',
                    borderRadius: '99px',
                    fontSize: '11px',
                    fontWeight: 500,
                    color: PLATFORM_COLORS[platform] || '#78716C',
                    backgroundColor: `${PLATFORM_COLORS[platform]}12`,
                    border: `1px solid ${PLATFORM_COLORS[platform]}25`,
                    letterSpacing: '0.02em',
                  }}
                >
                  {getPlatformLabel(platform)}
                </span>
              </div>

              {user.description && (
                <p style={{ marginTop: '16px', fontSize: '14px', color: '#57534E', lineHeight: 1.7, maxWidth: '560px' }}>
                  {user.description}
                </p>
              )}

              {user.url && (
                <a
                  href={user.url}
                  target="_blank"
                  rel="noreferrer"
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '4px',
                    marginTop: '12px',
                    fontSize: '13px',
                    fontWeight: 500,
                    color: '#92400E',
                    textDecoration: 'none',
                  }}
                >
                  View Channel →
                </a>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Stats */}
      <div style={{ marginBottom: '8px' }}>
        <h2
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: '20px',
            fontWeight: 600,
            color: '#1C1917',
            marginBottom: '16px',
            letterSpacing: '-0.01em',
          }}
        >
          Performance Overview
        </h2>
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(160px, 1fr))', gap: '12px' }}>
          <StatCard label="Followers" value={formatStat(user.followers)} />
          {user.engagement_rate !== undefined && (
            <StatCard
              label="Engagement Rate"
              value={`${(user.engagement_rate * 100).toFixed(2)}%`}
            />
          )}
          {user.posts_count !== undefined && (
            <StatCard label="Total Posts" value={formatStat(user.posts_count)} />
          )}
          {user.avg_likes !== undefined && (
            <StatCard label="Avg. Likes" value={formatStat(user.avg_likes)} />
          )}
          {user.avg_comments !== undefined && (
            <StatCard label="Avg. Comments" value={formatStat(user.avg_comments)} />
          )}
          {user.avg_views !== undefined && user.avg_views > 0 && (
            <StatCard label="Avg. Views" value={formatStat(user.avg_views)} />
          )}
          {user.engagements !== undefined && (
            <StatCard label="Engagements" value={formatStat(user.engagements)} />
          )}
        </div>
      </div>
    </Layout>
  );
}
