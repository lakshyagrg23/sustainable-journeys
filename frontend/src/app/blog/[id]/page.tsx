"use client";

import React, { useEffect, useState } from "react";
import ReactMarkdown from 'react-markdown';
const GradientStrong = (props: React.HTMLAttributes<HTMLElement>) => (
  <strong {...props} className="bg-gradient-to-r from-pink-500 via-blue-500 to-green-500 bg-clip-text text-transparent font-bold">
    {props.children}
  </strong>
);
import { useParams } from "next/navigation";
import Image from "next/image";
import Link from "next/link";
import { format } from "date-fns";
import { FaCalendarAlt, FaUser, FaClock, FaShareAlt, FaFacebookF, FaTwitter, FaLinkedinIn, FaWhatsapp } from "react-icons/fa";
import { useBlogStore } from "../../../../store/blogStore";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import ContactSection from "@/components/Contact";

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337';

// TypeScript interfaces for blog data
interface ImageFormat {
  url: string;
  width?: number;
  height?: number;
}

interface ImageFormats {
  large?: ImageFormat;
  medium?: ImageFormat;
  small?: ImageFormat;
  thumbnail?: ImageFormat;
}

interface BlogImage {
  url: string;
  formats?: ImageFormats;
}

interface BlogData {
  id: string;
  documentId: string;
  title: string;
  short_description: string;
  paragraph: string;
  author_name: string;
  publishedAt: string;
  cover_image?: BlogImage;
  gallery?: BlogImage[];
}

// SEO Keywords for dynamic integration
// const SEO_KEYWORDS = [
//   'Andaman tourism', 'best places to visit in Andaman', 'Andaman adventure sports',
//   'scuba diving Andaman', 'snorkeling Andaman', 'parasailing Andaman',
//   'jet ski Andaman', 'glass bottom boat Andaman', 'kayaking Andaman',
//   'island hopping Andaman', 'game fishing Andaman', 'underwater scooter Andaman',
//   'sea kart Andaman', 'Saarthi Andaman'
// ];

// Helper function to build full image URL
const buildImageUrl = (url?: string) => {
  if (!url) return '';
  return url.startsWith('http') ? url : `${API_BASE_URL}${url}`;
};

// Helper to format date
const formatDate = (dateString: string) => {
  try {
    return format(new Date(dateString), 'MMMM d, yyyy');
  } catch {
    return dateString;
  }
};

// Helper to calculate reading time
const calculateReadingTime = (text: string) => {
  const wordsPerMinute = 200;
  const words = text.split(/\s+/).length;
  const minutes = Math.ceil(words / wordsPerMinute);
  return `${minutes} min read`;
};

// Helper to highlight keywords in text
// const highlightKeywords = (text: string) => {
//   let highlightedText = text;

//   SEO_KEYWORDS.forEach(keyword => {
//     const regex = new RegExp(`\\b(${keyword.replace(/[.*+?^${}()|[\]\\]/g, '\\$&')})\\b`, 'gi');
//     highlightedText = highlightedText.replace(regex, '<span class="text-blue-600 font-semibold bg-blue-50 px-1 rounded">$1</span>');
//   });

//   return highlightedText;
// };

// Helper to get relevant tags based on content
const getRelevantTags = (title: string, description: string) => {
  const content = (title + ' ' + description).toLowerCase();
  const relevantTags = [];

  if (content.includes('scuba') || content.includes('diving')) relevantTags.push('Scuba Diving');
  if (content.includes('snorkel')) relevantTags.push('Snorkeling');
  if (content.includes('beach') || content.includes('sand')) relevantTags.push('Beaches');
  if (content.includes('adventure') || content.includes('sport')) relevantTags.push('Adventure Sports');
  if (content.includes('island')) relevantTags.push('Island Hopping');
  if (content.includes('water') || content.includes('sea')) relevantTags.push('Water Activities');
  if (content.includes('food') || content.includes('cuisine')) relevantTags.push('Local Cuisine');
  if (content.includes('culture') || content.includes('history')) relevantTags.push('Culture & History');

  // Always include these default tags
  relevantTags.push("Nepal Travel", "Travel Guide", "Sustainable Journeys");


  return [...new Set(relevantTags)]; // Remove duplicates
};

