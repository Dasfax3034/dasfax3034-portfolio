import { defineRouting } from 'next-intl/routing';

export const routing = defineRouting({
    // A list of all locales that are supported
    locales: ['en', 'fr'],

    // Used when no locale matches
    defaultLocale: 'en',
    
    // Whether or not to prefix the default locale
    localePrefix: 'as-needed'
});