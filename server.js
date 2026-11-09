import express from 'express';
import cors from 'cors';

const app = express();
const PORT = process.env.PORT || 3001;

app.use(cors());
app.use(express.json());

// In-memory store
const appointments = [];

// --- Services Endpoint ---
app.get('/api/services', (req, res) => {
  res.json({
    success: true,
    data: [
      { id: 'bridal-hd-signature', name: 'Signature HD Bridal Makeup by Muskaan Ma\'am', price: 14999, duration: 180, category: 'Bridal & Reception' },
      { id: 'bridal-airbrush', name: 'Ultra-HD Airbrush Bridal Makeup', price: 18999, duration: 180, category: 'Bridal & Reception' },
      { id: 'reception-glam', name: 'Royal Reception Glam Makeover', price: 9999, duration: 150, category: 'Bridal & Reception' },
      { id: 'ring-ceremony', name: 'Ring Ceremony / Engagement Signature Look', price: 6999, duration: 120, category: 'Engagement & Party' },
      { id: 'party-makeup', name: 'Luxury Party Makeup by Swati Ma\'am', price: 2999, duration: 90, category: 'Engagement & Party' },
      { id: 'natural-makeup', name: 'Natural / No-Makeup Flawless Skin Makeover', price: 3499, duration: 90, category: 'Engagement & Party' },
      { id: 'haldi-mehndi', name: 'Wedding Shower / Haldi & Mehndi Day Glam', price: 3999, duration: 90, category: 'Engagement & Party' },
      { id: 'nanoplastia', name: 'Imported Nanoplastia Hair Treatment', price: 5999, duration: 180, category: 'Hair & Nanoplastia' },
      { id: 'keratin-botox', name: 'Keratin & Hair Botox Deep Reconstruction', price: 4499, duration: 150, category: 'Hair & Nanoplastia' },
      { id: 'bridal-hairdo', name: 'Bridal Couture Hairdo & Real Floral Accessories Styling', price: 1999, duration: 60, category: 'Hair & Nanoplastia' },
      { id: 'nail-extensions', name: 'Luxury Acrylic / Gel Nail Extensions with 3D Bridal Nail Art', price: 1999, duration: 90, category: 'Nails & Mehndi' },
      { id: 'french-ombre-nails', name: 'French Ombre & Chrome Press-On / Gel Overlay Nails', price: 1299, duration: 60, category: 'Nails & Mehndi' },
      { id: 'bridal-mehndi', name: 'Designer Bridal Mehndi Package', price: 4100, duration: 180, category: 'Nails & Mehndi' },
      { id: 'pre-bridal-package', name: 'Complete Royal Pre-Bridal Package (4 Sittings)', price: 11999, duration: 'Multi-Session', category: 'Pre-Bridal & Skin' },
      { id: 'hydrafacial', name: 'Korean Glass-Skin HydraFacial & Acne-Scar Clarifying Ritual', price: 2499, duration: 75, category: 'Pre-Bridal & Skin' },
    ],
  });
});

// --- Reviews Endpoint ---
app.get('/api/reviews', (req, res) => {
  res.json({
    success: true,
    stats: { average: 4.5, total: 418 },
    data: [
      { id: 1, name: 'Shalini Jawaliya', rating: 5, text: 'Thank you from the bottom of my heart! I felt absolutely stunning on my wedding day...', tags: ['Bridal Makeup'] },
      { id: 2, name: 'Sunil Kumar', rating: 5, text: 'I was worried because of my acne marks, but the team did an amazing job...', tags: ['Natural Makeup', 'Bridal Makeup'] },
    ],
  });
});

// --- Appointments Endpoint ---
app.post('/api/appointments', (req, res) => {
  const { name, phone, services: selectedServices, artist, occasion, date, time, notes, skinNote } = req.body;

  // Validation
  if (!name || !phone || !selectedServices?.length || !date || !time) {
    return res.status(400).json({
      success: false,
      message: 'Please fill in all required fields.',
    });
  }

  // Validate phone
  const phoneClean = phone.replace(/\D/g, '');
  if (phoneClean.length !== 10) {
    return res.status(400).json({
      success: false,
      message: 'Please enter a valid 10-digit phone number.',
    });
  }

  const year = new Date().getFullYear();
  const refId = `MLS-${year}-${String(appointments.length + 1001).padStart(4, '0')}`;

  const appointment = {
    id: refId,
    name,
    phone: phoneClean,
    services: selectedServices,
    artist: artist || 'Any Available',
    occasion: occasion || 'Not specified',
    date,
    time,
    notes: notes || '',
    skinNote: skinNote || false,
    createdAt: new Date().toISOString(),
  };

  appointments.push(appointment);

  res.status(201).json({
    success: true,
    message: 'Appointment booked successfully!',
    data: appointment,
  });
});

app.get('/api/appointments', (req, res) => {
  res.json({ success: true, data: appointments });
});

app.listen(PORT, () => {
  console.log(`✨ Muskaan Luxury Salon API running on http://localhost:${PORT}`);
});
