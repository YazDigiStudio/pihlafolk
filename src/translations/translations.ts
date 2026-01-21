export const translations = {
  fi: {
    // Navigation
    nav: {
      home: 'Etusivu',
      artists: 'Artistit',
      gallery: 'Galleria',
      about: 'Tietoa',
      services: 'Palvelut',
      media: 'Media',
      productions: 'Tuotannot',
      cv: 'CV',
      contact: 'Yhteystiedot'
    },
    // Common
    common: {
      loading: 'Ladataan...'
    },
    // Gallery
    gallery: {
      title: 'Galleria',
      photo: 'Kuva',
      downloadButton: 'Lataa korkearesoluutioinen kuva',
      downloadHighRes: '⬇ Lataa korkearesoluutioinen kuva',
      close: 'Sulje'
    },
    // About
    about: {
      title: 'Tietoa'
    },
    // Media
    media: {
      title: 'Media'
    },
    // CV
    cv: {
      title: 'CV'
    },
    // Contact
    contact: {
      title: 'Yhteystiedot',
      contactLabel: 'Yhteydenotot:'
    },
    // 404 Not Found
    notFound: {
      title: 'Sivua ei löytynyt',
      heading: 'Sivua ei löytynyt',
      message: 'Etsimääsi sivua ei löytynyt. Se on saatettu poistaa tai siirtää toiseen osoitteeseen.',
      homeButton: 'Palaa etusivulle',
      description: 'Sivua ei löydy. Palaa Pihla Folk -etusivulle.'
    },
    // SEO
    seo: {
      home: {
        title: 'Portfolio - Ammattilainen',
        description: 'Ammattilaisen portfolio. Kokenut ammattilainen monipuolisella osaamisella.'
      },
      gallery: {
        title: 'Galleria - Portfolio',
        description: 'Katso ammattimaiset kuvat ja työt portfoliosta.'
      },
      about: {
        title: 'Tietoa - Portfolio',
        description: 'Tutustu ammattilaiseen ja hänen osaamiseensa.'
      },
      media: {
        title: 'Media - Portfolio',
        description: 'Katso videot ja työnäytteet portfoliosta.'
      },
      cv: {
        title: 'CV - Portfolio',
        description: 'Ammattilaisen ansioluettelo ja työkokemus.'
      },
      contact: {
        title: 'Yhteystiedot - Portfolio',
        description: 'Ota yhteyttä työtarjouksista ja yhteistyöstä.'
      }
    }
  },
  en: {
    // Navigation
    nav: {
      home: 'Home',
      artists: 'Artists',
      gallery: 'Gallery',
      about: 'About',
      services: 'Services',
      media: 'Media',
      productions: 'Productions',
      cv: 'CV',
      contact: 'Contact'
    },
    // Common
    common: {
      loading: 'Loading...'
    },
    // Gallery
    gallery: {
      title: 'Gallery',
      photo: 'Photo',
      downloadButton: 'Download high-resolution image',
      downloadHighRes: '⬇ Download high-resolution image',
      close: 'Close'
    },
    // About
    about: {
      title: 'About'
    },
    // Media
    media: {
      title: 'Media'
    },
    // CV
    cv: {
      title: 'CV'
    },
    // Contact
    contact: {
      title: 'Contact',
      contactLabel: 'Contact:'
    },
    // 404 Not Found
    notFound: {
      title: 'Page Not Found',
      heading: 'Page Not Found',
      message: 'The page you are looking for does not exist. It may have been removed or moved to a different address.',
      homeButton: 'Return to Home',
      description: 'Page not found. Return to Pihla Folk homepage.'
    },
    // SEO
    seo: {
      home: {
        title: 'Portfolio - Professional',
        description: 'Professional portfolio showcasing experience and expertise.'
      },
      gallery: {
        title: 'Gallery - Portfolio',
        description: 'View professional photos and work samples from portfolio.'
      },
      about: {
        title: 'About - Portfolio',
        description: 'Get to know the professional and their expertise.'
      },
      media: {
        title: 'Media - Portfolio',
        description: 'Watch videos and view work samples from portfolio.'
      },
      cv: {
        title: 'CV - Portfolio',
        description: 'Professional resume and work experience.'
      },
      contact: {
        title: 'Contact - Portfolio',
        description: 'Contact for work opportunities and collaboration.'
      }
    }
  }
};

export type Language = 'fi' | 'en';
export type Translations = typeof translations.fi;
