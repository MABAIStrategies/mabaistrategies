// MAB AI Strategies - Main JavaScript Functionality

// Initialize all components when DOM is loaded
document.addEventListener('DOMContentLoaded', function() {
    initializeAnimations();
    initializeCalculator();
    initializeToolShowcase();
    initializeAssessmentQuiz();
    initializeContactForms();
    initializeNavigation();
    initializeScrollEffects();
});

// Animation Initialization
function initializeAnimations() {
    // Animate elements on scroll
    const observerOptions = {
        threshold: 0.1,
        rootMargin: '0px 0px -50px 0px'
    };

    const observer = new IntersectionObserver((entries) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                entry.target.classList.add('animate-in');
            }
        });
    }, observerOptions);

    // Observe all animatable elements
    document.querySelectorAll('.animate-on-scroll').forEach(el => {
        observer.observe(el);
    });

    // Initialize typewriter effect for hero text
    if (document.querySelector('.typewriter-text')) {
        const typed = new Typed('.typewriter-text', {
            strings: [
                'Transform Healthcare & Telecom Operations',
                'Build Custom AI Agents',
                'Drive Measurable ROI'
            ],
            typeSpeed: 50,
            backSpeed: 30,
            backDelay: 2000,
            loop: true,
            showCursor: true,
            cursorChar: '|'
        });
    }

    // Animate metric counters
    animateCounters();
}

