export interface StatMetric {
  label: string;
  value: string | number;
  subValue?: string;
  change?: string;
  trend?: 'up' | 'down' | 'neutral';
  source: string;
}

export interface Feature {
  title: string;
  description: string;
  icon?: string;
}

export interface ComparisonRow {
  feature: string;
  haven: boolean | string;
  otherCloud: boolean | string;
  youtube: boolean | string;
}

export interface PainPoint {
  problem: string;
  solution: string;
}

export interface FAQItem {
  question: string;
  answer: string;
}

export interface NavItem {
  label: string;
  href: string;
}
