/* ==========================================================================
   Portfolio content — edit THIS file to add/change skills, projects, certs.
   level: 3 = Core expertise · 2 = Production experience · 1 = Working knowledge
   ========================================================================== */
window.PORTFOLIO = {
  contact: {
    whatsapp: "919100850087",
    linkedin: "https://www.linkedin.com/in/murthujavali-pinjari18/",
    github: "https://github.com/PinjariMurthujavali",
    youtube: "https://www.youtube.com/@Syntaxsolver-u5m",
    web3formsKey: "438c0f65-2c35-47a5-af69-c82f483de4f2" // public by design (Web3Forms access keys are client-side)
  },

  roles: ["run hospitals", "automate payroll", "connect CRMs end to end", "ship on Frappe Cloud", "sync biometric devices", "lead teams to release"],

  luckyLines: [
    "Namaste! 🙏 I'm Lucky, Murthu's sidekick.",
    "He ships ERP features end to end. Try Quick jump: Ctrl + K ⚡",
    "Fun fact: his attendance engine runs every 5 minutes ⏱️",
    "Hiring? WhatsApp is the fastest way to reach him 💬",
    "Scroll down, the case studies are my favourite 👇",
    "Psst… dark or light? Tap the moon ☾"
  ],

  skills: [
    { emoji: "⚙️", title: "Frappe & ERPNext", items: [
      ["fas fa-cogs", "Frappe Framework", 3], ["fas fa-building", "ERPNext", 2], ["fas fa-cloud", "Frappe Cloud", 2],
      ["fas fa-puzzle-piece", "Custom DocTypes", 2], ["fas fa-plug", "Frappe REST API", 2], ["fas fa-hospital", "Hospital Management ERP", 2] ] },
    { emoji: "🐍", title: "Python & Backend", items: [
      ["fab fa-python", "Python", 3], ["fas fa-layer-group", "Django", 2], ["fas fa-server", "REST APIs", 2],
      ["fas fa-database", "SQL / MySQL", 2], ["fas fa-code", "Java", 2], ["fab fa-docker", "Docker", 1] ] },
    { emoji: "🌐", title: "Frontend", items: [
      ["fab fa-html5", "HTML5", 3], ["fab fa-css3-alt", "CSS3", 3], ["fab fa-js-square", "JavaScript", 2],
      ["fab fa-react", "React", 2], ["fab fa-bootstrap", "Bootstrap", 2], ["fab fa-node-js", "Node.js", 1] ] },
    { emoji: "📦", title: "WordPress & CMS", items: [
      ["fab fa-wordpress", "WordPress", 3], ["fas fa-shopping-cart", "WooCommerce", 2], ["fas fa-tools", "Beaver Builder", 2],
      ["fas fa-search", "SEO Optimization", 2], ["fas fa-plug", "Plugin Development", 2], ["fas fa-paint-brush", "Theme Customization", 3] ] },
    { emoji: "🛠️", title: "DevOps & Tools", items: [
      ["fab fa-git-alt", "Git & GitHub", 3], ["fab fa-linux", "Linux / CLI", 2], ["fas fa-cloud-upload-alt", "Deployment & Hosting", 2],
      ["fas fa-vial", "Unit / Integration Testing", 1], ["fas fa-users-cog", "Team Leadership", 3], ["fas fa-project-diagram", "Agile / Scrum", 2] ] },
    { emoji: "🧠", title: "Core CS", items: [
      ["fas fa-brain", "DSA", 3], ["fas fa-sitemap", "System Design", 2], ["fas fa-database", "Database Design", 2],
      ["fas fa-code-branch", "OOP Concepts", 3], ["fas fa-robot", "AI Integration", 1], ["fas fa-lock", "API Security", 2] ] }
  ],

  // cat: erp | ai | python | java | web   ·   extra projects are collapsed under "All"
  projects: [
    { cat: "erp", feat: true, icon: "fas fa-hospital-alt", badge: "🏥 ERPNext", title: "Hospital Management System — ERPNext & Frappe",
      desc: "Enterprise-grade Hospital Management System built on ERPNext using Frappe Framework. Patient registration, appointment scheduling, billing, pharmacy management, lab reports, doctor schedules, inventory and real-time dashboards, deployed on Frappe Cloud for high availability.",
      role: "Development team member on the ERP build", result: "Live in production on Frappe Cloud",
      tech: ["ERPNext", "Frappe", "Python", "Frappe Cloud", "JavaScript", "MariaDB"], links: [{ t: "private", l: "Confidential client project" }] },
    { cat: "erp", feat: true, icon: "fas fa-users-cog", badge: "⚙️ Frappe", title: "BCRM — CRM & Field Operations Platform",
      desc: "Internal CRM for Brilliant Technologies built on Frappe, covering Lead → Opportunity → Customer → AMC/renewal. Live employee status dashboard (GPS check-in/out with reverse geocoding and road distance), Customer 360 dashboards, a smart activity timeline across 7+ doctypes and a “Nearby Clients” locator using GPS haversine matching with pincode/city fallback.",
      role: "Sole designer & builder", result: "Now the team's single system of record from lead to renewal",
      tech: ["Frappe", "Python", "Server Scripts", "Client Scripts", "REST API", "MariaDB"], links: [{ t: "private", l: "Internal platform — Brilliant Technologies" }] },
    { cat: "erp", icon: "fas fa-fingerprint", badge: "⚙️ Frappe", title: "HR Attendance Automation & Biometric Integration",
      desc: "End-to-end HR attendance on Frappe: an automated remarks engine (grace period, late entry, early exit, missing punch, weekly off, holiday and sandwich rule) on a bulk-optimized 5-minute scheduler, plus Python middleware syncing a ZKTeco device to Frappe Cloud over REST with SQLite deduplication. Drives payroll deductions and bonuses on the Salary Slip.",
      role: "Sole designer & builder", result: "Attendance & payroll rules run automatically company-wide",
      tech: ["Frappe", "Python", "REST API", "SQLite", "Scheduled Jobs"], links: [{ t: "private", l: "Internal platform — Brilliant Technologies" }] },
    { cat: "erp", icon: "fas fa-industry", badge: "ERPNext", title: "Manufacturing ERP Customization",
      desc: "ERPNext Manufacturing customization: BOM and Work Order workflows, production planning, stock tracking and shop-floor reporting, with custom fields, role-based permissions and print formats for the client's process.",
      tech: ["ERPNext", "Frappe", "Python", "Custom DocTypes"], links: [{ t: "private", l: "Confidential client project" }] },
    { cat: "erp", icon: "fas fa-money-check-alt", badge: "⚙️ Integration", title: "Payment & Accounting Integrations",
      desc: "Razorpay payment gateway on Quotation and Sales Order (server-script only, no custom app), plus an ERPNext-to-Tally Prime sync tool that pushes submitted Sales Invoices into Tally via XML.",
      tech: ["Frappe", "Python", "Razorpay API", "Tally XML"], links: [{ t: "private", l: "Internal platform — Brilliant Technologies" }] },
    { cat: "ai", icon: "fas fa-robot", badge: "🤖 AI", extraBadge: "🆕 In progress", title: "AI Chatbot for ERPNext",
      desc: "An in-development conversational assistant embedded in Frappe/ERPNext through a Workspace Custom HTML Block and Client Script chat widget, backed by a Python REST endpoint, to answer CRM and HR questions inside the workspace.",
      tech: ["Frappe", "Python", "REST API", "LLM Integration"], links: [{ t: "private", l: "In development", icon: "fas fa-code-branch" }] },
    { cat: "erp", icon: "fas fa-cogs", badge: "⚙️ Frappe", title: "Custom Frappe Application",
      desc: "Custom business-workflow app on Frappe with custom DocTypes, server/client scripts and REST APIs for integration.",
      tech: ["Frappe", "Python", "Custom DocTypes", "REST API"], links: [{ t: "private", l: "Confidential client project" }] },
    { cat: "erp", icon: "fas fa-chart-line", badge: "ERPNext", title: "ERPNext Business Customization",
      desc: "Custom ERPNext modules for inventory, purchase workflows and reports with role-based permissions tailored to the business.",
      tech: ["ERPNext", "Frappe", "Python", "Jinja"], links: [{ t: "private", l: "Confidential client project" }] },

    { cat: "web", icon: "fas fa-user-circle", badge: "Web", title: "Portfolio Website",
      desc: "Personal portfolio with animations, timeline experience, project showcases and a contact form.",
      tech: ["HTML", "CSS", "JavaScript"], links: [{ t: "demo", l: "Live", href: "https://pinjarimurthujavali.github.io/Portfolio_website/" }, { t: "gh", l: "GitHub", href: "https://github.com/PinjariMurthujavali/Portfolio_website" }] },
    { cat: "web", icon: "fas fa-female", badge: "Web", title: "Tech Women Empowerment",
      desc: "A web platform empowering girls through interactive learning and technology-driven education with mentorship pathways.",
      tech: ["HTML", "CSS", "JavaScript"], links: [{ t: "demo", l: "Live", href: "https://pinjarimurthujavali.github.io/Tech-For-Girl---Empower-Learn/" }, { t: "gh", l: "GitHub", href: "https://github.com/PinjariMurthujavali/Tech-For-Girl---Empower-Learn" }] },
    { cat: "web", img: "assets/img/weather-dashboard.webp", alt: "Weather Dashboard screenshot", badge: "Web", title: "Weather Dashboard",
      desc: "Dynamic weather dashboard with real-time forecasts, location-based updates and clean data visualizations.",
      tech: ["HTML", "CSS", "JavaScript", "Weather API"], links: [{ t: "demo", l: "Live", href: "https://pinjarimurthujavali.github.io/Project-23---Weather-Dashboard/" }, { t: "gh", l: "GitHub", href: "https://github.com/PinjariMurthujavali/Project-23---Weather-Dashboard/" }] },
    { cat: "web", img: "assets/img/quiz-game.webp", alt: "Interactive Quiz Game screenshot", badge: "Game", title: "Interactive Quiz Game",
      desc: "Interactive quiz game with instant score calculation, timer and multiple difficulty levels.",
      tech: ["HTML", "CSS", "JavaScript"], links: [{ t: "demo", l: "Live", href: "https://pinjarimurthujavali.github.io/Project-1---Quiz-Game/" }, { t: "gh", l: "GitHub", href: "https://github.com/PinjariMurthujavali/Project-1---Quiz-Game" }] },
    { cat: "web", img: "assets/img/speech-reader.webp", alt: "Speech-to-Text Reader screenshot", badge: "AI Web", title: "Speech-to-Text Reader",
      desc: "Converts spoken words to text instantly using the Web Speech API, with multilingual support.",
      tech: ["HTML", "CSS", "JavaScript", "Web Speech API"], links: [{ t: "demo", l: "Live", href: "https://pinjarimurthujavali.github.io/Project-24-Speech-text-reader/" }, { t: "gh", l: "GitHub", href: "https://github.com/PinjariMurthujavali/Project-24-Speech-text-reader" }] },
    { cat: "web", img: "assets/img/qr-generator.webp", alt: "QR Code Generator screenshot", badge: "Tool", title: "QR Code Generator",
      desc: "Instantly generate custom QR codes from any text or URL, with download options and custom colors.",
      tech: ["HTML", "CSS", "JavaScript"], links: [{ t: "gh", l: "GitHub", href: "https://github.com/PinjariMurthujavali/PROJECT-2-QR-CODE-GENERATOR" }] },
    { cat: "web", img: "assets/img/notes-app.webp", alt: "Notes Application screenshot", badge: "App", title: "Notes Application",
      desc: "Responsive notes app with local-storage persistence, search and smooth UX for quick note-taking.",
      tech: ["HTML", "CSS", "JavaScript", "localStorage"], links: [] },

    { cat: "python", icon: "fas fa-user-graduate", badge: "Python / Django", title: "Student Management System",
      desc: "Full-stack Django app to manage student records, attendance, marks and course enrollment, with an admin dashboard, role-based login and search/filter reports.",
      tech: ["Python", "Django", "SQLite", "Bootstrap"], links: [{ t: "private", l: "Academic project", icon: "fas fa-graduation-cap" }] },
    { cat: "python", icon: "fas fa-book-reader", badge: "Python / Django", title: "Library Management System",
      desc: "Django library system for book cataloguing, issue/return tracking, due-date reminders and member management with a clean staff dashboard.",
      tech: ["Python", "Django", "MySQL", "HTML/CSS"], links: [{ t: "private", l: "Academic project", icon: "fas fa-graduation-cap" }] },
    { cat: "python", icon: "fas fa-shopping-basket", badge: "Python / Django", title: "Online Shopping Cart System",
      desc: "Basic e-commerce app in Django: product catalog, cart, checkout flow and order history with simple authentication.",
      tech: ["Python", "Django", "SQLite"], links: [{ t: "private", l: "Academic project", icon: "fas fa-graduation-cap" }] },
    { cat: "java", icon: "fas fa-id-badge", badge: "Java Full Stack", title: "Employee Management System",
      desc: "Java full-stack app to manage employee records, departments, attendance and payroll, built with Spring Boot REST APIs and a JDBC/MySQL backend.",
      tech: ["Java", "Spring Boot", "JDBC", "MySQL", "HTML/CSS"], links: [{ t: "private", l: "Academic project", icon: "fas fa-graduation-cap" }] },
    { cat: "java", icon: "fas fa-university", badge: "Java Full Stack", title: "Bank Management System",
      desc: "Core banking simulation in Java: account creation, deposits/withdrawals, balance enquiry and transaction history on a JDBC-connected MySQL database.",
      tech: ["Java", "Servlets/JSP", "JDBC", "MySQL"], links: [{ t: "private", l: "Academic project", icon: "fas fa-graduation-cap" }] },
    { cat: "java", icon: "fas fa-hotel", badge: "Java Full Stack", title: "Hotel Reservation System",
      desc: "Java web app for room booking, availability checks, billing and customer management, built with Spring MVC and a relational database.",
      tech: ["Java", "Spring MVC", "MySQL", "Bootstrap"], links: [{ t: "private", l: "Academic project", icon: "fas fa-graduation-cap" }] }
  ],

  certs: [
    ["fas fa-cogs", "Frappe & ERPNext Developer", "Brilliant Technologies", 2025],
    ["fas fa-laptop-code", "Software Developer Certification", "Institute of Software Excellence", 2025],
    ["fab fa-wordpress", "WordPress Developer", "Vsplash Techlabs Pvt. Ltd.", 2025],
    ["fas fa-shopping-cart", "WooCommerce Developer", "Vsplash Techlabs Pvt. Ltd.", 2025],
    ["fas fa-tools", "Beaver Builder Certification", "Vsplash Techlabs Pvt. Ltd.", 2025],
    ["fab fa-python", "Python Full Stack Developer", "Durga Software Solutions, Hyderabad", 2024],
    ["fas fa-globe", "Web Development Certification", "American Indian Foundation (S&P Global)", 2023],
    ["fas fa-comments", "Career Edge: Communication & Soft Skills", "TCS iON", 2023],
    ["fas fa-database", "SQL Fundamentals", "HackerRank", 2022],
    ["fas fa-code", "Java Certification", "SoloLearn", 2022],
    ["fab fa-python", "Python Data Structures", "SoloLearn", 2021]
  ],
  certsUrl: "https://www.linkedin.com/in/murthujavali-pinjari18/details/certifications/",

  seedReviews: [
    { id: "seed-1", name: "Mabasha", role: "Senior Software Engineer, LPL Financial GCC", rating: 5,
      review: "I had a chance to explore this portfolio, and I'm genuinely impressed. It's clean, well-structured, and reflects both creativity and professionalism. Every section is thoughtfully presented, making it easy to understand the skills and work behind it. Wishing you all the best—I'm sure this portfolio will leave a great impression on everyone who visits it. Keep growing and achieving bigger milestones!" },
    { id: "seed-2", name: "Bhanu", role: "Junior Python Developer, Brilliant Technologies", rating: 5,
      review: "Your portfolio demonstrates a high level of professionalism and thoughtful design. The structure is intuitive, the content is clearly articulated, and your projects effectively showcase both technical competence and creative vision. The clarity with which you present your skills makes it easy for any viewer to grasp your strengths. Excellent work — this is a strong foundation for continued growth and success." }
  ]
};