// ROI Calculator Functionality
function initializeCalculator() {
    const calculator = document.getElementById('roi-calculator');
    if (!calculator) return;

    const form = calculator.querySelector('form');
    const resultsDiv = calculator.querySelector('.calculator-results');
    const chartContainer = calculator.querySelector('#roi-chart');

    form.addEventListener('input', calculateROI);
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        showDetailedResults();
    });

    function calculateROI() {
        const industry = form.querySelector('#industry').value;
        const currentHours = parseInt(form.querySelector('#current-hours').value) || 0;
        const teamSize = parseInt(form.querySelector('#team-size').value) || 0;
        const hourlyRate = parseInt(form.querySelector('#hourly-rate').value) || 0;
        const automationPercentage = parseInt(form.querySelector('#automation-percentage').value) || 0;

        // Calculate current annual cost
        const currentAnnualCost = currentHours * teamSize * hourlyRate * 52;
        
        // Calculate potential savings (industry-specific multipliers)
        const industryMultipliers = {
            'healthcare': 0.35,
            'telecom': 0.40,
            'financial': 0.32,
            'manufacturing': 0.30,
            'retail': 0.28,
            'education': 0.25,
            'energy': 0.30,
            'insurance': 0.33,
            'logistics': 0.34,
            'hospitality': 0.26,
            'realestate': 0.27,
            'government': 0.29,
            'legal': 0.31,
            'technology': 0.36,
            'professional': 0.29,
            'other': 0.30
        };
        
        const potentialSavings = currentAnnualCost * (automationPercentage / 100) * industryMultipliers[industry];
        const implementationCost = currentAnnualCost * 0.15; // 15% of current costs
        const netSavings = potentialSavings - implementationCost;
        const roiPercentage = ((netSavings / implementationCost) * 100).toFixed(0);
        const paybackMonths = Math.ceil(implementationCost / (potentialSavings / 12));

        // Update real-time results
        updateResults({
            currentAnnualCost,
            potentialSavings,
            netSavings,
            roiPercentage,
            paybackMonths,
            implementationCost
        });
    }

    function updateResults(data) {
        if (!resultsDiv) return;

        resultsDiv.innerHTML = `
            <div class="grid grid-cols-2 gap-4 mb-6">
                <div class="bg-slate-50 p-4 rounded-lg">
                    <div class="text-2xl font-bold text-slate-800">$${(data.potentialSavings / 1000).toFixed(0)}K</div>
                    <div class="text-sm text-slate-600">Annual Savings</div>
                </div>
                <div class="bg-slate-50 p-4 rounded-lg">
                    <div class="text-2xl font-bold text-copper-600">${data.roiPercentage}%</div>
                    <div class="text-sm text-slate-600">ROI</div>
                </div>
                <div class="bg-slate-50 p-4 rounded-lg">
                    <div class="text-2xl font-bold text-slate-800">${data.paybackMonths}</div>
                    <div class="text-sm text-slate-600">Months Payback</div>
                </div>
                <div class="bg-slate-50 p-4 rounded-lg">
                    <div class="text-2xl font-bold text-copper-600">$${(data.netSavings / 1000).toFixed(0)}K</div>
                    <div class="text-sm text-slate-600">Net Benefit</div>
                </div>
            </div>
        `;

        // Update chart
        updateROIChart(data);
    }

    function updateROIChart(data) {
        if (!chartContainer) return;

        const chart = echarts.init(chartContainer);
        const option = {
            tooltip: {
                trigger: 'axis',
                axisPointer: { type: 'shadow' }
            },
            grid: {
                left: '3%',
                right: '4%',
                bottom: '3%',
                containLabel: true
            },
            xAxis: {
                type: 'category',
                data: ['Current Cost', 'With Automation', 'Savings']
            },
            yAxis: {
                type: 'value',
                axisLabel: {
                    formatter: '${value}K'
                }
            },
            series: [{
                name: 'Annual Cost',
                type: 'bar',
                data: [
                    data.currentAnnualCost / 1000,
                    (data.currentAnnualCost - data.potentialSavings) / 1000,
                    data.potentialSavings / 1000
                ],
                itemStyle: {
                    color: function(params) {
                        const colors = ['#ef4444', '#10b981', '#c17817'];
                        return colors[params.dataIndex];
                    }
                }
            }]
        };

        chart.setOption(option);
    }

    function showDetailedResults() {
        // Show modal with detailed breakdown
        const modal = document.createElement('div');
        modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50';
        modal.innerHTML = `
            <div class="bg-white rounded-lg p-8 max-w-2xl w-full mx-4">
                <h3 class="text-2xl font-bold mb-4">Your AI Automation ROI Analysis</h3>
                <div class="space-y-4">
                    <p>Based on your inputs, here's your personalized automation strategy:</p>
                    <div class="bg-slate-50 p-4 rounded-lg">
                        <h4 class="font-semibold mb-2">Recommended Next Steps:</h4>
                        <ul class="list-disc list-inside space-y-1 text-sm">
                            <li>Schedule a strategy call to discuss implementation timeline</li>
                            <li>Identify 2-3 high-impact processes for initial automation</li>
                            <li>Develop proof-of-concept with measurable KPIs</li>
                        </ul>
                    </div>
                    <div class="flex space-x-4">
                        <button onclick="window.open('https://calendar.app.google/ihniQhQRXbMXFxog6', '_blank')" 
                                class="bg-copper-600 text-white px-6 py-3 rounded-lg hover:bg-copper-700 transition-colors">
                            Schedule Strategy Call
                        </button>
                        <button onclick="this.closest('.fixed').remove()" 
                                class="bg-slate-200 text-slate-700 px-6 py-3 rounded-lg hover:bg-slate-300 transition-colors">
                            Close
                        </button>
                    </div>
                </div>
            </div>
        `;
        document.body.appendChild(modal);
    }
}

// Tool Showcase Functionality
function initializeToolShowcase() {
    const showcase = document.getElementById('tool-showcase');
    if (!showcase) return;

    const tools = [
        {
            name: 'Email Triage Agent',
            description: 'Intelligent email classification and routing',
            category: 'Agents',
            demo: 'email-triage'
        },
        {
            name: 'Lead Qualification System',
            description: 'AI-powered lead scoring and qualification',
            category: 'Automations',
            demo: 'lead-qualification'
        },
        {
            name: 'Business Calculator',
            description: 'ROI analysis and automation planning',
            category: 'Web Apps',
            demo: 'calculator'
        },
        {
            name: 'Process Analyzer',
            description: 'Workflow optimization recommendations',
            category: 'GPTs',
            demo: 'process-analyzer'
        }
    ];

    const container = showcase.querySelector('.tools-grid');
    if (container) {
        container.innerHTML = tools.map(tool => `
            <div class="tool-card bg-white rounded-lg p-6 shadow-lg hover:shadow-xl transition-all duration-300 transform hover:-translate-y-2">
                <div class="flex justify-between items-start mb-4">
                    <h3 class="text-lg font-semibold text-slate-800">${tool.name}</h3>
                    <span class="text-xs bg-slate-100 text-slate-600 px-2 py-1 rounded">${tool.category}</span>
                </div>
                <p class="text-slate-600 mb-4">${tool.description}</p>
                <button onclick="openToolDemo('${tool.demo}')" 
                        class="w-full bg-copper-600 text-white py-2 rounded-lg hover:bg-copper-700 transition-colors">
                    Try Demo
                </button>
            </div>
        `).join('');
    }
}

