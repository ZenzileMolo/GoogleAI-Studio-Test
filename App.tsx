
import React, { useState, useEffect, useRef } from 'react';
import { 
  Linkedin, 
  Mail, 
  Phone, 
  MapPin, 
  ExternalLink, 
  ChevronRight, 
  Award, 
  Briefcase, 
  Menu, 
  X,
  Download,
  GraduationCap,
  ArrowLeft,
  Palette,
  Code,
  Sparkles,
  Send,
  Loader2,
  Globe
} from 'lucide-react';
import { GoogleGenAI } from "@google/genai";
import { 
  PERSONAL_INFO, 
  EXPERIENCES, 
  EDUCATIONS, 
  SKILL_GROUPS, 
  CERTIFICATIONS,
  PROJECTS,
  Project
} from './constants';
import { Experience } from './types';

// State for multi-page functionality
type View = 'HOME' | 'RESUME' | 'PORTFOLIO';

const Nav: React.FC<{ activeView: View; setView: (v: View) => void }> = ({ activeView, setView }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 20);
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navItems: { name: string; view: View }[] = [
    { name: 'Home', view: 'HOME' },
    { name: 'Portfolio', view: 'PORTFOLIO' },
    { name: 'Resume', view: 'RESUME' },
  ];

  const handleNavClick = (view: View) => {
    setView(view);
    setIsOpen(false);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  return (
    <nav className={`fixed top-0 w-full z-50 transition-all duration-300 ${scrolled || activeView !== 'HOME' ? 'bg-zinc-950/90 backdrop-blur-md py-4 border-b border-zinc-800' : 'bg-transparent py-6'}`}>
      <div className="container mx-auto px-6 flex justify-between items-center">
        <button onClick={() => handleNavClick('HOME')} className="text-2xl font-bold tracking-tighter text-white">
          ZM<span className="text-amber-500">.</span>
        </button>
        
        <div className="hidden md:flex items-center space-x-8">
          {navItems.map((item) => (
            <button 
              key={item.name} 
              onClick={() => handleNavClick(item.view)}
              className={`text-sm font-medium transition-colors ${activeView === item.view ? 'text-amber-500' : 'text-zinc-400 hover:text-white'}`}
            >
              {item.name}
            </button>
          ))}
          <button 
            onClick={() => handleNavClick('RESUME')}
            className="px-5 py-2 rounded-full bg-amber-500 text-black text-sm font-semibold hover:bg-amber-400 transition-all transform hover:scale-105"
          >
            View CV
          </button>
        </div>

        <button className="md:hidden text-zinc-400" onClick={() => setIsOpen(!isOpen)}>
          {isOpen ? <X size={28} /> : <Menu size={28} />}
        </button>
      </div>

      {isOpen && (
        <div className="absolute top-full left-0 w-full bg-zinc-950 border-b border-zinc-800 py-8 px-6 md:hidden animate-in fade-in slide-in-from-top-4">
          <div className="flex flex-col space-y-6">
            {navItems.map((item) => (
              <button 
                key={item.name} 
                onClick={() => handleNavClick(item.view)}
                className={`text-2xl font-bold text-left ${activeView === item.view ? 'text-amber-500' : 'text-zinc-400'}`}
              >
                {item.name}
              </button>
            ))}
          </div>
        </div>
      )}
    </nav>
  );
};

