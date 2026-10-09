// Rene Yao Aldea — small progressive enhancements. No trackers, no dependencies.
(function () {
  'use strict';

  // Header background once the hero is scrolled past the top.
  var header = document.querySelector('[data-header]');
  var onScroll = function () {
    header.classList.toggle('is-scrolled', window.scrollY > 40);
  };
  onScroll();
  window.addEventListener('scroll', onScroll, { passive: true });

  // "You do the math" — age from 22 April 1992.
  var ageBtn = document.querySelector('[data-age]');
  if (ageBtn) {
    ageBtn.addEventListener('click', function () {
      var now = new Date();
      var age = now.getFullYear() - 1992;
      if (now.getMonth() < 3 || (now.getMonth() === 3 && now.getDate() < 22)) age -= 1;
      ageBtn.textContent = String(age);
      ageBtn.classList.add('is-revealed');
    });
  }

  // Screenshot switcher.
  var main = document.querySelector('[data-shot-main]');
  var thumbs = document.querySelectorAll('[data-shot]');
  thumbs.forEach(function (btn) {
    btn.addEventListener('click', function () {
      if (btn.getAttribute('aria-pressed') === 'true') return;
      thumbs.forEach(function (b) { b.setAttribute('aria-pressed', String(b === btn)); });
      main.classList.add('is-swapping');
      var next = new Image();
      next.onload = next.onerror = function () {
        main.src = btn.dataset.shot;
        main.alt = btn.dataset.alt;
        main.classList.remove('is-swapping');
      };
      next.src = btn.dataset.shot;
    });
  });

  // Scroll reveal + active nav link.
  if ('IntersectionObserver' in window) {
    var revealer = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (e.isIntersecting) {
          e.target.classList.add('is-in');
          revealer.unobserve(e.target);
        }
      });
    }, { rootMargin: '0px 0px -10% 0px' });
    document.querySelectorAll('.reveal').forEach(function (el) { revealer.observe(el); });

    var links = document.querySelectorAll('.nav-links a');
    var spy = new IntersectionObserver(function (entries) {
      entries.forEach(function (e) {
        if (!e.isIntersecting) return;
        links.forEach(function (a) {
          a.setAttribute('aria-current', String(a.getAttribute('href') === '#' + e.target.id));
        });
      });
    }, { rootMargin: '-45% 0px -50% 0px' });
    ['about', 'work', 'resume'].forEach(function (id) {
      var el = document.getElementById(id);
      if (el) spy.observe(el);
    });
  } else {
    document.querySelectorAll('.reveal').forEach(function (el) { el.classList.add('is-in'); });
  }

  // Keep the footer year current.
  var year = document.querySelector('[data-year]');
  if (year) year.textContent = new Date().getFullYear();
})();