// Assessment Quiz Functionality
function initializeAssessmentQuiz() {
    const quiz = document.getElementById('ai-assessment-quiz');
    if (!quiz) return;

    const questions = [
        {
            question: "How would you describe your current automation level?",
            options: ["Manual processes", "Some basic automation", "Advanced automation", "AI-driven operations"]
        },
        {
            question: "What's your biggest operational challenge?",
            options: ["Repetitive tasks", "Data processing", "Decision making", "Customer service"]
        },
        {
            question: "How many team members handle repetitive tasks daily?",
            options: ["1-5 people", "6-15 people", "16-50 people", "50+ people"]
        },
        {
            question: "What's your timeline for implementing AI solutions?",
            options: ["Immediately", "3-6 months", "6-12 months", "Exploring options"]
        }
    ];

    let currentQuestion = 0;
    let answers = [];

    function renderQuestion() {
        const questionContainer = quiz.querySelector('.question-container');
        const question = questions[currentQuestion];
        
        questionContainer.innerHTML = `
            <div class="mb-6">
                <div class="flex justify-between items-center mb-4">
                    <span class="text-sm text-slate-600">Question ${currentQuestion + 1} of ${questions.length}</span>
                    <div class="w-32 bg-slate-200 rounded-full h-2">
                        <div class="bg-copper-600 h-2 rounded-full transition-all duration-300" 
                             style="width: ${((currentQuestion + 1) / questions.length) * 100}%"></div>
                    </div>
                </div>
                <h3 class="text-xl font-semibold mb-6">${question.question}</h3>
                <div class="space-y-3">
                    ${question.options.map((option, index) => `
                        <button onclick="selectAnswer(${index})" 
                                class="w-full text-left p-4 rounded-lg border border-slate-200 hover:border-copper-600 hover:bg-copper-50 transition-all duration-200">
                            ${option}
                        </button>
                    `).join('')}
                </div>
            </div>
        `;
    }

    window.selectAnswer = function(answerIndex) {
        answers[currentQuestion] = answerIndex;
        
        if (currentQuestion < questions.length - 1) {
            currentQuestion++;
            setTimeout(renderQuestion, 200);
        } else {
            showQuizResults();
        }
    };

    function showQuizResults() {
        const score = answers.reduce((sum, answer) => sum + answer, 0);
        const maxScore = questions.length * 3;
        const percentage = Math.round((score / maxScore) * 100);
        
        let recommendation = "";
        if (percentage < 30) {
            recommendation = "Perfect candidate for foundational automation. Start with process documentation and basic AI agents.";
        } else if (percentage < 60) {
            recommendation = "Ready for advanced automation. Focus on intelligent workflows and decision-making systems.";
        } else {
            recommendation = "Ideal for AI transformation. Implement comprehensive AI strategy with custom agent development.";
        }

        quiz.innerHTML = `
            <div class="text-center">
                <h3 class="text-2xl font-bold mb-4">Your AI Readiness Score</h3>
                <div class="text-6xl font-bold text-copper-600 mb-4">${percentage}%</div>
                <div class="bg-slate-50 p-6 rounded-lg mb-6">
                    <h4 class="font-semibold mb-2">Recommendation:</h4>
                    <p class="text-slate-700">${recommendation}</p>
                </div>
                <button onclick="window.open('https://calendar.app.google/ihniQhQRXbMXFxog6', '_blank')" 
                        class="bg-copper-600 text-white px-8 py-3 rounded-lg hover:bg-copper-700 transition-colors">
                    Schedule Strategy Call
                </button>
            </div>
        `;
    }

    // Initialize first question
    renderQuestion();
}

