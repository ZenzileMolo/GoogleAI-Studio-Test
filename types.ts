
export interface Experience {
  role: string;
  company: string;
  period: string;
  location: string;
  description: string[];
  skills: string[];
  link?: string;
}

export interface Education {
  degree: string;
  institution: string;
  period: string;
  location: string;
  grade?: string;
  description: string;
  skills: string[];
}

export interface Certification {
  title: string;
  issuer: string;
  date?: string;
}

export interface SkillGroup {
  category: string;
  items: { name: string; level: 'Expert' | 'Intermediate' | 'Advanced' }[];
}
