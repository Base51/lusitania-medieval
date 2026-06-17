(function () {
  'use strict';

  var CONSENT_KEY = 'lm_cookie_consent_v1';
  var GA_ID = window.LM_GA_ID || 'G-KWH7E5N39M';

  function gtagSafe() {
    if (typeof window.gtag === 'function') {
      window.gtag.apply(null, arguments);
    }
  }

  function consentGranted() {
    return {
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
      analytics_storage: 'granted'
    };
  }

  function consentDenied() {
    return {
      ad_storage: 'denied',
      ad_user_data: 'denied',
      ad_personalization: 'denied',
      analytics_storage: 'denied'
    };
  }

  function applyGranted() {
    gtagSafe('consent', 'update', consentGranted());
    gtagSafe('config', GA_ID, { anonymize_ip: true });
  }

  function applyDenied() {
    gtagSafe('consent', 'update', consentDenied());
  }

  function saveChoice(value) {
    try {
      localStorage.setItem(CONSENT_KEY, value);
    } catch (e) {
      // Ignore storage errors (private mode, blocked storage).
    }
  }

  function readChoice() {
    try {
      return localStorage.getItem(CONSENT_KEY);
    } catch (e) {
      return null;
    }
  }

  function createBanner() {
    var banner = document.createElement('aside');
    banner.className = 'cookie-banner';
    banner.id = 'cookieBanner';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-live', 'polite');
    banner.innerHTML =
      '<p><strong>Privacidade e Cookies</strong><br>Usamos cookies analíticos para melhorar a sua experiência. Pode aceitar ou rejeitar estes cookies.</p>' +
      '<div class="cookie-banner-actions">' +
      '  <button type="button" class="btn btn-outline" id="cookieReject">Rejeitar</button>' +
      '  <button type="button" class="btn btn-primary" id="cookieAccept">Aceitar</button>' +
      '</div>';

    var manageBtn = document.createElement('button');
    manageBtn.type = 'button';
    manageBtn.className = 'cookie-manage-btn';
    manageBtn.id = 'cookieManage';
    manageBtn.textContent = 'Cookies';

    document.body.appendChild(banner);
    document.body.appendChild(manageBtn);

    return {
      banner: banner,
      manageBtn: manageBtn,
      acceptBtn: document.getElementById('cookieAccept'),
      rejectBtn: document.getElementById('cookieReject')
    };
  }

  function showBanner(ui) {
    ui.banner.classList.add('is-visible');
  }

  function hideBanner(ui) {
    ui.banner.classList.remove('is-visible');
  }

  document.addEventListener('DOMContentLoaded', function () {
    var ui = createBanner();
    var choice = readChoice();

    ui.acceptBtn.addEventListener('click', function () {
      applyGranted();
      saveChoice('granted');
      hideBanner(ui);
    });

    ui.rejectBtn.addEventListener('click', function () {
      applyDenied();
      saveChoice('denied');
      hideBanner(ui);
    });

    ui.manageBtn.addEventListener('click', function () {
      showBanner(ui);
    });

    if (choice === 'granted') {
      applyGranted();
      hideBanner(ui);
      return;
    }

    if (choice === 'denied') {
      applyDenied();
      hideBanner(ui);
      return;
    }

    showBanner(ui);
  });
})();
