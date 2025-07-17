import React, { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import { Github, ExternalLink, Mail, Linkedin, Download, ChevronDown, Menu, X, Home } from 'lucide-react';
import heroImage from '@/assets/hero-image.png';
import microsoftLogo from '@/assets/Microsoft.png';
import uwLogo from '@/assets/UW.jpg';
import hopkinsLogo from '@/assets/hopkins_logo.png';

const Index = () => {
  const [activeSection, setActiveSection] = useState('about');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
  const videoRef = useRef<HTMLVideoElement>(null);
  const scrollStoryRef = useRef<HTMLDivElement>(null);
  const requestRef = useRef<number>();
  const lastScrollTime = useRef<number>(0);
  const [isLowPerfDevice, setIsLowPerfDevice] = useState(false);
  const [prefersReducedMotion, setPrefersReducedMotion] = useState(false);
  
  const projectDetails = {
    'neural-translator': {
      title: 'Attention-Based Neural Translator',
      category: 'Machine Learning',
      description: 'A sophisticated neural machine translation system that leverages attention mechanisms to achieve state-of-the-art translation quality between multiple language pairs.',
      fullDescription: `This project implements a cutting-edge neural machine translation system using attention-based sequence-to-sequence models. The system processes input text in one language and generates fluent, contextually accurate translations in target languages.

Key innovations include:
• Custom attention mechanisms that focus on relevant parts of the input sequence
• Beam search optimization for improved translation quality
• Batch processing pipeline for efficient inference
• Comprehensive evaluation using BLEU score metrics

The model architecture combines encoder-decoder frameworks with multi-head attention, allowing for better capture of long-range dependencies in natural language. Training was performed on large-scale multilingual datasets with careful preprocessing and augmentation strategies.`,
      technologies: ['Python', 'PyTorch', 'Transformers', 'BLEU', 'CUDA', 'NumPy'],
      achievements: [
        '94.6% improvement in inference speed through optimization',
        '60% increase in BLEU score accuracy',
        'Support for 5+ language pairs',
        'Real-time translation capabilities'
      ],
      githubUrl: 'https://github.com/jkim695/neural-translator',
      demoUrl: null
    },
    'summernest': {
      title: 'SummerNest',
      category: 'Web Platform',
      description: 'A comprehensive platform connecting students with medium-term housing solutions near college campuses, featuring advanced search and booking capabilities.',
      fullDescription: `SummerNest addresses the critical need for flexible, medium-term housing arrangements for college students during summer internships, research programs, and academic breaks. The platform creates a seamless marketplace connecting property owners with students seeking temporary accommodation.

The system features:
• Intelligent matching algorithm based on location, budget, and preferences
• Advanced filtering system for dates, amenities, and proximity to campus
• Secure payment processing and booking management
• Review and rating system for quality assurance
• Mobile-responsive design for on-the-go access

Built with modern web technologies, the platform emphasizes user experience and security. The backend implements robust APIs for real-time data synchronization and efficient database operations. The project was recognized by Johns Hopkins University's entrepreneurship program.`,
      technologies: ['React.js', 'Node.js', 'Express.js', 'PostgreSQL', 'JWT', 'Stripe API'],
      achievements: [
        'Accepted into Johns Hopkins "Spark" accelerator program',
        'Received $500 in development grants',
        'Interviewed 20+ stakeholders for market research',
        'Deployed MVP with user authentication system'
      ],
      githubUrl: 'https://github.com/jkim695/summernest',
      demoUrl: null
    },
    'goalshare': {
      title: 'Goalshare',
      category: 'iOS App',
      description: 'A native iOS application for collaborative goal setting and progress tracking, featuring real-time synchronization and social accountability features.',
      fullDescription: `Goalshare revolutionizes personal productivity by combining individual goal setting with social accountability. The app enables users to create, track, and share their personal and professional objectives while building supportive communities around shared ambitions.

Core features include:
• Intuitive goal creation with customizable milestones and deadlines
• Progress tracking with visual analytics and insights
• Social sharing capabilities for accountability and motivation
• Push notifications for reminders and milestone celebrations
• Offline functionality with seamless cloud synchronization
• Privacy controls for personal vs. shared goals

The app architecture follows iOS best practices with clean, modular code organization. Firebase integration provides real-time data synchronization across devices and robust user authentication. The user interface emphasizes accessibility and intuitive navigation, making goal management effortless and engaging.`,
      technologies: ['Swift', 'Firebase', 'Core Data', 'UIKit', 'CloudKit', 'Push Notifications'],
      achievements: [
        'Native iOS app with 60fps performance',
        'Offline-first architecture with cloud sync',
        'Comprehensive user authentication system',
        'Real-time collaboration features'
      ],
      githubUrl: 'https://github.com/jkim695/goalshare',
      demoUrl: null
    }
  };

  useEffect(() => {
    // Device capability detection
    const detectDeviceCapabilities = () => {
      // Check for reduced motion preference
      const mediaQuery = window.matchMedia('(prefers-reduced-motion: reduce)');
      setPrefersReducedMotion(mediaQuery.matches);
      
      // Detect low performance devices
      const isLowPerf = 
        navigator.hardwareConcurrency <= 2 || // Low CPU cores
        (navigator as any).deviceMemory <= 4 || // Low RAM
        /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent); // Mobile devices
      
      setIsLowPerfDevice(isLowPerf);
      
      // Listen for changes in reduced motion preference
      const handleMotionChange = (e: MediaQueryListEvent) => {
        setPrefersReducedMotion(e.matches);
      };
      
      mediaQuery.addEventListener('change', handleMotionChange);
      return () => mediaQuery.removeEventListener('change', handleMotionChange);
    };

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

    const cleanupDeviceDetection = detectDeviceCapabilities();

    const handleScrollStory = () => {
      const now = performance.now();
      // Adjust throttling based on device capabilities
      const throttleTime = isLowPerfDevice ? 33 : 16; // 30fps vs 60fps
      if (now - lastScrollTime.current < throttleTime) return;
      lastScrollTime.current = now;

      if (!videoRef.current || !scrollStoryRef.current) return;
      
      // Skip complex animations if user prefers reduced motion
      if (prefersReducedMotion) return;
      
      const video = videoRef.current;
      const container = scrollStoryRef.current;
      const windowHeight = window.innerHeight;
      
      // Calculate scroll progress through the scroll story section
      const scrollTop = window.scrollY;
      const containerTop = container.offsetTop;
      const containerHeight = container.offsetHeight;
      
      // Progress: 0 when container top hits bottom of viewport, 1 when container bottom hits top of viewport
      const progress = Math.max(0, Math.min(1, 
        (scrollTop - containerTop + windowHeight) / (containerHeight + windowHeight)
      ));
      
      // Use requestAnimationFrame for smoother video updates
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
      
      requestRef.current = requestAnimationFrame(() => {
        // Frame-precise video control with improved performance
        if (video.duration && video.readyState >= 2) {
          const targetTime = progress * video.duration;
          // Reduce threshold for more responsive video seeking
          if (Math.abs(video.currentTime - targetTime) > 0.05) {
            try {
              video.currentTime = targetTime;
            } catch (error) {
              console.warn('Failed to seek video:', error);
            }
          }
        }
        
        // Update star field animation speed based on scroll progress
        const starField = container.querySelector('.star-field');
        if (starField) {
          try {
            const speed = 1 + (progress * 2); // Reduce max speed for smoother animation
            (starField as HTMLElement).style.setProperty('--animation-speed', `${speed}s`);
          } catch (error) {
            console.warn('Failed to update star field animation:', error);
          }
        }
        
        // Update text animations with gaps between sections
        const textElements = container.querySelectorAll('.scroll-text');
        textElements.forEach((element, index) => {
          // Delay text animations until video is fully in frame (after 15% of scroll progress)
          const baseDelay = 0.15; // Wait until video is fully visible
          const sectionStart = baseDelay + (index * 0.2); // Start of this section (20% intervals after delay for 3 sections)
          const sectionEnd = sectionStart + 0.15; // Each section lasts 15% (leaving 5% gap)
          
          // For the last text element, end earlier to fade out before next section
          const isLastText = index === textElements.length - 1;
          const adjustedSectionEnd = isLastText ? Math.min(sectionEnd, 0.7) : sectionEnd; // End last text by 70% progress
          
          let opacity = 0;
          let translateY = 50; // Start further down for more pronounced upward movement
          
          if (progress >= sectionStart && progress <= adjustedSectionEnd) {
            // Fade in/out within the section duration
            const sectionDuration = adjustedSectionEnd - sectionStart;
            const sectionProgress = (progress - sectionStart) / sectionDuration;
            
            if (sectionProgress <= 0.3) {
              // Fade in (first 30% of section)
              opacity = sectionProgress / 0.3;
              translateY = 50 * (1 - opacity);
            } else if (sectionProgress >= 0.7) {
              // Fade out (last 30% of section)
              opacity = (1 - sectionProgress) / 0.3;
              // Continue moving up as text fades out
              translateY = -20 * (1 - opacity);
            } else {
              // Fully visible (middle 40% of section)
              opacity = 1;
              translateY = 0;
            }
          } else if (progress > adjustedSectionEnd) {
            // Text has passed - continue moving up
            opacity = 0;
            translateY = -50;
          }
          
          // Add continuous upward movement based on overall progress
          const continuousTranslate = -progress * 30; // Moves up 30px per progress unit
          
          // Use transform3d for better GPU acceleration
          try {
            (element as HTMLElement).style.opacity = opacity.toString();
            (element as HTMLElement).style.transform = `translate3d(-50%, calc(-50% + ${translateY + continuousTranslate}px), 0)`;
          } catch (error) {
            console.warn('Failed to update text animation:', error);
          }
        });
      });
    };

    const handleScroll = () => {
      
      const sections = ['about', 'scroll-story', 'experience', 'education', 'projects', 'competencies', 'contact'];
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

    // Initialize video when it loads with error handling
    const initializeVideo = () => {
      if (videoRef.current) {
        const video = videoRef.current;
        
        const handleLoadedData = () => {
          try {
            video.currentTime = 0;
          } catch (error) {
            console.warn('Failed to set video current time:', error);
          }
        };
        
        const handleError = (error: ErrorEvent) => {
          console.warn('Video failed to load:', error);
        };
        
        video.addEventListener('loadeddata', handleLoadedData);
        video.addEventListener('error', handleError);
        
        return () => {
          video.removeEventListener('loadeddata', handleLoadedData);
          video.removeEventListener('error', handleError);
        };
      }
    };


    const cleanup = observeElements();
    initializeVideo();
    window.addEventListener('scroll', handleScroll);
    
    // Handle keyboard events for modal
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape') {
        setSelectedProject(null);
      }
    };
    
    window.addEventListener('keydown', handleKeyDown);
    
    return () => {
      cleanup();
      cleanupDeviceDetection();
      window.removeEventListener('scroll', handleScroll);
      window.removeEventListener('keydown', handleKeyDown);
      if (requestRef.current) {
        cancelAnimationFrame(requestRef.current);
      }
    };
  }, [isLowPerfDevice, prefersReducedMotion]);

  const scrollToSection = useCallback((sectionId: string) => {
    const element = document.getElementById(sectionId);
    if (element) {
      try {
        element.scrollIntoView({ behavior: 'smooth' });
      } catch (error) {
        console.warn('Failed to scroll to section:', error);
      }
    }
  }, []);

  const navigationItems = useMemo(() => [
    'About', 'Experience', 'Education', 'Projects', 'Competencies', 'Contact'
  ], []);

  return (
    <div className="min-h-screen bg-white font-inter">
      {/* Enhanced Navigation Header */}
      <header className="fixed top-0 left-0 right-0 z-50 bg-white/95 backdrop-blur-sm border-b border-gray-200 transition-all duration-300">
        <nav className="max-w-7xl mx-auto px-6 py-4">
          <div className="flex items-center justify-between">
            {/* Logo/Brand */}
            <div className="text-xl font-semibold text-gray-900">
              J.K.
            </div>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-8">
              {navigationItems.map((item) => (
                <button
                  key={item}
                  onClick={() => scrollToSection(item.toLowerCase())}
                  className={`text-base font-medium transition-colors duration-200 hover:text-blue-600 ${
                    activeSection === item.toLowerCase() ? 'text-blue-600' : 'text-gray-700'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>

            {/* Mobile Menu Button */}
            <button
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="md:hidden p-2 text-gray-700 hover:text-blue-600 transition-colors"
            >
              {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
            </button>
          </div>

          {/* Mobile Menu */}
          {mobileMenuOpen && (
            <div className="md:hidden mt-4 py-4 border-t border-gray-200">
              {navigationItems.map((item) => (
                <button
                  key={item}
                  onClick={() => {
                    scrollToSection(item.toLowerCase());
                    setMobileMenuOpen(false);
                  }}
                  className={`block w-full text-left py-2 px-4 text-base font-medium transition-colors duration-200 hover:text-blue-600 hover:bg-gray-50 ${
                    activeSection === item.toLowerCase() ? 'text-blue-600 bg-blue-50' : 'text-gray-700'
                  }`}
                >
                  {item}
                </button>
              ))}
            </div>
          )}
        </nav>
      </header>

      {/* Redesigned Hero Section */}
      <section id="about" className="relative min-h-screen flex items-center">
        {/* Background Image with Overlay */}
        <div className="absolute inset-0 z-0">
          <img 
            src={heroImage} 
            alt="Workspace" 
            className="w-full h-full object-cover"
          />
          {/* Gradient Overlay for Better Text Contrast */}
          <div className="absolute inset-0 bg-gradient-to-r from-black/60 via-black/40 to-black/60"></div>
        </div>
        
        {/* Content Container */}
        <div className="relative z-10 px-6 py-20">
          <div className="max-w-2xl ml-8">
            {/* Header */}
            <div className="text-left mb-8 fade-in">
              <h1 className="text-4xl md:text-6xl lg:text-7xl font-bold text-white mb-6 leading-tight drop-shadow-lg">
                Joshua A. Kim
              </h1>
            </div>

            {/* Description */}
            <p className="text-lg md:text-xl text-white mb-10 leading-relaxed max-w-xl drop-shadow-md fade-in">
              Computer Science student at Johns Hopkins University with experience in 
              <span className="font-semibold"> machine learning</span>, 
              <span className="font-semibold"> full-stack development</span>, and 
              <span className="font-semibold"> performance optimization</span>. 
              Currently interning at Microsoft, accelerating LLM inference and building scalable AI solutions.
            </p>

            {/* Action Buttons */}
            <div className="flex flex-col sm:flex-row gap-4 fade-in">
              <button 
                onClick={() => scrollToSection('projects')}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center gap-2"
              >
                <span>View My Work</span>
                <ExternalLink size={20} />
              </button>
              
              <a 
                href="JOSHUA_KIM_SWE_INTERNSHIP_RESUME.pdf" 
                target="_blank" 
                rel="noopener noreferrer"
                className="bg-white/20 hover:bg-white/30 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center gap-2 border border-white/30 backdrop-blur-sm"
              >
                <Download size={20} />
                <span>Download Resume</span>
              </a>
            </div>
          </div>
        </div>
        
      </section>

      {/* Scroll Story Section */}
      <section id="scroll-story" className="relative" ref={scrollStoryRef}>
        <div className="h-[350vh] relative">{/* Reduced height for faster transition to education section */}
          {/* Space Flight Container */}
          <div className="sticky top-0 h-screen flex items-center justify-center overflow-hidden bg-black">
            {/* CSS Star Field Background */}
            <div className="star-field">
              <div className="space-travel"></div>
            </div>
            
            {/* Fallback Video (optimized for performance) */}
            {!isLowPerfDevice && (
              <video
                ref={videoRef}
                className="w-full h-full object-cover opacity-50"
                muted
                playsInline
                preload={isLowPerfDevice ? "none" : "auto"}
                style={{
                  transform: 'translateZ(0)', // Force GPU acceleration
                  willChange: 'transform',
                  mixBlendMode: 'screen',
                  filter: 'brightness(0.8) contrast(1.1)'
                }}
                poster="data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 1920 1080'%3E%3Cdefs%3E%3CradialGradient id='space' cx='50%25' cy='50%25' r='50%25'%3E%3Cstop offset='0%25' stop-color='%23000033'/%3E%3Cstop offset='100%25' stop-color='%23000000'/%3E%3C/radialGradient%3E%3C/defs%3E%3Crect width='100%25' height='100%25' fill='url(%23space)'/%3E%3C/svg%3E"
              >
                <source src="https://videos.pexels.com/video-files/4842727/4842727-hd_1920_1080_30fps.mp4" type="video/mp4" />
                <source src="https://videos.pexels.com/video-files/4842727/4842727-uhd_2560_1440_25fps.mp4" type="video/mp4" />
              </video>
            )}
            
            {/* Overlay Text */}
            <div className="absolute inset-0 flex items-center justify-center">
              <div className="text-center text-white max-w-4xl px-8">
                <div className="scroll-text opacity-0">
                  <h2 className="text-4xl md:text-6xl font-bold mb-6">
                    Performance
                  </h2>
                  <p className="text-xl md:text-2xl">
                    At Microsoft, I improved LLM inference latency by <span className="text-cyan-400">94.6%</span> through deep model and pipeline optimization.
                  </p>
                </div>
                
                <div className="scroll-text opacity-0">
                  <h2 className="text-4xl md:text-6xl font-bold mb-6">
                    Innovation
                  </h2>
                  <p className="text-xl md:text-2xl">
                    I co-founded and architected SummerNest, a full-stack housing platform that secured <span className="text-cyan-400">$500</span> in "Spark" start-up funding from Johns Hopkins.
                  </p>
                </div>
                
                <div className="scroll-text opacity-0">
                  <h2 className="text-4xl md:text-6xl font-bold mb-6">
                    Impact
                  </h2>
                  <p className="text-xl md:text-2xl">
                    My data analysis work contributed to a peer-reviewed journal and research presented at a national meeting, impacting over <span className="text-cyan-400">400,000</span> clinicians.
                  </p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Experience Section - Vertical Timeline */}
      <section id="experience" className="section bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="star-field opacity-30"></div>
        
        <div className="container-custom relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-16 text-center fade-in bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Experience
          </h2>
          
          {/* Timeline Container */}
          <div className="max-w-4xl mx-auto relative">
            {/* Vertical Line */}
            <div className="absolute left-8 top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-cyan-500 md:left-1/2 md:transform md:-translate-x-px"></div>
            
            {/* Timeline Items */}
            <div className="space-y-12">
              {/* Microsoft */}
              <div className="timeline-entry group fade-in">
                {/* Timeline Dot */}
                <div className="absolute left-6 w-4 h-4 bg-blue-500 rounded-full border-4 border-white shadow-lg md:left-1/2 md:transform md:-translate-x-1/2 z-10"></div>
                
                {/* Content Container */}
                <div className="ml-20 md:ml-0 md:w-5/12 md:pr-8">
                  <div className="timeline-card-modern bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-xl cursor-pointer">
                    {/* Icon and Title - Always Visible */}
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                        <img src={microsoftLogo} alt="Microsoft" className="w-8 h-8 object-contain"/>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white">Software Engineer Intern</h3>
                        <p className="text-blue-300 font-medium">Microsoft | Feb 2024 - Present</p>
                      </div>
                    </div>
                    
                    {/* Short Description - Always Visible */}
                    <p className="text-gray-300 mb-4">
                      Accelerated LLM inference and built enterprise deployment solutions
                    </p>
                    
                    {/* Expandable Content */}
                    <div className="timeline-expandable-content overflow-hidden transition-all duration-500 ease-out">
                      <div className="pt-4 border-t border-white/20">
                        <h4 className="font-semibold text-white mb-3">Key Achievements:</h4>
                        <ul className="space-y-2 text-gray-300 mb-4">
                          <li className="flex items-start">
                            <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                            94.6% improvement in LLM inference latency (57.1s to 3.1s)
                          </li>
                          <li className="flex items-start">
                            <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                            Engineered CI/CD pipeline reducing overhead by 50+ hours/quarter
                          </li>
                          <li className="flex items-start">
                            <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                            Designed multi-LoRA deployment strategy for quantized models
                          </li>
                        </ul>
                        <div className="flex flex-wrap gap-2">
                          {['TensorRT', 'Azure DevOps', 'C++', 'Python', 'CUDA'].map((tech) => (
                            <span key={tech} className="px-3 py-1 bg-blue-500/20 text-blue-300 rounded-full text-sm font-medium">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* SummerNest */}
              <div className="timeline-entry group fade-in">
                {/* Timeline Dot */}
                <div className="absolute left-6 w-4 h-4 bg-purple-500 rounded-full border-4 border-white shadow-lg md:left-1/2 md:transform md:-translate-x-1/2 z-10"></div>
                
                {/* Content Container - Right side on desktop */}
                <div className="ml-20 md:ml-auto md:w-5/12 md:pl-8">
                  <div className="timeline-card-modern bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-xl cursor-pointer">
                    {/* Icon and Title - Always Visible */}
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                        <Home size={24} className="text-white" />
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white">Co-Founder & Full Stack Developer</h3>
                        <p className="text-purple-300 font-medium">SummerNest | Jul 2024 - Dec 2024</p>
                      </div>
                    </div>
                    
                    {/* Short Description - Always Visible */}
                    <p className="text-gray-300 mb-4">
                      Student housing platform accepted into Johns Hopkins accelerator
                    </p>
                    
                    {/* Expandable Content */}
                    <div className="timeline-expandable-content overflow-hidden transition-all duration-500 ease-out">
                      <div className="pt-4 border-t border-white/20">
                        <h4 className="font-semibold text-white mb-3">Achievements:</h4>
                        <ul className="space-y-2 text-gray-300 mb-4">
                          <li className="flex items-start">
                            <span className="w-2 h-2 bg-purple-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                            Built React.js platform with PostgreSQL backend
                          </li>
                          <li className="flex items-start">
                            <span className="w-2 h-2 bg-purple-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                            Interviewed 20+ stakeholders for market validation
                          </li>
                          <li className="flex items-start">
                            <span className="w-2 h-2 bg-purple-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                            Received $500 grant from "Spark" accelerator program
                          </li>
                        </ul>
                        <div className="flex flex-wrap gap-2">
                          {['React.js', 'Node.js', 'PostgreSQL', 'Express.js', 'JWT'].map((tech) => (
                            <span key={tech} className="px-3 py-1 bg-purple-500/20 text-purple-300 rounded-full text-sm font-medium">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* UW Medicine */}
              <div className="timeline-entry group fade-in">
                {/* Timeline Dot */}
                <div className="absolute left-6 w-4 h-4 bg-cyan-500 rounded-full border-4 border-white shadow-lg md:left-1/2 md:transform md:-translate-x-1/2 z-10"></div>
                
                {/* Content Container */}
                <div className="ml-20 md:ml-0 md:w-5/12 md:pr-8">
                  <div className="timeline-card-modern bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-xl cursor-pointer">
                    {/* Icon and Title - Always Visible */}
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-cyan-500 rounded-lg flex items-center justify-center mr-4 flex-shrink-0">
                        <img src={uwLogo} alt="UW Medicine" className="w-8 h-8 object-cover rounded"/>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white">Health Equity Data Scientist</h3>
                        <p className="text-cyan-300 font-medium">UW Medicine | Jul 2022 - Sep 2023</p>
                      </div>
                    </div>
                    
                    {/* Short Description - Always Visible */}
                    <p className="text-gray-300 mb-4">
                      Analyzed physician survey data impacting 400,000+ clinicians
                    </p>
                    
                    {/* Expandable Content */}
                    <div className="timeline-expandable-content overflow-hidden transition-all duration-500 ease-out">
                      <div className="pt-4 border-t border-white/20">
                        <h4 className="font-semibold text-white mb-3">Research Impact:</h4>
                        <ul className="space-y-2 text-gray-300 mb-4">
                          <li className="flex items-start">
                            <span className="w-2 h-2 bg-cyan-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                            Analyzed national physician survey using R statistical computing
                          </li>
                          <li className="flex items-start">
                            <span className="w-2 h-2 bg-cyan-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                            Published findings in peer-reviewed journal
                          </li>
                          <li className="flex items-start">
                            <span className="w-2 h-2 bg-cyan-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                            Presented research at national medical conference
                          </li>
                        </ul>
                        <div className="flex flex-wrap gap-2">
                          {['R', 'Statistical Analysis', 'Data Visualization', 'Healthcare Research'].map((tech) => (
                            <span key={tech} className="px-3 py-1 bg-cyan-500/20 text-cyan-300 rounded-full text-sm font-medium">
                              {tech}
                            </span>
                          ))}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Education Section */}
      <section id="education" className="section bg-gradient-to-br from-purple-900 via-indigo-900 to-blue-900 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="star-field opacity-20"></div>
        
        <div className="container-custom relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-16 text-center fade-in bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
            Education
          </h2>
          
          <div className="max-w-5xl mx-auto">
            <div className="relative fade-in">
              <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-white/20 rounded-2xl p-8 md:p-12 shadow-2xl hover:shadow-3xl transition-all duration-300 hover:transform hover:-translate-y-2">
                <div className="flex flex-col md:flex-row md:items-start gap-8">
                  {/* University Logo */}
                  <div className="flex-shrink-0">
                    <div className="w-20 h-20">
                      <img 
                        src={hopkinsLogo} 
                        alt="Johns Hopkins University" 
                        className="w-full h-full object-contain rounded-xl"
                      />
                    </div>
                  </div>
                  
                  {/* Main Content */}
                  <div className="flex-1">
                    <div className="mb-6">
                      <div className="inline-block bg-gradient-to-r from-purple-500 to-blue-500 text-white px-4 py-2 rounded-full text-sm font-medium mb-4">
                        Expected May 2027
                      </div>
                      <h3 className="text-3xl md:text-4xl font-bold text-white mb-3 leading-tight">
                        Bachelor of Science, Computer Science
                      </h3>
                      <p className="text-xl text-purple-300 font-semibold mb-2">Johns Hopkins University</p>
                      <p className="text-gray-400">Baltimore, MD</p>
                    </div>
                    
                    {/* Coursework Grid */}
                    <div>
                      <h4 className="text-xl font-semibold text-white mb-4 flex items-center gap-2">
                        <div className="w-1 h-6 bg-gradient-to-b from-purple-400 to-blue-400 rounded-full"></div>
                        Relevant Coursework
                      </h4>
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                        {[
                          'Data Structures',
                          'Algorithms',
                          'Intermediate Programming (C, C++)',
                          'Computer System Fundamentals (Assembly)',
                          'Full-Stack JavaScript',
                          'Machine Translation (PyTorch)',
                          'Databases (SQL)'
                        ].map((course, index) => (
                          <div key={index} className="bg-white/5 backdrop-blur-sm border border-white/10 rounded-lg px-4 py-3 hover:bg-white/10 transition-colors duration-200">
                            <div className="flex items-center gap-3">
                              <div className="w-2 h-2 bg-gradient-to-r from-purple-400 to-blue-400 rounded-full"></div>
                              <span className="text-gray-300 font-medium">{course}</span>
                            </div>
                          </div>
                        ))}
                      </div>
                    </div>
                  </div>
                </div>
                
                {/* Decorative Elements */}
                <div className="absolute top-4 right-4 w-24 h-24 bg-gradient-to-br from-purple-500/20 to-blue-500/20 rounded-full blur-xl"></div>
                <div className="absolute bottom-4 left-4 w-16 h-16 bg-gradient-to-br from-blue-500/20 to-purple-500/20 rounded-full blur-xl"></div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Projects Section */}
      <section id="projects" className="section bg-gradient-to-br from-blue-900 via-purple-900 to-indigo-900 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="star-field opacity-25"></div>
        
        <div className="container-custom relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-16 text-center fade-in bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Featured Projects
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {/* Project 1 */}
            <div className="group project-card bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-white/20 rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-blue-500/25 fade-in">
              <div className="relative h-64 bg-gradient-to-br from-blue-600/20 to-purple-600/20 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 to-purple-500/10"></div>
                <div className="relative z-10">
                  <div className="project-emoji text-8xl mb-2 transition-transform duration-300">🧠</div>
                </div>
                <div className="absolute top-4 right-4 bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-sm font-medium">
                  Machine Learning
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-blue-300 transition-colors">
                  Attention-Based Neural Translator
                </h3>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  Optimized an NMT model processing speed by over 30% through batching experiments and enhanced translation accuracy with beam search optimizations, achieving a 60% increase in BLEU score.
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-sm font-medium">Python</span>
                  <span className="bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-sm font-medium">PyTorch</span>
                  <span className="bg-cyan-500/20 text-cyan-300 px-3 py-1 rounded-full text-sm font-medium">Transformers</span>
                  <span className="bg-green-500/20 text-green-300 px-3 py-1 rounded-full text-sm font-medium">BLEU</span>
                </div>
                <div className="flex gap-3">
                  <a 
                    href="https://github.com/jkim695/neural-translator"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 px-4 py-2 rounded-lg transition-colors font-medium"
                  >
                    <Github size={18} />
                    Code
                  </a>
                  <button 
                    onClick={() => setSelectedProject('neural-translator')}
                    className="flex items-center gap-2 bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 px-4 py-2 rounded-lg transition-colors font-medium"
                  >
                    <ExternalLink size={18} />
                    Details
                  </button>
                </div>
              </div>
            </div>

            {/* Project 2 */}
            <div className="group project-card bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-white/20 rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-purple-500/25 fade-in">
              <div className="relative h-64 bg-gradient-to-br from-purple-600/20 to-pink-600/20 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 to-pink-500/10"></div>
                <div className="relative z-10">
                  <div className="project-emoji text-8xl mb-2 transition-transform duration-300">🏠</div>
                </div>
                <div className="absolute top-4 right-4 bg-purple-500/20 text-purple-300 px-3 py-1 rounded-full text-sm font-medium">
                  Web Platform
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-purple-300 transition-colors">
                  SummerNest
                </h3>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  A React.js platform for facilitating medium-term housing arrangements near college campuses with date filtering and location-based search. Accepted into Johns Hopkins' "Spark" accelerator.
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="bg-cyan-500/20 text-cyan-300 px-3 py-1 rounded-full text-sm font-medium">React.js</span>
                  <span className="bg-green-500/20 text-green-300 px-3 py-1 rounded-full text-sm font-medium">Node.js</span>
                  <span className="bg-yellow-500/20 text-yellow-300 px-3 py-1 rounded-full text-sm font-medium">Express.js</span>
                  <span className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-sm font-medium">PostgreSQL</span>
                </div>
                <div className="flex gap-3">
                  <a 
                    href="https://github.com/jkim695/summernest"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-purple-500/20 hover:bg-purple-500/30 text-purple-300 px-4 py-2 rounded-lg transition-colors font-medium"
                  >
                    <Github size={18} />
                    Code
                  </a>
                  <button 
                    onClick={() => setSelectedProject('summernest')}
                    className="flex items-center gap-2 bg-pink-500/20 hover:bg-pink-500/30 text-pink-300 px-4 py-2 rounded-lg transition-colors font-medium"
                  >
                    <ExternalLink size={18} />
                    Details
                  </button>
                </div>
              </div>
            </div>

            {/* Project 3 */}
            <div className="group project-card bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-white/20 rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-cyan-500/25 fade-in">
              <div className="relative h-64 bg-gradient-to-br from-cyan-600/20 to-blue-600/20 flex items-center justify-center overflow-hidden">
                <div className="absolute inset-0 bg-gradient-to-br from-cyan-500/10 to-blue-500/10"></div>
                <div className="relative z-10">
                  <div className="project-emoji text-8xl mb-2 transition-transform duration-300">📱</div>
                </div>
                <div className="absolute top-4 right-4 bg-cyan-500/20 text-cyan-300 px-3 py-1 rounded-full text-sm font-medium">
                  iOS App
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-2xl font-bold text-white mb-3 group-hover:text-cyan-300 transition-colors">
                  Goalshare
                </h3>
                <p className="text-gray-300 mb-6 leading-relaxed">
                  An iOS app developed in Swift focused on goal setting and progress tracking with Firebase for real-time synchronization, robust authentication, and scalable cloud storage.
                </p>
                <div className="flex flex-wrap gap-2 mb-6">
                  <span className="bg-orange-500/20 text-orange-300 px-3 py-1 rounded-full text-sm font-medium">Swift</span>
                  <span className="bg-yellow-500/20 text-yellow-300 px-3 py-1 rounded-full text-sm font-medium">Firebase</span>
                  <span className="bg-blue-500/20 text-blue-300 px-3 py-1 rounded-full text-sm font-medium">iOS</span>
                  <span className="bg-green-500/20 text-green-300 px-3 py-1 rounded-full text-sm font-medium">Cloud Storage</span>
                </div>
                <div className="flex gap-3">
                  <a 
                    href="https://github.com/jkim695/goalshare"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-2 bg-cyan-500/20 hover:bg-cyan-500/30 text-cyan-300 px-4 py-2 rounded-lg transition-colors font-medium"
                  >
                    <Github size={18} />
                    Code
                  </a>
                  <button 
                    onClick={() => setSelectedProject('goalshare')}
                    className="flex items-center gap-2 bg-blue-500/20 hover:bg-blue-500/30 text-blue-300 px-4 py-2 rounded-lg transition-colors font-medium"
                  >
                    <ExternalLink size={18} />
                    Details
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Core Competencies Section */}
      <section id="competencies" className="section bg-gradient-to-br from-indigo-900 via-purple-900 to-blue-900 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-black/40"></div>
        <div className="star-field opacity-20"></div>
        
        <div className="container-custom relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-16 text-center fade-in bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            Core Competencies
          </h2>
          
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="fade-in competency-item">
              <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-white/20 rounded-2xl p-8 hover:transform hover:-translate-y-2 transition-all duration-300">
                <h3 className="text-2xl md:text-3xl font-semibold text-cyan-400 mb-4 flex items-center gap-3">
                  <div className="w-1 h-8 bg-gradient-to-b from-cyan-400 to-blue-400 rounded-full"></div>
                  Machine Learning & AI
                </h3>
                <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
                  Production-scale AI optimization at <strong className="text-white">Microsoft</strong>, accelerating LLM inference by <strong className="text-cyan-400">94.6%</strong> through custom <strong className="text-white">TensorRT plugins</strong> and improving model accuracy by <strong className="text-cyan-400">98%</strong>. Engineered novel <strong className="text-white">multi-LoRA deployment strategies</strong> and <strong className="text-white">CI/CD pipelines</strong> that saved <strong className="text-cyan-400">50+ hours quarterly</strong>. Expert in <strong className="text-white">Python</strong>, <strong className="text-white">PyTorch</strong>, <strong className="text-white">Azure AI Services</strong>, and production ML deployment.
                </p>
              </div>
            </div>

            <div className="fade-in competency-item">
              <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-white/20 rounded-2xl p-8 hover:transform hover:-translate-y-2 transition-all duration-300">
                <h3 className="text-2xl md:text-3xl font-semibold text-cyan-400 mb-4 flex items-center gap-3">
                  <div className="w-1 h-8 bg-gradient-to-b from-purple-400 to-pink-400 rounded-full"></div>
                  Full-Stack Development
                </h3>
                <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
                  Proficient in creating robust applications with a modern <strong className="text-white">React.js</strong>, <strong className="text-white">Node.js</strong>, and <strong className="text-white">TypeScript</strong> stack, connected to databases like <strong className="text-white">PostgreSQL</strong> and services like <strong className="text-white">Firebase</strong>. Experience building scalable web platforms and RESTful APIs with focus on performance optimization and user experience.
                </p>
              </div>
            </div>

            <div className="fade-in competency-item">
              <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-white/20 rounded-2xl p-8 hover:transform hover:-translate-y-2 transition-all duration-300">
                <h3 className="text-2xl md:text-3xl font-semibold text-cyan-400 mb-4 flex items-center gap-3">
                  <div className="w-1 h-8 bg-gradient-to-b from-blue-400 to-indigo-400 rounded-full"></div>
                  Programming Fundamentals
                </h3>
                <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
                  Strong foundational knowledge of <strong className="text-white">Java</strong>, <strong className="text-white">C++</strong>, and <strong className="text-white">Python</strong>, with expertise in <strong className="text-white">Data Structures</strong>, <strong className="text-white">Algorithms</strong>, and <strong className="text-white">Object-Oriented Programming</strong>. Proven ability to write efficient, maintainable code across multiple paradigms and platforms.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Contact Section */}
      <section id="contact" className="section bg-gradient-to-br from-purple-900 via-blue-900 to-indigo-900 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-black/50"></div>
        <div className="star-field opacity-30"></div>
        
        <div className="container-custom relative z-10">
          <div className="max-w-4xl mx-auto text-center">
            <h2 className="text-4xl md:text-5xl font-bold text-white mb-8 fade-in bg-gradient-to-r from-purple-400 to-blue-400 bg-clip-text text-transparent">
              Let's Connect
            </h2>
            <p className="text-xl text-gray-300 mb-12 fade-in">
              I'm always open to discussing new opportunities, interesting projects, or just having a chat about technology.
            </p>
            
            <div className="flex flex-wrap justify-center gap-6 fade-in">
              <a 
                href="mailto:joshuaakim.cs@gmail.com"
                className="flex items-center gap-3 bg-blue-600 hover:bg-blue-700 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <Mail size={20} />
                Get in Touch
              </a>
              <a 
                href="https://www.linkedin.com/in/josh-kim8/"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-blue-500 hover:bg-blue-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
              >
                <Linkedin size={20} />
                LinkedIn
              </a>
              <a 
                href="https://github.com/jkim695"
                target="_blank"
                rel="noopener noreferrer"
                className="flex items-center gap-3 bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-xl font-semibold transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-1"
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
              © 2025 Joshua A. Kim. All rights reserved.
            </div>
            <div className="flex items-center gap-4">
              <a href="https://github.com/jkim695" className="text-text-tertiary hover:text-accent transition-colors">
                <Github size={18} />
              </a>
              <a href="https://www.linkedin.com/in/josh-kim8/" className="text-text-tertiary hover:text-accent transition-colors">
                <Linkedin size={18} />
              </a>
              <a href="mailto:joshuaakim.cs@gmail.com" className="text-text-tertiary hover:text-accent transition-colors">
                <Mail size={18} />
              </a>
            </div>
          </div>
        </div>
      </footer>

      {/* Project Modal */}
      {selectedProject && (
        <div className="modal-backdrop fixed inset-0 bg-black/85 z-50 flex items-center justify-center p-4">
          <div className="modal-content bg-gradient-to-br from-gray-900 to-gray-800 border border-white/20 rounded-2xl max-w-4xl max-h-[90vh] overflow-y-auto">
            {/* Modal Header */}
            <div className="sticky top-0 bg-gradient-to-r from-gray-900 to-gray-800 border-b border-white/20 p-6 flex items-center justify-between">
              <div className="flex items-center gap-4">
                <div className="w-12 h-12 bg-gradient-to-br from-blue-500 to-purple-600 rounded-lg flex items-center justify-center text-white font-bold text-xl">
                  {selectedProject === 'neural-translator' ? '🧠' : 
                   selectedProject === 'summernest' ? '🏠' : '📱'}
                </div>
                <div>
                  <h2 className="text-2xl font-bold text-white">{projectDetails[selectedProject as keyof typeof projectDetails]?.title}</h2>
                  <p className="text-blue-300 font-medium">{projectDetails[selectedProject as keyof typeof projectDetails]?.category}</p>
                </div>
              </div>
              <button 
                onClick={() => setSelectedProject(null)}
                className="p-2 hover:bg-white/10 rounded-full transition-colors"
              >
                <X size={24} className="text-white" />
              </button>
            </div>

            {/* Modal Content */}
            <div className="p-6 space-y-8">
              {/* Description */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Project Overview</h3>
                <p className="text-gray-300 leading-relaxed mb-6">
                  {projectDetails[selectedProject as keyof typeof projectDetails]?.description}
                </p>
                <div className="bg-white/5 rounded-xl p-6 border border-white/10">
                  <pre className="text-gray-300 leading-relaxed whitespace-pre-wrap font-sans">
                    {projectDetails[selectedProject as keyof typeof projectDetails]?.fullDescription}
                  </pre>
                </div>
              </div>

              {/* Technologies */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Technologies Used</h3>
                <div className="flex flex-wrap gap-3">
                  {projectDetails[selectedProject as keyof typeof projectDetails]?.technologies.map((tech, index) => (
                    <span key={index} className="bg-blue-500/20 text-blue-300 px-3 py-2 rounded-full text-sm font-medium">
                      {tech}
                    </span>
                  ))}
                </div>
              </div>

              {/* Achievements */}
              <div>
                <h3 className="text-xl font-semibold text-white mb-4">Key Achievements</h3>
                <div className="space-y-3">
                  {projectDetails[selectedProject as keyof typeof projectDetails]?.achievements.map((achievement, index) => (
                    <div key={index} className="flex items-start gap-3">
                      <div className="w-2 h-2 bg-green-400 rounded-full mt-2 flex-shrink-0"></div>
                      <p className="text-gray-300">{achievement}</p>
                    </div>
                  ))}
                </div>
              </div>

              {/* Action Buttons */}
              <div className="flex gap-4 pt-6 border-t border-white/20">
                {projectDetails[selectedProject as keyof typeof projectDetails]?.githubUrl && (
                  <a 
                    href={projectDetails[selectedProject as keyof typeof projectDetails]?.githubUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 bg-gray-700 hover:bg-gray-600 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                  >
                    <Github size={20} />
                    View Code
                  </a>
                )}
                {projectDetails[selectedProject as keyof typeof projectDetails]?.demoUrl && (
                  <a 
                    href={projectDetails[selectedProject as keyof typeof projectDetails]?.demoUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex items-center gap-3 bg-blue-600 hover:bg-blue-500 text-white px-6 py-3 rounded-lg font-medium transition-colors"
                  >
                    <ExternalLink size={20} />
                    Live Demo
                  </a>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default Index;
