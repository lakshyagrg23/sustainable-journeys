'use client';
import React, { useEffect } from 'react';
import { useParams } from 'next/navigation';
import Image from 'next/image';
import Navbar from '@/components/Navbar';
import ContactSection from '@/components/Contact';
import useActivityStore from '../../../../../store/activityStore';
import '@/app/globals.css'; // Import global styles including fonts

const API_BASE_URL = (process.env.NEXT_PUBLIC_API_URL || '').replace(/\/$/, '');

// Helper to render **starred** segments with bold/color
const renderWithHighlights = (text: string) => {
  // console.log('testing 1');
  const parts = text.split(/(\*\*[^*]+\*\*)/g);
  return parts.map((part, idx) => {
    if (/^\*\*[^*]+\*\*$/.test(part)) {
      const inner = part.slice(2, -2);
      return (
        <span key={idx} className="font-semibold text-blue-600">{inner}</span>
      );
    }
    return <span key={idx}>{part}</span>;
  });
};



// Strapi rich text node types
type StrapiTextNode = { type: 'text'; text: string; bold?: boolean };
type StrapiHeadingNode = { type: 'heading'; level?: number; children?: StrapiTextNode[] };
type StrapiParagraphNode = { type: 'paragraph'; children?: StrapiTextNode[] };
type StrapiListItemNode = { type: 'list-item'; children?: Array<StrapiTextNode | StrapiParagraphNode> };
type StrapiListNode = { type: 'list'; format?: 'unordered' | 'ordered'; children?: StrapiListItemNode[] };

interface GalleryImage {
  id?: string;
  formats?: {
    medium?: { url: string };
    small?: { url: string };
  };
  url: string;
}

