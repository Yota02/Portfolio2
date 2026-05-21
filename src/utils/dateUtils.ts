export const monthMap: Record<string, Record<string, number>> = {
  fr: {
    'janvier': 0, 'février': 1, 'mars': 2, 'avril': 3, 'mai': 4, 'juin': 5,
    'juillet': 6, 'août': 7, 'septembre': 8, 'octobre': 9, 'novembre': 10, 'décembre': 11
  },
  en: {
    'january': 0, 'february': 1, 'march': 2, 'april': 3, 'may': 4, 'june': 5,
    'july': 6, 'august': 7, 'september': 8, 'october': 9, 'november': 10, 'december': 11
  },
  es: {
    'enero': 0, 'febrero': 1, 'marzo': 2, 'abril': 3, 'mayo': 4, 'junio': 5,
    'julio': 6, 'agosto': 7, 'septiembre': 8, 'octubre': 9, 'noviembre': 10, 'diciembre': 11
  },
  de: {
    'januar': 0, 'februar': 1, 'märz': 2, 'april': 3, 'mai': 4, 'juni': 5,
    'juli': 6, 'august': 7, 'september': 8, 'oktober': 9, 'november': 10, 'dezember': 11
  },
  it: {
    'gennaio': 0, 'febbraio': 1, 'marzo': 2, 'aprile': 3, 'maggio': 4, 'giugno': 5,
    'luglio': 6, 'agosto': 7, 'settembre': 8, 'ottobre': 9, 'novembre': 10, 'dicembre': 11
  },
  ru: {
    'январь': 0, 'февраль': 1, 'март': 2, 'апрель': 3, 'май': 4, 'июнь': 5,
    'июль': 6, 'август': 7, 'сентябрь': 8, 'октябрь': 9, 'ноябрь': 10, 'декабрь': 11
  }
};

const getMonthIndex = (monthName: string, locale: string): number => {
  const norm = monthName.toLowerCase().trim();
  const map = (monthMap[locale] || monthMap['en'] || {}) as Record<string, number>;
  for (const [key, val] of Object.entries(map)) {
    if (key === norm || norm.startsWith(key.substring(0, 3))) {
      return val;
    }
  }
  // Fallback across all maps
  for (const locMap of Object.values(monthMap)) {
    for (const [key, val] of Object.entries(locMap)) {
      if (key === norm || norm.startsWith(key.substring(0, 3))) {
        return val;
      }
    }
  }
  return -1;
};

export const parseDate = (
  dateKey: string | undefined,
  currentLocale: string,
  t: (key: string) => string
): Date => {
  if (!dateKey) return new Date(0);
  
  const translatedDate = t(dateKey);
  if (!translatedDate || translatedDate === dateKey) return new Date(0);

  // Handle Asian YYYY年M月D日 or YYYY年M月
  if (currentLocale === 'zh' || currentLocale === 'jp') {
    const match = translatedDate.match(/(\d+)年(\d+)月(?:(\d+)日)?/);
    if (match) {
      const year = parseInt(match[1] || '0');
      const month = parseInt(match[2] || '1') - 1;
      const day = match[3] ? parseInt(match[3]) : 1;
      return new Date(year, month, day);
    }
    return new Date(0);
  }

  const cleaned = translatedDate.replace(/[.,]/g, '').trim();
  const parts = cleaned.split(/\s+/);
  
  if (parts.length === 2) {
    const monthName = parts[0] || '';
    const year = parseInt(parts[1] || '0');
    const monthIndex = getMonthIndex(monthName, currentLocale);
    if (monthIndex !== -1 && !isNaN(year)) {
      return new Date(year, monthIndex, 1);
    }
  } else if (parts.length === 3) {
    const val0 = parseInt(parts[0] || '0');
    const val1 = parseInt(parts[1] || '0');
    const year = parseInt(parts[2] || '0');
    
    if (!isNaN(year)) {
      if (!isNaN(val0) && isNaN(val1)) {
        // Day Month Year (e.g., "10 mai 2026")
        const day = val0;
        const monthName = parts[1] || '';
        const monthIndex = getMonthIndex(monthName, currentLocale);
        if (monthIndex !== -1) {
          return new Date(year, monthIndex, day);
        }
      } else if (isNaN(val0) && !isNaN(val1)) {
        // Month Day Year (e.g., "May 10, 2026")
        const monthName = parts[0] || '';
        const day = val1;
        const monthIndex = getMonthIndex(monthName, currentLocale);
        if (monthIndex !== -1) {
          return new Date(year, monthIndex, day);
        }
      }
    }
  }
  
  const fallback = Date.parse(translatedDate);
  if (!isNaN(fallback)) {
    return new Date(fallback);
  }
  
  return new Date(0);
};

interface DurationLocale {
  daySingle: string;
  dayPlural: string;
  monthSingle: string;
  monthPlural: string;
  yearSingle: string;
  yearPlural: string;
  and: string;
}

