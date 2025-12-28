// 'use client';
// import React, { useEffect } from 'react';
// import { useParams } from 'next/navigation';
// import Image from 'next/image';
// import Navbar from '@/components/Navbar';
// import ContactSection from '@/components/Contact';
// import useActivityStore from '../../../../../store/activityStore';

// const API_BASE_URL = (process.env.NEXT_PUBLIC_API_URL || '').replace(/\/$/, '');

// // Helper to render **starred** segments with bold/color
// const renderWithHighlights = (text: string) => {
//   const parts = text.split(/(\*\*[^*]+\*\*)/g);
//   return parts.map((part, idx) => {
//     if (/^\*\*[^*]+\*\*$/.test(part)) {
//       const inner = part.slice(2, -2);
//       return (
//         <span key={idx} className="font-semibold text-blue-600">{inner}</span>
//       );
//     }
//     return <span key={idx}>{part}</span>;
//   });
// };

// // Define types for description, child, and image
// interface RichTextChild {
//   text?: string;
// }

// interface RichTextParagraph {
//   children?: RichTextChild[];
// }

// interface GalleryImage {
//   id?: string;
//   formats?: {
//     medium?: { url: string };
//     small?: { url: string };
//   };
//   url: string;
// }

// // Helper to render rich text with formatting
// const renderRichText = (description: RichTextParagraph[]) => {
//   if (!Array.isArray(description)) return null;

//   return description.map((paragraph, idx) => {
//     if (paragraph.children && Array.isArray(paragraph.children)) {
//       const content = paragraph.children.map((child: RichTextChild, childIdx: number) => {
//         const text = child.text || '';

//         // Check for markdown-style formatting
//         if (text.includes('**') && text.includes('**')) {
//           return renderWithHighlights(text);
//         }

//         // Check for headings
//         if (text.startsWith('# ')) {
//           return (
//             <h2 key={childIdx} className="text-2xl font-bold text-gray-900 mb-4 mt-6">
//               {text.replace('# ', '')}
//             </h2>
//           );
//         }

//         // Check for bullet points
//         if (text.startsWith('- ')) {
//           return (
//             <li key={childIdx} className="mb-2 text-gray-700 ml-4">
//               {text.replace('- ', '')}
//             </li>
//           );
//         }
//         console.log(<span key={childIdx}>{text}</span>);
//         return <span key={childIdx}>{text}</span>;
//       });

//       // If it's an empty paragraph, skip it
//       const hasContent = paragraph.children.some((child: RichTextChild) => child.text && child.text.trim());
//       if (!hasContent) return null;

//       // If it contains bullet points, wrap in ul
//       const hasBullets = paragraph.children.some((child: RichTextChild) => child.text && child.text.startsWith('- '));
//       if (hasBullets) {
//         return <ul key={idx} className="list-disc list-inside mb-4">{content}</ul>;
//       }

//       // If it's a heading, return as is
//       const isHeading = paragraph.children.some((child: RichTextChild) => child.text && child.text.startsWith('# '));
//       if (isHeading) {
//         return <div key={idx}>{content}</div>;
//       }

//       // Regular paragraph
//       return (
//         <p key={idx} className="mb-4 text-gray-700 leading-relaxed">
//           {content}
//         </p>
//       );
//     }
//     return null;
//   }).filter(Boolean);

// };

// const buildAssetUrl = (u?: string) => {
//   if (!u) return '';
//   if (u.startsWith('http')) return u;
//   return `${API_BASE_URL}${u.startsWith('/') ? u : '/' + u}`;
// };

// function PlaceDetailsPage() {
//   const params = useParams() as { id?: string; slug?: string };
//   const { selectedPlace, loading, error, fetchSubActivityById } = useActivityStore();

//   useEffect(() => {
//     if (params.slug) {
//       fetchSubActivityById(params.slug);
//     }
//   }, [params.slug, fetchSubActivityById]);

//   if (loading) {
//     return (
//       <div className="flex justify-center items-center min-h-[60vh]">
//         <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-blue-500"></div>
//       </div>
//     );
//   }

