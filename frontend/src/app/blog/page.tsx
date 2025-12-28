"use client";

import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { format } from 'date-fns';
import { FaSearch, FaCalendarAlt, FaUser, FaClock, FaFilter, FaEye } from 'react-icons/fa';
import { useBlogStore } from '../../../store/blogStore';
import Navbar from '@/components/Navbar';

import ContactSection from '@/components/Contact';

const API_BASE_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:1337';

// Interface for blog data
interface BlogData {
  id: string;
  documentId: string;
  title: string;
  short_description: string;
  paragraph: string;
  author_name: string;
  publishedAt: string;
  cover_image?: {
    url: string;
    formats?: {
      large?: { url: string };
      medium?: { url: string };
      small?: { url: string };
      thumbnail?: { url: string };
    };
  };
}

// Helper function to build full image URL
const buildImageUrl = (url?: string) => {
  if (!url) return '';
  return url.startsWith('http') ? url : `${API_BASE_URL}${url}`;
};

// Helper to format date
const formatDate = (dateString: string) => {
  try {
    return format(new Date(dateString), 'MMM d, yyyy');
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

// Blog categories for filtering
const BLOG_CATEGORIES = [
  'All Blogs',
  'Travel Guides',
  'Adventure Sports',
  'Beaches & Islands',
  'Local Culture',
  'Food & Cuisine',
  'Water Activities',
  'Photography Tips',
  'Budget Travel',
  'Luxury Travel'
];

// Sort options
const SORT_OPTIONS = [
  { value: 'latest', label: 'Latest First' },
  { value: 'oldest', label: 'Oldest First' },
  { value: 'title-asc', label: 'Title A-Z' },
  { value: 'title-desc', label: 'Title Z-A' },
  { value: 'author', label: 'By Author' }
];

function BlogsPage() {
  const { blogs, fetchBlogs, loading, error } = useBlogStore();
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState('All Blogs');
  const [sortBy, setSortBy] = useState('latest');
  const [showFilters, setShowFilters] = useState(false);

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  // Filter and sort blogs
  const filteredBlogs = blogs
    .filter((blog: BlogData) => {
      const matchesSearch = blog.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.short_description.toLowerCase().includes(searchTerm.toLowerCase()) ||
        blog.author_name.toLowerCase().includes(searchTerm.toLowerCase());

      // For now, we'll use simple category matching based on content
      const matchesCategory = selectedCategory === 'All Blogs' ||
        blog.title.toLowerCase().includes(selectedCategory.toLowerCase().replace(/[^a-z]/g, '')) ||
        blog.short_description.toLowerCase().includes(selectedCategory.toLowerCase().replace(/[^a-z]/g, ''));

      return matchesSearch && matchesCategory;
    })
    .sort((a: BlogData, b: BlogData) => {
      switch (sortBy) {
        case 'latest':
          return new Date(b.publishedAt).getTime() - new Date(a.publishedAt).getTime();
        case 'oldest':
          return new Date(a.publishedAt).getTime() - new Date(b.publishedAt).getTime();
        case 'title-asc':
          return a.title.localeCompare(b.title);
        case 'title-desc':
          return b.title.localeCompare(a.title);
        case 'author':
          return a.author_name.localeCompare(b.author_name);
        default:
          return 0;
      }
    });

  return (
    <>
      <Navbar />

      {/* Hero Section */}
      <section className="relative h-[50vh] sm:h-[55vh] md:h-[60vh] overflow-hidden">
        <div className="absolute inset-0">
          <Image
            src="https://andamanbliss.com/storage/blogs/blog_temp_CzZUcDF5wL.jpeg"
            alt="Andaman Travel Blogs"
            fill
            priority
            sizes="100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/40 to-black/20" />
          <div className="absolute inset-0 bg-gradient-to-r from-blue-900/30 to-transparent" />
        </div>

        {/* Floating Elements */}
        <div className="absolute top-8 right-8 hidden lg:block">
          <div className="w-12 h-12 bg-white/10 backdrop-blur-sm rounded-full flex items-center justify-center animate-pulse">
            <span className="text-white text-xl">📖</span>
          </div>
        </div>
        <div className="absolute bottom-16 right-16 hidden md:block">
          <div className="w-8 h-8 bg-blue-500/20 backdrop-blur-sm rounded-full animate-bounce"></div>
        </div>

        <div className="absolute inset-0 flex items-center justify-center text-white">
          <div className="text-center max-w-4xl mx-auto px-4">
            <div className="inline-block mb-4">
              <span className="bg-gradient-to-r from-blue-500 to-cyan-500 px-4 py-2 rounded-full text-sm font-semibold">
                📚 Andaman Travel Blogs
              </span>
            </div>
            <h1 className="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-4 leading-tight">
              <span className="bg-gradient-to-r from-white via-blue-100 to-cyan-100 bg-clip-text text-transparent">
                Discover Andaman
              </span>
            </h1>
            <p className="text-lg sm:text-xl md:text-2xl mb-6 opacity-90 font-light">
              Expert guides, travel tips, and hidden gems of the Andaman Islands
            </p>

            {/* Quick Stats */}
            <div className="grid grid-cols-3 gap-4 sm:gap-8 max-w-md mx-auto">
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-yellow-400">{blogs.length}+</div>
                <div className="text-sm sm:text-base opacity-80">Articles</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-yellow-400">5+</div>
                <div className="text-sm sm:text-base opacity-80">Authors</div>
              </div>
              <div className="text-center">
                <div className="text-2xl sm:text-3xl font-bold text-yellow-400">10K+</div>
                <div className="text-sm sm:text-base opacity-80">Readers</div>
              </div>
            </div>
          </div>
        </div>

        {/* Decorative Wave */}
        <div className="absolute bottom-0 left-0 right-0">
          <svg viewBox="0 0 1440 120" className="w-full h-12 sm:h-16 md:h-20 fill-current text-white">
            <path d="M0,64L48,69.3C96,75,192,85,288,85.3C384,85,480,75,576,64C672,53,768,43,864,48C960,53,1056,75,1152,80C1248,85,1344,75,1392,69.3L1440,64L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"></path>
          </svg>
        </div>
      </section>

      {/* Search and Filter Section */}
      <section className="bg-white py-6 sm:py-8 border-b border-gray-200">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          {/* Search Bar */}
          <div className="mb-6">
            <div className="relative max-w-2xl mx-auto">
              <div className="absolute inset-y-0 left-0 pl-4 flex items-center pointer-events-none">
                <FaSearch className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="text"
                placeholder="Search blogs by title, content, or author..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="block w-full pl-12 pr-4 py-3 sm:py-4 border border-gray-300 rounded-full text-gray-900 placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent text-sm sm:text-base"
              />
            </div>
          </div>

          {/* Filter Controls */}
          <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">

            {/* Mobile Filter Toggle */}
            <div className="lg:hidden">
              <button
                onClick={() => setShowFilters(!showFilters)}
                className="flex items-center justify-center w-full bg-blue-50 text-blue-600 px-4 py-3 rounded-lg font-medium hover:bg-blue-100 transition-colors"
              >
                <FaFilter className="mr-2" />
                Filters & Sort
              </button>
            </div>

            {/* Desktop Filters */}
            <div className={`${showFilters ? 'block' : 'hidden'} lg:block`}>
              <div className="flex flex-col sm:flex-row gap-4 lg:gap-6">

                {/* Category Filter */}
                <div className="flex-1 sm:flex-initial">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Category</label>
                  <select
                    value={selectedCategory}
                    onChange={(e) => setSelectedCategory(e.target.value)}
                    className="block w-full sm:w-auto bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {BLOG_CATEGORIES.map((category) => (
                      <option key={category} value={category}>
                        {category}
                      </option>
                    ))}
                  </select>
                </div>

                {/* Sort Filter */}
                <div className="flex-1 sm:flex-initial">
                  <label className="block text-sm font-medium text-gray-700 mb-2">Sort By</label>
                  <select
                    value={sortBy}
                    onChange={(e) => setSortBy(e.target.value)}
                    className="block w-full sm:w-auto bg-white border border-gray-300 rounded-lg px-4 py-2.5 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  >
                    {SORT_OPTIONS.map((option) => (
                      <option key={option.value} value={option.value}>
                        {option.label}
                      </option>
                    ))}
                  </select>
                </div>
              </div>
            </div>

            {/* Results Count */}
            <div className="text-sm text-gray-600 lg:text-right">
              Showing <span className="font-semibold text-blue-600">{filteredBlogs.length}</span> of <span className="font-semibold">{blogs.length}</span> blogs
            </div>
          </div>
        </div>
      </section>

      {/* Main Content */}
      <section className="py-8 sm:py-12 md:py-16 bg-gradient-to-b from-white to-blue-50/30">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">

          {loading ? (
            // Loading State
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {[...Array(6)].map((_, index) => (
                <div key={index} className="bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden animate-pulse">
                  <div className="aspect-[16/10] bg-gray-200"></div>
                  <div className="p-6">
                    <div className="h-4 bg-gray-200 rounded mb-3"></div>
                    <div className="h-6 bg-gray-200 rounded mb-4"></div>
                    <div className="space-y-2 mb-4">
                      <div className="h-3 bg-gray-200 rounded"></div>
                      <div className="h-3 bg-gray-200 rounded w-3/4"></div>
                    </div>
                    <div className="flex justify-between items-center">
                      <div className="h-4 bg-gray-200 rounded w-20"></div>
                      <div className="h-4 bg-gray-200 rounded w-16"></div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          ) : error ? (
            // Error State
            <div className="text-center py-12">
              <div className="bg-red-50 border border-red-200 rounded-lg p-8 max-w-md mx-auto">
                <h3 className="text-lg font-semibold text-red-600 mb-2">Error Loading Blogs</h3>
                <p className="text-red-500 mb-4">{error}</p>
                <button
                  onClick={() => fetchBlogs()}
                  className="bg-red-600 text-white px-4 py-2 rounded-md hover:bg-red-700 transition"
                >
                  Try Again
                </button>
              </div>
            </div>
          ) : filteredBlogs.length === 0 ? (
            // No Results State
            <div className="text-center py-12">
              <div className="bg-gray-50 border border-gray-200 rounded-lg p-8 max-w-md mx-auto">
                <FaSearch className="mx-auto h-12 w-12 text-gray-400 mb-4" />
                <h3 className="text-lg font-semibold text-gray-600 mb-2">No Blogs Found</h3>
                <p className="text-gray-500 mb-4">
                  Try adjusting your search terms or filters to find more blogs.
                </p>
                <button
                  onClick={() => {
                    setSearchTerm('');
                    setSelectedCategory('All Blogs');
                    setSortBy('latest');
                  }}
                  className="bg-blue-600 text-white px-4 py-2 rounded-md hover:bg-blue-700 transition"
                >
                  Clear Filters
                </button>
              </div>
            </div>
          ) : (
            // Blog Grid
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
              {filteredBlogs.map((blog: BlogData) => {
                const heroImageUrl = blog.cover_image?.formats?.medium?.url ||
                  blog.cover_image?.formats?.small?.url ||
                  blog.cover_image?.url ||
                  '';

                return (
                  <article key={blog.id} className="group bg-white rounded-xl shadow-lg border border-gray-100 overflow-hidden hover:shadow-xl transition-all duration-300 hover:-translate-y-2">
                    {/* Blog Image */}
                    <div className="relative aspect-[16/10] overflow-hidden">
                      <Image
                        src={buildImageUrl(heroImageUrl)}
                        alt={blog.title}
                        fill
                        sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                        className="object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      <div className="absolute inset-0 bg-gradient-to-t from-black/50 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />

                      {/* Category Badge */}
                      <div className="absolute top-4 left-4">
                        <span className="bg-blue-500 text-white px-3 py-1 rounded-full text-xs font-semibold">
                          Travel Guide
                        </span>
                      </div>

                      {/* Reading Time */}
                      <div className="absolute top-4 right-4">
                        <div className="bg-white/90 backdrop-blur-sm px-2 py-1 rounded-full flex items-center">
                          <FaClock className="text-gray-600 mr-1 text-xs" />
                          <span className="text-xs font-medium text-gray-600">
                            {calculateReadingTime(blog.paragraph)}
                          </span>
                        </div>
                      </div>
                    </div>

                    {/* Blog Content */}
                    <div className="p-6">
                      {/* Meta Info */}
                      <div className="flex items-center gap-4 mb-3 text-xs text-gray-500">
                        <div className="flex items-center">
                          <FaCalendarAlt className="mr-1" />
                          <span>{formatDate(blog.publishedAt)}</span>
                        </div>
                        <div className="flex items-center">
                          <FaUser className="mr-1" />
                          <span>{blog.author_name}</span>
                        </div>
                      </div>

                      {/* Title */}
                      <h3 className="text-lg sm:text-xl font-bold text-gray-900 mb-3 line-clamp-2 group-hover:text-blue-600 transition-colors">
                        {blog.title}
                      </h3>

                      {/* Description */}
                      <p className="text-gray-600 text-sm leading-relaxed mb-4 line-clamp-3">
                        {blog.short_description}
                      </p>

                      {/* Footer */}
                      <div className="flex items-center justify-between">
                        <div className="flex items-center text-xs text-gray-500">
                          <FaEye className="mr-1" />
                          <span>Popular</span>
                        </div>

                        <Link
                          href={`/blog/${blog.documentId}`}
                          className="inline-flex items-center text-blue-600 hover:text-blue-700 font-semibold text-sm group-hover:translate-x-1 transition-all duration-300"
                        >
                          Read More
                          <svg className="w-4 h-4 ml-1" fill="currentColor" viewBox="0 0 20 20">
                            <path fillRule="evenodd" d="M10.293 3.293a1 1 0 011.414 0l6 6a1 1 0 010 1.414l-6 6a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-4.293-4.293a1 1 0 010-1.414z" clipRule="evenodd" />
                          </svg>
                        </Link>
                      </div>
                    </div>
                  </article>
                );
              })}
            </div>
          )}

          {/* Load More / Pagination could go here */}
          {filteredBlogs.length > 0 && (
            <div className="text-center mt-12">
              <div className="bg-gradient-to-r from-blue-50 to-cyan-50 rounded-xl p-8">
                <h3 className="text-xl font-bold text-gray-900 mb-4">Want More Travel Inspiration?</h3>
                <p className="text-gray-600 mb-6">Join our newsletter to get the latest travel guides and tips delivered to your inbox.</p>
                <div className="flex flex-col sm:flex-row gap-3 max-w-md mx-auto">
                  <input
                    type="email"
                    placeholder="Enter your email"
                    className="flex-1 px-4 py-3 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                  />
                  <button className="bg-gradient-to-r from-blue-600 to-cyan-600 text-white px-6 py-3 rounded-lg font-semibold hover:from-blue-700 hover:to-cyan-700 transition-all duration-300">
                    Subscribe
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      <ContactSection />

    </>
  );
}

export default BlogsPage;