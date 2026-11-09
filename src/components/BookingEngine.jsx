import React, { useState, useMemo } from 'react';
import {
  ChevronLeft,
  ChevronRight,
  Calendar,
  Clock,
  User,
  Phone,
  MessageSquare,
  Check,
  X,
  Sparkles,
  AlertCircle,
} from 'lucide-react';
import { RevealOnScroll } from '../hooks/useScrollReveal';
import { services } from '../data/services';
import { artists, occasions, timeSlots } from '../data/artists';

const STEP_LABELS = ['Services', 'Artist & Occasion', 'Date & Time', 'Your Details'];

function formatPrice(price) {
  return price.toLocaleString('en-IN');
}

function formatDuration(minutes) {
  if (typeof minutes !== 'number') return minutes;
  const h = Math.floor(minutes / 60);
  const m = minutes % 60;
  if (h === 0) return `${m} min`;
  if (m === 0) return `${h} hr`;
  return `${h} hr ${m} min`;
}

export default function BookingEngine({ selectedServices, onToggleService, onBookingComplete }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [selectedArtist, setSelectedArtist] = useState('');
  const [selectedOccasion, setSelectedOccasion] = useState('');
  const [selectedDate, setSelectedDate] = useState('');
  const [selectedTime, setSelectedTime] = useState('');
  const [clientName, setClientName] = useState('');
  const [clientPhone, setClientPhone] = useState('');
  const [clientNotes, setClientNotes] = useState('');
  const [skinNote, setSkinNote] = useState(false);
  const [errors, setErrors] = useState({});

  // Look up full service objects for selected IDs
  const selectedServiceDetails = useMemo(
    () => services.filter((s) => selectedServices.includes(s.id)),
    [selectedServices]
  );

  const totalPrice = useMemo(
    () => selectedServiceDetails.reduce((sum, s) => sum + s.price, 0),
    [selectedServiceDetails]
  );

  const totalDuration = useMemo(() => {
    let mins = 0;
    selectedServiceDetails.forEach((s) => {
      if (typeof s.duration === 'number') mins += s.duration;
    });
    return mins;
  }, [selectedServiceDetails]);

  // Today's date as YYYY-MM-DD for min attribute
  const todayStr = new Date().toISOString().split('T')[0];

  // Validation per step
  function validateStep(step) {
    const newErrors = {};
    if (step === 0) {
      if (selectedServices.length === 0) newErrors.services = 'Please select at least one service.';
    } else if (step === 1) {
      if (!selectedArtist) newErrors.artist = 'Please choose an artist.';
      if (!selectedOccasion) newErrors.occasion = 'Please select an occasion.';
    } else if (step === 2) {
      if (!selectedDate) newErrors.date = 'Please pick a date.';
      if (!selectedTime) newErrors.time = 'Please choose a time slot.';
    } else if (step === 3) {
      if (!clientName.trim()) newErrors.name = 'Name is required.';
      if (!/^\d{10}$/.test(clientPhone)) newErrors.phone = 'Enter a valid 10-digit number.';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  }

  function handleNext() {
    if (validateStep(currentStep)) {
      setCurrentStep((s) => Math.min(s + 1, 3));
    }
  }

  function handleBack() {
    setErrors({});
    setCurrentStep((s) => Math.max(s - 1, 0));
  }

  async function handleSubmit() {
    if (!validateStep(3)) return;

    const year = new Date().getFullYear();
    const rand = String(Math.floor(1000 + Math.random() * 9000));
    const refId = `MLS-${year}-${rand}`;

    const artistObj = artists.find((a) => a.id === selectedArtist);
    const bookingData = {
      refId,
      services: selectedServiceDetails,
      artist: artistObj?.name || selectedArtist,
      occasion: selectedOccasion,
      date: selectedDate,
      time: selectedTime,
      name: clientName.trim(),
      phone: clientPhone,
      notes: clientNotes.trim(),
      skinNote,
      totalPrice,
      totalDuration,
    };

    // Attempt to post to backend (gracefully fail)
    try {
      await fetch('/api/appointments', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(bookingData),
      });
    } catch {
      // Backend not running – that's fine
    }

    onBookingComplete(bookingData);
  }

  function scrollToServices() {
    const el = document.getElementById('services');
    if (el) el.scrollIntoView({ behavior: 'smooth' });
  }

  // ──────────── Step Indicator ────────────
  function StepIndicator() {
    return (
      <div className="flex items-center justify-center mb-10">
        {STEP_LABELS.map((label, i) => {
          const isCompleted = i < currentStep;
          const isActive = i === currentStep;
          return (
            <React.Fragment key={label}>
              <div className="flex flex-col items-center">
                <div
                  className={`w-10 h-10 md:w-11 md:h-11 rounded-full flex items-center justify-center text-sm font-semibold font-body transition-all duration-300 ${
                    isCompleted
                      ? 'bg-gold text-white'
                      : isActive
                      ? 'border-2 border-gold text-gold bg-white'
                      : 'border-2 border-champagne-border text-taupe bg-white'
                  }`}
                >
                  {isCompleted ? <Check className="w-5 h-5" /> : i + 1}
                </div>
                <span
                  className={`mt-1.5 text-[11px] md:text-xs font-body whitespace-nowrap ${
                    isActive ? 'text-gold font-semibold' : 'text-taupe'
                  }`}
                >
                  {label}
                </span>
              </div>
              {i < STEP_LABELS.length - 1 && (
                <div
                  className={`flex-1 h-0.5 mx-1 md:mx-2 mt-[-18px] md:mt-[-20px] rounded-full transition-colors duration-300 ${
                    i < currentStep ? 'bg-gold' : 'bg-champagne-border'
                  }`}
                />
              )}
            </React.Fragment>
          );
        })}
      </div>
    );
  }

  // ──────────── Step 1: Services Summary ────────────
  function StepServices() {
    if (selectedServices.length === 0) {
      return (
        <div className="text-center py-12">
          <AlertCircle className="w-12 h-12 text-gold mx-auto mb-4" />
          <p className="text-espresso font-body text-lg mb-2">No services selected yet</p>
          <p className="text-taupe font-body mb-6">Browse our luxury menu and pick what suits you.</p>
          <button
            onClick={scrollToServices}
            className="bg-gold hover:bg-gold-hover text-white rounded-xl px-6 py-3 font-semibold font-body transition-colors"
          >
            Browse Services
          </button>
        </div>
      );
    }

    return (
      <div>
        <div className="space-y-3 mb-6">
          {selectedServiceDetails.map((svc) => (
            <div
              key={svc.id}
              className="flex items-center justify-between bg-silk rounded-xl px-4 py-3 border border-champagne-border"
            >
              <div className="flex-1 min-w-0 mr-3">
                <p className="font-body font-semibold text-espresso text-sm md:text-base truncate">
                  {svc.name}
                </p>
                <p className="font-body text-taupe text-xs mt-0.5">
                  ₹{formatPrice(svc.price)} · {formatDuration(svc.duration)}
                </p>
              </div>
              <button
                onClick={() => onToggleService(svc.id)}
                className="shrink-0 w-8 h-8 flex items-center justify-center rounded-full border border-champagne-border text-taupe hover:bg-red-50 hover:text-red-500 hover:border-red-300 transition-colors"
                aria-label={`Remove ${svc.name}`}
              >
                <X className="w-4 h-4" />
              </button>
            </div>
          ))}
        </div>

        <div className="border-t border-champagne-border pt-4 flex flex-col sm:flex-row sm:items-center sm:justify-between gap-2">
          <div>
            <p className="text-2xl font-bold text-gold font-heading">₹{formatPrice(totalPrice)}</p>
            {totalDuration > 0 && (
              <p className="text-taupe text-sm font-body flex items-center gap-1 mt-1">
                <Clock className="w-4 h-4" /> Estimated {formatDuration(totalDuration)}
              </p>
            )}
          </div>
          <p className="text-taupe text-sm font-body">
            {selectedServices.length} service{selectedServices.length > 1 ? 's' : ''} selected
          </p>
        </div>
      </div>
    );
  }

  // ──────────── Step 2: Artist & Occasion ────────────
  function StepArtistOccasion() {
    return (
      <div className="space-y-8">
        {/* Artist Selector */}
        <div>
          <h3 className="font-heading text-xl md:text-2xl text-espresso mb-4">Choose Your Artist</h3>
          {errors.artist && (
            <p className="text-red-500 text-sm font-body mb-2 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" /> {errors.artist}
            </p>
          )}
          <div className="grid gap-3">
            {artists.map((artist) => (
              <button
                key={artist.id}
                onClick={() => setSelectedArtist(artist.id)}
                className={`w-full text-left p-4 rounded-2xl border-2 transition-all duration-200 ${
                  selectedArtist === artist.id
                    ? 'border-gold bg-gold/5'
                    : 'border-champagne-border bg-white hover:border-gold/40'
                }`}
              >
                <div className="flex items-start gap-3">
                  <span className="text-2xl mt-0.5">{artist.icon}</span>
                  <div className="flex-1">
                    <p className="font-body font-semibold text-espresso">{artist.name}</p>
                    <p className="font-body text-taupe text-sm">{artist.title}</p>
                    <div className="flex flex-wrap gap-1.5 mt-2">
                      {artist.specialties.map((sp) => (
                        <span
                          key={sp}
                          className="text-xs font-body bg-champagne-blush text-taupe px-2 py-0.5 rounded-full"
                        >
                          {sp}
                        </span>
                      ))}
                    </div>
                  </div>
                  {selectedArtist === artist.id && (
                    <Check className="w-5 h-5 text-gold shrink-0 mt-1" />
                  )}
                </div>
              </button>
            ))}
          </div>
        </div>

        {/* Occasion Tags */}
        <div>
          <h3 className="font-heading text-xl md:text-2xl text-espresso mb-4">Select Occasion</h3>
          {errors.occasion && (
            <p className="text-red-500 text-sm font-body mb-2 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" /> {errors.occasion}
            </p>
          )}
          <div className="flex flex-wrap gap-2">
            {occasions.map((occ) => (
              <button
                key={occ}
                onClick={() => setSelectedOccasion(occ)}
                className={`rounded-full px-5 py-2.5 min-h-[48px] font-body text-sm font-medium transition-all duration-200 ${
                  selectedOccasion === occ
                    ? 'bg-gold text-white'
                    : 'bg-white border border-champagne-border text-espresso hover:border-gold/40'
                }`}
              >
                {occ}
              </button>
            ))}
          </div>
        </div>

        {/* Skin Note */}
        <label className="flex items-start gap-3 cursor-pointer p-4 rounded-xl border border-champagne-border bg-silk">
          <input
            type="checkbox"
            checked={skinNote}
            onChange={(e) => setSkinNote(e.target.checked)}
            className="mt-0.5 w-5 h-5 rounded border-champagne-border text-gold focus:ring-gold/20 accent-[#C59B6D]"
          />
          <div>
            <p className="font-body font-semibold text-espresso text-sm">
              Need Special Acne-Mark / Sensitive Skin Coverage
            </p>
            <p className="font-body text-taupe text-xs mt-0.5">
              Let your artist prepare specialised products for flawless coverage.
            </p>
          </div>
        </label>
      </div>
    );
  }

  // ──────────── Step 3: Date & Time ────────────
  function StepDateTime() {
    return (
      <div className="space-y-8">
        {/* Date Picker */}
        <div>
          <h3 className="font-heading text-xl md:text-2xl text-espresso mb-4 flex items-center gap-2">
            <Calendar className="w-5 h-5 text-gold" /> Pick a Date
          </h3>
          {errors.date && (
            <p className="text-red-500 text-sm font-body mb-2 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" /> {errors.date}
            </p>
          )}
          <input
            type="date"
            min={todayStr}
            value={selectedDate}
            onChange={(e) => setSelectedDate(e.target.value)}
            className="w-full rounded-xl border border-champagne-border px-4 py-3 font-body text-espresso focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition-all bg-white"
          />
        </div>

        {/* Time Slots */}
        <div>
          <h3 className="font-heading text-xl md:text-2xl text-espresso mb-4 flex items-center gap-2">
            <Clock className="w-5 h-5 text-gold" /> Choose a Time
          </h3>
          {errors.time && (
            <p className="text-red-500 text-sm font-body mb-2 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" /> {errors.time}
            </p>
          )}
          {Object.entries(timeSlots).map(([period, slots]) => (
            <div key={period} className="mb-6">
              <p className="font-body font-semibold text-taupe text-sm uppercase tracking-wide mb-3">
                {period}{' '}
                <span className="font-normal normal-case text-xs">
                  {period === 'Morning'
                    ? '(9 AM – 12 PM)'
                    : period === 'Afternoon'
                    ? '(12 PM – 4 PM)'
                    : '(4 PM – 8 PM)'}
                </span>
              </p>
              <div className="flex flex-wrap gap-2">
                {slots.map((slot) => (
                  <button
                    key={slot}
                    onClick={() => setSelectedTime(slot)}
                    className={`rounded-xl px-4 py-3 min-h-[48px] font-body text-sm font-medium transition-all duration-200 ${
                      selectedTime === slot
                        ? 'bg-gold text-white shadow-md'
                        : 'bg-white border border-champagne-border text-espresso hover:border-gold/40'
                    }`}
                  >
                    {slot}
                  </button>
                ))}
              </div>
            </div>
          ))}
        </div>
      </div>
    );
  }

  // ──────────── Step 4: Client Details ────────────
  function StepDetails() {
    return (
      <div className="space-y-6">
        {/* Full Name */}
        <div>
          <label className="flex items-center gap-2 font-body font-semibold text-espresso text-sm mb-2">
            <User className="w-4 h-4 text-gold" /> Full Name
          </label>
          {errors.name && (
            <p className="text-red-500 text-sm font-body mb-1 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" /> {errors.name}
            </p>
          )}
          <input
            type="text"
            placeholder="Your full name"
            value={clientName}
            onChange={(e) => setClientName(e.target.value)}
            className="w-full rounded-xl border border-champagne-border px-4 py-3 font-body text-espresso focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition-all"
          />
        </div>

        {/* WhatsApp Number */}
        <div>
          <label className="flex items-center gap-2 font-body font-semibold text-espresso text-sm mb-2">
            <Phone className="w-4 h-4 text-gold" /> WhatsApp Number
          </label>
          {errors.phone && (
            <p className="text-red-500 text-sm font-body mb-1 flex items-center gap-1">
              <AlertCircle className="w-4 h-4" /> {errors.phone}
            </p>
          )}
          <div className="flex">
            <span className="inline-flex items-center px-4 rounded-l-xl border border-r-0 border-champagne-border bg-silk font-body text-taupe text-sm">
              +91
            </span>
            <input
              type="tel"
              placeholder="98765 43210"
              maxLength={10}
              value={clientPhone}
              onChange={(e) => setClientPhone(e.target.value.replace(/\D/g, ''))}
              className="w-full rounded-r-xl border border-champagne-border px-4 py-3 font-body text-espresso focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition-all"
            />
          </div>
        </div>

        {/* Event Venue / Notes */}
        <div>
          <label className="flex items-center gap-2 font-body font-semibold text-espresso text-sm mb-2">
            <MessageSquare className="w-4 h-4 text-gold" /> Event Venue / Notes{' '}
            <span className="font-normal text-taupe">(optional)</span>
          </label>
          <textarea
            placeholder="Any venue details, special requests, or notes…"
            rows={3}
            value={clientNotes}
            onChange={(e) => setClientNotes(e.target.value)}
            className="w-full rounded-xl border border-champagne-border px-4 py-3 font-body text-espresso focus:border-gold focus:ring-2 focus:ring-gold/20 outline-none transition-all resize-none"
          />
        </div>

        {/* Summary Preview */}
        <div className="bg-silk rounded-xl p-4 border border-champagne-border">
          <p className="font-body text-sm text-taupe mb-2">Booking Summary</p>
          <div className="space-y-1 font-body text-sm text-espresso">
            <p>
              <span className="text-taupe">Services:</span> {selectedServiceDetails.length} selected
            </p>
            <p>
              <span className="text-taupe">Artist:</span>{' '}
              {artists.find((a) => a.id === selectedArtist)?.name || '—'}
            </p>
            <p>
              <span className="text-taupe">Occasion:</span> {selectedOccasion || '—'}
            </p>
            <p>
              <span className="text-taupe">Date:</span>{' '}
              {selectedDate
                ? new Date(selectedDate + 'T00:00:00').toLocaleDateString('en-IN', {
                    weekday: 'short',
                    day: 'numeric',
                    month: 'long',
                    year: 'numeric',
                  })
                : '—'}
            </p>
            <p>
              <span className="text-taupe">Time:</span> {selectedTime || '—'}
            </p>
          </div>
          <div className="border-t border-champagne-border mt-3 pt-3 flex items-center justify-between">
            <span className="font-body text-sm text-taupe">Total</span>
            <span className="font-heading text-xl font-bold text-gold">₹{formatPrice(totalPrice)}</span>
          </div>
        </div>
      </div>
    );
  }

  // ──────────── Render ────────────
  const stepContent = [
    <StepServices key="s1" />,
    <StepArtistOccasion key="s2" />,
    <StepDateTime key="s3" />,
    <StepDetails key="s4" />,
  ];

  const canProceedStep0 = selectedServices.length > 0;

  return (
    <section id="booking" className="py-16 md:py-24 px-4 md:px-6 bg-silk">
      <div className="max-w-2xl mx-auto">
        <RevealOnScroll>
          {/* Header */}
          <div className="text-center mb-10">
            <p className="text-gold font-body text-sm tracking-widest uppercase mb-2 flex items-center justify-center gap-2">
              <Sparkles className="w-4 h-4" /> Appointment
            </p>
            <h2 className="font-heading text-3xl md:text-4xl lg:text-5xl text-espresso">
              Book Your <em className="text-gold">Luxury</em> Consultation
            </h2>
          </div>
        </RevealOnScroll>

        <RevealOnScroll delay={100}>
          <div className="bg-white border border-champagne-border rounded-2xl shadow-sm p-5 md:p-8">
            <StepIndicator />

            {/* Step Content */}
            <div className="min-h-[280px]">{stepContent[currentStep]}</div>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8 pt-6 border-t border-champagne-border">
              {currentStep > 0 ? (
                <button
                  onClick={handleBack}
                  className="flex items-center gap-2 font-body font-semibold text-taupe hover:text-espresso transition-colors px-4 py-3 min-h-[48px] rounded-xl"
                >
                  <ChevronLeft className="w-5 h-5" /> Back
                </button>
              ) : (
                <div />
              )}

              {currentStep < 3 ? (
                <button
                  onClick={handleNext}
                  disabled={currentStep === 0 && !canProceedStep0}
                  className="flex items-center gap-2 bg-gold hover:bg-gold-hover disabled:opacity-40 disabled:cursor-not-allowed text-white rounded-xl px-6 py-3 min-h-[48px] font-semibold font-body transition-colors"
                >
                  Continue <ChevronRight className="w-5 h-5" />
                </button>
              ) : (
                <button
                  onClick={handleSubmit}
                  className="flex items-center gap-2 bg-gold hover:bg-gold-hover text-white rounded-xl px-6 py-3 min-h-[48px] font-semibold font-body transition-colors animate-pulse"
                >
                  Confirm &amp; Book via WhatsApp 💬
                </button>
              )}
            </div>
          </div>
        </RevealOnScroll>
      </div>
    </section>
  );
}
