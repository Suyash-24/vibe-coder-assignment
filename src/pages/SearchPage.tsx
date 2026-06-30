import { useMemo } from "react";
import { Layout } from "@/components/Layout";
import { PlatformFilter } from "@/components/PlatformFilter";
import { ProfileList } from "@/components/ProfileList";
import { extractProfiles, filterProfiles } from "@/utils/dataHelpers";
import { useStore } from "@/store/useStore";

export function SearchPage() {
  const { platform, setPlatform, searchQuery, setSearchQuery } = useStore();

  const allProfiles = useMemo(() => extractProfiles(platform), [platform]);
  const filtered = useMemo(
    () => filterProfiles(allProfiles, searchQuery),
    [allProfiles, searchQuery]
  );

  const handleProfileClick = (username: string) => {
    console.log("Navigating to profile:", username);
  };

  return (
    <Layout>
      {/* Hero */}
      <div style={{ textAlign: 'center', paddingTop: '64px', paddingBottom: '48px' }}>
        {/* Badge */}
        <div
          style={{
            display: 'inline-flex',
            alignItems: 'center',
            gap: '6px',
            padding: '5px 14px',
            backgroundColor: 'rgba(146, 64, 14, 0.08)',
            border: '1px solid rgba(146, 64, 14, 0.15)',
            borderRadius: '99px',
            fontSize: '12px',
            fontWeight: 500,
            color: '#92400E',
            letterSpacing: '0.04em',
            marginBottom: '28px',
          }}
        >
          <span style={{ fontSize: '10px' }}>✦</span>
          Creator Discovery Platform
        </div>

        {/* Headline */}
        <h1
          style={{
            fontFamily: "'Playfair Display', serif",
            fontSize: 'clamp(40px, 6vw, 64px)',
            fontWeight: 700,
            color: '#1C1917',
            lineHeight: 1.1,
            letterSpacing: '-0.02em',
            marginBottom: '20px',
          }}
        >
          Discover Creators Who<br />
          <em style={{ fontStyle: 'italic', color: '#92400E' }}>Make an Impact</em>
        </h1>

        {/* Subtitle */}
        <p
          style={{
            fontSize: '16px',
            color: '#78716C',
            maxWidth: '480px',
            margin: '0 auto',
            lineHeight: 1.7,
          }}
        >
          Browse the world's most influential voices across Instagram, YouTube, and TikTok — curated for your next campaign.
        </p>
      </div>

      {/* Filter */}
      <PlatformFilter
        selected={platform}
        onChange={setPlatform}
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
      />

      {/* Stats bar */}
      <div
        style={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          marginBottom: '24px',
          paddingBottom: '16px',
          borderBottom: '1px solid rgba(28, 25, 23, 0.07)',
        }}
      >
        <p style={{ fontSize: '13px', color: '#78716C' }}>
          Showing{' '}
          <span style={{ fontWeight: 700, color: '#1C1917', fontFamily: "'Playfair Display', serif", fontSize: '15px' }}>
            {filtered.length}
          </span>
          {' '}creators
        </p>
        {searchQuery && (
          <p style={{ fontSize: '12px', color: '#A8A29E' }}>
            Search results for "{searchQuery}"
          </p>
        )}
      </div>

      {/* Profile grid */}
      <ProfileList
        profiles={filtered}
        platform={platform}
        onProfileClick={handleProfileClick}
      />
    </Layout>
  );
}
