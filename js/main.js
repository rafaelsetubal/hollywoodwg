/**
 * HOLLYWOOD WG BARBEARIA — Main Interactive Script
 * Phase 01 + Phase 02 + Phase 03: Preloader, Fixed Header, Service Menu & Team Carousel
 */

document.addEventListener('DOMContentLoaded', () => {
  /* ==================================================
     00. CINEMATIC BRAND PRELOADER
     ================================================== */
  const preloader = document.getElementById('preloader');
  if (preloader) {
    const dismissPreloader = () => {
      preloader.classList.add('is-loaded');
      setTimeout(() => {
        preloader.style.display = 'none';
      }, 900);
    };

    setTimeout(dismissPreloader, 1600);
  }

  /* ==================================================
     01. FIXED HEADER SCROLL STATE & MOBILE NAVIGATION
     ================================================== */
  const siteHeader = document.getElementById('site-header');
  const navToggle = document.getElementById('nav-toggle');
  const mainNav = document.getElementById('main-nav');
  const navLinks = document.querySelectorAll('.nav__link');

  // Sticky/Scrolled Header Background
  if (siteHeader) {
    const handleScroll = () => {
      if (window.scrollY > 40) {
        siteHeader.classList.add('is-scrolled');
      } else {
        siteHeader.classList.remove('is-scrolled');
      }
    };
    window.addEventListener('scroll', handleScroll, { passive: true });
    handleScroll();
  }

  // Mobile Drawer Toggle
  if (navToggle && mainNav) {
    navToggle.addEventListener('click', () => {
      const isOpen = mainNav.classList.toggle('is-open');
      navToggle.classList.toggle('is-active');
      navToggle.setAttribute('aria-expanded', String(isOpen));
      document.body.style.overflow = isOpen ? 'hidden' : '';
    });

    navLinks.forEach(link => {
      link.addEventListener('click', () => {
        if (mainNav.classList.contains('is-open')) {
          mainNav.classList.remove('is-open');
          navToggle.classList.remove('is-active');
          navToggle.setAttribute('aria-expanded', 'false');
          document.body.style.overflow = '';
        }
      });
    });

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && mainNav.classList.contains('is-open')) {
        mainNav.classList.remove('is-open');
        navToggle.classList.remove('is-active');
        navToggle.setAttribute('aria-expanded', 'false');
        document.body.style.overflow = '';
      }
    });
  }

  // Scrollspy: Automatically update active navigation link as user scrolls
  const observedSections = document.querySelectorAll('section[id]');
  if ('IntersectionObserver' in window && observedSections.length > 0) {
    const scrollspyObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const currentId = entry.target.getAttribute('id');
          navLinks.forEach(link => {
            const href = link.getAttribute('href');
            if (href === `#${currentId}`) {
              navLinks.forEach(l => l.classList.remove('nav__link--active'));
              link.classList.add('nav__link--active');
            }
          });
        }
      });
    }, {
      rootMargin: '-20% 0px -55% 0px'
    });

    observedSections.forEach(sec => scrollspyObserver.observe(sec));
  }

  /* ==================================================
     02. EDITORIAL SERVICE MENU HOVER REVEAL
     ================================================== */
  const serviceRows = document.querySelectorAll('.service-row');
  const imgLayers = document.querySelectorAll('.services-visual__img-layer');

  if (serviceRows.length > 0 && imgLayers.length > 0) {
    const activateService = (serviceId) => {
      serviceRows.forEach(row => {
        const isCurrent = row.getAttribute('data-service') === serviceId;
        row.classList.toggle('is-active', isCurrent);
      });

      imgLayers.forEach(layer => {
        const targetId = `preview-${serviceId}`;
        const isCurrent = layer.id === targetId;
        layer.classList.toggle('is-active', isCurrent);
      });
    };

    serviceRows.forEach(row => {
      const serviceId = row.getAttribute('data-service');
      
      row.addEventListener('mouseenter', () => {
        if (serviceId) activateService(serviceId);
      });

      row.addEventListener('focus', () => {
        if (serviceId) activateService(serviceId);
      });

      row.addEventListener('click', () => {
        if (serviceId) activateService(serviceId);
      });
    });
  }

  /* ==================================================
     03. TEAM SECTION (DATA ARCHITECTURE & MOBILE CAROUSEL)
     ================================================== */
  const BARBERS_CONFIG = [
    {
      id: 'barber-1',
      name: 'Israel Souza',
      handle: '@rael_barber__',
      instagram: 'https://www.instagram.com/rael_barber__/',
      image: 'assets/images/barbers/rael.png'
    },
    {
      id: 'barber-2',
      name: 'Gaguinho Do Corte',
      handle: '@gaguinho_do_corteofc',
      instagram: 'https://www.instagram.com/gaguinho_do_corteofc/',
      image: 'assets/images/barbers/gago.png'
    }
  ];

  const teamGrid = document.getElementById('team-grid');
  const teamPrev = document.getElementById('team-prev');
  const teamNext = document.getElementById('team-next');

  if (teamGrid && teamPrev && teamNext) {
    teamPrev.addEventListener('click', () => {
      const cardWidth = teamGrid.querySelector('.team-card')?.offsetWidth || 200;
      teamGrid.scrollBy({ left: -(cardWidth + 16), behavior: 'smooth' });
    });

    teamNext.addEventListener('click', () => {
      const cardWidth = teamGrid.querySelector('.team-card')?.offsetWidth || 200;
      teamGrid.scrollBy({ left: (cardWidth + 16), behavior: 'smooth' });
    });
  }

  // Mobile Tap / Click photo switcher
  const teamCards = document.querySelectorAll('.team-card');
  teamCards.forEach(card => {
    card.addEventListener('click', (e) => {
      if (e.target.closest('.team-card__instagram')) return;
      const isActive = card.classList.contains('is-active');
      teamCards.forEach(c => c.classList.remove('is-active'));
      if (!isActive) {
        card.classList.add('is-active');
      }
    });
  });

  document.addEventListener('click', (e) => {
    if (!e.target.closest('.team-card')) {
      teamCards.forEach(c => c.classList.remove('is-active'));
    }
  });

  /* ==================================================
     04. INSTAGRAM SECTION MEDIA DATA & CURATION
     ================================================== */
  const INSTAGRAM_CONFIG = {
    profileUrl: 'https://www.instagram.com/hollywood_wg_barbearia/',
    media: [
      { id: 'ig-1', type: 'image', role: 'featured', label: '16.webp (Fade Close-up)', ratio: '4:5', src: 'assets/images/insta/16.webp', alt: 'Fade de alta precisão' },
      { id: 'ig-2', type: 'video', role: 'reel', label: '6.mp4 (Vídeo de Corte)', ratio: '9:16', src: 'assets/images/insta/6.mp4' },
      { id: 'ig-9', type: 'image', role: 'detail', label: '1.jpg (Detalhe de Acabamento)', ratio: '4:5', src: 'assets/images/insta/1.jpg', alt: 'Detalhe de acabamento e barba' },
      { id: 'ig-3', type: 'video', role: 'hero-reel', label: '5.mp4 (Barbeiro Trabalhando)', ratio: '9:16', src: 'assets/images/insta/5.mp4' },
      { id: 'ig-4', type: 'image', role: 'community', label: '14.jpg (Equipe + Cliente)', ratio: '4:5', src: 'assets/images/insta/14.jpg', alt: 'Equipe e cliente na barbearia' },
      { id: 'ig-10', type: 'video', role: 'detail-reel', label: '9.mp4 (Fade e Técnica)', ratio: '9:16', src: 'assets/images/insta/9.mp4' },
      { id: 'ig-5', type: 'image', role: 'craft', label: '2.jpg (Barbeiro + Cliente)', ratio: '4:5', src: 'assets/images/insta/2.jpg', alt: 'Atendimento personalizado' },
      { id: 'ig-6', type: 'image', role: 'team', label: '15.webp (Foto de Equipe)', ratio: '4:5', src: 'assets/images/insta/15.webp', alt: 'Equipe de mestres Hollywood WG' },
      { id: 'ig-11', type: 'video', role: 'craft-reel', label: '10.mp4 (Precisão de Navalha)', ratio: '9:16', src: 'assets/images/insta/10.mp4' },
      { id: 'ig-7', type: 'image', role: 'result', label: '7.jpg (Resultado de Corte)', ratio: '4:5', src: 'assets/images/insta/7.jpg', alt: 'Acabamento e corte impecável' },
      { id: 'ig-8', type: 'image', role: 'lifestyle', label: '4.jpg (Cliente / Resultado)', ratio: '4:5', src: 'assets/images/insta/4.jpg', alt: 'Estilo e disciplina' },
      { id: 'ig-12', type: 'image', role: 'detail', label: '8.jpg (Textura e Finalização)', ratio: '4:5', src: 'assets/images/insta/8.jpg', alt: 'Detalhes de textura e alinhamento' }
    ]
  };

  // Performance Optimization: Play videos only when in viewport
  const igVideos = document.querySelectorAll('.instagram-card video');
  if ('IntersectionObserver' in window && igVideos.length > 0) {
    const videoObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        const video = entry.target;
        if (entry.isIntersecting) {
          const playPromise = video.play();
          if (playPromise !== undefined) {
            playPromise.catch(() => {
              // Autoplay policy fallback
            });
          }
        } else {
          video.pause();
        }
      });
    }, { threshold: 0.25 });

    igVideos.forEach(video => videoObserver.observe(video));
  }

  /* ==================================================
     05. PRODUCTS SECTION (DATA ARCHITECTURE & CAROUSEL)
     ================================================== */
  const PRODUCTS_CONFIG = [
    {
      id: 'prod-1',
      name: 'MINOXIDIL 5% (60ML)',
      price: 'R$ 50,00',
      image: 'assets/images/products/minoxidil-kirkland-60ml.png',
      alt: 'Minoxidil 5% Kirkland 60ml — 1 Mês',
      status: 'available',
      whatsappMessage: 'Olá! Tenho interesse em comprar o Minoxidil 5% Kirkland (60ml) por R$ 50,00 na Hollywood WG Barbearia. Ainda está disponível?'
    },
    {
      id: 'prod-2',
      name: 'PRODUTO 02',
      price: 'R$ --',
      image: null,
      alt: 'Produto em breve',
      status: 'placeholder'
    },
    {
      id: 'prod-3',
      name: 'PRODUTO 03',
      price: 'R$ --',
      image: null,
      alt: 'Produto em breve',
      status: 'placeholder'
    }
  ];

  const productsGallery = document.getElementById('products-gallery');
  const prodPrev = document.getElementById('prod-prev');
  const prodNext = document.getElementById('prod-next');
  const prodCounterCurrent = document.getElementById('prod-counter-current');
  const prodCounterTotal = document.getElementById('prod-counter-total');
  const productCards = document.querySelectorAll('.product-card');

  if (productsGallery && prodPrev && prodNext) {
    let currentIndex = 0;
    const totalProducts = productCards.length;

    if (prodCounterTotal) {
      prodCounterTotal.textContent = String(totalProducts).padStart(2, '0');
    }

    const updateCounter = (index) => {
      if (prodCounterCurrent) {
        prodCounterCurrent.textContent = String(index + 1).padStart(2, '0');
      }
    };

    const scrollToProduct = (index) => {
      if (index < 0) index = 0;
      if (index >= totalProducts) index = totalProducts - 1;
      currentIndex = index;
      
      const card = productCards[currentIndex];
      if (card) {
        const cardLeft = card.offsetLeft;
        const galleryPadding = parseInt(window.getComputedStyle(productsGallery).paddingLeft, 10) || 0;
        productsGallery.scrollTo({
          left: cardLeft - galleryPadding,
          behavior: 'smooth'
        });
      }
      updateCounter(currentIndex);
    };

    prodPrev.addEventListener('click', () => {
      const newIndex = currentIndex > 0 ? currentIndex - 1 : totalProducts - 1;
      scrollToProduct(newIndex);
    });

    prodNext.addEventListener('click', () => {
      const newIndex = currentIndex < totalProducts - 1 ? currentIndex + 1 : 0;
      scrollToProduct(newIndex);
    });

    // Mobile swipe/scroll observer to update counter
    let scrollTimeout;
    productsGallery.addEventListener('scroll', () => {
      clearTimeout(scrollTimeout);
      scrollTimeout = setTimeout(() => {
        const scrollLeft = productsGallery.scrollLeft;
        const galleryCenter = scrollLeft + (productsGallery.offsetWidth / 2);
        
        let closestIndex = 0;
        let minDistance = Infinity;

        productCards.forEach((card, idx) => {
          const cardCenter = card.offsetLeft + (card.offsetWidth / 2);
          const distance = Math.abs(galleryCenter - cardCenter);
          if (distance < minDistance) {
            minDistance = distance;
            closestIndex = idx;
          }
        });

        currentIndex = closestIndex;
        updateCounter(currentIndex);
      }, 60);
    }, { passive: true });
  }

  /* ==================================================
     06. LOCATION MAP LIVE INTERACTIVE (LEAFLET + CARTO DARK)
     ================================================== */
  const locationMapContainer = document.getElementById('location-map-container');
  const locationMapStatic = document.getElementById('location-map-static');
  const locationMapInteractive = document.getElementById('location-map-interactive');
  const locationMapClose = document.getElementById('location-map-close');
  let leafletMapInstance = null;

  if (locationMapContainer && locationMapStatic) {
    const initLeafletMap = () => {
      if (leafletMapInstance || typeof L === 'undefined') return;

      const UNIT_COORDS = [-14.7740333, -39.2653535]; // R. Santa Rita, 255 - Fátima, Itabuna - BA

      leafletMapInstance = L.map('leaflet-map', {
        center: UNIT_COORDS,
        zoom: 17,
        zoomControl: true,
        attributionControl: false
      });

      // OpenStreetMap Tiles (100% Free / No API Key required / No Watermark)
      L.tileLayer('https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png', {
        subdomains: 'abc',
        maxZoom: 19
      }).addTo(leafletMapInstance);

      // Gold Custom Marker Icon
      const goldIcon = L.divIcon({
        className: 'leaflet-gold-marker',
        html: `
          <div class="leaflet-marker-badge">
            <span class="leaflet-marker-dot"></span>
            <span class="leaflet-marker-title">HOLLYWOOD WG</span>
          </div>
          <svg class="leaflet-marker-svg" viewBox="0 0 32 38" fill="none">
            <path d="M16 0C7.163 0 0 7.163 0 16c0 12 16 22 16 22s16-10 16-22c0-8.837-7.163-16-16-16z" fill="#D4AF37"/>
            <circle cx="16" cy="15" r="6" fill="#050505"/>
          </svg>
        `,
        iconSize: [120, 60],
        iconAnchor: [60, 60]
      });

      const marker = L.marker(UNIT_COORDS, { icon: goldIcon }).addTo(leafletMapInstance);
      marker.bindPopup(`
        <div style="font-family: inherit; font-size: 13px; line-height: 1.4; color: #FFFFFF; padding: 2px;">
          <strong style="color: #D4AF37; font-size: 14px; display: block; margin-bottom: 2px;">Hollywood WG Barbearia</strong>
          R. Santa Rita, 255 — Fátima, Itabuna - BA
        </div>
      `);
    };

    const activateInteractiveMap = () => {
      locationMapContainer.classList.add('is-interactive');
      if (locationMapInteractive) {
        locationMapInteractive.setAttribute('aria-hidden', 'false');
      }
      initLeafletMap();
      if (leafletMapInstance) {
        setTimeout(() => {
          leafletMapInstance.invalidateSize();
        }, 150);
      }
    };

    const deactivateInteractiveMap = () => {
      locationMapContainer.classList.remove('is-interactive');
      if (locationMapInteractive) {
        locationMapInteractive.setAttribute('aria-hidden', 'true');
      }
    };

    locationMapStatic.addEventListener('click', activateInteractiveMap);
    locationMapStatic.addEventListener('keydown', (e) => {
      if (e.key === 'Enter' || e.key === ' ') {
        e.preventDefault();
        activateInteractiveMap();
      }
    });

    if (locationMapClose) {
      locationMapClose.addEventListener('click', (e) => {
        e.stopPropagation();
        deactivateInteractiveMap();
      });
    }
  }

  /* ==================================================
     07. EDITORIAL TEXT ENTRANCE ANIMATION (WORD BY WORD)
     Sequence: Transparência / Blur -> Dourado/Amarelo -> Cor Oficial
     ================================================== */
  const titleSelectors = [
    '.services-header__title',
    '.services-header__subtitle',
    '.team-header__title',
    '.team-header__subtitle',
    '.instagram-header__title',
    '.instagram-header__subtitle',
    '.products-header__title',
    '.products-header__subtitle',
    '.location-header__title',
    '.location-header__subtitle',
    '.hero-subtitle',
    '.hero-description'
  ];

  titleSelectors.forEach(selector => {
    const headings = document.querySelectorAll(selector);
    headings.forEach(heading => {
      if (heading.getAttribute('data-words-prepared')) return;
      heading.setAttribute('data-words-prepared', 'true');
      heading.classList.add('reveal-text');

      const originalText = heading.textContent.trim();
      const words = originalText.split(/\s+/);
      
      heading.innerHTML = words.map((word, idx) => `
        <span class="word-wrap">
          <span class="word-inner" style="--w-delay: ${idx * 140}ms">${word}</span>
        </span>
      `).join(' ');
    });
  });

  // IntersectionObserver to trigger the reveal when titles scroll into view
  const revealElements = document.querySelectorAll('.reveal-text, .headline-display');
  if ('IntersectionObserver' in window && revealElements.length > 0) {
    const textRevealObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          textRevealObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.15,
      rootMargin: '0px 0px -40px 0px'
    });

    revealElements.forEach(el => textRevealObserver.observe(el));
  }

  /* ==================================================
     08. LIGHTWEIGHT SMOOTH ANCHOR SCROLL
     ================================================== */
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href');
      if (targetId === '#' || targetId === '' || targetId === '#agendar' || this.classList.contains('js-open-booking-modal')) return;
      const targetElement = document.querySelector(targetId);
      if (targetElement) {
        e.preventDefault();
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start'
        });
      }
    });
  });

  /* ==================================================
     09. SCROLL REVEAL FOR MEDIA & VISUAL ELEMENTS
     (Blur + Subtle Scale + Fluid Fade-in)
     ================================================== */
  const mediaSelectors = [
    '.hero__visual',
    '.services-visual',
    '.team-card',
    '.instagram-card',
    '.product-card',
    '.location-map-container'
  ];

  const mediaElements = document.querySelectorAll(mediaSelectors.join(', '));
  mediaElements.forEach((el, idx) => {
    el.classList.add('scroll-reveal-media');
    el.style.transitionDelay = `${(idx % 4) * 80}ms`;
  });

  if ('IntersectionObserver' in window && mediaElements.length > 0) {
    const mediaObserver = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('is-revealed');
          mediaObserver.unobserve(entry.target);
        }
      });
    }, {
      threshold: 0.1,
      rootMargin: '0px 0px -30px 0px'
    });

    mediaElements.forEach(el => mediaObserver.observe(el));
  }

  /* ==================================================
     10. DIRECT BOOKING MODAL CONTROLLER (SELEÇÃO DE BARBEIRO)
     ================================================== */
  const bookingModal = document.getElementById('booking-modal');
  const bookingModalClose = document.getElementById('booking-modal-close');
  const bookingModalBackdrop = document.getElementById('booking-modal-backdrop');
  const openBookingBtns = document.querySelectorAll('.js-open-booking-modal');

  if (bookingModal) {
    const openModal = (e) => {
      if (e) e.preventDefault();
      // If mobile drawer was open, close it smoothly
      if (mainNav && mainNav.classList.contains('is-open')) {
        mainNav.classList.remove('is-open');
        if (navToggle) {
          navToggle.classList.remove('is-active');
          navToggle.setAttribute('aria-expanded', 'false');
        }
      }
      bookingModal.classList.add('is-open');
      bookingModal.setAttribute('aria-hidden', 'false');
      document.body.style.overflow = 'hidden';
    };

    const closeModal = () => {
      bookingModal.classList.remove('is-open');
      bookingModal.setAttribute('aria-hidden', 'true');
      document.body.style.overflow = '';
    };

    openBookingBtns.forEach(btn => {
      btn.addEventListener('click', openModal);
    });

    if (bookingModalClose) {
      bookingModalClose.addEventListener('click', closeModal);
    }

    if (bookingModalBackdrop) {
      bookingModalBackdrop.addEventListener('click', closeModal);
    }

    document.addEventListener('keydown', (e) => {
      if (e.key === 'Escape' && bookingModal.classList.contains('is-open')) {
        closeModal();
      }
    });

    // Close modal after selecting a barber
    const barberLinks = bookingModal.querySelectorAll('.booking-barber-item__btn, a[href*="wa.me"]');
    barberLinks.forEach(link => {
      link.addEventListener('click', () => {
        setTimeout(closeModal, 300);
      });
    });
  }
});