// Contact Forms Functionality
function initializeContactForms() {
    const forms = document.querySelectorAll('.contact-form');
    
    forms.forEach(form => {
        form.addEventListener('submit', handleFormSubmit);
    });

    function handleFormSubmit(e) {
        e.preventDefault();
        const form = e.target;
        const formData = new FormData(form);
        
        // Show loading state
        const submitBtn = form.querySelector('button[type="submit"]');
        const originalText = submitBtn.textContent;
        submitBtn.textContent = 'Sending...';
        submitBtn.disabled = true;

        // Simulate form submission
        setTimeout(() => {
            showFormSuccess(form);
            submitBtn.textContent = originalText;
            submitBtn.disabled = false;
            form.reset();
        }, 2000);
    }

    function showFormSuccess(form) {
        const successDiv = document.createElement('div');
        successDiv.className = 'bg-green-100 border border-green-400 text-green-700 px-4 py-3 rounded mb-4';
        successDiv.textContent = 'Thank you! We\'ll be in touch within 24 hours.';
        
        form.insertBefore(successDiv, form.firstChild);
        
        setTimeout(() => {
            successDiv.remove();
        }, 5000);
    }
}

// Navigation Functionality
function initializeNavigation() {
    const nav = document.querySelector('nav');
    const mobileMenuBtn = document.querySelector('.mobile-menu-btn');
    const mobileMenu = document.querySelector('.mobile-menu');

    // Sticky nav with background transition
    window.addEventListener('scroll', () => {
        if (window.scrollY > 100) {
            nav.classList.add('bg-white', 'shadow-lg');
            nav.classList.remove('bg-transparent');
        } else {
            nav.classList.remove('bg-white', 'shadow-lg');
            nav.classList.add('bg-transparent');
        }
    });

    // Mobile menu toggle
    if (mobileMenuBtn && mobileMenu) {
        mobileMenuBtn.addEventListener('click', () => {
            mobileMenu.classList.toggle('hidden');
        });
    }

    // Smooth scroll for anchor links
    document.querySelectorAll('a[href^="#"]').forEach(anchor => {
        anchor.addEventListener('click', function (e) {
            e.preventDefault();
            const target = document.querySelector(this.getAttribute('href'));
            if (target) {
                target.scrollIntoView({
                    behavior: 'smooth',
                    block: 'start'
                });
            }
        });
    });
}

// Scroll Effects
function initializeScrollEffects() {
    // Parallax effect for hero background
    window.addEventListener('scroll', () => {
        const scrolled = window.pageYOffset;
        const heroBackground = document.querySelector('.hero-background');
        
        if (heroBackground) {
            const speed = scrolled * 0.5;
            heroBackground.style.transform = `translateY(${speed}px)`;
        }
    });
}

// Utility Functions
function animateCounters() {
    const counters = document.querySelectorAll('.counter');
    
    counters.forEach(counter => {
        const target = parseInt(counter.getAttribute('data-target'));
        const duration = 2000;
        const increment = target / (duration / 16);
        let current = 0;
        
        const timer = setInterval(() => {
            current += increment;
            if (current >= target) {
                current = target;
                clearInterval(timer);
            }
            counter.textContent = Math.floor(current).toLocaleString();
        }, 16);
    });
}