const PluriversalOracle: React.FC = () => {
  const [query, setQuery] = useState('');
  const [response, setResponse] = useState('');
  const [loading, setLoading] = useState(false);
  const bottomRef = useRef<HTMLDivElement>(null);

  const askOracle = async () => {
    if (!query.trim()) return;
    setLoading(true);
    setResponse('');
    try {
      const ai = new GoogleGenAI({ apiKey: process.env.API_KEY });
      const res = await ai.models.generateContent({
        model: 'gemini-3-flash-preview',
        contents: `You are Zenzile Molo, an African Designer with a focus on Indigenous and Pluriversal designs. Your philosophy moves beyond Western ways of design, integrating Psychology and Theology. Answer this user's question about your design approach or a design concept through that specific lens: ${query}`,
        config: {
          systemInstruction: "You are Zenzile Molo. Your tone is academic yet accessible, poetic, and deeply rooted in African philosophy (like Ubuntu). You challenge Western-centric design 'best practices' in favor of pluriversal ones.",
        }
      });
      setResponse(res.text || 'The Oracle is silent. Try again later.');
    } catch (err) {
      setResponse('An error occurred while connecting to the Oracle.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="glass-card rounded-3xl p-8 border border-amber-500/20 shadow-2xl shadow-amber-500/5">
      <div className="flex items-center gap-3 mb-6">
        <div className="w-10 h-10 rounded-full bg-amber-500 flex items-center justify-center text-black">
          <Sparkles size={20} />
        </div>
        <div>
          <h3 className="text-xl font-bold text-white">Pluriversal Design Oracle</h3>
          <p className="text-xs text-zinc-500">Powered by Gemini AI • Exploring Afrocentric Aesthetics</p>
        </div>
      </div>
      
      <div className="space-y-4 mb-6 max-h-[300px] overflow-y-auto pr-2 scrollbar-hide">
        {response ? (
          <div className="bg-zinc-900/50 rounded-2xl p-5 text-zinc-300 text-sm leading-relaxed border border-zinc-800 animate-in fade-in duration-500">
            {response}
          </div>
        ) : (
          <div className="text-zinc-500 text-sm italic">
            "Ask me how Pluriversal design challenges Western paradigms, or how Indigenous patterns inform my work."
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <div className="relative">
        <input 
          type="text" 
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          onKeyDown={(e) => e.key === 'Enter' && askOracle()}
          placeholder="Ask about my philosophy..."
          className="w-full bg-zinc-950 border border-zinc-800 rounded-full py-4 pl-6 pr-14 text-sm focus:outline-none focus:border-amber-500 transition-colors"
        />
        <button 
          onClick={askOracle}
          disabled={loading}
          className="absolute right-2 top-2 w-10 h-10 rounded-full bg-amber-500 text-black flex items-center justify-center hover:bg-amber-400 transition-all disabled:opacity-50"
        >
          {loading ? <Loader2 size={18} className="animate-spin" /> : <Send size={18} />}
        </button>
      </div>
    </div>
  );
};

const PortfolioView: React.FC<{ setView: (v: View) => void }> = ({ setView }) => {
  return (
    <div className="pt-32 pb-24 animate-in fade-in slide-in-from-bottom-4 duration-700">
      <div className="container mx-auto px-6">
        <button 
          onClick={() => setView('HOME')} 
          className="flex items-center gap-2 text-zinc-500 hover:text-amber-500 transition-colors mb-12 group"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> Back to Home
        </button>

        <div className="max-w-4xl mb-16">
          <h2 className="text-5xl md:text-7xl font-bold mb-6">Indigenous <span className="text-amber-500 italic">& Pluriversal</span> Designs</h2>
          <p className="text-xl text-zinc-400 leading-relaxed">
            A curated selection of projects that move beyond Western paradigms, focusing on the intersection of African identity, psychology, and technology.
          </p>
        </div>

        <div className="grid md:grid-cols-2 gap-12">
          {PROJECTS.map((project, idx) => (
            <div key={idx} className="group relative overflow-hidden rounded-[2.5rem] bg-zinc-900 border border-zinc-800 hover:border-amber-500/30 transition-all">
              <div className="aspect-[16/10] overflow-hidden">
                <img 
                  src={project.image} 
                  alt={project.title} 
                  className="w-full h-full object-cover grayscale group-hover:grayscale-0 group-hover:scale-105 transition-all duration-700"
                />
              </div>
              <div className="p-8">
                <div className="flex justify-between items-start mb-4">
                  <div>
                    <span className="text-amber-500 text-xs font-bold tracking-widest uppercase mb-2 block">{project.category}</span>
                    <h3 className="text-2xl font-bold text-white group-hover:text-amber-500 transition-colors">{project.title}</h3>
                  </div>
                  {project.link && (
                    <a href={project.link} target="_blank" className="p-3 rounded-full bg-zinc-800 text-zinc-400 hover:text-white transition-all">
                      <ExternalLink size={20} />
                    </a>
                  )}
                </div>
                <p className="text-zinc-500 mb-6 leading-relaxed">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.tags.map(tag => (
                    <span key={tag} className="px-3 py-1 rounded-full bg-zinc-950 border border-zinc-800 text-[10px] font-bold text-zinc-400 uppercase tracking-tighter">
                      {tag}
                    </span>
                  ))}
                </div>
              </div>
            </div>
          ))}
        </div>

        <div className="mt-24 grid lg:grid-cols-2 gap-16 items-center">
          <div className="order-2 lg:order-1">
            <h3 className="text-3xl font-bold mb-6">Exploring the <span className="text-amber-500 italic">Pluriverse</span></h3>
            <p className="text-zinc-400 mb-8 leading-relaxed">
              Design is never neutral. My work aims to decenter Western individualistic narratives and instead explore how interfaces can reflect collective identity, Ubuntu, and the spiritual dimensions of human interaction.
            </p>
            <div className="space-y-4">
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-zinc-900/50 border border-zinc-800">
                <Globe className="text-amber-500 shrink-0" size={24} />
                <p className="text-sm text-zinc-300">Decentering the "User" as an isolated actor and seeing them as part of a relational community.</p>
              </div>
              <div className="flex items-start gap-4 p-4 rounded-2xl bg-zinc-900/50 border border-zinc-800">
                <Palette className="text-amber-500 shrink-0" size={24} />
                <p className="text-sm text-zinc-300">Utilizing Indigenous symbology as functional elements rather than mere decoration.</p>
              </div>
            </div>
          </div>
          <div className="order-1 lg:order-2">
            <PluriversalOracle />
          </div>
        </div>
      </div>
    </div>
  );
};

const Home: React.FC<{ setView: (v: View) => void }> = ({ setView }) => {
  return (
    <div className="animate-in fade-in duration-700">
      <section className="relative min-h-[90vh] flex items-center pt-20 overflow-hidden">
        <div className="absolute top-1/4 -right-20 w-96 h-96 bg-amber-500/10 rounded-full blur-[100px]"></div>
        <div className="container mx-auto px-6 relative z-10 grid md:grid-cols-2 gap-16 items-center">
          <div className="order-2 md:order-1">
            <span className="inline-block px-3 py-1 mb-6 text-xs font-semibold tracking-widest text-amber-500 uppercase border border-amber-500/30 rounded-full bg-amber-500/5">
              African Designer & Researcher
            </span>
            <h1 className="text-5xl md:text-8xl font-bold leading-tight mb-6">
              Zenzile <br /> <span className="accent-gradient italic">Molo</span>
            </h1>
            <p className="text-xl text-zinc-400 max-w-lg mb-10 leading-relaxed">
              Advocating for <span className="text-white">Pluriversal Design</span> by merging Psychology and Theology into digital multimedia that honors African identity.
            </p>
            <div className="flex flex-wrap gap-4">
              <button onClick={() => setView('PORTFOLIO')} className="px-8 py-4 rounded-full bg-amber-500 text-black font-bold hover:bg-amber-400 transition-all shadow-lg shadow-amber-500/10">
                View Pluriversal Work
              </button>
              <div className="flex items-center space-x-4">
                <a href={PERSONAL_INFO.linkedin} target="_blank" className="p-4 rounded-full glass-card text-zinc-400 hover:text-white transition-all">
                  <Linkedin size={20} />
                </a>
                <a href={PERSONAL_INFO.behance} target="_blank" className="p-4 rounded-full glass-card text-zinc-400 hover:text-white transition-all flex items-center">
                  <span className="font-bold text-lg">Bē</span>
                </a>
              </div>
            </div>
          </div>
          <div className="order-1 md:order-2 relative group">
            <div className="relative z-10 rounded-[3rem] overflow-hidden aspect-square md:h-[550px] border border-zinc-800 shadow-2xl">
               <img 
                 src="https://raw.githubusercontent.com/StackBlitz/stackblitz-images/main/zenzile-philosophy.jpg" 
                 alt="Zenzile Molo reading Philosophy" 
                 className="w-full h-full object-cover grayscale-0 group-hover:scale-105 transition-all duration-700"
                 onError={(e) => {
                   (e.target as HTMLImageElement).src = "https://images.unsplash.com/photo-1544716278-ca5e3f4abd8c?auto=format&fit=crop&q=80&w=1074";
                 }}
               />
               <div className="absolute inset-0 bg-gradient-to-t from-zinc-950/80 via-zinc-950/20 to-transparent"></div>
               <div className="absolute bottom-10 left-10 right-10 p-6 glass-card rounded-2xl border border-white/10">
                 <p className="text-amber-500 font-bold tracking-widest uppercase text-xs mb-1">Philosophy & Design</p>
                 <p className="text-zinc-100 text-lg font-bold leading-tight">Creating from the depths of the African experience.</p>
               </div>
            </div>
            <div className="absolute -top-12 -left-12 w-64 h-64 bg-amber-500/5 rounded-full blur-3xl -z-10 animate-pulse"></div>
          </div>
        </div>
      </section>

      {/* Philosophy Section */}
      <section className="py-32 bg-zinc-950 border-y border-zinc-900">
        <div className="container mx-auto px-6">
          <div className="max-w-4xl mx-auto glass-card rounded-[3rem] p-12 md:p-20 text-center relative overflow-hidden">
            <div className="absolute top-0 left-0 w-full h-1 bg-gradient-to-r from-transparent via-amber-500 to-transparent opacity-50"></div>
            <h2 className="text-3xl md:text-5xl font-bold mb-10 italic leading-snug">"Envisioning a pluriversal just world through the fusion of human behavior, indigenous design, and technology."</h2>
            <p className="text-zinc-400 text-lg leading-relaxed mb-12">
              My work challenges the universality of Western design. By rooting my practice in African Psychology and Theology, I aim to create digital spaces that are pluriversal—meaning they belong to a world where many worlds fit.
            </p>
            <div className="flex flex-col md:flex-row justify-center gap-6">
              <button onClick={() => setView('PORTFOLIO')} className="px-10 py-4 rounded-full bg-white text-black font-bold hover:bg-zinc-200 transition-all">
                Explore Portfolio
              </button>
              <button onClick={() => setView('RESUME')} className="px-10 py-4 rounded-full border border-zinc-700 text-white font-bold hover:bg-zinc-900 transition-all">
                The Academic Journey
              </button>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

const ResumeView: React.FC<{ setView: (v: View) => void }> = ({ setView }) => {
  return (
    <div className="pt-32 pb-24 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div className="container mx-auto px-6">
        <button 
          onClick={() => setView('HOME')} 
          className="flex items-center gap-2 text-zinc-500 hover:text-amber-500 transition-colors mb-12 group"
        >
          <ArrowLeft size={18} className="group-hover:-translate-x-1 transition-transform" /> Back to Home
        </button>

        <div className="flex flex-col md:flex-row justify-between items-start md:items-end mb-16 gap-8">
          <div>
            <h2 className="text-5xl md:text-7xl font-bold mb-4">Curriculum <span className="text-amber-500 italic">Vitae</span></h2>
            <p className="text-zinc-400 max-w-2xl">A summary of my journey across design, education, and research, with a focus on African systems of thought.</p>
          </div>
          <button className="flex items-center gap-2 px-6 py-3 rounded-full bg-zinc-800 hover:bg-zinc-700 transition-all text-white font-bold">
            <Download size={18} /> Download CV
          </button>
        </div>

        <div className="grid lg:grid-cols-12 gap-16">
          <div className="lg:col-span-8 space-y-20">
            <section>
              <h3 className="text-2xl font-bold mb-10 flex items-center gap-3">
                <Briefcase className="text-amber-500" /> Work Experience
              </h3>
              <div className="space-y-12 border-l border-zinc-800 ml-4 pl-8">
                {EXPERIENCES.map((exp, idx) => (
                  <div key={idx} className="relative group">
                    <div className="absolute -left-[41px] top-1 w-5 h-5 rounded-full bg-zinc-950 border-2 border-amber-500 group-hover:scale-125 transition-transform"></div>
                    <div className="mb-2 flex flex-col md:flex-row md:justify-between md:items-center">
                      <h4 className="text-xl font-bold text-white">{exp.role}</h4>
                      <span className="text-amber-500 font-mono text-sm">{exp.period}</span>
                    </div>
                    <p className="text-zinc-400 font-medium mb-4">{exp.company} • {exp.location}</p>
                    <ul className="space-y-3 mb-4">
                      {exp.description.map((item, i) => (
                        <li key={i} className="text-zinc-500 text-sm leading-relaxed flex gap-2">
                          <span className="text-amber-500 mt-1.5 w-1.5 h-1.5 rounded-full shrink-0"></span>
                          {item}
                        </li>
                      ))}
                    </ul>
                    <div className="flex flex-wrap gap-2">
                      {exp.skills.map(skill => (
                        <span key={skill} className="px-2 py-0.5 rounded bg-zinc-900 border border-zinc-800 text-zinc-500 text-[10px] font-bold uppercase">{skill}</span>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h3 className="text-2xl font-bold mb-10 flex items-center gap-3">
                <GraduationCap className="text-amber-500" /> Education
              </h3>
              <div className="grid md:grid-cols-2 gap-8">
                {EDUCATIONS.map((edu, idx) => (
                  <div key={idx} className="p-6 rounded-2xl bg-zinc-900/30 border border-zinc-800 hover:border-zinc-700 transition-all">
                    <span className="text-amber-500 font-mono text-xs block mb-2">{edu.period}</span>
                    <h4 className="text-lg font-bold text-white mb-2 leading-tight">{edu.degree}</h4>
                    <p className="text-zinc-400 text-sm mb-4">{edu.institution}</p>
                    <p className="text-zinc-500 text-xs italic">{edu.description}</p>
                  </div>
                ))}
              </div>
            </section>
          </div>

          <div className="lg:col-span-4 space-y-16">
            <section>
              <h3 className="text-xl font-bold mb-8">Professional Skills</h3>
              <div className="space-y-10">
                {SKILL_GROUPS.map((group) => (
                  <div key={group.category}>
                    <h4 className="text-xs font-bold text-zinc-500 uppercase tracking-[0.2em] mb-4">{group.category}</h4>
                    <div className="flex flex-wrap gap-2">
                      {group.items.map(skill => (
                        <div key={skill.name} className="group relative">
                          <span className="px-3 py-1.5 rounded-full bg-zinc-900 border border-zinc-800 text-zinc-300 text-xs font-medium cursor-default">
                            {skill.name}
                          </span>
                        </div>
                      ))}
                    </div>
                  </div>
                ))}
              </div>
            </section>

            <section>
              <h3 className="text-xl font-bold mb-8 flex items-center gap-2">
                <Award className="text-amber-500" /> Licenses & Certs
              </h3>
              <div className="space-y-4">
                {CERTIFICATIONS.map((cert, idx) => (
                  <div key={idx} className="p-4 rounded-xl glass-card flex items-start gap-4 group">
                    <div className="w-10 h-10 rounded-lg bg-amber-500/5 flex items-center justify-center shrink-0 group-hover:bg-amber-500/20 transition-all">
                      <Award size={18} className="text-amber-500" />
                    </div>
                    <div>
                      <h5 className="text-sm font-bold text-white leading-snug group-hover:text-amber-500 transition-colors">{cert.title}</h5>
                      <p className="text-xs text-zinc-500 mt-1">{cert.issuer} {cert.date && `• ${cert.date}`}</p>
                    </div>
                  </div>
                ))}
              </div>
            </section>
          </div>
        </div>
      </div>
    </div>
  );
};

const Contact: React.FC = () => {
  return (
    <section id="contact" className="py-24 bg-zinc-950">
      <div className="container mx-auto px-6">
        <div className="glass-card rounded-[3rem] p-12 lg:p-20 relative overflow-hidden border border-zinc-800/50">
          <div className="absolute -top-24 -right-24 w-64 h-64 bg-amber-500/10 rounded-full blur-[80px]"></div>
          
          <div className="relative z-10 max-w-2xl">
            <h2 className="text-4xl md:text-7xl font-bold mb-8 leading-tight">
              Let's create <br /> something <span className="accent-gradient italic">impactful.</span>
            </h2>
            <p className="text-xl text-zinc-400 mb-12">
              Based in Cape Town, available for global remote collaboration. I specialize in turning complex narratives into seamless digital journeys.
            </p>
            
            <div className="flex flex-col sm:flex-row gap-8 mb-12">
              <a href={`mailto:${PERSONAL_INFO.email}`} className="flex items-center space-x-4 group">
                <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-zinc-900 text-amber-500 border border-zinc-800 group-hover:bg-amber-500 group-hover:text-black transition-all">
                  <Mail size={24} />
                </div>
                <div>
                  <p className="text-zinc-500 text-[10px] uppercase tracking-widest font-bold mb-0.5">Contact</p>
                  <p className="text-white font-medium">{PERSONAL_INFO.email}</p>
                </div>
              </a>
              <div className="flex items-center space-x-4">
                <div className="w-14 h-14 flex items-center justify-center rounded-2xl bg-zinc-900 text-amber-500 border border-zinc-800">
                  <Phone size={24} />
                </div>
                <div>
                  <p className="text-zinc-500 text-[10px] uppercase tracking-widest font-bold mb-0.5">Phone</p>
                  <p className="text-white font-medium">{PERSONAL_INFO.phone}</p>
                </div>
              </div>
            </div>

            <div className="flex gap-4">
               <a href={PERSONAL_INFO.linkedin} target="_blank" className="flex-1 flex items-center justify-center gap-3 py-4 rounded-2xl bg-zinc-100 text-black font-bold hover:bg-white transition-all">
                 <Linkedin size={20} /> LinkedIn
               </a>
               <a href={PERSONAL_INFO.behance} target="_blank" className="flex-1 flex items-center justify-center gap-3 py-4 rounded-2xl border border-zinc-700 text-white font-bold hover:bg-zinc-800 transition-all">
                 Behance <ExternalLink size={20} />
               </a>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

const Footer: React.FC = () => {
  return (
    <footer className="py-12 bg-zinc-950 border-t border-zinc-900">
      <div className="container mx-auto px-6 flex flex-col md:flex-row justify-between items-center space-y-6 md:space-y-0">
        <div className="flex flex-col items-center md:items-start">
          <p className="text-2xl font-bold tracking-tighter text-white">ZM<span className="text-amber-500">.</span></p>
          <p className="text-zinc-600 text-xs mt-1 uppercase tracking-widest font-medium">Cape Town • African Multimedia Design</p>
        </div>
        <p className="text-zinc-500 text-sm">© {new Date().getFullYear()} Zenzile Molo. Built with precision and purpose.</p>
        <div className="flex space-x-6 text-sm font-medium">
           <a href={PERSONAL_INFO.linkedin} target="_blank" className="text-zinc-500 hover:text-amber-500 transition-colors">LinkedIn</a>
           <a href={PERSONAL_INFO.behance} target="_blank" className="text-zinc-500 hover:text-amber-500 transition-colors">Behance</a>
        </div>
      </div>
    </footer>
  );
};

const App: React.FC = () => {
  const [view, setView] = useState<View>('HOME');

  return (
    <div className="min-h-screen bg-zinc-950 text-zinc-100 selection:bg-amber-500 selection:text-black font-sans">
      <Nav activeView={view} setView={setView} />
      
      <main className="transition-all duration-500 ease-in-out">
        {view === 'HOME' && <Home setView={setView} />}
        {view === 'PORTFOLIO' && <PortfolioView setView={setView} />}
        {view === 'RESUME' && <ResumeView setView={setView} />}

        <Contact />
      </main>

      <Footer />
    </div>
  );
};

export default App;
