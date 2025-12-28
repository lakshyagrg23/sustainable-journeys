'use client';
import React, { useEffect, useMemo, useRef, useState } from 'react';
import Image from 'next/image';
import useSocialStore from '../../store/social';

type NormalizedPost = {
  id: string | number;
  title: string;
  description?: string;
  imageUrl?: string;
  createdAt?: string;
  author?: string;
  socialLink?: string;
};

// Type definitions for Strapi API response structure
interface MediaFormats {
  large?: { url: string };
  medium?: { url: string };
  small?: { url: string };
}

interface MediaFile {
  url: string;
  formats?: MediaFormats;
  attributes?: MediaFile;
}

interface PostAttributes {
  title?: string;
  caption?: string;
  description?: string;
  content?: string;
  publishedAt?: string;
  createdAt?: string;
  author?: string;
  social_link?: string;
  socialLink?: string;
  documentId?: string;
  media?: {
    data?: MediaFile[];
  } | MediaFile[];
}

interface StrapiPost {
  id?: string | number;
  documentId?: string;
  attributes?: PostAttributes;
  title?: string;
  caption?: string;
  description?: string;
  content?: string;
  publishedAt?: string;
  createdAt?: string;
  author?: string;
  social_link?: string;
  socialLink?: string;
  media?: MediaFile[];
}

const API_BASE_URL =
  process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337';