function openToolDemo(toolType) {
    // Create modal for tool demonstration
    const modal = document.createElement('div');
    modal.className = 'fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4';
    
    let demoContent = '';
    
    switch(toolType) {
        case 'email-triage':
            demoContent = `
                <div class="text-center">
                    <h3 class="text-2xl font-bold mb-4">Email Triage Agent Demo</h3>
                    <div class="bg-slate-100 p-4 rounded-lg mb-4">
                        <p class="text-sm text-slate-600 mb-2">Sample Email:</p>
                        <p class="text-sm">"Need to schedule quarterly review meeting for healthcare team"</p>
                    </div>
                    <div class="bg-green-100 p-4 rounded-lg mb-4">
                        <p class="text-sm text-green-800">AI Classification: Meeting Request → Calendar Management</p>
                        <p class="text-sm text-green-800">Action: Create calendar event, send availability options</p>
                    </div>
                    <p class="text-sm text-slate-600 mb-4">
                        This agent automatically categorizes emails, extracts key information, and triggers appropriate workflows.
                    </p>
                </div>
            `;
            break;
        case 'lead-qualification':
            demoContent = `
                <div class="text-center">
                    <h3 class="text-2xl font-bold mb-4">Lead Qualification System</h3>
                    <div class="space-y-3 mb-4">
                        <div class="flex justify-between items-center p-3 bg-slate-100 rounded">
                            <span>Company Size:</span>
                            <span class="font-semibold">500+ employees</span>
                        </div>
                        <div class="flex justify-between items-center p-3 bg-slate-100 rounded">
                            <span>Budget Range:</span>
                            <span class="font-semibold">$50K-$100K</span>
                        </div>
                        <div class="flex justify-between items-center p-3 bg-slate-100 rounded">
                            <span>Decision Timeline:</span>
                            <span class="font-semibold">3-6 months</span>
                        </div>
                    </div>
                    <div class="bg-copper-100 p-4 rounded-lg mb-4">
                        <p class="text-sm font-semibold text-copper-800">Lead Score: 85/100 (High Priority)</p>
                        <p class="text-sm text-copper-700">Recommended Action: Schedule discovery call</p>
                    </div>
                </div>
            `;
            break;
        default:
            demoContent = `
                <div class="text-center">
                    <h3 class="text-2xl font-bold mb-4">Tool Demo</h3>
                    <p class="text-slate-600 mb-4">This tool demonstrates AI automation capabilities.</p>
                    <p class="text-sm text-slate-500">Full version available after consultation.</p>
                </div>
            `;
    }
    
    modal.innerHTML = `
        <div class="bg-white rounded-lg p-8 max-w-lg w-full mx-4">
            ${demoContent}
            <div class="flex space-x-4 mt-6">
                <button onclick="window.open('https://calendar.app.google/ihniQhQRXbMXFxog6', '_blank')" 
                        class="flex-1 bg-copper-600 text-white px-6 py-3 rounded-lg hover:bg-copper-700 transition-colors">
                    Schedule Full Demo
                </button>
                <button onclick="this.closest('.fixed').remove()" 
                        class="flex-1 bg-slate-200 text-slate-700 px-6 py-3 rounded-lg hover:bg-slate-300 transition-colors">
                    Close
                </button>
            </div>
        </div>
    `;
    
    document.body.appendChild(modal);
}

// Export functions for global access
window.openToolDemo = openToolDemo;
window.toggleFAQ = toggleFAQ;
window.generateCaseStudy = generateCaseStudy;
window.closeServiceModal = closeServiceModal;

// FAQ Toggle Function
function toggleFAQ(button) {
    const faqItem = button.closest('.faq-item');
    const isActive = faqItem.classList.contains('active');
    
    // Close all FAQ items
    document.querySelectorAll('.faq-item').forEach(item => {
        item.classList.remove('active');
        const icon = item.querySelector('svg');
        icon.style.transform = 'rotate(0deg)';
    });
    
    // Open clicked item if it wasn't already active
    if (!isActive) {
        faqItem.classList.add('active');
        const icon = button.querySelector('svg');
        icon.style.transform = 'rotate(180deg)';
    }
}