// Helper to render rich text with formatting (supports Strapi Rich Text)
const renderRichText = (description: unknown) => {
  // Safe access helpers
  const getProp = (o: unknown, k: string): unknown => (typeof o === 'object' && o !== null) ? (o as Record<string, unknown>)[k] : undefined;
  const getStr = (o: unknown, k: string): string | undefined => {
    const v = getProp(o, k);
    return typeof v === 'string' ? v : undefined;
  };

  // Type guards
  const isTextNode = (n: unknown): n is StrapiTextNode => getStr(n, 'type') === 'text' && typeof getStr(n, 'text') === 'string';
  const isParagraphNode = (n: unknown): n is StrapiParagraphNode => getStr(n, 'type') === 'paragraph';
  const isHeadingNode = (n: unknown): n is StrapiHeadingNode => getStr(n, 'type') === 'heading';
  const isListNode = (n: unknown): n is StrapiListNode => getStr(n, 'type') === 'list';
  const isListItemNode = (n: unknown): n is StrapiListItemNode => getStr(n, 'type') === 'list-item';

  // Fallback: if string, try to parse JSON, else simple markdown-ish
  if (typeof description === 'string') {
    try {
      const parsed: unknown = JSON.parse(description);
      if (Array.isArray(parsed)) description = parsed as unknown[];
      else if (parsed && typeof parsed === 'object') {
        const desc = getProp(parsed, 'description');
        if (Array.isArray(desc)) description = desc as unknown[];
      }
    } catch {
      const text = description as string;
      const segments = text.split(/\n{2,}/).map(s => s.trim()).filter(Boolean);
      const nodes: React.ReactNode[] = [];
      segments.forEach((seg, idx) => {
        const lines = seg.split(/\n/).map(l => l.trim()).filter(Boolean);
        if (lines.length === 1 && lines[0].startsWith('# ')) {
          nodes.push(
            <h2 key={`str-h-${idx}`} className="text-2xl font-bold text-gray-900 mb-4 mt-6">{renderWithHighlights(lines[0].replace(/^#\s+/, ''))}</h2>
          );
          return;
        }
        if (lines.length >= 1 && lines.every(l => /^-\s+/.test(l))) {
          nodes.push(
            <ul key={`str-ul-${idx}`} className="list-disc list-inside mb-4">
              {lines.map((l, liIdx) => (
                <li key={`str-li-${idx}-${liIdx}`} className="mb-2 text-gray-700 ml-4">{renderWithHighlights(l.replace(/^-\s+/, ''))}</li>
              ))}
            </ul>
          );
          return;
        }
        nodes.push(
          <p key={`str-p-${idx}`} className="mb-4 text-gray-700 leading-relaxed">{renderWithHighlights(lines.join(' '))}</p>
        );
      });
      return nodes;
    }
  }

  if (!Array.isArray(description)) return null;

  const renderInline = (children?: Array<StrapiTextNode | unknown>, keyPrefix = 'inl'): React.ReactNode => {
    if (!Array.isArray(children)) return null;
    return children
      .filter((c): c is StrapiTextNode => isTextNode(c))
      .map((child, i) => (
        <span key={`${keyPrefix}-${i}`} className={child.bold ? 'font-semibold' : undefined}>
          {renderWithHighlights(child.text || '')}
        </span>
      ));
  };

  const renderNode = (node: unknown, idx: number): React.ReactNode => {
    // Headings
    if (isHeadingNode(node)) {
      const level = Math.min(Math.max(Number((getProp(node, 'level') as number) || 2), 1), 6);
      const common = <>{renderInline(getProp(node, 'children') as StrapiTextNode[], `hinline-${idx}`)}</>;
      const cls = 'text-2xl font-bold text-gray-900 mb-4 mt-6';
      switch (level) {
        case 1: return <h1 key={`h-${idx}`} className={cls}>{common}</h1>;
        case 2: return <h2 key={`h-${idx}`} className={cls}>{common}</h2>;
        case 3: return <h3 key={`h-${idx}`} className={cls}>{common}</h3>;
        case 4: return <h4 key={`h-${idx}`} className={cls}>{common}</h4>;
        case 5: return <h5 key={`h-${idx}`} className={cls}>{common}</h5>;
        default: return <h6 key={`h-${idx}`} className={cls}>{common}</h6>;
      }
    }

    // Paragraphs (treat all-bold paragraph as a subheading)
    if (isParagraphNode(node)) {
      const inlineArr = Array.isArray(getProp(node, 'children')) ? (getProp(node, 'children') as unknown[]) : [];
      const hasNonEmpty = inlineArr.some(c => isTextNode(c) && (getStr(c, 'text') || '').trim().length > 0);
      if (!hasNonEmpty) return null;
      const allBold = inlineArr.length > 0 && inlineArr.every(c => isTextNode(c) && !!(getProp(c, 'bold')));
      if (allBold) {
        return (
          <h3 key={`ph-${idx}`} className="text-xl font-semibold text-gray-900 mt-6 mb-4">
            {renderInline(getProp(node, 'children') as StrapiTextNode[], `pbold-${idx}`)}
          </h3>
        );
      }
      return (
        <p key={`p-${idx}`} className="mb-4 text-gray-700 leading-relaxed">
          {renderInline(getProp(node, 'children') as StrapiTextNode[], `pinline-${idx}`)}
        </p>
      );
    }

    // Lists
    if (isListNode(node)) {
      const items = Array.isArray(getProp(node, 'children')) ? (getProp(node, 'children') as unknown[]) : [];
      const children = items
        .filter((it): it is StrapiListItemNode => isListItemNode(it))
        .map((it, liIdx) => {
          const liChildren = Array.isArray(getProp(it, 'children')) ? (getProp(it, 'children') as unknown[]) : [];
          const liContent: React.ReactNode[] = [];
          liChildren.forEach((ch, chIdx) => {
            if (isParagraphNode(ch)) {
              const inline = renderInline(getProp(ch, 'children') as StrapiTextNode[], `liinline-${idx}-${liIdx}-${chIdx}`);
              if (inline) liContent.push(<>{inline}</>);
            } else if (isTextNode(ch)) {
              liContent.push(
                <span key={`lit-${idx}-${liIdx}-${chIdx}`} className={getProp(ch, 'bold') ? 'font-semibold' : undefined}>
                  {renderWithHighlights(getStr(ch, 'text') || '')}
                </span>
              );
            }
          });
          return (
            <li key={`li-${idx}-${liIdx}`} className="mb-2 text-gray-700 ml-4">
              {liContent.length > 0 ? liContent : null}
            </li>
          );
        });
      const format = getStr(node, 'format');
      const Tag = format === 'ordered' ? 'ol' : 'ul';
      const cls = format === 'ordered' ? 'list-decimal list-inside mb-4' : 'list-disc list-inside mb-4';
      return <Tag key={`list-${idx}`} className={cls}>{children}</Tag>;
    }

    // Text node fallback
    if (isTextNode(node)) {
      const txt = (getStr(node, 'text') || '').trim();
      if (!txt) return null;
      return <p key={`pt-${idx}`} className="mb-4 text-gray-700 leading-relaxed">{renderWithHighlights(txt)}</p>;
    }

    return null;
  };

  return (description as unknown[]).map((n, i) => renderNode(n, i)).filter(Boolean);
};


const buildAssetUrl = (u?: string) => {
  if (!u) return '';
  if (u.startsWith('http')) return u;
  return `${API_BASE_URL}${u.startsWith('/') ? u : '/' + u}`;
};

function PlaceDetailsPage() {
  const params = useParams() as { id?: string; slug?: string };
  const { selectedPlace, loading, error, fetchSubActivityById } = useActivityStore();

  useEffect(() => {
    if (params.slug) {
      fetchSubActivityById(params.slug);
    }
  }, [params.slug, fetchSubActivityById]);

  if (loading) {
    return (
      <div className="flex justify-center items-center min-h-[60vh]">
        <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="max-w-3xl mx-auto py-10 px-4 text-center">
        <div className="bg-red-50 border border-red-200 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
          <p className="text-red-500">{error}</p>
        </div>
      </div>
    );
  }

  if (!selectedPlace) {
    return (
      <div className="max-w-3xl mx-auto py-10 px-4 text-center">
        <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-8">
          <h2 className="text-2xl font-bold text-yellow-600 mb-4">Place Not Found</h2>
          <p>The place you&apos;re looking for could not be found.</p>
        </div>
      </div>
    );
  }

  const heroImageUrl = selectedPlace.hero_section?.formats?.large?.url ||
    selectedPlace.hero_section?.formats?.medium?.url ||
    selectedPlace.hero_section?.formats?.small?.url ||
    selectedPlace.hero_section?.url;

  return (
    <>
      <Navbar />
      <div className="bg-white">
        {/* Hero Section */}
        <section className="relative h-[60vh] md:h-[70vh] overflow-hidden
        bg-[url('https://png.pngtree.com/thumb_back/fh260/background/20210115/pngtree-bright-and-simple-light-blue-banner-background-image_519888.jpg')] bg-cover bg-center
        ">
          {/* Desktop: Split image and text */}
          <div className="hidden md:flex absolute inset-0 w-full h-full">
            {/* Image Left 60% */}
            <div className="w-[60%] h-full flex items-center justify-center ">
              <div className="w-[90%] h-[85%]  relative flex items-center justify-center overflow-hidden">
                {heroImageUrl && (
                  <Image
                    src={buildAssetUrl(heroImageUrl)}
                    alt={selectedPlace.place_name || 'Place image'}
                    fill
                    priority
                    sizes="60vw"
                    className="object-cover rounded-2xl"
                  />
                )}
                <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/20 to-transparent rounded-2xl" />
              </div>
            </div>
            {/* Text Right 40% */}
            <div className="w-[40%] h-full flex items-center justify-center p-8 ">
              <div className="text-white max-w-lg rounded-xl p-8" style={{ background: 'linear-gradient(135deg, #232526 0%, #414345 100%)' }}>
                <h1 className="text-4xl lg:text-2xl font-bold mb-3 text-yellow-400">{selectedPlace.place_name}</h1>
                <div className="mb-4 max-h-24 md:max-h-44 overflow-auto pr-2">
                  <p className="text-base lg:text-sm">{selectedPlace.short_description}</p>
                </div>
                <div className="flex flex-wrap gap-4 items-center mb-4">
                  <div className="flex items-center bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                    <span className="text-sm">{selectedPlace.type}</span>
                  </div>
                  {selectedPlace.activity?.island_name && (
                    <div className="flex items-center bg-white/20 backdrop-blur-sm px-3 py-1 rounded-full">
                      <span className="text-sm">{selectedPlace.activity.island_name}</span>
                    </div>
                  )}
                </div>
                <div className="flex items-center">
                  <div className="mr-4">
                    <p className="text-sm">{String(selectedPlace?.person || 'per person')}</p>
                    <div className="flex items-center">
                      <span className="text-2xl lg:text-3xl font-bold text-green-400">₹{selectedPlace.price}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Mobile: Full image with text overlay */}
          <div className="md:hidden absolute inset-0 z-10">
            {heroImageUrl && (
              <Image
                src={buildAssetUrl(heroImageUrl)}
                alt={selectedPlace.place_name || 'Place image'}
                fill
                priority
                sizes="100vw"
                className="object-cover"
              />
            )}
            <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/10" />
            <div className="absolute bottom-0 left-0 right-0 p-4 text-white">
              <div className="max-w-7xl mx-auto">
                <h1 className="text-2xl font-bold mb-2 text-yellow-400">{selectedPlace.place_name}</h1>
                <p className="text-sm mb-3 max-w-3xl">{selectedPlace.short_description}</p>
                <div className="flex flex-wrap gap-2 items-center mb-2">
                  <div className="flex items-center bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full">
                    <span className="text-xs">{selectedPlace.type}</span>
                  </div>
                  {selectedPlace.activity?.island_name && (
                    <div className="flex items-center bg-white/20 backdrop-blur-sm px-2 py-1 rounded-full">
                      <span className="text-xs">{selectedPlace.activity.island_name}</span>
                    </div>
                  )}
                </div>
                <div className="flex items-center">
                  <div className="mr-2">
                    <div className="flex items-center">
                      <span className="text-lg font-bold text-green-400">₹{selectedPlace.price}</span>
                      <span className="text-xs text-gray-300 ml-1">({String(selectedPlace?.person) || 'person'})</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Main Content */}
        <div className="max-w-6xl mx-auto px-4 md:px-8 py-8 md:py-12">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 md:gap-12">

            {/* Left Column - Description */}
            <div className="lg:col-span-2">
              <div className="bg-white rounded-2xl shadow-lg p-4 sm:p-6 md:p-8 border border-gray-200">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-4 sm:mb-6 md:mb-8 text-center underline decoration-blue-400 decoration-4 underline-offset-4">
                  About This Experience
                </h2>

                {/* Rich Text Description */}
                <div className="prose prose-sm sm:prose md:prose-lg max-w-none text-gray-700 leading-relaxed break-words overflow-wrap-anywhere">
                  <div className="text-sm sm:text-base md:text-lg space-y-3 sm:space-y-4">
                    {selectedPlace.description ? renderRichText(selectedPlace.description) : (
                      <p className="text-sm sm:text-base md:text-lg">
                        {selectedPlace.short_description}
                      </p>
                    )}
                  </div>
                </div>

                {/* Activity Info
                {selectedPlace.activity && (
                  <div className="mt-6 md:mt-8 grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg shadow-sm">
                      <span className="text-blue-600 text-lg font-semibold">Duration:</span>
                      <p className="text-gray-900 text-sm md:text-base">{selectedPlace.activity.duration || 'Contact for details'}</p>
                    </div>
                    <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg shadow-sm">
                      <span className="text-blue-600 text-lg font-semibold">Category:</span>
                      <p className="text-gray-900 text-sm md:text-base capitalize">{selectedPlace.activity.category}</p>
                    </div>
                    <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg shadow-sm">
                      <span className="text-blue-600 text-lg font-semibold">Tags:</span>
                      <p className="text-gray-900 text-sm md:text-base">{selectedPlace.activity.tags}</p>
                    </div>
                    <div className="flex items-center gap-4 p-4 bg-blue-50 rounded-lg shadow-sm">
                      <span className="text-blue-600 text-lg font-semibold">Location:</span>
                      <p className="text-gray-900 text-sm md:text-base">{selectedPlace.activity.island_name}</p>
                    </div>
                  </div>
                )} */}
              </div>
            </div>

            {/* Right Column - Booking & Info */}
            <div className="lg:col-span-1">
              <div className="sticky top-8">
                {/* Booking Card */}
                <div className="bg-white rounded-2xl shadow-lg p-4 md:p-6 mb-4 md:mb-6">
                  {/* <div className="text-center mb-4 md:mb-6">
                    <div className="text-3xl md:text-4xl font-bold text-green-600 mb-2">
                      ₹{selectedPlace.price}
                    </div>
                    <p className="text-gray-600 text-sm md:text-base">per person</p>
                  </div> */}
                  {selectedPlace.activity && (
                    <div className="mt-6 md:mt-8 grid grid-cols-1 gap-4">
                      <div className="flex flex-col gap-2 p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg shadow-md">
                        <span className="text-blue-600 text-lg font-semibold">Duration:</span>
                        <p className="text-gray-900 text-sm md:text-base">{selectedPlace.activity?.duration || 'Contact for details'}</p>
                      </div>
                      {/* <div className="flex flex-col gap-2 p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg shadow-md">
                        <span className="text-blue-600 text-lg font-semibold">Category:</span>
                        <p className="text-gray-900 text-sm md:text-base capitalize">{selectedPlace.activity?.category}</p>
                      </div> */}
                      <div className="flex flex-col gap-2 p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg shadow-md">
                        <span className="text-blue-600 text-lg font-semibold">Category:</span>
                        <p className="text-gray-900 text-sm md:text-base">{selectedPlace.activity?.tags}</p>
                      </div>
                      <div className="flex flex-col gap-2 p-4 bg-gradient-to-r from-blue-50 to-blue-100 rounded-lg shadow-md">
                        <span className="text-blue-600 text-lg font-semibold">Location:</span>
                        <p className="text-gray-900 text-sm md:text-base">{selectedPlace?.place_name}</p>
                      </div>
                    </div>
                  )}
                </div>

                {/* Quick Info */}
                <div className="bg-gray-50 rounded-2xl p-4 md:p-6">
                  <h3 className="text-base md:text-lg font-semibold text-gray-900 mb-4">Quick Information</h3>
                  <div className="space-y-2 md:space-y-3">
                    <div className="flex justify-between">
                      <span className="text-gray-600 text-sm md:text-base">Duration:</span>
                      <span className="font-medium text-sm md:text-base text-gray-900">{selectedPlace.activity?.duration || 'Contact for details'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 text-sm md:text-base">Category:</span>
                      <span className="font-medium text-sm md:text-base text-gray-900">{selectedPlace.activity?.category || 'Contact for details'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 text-sm md:text-base">Tags:</span>
                      <span className="font-medium text-sm md:text-base text-gray-900">{selectedPlace.activity?.tags || 'Contact for details'}</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-gray-600 text-sm md:text-base">Location:</span>
                      <span className="font-medium text-sm md:text-base text-gray-900">{selectedPlace?.place_name}</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Gallery Section */}
          {selectedPlace.gallery && selectedPlace.gallery.length > 0 && (
            <div className="mt-12 md:mt-16">
              <h2 className="text-2xl md:text-3xl font-bold text-gray-900 mb-6 md:mb-8 text-center">Gallery</h2>
              <div className="grid grid-cols-2 md:grid-cols-3 gap-4 md:gap-6">
                {selectedPlace.gallery.map((image: GalleryImage, index: number) => (
                  <div key={image.id || index} className="group relative h-40 md:h-64 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
                    <Image
                      src={buildAssetUrl(image.formats?.medium?.url || image.formats?.small?.url || image.url)}
                      alt={`Gallery image ${index + 1}`}
                      fill
                      sizes="(max-width: 768px) 50vw, 33vw"
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
                  </div>
                ))}
              </div>
            </div>
          )}
        </div>
      </div >
      <ContactSection />
    </>
  );
}

export default PlaceDetailsPage;