const durationLocales: Record<string, DurationLocale> = {
  fr: {
    daySingle: 'jour',
    dayPlural: 'jours',
    monthSingle: 'mois',
    monthPlural: 'mois',
    yearSingle: 'an',
    yearPlural: 'ans',
    and: 'et'
  },
  en: {
    daySingle: 'day',
    dayPlural: 'days',
    monthSingle: 'month',
    monthPlural: 'months',
    yearSingle: 'year',
    yearPlural: 'years',
    and: 'and'
  },
  es: {
    daySingle: 'día',
    dayPlural: 'días',
    monthSingle: 'mes',
    monthPlural: 'meses',
    yearSingle: 'año',
    yearPlural: 'años',
    and: 'y'
  },
  de: {
    daySingle: 'Tag',
    dayPlural: 'Tage',
    monthSingle: 'Monat',
    monthPlural: 'Monate',
    yearSingle: 'Jahr',
    yearPlural: 'Jahre',
    and: 'und'
  },
  it: {
    daySingle: 'giorno',
    dayPlural: 'giorni',
    monthSingle: 'mese',
    monthPlural: 'mesi',
    yearSingle: 'anno',
    yearPlural: 'anni',
    and: 'e'
  },
  ru: {
    daySingle: 'день',
    dayPlural: 'дней',
    monthSingle: 'месяц',
    monthPlural: 'месяцев',
    yearSingle: 'год',
    yearPlural: 'лет',
    and: 'и'
  },
  jp: {
    daySingle: '日',
    dayPlural: '日',
    monthSingle: 'ヶ月',
    monthPlural: 'ヶ月',
    yearSingle: '年',
    yearPlural: '年',
    and: 'と'
  },
  zh: {
    daySingle: '天',
    dayPlural: '天',
    monthSingle: '个月',
    monthPlural: '个月',
    yearSingle: '年',
    yearPlural: '年',
    and: '和'
  }
};

const formatRussian = (value: number, type: 'day' | 'month' | 'year'): string => {
  const mod10 = value % 10;
  const mod100 = value % 100;
  if (type === 'day') {
    if (mod100 >= 11 && mod100 <= 19) return `${value} дней`;
    if (mod10 === 1) return `${value} день`;
    if (mod10 >= 2 && mod10 <= 4) return `${value} дня`;
    return `${value} дней`;
  } else if (type === 'month') {
    if (mod100 >= 11 && mod100 <= 19) return `${value} месяцев`;
    if (mod10 === 1) return `${value} месяц`;
    if (mod10 >= 2 && mod10 <= 4) return `${value} месяца`;
    return `${value} месяцев`;
  } else {
    if (mod100 >= 11 && mod100 <= 19) return `${value} лет`;
    if (mod10 === 1) return `${value} год`;
    if (mod10 >= 2 && mod10 <= 4) return `${value} года`;
    return `${value} лет`;
  }
};

export const getDurationString = (d1: Date, d2: Date, locale: string): string => {
  const diffTime = Math.abs(d2.getTime() - d1.getTime());
  const diffDays = Math.ceil(diffTime / (1000 * 60 * 60 * 24));
  
  const lang = (durationLocales[locale] || durationLocales['en']) as DurationLocale;
  
  if (diffDays <= 30) {
    if (locale === 'ru') {
      return formatRussian(diffDays, 'day');
    }
    const label = diffDays <= 1 ? lang.daySingle : lang.dayPlural;
    return `${diffDays} ${label}`;
  }
  
  let years = d2.getFullYear() - d1.getFullYear();
  let months = d2.getMonth() - d1.getMonth();
  
  if (months < 0) {
    years -= 1;
    months += 12;
  }
  
  if (d2.getDate() < d1.getDate()) {
    months -= 1;
    if (months < 0) {
      years -= 1;
      months += 12;
    }
  }
  
  const totalMonths = years * 12 + months;
  if (totalMonths <= 0) {
    if (locale === 'ru') return formatRussian(1, 'month');
    return `1 ${lang.monthSingle}`;
  }
  
  if (years === 0) {
    if (locale === 'ru') return formatRussian(months, 'month');
    const label = months <= 1 ? lang.monthSingle : lang.monthPlural;
    return `${months} ${label}`;
  } else {
    if (locale === 'ru') {
      const yearStr = formatRussian(years, 'year');
      if (months === 0) return yearStr;
      const monthStr = formatRussian(months, 'month');
      return `${yearStr} ${lang.and} ${monthStr}`;
    } else if (locale === 'jp' || locale === 'zh') {
      if (months === 0) return `${years} ${lang.yearSingle}`;
      return `${years} ${lang.yearSingle} ${lang.and} ${months} ${lang.monthSingle}`;
    } else {
      const yearLabel = years <= 1 ? lang.yearSingle : lang.yearPlural;
      const yearStr = `${years} ${yearLabel}`;
      if (months === 0) return yearStr;
      const monthLabel = months <= 1 ? lang.monthSingle : lang.monthPlural;
      const monthStr = `${months} ${monthLabel}`;
      return `${yearStr} ${lang.and} ${monthStr}`;
    }
  }
};

export const getLocalizedDuration = (
  startDateStr: string | undefined,
  endDateStr: string | undefined,
  isOngoing: boolean | undefined,
  currentLocale: string,
  t: (key: string) => string
): string => {
  if (!startDateStr) return t('projects.stats.unspecified');
  
  const d1 = parseDate(startDateStr, currentLocale, t);
  if (d1.getTime() === 0) return t('projects.stats.unspecified');
  
  const d2 = isOngoing ? new Date() : (endDateStr ? parseDate(endDateStr, currentLocale, t) : null);
  
  if (!d2 || d2.getTime() === 0) {
    if (isOngoing) {
      return getDurationString(d1, new Date(), currentLocale);
    }
    return t('projects.stats.unspecified');
  }
  
  return getDurationString(d1, d2, currentLocale);
};
