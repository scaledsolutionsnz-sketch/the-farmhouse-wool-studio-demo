/* The Farmhouse Wool Studio, Marton -- site behaviour */
(function () {
  'use strict';

  var reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  /* ---- Opening animation ------------------------------------------------ */
  var intro = document.getElementById('intro');
  if (intro) {
    var dismiss = function () { intro.classList.add('gone'); };
    window.addEventListener('load', function () {
      window.setTimeout(dismiss, reduced ? 200 : 1500);
    });
    window.setTimeout(dismiss, 3200);
  }

  /* ---- Gmail compose links (built in JS, never in the HTML) ------------- */
  document.querySelectorAll('a[data-gmail]').forEach(function (a) {
    var to = a.getAttribute('data-user') + '@' + a.getAttribute('data-domain');
    a.href = 'https://mail.google.com/mail/?view=cm&fs=1&to=' + encodeURIComponent(to) +
             '&su=' + (a.getAttribute('data-su') || '') +
             '&body=' + (a.getAttribute('data-body') || '');
    a.target = '_blank';
    a.rel = 'noopener';
  });

  /* ---- Nav shadow ------------------------------------------------------- */
  var nav = document.querySelector('.nav');
  if (nav) {
    var onScroll = function () { nav.classList.toggle('stuck', window.scrollY > 8); };
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
  }

  /* ---- Mobile menu ------------------------------------------------------ */
  var burger = document.querySelector('.burger');
  var menu = document.getElementById('mobile-menu');
  if (burger && menu) {
    burger.addEventListener('click', function () {
      var open = menu.classList.toggle('open');
      burger.setAttribute('aria-expanded', open ? 'true' : 'false');
    });
    menu.querySelectorAll('a').forEach(function (a) {
      a.addEventListener('click', function () {
        menu.classList.remove('open');
        burger.setAttribute('aria-expanded', 'false');
      });
    });
  }

  /* ---- Hero slideshow --------------------------------------------------- */
  var slides = document.querySelectorAll('.hero-slides img');
  if (slides.length > 1 && !reduced) {
    var s = 0;
    window.setInterval(function () {
      slides[s].classList.remove('active');
      s = (s + 1) % slides.length;
      slides[s].classList.add('active');
    }, 5500);
  }

  /* ---- Hero rotating review quote --------------------------------------- */
  var quotes = document.querySelectorAll('.hq-slide');
  if (quotes.length > 1 && !reduced) {
    var q = 0;
    window.setInterval(function () {
      quotes[q].classList.remove('on');
      q = (q + 1) % quotes.length;
      quotes[q].classList.add('on');
    }, 6000);
  }

  /* ---- Reveal on scroll -------------------------------------------------- */
  var items = document.querySelectorAll('.rv');
  if (!('IntersectionObserver' in window) || reduced) {
    items.forEach(function (el) { el.classList.add('in'); });
  } else {
    var io = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          var d = parseInt(e.target.getAttribute('data-delay') || '0', 10);
          window.setTimeout(function () { e.target.classList.add('in'); }, d);
          io.unobserve(e.target);
        }
      });
    }, { threshold: 0.12, rootMargin: '0px 0px -60px 0px' });
    items.forEach(function (el) { io.observe(el); });
  }

  /* ---- Current year ------------------------------------------------------ */
  document.querySelectorAll('[data-year]').forEach(function (el) {
    el.textContent = String(new Date().getFullYear());
  });
})();
