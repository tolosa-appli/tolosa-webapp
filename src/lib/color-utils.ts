// Color utility functions to generate gradients and background colors

interface ColorConfig {
  gradient: string;
  bgColor: string;
  textColor: string;
  hoverTextColor: string;
}

const colorMap: Record<string, ColorConfig> = {
  blue: {
    gradient: 'from-blue-500 to-purple-600',
    bgColor: 'from-blue-50 to-indigo-50',
    textColor: 'text-blue-800',
    hoverTextColor: 'group-hover:text-blue-900',
  },
  green: {
    gradient: 'from-green-500 to-teal-600',
    bgColor: 'from-green-50 to-teal-50',
    textColor: 'text-green-800',
    hoverTextColor: 'group-hover:text-green-900',
  },
  orange: {
    gradient: 'from-orange-500 to-red-600',
    bgColor: 'from-orange-50 to-red-50',
    textColor: 'text-orange-800',
    hoverTextColor: 'group-hover:text-orange-900',
  },
  indigo: {
    gradient: 'from-indigo-500 to-blue-600',
    bgColor: 'from-indigo-50 to-blue-50',
    textColor: 'text-indigo-800',
    hoverTextColor: 'group-hover:text-indigo-900',
  },
  emerald: {
    gradient: 'from-emerald-500 to-green-600',
    bgColor: 'from-emerald-50 to-green-50',
    textColor: 'text-emerald-800',
    hoverTextColor: 'group-hover:text-emerald-900',
  },
  violet: {
    gradient: 'from-violet-500 to-purple-600',
    bgColor: 'from-violet-50 to-purple-50',
    textColor: 'text-violet-800',
    hoverTextColor: 'group-hover:text-violet-900',
  },
  pink: {
    gradient: 'from-pink-500 to-rose-600',
    bgColor: 'from-pink-50 to-rose-50',
    textColor: 'text-pink-800',
    hoverTextColor: 'group-hover:text-pink-900',
  },
  cyan: {
    gradient: 'from-cyan-500 to-blue-600',
    bgColor: 'from-cyan-50 to-blue-50',
    textColor: 'text-cyan-800',
    hoverTextColor: 'group-hover:text-cyan-900',
  },
  rose: {
    gradient: 'from-rose-500 to-pink-600',
    bgColor: 'from-rose-50 to-pink-50',
    textColor: 'text-rose-800',
    hoverTextColor: 'group-hover:text-rose-900',
  },
  amber: {
    gradient: 'from-amber-500 to-orange-600',
    bgColor: 'from-amber-50 to-orange-50',
    textColor: 'text-amber-800',
    hoverTextColor: 'group-hover:text-amber-900',
  },
  slate: {
    gradient: 'from-slate-500 to-gray-600',
    bgColor: 'from-slate-50 to-gray-50',
    textColor: 'text-slate-800',
    hoverTextColor: 'group-hover:text-slate-900',
  },
  lime: {
    gradient: 'from-lime-500 to-green-600',
    bgColor: 'from-lime-50 to-green-50',
    textColor: 'text-lime-800',
    hoverTextColor: 'group-hover:text-lime-900',
  },
  sky: {
    gradient: 'from-sky-500 to-blue-600',
    bgColor: 'from-sky-50 to-blue-50',
    textColor: 'text-sky-800',
    hoverTextColor: 'group-hover:text-sky-900',
  },
  purple: {
    gradient: 'from-purple-500 to-indigo-600',
    bgColor: 'from-purple-50 to-indigo-50',
    textColor: 'text-purple-800',
    hoverTextColor: 'group-hover:text-purple-900',
  },
  teal: {
    gradient: 'from-teal-500 to-cyan-600',
    bgColor: 'from-teal-50 to-cyan-50',
    textColor: 'text-teal-800',
    hoverTextColor: 'group-hover:text-teal-900',
  },
  red: {
    gradient: 'from-red-500 to-rose-600',
    bgColor: 'from-red-50 to-rose-50',
    textColor: 'text-red-800',
    hoverTextColor: 'group-hover:text-red-900',
  },
};

export const getColorConfig = (color: string): ColorConfig => {
  return colorMap[color] || colorMap.blue; // fallback to blue
};

export const getGradient = (color: string): string => {
  return getColorConfig(color).gradient;
};

export const getBgColor = (color: string): string => {
  return getColorConfig(color).bgColor;
};

export const getTextColor = (color: string): string => {
  return getColorConfig(color).textColor;
};

export const getHoverTextColor = (color: string): string => {
  return getColorConfig(color).hoverTextColor;
};

// Function to construct feature URLs
export const getFeatureUrl = (slug: string, isLoggedIn: boolean = false): string => {
  if (!isLoggedIn) {
    return '/login';
  }
  return `/app/${slug}`;
};
