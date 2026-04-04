// Navbar scroll effect
window.addEventListener('scroll', () => {
  document.getElementById('navbar').classList.toggle('scrolled', window.scrollY > 40);
});

// Mobile menu
function toggleMenu() {
  document.getElementById('navLinks').classList.toggle('open');
}

// Search bar
function toggleSearch() {
  document.getElementById('searchBar').classList.toggle('open');
  if (document.getElementById('searchBar').classList.contains('open')) {
    document.getElementById('searchInput').focus();
  }
}

function doSearch() {
  const q = document.getElementById('searchInput').value.toLowerCase().trim();
  if (!q) return;
  const sections = ['#services', '#about', '#gallery', '#reviews', '#contact'];
  const keywords = {
    '#services': ['hizmet', 'keratin', 'botoks', 'botox', 'nanoplastika', 'kesim', 'renk', 'bakım', 'service', 'услуг', 'кератин'],
    '#about': ['hakkında', 'stüdyo', 'about', 'studio', 'о нас'],
    '#gallery': ['galeri', 'fotoğraf', 'gallery', 'photo', 'галерея'],
    '#reviews': ['yorum', 'review', 'отзыв'],
    '#contact': ['iletişim', 'contact', 'контакт', 'randevu', 'telefon']
  };
  for (const [sec, keys] of Object.entries(keywords)) {
    if (keys.some(k => q.includes(k))) {
      document.querySelector(sec).scrollIntoView({ behavior: 'smooth' });
      document.getElementById('searchBar').classList.remove('open');
      return;
    }
  }
  document.querySelector('#services').scrollIntoView({ behavior: 'smooth' });
  document.getElementById('searchBar').classList.remove('open');
}

document.getElementById('searchInput').addEventListener('keydown', e => {
  if (e.key === 'Enter') doSearch();
  if (e.key === 'Escape') document.getElementById('searchBar').classList.remove('open');
});

// WhatsApp form send
function sendWA(e) {
  e.preventDefault();
  const name = document.getElementById('fname').value;
  const phone = document.getElementById('fphone').value;
  const service = document.getElementById('fservice').value;
  const msg = document.getElementById('fmsg').value;
  const t = translations[currentLang];

  // Map of label keys for dynamic translation
  const labels = {
    name: currentLang === 'tr' ? 'İsim' : (currentLang === 'ru' ? 'Имя' : 'Name'),
    phone: currentLang === 'tr' ? 'Telefon' : (currentLang === 'ru' ? 'Телефон' : 'Phone'),
    service: currentLang === 'tr' ? 'Hizmet' : (currentLang === 'ru' ? 'Услуга' : 'Service'),
    message: currentLang === 'tr' ? 'Mesaj' : (currentLang === 'ru' ? 'Сообщение' : 'Message')
  };

  let text = `${t['wa_greeting'] || 'Hello!'}\n\n`;
  text += `${labels.name}: ${name}\n`;
  if (phone) text += `${labels.phone}: ${phone}\n`;
  if (service) text += `${labels.service}: ${service}\n`;
  if (msg) text += `${labels.message}: ${msg}`;
  const encoded = encodeURIComponent(text);
  window.open(`https://wa.me/905317285623?text=${encoded}`, '_blank');
}

// Lightbox
function openLightbox(src) {
  document.getElementById('lightboxImg').src = src;
  document.getElementById('lightbox').classList.add('open');
  document.body.style.overflow = 'hidden';
}
function closeLightbox() {
  document.getElementById('lightbox').classList.remove('open');
  document.body.style.overflow = '';
}
document.addEventListener('keydown', e => { if (e.key === 'Escape') closeLightbox(); });

// Gallery image click
document.querySelectorAll('.gallery-item img').forEach(img => {
  img.addEventListener('click', () => openLightbox(img.src));
});

// Premium Gallery
function activateVidCard(el) {
  document.querySelectorAll('.pg-item').forEach(item => {
    item.classList.remove('active');
    const v = item.querySelector('video');
    if (v) v.pause();
  });
  el.classList.add('active');
  const activeVid = el.querySelector('video');
  if (activeVid) activeVid.play();
}



// Video Performance Observer (Play only when visible)
const videoObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    const video = entry.target;
    if (entry.isIntersecting) {
      // In hero or if active in gallery, play
      if (video.closest('.p-slide') || video.closest('.pg-item.active')) {
        video.play().catch(() => {});
      }
    } else {
      video.pause();
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('video').forEach(v => videoObserver.observe(v));

// Animate on scroll
const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.opacity = '1';
      entry.target.style.transform = 'translateY(0)';
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.service-card, .review-card, .gallery-item, .video-placeholder').forEach(el => {
  el.style.opacity = '0';
  el.style.transform = 'translateY(24px)';
  el.style.transition = 'opacity 0.5s ease, transform 0.5s ease';
  observer.observe(el);
});