//   if (error) {
//     return (
//       <div className="max-w-3xl mx-auto py-10 px-4 text-center">
//         <div className="bg-red-50 border border-red-200 rounded-lg p-8">
//           <h2 className="text-2xl font-bold text-red-600 mb-4">Error</h2>
//           <p className="text-red-500">{error}</p>
//         </div>
//       </div>
//     );
//   }

//   if (!selectedPlace) {
//     return (
//       <div className="max-w-3xl mx-auto py-10 px-4 text-center">
//         <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-8">
//           <h2 className="text-2xl font-bold text-yellow-600 mb-4">Place Not Found</h2>
//           <p>The place you&apos;re looking for could not be found.</p>
//         </div>
//       </div>
//     );
//   }

//   const heroImageUrl = selectedPlace.hero_section?.formats?.large?.url ||
//     selectedPlace.hero_section?.formats?.medium?.url ||
//     selectedPlace.hero_section?.formats?.small?.url ||
//     selectedPlace.hero_section?.url;
//   console.log('testing 3');
//   return (
//     <>
//       <Navbar />
//       <div className="bg-white">
//         {/* Hero Section */}
//         <div className="relative w-full h-[60vh] md:h-[70vh] bg-black shadow-2xl overflow-hidden">
//           {heroImageUrl && (
//             <div className="absolute inset-0">
//               <Image
//                 src={buildAssetUrl(heroImageUrl)}
//                 alt={selectedPlace.place_name || 'Place image'}
//                 fill
//                 priority
//                 sizes="100vw"
//                 className="object-cover"
//               />
//               <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-black/30 to-black/10"></div>
//             </div>
//           )}

//           <div className="relative z-10 flex items-end h-full">
//             <div className="w-full px-4 md:px-8 pb-8 md:pb-12">
//               <div className="max-w-4xl mx-auto text-white">
//                 <h1 className="text-4xl md:text-6xl font-extrabold tracking-tight mb-4 drop-shadow-lg">
//                   {selectedPlace.place_name}
//                 </h1>
//                 <p className="text-lg md:text-xl leading-relaxed drop-shadow-md mb-6 max-w-2xl">
//                   {selectedPlace.short_description}
//                 </p>
//                 <div className="flex flex-wrap items-center gap-4">
//                   <div className="flex items-center gap-2">
//                     <span className="text-3xl md:text-4xl font-bold text-green-400">
//                       ₹{selectedPlace.price}
//                     </span>
//                     <span className="text-gray-300">per person</span>
//                   </div>
//                   <span className="bg-blue-500/80 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium">
//                     {selectedPlace.type}
//                   </span>
//                   {selectedPlace.activity?.island_name && (
//                     <span className="bg-white/20 backdrop-blur-sm text-white px-4 py-2 rounded-full text-sm font-medium">
//                       {selectedPlace.activity.island_name}
//                     </span>
//                   )}
//                 </div>
//               </div>
//             </div>
//           </div>
//         </div>

//         {/* Main Content */}
//         <div className="max-w-6xl mx-auto px-4 md:px-8 py-12">
//           <div className="grid grid-cols-1 lg:grid-cols-3 gap-12">

//             {/* Left Column - Description */}
//             <div className="lg:col-span-2">
//               <div className="bg-white rounded-2xl shadow-lg p-8">
//                 <h2 className="text-3xl font-bold text-gray-900 mb-8">About This Experience</h2>

//                 {/* Rich Text Description */}
//                 <div className="prose max-w-none text-gray-700">
//                   {selectedPlace.description ? renderRichText(selectedPlace.description) : (
//                     <p className="text-lg leading-relaxed">
//                       {selectedPlace.short_description}
//                     </p>
//                   )}
//                 </div>

