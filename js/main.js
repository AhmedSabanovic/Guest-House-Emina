// Mobile menu functions
function openNav(){
  var el = document.getElementById('mySidenav');
  if(el) el.classList.add('is-open');
}
function closeNav(){
  var el = document.getElementById('mySidenav');
  if(el) el.classList.remove('is-open');
}

// Lightbox for gallery images
document.addEventListener('DOMContentLoaded', function(){
  // create lightbox overlay
  var lb = document.createElement('div');
  lb.className = 'lb-overlay';
  lb.innerHTML = `
    <span class="lb-close" aria-label="Close">&times;</span>
    <div class="lb-content">
        <img src="" alt="lightbox image">
        <div class="lb-caption"></div>
    </div>
    <button class="lb-prev" aria-label="Previous">&#10094;</button>
    <button class="lb-next" aria-label="Next">&#10095;</button>
  `;
  document.body.appendChild(lb);
  
  var lbImg = lb.querySelector('img');
  var lbCaption = lb.querySelector('.lb-caption');
  var lbClose = lb.querySelector('.lb-close');
  var lbPrev = lb.querySelector('.lb-prev');
  var lbNext = lb.querySelector('.lb-next');
  
  var currentItems = [];
  var currentIndex = 0;

  function showLightbox(index, items){
    currentItems = items;
    currentIndex = index;
    updateLightbox();
    lb.classList.add('is-active');
    document.body.style.overflow = 'hidden';
  }

  function updateLightbox() {
      var item = currentItems[currentIndex];
      var img = item.querySelector('img');
      var src = img.getAttribute('data-full') || img.src;
      var alt = img.alt;
      
      lbImg.style.opacity = 0;
      setTimeout(() => {
          lbImg.src = src;
          lbImg.alt = alt || '';
          lbCaption.textContent = alt || '';
          lbImg.style.opacity = 1;
      }, 200);
  }

  function hideLightbox(){
    lb.classList.remove('is-active');
    setTimeout(() => {
        lbImg.src = '';
    }, 300);
    document.body.style.overflow = '';
  }

  function nextImage(e) {
      if(e) e.stopPropagation();
      currentIndex = (currentIndex + 1) % currentItems.length;
      updateLightbox();
  }

  function prevImage(e) {
      if(e) e.stopPropagation();
      currentIndex = (currentIndex - 1 + currentItems.length) % currentItems.length;
      updateLightbox();
  }

  lbClose.addEventListener('click', hideLightbox);
  lbPrev.addEventListener('click', prevImage);
  lbNext.addEventListener('click', nextImage);
  
  lb.addEventListener('click', function(e){ 
      if(e.target === lb || e.target.classList.contains('lb-content')) hideLightbox(); 
  });
  
  document.addEventListener('keydown', function(e){ 
      if(!lb.classList.contains('is-active')) return;
      if(e.key === 'Escape') hideLightbox(); 
      if(e.key === 'ArrowRight') nextImage();
      if(e.key === 'ArrowLeft') prevImage();
  });

  // Attach click handlers to gallery items (not just images, to catch the overlay click)
  var galleryItems = document.querySelectorAll('.gallery-item');
  galleryItems.forEach(function(item, index){
    item.addEventListener('click', function(){
      showLightbox(index, Array.from(galleryItems));
    });
  });
});

// Scroll Animation Observer
document.addEventListener('DOMContentLoaded', function() {
    const observerOptions = {
        root: null,
        rootMargin: '0px',
        threshold: 0.1
    };

    const observer = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('is-visible');
                observer.unobserve(entry.target);
            }
        });
    }, observerOptions);

    document.querySelectorAll('.fade-in-section').forEach(section => {
        observer.observe(section);
    });
});

// Parallax Effect for Hero
window.addEventListener('scroll', function() {
    const scrolled = window.pageYOffset;
    const heroBg = document.querySelector('.hero-bg');
    if(heroBg) {
        heroBg.style.transform = 'translateY(' + (scrolled * 0.5) + 'px) scale(1.1)';
    }
});

// 3D Tilt Effect
document.querySelectorAll('.feature-card, .gallery-item').forEach(card => {
    card.addEventListener('mousemove', function(e) {
        const rect = card.getBoundingClientRect();
        const x = e.clientX - rect.left;
        const y = e.clientY - rect.top;
        
        const centerX = rect.width / 2;
        const centerY = rect.height / 2;
        
        const rotateX = ((y - centerY) / centerY) * -5; // Max rotation deg
        const rotateY = ((x - centerX) / centerX) * 5;

        card.style.transform = `perspective(1000px) rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale3d(1.02, 1.02, 1.02)`;
    });

    card.addEventListener('mouseleave', function() {
        card.style.transform = 'perspective(1000px) rotateX(0) rotateY(0) scale3d(1, 1, 1)';
    });
});

// Text Reveal Animation
const revealObserver = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
        }
    });
}, { threshold: 0.1 });

document.querySelectorAll('.reveal-text').forEach(text => {
    // Wrap content in span if not already
    if (!text.querySelector('span')) {
        const content = text.innerText;
        text.innerHTML = `<span>${content}</span>`;
    }
    revealObserver.observe(text);
});
