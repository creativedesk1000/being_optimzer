/* main.js — Sprayers & Parts Bensalem PA */

document.addEventListener('DOMContentLoaded', function () {

  /* ─── Scroll-triggered fade-in ─── */
  const fadeEls = document.querySelectorAll(
    '.prod-card, .prob-card, .loc-col, .badge, .parts-btn, .why-box, .loc-note'
  );
  const io = new IntersectionObserver(function (entries) {
    entries.forEach(function (e) {
      if (e.isIntersecting) {
        e.target.classList.add('vis');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.1 });

  fadeEls.forEach(function (el, i) {
    el.style.cssText += 'opacity:0;transform:translateY(20px);transition:opacity .4s ease ' + (i * .04) + 's,transform .4s ease ' + (i * .04) + 's';
    io.observe(el);
  });
  document.head.insertAdjacentHTML('beforeend','<style>.vis{opacity:1!important;transform:translateY(0)!important}</style>');

  /* ─── Hero stagger ─── */
  var h1 = document.querySelector('.hero-text h1');
  var ps = document.querySelectorAll('.hero-text p');
  var himg = document.querySelector('.hero-img-col');
  function show(el, delay, dx) {
    if (!el) return;
    el.style.cssText += 'opacity:0;transform:translate(' + (dx||0) + 'px,12px);transition:opacity .55s ease ' + delay + 's,transform .55s ease ' + delay + 's';
    requestAnimationFrame(function () { requestAnimationFrame(function () {
      el.style.opacity = '1'; el.style.transform = 'translate(0,0)';
    }); });
  }
  show(h1, .08);
  ps.forEach(function (p, i) { show(p, .2 + i * .1); });
  show(himg, .15, 30);

  /* ─── Ripple on buttons ─── */
  document.querySelectorAll('.badge, .parts-btn, .cta-outline, .cta-fill').forEach(function (btn) {
    btn.style.overflow = 'hidden'; btn.style.position = 'relative';
    btn.addEventListener('click', function (e) {
      var r = btn.getBoundingClientRect();
      var s = Math.max(r.width, r.height);
      var rip = document.createElement('span');
      rip.style.cssText = 'position:absolute;border-radius:50%;background:rgba(255,255,255,.25);pointer-events:none;width:'+s+'px;height:'+s+'px;top:'+(e.clientY-r.top-s/2)+'px;left:'+(e.clientX-r.left-s/2)+'px;transform:scale(0);transition:transform .45s ease,opacity .45s ease;opacity:1';
      btn.appendChild(rip);
      requestAnimationFrame(function () { rip.style.transform = 'scale(2.6)'; rip.style.opacity = '0'; });
      setTimeout(function () { rip.remove(); }, 480);
    });
  });

  /* ─── Sticky header shadow ─── */
  var hdr = document.querySelector('.site-header');
  window.addEventListener('scroll', function () {
    hdr.style.boxShadow = window.scrollY > 20 ? '0 2px 14px rgba(0,0,0,.12)' : '0 1px 4px rgba(0,0,0,.07)';
  });

  /* ─── Keyboard a11y on cards ─── */
  document.querySelectorAll('.prod-card, .prob-card').forEach(function (c) {
    c.setAttribute('tabindex','0'); c.setAttribute('role','button');
    c.addEventListener('keydown', function (e) { if (e.key==='Enter'||e.key===' ') c.click(); });
  });

});