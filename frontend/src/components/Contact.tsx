'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import Image from 'next/image';
import { FaPhone, FaEnvelope, FaMapMarkerAlt, FaClock, FaWhatsapp, FaBriefcase, FaCalendarAlt } from 'react-icons/fa';

interface ContactFormData {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
  travelDate?: string;
}

const ContactSection = () => {
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [submitStatus, setSubmitStatus] = useState<null | 'success' | 'error'>(null);

  const { register, handleSubmit, reset, formState: { errors } } = useForm<ContactFormData>();

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true);
    setSubmitStatus(null);
    try {
      // Send all form data to /api/zoho-lead
      const res = await fetch('/api/zoho-lead', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          name: data.name,
          email: data.email,
          phone: data.phone,
          subject: data.subject,
          message: data.message,
          travelDate: data.travelDate
        })
      });
      const result = await res.json();
      console.log('Zoho Lead API response:', result);
      if (result.success) {
        setSubmitStatus('success');
        reset();
        // Reset success message after 5 seconds
        setTimeout(() => {
          setSubmitStatus(null);
        }, 5000);
      } else {
        setSubmitStatus('error');
      }
    } catch (error) {
      setSubmitStatus('error');
      console.error('Error submitting form:', error);
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <section id="contact" className="bg-white py-8 md:py-16 relative overflow-hidden">
      {/* Background decorative elements */}
      {/* <div className="absolute -top-24 -right-24 w-64 h-64 bg-blue-50 rounded-full opacity-70"></div>
      <div className="absolute -bottom-32 -left-32 w-96 h-96 bg-blue-50 rounded-full opacity-70"></div> */}

      <div className="container mx-auto px-4 relative z-10">
        <div className="text-center mb-8 md:mb-12">
          <h2 className="text-2xl md:text-3xl lg:text-4xl font-bold text-gray-900 mb-3 md:mb-4">
            Get in Touch
          </h2>
          <div className="w-16 md:w-20 h-1 bg-blue-600 mx-auto"></div>
          <p className="mt-3 md:mt-4 text-sm md:text-base text-gray-600 max-w-2xl mx-auto px-4">
            Have questions about our travel packages or need assistance planning your trip?
          </p>
        </div>

        {/* Mobile: Stacked Layout, Desktop: Side by side */}
        <div className="grid grid-cols-1 lg:grid-cols-5 gap-6 lg:gap-8">
          {/* Contact Info Column - Compact on mobile */}
          <div className="lg:col-span-2 bg-gray-50 p-4 md:p-6 lg:p-8 rounded-lg shadow-sm border border-gray-100">
            <h3 className="text-lg md:text-xl font-bold text-gray-800 mb-4 md:mb-6">Contact Information</h3>

            {/* Compact Contact Cards for Mobile */}
            <div className="space-y-3 md:space-y-6">
              {/* Phone & WhatsApp in same row on mobile */}
              <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-1 gap-3 md:gap-6">
                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center w-10 md:w-12 h-10 md:h-12 rounded-full bg-blue-100 text-blue-600">
                      <FaPhone size={14} className="md:w-[18px] md:h-[18px]" />
                    </div>
                  </div>
                  <div className="ml-3 md:ml-4">
                    <h4 className="text-xs md:text-sm font-semibold text-gray-900">Phone</h4>
                    <div className="flex flex-col text-xs md:text-sm">
                      <a href="tel:+918944999448" className="text-gray-600 hover:text-blue-600 transition-colors">
                        +91 8944-999-448
                      </a>
                      <a href="tel:+919476017072" className="text-gray-600 hover:text-blue-600 transition-colors mt-1">
                        +91 9476-017-072
                      </a>
                    </div>
                  </div>
                </div>

                <div className="flex">
                  <div className="flex-shrink-0">
                    <div className="flex items-center justify-center w-10 md:w-12 h-10 md:h-12 rounded-full bg-green-100 text-green-600">
                      <FaWhatsapp size={14} className="md:w-[18px] md:h-[18px]" />
                    </div>
                  </div>
                  <div className="ml-3 md:ml-4">
                    <h4 className="text-xs md:text-sm font-semibold text-gray-900">WhatsApp</h4>
                    <div className="flex flex-col text-xs md:text-sm">
                      <a href="https://wa.me/918944999448" className="text-gray-600 hover:text-green-600 transition-colors">
                        +91 8944-999-448
                      </a>
                      <a href="https://wa.me/919476017072" className="text-gray-600 hover:text-green-600 transition-colors mt-1">
                        +91 9476-017-072
                      </a>
                    </div>
                  </div>
                </div>
              </div>

              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-10 md:w-12 h-10 md:h-12 rounded-full bg-blue-100 text-blue-600">
                    <FaEnvelope size={14} className="md:w-[18px] md:h-[18px]" />
                  </div>
                </div>
                <div className="ml-3 md:ml-4 min-w-0">
                  {/* <h4 className="text-xs md:text-sm font-semibold text-gray-900">Email</h4> */}
                  <div className="flex flex-col text-xs md:text-sm space-y-2">
                    <div className="flex items-center gap-2 flex-wrap">
                      <FaEnvelope className="text-blue-600" />
                      <a href="mailto:info@saarthiandaman.com" className="text-gray-600 hover:text-blue-600 transition-colors break-words">
                        info@saarthiandaman.com
                      </a>
                    </div>
                    <div className="flex items-center gap-2 flex-wrap">
                      <FaBriefcase className="text-blue-600" />
                      <span className="text-gray-800 font-semibold ">B2B:</span>
                      <a href="mailto:agents@saarthiandaman.com" className="text-gray-600 hover:text-blue-600 transition-colors break-words">
                        agents@saarthiandaman.com
                      </a>
                    </div>
                    <div className="flex items-center gap-0 md:gap-2 flex-wrap">
                      <FaCalendarAlt className="text-blue-600" />
                      <span className="text-gray-800 font-semibold ">Reservation:</span>
                      <a href="mailto:reservation@saarthiandaman.com" className="text-gray-600 hover:text-blue-600 transition-colors break-words">
                        reservation@saarthiandaman.com
                      </a>
                    </div>
                  </div>
                </div>

              </div>

              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-10 md:w-12 h-10 md:h-12 rounded-full bg-blue-100 text-blue-600">
                    <FaMapMarkerAlt size={14} className="md:w-[18px] md:h-[18px]" />
                  </div>
                </div>
                <div className="ml-3 md:ml-4">
                  <h4 className="text-xs md:text-sm font-semibold text-gray-900">Office</h4>
                  <p className="text-xs md:text-sm text-gray-600">
                    Port Blair, Andaman & Nicobar Islands
                  </p>
                </div>
              </div>

              <div className="flex">
                <div className="flex-shrink-0">
                  <div className="flex items-center justify-center w-10 md:w-12 h-10 md:h-12 rounded-full bg-blue-100 text-blue-600">
                    <FaClock size={14} className="md:w-[18px] md:h-[18px]" />
                  </div>
                </div>
                <div className="ml-3 md:ml-4">
                  <h4 className="text-xs md:text-sm font-semibold text-gray-900">Hours</h4>
                  <p className="text-xs md:text-sm text-gray-600">
                    Mon-Sat: 9 AM - 6 PM<br className="hidden md:block" />
                    <span className="md:hidden"> | </span>Sunday: Closed
                  </p>
                </div>
              </div>
            </div>

            {/* Compact Map on mobile, hide on small screens */}
            <div className="mt-4 md:mt-8 aspect-video w-full rounded-lg overflow-hidden shadow-sm hidden sm:block">
              <Image
                src="/photo11.jpg"
                alt="Andaman Beach"
                width={500}
                height={300}
                className="w-full h-full object-cover"
              />
            </div>
          </div>

          {/* Contact Form Column - Optimized for mobile */}
          <div className="lg:col-span-3 bg-white rounded-lg shadow-md p-4 md:p-6 lg:p-8 border border-gray-100">            <h3 className="text-lg md:text-xl font-bold text-gray-900 mb-4 md:mb-6">Send us a Message</h3>

            {/* Status Messages */}
            {submitStatus === 'success' && (
              <div className="mb-4 md:mb-6 bg-green-50 border border-green-200 rounded-md p-3 md:p-4 text-green-800">
                <div className="flex items-center justify-center flex-col gap-2">
                  <svg className="h-8 w-8 text-green-600 mb-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                  <span className="text-base md:text-lg font-semibold">Thank you! Your message has been sent successfully.<br />Our team will contact you soon.</span>
                </div>
              </div>
            )}

            {submitStatus === 'error' && (
              <div className="mb-4 md:mb-6 bg-red-50 border border-red-200 rounded-md p-3 md:p-4 text-red-800">
                <div className="flex items-center">
                  <svg className="h-4 w-4 md:h-5 md:w-5 text-red-600 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                  </svg>
                  <span className="text-sm md:text-base">There was a problem sending your message. Please try again.</span>
                </div>
              </div>
            )}

            {/* Compact Form */}
            <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 md:space-y-5">
              {/* Name and Email in single column on mobile for better UX */}
              <div className="space-y-4 md:grid md:grid-cols-2 md:gap-5 md:space-y-0">
                <div>
                  <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="name"
                    type="text"
                    className={`w-full px-3 md:px-4 py-2 md:py-3 rounded-md border  text-black ${errors.name ? 'border-red-500' : 'border-gray-300'} focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 text-sm md:text-base`}
                    placeholder="Your name"
                    {...register('name', { required: 'Name is required' })}
                  />
                  {errors.name && (
                    <p className="mt-1 text-xs text-red-600">{errors.name.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="email"
                    type="email"
                    className={`w-full px-3 md:px-4 py-2 md:py-3  text-black rounded-md border ${errors.email ? 'border-red-500' : 'border-gray-300'} focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 text-sm md:text-base`}
                    placeholder="your.email@example.com"
                    {...register('email', {
                      required: 'Email is required',
                      pattern: {
                        value: /^[a-zA-Z0-9._%+-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,}$/,
                        message: 'Please enter a valid email address'
                      }
                    })}
                  />
                  {errors.email && (
                    <p className="mt-1 text-xs text-red-600">{errors.email.message}</p>
                  )}
                </div>
              </div>

              <div className="space-y-4 md:grid md:grid-cols-2 md:gap-5 md:space-y-0">
                <div>
                  <label htmlFor="phone" className="block text-sm font-medium text-gray-700 mb-1">
                    Phone Number <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="phone"
                    type="tel"
                    className={`w-full px-3 md:px-4 py-2 md:py-3 rounded-md  text-black border ${errors.phone ? 'border-red-500' : 'border-gray-300'} focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 text-sm md:text-base`}
                    placeholder="Your phone number"
                    {...register('phone', {
                      required: 'Phone number is required',
                      minLength: {
                        value: 10,
                        message: 'Phone number must be at least 10 digits'
                      }
                    })}
                  />
                  {errors.phone && (
                    <p className="mt-1 text-xs text-red-600">{errors.phone.message}</p>
                  )}
                </div>

                <div>
                  <label htmlFor="subject" className="block text-sm font-medium text-gray-700 mb-1">
                    Subject
                  </label>
                  <select
                    id="subject"
                    className="w-full px-3 md:px-4 py-2 md:py-3 rounded-md border border-gray-300 text-black focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 text-sm md:text-base"
                    {...register('subject')}
                  >
                    <option value="General Inquiry">General Inquiry</option>
                    <option value="Booking Information">Booking Information</option>
                    <option value="Tour Package">Tour Package</option>
                    <option value="Reservation Status">Reservation Status</option>
                    <option value="Feedback">Feedback</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div className="space-y-4 md:grid md:grid-cols-2 md:gap-5 md:space-y-0">
                <div>
                  <label htmlFor="travelDate" className="block text-sm font-medium text-gray-700 mb-1">
                    Arrival / Pickup Date <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="travelDate"
                    type="date"
                    className={`w-full px-3 md:px-4 py-2 md:py-3 rounded-md border text-black ${errors.travelDate ? 'border-red-500' : 'border-gray-300'} focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 text-sm md:text-base`}
                    {...register('travelDate', { required: 'Arrival / Pickup Date is required' })}
                  />
                  {errors.travelDate && (
                    <p className="mt-1 text-xs text-red-600">{String(errors.travelDate.message)}</p>
                  )}
                </div>
              </div>

              <div>
                <label htmlFor="message" className="block text-sm font-medium text-gray-700 mb-1">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="message"
                  rows={4}
                  className={`w-full px-3 md:px-4 py-2 md:py-3 rounded-md  text-black border ${errors.message ? 'border-red-500' : 'border-gray-300'} focus:border-blue-500 focus:ring focus:ring-blue-200 focus:ring-opacity-50 text-sm md:text-base`}
                  placeholder="How can we help you?"
                  {...register('message', { required: 'Message is required' })}
                ></textarea>
                {errors.message && (
                  <p className="mt-1 text-xs text-red-600">{errors.message.message}</p>
                )}
              </div>

              <div className="flex items-start">
                <input
                  id="privacy-policy"
                  name="privacy-policy"
                  type="checkbox"
                  className="h-4 w-4 mt-0.5 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
                  required
                />
                <label htmlFor="privacy-policy" className="ml-2 block text-xs md:text-sm text-gray-600">
                  I agree to the <a href="#" className="text-blue-600 hover:underline">Privacy Policy</a> and consent to be contacted.
                </label>
              </div>

              <div>
                <button
                  type="submit"
                  disabled={isSubmitting}
                  className={`w-full px-6 md:px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-medium rounded-md shadow transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 text-sm md:text-base ${isSubmitting ? 'opacity-70 cursor-not-allowed' : ''}`}
                >
                  {isSubmitting ? (
                    <div className="flex items-center justify-center">
                      <svg className="animate-spin -ml-1 mr-2 h-4 w-4 md:h-5 md:w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                        <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                        <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                      </svg>
                      Sending...
                    </div>
                  ) : 'Send Message'}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>

      {/* Office Location Banner - Compact on mobile */}
      <div className="bg-blue-50 mt-8 md:mt-16 py-6 md:py-8">
        <div className="container mx-auto px-4">
          <div className="flex flex-col md:flex-row items-center justify-center md:justify-between text-center md:text-left space-y-3 md:space-y-0">
            <div>
              <h4 className="text-lg md:text-xl font-bold text-gray-800">Need help with your travel plans?</h4>
              <p className="text-sm md:text-base text-gray-600 mt-1">Our travel experts are ready to craft your perfect Andaman experience!</p>
            </div>
            <div className="flex items-center gap-3">
              <a
                href="tel:+918944999448"
                className="bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-md font-medium transition-colors shadow-sm flex items-center text-sm md:text-base"
              >
                <FaPhone className="mr-2" /> Call Us Now
              </a>
              <div className="text-sm text-gray-700">
                <div className="font-medium">Alternate:</div>
                <div>
                  <a href="tel:+919476017072" className="text-blue-600 hover:underline">+91 9476-017-072</a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default ContactSection;