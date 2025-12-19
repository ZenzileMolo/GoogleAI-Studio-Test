
import { Experience, Education, Certification, SkillGroup } from './types';

export const PERSONAL_INFO = {
  name: "Zenzile Molo",
  title: "African Digital Multimedia Designer",
  location: "Cape Town, South Africa",
  email: "zmolo21@gmail.com",
  phone: "+27 64 242 1827",
  linkedin: "https://www.linkedin.com/in/zenzile-molo-488739a4/",
  behance: "https://www.behance.net/zenzilemolo1",
  summary: "An African designer and researcher dedicated to Pluriversal design. I move beyond Western paradigms by integrating Psychology, Theology, and Indigenous knowledge systems into digital multimedia. My work envisions a world where technology honors collective identities and diverse ways of being.",
};

export interface Project {
  title: string;
  category: string;
  description: string;
  image: string;
  link?: string;
  tags: string[];
}

export const PROJECTS: Project[] = [
  {
    title: "The World Looks Like This From Here",
    category: "Book Design & Research",
    description: "Collaborative work with Prof. Kopano Ratele on African Psychology. Visualizing psychological concepts through an Afrocentric lens.",
    image: "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=1074",
    tags: ["Research", "African Psychology", "Publication"]
  },
  {
    title: "Warehouse Trust Digital Hub",
    category: "Web Development",
    description: "A community-centric platform designed for social justice advocacy in Cape Town, focusing on accessibility and inclusivity.",
    image: "https://images.unsplash.com/photo-1531482615713-2afd69097998?auto=format&fit=crop&q=80&w=1170",
    link: "https://www.warehouse.org.za/",
    tags: ["WordPress", "UI/UX", "Social Justice"]
  },
  {
    title: "Indigenous Design Systems",
    category: "Conceptual Design",
    description: "An exploration of geometric patterns from Southern African traditions translated into modern digital interface components.",
    image: "https://images.unsplash.com/photo-1518991033280-327ba769992e?auto=format&fit=crop&q=80&w=1170",
    tags: ["Pluriversal", "Figma", "Culture"]
  },
  {
    title: "Ubuntu UI Framework",
    category: "Product Design",
    description: "A research project on collective-first user experiences, challenging the individualistic bias of Western tech design.",
    image: "https://images.unsplash.com/photo-1522202176988-66273c2fd55f?auto=format&fit=crop&q=80&w=1171",
    tags: ["UX Research", "Human Behavior", "Ethics"]
  }
];

export const EXPERIENCES: Experience[] = [
  {
    role: "Digital Multimedia Designer / Web Developer",
    company: "The Warehouse Trust",
    period: "January 2019 - Present",
    location: "Cape Town, South Africa",
    description: [
      "Designed and maintained user-friendly, engaging websites aligned with organizational goals.",
      "Collaborated with multidisciplinary teams to create digital content that resonated with diverse audiences.",
      "Managed Salesforce administration and social media campaigns.",
      "Ensured optimal website performance and accessibility."
    ],
    skills: ["WordPress", "Elementor", "Salesforce", "After Effects", "Front-end Coding", "User-centered Design"],
    link: "https://www.warehouse.org.za/"
  },
  {
    role: "Junior Multimedia Designer / Research Assistant",
    company: "University of South Africa (UNISA)",
    period: "September 2017 - February 2019",
    location: "Cape Town, South Africa",
    description: [
      "Created social media content and printable material (Brochures and Flyers) for research units RUMM and TAP.",
      "Reviewed and refined academic promotional content for clarity and impact.",
      "Assisted PhD students with recruiting participants and data transcription.",
      "Played a key role in writing the African Psychology book 'The World Looks Like This From Here' by Prof. Kopano Ratele."
    ],
    skills: ["Adobe Creative Suite", "UX Research", "Video Production", "Qualitative Data Analysis"]
  },
  {
    role: "Assistant Project Manager",
    company: "Western Cape Government",
    period: "August 2018 - September 2018",
    location: "Cape Town, South Africa",
    description: [
      "Supported the NJDF project with filing, venue reservations, and stakeholder meeting coordination.",
      "Compiled relevant documents for Stream Workers."
    ],
    skills: ["Project Management", "Stakeholder Coordination", "Systems Thinking"]
  },
  {
    role: "Information Technology Instructor",
    company: "LEAP Science and Maths School",
    period: "September 2011 - January 2014",
    location: "Cape Town, South Africa",
    description: [
      "Cultivated teaching and mentoring skills, simplifying complex ICT concepts for high school students.",
      "Focused on Object Oriented Programming (OOP) and Python."
    ],
    skills: ["Python", "Teaching", "OOP", "HTML", "Dreamweaver"]
  }
];