//                 {/* Activity Info */}
//                 {selectedPlace.activity && (
//                   <div className="mt-8 p-6 bg-blue-50 rounded-xl">
//                     <h3 className="text-xl font-semibold text-gray-900 mb-4">Activity Details</h3>
//                     <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
//                       <div>
//                         <span className="text-sm font-medium text-gray-600">Duration:</span>
//                         <p className="text-gray-900">{selectedPlace.activity.duration || 'Contact for details'}</p>
//                       </div>
//                       <div>
//                         <span className="text-sm font-medium text-gray-600">Category:</span>
//                         <p className="text-gray-900 capitalize">{selectedPlace.activity.category}</p>
//                       </div>
//                       <div>
//                         <span className="text-sm font-medium text-gray-600">Tags:</span>
//                         <p className="text-gray-900">{selectedPlace.activity.tags}</p>
//                       </div>
//                       <div>
//                         <span className="text-sm font-medium text-gray-600">Location:</span>
//                         <p className="text-gray-900">{selectedPlace.activity.island_name}</p>
//                       </div>
//                     </div>
//                   </div>
//                 )}
//               </div>
//             </div>

//             {/* Right Column - Booking & Info */}
//             <div className="lg:col-span-1">
//               <div className="sticky top-8">
//                 {/* Booking Card */}
//                 <div className="bg-white rounded-2xl shadow-lg p-6 mb-6">
//                   <div className="text-center mb-6">
//                     <div className="text-4xl font-bold text-green-600 mb-2">
//                       ₹{selectedPlace.price}
//                     </div>
//                     <p className="text-gray-600">per person</p>
//                   </div>

//                   <button className="w-full bg-gradient-to-r from-blue-500 to-cyan-600 hover:from-blue-600 hover:to-cyan-700 text-white py-4 rounded-xl font-semibold text-lg transition-all duration-200 transform hover:scale-105 shadow-lg mb-4">
//                     Book Now
//                   </button>

//                   <button className="w-full border-2 border-gray-300 hover:border-blue-500 text-gray-700 hover:text-blue-600 py-3 rounded-xl font-medium transition-colors">
//                     Contact for Details
//                   </button>
//                 </div>

//                 {/* Quick Info */}
//                 <div className="bg-gray-50 rounded-2xl p-6">
//                   <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Information</h3>
//                   <div className="space-y-3">
//                     <div className="flex justify-between">
//                       <span className="text-gray-600">Activity Type:</span>
//                       <span className="font-medium capitalize">{selectedPlace.type}</span>
//                     </div>
//                     <div className="flex justify-between">
//                       <span className="text-gray-600">Price:</span>
//                       <span className="font-medium text-green-600">₹{selectedPlace.price}</span>
//                     </div>
//                     {selectedPlace.activity?.duration && (
//                       <div className="flex justify-between">
//                         <span className="text-gray-600">Duration:</span>
//                         <span className="font-medium">{selectedPlace.activity.duration}</span>
//                       </div>
//                     )}
//                     {selectedPlace.activity?.island_name && (
//                       <div className="flex justify-between">
//                         <span className="text-gray-600">Location:</span>
//                         <span className="font-medium">{selectedPlace.activity.island_name}</span>
//                       </div>
//                     )}
//                   </div>
//                 </div>
//               </div>
//             </div>
//           </div>

//           {/* Gallery Section */}
//           {selectedPlace.gallery && selectedPlace.gallery.length > 0 && (
//             <div className="mt-16">
//               <h2 className="text-3xl font-bold text-gray-900 mb-8 text-center">Gallery</h2>
//               <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
//                 {selectedPlace.gallery.map((image: GalleryImage, index: number) => (
//                   <div key={image.id || index} className="group relative h-64 rounded-2xl overflow-hidden shadow-lg hover:shadow-xl transition-all duration-300">
//                     <Image
//                       src={buildAssetUrl(image.formats?.medium?.url || image.formats?.small?.url || image.url)}
//                       alt={`Gallery image ${index + 1}`}
//                       fill
//                       sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
//                       className="object-cover group-hover:scale-110 transition-transform duration-500"
//                     />
//                     <div className="absolute inset-0 bg-black/0 group-hover:bg-black/10 transition-colors duration-300"></div>
//                   </div>
//                 ))}
//               </div>
//             </div>
//           )}
//         </div>
//       </div>
//       <ContactSection />
//     </>
//   );
// }

// export default PlaceDetailsPage;