// Case Study Generator Function
function generateCaseStudy() {
    const industry = document.getElementById('cs-industry').value;
    const size = document.getElementById('cs-size').value;
    const challenge = document.getElementById('cs-challenge').value;
    
    const caseStudies = {
        'healthcare': {
            'manual-tasks': {
                title: 'Regional Healthcare Network Automates Patient Intake',
                company: 'Midwest Health Partners (450 providers)',
                challenge: 'Manual patient intake and insurance verification consuming 40+ staff hours daily',
                solution: 'Custom AI agent for intelligent document processing and automated verification',
                results: ['75% reduction in admin time', '$1.8M annual savings', 'Zero HIPAA violations', 'Improved patient satisfaction scores']
            },
            'data-insights': {
                title: 'Healthcare System Unlocks Revenue Opportunities',
                company: 'Central Valley Medical (280 beds)',
                challenge: 'Missing revenue optimization opportunities in patient data and billing patterns',
                solution: 'AI-powered analytics platform for revenue cycle management and pattern recognition',
                results: ['$3.2M additional revenue identified', '95% accuracy in billing optimization', 'Real-time dashboard implementation', '30% faster claim processing']
            }
        },
        'telecom': {
            'customer-service': {
                title: 'Regional Telecom Improves Customer Experience',
                company: 'Great Lakes Communications (125K subscribers)',
                challenge: 'High call volume and long resolution times impacting customer satisfaction',
                solution: 'AI-powered customer service automation with intelligent routing and response systems',
                results: ['60% reduction in call volume', '45% faster resolution times', 'Customer satisfaction increased 28%', '$2.1M annual operational savings']
            },
            'compliance': {
                title: 'Telecom Provider Streamlines Regulatory Compliance',
                company: 'Mountain State Telecom (75K subscribers)',
                challenge: 'Complex regulatory reporting requirements consuming significant resources',
                solution: 'Automated compliance monitoring and reporting system with AI-powered data validation',
                results: ['90% reduction in compliance effort', '100% accuracy in regulatory filings', '50% faster audit preparation', 'Eliminated compliance penalties']
            }
        }
    };
    
    // Default case study for combinations not explicitly defined
    const defaultStudy = {
        title: 'Mid-Market Company Achieves Breakthrough Results',
        company: 'Similar to your profile',
        challenge: 'Operational inefficiencies limiting growth and profitability',
        solution: 'Comprehensive AI automation strategy with custom agent development',
        results: ['65% process improvement', '$1.5M+ cost savings', 'Enhanced decision making', 'Scalable automation platform']
    };
    
    const study = caseStudies[industry]?.[challenge] || defaultStudy;
    
    document.getElementById('case-study-result').innerHTML = `
        <div class="bg-white rounded-lg p-8 shadow-lg">
            <h3 class="text-2xl font-bold text-slate-800 mb-4">${study.title}</h3>
            <div class="grid md:grid-cols-2 gap-6 mb-6">
                <div>
                    <h4 class="font-semibold text-slate-700 mb-2">Company Profile</h4>
                    <p class="text-slate-600">${study.company}</p>
                </div>
                <div>
                    <h4 class="font-semibold text-slate-700 mb-2">Challenge</h4>
                    <p class="text-slate-600">${study.challenge}</p>
                </div>
            </div>
            <div class="mb-6">
                <h4 class="font-semibold text-slate-700 mb-2">Solution</h4>
                <p class="text-slate-600">${study.solution}</p>
            </div>
            <div class="mb-6">
                <h4 class="font-semibold text-slate-700 mb-4">Results Achieved</h4>
                <div class="grid md:grid-cols-2 gap-3">
                    ${study.results.map(result => `
                        <div class="flex items-center">
                            <div class="w-2 h-2 bg-copper-600 rounded-full mr-3"></div>
                            <span class="text-slate-600">${result}</span>
                        </div>
                    `).join('')}
                </div>
            </div>
            <div class="text-center">
                <a href="https://calendar.app.google/ihniQhQRXbMXFxog6" target="_blank" 
                   class="bg-copper-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-copper-700 transition-colors">
                    Get Your Custom Strategy
                </a>
            </div>
        </div>
    `;
    
    document.getElementById('case-study-result').classList.remove('hidden');
    document.getElementById('case-study-result').scrollIntoView({ behavior: 'smooth' });
}

