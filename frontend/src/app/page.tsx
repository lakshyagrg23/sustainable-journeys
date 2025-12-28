'use client';

import { useState } from "react";
import Navbar from "@/components/Navbar";
import Hero from "@/Home/Hero";
import TabSystem from "@/components/TabSystem";
import HotelsResortsSection from "@/Home/HotelsResorts";
import Choice from "@/Home/Choice";
import ActivitySection from "@/Home/Activity";
import Testimonials from "@/Home/Testimonials";
import PackageSection from "@/Home/Package";
import FAQSection from "@/Home/FAQSection";
import BlogSection from "@/Home/Blogs";
import ContactSection from "@/components/Contact";
import SocialMedia from "@/components/SocialMedia";
import BikeSection from "@/Home/BikeSection";
import FerrySection from "@/Home/FerrySection";
import IslandSection from "@/Home/IslandSection";
import CuriousSection from "@/Home/CuriousSection";
import CapSection from "@/Home/CapSection";
//import ChatWidget from "@/components/ChatWidget";
// import Sightseeing from "@/Home/Sightseeing";

export default function Home() {
  const [activeTab, setActiveTab] = useState('package');

  const handleTabChange = (tab: string) => {
    setActiveTab(tab);
  };

  const renderTabContent = () => {
    switch (activeTab) {
      case 'bike':
        return (
          <>
            <BikeSection />
            {/* <ActivitySection /> */}
          </>
        );
      case 'Tickets':
        return (
          <>
            <FerrySection />
            {/* <ActivitySection /> */}
          </>
        );
      case 'activity':
        return (
          <>
            {/* <IslandSection /> */}
            <ActivitySection />

          </>
        );
      case 'package':
        return (
          <>
            <PackageSection />
            {/* <Choice /> */}
          </>
        );
      case 'hotel':
        return (
          <>
            <HotelsResortsSection />
            {/* <Choice /> */}
          </>
        );
      case 'curious':
        return (
          <>
            <CuriousSection />
            {/* <BlogSection /> */}
          </>
        );
      case 'cap':
        return (
          <>
            <CapSection />
          </>
        );
      default:
        return (
          <>
            <HotelsResortsSection />
            <Choice />
            {/* <ActivitySection /> */}
            <PackageSection />
            <BlogSection />
          </>
        );
    }
  };

  return (
    <>
      <Navbar />
      <Hero />
      <TabSystem onTabChange={handleTabChange} />

      {/* Conditionally render content based on active tab */}
      {renderTabContent()}

      {/* Always show these sections */}
      {/* <ChatWidget /> */}
      <IslandSection />
      {/* <Sightseeing /> */}
      {/* <ActivitySection /> */}
      <Choice />
      <BlogSection />
      <Testimonials />
      <SocialMedia />
      <FAQSection />
      <ContactSection />

    </>
  );
}


