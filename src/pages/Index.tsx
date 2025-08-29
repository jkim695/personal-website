import React, { useEffect, useState, useRef, useCallback, useMemo } from 'react';
import { Github, ExternalLink, Mail, Linkedin, Download, ChevronDown, Menu, X, Home } from 'lucide-react';
import heroImage from '@/assets/hero-image.png';
import microsoftLogo from '@/assets/Microsoft.png';
import uwLogo from '@/assets/UW.jpg';
import hopkinsLogo from '@/assets/hopkins_logo.png';
import hopkinsBird from '@/assets/hopkinsbird.png';
import attentionNMT from '@/assets/attention_NMT.jpg';
import summernestLogo from '@/assets/summernest.png';
import goalshareLogo from '@/assets/goalshare.png';

const Index = () => {
  const [activeSection, setActiveSection] = useState('about');
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [selectedProject, setSelectedProject] = useState<string | null>(null);
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

    const handleScroll = () => {
      
      const sections = ['about', 'experience', 'education', 'projects', 'competencies', 'contact'];
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
                href="https://jkim695.github.io/resume.pdf" 
                download="Joshua_Kim_Resume.pdf"
                className="bg-white/20 hover:bg-white/30 text-white px-8 py-4 rounded-xl font-semibold text-lg transition-all duration-200 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5 flex items-center justify-center gap-2 border border-white/30 backdrop-blur-sm"
              >
                <Download size={20} />
                <span>Download Resume</span>
              </a>
            </div>
          </div>
        </div>
        
      </section>


      {/* Experience Section - Vertical Timeline */}
      <section id="experience" className="section bg-gradient-to-br from-gray-900 via-blue-900 to-purple-900 relative overflow-hidden">
        {/* Background Effects */}
        <div className="absolute inset-0 bg-black/50"></div>
        
        <div className="container-custom relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-16 text-center fade-in bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Experience
          </h2>
          
          {/* Timeline Container */}
          <div className="max-w-5xl mx-auto relative">
            {/* Vertical Timeline Line - positioned left of center */}
            <div className="absolute left-8 md:left-[30%] top-0 bottom-0 w-0.5 bg-gradient-to-b from-blue-500 via-purple-500 to-cyan-500"></div>
            
            {/* Timeline Items */}
            <div className="space-y-12">
              {/* Microsoft AI Researcher */}
              <div className="timeline-entry group fade-in relative">
                {/* Timeline Dot */}
                <div className="absolute left-6 md:left-[30%] md:-translate-x-1/2 w-4 h-4 bg-blue-500 rounded-full border-4 border-white shadow-lg z-10"></div>
                
                {/* Content Container - All boxes on the right */}
                <div className="ml-20 md:ml-[35%] md:w-[60%]">
                  <div className="timeline-card-modern bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-xl">
                    {/* Icon and Title - Always Visible */}
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mr-4 flex-shrink-0 shadow-lg overflow-hidden">
                        <img src={microsoftLogo} alt="Microsoft" className="w-full h-full object-cover"/>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white">AI/ML Engineer Intern - Azure AI Services</h3>
                        <p className="text-blue-300 font-medium">Microsoft | Feb 2024 - Present | Redmond, WA</p>
                      </div>
                    </div>
                    
                    {/* Short Description - Always Visible */}
                    <p className="text-gray-300 mb-4">
                      Accelerating LLM inference and optimizing AI model deployment
                    </p>
                    
                    {/* Content */}
                    <div>
                      <div className="pt-4 border-t border-white/20">
                        <h4 className="font-semibold text-white mb-3">Key Achievements:</h4>
                        <ul className="space-y-2 text-gray-300 mb-4">
                          <li className="flex items-start">
                            <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                            Accelerated LLM inference latency by 94.6% (from 57.1s to 3.1s) by integrating a custom TensorRT plugin, removing a critical performance bottleneck for multiple GPU-powered applications in Azure AI Services
                          </li>
                          <li className="flex items-start">
                            <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                            Improved model accuracy by adjusting computation parameters in log bucket calculations, reducing output discrepancies between the original model and the plugin-enabled model by 98%
                          </li>
                          <li className="flex items-start">
                            <span className="w-2 h-2 bg-blue-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                            Engineered a novel multi-LoRA deployment strategy for quantized models, overcoming hardware operator limitations by implementing a zero-padding technique to simulate dynamic adapter ranking
                          </li>
                        </ul>
                        <div className="flex flex-wrap gap-2">
                          {['TensorRT', 'PyTorch', 'CUDA', 'Azure AI', 'C++', 'Python'].map((tech) => (
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

              {/* Microsoft Software Engineer */}
              <div className="timeline-entry group fade-in relative">
                {/* Timeline Dot */}
                <div className="absolute left-6 md:left-[30%] md:-translate-x-1/2 w-4 h-4 bg-indigo-500 rounded-full border-4 border-white shadow-lg z-10"></div>
                
                {/* Content Container - All boxes on the right */}
                <div className="ml-20 md:ml-[35%] md:w-[60%]">
                  <div className="timeline-card-modern bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-xl">
                    {/* Icon and Title - Always Visible */}
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mr-4 flex-shrink-0 shadow-lg overflow-hidden">
                        <img src={microsoftLogo} alt="Microsoft" className="w-full h-full object-cover"/>
                      </div>
                      <div>
                        <h3 className="text-lg font-bold text-white">Software Engineer Intern - Azure AI Services</h3>
                        <p className="text-indigo-300 font-medium">Microsoft | Feb 2024 - Nov 2024 | Redmond, WA</p>
                      </div>
                    </div>
                    
                    {/* Short Description - Always Visible */}
                    <p className="text-gray-300 mb-4">
                      Built automation tools and CI/CD pipelines for production systems
                    </p>
                    
                    {/* Content */}
                    <div>
                      <div className="pt-4 border-t border-white/20">
                        <h4 className="font-semibold text-white mb-3">Key Achievements:</h4>
                        <ul className="space-y-2 text-gray-300 mb-4">
                          <li className="flex items-start">
                            <span className="w-2 h-2 bg-indigo-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                            Developed a comprehensive Python script to programmatically scan project repositories, identify outdated dependencies using package manager APIs, and automate the version update process
                          </li>
                          <li className="flex items-start">
                            <span className="w-2 h-2 bg-indigo-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                            Architected and deployed a multi-stage CI/CD pipeline in Azure DevOps that integrated the automation script, triggering validation checks on every commit to ensure system stability
                          </li>
                          <li className="flex items-start">
                            <span className="w-2 h-2 bg-indigo-400 rounded-full mt-2 mr-3 flex-shrink-0"></span>
                            Reduced quarterly engineering overhead by over 50 hours and significantly mitigated security risks by ensuring continuous compliance and eliminating vulnerable components
                          </li>
                        </ul>
                        <div className="flex flex-wrap gap-2">
                          {['Python', 'Azure DevOps', 'CI/CD', 'Git', 'API Integration'].map((tech) => (
                            <span key={tech} className="px-3 py-1 bg-indigo-500/20 text-indigo-300 rounded-full text-sm font-medium">
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
              <div className="timeline-entry group fade-in relative">
                {/* Timeline Dot */}
                <div className="absolute left-6 md:left-[30%] md:-translate-x-1/2 w-4 h-4 bg-purple-500 rounded-full border-4 border-white shadow-lg z-10"></div>
                
                {/* Content Container - All boxes on the right */}
                <div className="ml-20 md:ml-[35%] md:w-[60%]">
                  <div className="timeline-card-modern bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-xl">
                    {/* Icon and Title - Always Visible */}
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mr-4 flex-shrink-0 shadow-lg overflow-hidden relative">
                        <img src={hopkinsBird} alt="Hopkins Blue Jay" className="w-[4.5rem] h-[4.5rem] object-cover transform translate-y-0.5"/>
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
                    
                    {/* Content */}
                    <div>
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
              <div className="timeline-entry group fade-in relative">
                {/* Timeline Dot */}
                <div className="absolute left-6 md:left-[30%] md:-translate-x-1/2 w-4 h-4 bg-cyan-500 rounded-full border-4 border-white shadow-lg z-10"></div>
                
                {/* Content Container - All boxes on the right */}
                <div className="ml-20 md:ml-[35%] md:w-[60%]">
                  <div className="timeline-card-modern bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-white/20 rounded-2xl p-6 shadow-xl">
                    {/* Icon and Title - Always Visible */}
                    <div className="flex items-center mb-4">
                      <div className="w-12 h-12 bg-white rounded-xl flex items-center justify-center mr-4 flex-shrink-0 shadow-lg overflow-hidden">
                        <img src={uwLogo} alt="UW Medicine" className="w-full h-full object-cover"/>
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
                    
                    {/* Content */}
                    <div>
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
                        Expected May 2026
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
        
        <div className="container-custom relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-16 text-center fade-in bg-gradient-to-r from-blue-400 to-purple-400 bg-clip-text text-transparent">
            Featured Projects
          </h2>
          
          <div className="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-8">
            {/* Project 1 */}
            <div className="group project-card bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-white/20 rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-blue-500/25 fade-in">
              <div className="relative h-64 overflow-hidden flex items-center justify-center bg-gradient-to-br from-blue-600/10 to-purple-600/10">
                <img 
                  src={attentionNMT} 
                  alt="Attention-based Neural Machine Translation Architecture" 
                  className="w-[110%] h-[110%] object-contain"
                />
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
                </div>
              </div>
            </div>

            {/* Project 2 */}
            <div className="group project-card bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-white/20 rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-purple-500/25 fade-in">
              <div className="relative h-64 bg-white flex items-center justify-center overflow-hidden">
                <div className="relative z-10 w-full h-full flex items-center justify-center">
                  <img 
                    src={summernestLogo} 
                    alt="SummerNest Logo" 
                    className="max-w-[104%] max-h-[104%] object-contain bg-white rounded-lg"
                  />
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
                </div>
              </div>
            </div>

            {/* Project 3 */}
            <div className="group project-card bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-white/20 rounded-2xl overflow-hidden hover:shadow-2xl hover:shadow-cyan-500/25 fade-in">
              <div className="relative h-64 flex items-center justify-center overflow-hidden" style={{backgroundColor: '#b99e29'}}>
                <div className="relative z-10 w-full h-full flex items-center justify-center">
                  <img 
                    src={goalshareLogo} 
                    alt="Goalshare Logo" 
                    className="max-w-[100%] max-h-[100%] object-contain"
                  />
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
        
        <div className="container-custom relative z-10">
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-16 text-center fade-in bg-gradient-to-r from-indigo-400 to-purple-400 bg-clip-text text-transparent">
            Core Competencies
          </h2>
          
          <div className="max-w-4xl mx-auto space-y-12">
            <div className="fade-in competency-item">
              <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-white/20 rounded-2xl p-8 hover:transform hover:-translate-y-2 transition-all duration-300">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 flex items-center gap-3">
                  <div className="w-1 h-8 bg-gradient-to-b from-cyan-400 to-blue-400 rounded-full"></div>
                  Machine Learning & AI
                </h3>
                <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
                  Production-scale AI optimization at Microsoft, accelerating LLM inference by 94.6% through custom TensorRT plugins and improving model accuracy by 98%. Pioneered innovative multi-LoRA deployment strategies for quantized models, implementing zero-padding techniques to overcome hardware operator limitations and enable dynamic adapter ranking. This breakthrough eliminated critical model loading bottlenecks and significantly improved service performance. Expert in Python, PyTorch, Azure AI Services, and production ML deployment.
                </p>
              </div>
            </div>

            <div className="fade-in competency-item">
              <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-white/20 rounded-2xl p-8 hover:transform hover:-translate-y-2 transition-all duration-300">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 flex items-center gap-3">
                  <div className="w-1 h-8 bg-gradient-to-b from-purple-400 to-pink-400 rounded-full"></div>
                  Full-Stack Development
                </h3>
                <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
                  Proficient in creating robust applications with a modern React.js, Node.js, and TypeScript stack, connected to databases like PostgreSQL and services like Firebase. Experience building scalable web platforms and RESTful APIs with focus on performance optimization and user experience.
                </p>
              </div>
            </div>

            <div className="fade-in competency-item">
              <div className="bg-gradient-to-br from-white/10 to-white/5 backdrop-blur-md border border-white/20 rounded-2xl p-8 hover:transform hover:-translate-y-2 transition-all duration-300">
                <h3 className="text-2xl md:text-3xl font-bold text-white mb-4 flex items-center gap-3">
                  <div className="w-1 h-8 bg-gradient-to-b from-blue-400 to-indigo-400 rounded-full"></div>
                  Programming Fundamentals
                </h3>
                <p className="text-lg md:text-xl text-gray-300 leading-relaxed">
                  Strong foundational knowledge of Java, C++, and Python, with expertise in Data Structures, Algorithms, and Object-Oriented Programming. Proven ability to write efficient, maintainable code across multiple paradigms and platforms.
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
