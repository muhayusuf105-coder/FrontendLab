const cursor = document.querySelector('.cursor');
const follower = document.querySelector('.cursor-follower');
let mouseX = 0, mouseY = 0, followerX = 0, followerY = 0;

document.addEventListener('mousemove', (e) => {
  mouseX = e.clientX;
  mouseY = e.clientY;
  cursor.style.left = mouseX + 'px';
  cursor.style.top  = mouseY + 'px';
});

function animateFollower() {
  followerX += (mouseX - followerX) * 0.12;
  followerY += (mouseY - followerY) * 0.12;
  follower.style.left = followerX + 'px';
  follower.style.top  = followerY + 'px';
  requestAnimationFrame(animateFollower);
}
animateFollower();

document.querySelectorAll('a, .card, button').forEach(el => {
  el.addEventListener('mouseenter', () => { cursor.classList.add('active'); follower.classList.add('active'); });
  el.addEventListener('mouseleave', () => { cursor.classList.remove('active'); follower.classList.remove('active'); });
});

const burger = document.getElementById('burger');
const mobileMenu = document.getElementById('mobileMenu');
const overlay = document.createElement('div');
overlay.className = 'overlay';
document.body.appendChild(overlay);

function toggleMenu() {
  burger.classList.toggle('open');
  mobileMenu.classList.toggle('open');
  overlay.classList.toggle('open');
}

burger.addEventListener('click', toggleMenu);
overlay.addEventListener('click', toggleMenu);
document.querySelectorAll('.mm-link').forEach(link => {
  link.addEventListener('click', toggleMenu);
});

function countUp(el) {
  const target = parseInt(el.dataset.count);
  const duration = 1800;
  const start = performance.now();
  function step(now) {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    el.textContent = Math.floor(eased * target);
    if (progress < 1) requestAnimationFrame(step);
    else el.textContent = target;
  }
  requestAnimationFrame(step);
}

const statNums = document.querySelectorAll('.stat-num');
let counted = false;
new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting && !counted) {
      counted = true;
      statNums.forEach(el => countUp(el));
    }
  });
}, { threshold: 0.5 }).observe(statNums[0]);

const cards = document.querySelectorAll('.card');
new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const idx = parseInt(entry.target.dataset.index) || 1;
      setTimeout(() => entry.target.classList.add('visible'), (idx % 4) * 80);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -60px 0px' }).observe(document.querySelector('#projectGrid'));

cards.forEach(card => {
  card.addEventListener('mousemove', (e) => {
    const r = card.getBoundingClientRect();
    const x = e.clientX - r.left, y = e.clientY - r.top;
    const glow = card.querySelector('.card-glow');
    if (glow) { glow.style.left = (x - 100) + 'px'; glow.style.top = (y - 100) + 'px'; }
    const cx = r.width / 2, cy = r.height / 2;
    card.style.transform = `perspective(800px) rotateX(${((y-cy)/cy)*3}deg) rotateY(${((x-cx)/cx)*-3}deg)`;
  });
  card.addEventListener('mouseleave', () => { card.style.transform = ''; });
});

const skillFills = document.querySelectorAll('.skill-fill');
new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.width = entry.target.dataset.w + '%';
    }
  });
}, { threshold: 0.3 }).observe(document.querySelector('.skills-grid'));

skillFills.forEach(fill => {
  new IntersectionObserver((entries) => {
    entries.forEach(e => { if (e.isIntersecting) fill.style.width = fill.dataset.w + '%'; });
  }, { threshold: 0.5 }).observe(fill);
});

new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.querySelectorAll('.card').forEach((c, i) => {
        setTimeout(() => c.classList.add('visible'), i * 80);
      });
    }
  });
}, { threshold: 0.05 }).observe(document.querySelector('#projectGrid'));

const orbs = document.querySelectorAll('.orb');
document.addEventListener('mousemove', (e) => {
  const x = (e.clientX / window.innerWidth - 0.5) * 30;
  const y = (e.clientY / window.innerHeight - 0.5) * 20;
  orbs.forEach((orb, i) => {
    orb.style.transform = `translate(${x*(i+1)*.5}px, ${y*(i+1)*.5}px)`;
  });
});

document.querySelectorAll('a[href^="#"]').forEach(a => {
  a.addEventListener('click', (e) => {
    e.preventDefault();
    const t = document.querySelector(a.getAttribute('href'));
    if (t) t.scrollIntoView({ behavior: 'smooth', block: 'start' });
  });
});
