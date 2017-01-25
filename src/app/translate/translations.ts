// app/translate/translation.ts

import { OpaqueToken } from '@angular/core';

// import translations
import { LANG_EN_NAME, LANG_EN_TRANS } from './lang-en';
import { LANG_IT_NAME, LANG_IT_TRANS } from './lang-it';

// translation token
export const TRANSLATIONS = new OpaqueToken('translations');

// all translations
const dictionary = {
  [LANG_EN_NAME]: LANG_EN_TRANS,
  [LANG_IT_NAME]: LANG_IT_TRANS
};

// providers
export const TRANSLATION_PROVIDERS = [
  { provide: TRANSLATIONS, useValue: dictionary },
];
