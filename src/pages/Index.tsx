import React, { useEffect, useState, useRef } from 'react';
import { Github, ExternalLink, Mail, Linkedin, Download, ChevronDown } from 'lucide-react';
import heroImage from '@/assets/hero-image.jpg';

const Index = () => {
  const [activeSection, setActiveSection] = useState('about');
  const videoRef = useRef<HTMLVideoElement>(null);
  const scrollStoryRef = useRef<HTMLDivElement>(null);

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

    const handleScrollStory = () => {
      if (!videoRef.current || !scrollStoryRef.current) return;
      
      const video = videoRef.current;
      const container = scrollStoryRef.current;
      const containerRect = container.getBoundingClientRect();
      const windowHeight = window.innerHeight;
      
      // Calculate scroll progress through the scroll story section
      const scrollTop = window.scrollY;
      const containerTop = container.offsetTop;
      const containerHeight = container.offsetHeight;
      
      // Progress: 0 when container top hits bottom of viewport, 1 when container bottom hits top of viewport
      const progress = Math.max(0, Math.min(1, 
        (scrollTop - containerTop + windowHeight) / (containerHeight + windowHeight)
      ));
      
      // Frame-precise video control
      if (video.duration && video.readyState >= 2) {
        const targetTime = progress * video.duration;
        // Only update if the difference is significant enough (prevents jitter)
        if (Math.abs(video.currentTime - targetTime) > 0.1) {
          video.currentTime = targetTime;
        }
      }
      
      // Update text animations with gaps between sections
      const textElements = container.querySelectorAll('.scroll-text');
      textElements.forEach((element, index) => {
        // Each text section gets 20% of scroll progress with 10% gaps
        const sectionStart = index * 0.25; // Start of this section (25% intervals for gaps)
        const sectionEnd = sectionStart + 0.15; // Each section lasts 15% (leaving 10% gap)
        
        let opacity = 0;
        let translateY = 30;
        
        if (progress >= sectionStart && progress <= sectionEnd) {
          // Fade in/out within the section duration
          const sectionProgress = (progress - sectionStart) / 0.15;
          
          if (sectionProgress <= 0.3) {
            // Fade in (first 30% of section)
            opacity = sectionProgress / 0.3;
            translateY = 30 * (1 - opacity);
          } else if (sectionProgress >= 0.7) {
            // Fade out (last 30% of section)
            opacity = (1 - sectionProgress) / 0.3;
            translateY = 30 * (1 - opacity);
          } else {
            // Fully visible (middle 40% of section)
            opacity = 1;
            translateY = 0;
          }
        }
        
        (element as HTMLElement).style.opacity = opacity.toString();
        (element as HTMLElement).style.transform = `translate(-50%, -50%) translateY(${translateY}px)`;
      });
    };

    const handleScroll = () => {
      const sections = ['about', 'scroll-story', 'experience', 'projects', 'contact'];
      const current = sections.find(section => {
        const element = document.getElementById(section);
        if (element) {
          const rect = element.getBoundingClientRect();
          return rect.top <= 100 && rect.bottom >= 100;
        }
        return false;
      });
      if (current) setActiveSection(current);
      
      handleScrollStory();
    };

    // Initialize video when it loads
    const initializeVideo = () => {
      if (videoRef.current) {
        const video = videoRef.current;
        video.addEventListener('loadeddata', () => {
          video.currentTime = 0;
        });
      }
    };

    const cleanup = observeElements();
    initializeVideo();
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

      {/* Scroll Story Section */}
      <section id="scroll-story" className="relative" ref={scrollStoryRef}>
        <div className="h-[400vh] relative">{/* Increased height for better control */}
          {/* Video Container */}
          <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden bg-black">
            <video
              ref={videoRef}
              className="w-full h-full object-cover"
              muted
              playsInline
              preload="metadata"
            >
              <source src="https://commondatastorage.googleapis.com/gtv-videos-bucket/sample/BigBuckBunny.mp4" type="video/mp4" />
            </video>
            
            {/* Overlay Text */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white max-w-4xl px-8">
                <div className="scroll-text opacity-0">
                  <h2 className="text-4xl md:text-6xl font-bold mb-6">
                    Innovation
                  </h2>
                  <p className="text-xl md:text-2xl">
                    Through creative problem-solving and cutting-edge technology
                  </p>
                </div>
                
                <div className="scroll-text opacity-0">
                  <h2 className="text-4xl md:text-6xl font-bold mb-6">
                    Performance
                  </h2>
                  <p className="text-xl md:text-2xl">
                    Optimized solutions that scale with your business needs
                  </p>
                </div>
                
                <div className="scroll-text opacity-0">
                  <h2 className="text-4xl md:text-6xl font-bold mb-6">
                    Excellence
                  </h2>
                  <p className="text-xl md:text-2xl">
                    Delivering exceptional user experiences with every line of code
                  </p>
                </div>
                
                <div className="scroll-text opacity-0">
                  <h2 className="text-4xl md:text-6xl font-bold mb-6">
                    Impact
                  </h2>
                  <p className="text-xl md:text-2xl">
                    Building solutions that make a difference in people's lives
                  </p>
                </div>
              </div>
            </div>
          </div>
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
