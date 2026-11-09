import React, { useState } from 'react';
import Navbar from './components/Navbar';
import Hero from './components/Hero';
import AuthorityRibbon from './components/AuthorityRibbon';
import ServiceMenu from './components/ServiceMenu';
import BookingEngine from './components/BookingEngine';
import BookingModal from './components/BookingModal';
import ReviewsWall from './components/ReviewsWall';
import SocialShowcase from './components/SocialShowcase';
import LocationCard from './components/LocationCard';
import Footer from './components/Footer';
import MobileBottomBar from './components/MobileBottomBar';
import Toast from './components/Toast';
import { useToast } from './hooks/useToast';
import { services } from './data/services';

export default function App() {
  const [selectedServices, setSelectedServices] = useState([]);
  const [bookingModalData, setBookingModalData] = useState(null);
  const { toasts, addToast, removeToast } = useToast();

  const handleToggleService = (serviceId) => {
    const service = services.find((s) => s.id === serviceId);
    const serviceName = service ? service.name : 'Service';

    setSelectedServices((prev) => {
      const isAlreadySelected = prev.includes(serviceId);
      if (isAlreadySelected) {
        addToast(`Removed "${serviceName}" from consultation`, 'info', 2500);
        return prev.filter((id) => id !== serviceId);
      } else {
        addToast(`Added "${serviceName}" to consultation ✨`, 'success', 3000);
        return [...prev, serviceId];
      }
    });
  };

  const handleScrollToBooking = () => {
    const bookingSection = document.getElementById('booking');
    if (bookingSection) {
      bookingSection.scrollIntoView({ behavior: 'smooth' });
    }
  };

  const handleBookingComplete = (data) => {
    setBookingModalData(data);
    addToast('🎉 Appointment reserved! Click WhatsApp to send your ticket.', 'success', 5000);
  };

  const handleCloseModal = () => {
    setBookingModalData(null);
  };

  return (
    <div className="min-h-screen bg-silk text-espresso font-body flex flex-col selection:bg-gold/20 selection:text-espresso pb-16 md:pb-0">
      {/* Top Navigation */}
      <Navbar />

      {/* Main Content */}
      <main className="flex-1">
        {/* Anchor point for #hero and #home */}
        <div id="hero" className="-mt-16 pt-16">
          <Hero />
        </div>

        {/* Authority & Trust Metrics Ribbon */}
        <AuthorityRibbon />

        {/* Interactive Filterable Services & Price Book */}
        <ServiceMenu
          selectedServices={selectedServices}
          onToggleService={handleToggleService}
          onScrollToBooking={handleScrollToBooking}
        />

        {/* 5-Star Concierge Booking Engine */}
        <BookingEngine
          selectedServices={selectedServices}
          onToggleService={handleToggleService}
          onBookingComplete={handleBookingComplete}
        />

        {/* Verified Google Reviews Wall */}
        <ReviewsWall />

        {/* Social Media Showcase & Lookbook Hub */}
        <SocialShowcase />

        {/* Location & Studio Concierge */}
        <LocationCard />
      </main>

      {/* Luxury Editorial Footer */}
      <Footer />

      {/* Sticky Mobile Bottom Navigation Bar */}
      <MobileBottomBar selectedCount={selectedServices.length} />

      {/* Booking Confirmation Ticket Modal */}
      {bookingModalData && (
        <BookingModal
          booking={bookingModalData}
          onClose={handleCloseModal}
        />
      )}

      {/* Toast Notifications */}
      <Toast toasts={toasts} removeToast={removeToast} />
    </div>
  );
}