function SocialMedia() {
  const { posts, loading, error, fetchPosts } = useSocialStore();
  const scrollerRef = useRef<HTMLDivElement | null>(null);
  const [canLeft, setCanLeft] = useState(false);
  const [canRight, setCanRight] = useState(false);

  useEffect(() => {
    fetchPosts();
  }, [fetchPosts]);

  const normalizedPosts: NormalizedPost[] = useMemo(
    () =>
      (posts || []).map((p: StrapiPost) => {
        // Accept both Strapi default (attributes) and flattened API response
        const attr = (p?.attributes ?? p ?? {}) as PostAttributes;

        // Resolve media array from various shapes
        let mediaArray: MediaFile[] = [];
        const mediaData = attr?.media;

        if (mediaData && 'data' in mediaData && Array.isArray(mediaData.data)) {
          // Strapi format with data wrapper
          mediaArray = mediaData.data.map((m: MediaFile) => m?.attributes ?? m);
        } else if (Array.isArray(mediaData)) {
          // Direct array format
          mediaArray = mediaData;
        } else if (Array.isArray(p?.media)) {
          // Fallback to post-level media
          mediaArray = p.media;
        }

        const firstMedia = mediaArray?.[0] ?? null;
        const formatUrl =
          firstMedia?.formats?.medium?.url ||
          firstMedia?.formats?.small?.url ||
          firstMedia?.formats?.large?.url ||
          firstMedia?.url;
        const imageUrl = formatUrl
          ? formatUrl.startsWith('http')
            ? formatUrl
            : `${API_BASE_URL}${formatUrl}`
          : undefined;

        return {
          id:
            p?.id ??
            p?.documentId ??
            attr?.documentId ??
            `${attr?.title || 'post'}-${Math.random().toString(36).slice(2)}`,
          title: attr?.title || attr?.caption || 'Untitled',
          description: attr?.description || attr?.content || attr?.caption || '',
          imageUrl,
          createdAt: attr?.publishedAt || attr?.createdAt || '',
          author: attr?.author || '',
          socialLink: attr?.social_link || attr?.socialLink || '',
        } as NormalizedPost;
      }),
    [posts]
  );

  const updateArrows = () => {
    const el = scrollerRef.current;
    if (!el) return;
    setCanLeft(el.scrollLeft > 0);
    setCanRight(el.scrollLeft + el.clientWidth < el.scrollWidth - 1);
  };

  useEffect(() => {
    updateArrows();
    const el = scrollerRef.current;
    if (!el) return;
    const onScroll = () => updateArrows();
    el.addEventListener('scroll', onScroll, { passive: true });
    const onResize = () => updateArrows();
    window.addEventListener('resize', onResize);
    return () => {
      el.removeEventListener('scroll', onScroll);
      window.removeEventListener('resize', onResize);
    };
  }, [posts, loading]);

  const scrollByAmount = (dir: 'left' | 'right') => {
    const el = scrollerRef.current;
    if (!el) return;
    const cardWidth = 320; // px
    const gap = 16; // px
    const amount = (cardWidth + gap) * 2; // scroll 2 cards
    el.scrollBy({ left: dir === 'left' ? -amount : amount, behavior: 'smooth' });
  };

  const handleSocialMediaClick = (platform: string, link: string) => {
    if (window.dataLayer) {
      window.dataLayer.push({
        event: 'social_media_click',
        platform: platform,
        link: link,
        timestamp: new Date().toISOString(),
      });
    }
  };

  const CardSkeleton = () => (
    <div className="min-w-[320px] max-w-[320px] h-[260px] rounded-xl bg-gray-100 shadow overflow-hidden flex flex-col animate-pulse">
      <div className="h-[150px] bg-gray-200" />
      <div className="p-3 space-y-2">
        <div className="h-4 w-3/4 bg-gray-200 rounded" />
        <div className="h-3 w-11/12 bg-gray-200 rounded" />
        <div className="h-3 w-2/3 bg-gray-200 rounded" />
      </div>
    </div>
  );

  const EmptyState = () => (
    <div className="w-full min-h-48 border border-dashed border-gray-300 rounded-xl flex items-center justify-center p-6 text-gray-500 bg-gray-50">
      <div className="text-center">
        <div className="text-2xl mb-2">✨ No posts yet</div>
        <div> Check back soon.</div>
      </div>
    </div>
  );

  return (
    <section className="relative w-full py-2 px-4 sm:px-6 lg:px-8" aria-label="Social media posts">
      {/* Header */}
      <div className="mb-3">
        <h2 className="m-0 text-xl font-bold text-center">Social Media</h2>
        <div className="mt-1 flex items-center justify-center gap-3">
          {loading && <span className="text-xs text-gray-500">Loading…</span>}
          {error && <span className="text-xs text-red-500">{String(error)}</span>}
        </div>
      </div>

      {/* Left Arrow */}
      <button
        aria-label="Scroll left"
        onClick={() => scrollByAmount('left')}
        disabled={!canLeft}
        className={[
          'absolute left-1 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full border border-gray-200 shadow',
          'flex items-center justify-center transition',
          canLeft
            ? 'bg-white text-gray-900 hover:bg-gray-50 cursor-pointer'
            : 'bg-gray-50 text-gray-400 cursor-default',
        ].join(' ')}
      >
        ‹
      </button>

      {/* Right Arrow */}
      <button
        aria-label="Scroll right"
        onClick={() => scrollByAmount('right')}
        disabled={!canRight}
        className={[
          'absolute right-1 top-1/2 -translate-y-1/2 z-20 w-9 h-9 rounded-full border border-gray-200 shadow',
          'flex items-center justify-center transition',
          canRight
            ? 'bg-white text-gray-900 hover:bg-gray-50 cursor-pointer'
            : 'bg-gray-50 text-gray-400 cursor-default',
        ].join(' ')}
      >
        ›
      </button>

      {/* Scroller */}
      <div
        ref={scrollerRef}
        onScroll={updateArrows}
        className="overflow-x-auto overflow-y-hidden scroll-smooth flex gap-4 pb-2"
      >
        {loading && posts.length === 0 && (
          <>
            <CardSkeleton />
            <CardSkeleton />
            <CardSkeleton />
          </>
        )}

        {!loading && normalizedPosts.length === 0 && <EmptyState />}

        {!loading &&
          normalizedPosts.map((post: NormalizedPost) => (
            <article
              key={post.id}
              className="min-w-[320px] max-w-[320px] rounded-xl border border-gray-200 bg-white shadow overflow-hidden flex flex-col transition hover:-translate-y-0.5 hover:shadow-lg"
            >
              {post.imageUrl && post.socialLink ? (
                <a
                  href={post.socialLink}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="relative block w-full aspect-square bg-white"
                  aria-label="Open social post"
                  onClick={() => handleSocialMediaClick('SocialMedia', post.socialLink ?? 'default-link')}
                >
                  <Image
                    src={post.imageUrl}
                    alt={post.title}
                    fill
                    sizes="(max-width: 640px) 100vw, 320px"
                    className="object-contain p-2"
                    unoptimized
                    priority={false}
                  />
                  <span className="absolute right-2 top-2 rounded-full bg-white/80 backdrop-blur px-2 py-0.5 text-xs text-gray-700 shadow border border-gray-200">
                    Open ↗
                  </span>
                </a>
              ) : (
                <div className="w-full aspect-square bg-gradient-to-br from-gray-100 to-gray-200" />
              )}

              <div className="p-3 flex flex-col gap-1.5">
                <h3 className="m-0 text-base font-bold text-gray-900 leading-tight">
                  {post.title}
                </h3>
                {post.description && (
                  <p className="m-0 text-sm text-gray-700 leading-snug line-clamp-3">
                    {post.description}
                  </p>
                )}
                {post.createdAt && (
                  <span className="mt-1.5 text-xs text-gray-500">
                    {new Date(post.createdAt).toLocaleDateString()}
                  </span>
                )}
                {post.socialLink && (
                  <a
                    href={post.socialLink}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="mt-2 inline-flex items-center gap-1 text-sm font-medium text-indigo-600 hover:text-indigo-700"
                  >
                    Open post <span aria-hidden>↗</span>
                  </a>
                )}
              </div>
            </article>
          ))}
      </div>
    </section>
  );
}

export default SocialMedia;