function BlogDetailPage() {
  const params = useParams();
  const id = params?.id ? (Array.isArray(params.id) ? params.id[0] : params.id) : null;
  const { blog, fetchBlogById, loading, error } = useBlogStore();
  const [activeGalleryImage, setActiveGalleryImage] = useState(0);
  const [showShareMenu, setShowShareMenu] = useState(false);
  const [showGalleryModal, setShowGalleryModal] = useState(false);

  useEffect(() => {
    if (id) {
      console.log("Fetching blog with ID:", id);
      fetchBlogById(id);
    }
  }, [id, fetchBlogById]);

  // Update browser title and meta description when blog data loads
  useEffect(() => {
    if (typeof document === 'undefined') return;
    const b = blog as BlogData | null;
    const title = b?.title;
    const short_description = b?.short_description || b?.paragraph;
    const originalTitle = document.title;
    let createdMeta = false;

    if (title) {
      document.title = `${title} - Sustainable Journeys Nepal`;
    }

    try {
      const meta = document.querySelector('meta[name="description"]') as HTMLMetaElement | null;
      if (short_description) {
        if (meta) {
          meta.content = String(short_description).slice(0, 155);
        } else {
          const m = document.createElement('meta');
          m.name = 'description';
          m.content = String(short_description).slice(0, 155);
          document.head.appendChild(m);
          createdMeta = true;
        }
      }
    } catch (e) {
      console.error('Error setting meta description:', e);
    }

    return () => {
      try {
        document.title = originalTitle;
        if (createdMeta) {
          const m = document.querySelector('meta[name="description"]');
          if (m && m.parentElement) m.parentElement.removeChild(m);
        }
      } catch (e) {
        console.error('Error setting meta description:', e);
      }
    };
  }, [blog]);

  if (loading) {
    return (
      <>
        <Navbar />
        <div className="flex justify-center items-center min-h-[60vh]">
          <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
        </div>
        <Footer />
      </>
    );
  }

  if (error) {
    return (
      <>
        <Navbar />
        <div className="min-h-[60vh] flex justify-center items-center">
          <div className="bg-red-50 border border-red-200 rounded-lg p-8 max-w-md text-center">
            <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
            <p className="text-red-500 mb-4">{error}</p>
            <Link href="/blog" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
              Back to Blog
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  if (!blog) {
    return (
      <>
        <Navbar />
        <div className="min-h-[60vh] flex justify-center items-center">
          <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-8 max-w-md text-center">
            <h2 className="text-2xl font-bold text-yellow-600 mb-4">Blog Not Found</h2>
            <p className="text-gray-600 mb-4">The blog post you&apos;re looking for could not be found.</p>
            <Link href="/blog" className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition">
              Back to Blog
            </Link>
          </div>
        </div>
        <Footer />
      </>
    );
  }

  // Get best available image URL
  const blogData = blog as BlogData;
  const heroImageUrl =
    blogData.cover_image?.formats?.large?.url ||
    blogData.cover_image?.formats?.medium?.url ||
    blogData.cover_image?.formats?.small?.url ||
    blogData.cover_image?.url ||
    '';

  const galleryImages = Array.isArray(blogData.gallery) ? blogData.gallery : [];
  const readingTime = calculateReadingTime(blogData.paragraph || '');
  const relevantTags = getRelevantTags(blogData.title, blogData.short_description);

  // Share functionality
  const shareUrl = typeof window !== 'undefined' ? window.location.href : '';
  const shareText = `Check out this Nepal travel guide: ${blogData.title}`;

  const shareLinks = {
    facebook: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(shareUrl)}`,
    twitter: `https://twitter.com/intent/tweet?text=${encodeURIComponent(shareText)}&url=${encodeURIComponent(shareUrl)}`,
    linkedin: `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(shareUrl)}`,
    whatsapp: `https://wa.me/?text=${encodeURIComponent(`${shareText} ${shareUrl}`)}`
  };

  return (
    <>
      <Navbar />

      {/* Hero Section - Compact Design */}
      <section className="relative h-[40vh] sm:h-[45vh] md:h-[50vh] lg:h-[55vh] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src={buildImageUrl(heroImageUrl)}
            alt={blogData.title}
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/40 to-black/15" />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/25 to-transparent" />
        </div>

        {/* Smaller Floating Elements */}
        <div className="absolute top-6 right-6 hidden lg:block">
          <div className="w-10 h-10 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center animate-pulse">
            <span className="text-white text-lg">🏝️</span>
          </div>
        </div>
        <div className="absolute bottom-12 right-12 hidden md:block">
          <div className="w-8 h-8 bg-blue-500/20 backdrop-blur-sm rounded-full animate-bounce"></div>
        </div>

        <div className="absolute bottom-0 left-0 right-0 p-3 sm:p-4 md:p-6 lg:p-8 text-white">
          <div className="max-w-5xl mx-auto">
            {/* Compact Meta Information */}
            <div className="flex flex-wrap gap-1.5 sm:gap-2 md:gap-3 items-center mb-3 sm:mb-4 text-xs">
              <span className="bg-gradient-to-r from-blue-500 to-cyan-500 px-2.5 py-1 rounded-full font-semibold text-white shadow-lg text-xs">
                🏔️ Nepal Travel Guide
              </span>
              <div className="flex items-center bg-white/20 backdrop-blur-sm px-2.5 py-1 rounded-full">
                <FaCalendarAlt className="mr-1.5 text-xs" />
                <span className="font-medium text-xs">{formatDate(blogData.publishedAt)}</span>
              </div>
              <div className="flex items-center bg-white/20 backdrop-blur-sm px-2.5 py-1 rounded-full">
                <FaClock className="mr-1.5 text-xs" />
                <span className="font-medium text-xs">{readingTime}</span>
              </div>
              <div className="flex items-center bg-green-500/80 px-2.5 py-1 rounded-full">
                <span className="mr-1">⭐</span>
                <span className="font-medium text-xs">Expert Guide</span>
              </div>
            </div>

            {/* Compact Title */}
            <h1 className="text-xl sm:text-2xl md:text-3xl lg:text-4xl font-bold mb-3 sm:mb-4 leading-tight">
              <span className="bg-gradient-to-r from-white via-blue-100 to-cyan-100 bg-clip-text text-transparent">
                {blogData.title}
              </span>
            </h1>

            {/* Compact Description */}
            <p className="text-sm sm:text-base md:text-lg mb-4 sm:mb-6 max-w-3xl opacity-90 leading-relaxed font-light">
              {blogData.short_description}
            </p>

            {/* Compact Author and Share Section */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 sm:gap-4">
              <div className="flex items-center">
                <div className="w-10 h-10 sm:w-12 sm:h-12 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center mr-3 shadow-lg">
                  <FaUser className="text-white text-sm sm:text-base" />
                </div>
                <div>
                  <p className="font-bold text-sm sm:text-base">By {blogData.author_name}</p>
                  <p className="text-xs sm:text-sm opacity-75">Travel Expert • Nepal Specialist</p>
                </div>
              </div>

              <div className="relative">
                <button
                  onClick={() => setShowShareMenu(!showShareMenu)}
                  className="group bg-gradient-to-r from-white/20 to-white/10 backdrop-blur-sm px-4 py-2 rounded-full flex items-center hover:from-white/30 hover:to-white/20 transition-all duration-300 shadow-lg border border-white/20"
                >
                  <FaShareAlt className="mr-2 group-hover:scale-110 transition-transform text-sm" />
                  <span className="font-medium text-sm">Share</span>
                </button>

                {showShareMenu && (
                  <div className="absolute right-0 top-full mt-2 bg-white/95 backdrop-blur-lg rounded-xl shadow-2xl p-3 z-10 border border-white/20">
                    <div className="flex space-x-2">
                      <a href={shareLinks.facebook} target="_blank" rel="noopener noreferrer"
                        className="p-2 bg-blue-600 text-white rounded-full hover:bg-blue-700 transition-all hover:scale-110 shadow-lg">
                        <FaFacebookF size={14} />
                      </a>
                      <a href={shareLinks.twitter} target="_blank" rel="noopener noreferrer"
                        className="p-2 bg-blue-400 text-white rounded-full hover:bg-blue-500 transition-all hover:scale-110 shadow-lg">
                        <FaTwitter size={14} />
                      </a>
                      <a href={shareLinks.linkedin} target="_blank" rel="noopener noreferrer"
                        className="p-2 bg-blue-700 text-white rounded-full hover:bg-blue-800 transition-all hover:scale-110 shadow-lg">
                        <FaLinkedinIn size={14} />
                      </a>
                      <a href={shareLinks.whatsapp} target="_blank" rel="noopener noreferrer"
                        className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600 transition-all hover:scale-110 shadow-lg">
                        <FaWhatsapp size={14} />
                      </a>
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Smaller Decorative Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 80" className="w-full h-6 sm:h-8 md:h-10 fill-current text-white">
            <path d="M0,40L48,45C96,50,192,60,288,60C384,60,480,50,576,45C672,40,768,40,864,42C960,45,1056,50,1152,52C1248,55,1344,50,1392,47L1440,45L1440,80L1392,80C1344,80,1248,80,1152,80C1056,80,960,80,864,80C768,80,672,80,576,80C480,80,384,80,288,80C192,80,96,80,48,80L0,80Z"></path>
          </svg>
        </div>
      </section>

      {/* Main Content - Compact Layout */}
      <section className="py-6 sm:py-8 md:py-10 lg:py-12 bg-gradient-to-b from-white via-blue-50/20 to-white">
        <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Compact Breadcrumb Navigation */}
          <nav className="mb-4 sm:mb-6 md:mb-8">
            <div className="flex items-center space-x-2 text-sm text-gray-600">
              <Link href="/" className="hover:text-blue-600 transition-colors">Home</Link>
              <span>→</span>
              <Link href="/blog" className="hover:text-blue-600 transition-colors">Blog</Link>
              <span>→</span>
              <span className="text-blue-600 font-medium">Andaman Guide</span>
            </div>
          </nav>

          {/* Article Content - Compact Typography */}
          <article className="mb-8 sm:mb-10 md:mb-12">
            <div className="prose prose-sm md:prose-base max-w-none">
              {/* Compact Content Container */}
              <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-gray-100 overflow-hidden">

                {/* Compact Content Header */}
                <div className="bg-gradient-to-r from-blue-50 to-cyan-50 p-4 sm:p-5 md:p-6 border-b border-gray-100">
                  <div className="flex items-center space-x-3 mb-3">
                    <div className="w-8 h-8 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-full flex items-center justify-center">
                      <span className="text-white text-sm font-bold">📖</span>
                    </div>
                    <h2 className="text-lg md:text-xl font-bold text-gray-900">Complete Travel Guide</h2>
                  </div>
                  <p className="text-sm text-gray-600 leading-relaxed">
                    Discover the beauty of Andaman with expert insights and practical tips for an unforgettable journey.
                  </p>
                </div>

                {/* Main Article Text - Smaller */}
                <div className="p-4 sm:p-5 md:p-6 lg:p-8">
                  <div className="prose prose-sm md:prose-base max-w-none space-y-4 sm:space-y-5 font-light text-justify text-gray-500">
                    <ReactMarkdown
                      components={{
                        strong: GradientStrong
                      }}
                    >{blogData.paragraph}</ReactMarkdown>
                  </div>

                  {/* Compact Call to Action */}
                  <div className="mt-6 sm:mt-8 p-4 sm:p-5 bg-gradient-to-r from-blue-500 to-cyan-500 rounded-lg sm:rounded-xl text-white">
                    <div className="text-center">
                      <h3 className="text-base sm:text-lg md:text-xl font-bold mb-2 sm:mb-3">
                        Ready to Explore Andaman?
                      </h3>
                      <p className="text-sm mb-4 sm:mb-5 opacity-90">
                        Let Saarthi Andaman create your perfect island adventure with expert local guidance.
                      </p>
                      <div className="flex flex-col sm:flex-row gap-2 sm:gap-3 justify-center">
                        <Link
                          href="/packages"
                          className="bg-white text-blue-600 px-4 py-2 rounded-full font-semibold hover:bg-blue-50 transition-all duration-300 hover:scale-105 shadow-lg text-sm"
                        >
                          🏝️ View Packages
                        </Link>
                        <Link
                          href="/contact"
                          className="border-2 border-white text-white px-4 py-2 rounded-full font-semibold hover:bg-white hover:text-blue-600 transition-all duration-300 text-sm"
                        >
                          📞 Contact Expert
                        </Link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </article>

          {/* Compact Gallery Section */}
          {galleryImages.length > 0 && (
            <div className="mb-8 sm:mb-10 md:mb-12">
              <div className="text-center mb-4 sm:mb-6 md:mb-8">
                <h2 className="text-xl sm:text-2xl md:text-3xl font-bold text-gray-900 mb-2 sm:mb-3">
                  <span className="bg-gradient-to-r from-blue-600 to-cyan-600 bg-clip-text text-transparent">
                    Visual Journey
                  </span>
                </h2>
                <p className="text-sm text-gray-600 max-w-xl mx-auto">
                  Experience the breathtaking beauty of Andaman through our curated photo collection
                </p>
              </div>

              {/* Compact Gallery Grid */}
              <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-gray-100 p-3 sm:p-4 md:p-5">
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-2 sm:gap-3 md:gap-4">
                  {galleryImages.slice(0, 6).map((img: BlogImage, index: number) => {
                    const imageUrl =
                      img?.formats?.medium?.url ||
                      img?.formats?.small?.url ||
                      img?.url;

                    return (
                      <div
                        key={index}
                        onClick={() => {
                          setActiveGalleryImage(index);
                          setShowGalleryModal(true);
                        }}
                        className={`relative group cursor-pointer transition-all duration-500 hover:scale-105 ${index === 0 ? 'sm:col-span-2 sm:row-span-2' : ''
                          }`}
                      >
                        <div className={`relative rounded-lg sm:rounded-xl overflow-hidden shadow-md hover:shadow-lg transition-all duration-500 ${index === 0 ? 'aspect-[16/10]' : 'aspect-[4/3]'
                          }`}>
                          <Image
                            src={buildImageUrl(imageUrl)}
                            alt={`Andaman ${index === 0 ? 'Paradise' : 'Beauty'} Gallery ${index + 1}`}
                            fill
                            sizes={index === 0 ? "(max-width: 768px) 100vw, 66vw" : "(max-width: 768px) 100vw, 33vw"}
                            className="object-cover group-hover:scale-110 transition-transform duration-700"
                          />

                          {/* Compact Overlay */}
                          <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                          {/* Photo Counter */}
                          <div className="absolute top-2 left-2 bg-white/90 backdrop-blur-sm px-1.5 py-0.5 rounded-full text-xs font-bold text-gray-800">
                            {index + 1}
                          </div>

                          {/* View Icon */}
                          <div className="absolute inset-0 flex items-center justify-center opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                            <div className="bg-white/90 backdrop-blur-sm p-2 rounded-full shadow-lg transform scale-0 group-hover:scale-100 transition-transform duration-300">
                              <svg className="w-5 h-5 text-gray-800" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                              </svg>
                            </div>
                          </div>

                          {/* More Images Overlay */}
                          {index === 5 && galleryImages.length > 6 && (
                            <div className="absolute inset-0 bg-black/70 flex items-center justify-center">
                              <div className="text-center text-white">
                                <span className="text-lg sm:text-xl font-bold block">+{galleryImages.length - 6}</span>
                                <span className="text-xs sm:text-sm font-medium">More Photos</span>
                              </div>
                            </div>
                          )}
                        </div>
                      </div>
                    );
                  })}
                </div>

                {/* Compact View All Button */}
                {galleryImages.length > 6 && (
                  <div className="text-center mt-4 sm:mt-5">
                    <button
                      onClick={() => {
                        setActiveGalleryImage(0);
                        setShowGalleryModal(true);
                      }}
                      className="group bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-5 py-2.5 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 text-sm"
                    >
                      <span className="mr-2">📸</span>
                      View All {galleryImages.length} Photos
                      <svg className="w-4 h-4 ml-2 group-hover:translate-x-1 transition-transform inline-block" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                      </svg>
                    </button>
                  </div>
                )}
              </div>
            </div>
          )}

          {/* Compact Tags Section */}
          <div className="mb-8 sm:mb-10">
            <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl sm:rounded-2xl p-4 sm:p-5 border border-gray-100">
              <h3 className="text-base sm:text-lg md:text-xl font-bold text-gray-900 mb-3 sm:mb-4 flex items-center">
                <span className="mr-2 text-lg">🏷️</span>
                Related Topics
              </h3>
              <div className="flex flex-wrap gap-2">
                {relevantTags.map((tag, index) => (
                  <span
                    key={index}
                    className={`px-2.5 py-1 rounded-full text-xs font-medium transition-all duration-300 hover:scale-105 cursor-pointer ${tag.includes('Andaman') || tag.includes('Saarthi')
                      ? 'bg-gradient-to-r from-blue-500 to-cyan-500 text-white shadow-md hover:shadow-lg'
                      : 'bg-white text-gray-700 border border-gray-200 hover:border-blue-300 hover:text-blue-600 shadow-sm hover:shadow-md'
                      }`}
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </div>

          {/* Compact Author Bio */}
          <div className="mb-8 sm:mb-10">
            <div className="bg-white rounded-xl sm:rounded-2xl shadow-lg border border-gray-100 overflow-hidden">
              <div className="bg-gradient-to-r from-gray-50 to-blue-50 p-4 sm:p-5 border-b border-gray-100">
                <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-1 flex items-center">
                  <span className="mr-2 text-xl">👨‍💼</span>
                  About the Author
                </h3>
                <p className="text-sm text-gray-600">Meet your Andaman travel expert</p>
              </div>

              <div className="p-4 sm:p-5">
                <div className="flex flex-col sm:flex-row items-start space-y-3 sm:space-y-0 sm:space-x-4">
                  <div className="w-16 h-16 sm:w-18 sm:h-18 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-xl flex items-center justify-center shadow-lg mx-auto sm:mx-0">
                    <FaUser className="text-white text-lg sm:text-xl" />
                  </div>
                  <div className="flex-1 text-center sm:text-left">
                    <h4 className="text-lg sm:text-xl font-bold text-gray-900 mb-1 sm:mb-2">{blogData.author_name}</h4>
                    <p className="text-sm text-blue-600 font-medium mb-2 sm:mb-3">
                      🌊 Andaman Travel Specialist | 🏝️ Local Expert | ✈️ Adventure Guide
                    </p>
                    <p className="text-sm text-gray-700 leading-relaxed mb-3 sm:mb-4">
                      A passionate travel writer and Andaman local who specializes in exploring the hidden gems of these pristine islands.
                      With years of experience in travel journalism and deep local knowledge, {blogData.author_name} brings you authentic insights
                      and detailed guides to make your Andaman adventure truly unforgettable.
                    </p>

                    {/* Compact Author Stats */}
                    <div className="grid grid-cols-3 gap-3 text-center">
                      <div className="bg-blue-50 rounded-lg p-2">
                        <div className="text-base sm:text-lg font-bold text-blue-600">50+</div>
                        <div className="text-xs text-gray-600">Articles</div>
                      </div>
                      <div className="bg-cyan-50 rounded-lg p-2">
                        <div className="text-base sm:text-lg font-bold text-cyan-600">5+</div>
                        <div className="text-xs text-gray-600">Years</div>
                      </div>
                      <div className="bg-green-50 rounded-lg p-2">
                        <div className="text-base sm:text-lg font-bold text-green-600">1000+</div>
                        <div className="text-xs text-gray-600">Readers</div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Compact Navigation */}
          <div className="flex flex-col sm:flex-row justify-between items-center gap-3 sm:gap-4">
            <Link
              href="/blog"
              className="group bg-gray-100 hover:bg-gray-200 text-gray-700 px-5 py-2.5 rounded-full font-semibold transition-all duration-300 hover:scale-105 shadow-md hover:shadow-lg flex items-center text-sm w-full sm:w-auto justify-center"
            >
              <svg className="w-4 h-4 mr-2 group-hover:-translate-x-1 transition-transform" fill="currentColor" viewBox="0 0 20 20">
                <path fillRule="evenodd" d="M9.707 16.707a1 1 0 01-1.414 0l-6-6a1 1 0 010-1.414l6-6a1 1 0 011.414 1.414L5.414 9H17a1 1 0 110 2H5.414l4.293 4.293a1 1 0 010 1.414z" clipRule="evenodd" />
              </svg>
              Back to Blog
            </Link>

            <div className="flex space-x-2 sm:space-x-3 w-full sm:w-auto">
              <button
                onClick={() => setShowShareMenu(!showShareMenu)}
                className="group bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white px-4 py-2.5 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center text-sm flex-1 sm:flex-initial justify-center"
              >
                <FaShareAlt className="mr-2 group-hover:scale-110 transition-transform text-sm" />
                Share Article
              </button>

              <Link
                href="/packages"
                className="group bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white px-4 py-2.5 rounded-full font-semibold transition-all duration-300 shadow-lg hover:shadow-xl transform hover:-translate-y-1 flex items-center text-sm"
              >
                <span className="mr-1">🏝️</span>
                Book Now
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Gallery Modal */}
      {showGalleryModal && (
        <div className="fixed inset-0 bg-black/90 z-50 flex items-center justify-center p-4">
          <div className="relative max-w-4xl w-full max-h-[90vh]">
            {/* Close Button */}
            <button
              onClick={() => setShowGalleryModal(false)}
              className="absolute top-4 right-4 z-10 bg-white/20 backdrop-blur-sm text-white p-2 rounded-full hover:bg-white/30 transition"
            >
              <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
              </svg>
            </button>

            {/* Main Image */}
            <div className="relative aspect-[4/3] bg-black rounded-lg overflow-hidden">
              <Image
                src={buildImageUrl(
                  galleryImages[activeGalleryImage]?.formats?.large?.url ||
                  galleryImages[activeGalleryImage]?.formats?.medium?.url ||
                  galleryImages[activeGalleryImage]?.url
                )}
                alt={`Gallery image ${activeGalleryImage + 1}`}
                fill
                sizes="90vw"
                className="object-contain"
              />

              {/* Navigation Arrows */}
              {galleryImages.length > 1 && (
                <>
                  <button
                    onClick={() => setActiveGalleryImage(prev => (prev - 1 + galleryImages.length) % galleryImages.length)}
                    className="absolute left-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 19l-7-7 7-7" />
                    </svg>
                  </button>
                  <button
                    onClick={() => setActiveGalleryImage(prev => (prev + 1) % galleryImages.length)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 bg-white/20 backdrop-blur-sm text-white p-3 rounded-full hover:bg-white/30 transition"
                  >
                    <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                    </svg>
                  </button>
                </>
              )}
            </div>

            {/* Image Counter */}
            <div className="absolute bottom-4 left-1/2 -translate-x-1/2 bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full">
              {activeGalleryImage + 1} / {galleryImages.length}
            </div>

            {/* Thumbnail Strip */}
            <div className="mt-4 flex justify-center space-x-2 overflow-x-auto max-w-full">
              {galleryImages.map((img: BlogImage, index: number) => {
                const thumbUrl = img?.formats?.thumbnail?.url || img?.formats?.small?.url || img?.url;
                return (
                  <button
                    key={index}
                    onClick={() => setActiveGalleryImage(index)}
                    className={`relative w-16 h-12 rounded-lg overflow-hidden flex-shrink-0 transition-all ${index === activeGalleryImage ? 'ring-2 ring-white' : 'opacity-60 hover:opacity-80'
                      }`}
                  >
                    <Image
                      src={buildImageUrl(thumbUrl)}
                      alt={`Thumbnail ${index + 1}`}
                      fill
                      sizes="64px"
                      className="object-cover"
                    />
                  </button>
                );
              })}
            </div>
          </div>
        </div>
      )}
      <ContactSection />

    </>
  );
}

export default BlogDetailPage;