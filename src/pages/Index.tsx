import React, { useEffect, useState } from 'react';
import { Github, ExternalLink, Mail, Linkedin, Download, ChevronDown } from 'lucide-react';
import heroImage from '@/assets/hero-image.jpg';

const Index = () => {
  const [activeSection, setActiveSection] = useState('about');

  useEffect(() => {
    const observeElements = () => {
      const elements = document.querySelectorAll('.fade-in');
      const observer = new IntersectionObserver(
        (entries) => {
          entries.forEach((entry) => {
            if (entry.isIntersecting) {
              entry.target.classList.add('visible');
            }
          });
        },
        { threshold: 0.1 }
      );

      elements.forEach((el) => observer.observe(el));
      return () => observer.disconnect();
    };

    const handleScroll = () => {
      const sections = ['about', 'experience', 'projects', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
    };

    const cleanup = observeElements();
    window.addEventListener('scroll', handleScroll);
    return () => {
      cleanup();
      window.removeEventListener('scroll', handleScroll);
    };
  }, []);

  const scrollToSection = (sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      element.scrollIntoView({ behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-background font-inter">
      {/* Navigation Header */}
      <header className="glass-header fixed top-0 left-0 right-0 z-50 transition-all duration-300">
        <nav className="container-custom flex items-center justify-between py-4">
          <div className="text-xl font-semibold text-text-primary">
            Alex Johnson
          </div>
          <div className="hidden md:flex items-center space-x-8">
            {['About', 'Experience', 'Projects', 'Contact'].map((item) => (
              <button
                key={item}
                onClick={() => scrollToSection(item.toLowerCase())}
                className={`text-sm font-medium transition-colors duration-200 hover:text-accent ${
                  activeSection === item.toLowerCase() ? 'text-accent' : 'text-text-secondary'
                }`}
              >
                {item}
              </button>
            ))}
          </div>
        </nav>
      </header>

      {/* About Section (Hero) */}
      <section id="about" className="section min-h-screen flex items-center relative overflow-hidden">
        <div className="absolute inset-0 z-0">
          <img 
            src={heroImage} 
            alt="Workspace" 
            className="w-full h-full object-cover opacity-30"
          />
          <div className="absolute inset-0 bg-gradient-to-br from-background/80 to-background/60"></div>
        </div>
        
        <div className="container-custom relative z-10">
          <div className="max-w-4xl">
            <h1 className="text-5xl md:text-7xl font-bold text-text-primary mb-6 fade-in">
              Software Engineer &
              <br />
              <span className="text-gradient">Creative Problem Solver</span>
            </h1>
            <p className="text-xl md:text-2xl text-text-secondary mb-8 max-w-3xl fade-in">
              Computer Science student passionate about building elegant solutions to complex problems. 
              I love crafting beautiful, user-centric applications that make a difference.
            </p>
            <div className="flex flex-wrap gap-4 fade-in">
              <button 
                onClick={() => scrollToSection('projects')}
                className="btn-primary"
              >
                View My Work
              </button>
              <a 
                href="/resume.pdf" 
                target="_blank" 
                rel="noopener noreferrer"
                className="btn-secondary flex items-center gap-2"
              >
                <Download size={16} />
                Download Resume
              </a>
            </div>
          </div>
        </div>
        
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
          <ChevronDown className="text-text-tertiary" size={24} />
        </div>
      </section>

      {/* Experience Section */}
      <section id="experience" className="section bg-surface">
        <div className="container-custom">
          <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-16 text-center fade-in">
            Experience
          </h2>
          
          <div className="max-w-4xl mx-auto">
            <div className="space-y-12">
              {/* Experience Item 1 */}
              <div className="relative fade-in">
                <div className="flex flex-col md:flex-row md:items-start gap-6">
                  <div className="md:w-48 flex-shrink-0">
                    <div className="text-sm font-medium text-accent mb-1">June 2024 - August 2024</div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-text-primary mb-2">
                      Software Engineer Intern @ TechCorp
                    </h3>
                    <ul className="text-text-secondary space-y-2">
                      <li>• Developed a React-based dashboard that improved user engagement by 40%</li>
                      <li>• Implemented RESTful APIs using Node.js and Express, serving 10k+ daily requests</li>
                      <li>• Collaborated with cross-functional teams using Agile methodologies</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Experience Item 2 */}
              <div className="relative fade-in">
                <div className="flex flex-col md:flex-row md:items-start gap-6">
                  <div className="md:w-48 flex-shrink-0">
                    <div className="text-sm font-medium text-accent mb-1">January 2024 - May 2024</div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-text-primary mb-2">
                      Full Stack Developer @ StartupLab
                    </h3>
                    <ul className="text-text-secondary space-y-2">
                      <li>• Built a complete e-commerce platform using Next.js and MongoDB</li>
                      <li>• Implemented user authentication and payment processing with Stripe</li>
                      <li>• Optimized database queries, reducing page load times by 60%</li>
                    </ul>
                  </div>
                </div>
              </div>

              {/* Experience Item 3 */}
              <div className="relative fade-in">
                <div className="flex flex-col md:flex-row md:items-start gap-6">
                  <div className="md:w-48 flex-shrink-0">
                    <div className="text-sm font-medium text-accent mb-1">September 2023 - December 2023</div>
                  </div>
                  <div className="flex-1">
                    <h3 className="text-xl font-semibold text-text-primary mb-2">
                      Teaching Assistant @ University
                    </h3>
                    <ul className="text-text-secondary space-y-2">
                      <li>• Mentored 50+ students in Data Structures and Algorithms course</li>
                      <li>• Designed and graded programming assignments in Python and Java</li>
                      <li>• Conducted weekly lab sessions and office hours</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="section">
        <div className="container-custom">
          <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-16 text-center fade-in">
            Featured Projects
          </h2>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {/* Project 1 */}
            <div className="card fade-in">
              <div className="h-48 bg-gradient-to-br from-accent/10 to-accent/20 flex items-center justify-center">
                <div className="text-accent text-6xl font-bold">AI</div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-text-primary mb-2">AI Task Manager</h3>
                <p className="text-text-secondary mb-4">
                  An intelligent task management app that uses machine learning to prioritize and categorize tasks automatically.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="tech-tag">React</span>
                  <span className="tech-tag">Python</span>
                  <span className="tech-tag">TensorFlow</span>
                  <span className="tech-tag">FastAPI</span>
                </div>
                <div className="flex gap-3">
                  <a href="#" className="flex items-center gap-1 text-accent hover:text-hover transition-colors">
                    <Github size={16} />
                    <span className="text-sm">Code</span>
                  </a>
                  <a href="#" className="flex items-center gap-1 text-accent hover:text-hover transition-colors">
                    <ExternalLink size={16} />
                    <span className="text-sm">Live Demo</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Project 2 */}
            <div className="card fade-in">
              <div className="h-48 bg-gradient-to-br from-accent/10 to-accent/20 flex items-center justify-center">
                <div className="text-accent text-6xl font-bold">🏠</div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-text-primary mb-2">Smart Home Dashboard</h3>
                <p className="text-text-secondary mb-4">
                  A comprehensive IoT dashboard for controlling and monitoring smart home devices with real-time data visualization.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="tech-tag">Vue.js</span>
                  <span className="tech-tag">Node.js</span>
                  <span className="tech-tag">MQTT</span>
                  <span className="tech-tag">InfluxDB</span>
                </div>
                <div className="flex gap-3">
                  <a href="#" className="flex items-center gap-1 text-accent hover:text-hover transition-colors">
                    <Github size={16} />
                    <span className="text-sm">Code</span>
                  </a>
                  <a href="#" className="flex items-center gap-1 text-accent hover:text-hover transition-colors">
                    <ExternalLink size={16} />
                    <span className="text-sm">Live Demo</span>
                  </a>
                </div>
              </div>
            </div>

            {/* Project 3 */}
            <div className="card fade-in">
              <div className="h-48 bg-gradient-to-br from-accent/10 to-accent/20 flex items-center justify-center">
                <div className="text-accent text-6xl font-bold">📊</div>
              </div>
              <div className="p-6">
                <h3 className="text-xl font-semibold text-text-primary mb-2">Data Visualization Tool</h3>
                <p className="text-text-secondary mb-4">
                  A powerful web application for creating interactive charts and graphs from various data sources.
                </p>
                <div className="flex flex-wrap gap-2 mb-4">
                  <span className="tech-tag">D3.js</span>
                  <span className="tech-tag">TypeScript</span>
                  <span className="tech-tag">Express</span>
                  <span className="tech-tag">PostgreSQL</span>
                </div>
                <div className="flex gap-3">
                  <a href="#" className="flex items-center gap-1 text-accent hover:text-hover transition-colors">
                    <Github size={16} />
                    <span className="text-sm">Code</span>
                  </a>
                  <a href="#" className="flex items-center gap-1 text-accent hover:text-hover transition-colors">
                    <ExternalLink size={16} />
                    <span className="text-sm">Live Demo</span>
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section bg-surface">
        <div className="container-custom">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-text-primary mb-8 fade-in">
              Let's Connect
            </h2>
            <p className="text-xl text-text-secondary mb-12 fade-in">
              I'm always open to discussing new opportunities, interesting projects, or just having a chat about technology.
            </p>
            
            <div className="flex flex-wrap justify-center gap-6 fade-in">
              <a 
                href="mailto:alex.johnson@example.com"
                className="flex items-center gap-3 btn-primary"
              >
                <Mail size={20} />
                Get in Touch
              </a>
              <a 
                href="https://linkedin.com/in/alexjohnson"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 btn-secondary"
              >
                <Linkedin size={20} />
                LinkedIn
              </a>
              <a 
                href="https://github.com/alexjohnson"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 btn-secondary"
              >
                <Github size={20} />
                GitHub
              </a>
            </div>
          </div>
        </div>
      </section>

      {/* Footer */}
      <footer className="py-8 border-t border-border-light">
        <div className="container-custom">
          <div className="flex flex-col md:flex-row items-center justify-between">
            <div className="text-text-tertiary text-sm mb-4 md:mb-0">
              © 2025 Alex Johnson. All rights reserved.
            </div>
            <div className="flex items-center gap-4">
              <a href="https://github.com/alexjohnson" className="text-text-tertiary hover:text-accent transition-colors">
                <Github size={18} />
              </a>
              <a href="https://linkedin.com/in/alexjohnson" className="text-text-tertiary hover:text-accent transition-colors">
                <Linkedin size={18} />
              </a>
              <a href="mailto:alex.johnson@example.com" className="text-text-tertiary hover:text-accent transition-colors">
                <Mail size={18} />
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
};

export default Index;
