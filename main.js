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
    '#services': ['hizmet', 'keratin', 'botoks', 'botox', 'mamoplastik', 'kesim', 'renk', 'bakım', 'service', 'услуг', 'кератин'],
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
  let text = `Merhaba, 88 Studio Keratin!\n\n`;
  text += `İsim: ${name}\n`;
  if (phone) text += `Telefon: ${phone}\n`;
  if (service) text += `Hizmet: ${service}\n`;
  if (msg) text += `Mesaj: ${msg}`;
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

// Video showcase player
const videoSrcs = ['1.mp4', '2.mp4', '4.mp4'];
let currentVidIndex = 0;
let progressInterval = null;

function switchVideo(index) {
  const mainVideo = document.getElementById('mainVideo');
  if (!mainVideo) return;

  // Reset thumbs
  document.querySelectorAll('.video-thumb').forEach((t, i) => {
    t.classList.toggle('active', i === index);
    document.getElementById('prog' + i).style.width = '0%';
  });

  currentVidIndex = index;
  mainVideo.src = videoSrcs[index];
  mainVideo.play();
  startProgress();
}

function startProgress() {
  clearInterval(progressInterval);
  const mainVideo = document.getElementById('mainVideo');
  if (!mainVideo) return;
  progressInterval = setInterval(() => {
    if (!mainVideo.duration) return;
    const pct = (mainVideo.currentTime / mainVideo.duration) * 100;
    document.getElementById('prog' + currentVidIndex).style.width = pct + '%';
    if (pct >= 99.5) {
      clearInterval(progressInterval);
      const next = (currentVidIndex + 1) % videoSrcs.length;
      switchVideo(next);
    }
  }, 200);
}

document.addEventListener('DOMContentLoaded', () => {
  const mainVideo = document.getElementById('mainVideo');
  if (mainVideo) {
    mainVideo.addEventListener('canplay', () => { mainVideo.play(); startProgress(); }, { once: true });
  }
});

function toggleMute() {
  const v = document.getElementById('mainVideo');
  if (!v) return;
  v.muted = !v.muted;
  document.getElementById('muteIcon').className = v.muted ? 'fa fa-volume-mute' : 'fa fa-volume-up';
}



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
