// =============================
// Portfolio JavaScript — Neeraj Kumar
// =============================

// === Mobile Navigation Toggle ===
const hamb = document.getElementById('hamb');
const navlinks = document.querySelector('.navlinks');

if (hamb && navlinks) {
  hamb.addEventListener('click', () => {
    navlinks.style.display = navlinks.style.display === 'flex' ? 'none' : 'flex';
    navlinks.style.flexDirection = 'column';
    navlinks.style.position = 'absolute';
    navlinks.style.right = '18px';
    navlinks.style.top = '70px';
    navlinks.style.background = 'var(--card)';
    navlinks.style.padding = '12px';
    navlinks.style.borderRadius = '10px';
  });
}

// === Smooth Scroll with Header Offset ===
document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', function (e) {
    if (this.getAttribute('href') === '#') return;
    const id = this.getAttribute('href');
    const el = document.querySelector(id);
    if (!el) return;
    e.preventDefault();
    const y = el.getBoundingClientRect().top + window.scrollY - 72;
    window.scrollTo({ top: y, behavior: 'smooth' });
  });
});

// === WhatsApp Form Integration ===
// Sends form data as a WhatsApp message instead of traditional submission
function sendWhatsApp(e) {
  e.preventDefault();

  // === CONFIGURATION ===
  // Use international format without + or spaces (India example: +91 7878770940 -> 917878770940)
  const phoneNumber = '917878770940'; // <-- Change to your own WhatsApp number if needed

  // === Fetch input values ===
  const name = (document.getElementById('wa_name') || {}).value?.trim() || '';
  const email = (document.getElementById('wa_email') || {}).value?.trim() || '';
  const subject = (document.getElementById('wa_subject') || {}).value?.trim() || '';
  const message = (document.getElementById('wa_message') || {}).value?.trim() || '';

  if (!name || !email || !message) {
    alert('Please fill your name, email, and message before sending.');
    return false;
  }

  // === Construct WhatsApp message ===
  const lines = [
    `*New message from portfolio contact form*`,
    `Name: ${name}`,
    `Email: ${email}`,
    subject ? `Subject: ${subject}` : null,
    `Message:`,
    message
  ].filter(Boolean);

  const fullText = lines.join('\n\n');
  const encodedText = encodeURIComponent(fullText);

  // === Build WhatsApp URL ===
  const waUrl = `https://wa.me/${phoneNumber}?text=${encodedText}`;
  const fallbackUrl = `https://api.whatsapp.com/send?phone=${phoneNumber}&text=${encodedText}`;

  // === Open WhatsApp ===
  try {
    const win = window.open(waUrl, '_blank', 'noopener,noreferrer');
    if (!win) {
      // Popup blocked — use fallback
      window.location.href = fallbackUrl;
    }
  } catch (err) {
    window.location.href = fallbackUrl;
  }

  // Reset form
  e.target.reset();
  return false;
}

// === Fade-Up Animation Delay ===
document.querySelectorAll('.fade-up').forEach((el, i) => {
  el.style.animationDelay = (i * 80) + 'ms';
});