export const EDUCATIONS: Education[] = [
  {
    degree: "Diploma in Information & Communication Technology in Multimedia Applications",
    institution: "Cape Peninsula University of Technology",
    period: "2021 - 2023",
    location: "Cape Town, South Africa",
    grade: "70/100",
    description: "Specialized in multimedia field with a focus on technology, design, and user experience.",
    skills: ["Figma", "SEO", "Application Development", "Database Administration", "Agile Methodologies"]
  },
  {
    degree: "Bachelor's degree / Psychology Honours",
    institution: "University of Cape Town",
    period: "2017",
    location: "Cape Town, South Africa",
    grade: "60/100",
    description: "Developed intellectual independence and professional skills in research and psychology.",
    skills: ["Statistics", "Social Psychology", "Qualitative Research", "Data Analysis"]
  },
  {
    degree: "Bachelor of Theology",
    institution: "University of the Western Cape",
    period: "2014 - 2016",
    location: "Cape Town, South Africa",
    description: "Majored in Psychology, focusing on humanities and humanistic studies.",
    skills: ["Counseling Psychology", "Critical Thinking", "Ethics"]
  }
];

export const SKILL_GROUPS: SkillGroup[] = [
  {
    category: "Creative Design",
    items: [
      { name: "Multimedia Design", level: "Expert" },
      { name: "Content Development", level: "Expert" },
      { name: "Video Editing", level: "Expert" },
      { name: "Adobe Creative Suite", level: "Expert" },
      { name: "Visual Storytelling", level: "Expert" },
      { name: "Branding", level: "Intermediate" }
    ]
  },
  {
    category: "Technical Development",
    items: [
      { name: "Web Development", level: "Intermediate" },
      { name: "Front-end Coding", level: "Expert" },
      { name: "WordPress / Elementor", level: "Expert" },
      { name: "Python / PHP / SQL", level: "Intermediate" },
      { name: "UX/UI Design", level: "Expert" },
      { name: "Salesforce Lightning", level: "Intermediate" }
    ]
  },
  {
    category: "Research & Management",
    items: [
      { name: "UX Research", level: "Expert" },
      { name: "Project Management", level: "Expert" },
      { name: "Qualitative Data", level: "Expert" },
      { name: "User Interviews", level: "Expert" },
      { name: "Problem Solving", level: "Expert" },
      { name: "Strategic Planning", level: "Intermediate" }
    ]
  }
];

export const CERTIFICATIONS: Certification[] = [
  { title: "Foundations of User Experience (UX) Design", issuer: "Google/Coursera", date: "Jan 2023" },
  { title: "Start the UX Design Process: Empathize, Define, Ideate", issuer: "Google/Coursera", date: "Feb 2023" },
  { title: "Values and Ethics: Case Studies in Action", issuer: "LinkedIn" },
  { title: "Succeeding in Web Development: Full Stack and Front End", issuer: "LinkedIn" },
  { title: "Artificial Intelligence Foundations: Machine Learning", issuer: "LinkedIn" },
  { title: "The 33 Laws of Typography", issuer: "LinkedIn" },
  { title: "Figma Essential Training: The Basics", issuer: "LinkedIn" },
  { title: "Learning Git and GitHub", issuer: "LinkedIn" },
  { title: "SEO: Ecommerce Strategies", issuer: "LinkedIn" },
];
