'use client';

import Script from 'next/script';
import React from 'react';

const GoogleTranslate = () => {
  return (
    <>
      <div id="google_translate_element"></div>
      <Script id="google-translate-init" strategy="afterInteractive">
        {`
          function googleTranslateElementInit() {
            new window.google.translate.TranslateElement({
              pageLanguage: 'fr',
              includedLanguages: 'fr,tr,en,es,de,it,pt,ar,zh-CN,ja,ru',
              layout: window.google.translate.TranslateElement.InlineLayout.SIMPLE,
              autoDisplay: false
            }, 'google_translate_element');
          }
        `}
      </Script>
      <Script
        strategy="afterInteractive"
        src="//translate.google.com/translate_a/element.js?cb=googleTranslateElementInit"
      />
    </>
  );
};

export default GoogleTranslate;
