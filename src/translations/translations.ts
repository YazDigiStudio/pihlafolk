export const translations = {
  fi: {
    // Navigation
    nav: {
      home: 'Etusivu',
      gallery: 'Galleria',
      about: 'Tietoa',
      media: 'Media',
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
      gallery: 'Gallery',
      about: 'About',
      media: 'Media',
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
