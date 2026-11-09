import React from 'react';
import {
  X,
  Check,
  Calendar,
  Clock,
  User,
  Phone,
  Sparkles,
  ExternalLink,
  MessageCircle,
} from 'lucide-react';

export default function BookingModal({ booking, onClose }) {
  if (!booking) return null;

  const {
    refId,
    services = [],
    artist,
    occasion,
    date,
    time,
    name,
    phone,
    notes,
    skinNote,
    totalPrice = 0,
  } = booking;

  // Format price helper
  const formatPrice = (p) => '₹' + Number(p || 0).toLocaleString('en-IN');

  // Build itemized services text
  const servicesText = services
    .map((s, idx) => `  ${idx + 1}. ${s.name} (${formatPrice(s.price)})`)
    .join('\n');

  // Construct URL-encoded WhatsApp message
  const rawWhatsAppMessage = `✨ *MUSKAAN LUXURY SALON — BOOKING TICKET* ✨

📋 *Booking Ref:* ${refId}
👤 *Client Name:* ${name}
📱 *Phone:* +91 ${phone}

👑 *Chosen Artist:* ${artist}
🎉 *Occasion:* ${occasion}
📅 *Date:* ${date}
🕐 *Time Slot:* ${time}

💄 *Selected Services:*
${servicesText}

💰 *Estimated Total:* ${formatPrice(totalPrice)}
${skinNote ? '\n⚠️ *Skin Note:* Special Acne-Mark / Sensitive Skin Coverage Requested' : ''}${notes ? `\n📝 *Client Notes:* ${notes}` : ''}

📍 *Studio Location:* 2C/2994, Shastri Nagar, Saharanpur, UP 247001
✨ Thank you, Muskaan Ma'am! Looking forward to my luxury session.`;

  const whatsappUrl = `https://wa.me/917500702702?text=${encodeURIComponent(rawWhatsAppMessage)}`;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 modal-overlay overflow-y-auto">
      <div 
        className="relative bg-white rounded-3xl max-w-lg w-full p-6 md:p-8 shadow-2xl animate-modal-in max-h-[92vh] overflow-y-auto border border-champagne-border"
        onClick={(e) => e.stopPropagation()}
      >
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-taupe hover:text-espresso rounded-full hover:bg-champagne-blush transition-colors"
          aria-label="Close booking modal"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Celebration Header */}
        <div className="text-center mb-6">
          <div className="w-16 h-16 bg-gold/15 rounded-full flex items-center justify-center mx-auto mb-3 text-gold">
            <Sparkles className="w-8 h-8 animate-pulse-gold text-gold" />
          </div>
          <span className="inline-block px-3 py-1 bg-mauve/10 text-mauve text-xs font-semibold rounded-full mb-2">
            Priority Concierge Booking
          </span>
          <h2 className="font-heading text-2xl md:text-3xl font-bold text-espresso">
            ✨ Booking Confirmed!
          </h2>
          <p className="text-sm text-taupe mt-1">
            Your appointment reservation has been created.
          </p>
          <div className="mt-3 inline-block bg-silk px-4 py-1.5 rounded-lg border border-champagne-border">
            <span className="text-xs text-taupe uppercase tracking-wider block">Reference ID</span>
            <span className="font-mono text-base font-bold text-gold">{refId}</span>
          </div>
        </div>

        {/* Ticket Summary Card */}
        <div className="bg-silk rounded-2xl border border-champagne-border p-4 md:p-5 mb-6 space-y-3.5">
          <div className="flex items-center justify-between pb-3 border-b border-champagne-border">
            <div className="flex items-center gap-2 text-espresso text-sm font-semibold">
              <User className="w-4 h-4 text-gold" />
              <span>{name}</span>
            </div>
            <div className="flex items-center gap-1.5 text-xs text-taupe font-medium">
              <Phone className="w-3.5 h-3.5 text-gold" />
              <span>+91 {phone}</span>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs md:text-sm">
            <div className="flex items-start gap-2">
              <Calendar className="w-4 h-4 text-gold shrink-0 mt-0.5" />
              <div>
                <span className="text-taupe text-[11px] block">Appointment Date</span>
                <span className="font-medium text-espresso">{date}</span>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <Clock className="w-4 h-4 text-gold shrink-0 mt-0.5" />
              <div>
                <span className="text-taupe text-[11px] block">Preferred Time</span>
                <span className="font-medium text-espresso">{time}</span>
              </div>
            </div>
          </div>

          <div className="grid grid-cols-2 gap-3 text-xs md:text-sm pt-2 border-t border-champagne-border/60">
            <div>
              <span className="text-taupe text-[11px] block">Lead Artist</span>
              <span className="font-medium text-espresso">{artist}</span>
            </div>
            <div>
              <span className="text-taupe text-[11px] block">Occasion</span>
              <span className="font-medium text-espresso">{occasion}</span>
            </div>
          </div>

          {skinNote && (
            <div className="bg-white/80 rounded-xl p-2.5 border border-champagne-border text-xs text-mauve flex items-center gap-2">
              <Sparkles className="w-4 h-4 shrink-0 text-mauve" />
              <span>Acne-mark & sensitive skin coverage requested</span>
            </div>
          )}

          {notes && (
            <div className="text-xs text-taupe pt-2 border-t border-champagne-border/60">
              <span className="font-medium text-espresso block mb-0.5">Venue / Notes:</span>
              <p className="italic">{notes}</p>
            </div>
          )}

          {/* Itemized Services */}
          <div className="pt-3 border-t border-champagne-border">
            <span className="text-xs font-semibold text-espresso block mb-2">Itemized Services:</span>
            <ul className="space-y-1.5 text-xs">
              {services.map((srv) => (
                <li key={srv.id} className="flex justify-between items-center text-taupe">
                  <span className="line-clamp-1 pr-2 text-espresso">• {srv.name}</span>
                  <span className="font-medium text-espresso shrink-0">{formatPrice(srv.price)}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Total */}
          <div className="pt-3 border-t-2 border-champagne-border flex justify-between items-center">
            <span className="font-heading font-bold text-base text-espresso">Estimated Total</span>
            <span className="font-heading font-bold text-xl text-gold">{formatPrice(totalPrice)}</span>
          </div>
        </div>

        {/* Actions */}
        <div className="space-y-3">
          <a
            href={whatsappUrl}
            target="_blank"
            rel="noopener noreferrer"
            className="w-full flex items-center justify-center gap-2 bg-[#25D366] hover:bg-[#20ba59] text-white py-3.5 px-6 rounded-xl font-semibold shadow-md transition-all duration-200 transform hover:-translate-y-0.5 min-h-[48px]"
          >
            <MessageCircle className="w-5 h-5" />
            <span>Confirm & Send Ticket on WhatsApp</span>
            <ExternalLink className="w-4 h-4 ml-1 opacity-80" />
          </a>

          <p className="text-[11px] text-center text-taupe">
            Sends pre-formatted ticket straight to Muskaan Ma'am on WhatsApp (+91 75007 02702) for instant booking confirmation.
          </p>

          <button
            type="button"
            onClick={onClose}
            className="w-full py-2.5 text-sm font-medium text-taupe hover:text-espresso rounded-xl hover:bg-champagne-blush/60 transition-colors"
          >
            Done / Close Window
          </button>
        </div>
      </div>
    </div>
  );
}
