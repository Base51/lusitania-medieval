(function () {
  'use strict';

  var CONSENT_KEY = 'lm_cookie_consent_v1';
  var GA_ID = window.LM_GA_ID || 'G-KWH7E5N39M';
  var ADS_ID = window.LM_ADS_ID || 'AW-1010499385';
  var COPY = {
    pt: {
      title: 'Privacidade e Cookies',
      message: 'Usamos cookies analiticos e de publicidade para melhorar a sua experiencia. Pode aceitar ou rejeitar estes cookies.',
      reject: 'Rejeitar',
      accept: 'Aceitar',
      manage: 'Cookies'
    },
    en: {
      title: 'Privacy and Cookies',
      message: 'We use analytics and advertising cookies to improve your experience. You can accept or reject these cookies.',
      reject: 'Reject',
      accept: 'Accept',
      manage: 'Cookies'
    }
  };

  function getCopy() {
    var language = (document.documentElement.lang || 'pt-PT').toLowerCase();
    return language.indexOf('en') === 0 ? COPY.en : COPY.pt;
  }

  function gtagSafe() {
    if (typeof window.gtag === 'function') {
      window.gtag.apply(null, arguments);
    }
  }

  function fbqSafe() {
    if (typeof window.fbq === 'function') {
      window.fbq.apply(null, arguments);
    }
  }

  function consentGranted() {
    return {
      ad_storage: 'granted',
      ad_user_data: 'granted',
      ad_personalization: 'granted',
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
    gtagSafe('config', ADS_ID);
    fbqSafe('consent', 'grant');
  }

  function applyDenied() {
    gtagSafe('consent', 'update', consentDenied());
    fbqSafe('consent', 'revoke');
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
    var copy = getCopy();
    var banner = document.createElement('aside');
    banner.className = 'cookie-banner';
    banner.id = 'cookieBanner';
    banner.setAttribute('role', 'dialog');
    banner.setAttribute('aria-live', 'polite');
    banner.setAttribute('aria-label', copy.title);
    banner.innerHTML =
      '<p><strong>' + copy.title + '</strong><br>' + copy.message + '</p>' +
      '<div class="cookie-banner-actions">' +
      '  <button type="button" class="btn btn-outline" id="cookieReject">' + copy.reject + '</button>' +
      '  <button type="button" class="btn btn-primary" id="cookieAccept">' + copy.accept + '</button>' +
      '</div>';

    var manageBtn = document.createElement('button');
    manageBtn.type = 'button';
    manageBtn.className = 'cookie-manage-btn';
    manageBtn.id = 'cookieManage';
    manageBtn.textContent = copy.manage;

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
