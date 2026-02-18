const nav = document.querySelector('.nav-wrap');
const progress = document.querySelector('.progress-bar');

window.addEventListener('scroll', () => {
  if (nav) nav.classList.toggle('scrolled', window.scrollY > 24);
  if (progress) {
    const h = document.documentElement;
    const scrolled = (h.scrollTop / (h.scrollHeight - h.clientHeight)) * 100;
    progress.style.width = `${scrolled}%`;
  }
});

const reveals = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) entry.target.classList.add('visible');
  });
}, { threshold: 0.2 });
reveals.forEach((el) => observer.observe(el));

const beforeAfter = document.querySelectorAll('.before-after');
beforeAfter.forEach((wrap) => {
  const slider = wrap.querySelector('.slider');
  const after = wrap.querySelector('.after-img');
  if (!slider || !after) return;
  slider.addEventListener('input', (e) => {
    after.style.width = `${e.target.value}%`;
  });
});

const counters = document.querySelectorAll('[data-counter]');
const runCounter = (el) => {
  const target = +el.dataset.counter;
  let value = 0;
  const step = Math.max(1, Math.round(target / 90));
  const timer = setInterval(() => {
    value += step;
    if (value >= target) {
      value = target;
      clearInterval(timer);
    }
    el.textContent = value;
  }, 20);
};

const counterObserver = new IntersectionObserver((entries, obs) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      runCounter(entry.target);
      obs.unobserve(entry.target);
    }
  });
}, { threshold: 0.55 });
counters.forEach((c) => counterObserver.observe(c));

const priceToggle = document.querySelector('#billingToggle');
if (priceToggle) {
  const monthly = document.querySelectorAll('[data-month]');
  priceToggle.addEventListener('change', () => {
    const yearly = priceToggle.checked;
    monthly.forEach((price) => {
      const value = yearly ? price.dataset.year : price.dataset.month;
      price.textContent = `$${value}`;
    });
  });
}

const modal = document.querySelector('.modal');
document.querySelectorAll('[data-open-modal]').forEach((btn) => {
  btn.addEventListener('click', () => {
    if (!modal) return;
    modal.querySelector('h3').textContent = btn.dataset.name;
    modal.querySelector('p').textContent = btn.dataset.bio;
    modal.classList.add('active');
  });
});

document.querySelectorAll('[data-close-modal]').forEach((btn) => {
  btn.addEventListener('click', () => modal?.classList.remove('active'));
});
modal?.addEventListener('click', (e) => {
  if (e.target === modal) modal.classList.remove('active');
});

const lightbox = document.createElement('div');
lightbox.className = 'modal';
lightbox.innerHTML = `<div class="modal-content"><button class="btn secondary" data-close-modal>Close</button><img alt="Gym preview" style="margin-top:1rem;" /></div>`;
document.body.appendChild(lightbox);

document.querySelectorAll('[data-lightbox]').forEach((img) => {
  img.addEventListener('click', () => {
    lightbox.querySelector('img').src = img.src;
    lightbox.classList.add('active');
  });
});
lightbox.addEventListener('click', (e) => {
  if (e.target === lightbox || e.target.matches('[data-close-modal]')) {
    lightbox.classList.remove('active');
  }
});