// Service Modal Functions
function showServiceDetails(serviceType) {
    const modal = document.getElementById('service-modal');
    const content = document.getElementById('service-modal-content');
    
    const serviceDetails = {
        'ai-agents': {
            title: 'Custom AI Agent Development',
            description: 'Intelligent agents designed specifically for your business processes and decision-making workflows.',
            features: [
                'Natural Language Processing for document analysis',
                'Machine learning models trained on your data',
                'Integration with existing systems and workflows',
                'Real-time decision support and recommendations',
                'Continuous learning and optimization',
                'HIPAA and compliance-ready architectures'
            ],
            useCases: [
                'Healthcare: Patient intake and insurance verification',
                'Telecom: Network monitoring and incident response',
                'General: Email triage and automated responses',
                'Sales: Lead qualification and opportunity scoring',
                'Operations: Quality control and anomaly detection'
            ],
            timeline: '4-8 weeks for initial deployment',
            pricing: 'Starting at $25,000 for custom agent development'
        },
        'automation': {
            title: 'Process Automation Systems',
            description: 'Comprehensive workflow automation that connects your systems and eliminates manual processes.',
            features: [
                'End-to-end workflow orchestration',
                'Multi-system integration and data synchronization',
                'Automated exception handling and escalation',
                'Performance monitoring and optimization',
                'Scalable architecture for growing businesses',
                'Comprehensive audit trails and reporting'
            ],
            useCases: [
                'Claims processing and approval workflows',
                'Customer onboarding and lifecycle management',
                'Invoice processing and payment automation',
                'Inventory management and reordering',
                'Employee onboarding and HR processes'
            ],
            timeline: '6-12 weeks for full implementation',
            pricing: 'Starting at $35,000 for comprehensive automation'
        },
        'consulting': {
            title: 'AI Strategy Consulting',
            description: 'Expert guidance to develop and execute your AI transformation strategy with measurable business outcomes.',
            features: [
                'AI readiness assessment and gap analysis',
                'Custom AI strategy and roadmap development',
                'ROI modeling and business case creation',
                'Vendor evaluation and technology selection',
                'Change management and team training',
                'Ongoing optimization and performance monitoring'
            ],
            useCases: [
                'Digital transformation initiative leadership',
                'AI center of excellence establishment',
                'Technology stack optimization',
                'Team capability building and training',
                'Strategic planning and budget allocation'
            ],
            timeline: '8-16 weeks for comprehensive strategy',
            pricing: 'Starting at $15,000 for strategic assessment'
        }
    };
    
    const service = serviceDetails[serviceType];
    
    content.innerHTML = `
        <div class="p-8">
            <div class="flex justify-between items-start mb-6">
                <h2 class="text-3xl font-bold text-slate-800">${service.title}</h2>
                <button onclick="closeServiceModal()" class="text-slate-400 hover:text-slate-600">
                    <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12"></path>
                    </svg>
                </button>
            </div>
            
            <p class="text-lg text-slate-600 mb-8">${service.description}</p>
            
            <div class="grid md:grid-cols-2 gap-8 mb-8">
                <div>
                    <h3 class="text-xl font-bold text-slate-800 mb-4">Key Features</h3>
                    <ul class="space-y-2">
                        ${service.features.map(feature => `
                            <li class="flex items-start">
                                <div class="w-2 h-2 bg-copper-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                <span class="text-slate-600">${feature}</span>
                            </li>
                        `).join('')}
                    </ul>
                </div>
                
                <div>
                    <h3 class="text-xl font-bold text-slate-800 mb-4">Common Use Cases</h3>
                    <ul class="space-y-2">
                        ${service.useCases.map(useCase => `
                            <li class="flex items-start">
                                <div class="w-2 h-2 bg-copper-600 rounded-full mt-2 mr-3 flex-shrink-0"></div>
                                <span class="text-slate-600">${useCase}</span>
                            </li>
                        `).join('')}
                    </ul>
                </div>
            </div>
            
            <div class="bg-slate-50 p-6 rounded-lg mb-8">
                <div class="grid md:grid-cols-2 gap-6">
                    <div>
                        <h4 class="font-semibold text-slate-800 mb-2">Implementation Timeline</h4>
                        <p class="text-slate-600">${service.timeline}</p>
                    </div>
                    <div>
                        <h4 class="font-semibold text-slate-800 mb-2">Investment Range</h4>
                        <p class="text-slate-600">${service.pricing}</p>
                    </div>
                </div>
            </div>
            
            <div class="flex space-x-4">
                <a href="https://calendar.app.google/ihniQhQRXbMXFxog6" target="_blank" 
                   class="flex-1 bg-copper-600 text-white px-6 py-3 rounded-lg font-semibold hover:bg-copper-700 transition-colors text-center">
                    Schedule Consultation
                </a>
                <button onclick="closeServiceModal()" 
                        class="flex-1 bg-slate-200 text-slate-700 px-6 py-3 rounded-lg font-semibold hover:bg-slate-300 transition-colors">
                    Close
                </button>
            </div>
        </div>
    `;
    
    modal.classList.remove('hidden');
}

function closeServiceModal() {
    document.getElementById('service-modal').classList.add('hidden');
}

// Close modal when clicking outside
document.addEventListener('DOMContentLoaded', function() {
    const serviceModal = document.getElementById('service-modal');
    if (serviceModal) {
        serviceModal.addEventListener('click', function(e) {
            if (e.target === this) {
                closeServiceModal();
            }
        });
    }
});