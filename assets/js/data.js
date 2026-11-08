window.PORTFOLIO = {
  contact: {
    whatsapp: "919100850087",
    linkedin: "https://www.linkedin.com/in/murthujavali-pinjari18/",
    github: "https://github.com/PinjariMurthujavali",
    youtube: "https://www.youtube.com/@Syntaxsolver-u5m",
    web3formsKey: "438c0f65-2c35-47a5-af69-c82f483de4f2" // public by design (Web3Forms access keys are client-side)
  },

  roles: ["run hospitals", "automate payroll", "connect CRMs end to end", "ship on Frappe Cloud", "sync biometric devices", "track field teams on mobile", "lead teams to release"],

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
      ["fas fa-puzzle-piece", "Custom DocTypes", 2], ["fas fa-plug", "Frappe REST API", 2], ["fas fa-hospital", "Hospital Management ERP", 2],
      ["fas fa-heart-pulse", "Frappe Healthcare", 0], ["fas fa-id-card", "Frappe HRMS & Payroll", 0], ["fas fa-terminal", "Bench Management", 0] ] },
    { emoji: "🧩", title: "ERPNext Customization", items: [
      ["fas fa-sliders", "Custom Fields", 0], ["fas fa-diagram-next", "Custom Workflows", 0], ["fas fa-user-shield", "Role-Based & User Permissions", 0],
      ["fas fa-hashtag", "Naming Series", 0], ["fas fa-anchor", "Hooks & Custom Apps", 0], ["fas fa-table", "Query & Script Reports", 0],
      ["fas fa-chart-pie", "Dashboard Charts & Workspaces", 0], ["fas fa-headset", "CRM Customization", 0], ["fas fa-boxes-stacked", "Stock, Inventory & Manufacturing", 0] ] },
    { emoji: "🐍", title: "Python & Backend", items: [
      ["fab fa-python", "Python", 3], ["fas fa-layer-group", "Django", 2], ["fas fa-server", "REST APIs", 2],
      ["fas fa-database", "SQL / MySQL", 2], ["fas fa-code", "Java", 2], ["fab fa-docker", "Docker", 1],
      ["fas fa-file-code", "Server Scripts & Client Scripts", 0], ["fas fa-webhook", "Webhooks & API Authentication", 0], ["fas fa-clock", "Background Jobs & Scheduler Events", 0], ["fas fa-gears", "Custom Controllers & Business Logic", 0] ] },
    { emoji: "🔌", title: "Integrations & Automation", items: [
      ["fas fa-credit-card", "Razorpay", 0], ["fas fa-file-invoice", "Tally XML", 0], ["fab fa-whatsapp", "WhatsApp (WATI, APIs)", 0],
      ["fas fa-comment-sms", "SMS Gateways", 0], ["fas fa-phone-volume", "Smartflo Telephony", 0], ["fas fa-fingerprint", "Biometric Devices (pyzk)", 0],
      ["fas fa-map-location-dot", "Google Maps & OpenStreetMap", 0], ["fas fa-fire", "Firebase", 0], ["fas fa-shopping-cart", "WooCommerce", 0] ] },
    { emoji: "📱", title: "Mobile (Flutter)", items: [
      ["fas fa-mobile-screen", "Flutter & Dart", 0], ["fas fa-bell", "Firebase Cloud Messaging", 0], ["fas fa-location-crosshairs", "GPS & Geolocation", 0],
      ["fas fa-camera", "Camera / Selfie Capture", 0], ["fas fa-circle-info", "Device Information", 0], ["fab fa-android", "Android Applications", 0], ["fas fa-plug", "REST API Connectivity", 0] ] },
    { emoji: "🌐", title: "Frontend", items: [
      ["fab fa-html5", "HTML5", 3], ["fab fa-css3-alt", "CSS3", 3], ["fab fa-js-square", "JavaScript", 2],
      ["fab fa-react", "React", 2], ["fab fa-bootstrap", "Bootstrap", 2], ["fab fa-node-js", "Node.js", 1],
      ["fas fa-chart-line", "Dashboards (Chart.js)", 0], ["fas fa-mobile-screen-button", "Responsive Web Design", 0] ] },
    { emoji: "🗄️", title: "Databases", items: [
      ["fas fa-database", "MariaDB", 0], ["fas fa-database", "MySQL & SQL", 0], ["fas fa-bolt", "Query Optimization", 0],
      ["fas fa-file-import", "Data Import / Export", 0], ["fas fa-right-left", "Database Migration", 0], ["fas fa-memory", "Redis", 0] ] },
    { emoji: "📦", title: "WordPress & CMS", items: [
      ["fab fa-wordpress", "WordPress", 3], ["fas fa-shopping-cart", "WooCommerce", 2], ["fas fa-tools", "Beaver Builder", 2],
      ["fas fa-search", "SEO Optimization", 2], ["fas fa-plug", "Plugin Development", 2], ["fas fa-paint-brush", "Theme Customization", 3] ] },
    { emoji: "🛠️", title: "DevOps & Tools", items: [
      ["fab fa-git-alt", "Git & GitHub", 3], ["fab fa-linux", "Linux / CLI", 2], ["fas fa-cloud-upload-alt", "Deployment & Hosting", 2],
      ["fas fa-vial", "Unit / Integration Testing", 1], ["fas fa-users-cog", "Team Leadership", 3], ["fas fa-project-diagram", "Agile / Scrum", 2],
      ["fas fa-paper-plane", "Postman", 0], ["fas fa-code", "VS Code", 0], ["fas fa-microchip", "Ollama / Local LLM (experimenting)", 0] ] },
    { emoji: "🧠", title: "Core CS", items: [
      ["fas fa-brain", "DSA", 3], ["fas fa-sitemap", "System Design", 2], ["fas fa-database", "Database Design", 2],
      ["fas fa-code-branch", "OOP Concepts", 3], ["fas fa-robot", "AI Integration", 1], ["fas fa-lock", "API Security", 2] ] }
  ],

  // cat: erp | integration | mobile | ai | python | java | web
  // status: production | completed | ongoing | experimental | academic | demo
  // core: true keeps a web/python/java card visible before "Show more"
  projects: [
    { cat: "erp", feat: true, status: "production", icon: "fas fa-hospital-alt", badge: "🏥 ERPNext", title: "CellHealth Hospital Management System",
      desc: "Healthcare ERP on Frappe and ERPNext Healthcare that carries a patient through a ten-step clinic workflow, from reception to pharmacy, with billing, GST and role-based permissions. Deployed on Frappe Cloud.",
      problem: "A clinic visit passes through many roles (reception, counselling, doctors, lab, nutrition, billing, pharmacy). Each hand-off needs the right data, the right permissions and the right bill.",
      contribution: "Development team member on the ERP build: custom healthcare DocTypes, workflow and permission set-up, billing and GST automation, and print formats for clinic documents.",
      features: ["Patient registration and appointment management", "Doctor consultation and counsellor workflow", "Lab management and billing", "Pharmacy management and nutritionist portal", "Medication requests and service requests", "GST automation", "Role-based permissions across the patient journey"],
      flow: ["Receptionist", "Counsellor", "Junior Doctor", "Billing", "Lab", "Nutritionist", "Senior Doctor", "Nutritionist", "Supplement Billing", "Pharmacy"],
      role: "Development team member on the ERP build", result: "Live in production on Frappe Cloud",
      tech: ["ERPNext", "Frappe", "Frappe Healthcare", "Python", "Frappe Cloud", "JavaScript", "MariaDB"], links: [{ t: "private", l: "Confidential client project" }] },

    { cat: "erp", feat: true, status: "production", icon: "fas fa-users-cog", badge: "⚙️ Frappe", title: "BCRM: CRM & Field Operations Platform",
      desc: "Internal CRM for Brilliant Technologies built on Frappe, covering Lead → Opportunity → Customer → AMC/renewal. Live employee status dashboard, Customer 360, a smart activity timeline across 7+ doctypes and a “Nearby Clients” locator.",
      problem: "Sales, field visits and renewals lived in separate places, so nobody had one view of a customer.",
      contribution: "Sole designer and builder, from data model to dashboards, scripts and releases on Frappe Cloud.",
      features: ["Customer, lead, product and opportunity management", "Customer 360 dashboard and interaction history", "Visit logs with GPS check-in/out, timestamps and visit duration", "Reverse geocoding (OpenStreetMap Nominatim) and road distance", "Photo proof for onsite visits and customer signature on completion", "Automatic employee assignment and follow-up tracking", "Smart activity timeline with field-level change history", "Nearby Clients locator (GPS haversine, pincode/city fallback)", "Role-based access and custom reports"],
      role: "Sole designer & builder", result: "Now the team's single system of record from lead to renewal",
      tech: ["Frappe", "Python", "Server Scripts", "Client Scripts", "REST API", "Google Maps", "MariaDB"], links: [{ t: "private", l: "Internal platform: Brilliant Technologies" }] },

    { cat: "erp", feat: true, status: "production", icon: "fas fa-fingerprint", badge: "⚙️ Frappe HRMS", title: "HRMS & Payroll Automation",
      desc: "Customized ERPNext HRMS: an automated attendance remarks engine (grace period, late entry, early exit, missing punch, weekly off, holiday and sandwich rule) on a bulk-optimized 5-minute scheduler that drives Salary Slip deductions, bonuses and incentives.",
      problem: "Attendance remarks and payroll deductions depended on manual checking of biometric punches.",
      contribution: "Sole designer and builder of the rules engine, payroll logic and attendance dashboards.",
      features: ["Late entry rule: three late entries equal one half-day (configured rule)", "Working-hours-based attendance calculation", "Sandwich leave rule, holiday and weekly-off handling", "Salary-based attendance bonus and absence-based incentive calculation", "Different check-in/check-out logic for Sales and non-Sales employees", "Salary Slip customization", "Monthly HR Attendance and HRMS Team dashboards"],
      role: "Sole designer & builder", result: "Attendance & payroll rules run automatically company-wide",
      tech: ["Frappe HRMS", "Python", "Scheduled Jobs", "Chart.js", "Server Scripts"], links: [{ t: "private", l: "Internal platform: Brilliant Technologies" }] },

    { cat: "integration", feat: true, status: "production", icon: "fas fa-microchip", badge: "🔌 Integration", title: "Biometric Attendance Integration",
      desc: "Python middleware that pulls punches from an eSSL/ZKTeco-compatible biometric device on the LAN with pyzk and pushes them to ERPNext Employee Checkin over REST, with SQLite deduplication and employee ID mapping.",
      problem: "Attendance was being entered by hand from device punches.",
      contribution: "Sole designer and builder of the sync service and the ERPNext side that turns checkins into attendance.",
      features: ["Biometric device connectivity over LAN", "Employee ID mapping", "Attendance synchronization to Employee Checkin", "SQLite deduplication so repeated pulls never double-count", "Automated attendance processing downstream"],
      role: "Sole designer & builder", result: "39,000+ logs synced for 75 employees",
      tech: ["Python", "pyzk", "ERPNext", "REST API", "SQLite", "Frappe Cloud"], links: [{ t: "private", l: "Internal platform: Brilliant Technologies" }] },

    { cat: "integration", status: "completed", icon: "fas fa-right-left", badge: "🔌 Integration", title: "VCRM → BCRM Integration",
      desc: "One-way integration between two Frappe-based CRMs. VCRM is strictly read-only; BCRM is the destination where products and documents are imported, mapped and managed.",
      problem: "Product and document data in VCRM was needed inside BCRM without ever writing back to VCRM.",
      contribution: "Designed and built the import pipeline, mapping rules and diagnostics.",
      features: ["VCRM product and document import", "Customer, product and account-relationship mapping", "Missing customer link detection", "API authentication and pagination", "Error handling and data validation", "Import diagnostics", "Integration settings"],
      tech: ["Frappe", "Python", "REST API", "Integration Settings"], links: [{ t: "private", l: "Internal platform: Brilliant Technologies" }] },

    { cat: "integration", status: "completed", icon: "fas fa-phone-volume", badge: "🔌 Integration", title: "Smartflo Telephony Integration",
      desc: "Smartflo telephony connected to the ERPNext CRM for click-to-call, call logs with an inline audio player and call-related automation.",
      contribution: "Built and maintained the call log features, fixed outbound webhook and field-mapping issues, and standardized call statuses across the codebase.",
      features: ["Telephony API integration", "Call activity tracking and call logs", "Click-to-call and webhook handling", "Customer communication history in the CRM", "Call-related automation"],
      tech: ["Frappe", "Python", "JavaScript", "Webhooks", "REST API"], links: [{ t: "private", l: "Internal platform: Brilliant Technologies" }] },

    { cat: "integration", status: "completed", icon: "fas fa-file-invoice", badge: "🔌 Integration", title: "ERPNext ↔ Tally Integration",
      desc: "ERPNext-to-Tally Prime sync tool that pushes submitted Sales Invoices into Tally through XML.",
      features: ["Tally XML communication", "Sales Invoice synchronization", "Accounting data exchange", "API / XML processing"],
      tech: ["Frappe", "Python", "Tally XML"], links: [{ t: "private", l: "Internal platform: Brilliant Technologies" }] },

    { cat: "integration", status: "completed", icon: "fas fa-credit-card", badge: "🔌 Integration", title: "Razorpay Payment Integration",
      desc: "Razorpay payment gateway on Quotation and Sales Order, built with server scripts only (no custom app), plus webhook and scheduled polling scripts that keep payment status up to date.",
      contribution: "Designed and built it within the Frappe Cloud server-script sandbox limits.",
      features: ["Payment links from ERPNext documents", "Webhook-based status updates", "Scheduled polling as a safety net", "Payment status handling"],
      tech: ["Frappe", "Python", "Razorpay API", "Webhooks"], links: [{ t: "private", l: "Internal platform: Brilliant Technologies" }] },

    { cat: "integration", status: "experimental", icon: "fab fa-whatsapp", badge: "🔌 Integration", extraBadge: "🧪 Mixed", title: "WhatsApp & SMS Automation",
      desc: "Communication automation built and tested with external services for appointment confirmations and customer notifications, wired into ERPNext with Python and webhooks.",
      note: "Some of these services were evaluated rather than shipped. None is presented here as production-ready.",
      features: ["Appointment confirmation messages", "Customer notifications", "Webhook-based automation", "Services used or tested: WATI, WhatsApp APIs, Fast2SMS, Ultramsg, Pabbly Webhooks"],
      tech: ["WATI", "WhatsApp APIs", "Fast2SMS", "Ultramsg", "Pabbly", "Python"], links: [{ t: "private", l: "Mixed: implemented and experimental", icon: "fas fa-flask" }] },

    { cat: "mobile", status: "completed", icon: "fas fa-mobile-screen", badge: "📱 Mobile", title: "Flutter Employee Field Tracker",
      desc: "Android app integrated with ERPNext for employee check-in/out with GPS location, selfie capture and device information, plus Firebase push notifications.",
      contribution: "Built the app and its ERPNext REST connectivity.",
      features: ["Employee check-in and check-out", "GPS location capture", "Selfie capture and device information", "Attendance tracking", "Firebase Cloud Messaging notifications", "Role-based tracking settings"],
      tech: ["Flutter", "Dart", "Firebase", "FCM", "Geolocator", "REST API", "Android"], links: [{ t: "private", l: "Internal tool", icon: "fas fa-lock" }] },

    { cat: "ai", status: "ongoing", icon: "fas fa-robot", badge: "🤖 AI", extraBadge: "🆕 In progress", title: "AI Chatbot for ERPNext",
      desc: "An in-development conversational assistant embedded in Frappe/ERPNext through a Workspace Custom HTML Block and Client Script chat widget, backed by a Python REST endpoint, to answer CRM and HR questions inside the workspace.",
      tech: ["Frappe", "Python", "REST API", "LLM Integration"], links: [{ t: "private", l: "In development", icon: "fas fa-code-branch" }] },

    { cat: "ai", status: "experimental", icon: "fas fa-microchip", badge: "🤖 AI", extraBadge: "🧪 Experiment", title: "AI & Local LLM Experiments",
      desc: "Hands-on exploration of local models and AI-assisted development workflows. This is learning and experimentation, not a shipped product.",
      features: ["Running local LLMs with Ollama", "Model gateway configuration", "AI development tools and AI-assisted coding with Claude"],
      tech: ["Ollama", "Local LLMs", "Claude", "AI-Assisted Coding"], links: [{ t: "private", l: "Experimentation", icon: "fas fa-flask" }] },

    { cat: "erp", status: "completed", icon: "fas fa-industry", badge: "ERPNext", title: "Manufacturing ERP Customization",
      desc: "ERPNext Manufacturing customization: BOM and Work Order workflows, production planning, stock tracking and shop-floor reporting, with custom fields, role-based permissions and print formats for the client's process.",
      tech: ["ERPNext", "Frappe", "Python", "Custom DocTypes"], links: [{ t: "private", l: "Confidential client project" }] },
    { cat: "erp", status: "completed", icon: "fas fa-cogs", badge: "⚙️ Frappe", title: "Custom Frappe Application",
      desc: "Custom business-workflow app on Frappe with custom DocTypes, server/client scripts and REST APIs for integration.",
      tech: ["Frappe", "Python", "Custom DocTypes", "REST API"], links: [{ t: "private", l: "Confidential client project" }] },
    { cat: "erp", status: "completed", icon: "fas fa-chart-line", badge: "ERPNext", title: "ERPNext Business Customization",
      desc: "Custom ERPNext modules for inventory, purchase workflows and reports with role-based permissions tailored to the business.",
      tech: ["ERPNext", "Frappe", "Python", "Jinja"], links: [{ t: "private", l: "Confidential client project" }] },

    { cat: "web", core: true, status: "completed", icon: "fab fa-wordpress", badge: "Web", title: "WordPress & WooCommerce Development",
      desc: "Website development and e-commerce customization: WordPress and WooCommerce builds, plugin configuration, SEO, LiteSpeed Cache, image optimization with WebP/AVIF.",
      features: ["WordPress development and website customization", "WooCommerce and product management", "SEO optimization", "LiteSpeed Cache and image optimization (WebP / AVIF)", "Plugin configuration and e-commerce integrations"],
      tech: ["WordPress", "WooCommerce", "SEO", "LiteSpeed Cache", "WebP / AVIF"], links: [{ t: "private", l: "Client and employer work", icon: "fas fa-lock" }] },
    { cat: "web", status: "demo", icon: "fas fa-globe", badge: "Web", title: "KARYNZO Website",
      desc: "A modern responsive website project hosted on GitHub Pages.",
      tech: ["HTML", "CSS", "JavaScript"], links: [{ t: "demo", l: "Live", href: "https://pinjarimurthujavali.github.io/Karynzo/" }] },
    { cat: "web", status: "demo", icon: "fas fa-user-circle", badge: "Web", title: "Portfolio Website",
      desc: "Personal portfolio with animations, timeline experience, project showcases and a contact form.",
      tech: ["HTML", "CSS", "JavaScript"], links: [{ t: "demo", l: "Live", href: "https://pinjarimurthujavali.github.io/Portfolio_website/" }, { t: "gh", l: "GitHub", href: "https://github.com/PinjariMurthujavali/Portfolio_website" }] },
    { cat: "web", status: "demo", icon: "fas fa-female", badge: "Web", title: "Tech Women Empowerment",
      desc: "A web platform empowering girls through interactive learning and technology-driven education with mentorship pathways.",
      tech: ["HTML", "CSS", "JavaScript"], links: [{ t: "demo", l: "Live", href: "https://pinjarimurthujavali.github.io/Tech-For-Girl---Empower-Learn/" }, { t: "gh", l: "GitHub", href: "https://github.com/PinjariMurthujavali/Tech-For-Girl---Empower-Learn" }] },
    { cat: "web", status: "demo", img: "assets/img/weather-dashboard.webp", alt: "Weather Dashboard screenshot", badge: "Web", title: "Weather Dashboard",
      desc: "Dynamic weather dashboard with real-time forecasts, location-based updates and clean data visualizations.",
      tech: ["HTML", "CSS", "JavaScript", "Weather API"], links: [{ t: "demo", l: "Live", href: "https://pinjarimurthujavali.github.io/Project-23---Weather-Dashboard/" }, { t: "gh", l: "GitHub", href: "https://github.com/PinjariMurthujavali/Project-23---Weather-Dashboard/" }] },
    { cat: "web", status: "demo", img: "assets/img/quiz-game.webp", alt: "Interactive Quiz Game screenshot", badge: "Game", title: "Interactive Quiz Game",
      desc: "Interactive quiz game with instant score calculation, timer and multiple difficulty levels.",
      tech: ["HTML", "CSS", "JavaScript"], links: [{ t: "demo", l: "Live", href: "https://pinjarimurthujavali.github.io/Project-1---Quiz-Game/" }, { t: "gh", l: "GitHub", href: "https://github.com/PinjariMurthujavali/Project-1---Quiz-Game" }] },
    { cat: "web", status: "demo", img: "assets/img/speech-reader.webp", alt: "Speech-to-Text Reader screenshot", badge: "AI Web", title: "Speech-to-Text Reader",
      desc: "Converts spoken words to text instantly using the Web Speech API, with multilingual support.",
      tech: ["HTML", "CSS", "JavaScript", "Web Speech API"], links: [{ t: "demo", l: "Live", href: "https://pinjarimurthujavali.github.io/Project-24-Speech-text-reader/" }, { t: "gh", l: "GitHub", href: "https://github.com/PinjariMurthujavali/Project-24-Speech-text-reader" }] },
    { cat: "web", status: "demo", img: "assets/img/qr-generator.webp", alt: "QR Code Generator screenshot", badge: "Tool", title: "QR Code Generator",
      desc: "Instantly generate custom QR codes from any text or URL, with download options and custom colors.",
      tech: ["HTML", "CSS", "JavaScript"], links: [{ t: "gh", l: "GitHub", href: "https://github.com/PinjariMurthujavali/PROJECT-2-QR-CODE-GENERATOR" }] },
    { cat: "web", status: "demo", img: "assets/img/notes-app.webp", alt: "Notes Application screenshot", badge: "App", title: "Notes Application",
      desc: "Responsive notes app with local-storage persistence, search and smooth UX for quick note-taking.",
      tech: ["HTML", "CSS", "JavaScript", "localStorage"], links: [] },

    { cat: "mobile", core: true, status: "academic", icon: "fas fa-car-side", badge: "📱 IoT", extraBadge: "🎓 Prototype", title: "Driver Drowsiness Detection (IoT)",
      desc: "Academic prototype for vehicle safety: a phone camera detects drowsiness while an ESP32 drives a small vehicle with an L298N motor driver and ultrasonic sensors.",
      features: ["Phone camera-based drowsiness detection", "ESP32 control with L298N motor driver", "Ultrasonic obstacle sensing", "Vehicle safety automation (prototype)"],
      tech: ["ESP32", "L298N", "Ultrasonic Sensors", "Computer Vision"], links: [{ t: "private", l: "Academic prototype", icon: "fas fa-graduation-cap" }] },

    { cat: "python", core: true, status: "academic", icon: "fas fa-user-graduate", badge: "Python / Django", title: "Student Management System",
      desc: "Full-stack Django app to manage student records, attendance, marks and course enrollment, with an admin dashboard, role-based login and search/filter reports.",
      tech: ["Python", "Django", "SQLite", "Bootstrap"], links: [{ t: "private", l: "Academic project", icon: "fas fa-graduation-cap" }] },
    { cat: "python", status: "academic", icon: "fas fa-book-reader", badge: "Python / Django", title: "Library Management System",
      desc: "Django library system for book cataloguing, issue/return tracking, due-date reminders and member management with a clean staff dashboard.",
      tech: ["Python", "Django", "MySQL", "HTML/CSS"], links: [{ t: "private", l: "Academic project", icon: "fas fa-graduation-cap" }] },
    { cat: "python", status: "academic", icon: "fas fa-shopping-basket", badge: "Python / Django", title: "Online Shopping Cart System",
      desc: "Basic e-commerce app in Django: product catalog, cart, checkout flow and order history with simple authentication.",
      tech: ["Python", "Django", "SQLite"], links: [{ t: "private", l: "Academic project", icon: "fas fa-graduation-cap" }] },
    { cat: "python", status: "academic", icon: "fas fa-chart-simple", badge: "Python / ML", title: "Loan Prediction (Logistic Regression)",
      desc: "Academic machine-learning project that predicts loan approval with logistic regression.",
      tech: ["Python", "Logistic Regression", "pandas"], links: [{ t: "private", l: "Academic project", icon: "fas fa-graduation-cap" }] },
    { cat: "python", status: "academic", icon: "fas fa-magnifying-glass-chart", badge: "Python / Data", title: "Exploratory Data Analysis",
      desc: "Academic data-analysis project exploring a dataset with Python before modelling.",
      tech: ["Python", "pandas", "Data Visualization"], links: [{ t: "private", l: "Academic project", icon: "fas fa-graduation-cap" }] },

    { cat: "java", status: "academic", icon: "fas fa-id-badge", badge: "Java Full Stack", title: "Employee Management System",
      desc: "Java full-stack app to manage employee records, departments, attendance and payroll, built with Spring Boot REST APIs and a JDBC/MySQL backend.",
      tech: ["Java", "Spring Boot", "JDBC", "MySQL", "HTML/CSS"], links: [{ t: "private", l: "Academic project", icon: "fas fa-graduation-cap" }] },
    { cat: "java", status: "academic", icon: "fas fa-university", badge: "Java Full Stack", title: "Bank Management System",
      desc: "Core banking simulation in Java: account creation, deposits/withdrawals, balance enquiry and transaction history on a JDBC-connected MySQL database.",
      tech: ["Java", "Servlets/JSP", "JDBC", "MySQL"], links: [{ t: "private", l: "Academic project", icon: "fas fa-graduation-cap" }] },
    { cat: "java", status: "academic", icon: "fas fa-hotel", badge: "Java Full Stack", title: "Hotel Reservation System",
      desc: "Java web app for room booking, availability checks, billing and customer management, built with Spring MVC and a relational database.",
      tech: ["Java", "Spring MVC", "MySQL", "Bootstrap"], links: [{ t: "private", l: "Academic project", icon: "fas fa-graduation-cap" }] }
  ],

  statusLabels: { production: "Live · Production", completed: "Completed", ongoing: "Ongoing", experimental: "Experimental", academic: "Academic", demo: "Demo / Showcase" },

  // Case studies: ten-part structure. Only facts from the portfolio/resume are stated; no invented metrics.
  caseStudies: [
    { id: "bcrm", tab: "BCRM", tag: "Case study 01 · Internal CRM", title: "BCRM: one system from lead to renewal", status: "production",
      stats: [["7+", "doctypes on one timeline"], ["1", "system of record"], ["Solo", "design & build"]],
      overview: "An internal CRM for Brilliant Technologies built as a custom Frappe app on Frappe Cloud. It covers customers, leads, opportunities, products, field visits, follow-ups and AMC/renewals in one place.",
      problem: "Sales activity, field visits and renewals lived in separate places, so nobody had a single view of a customer.",
      challenges: ["Customer history was spread across many documents (quotations, orders, invoices, contracts, payments).", "Field visits needed trustworthy location, duration and proof, not just a note.", "Frappe Cloud runs server scripts in a restricted sandbox, which limits how integrations can be built."],
      arch: [
        { label: "Users", nodes: ["Sales team", "Field employees", "Management"] },
        { label: "Frappe Desk (UI)", nodes: ["Client Scripts", "Custom HTML dashboards", "Workspaces", "Customer 360"] },
        { label: "Server layer", nodes: ["Server Scripts", "Custom APIs", "Scheduler", "Webhooks"] },
        { label: "Data", nodes: ["Customer / Lead / Opportunity", "Visit Logs", "Products", "MariaDB"] },
        { label: "External services", nodes: ["Google Maps", "OpenStreetMap Nominatim", "Razorpay", "Smartflo"] }
      ],
      tech: ["Frappe", "ERPNext", "Python", "JavaScript", "MariaDB", "Frappe Cloud", "Google Maps", "Nominatim", "Razorpay", "Smartflo"],
      approach: "Built feature by feature inside one custom app: data model first (DocTypes and permissions), then client and server scripts, then dashboards, releasing on Frappe Cloud as each piece was ready.",
      contribution: "Sole designer and builder of the platform, including the visit-log client script, dashboards, activity timeline and the integrations around it.",
      implementation: ["Visit Logs capture login/logout timestamps, latitude and longitude, and calculate visit duration with a session timer.", "Addresses are resolved from coordinates with OpenStreetMap Nominatim; road distance is calculated for each visit.", "Onsite visits require photo proof, and completion requires a customer signature, with a visit result recorded.", "A smart timeline shows field-level before/after changes and is reused across Quotation, Sales Order, Sales Invoice, Contract and Payment Entry.", "A Nearby Clients locator matches by GPS haversine distance, falling back to pincode or city.", "Employees are assigned automatically, and follow-ups and interaction history are tracked per customer."],
      features: ["Customer and lead management", "Customer 360 dashboard", "Product management", "GPS visit tracking and Google Maps links", "Follow-up tracking and interaction history", "Role-based access", "Custom reports"],
      impact: "It is now the team's single system of record from lead to renewal. It is an internal platform, so client data and revenue figures are not published here." },

    { id: "hms", tab: "Hospital System", tag: "Case study 02 · Healthcare ERP", title: "CellHealth: a clinic workflow, end to end", status: "production",
      stats: [["10", "workflow hand-offs"], ["Live", "on Frappe Cloud"], ["Team", "build"]],
      overview: "A hospital management system for CellHealth, built on Frappe and ERPNext Healthcare and deployed on Frappe Cloud. It follows a patient from reception to pharmacy.",
      problem: "A single clinic visit moves through many roles. Each hand-off needs the right data in front of the right person, and each billing step needs to be correct, including GST.",
      challenges: ["Ten sequential hand-offs across seven kinds of staff.", "Standard healthcare doctypes needed customizing for the clinic's own process.", "Staff must see only what their role needs.", "Two separate billing moments (consultation and supplements)."],
      arch: [
        { label: "Patient journey", flow: true, nodes: ["Receptionist", "Counsellor", "Junior Doctor", "Billing", "Lab", "Nutritionist", "Senior Doctor", "Nutritionist", "Supplement Billing", "Pharmacy"] },
        { label: "Application", nodes: ["Frappe Healthcare", "ERPNext (billing, stock)", "Custom healthcare DocTypes"] },
        { label: "Rules", nodes: ["Workflow states", "Role-based permissions", "GST automation", "Print formats"] },
        { label: "Platform", nodes: ["Frappe Cloud", "MariaDB"] }
      ],
      tech: ["Frappe", "ERPNext", "Frappe Healthcare", "Python", "JavaScript", "Jinja", "MariaDB", "Frappe Cloud"],
      approach: "Started from Frappe Healthcare and extended it with custom DocTypes and workflow rules where the clinic's process differed from the standard modules.",
      contribution: "Development team member on the ERP build, working on healthcare business-process automation and custom ERP development, including print formats for clinic documents.",
      implementation: ["Custom healthcare DocTypes for the counsellor, nutritionist and supplement steps.", "Workflow and role-based permissions so each role handles its own step.", "Billing and GST automation for consultation and supplement billing.", "Medication requests and service requests linked to the patient record.", "Print formats built with Jinja for clinic documents."],
      features: ["Patient registration", "Appointment management", "Doctor consultation", "Counsellor workflow", "Lab management", "Billing and GST automation", "Pharmacy management", "Nutritionist portal", "Medication and service requests", "Role-based permissions"],
      impact: "The system is live in production on Frappe Cloud. It is a confidential client project, so no usage or financial figures are published here." },

    { id: "hrms", tab: "HRMS Automation", tag: "Case study 03 · HR automation", title: "Attendance & payroll rules, automated", status: "production",
      stats: [["7", "rule types"], ["5 min", "scheduler cycle"], ["Solo", "design & build"]],
      overview: "A customized ERPNext HRMS in which attendance remarks and payroll adjustments are produced by a rules engine instead of manual checking.",
      problem: "Attendance remarks and payroll deductions depended on manual checking of biometric punches.",
      challenges: ["Rules differ by department: Sales and non-Sales employees use different check-in/check-out logic.", "Edge cases such as the sandwich rule around weekly offs and holidays.", "The engine must process many employees every cycle without slowing the site.", "Dashboards must show the right day in IST."],
      arch: [
        { label: "Input", nodes: ["Employee Checkin", "Holiday list", "Leave records"] },
        { label: "Scheduler (every 5 minutes, bulk-optimized)", nodes: ["Rules engine"] },
        { label: "Rules", nodes: ["Grace period", "Late entry", "Early exit", "Missing punch", "Weekly off", "Holiday", "Sandwich rule"] },
        { label: "Output", nodes: ["Attendance remarks", "Salary Slip deductions", "Bonus & incentive", "HR dashboards"] }
      ],
      tech: ["Frappe HRMS", "ERPNext", "Python", "Scheduled Jobs", "Server Scripts", "Chart.js", "MariaDB"],
      approach: "Modelled each business rule as its own step in one engine, ran it on a bulk-optimized scheduler, and fed the result into payroll so that remarks and money always agree.",
      contribution: "Sole designer and builder of the rules engine, payroll logic and the HR dashboards.",
      implementation: ["Three late entries equal one half-day under the configured rule.", "Attendance is calculated from working hours.", "Attendance bonus is calculated from salary; incentive is calculated from the absence count.", "Check-in/check-out logic differs for Sales and non-Sales employees.", "Pay-days logic covers the grace period and a one-day bonus rule.", "HR Attendance and HRMS Team dashboards use Chart.js, with an IST timezone fix."],
      features: ["Attendance and leave management", "Late entry and half-day calculation", "Sandwich leave, holiday and weekly-off handling", "Payroll automation and Salary Slip customization", "Attendance bonus and incentives", "Department-based attendance rules", "Monthly attendance dashboard and reports"],
      impact: "Attendance and payroll rules run automatically company-wide, feeding Salary Slip deductions and bonuses. It replaced manual checking of punches." },

    { id: "biometric", tab: "Biometric Sync", tag: "Case study 04 · Device integration", title: "From fingerprint to Employee Checkin", status: "production",
      stats: [["39,000+", "logs synced"], ["75", "employees"], ["LAN → Cloud", "bridge"]],
      overview: "A Python middleware service that reads punches from an eSSL/ZKTeco-compatible biometric device on the office LAN and creates Employee Checkin records in ERPNext on Frappe Cloud.",
      problem: "Attendance was entered by hand from device punches, which was slow and error-prone.",
      challenges: ["The device lives on a local network while ERPNext runs in the cloud.", "Repeated pulls from the device must never create duplicate checkins.", "Device user IDs have to map to the right employees.", "The sync has to keep running unattended."],
      arch: [
        { label: "Office LAN", nodes: ["Biometric device"] },
        { label: "Middleware (Python)", nodes: ["pyzk client", "Employee ID mapping", "SQLite deduplication"] },
        { label: "Transport", nodes: ["REST API + authentication"] },
        { label: "Frappe Cloud", nodes: ["Employee Checkin", "Attendance processing", "HRMS rules engine"] }
      ],
      tech: ["Python", "pyzk", "SQLite", "REST API", "ERPNext", "Frappe Cloud"],
      approach: "Kept the device logic outside ERPNext in a small service, so the cloud site only receives clean, de-duplicated punches over its REST API.",
      contribution: "Sole designer and builder of the middleware and the ERPNext endpoint that receives the punches.",
      implementation: ["pyzk connects to the device over the LAN and pulls attendance logs.", "A local SQLite store remembers what was already sent, so retries are safe.", "Each device user ID is mapped to an ERPNext employee.", "Punches are posted to ERPNext as Employee Checkin records.", "Automated attendance processing runs downstream."],
      features: ["Biometric device connectivity", "Employee ID mapping", "Attendance synchronization", "Employee Checkin creation", "Automated attendance processing"],
      impact: "39,000+ biometric logs synced for 75 employees, replacing manual attendance entry." },

    { id: "vcrm", tab: "VCRM ↔ BCRM", tag: "Case study 05 · System integration", title: "VCRM → BCRM: a one-way, read-only bridge", status: "completed",
      stats: [["Read-only", "VCRM source"], ["1-way", "data flow"], ["2", "Frappe systems"]],
      overview: "An integration between two Frappe-based CRMs. VCRM is treated as strictly read-only; BCRM is the destination where imported products and documents are mapped and managed.",
      problem: "Product and document data held in VCRM was needed inside BCRM, without any risk of changing VCRM.",
      challenges: ["Customers and products in the two systems do not share IDs, so they need mapping.", "Some documents point at customers that do not exist in BCRM yet.", "Large datasets have to be pulled in pages.", "Failures must be visible, not silent."],
      arch: [
        { label: "Source (read-only)", nodes: ["VCRM"] },
        { label: "Access", nodes: ["API authentication", "Pagination"] },
        { label: "Mapping & validation", nodes: ["Customer mapping", "Product mapping", "Account relationships", "Data validation"] },
        { label: "Destination", nodes: ["BCRM import", "Integration settings", "Import diagnostics"] }
      ],
      tech: ["Frappe", "Python", "REST API", "Integration Settings"],
      approach: "Designed it as a pipeline of small steps (fetch, map, validate, import), with a diagnostics report at the end so problems can be fixed at the source of the mapping.",
      contribution: "Designed and built the import pipeline, the mapping rules and the diagnostics.",
      implementation: ["Authenticated API calls pull VCRM data page by page.", "Customer, product and account-relationship mappings translate VCRM records into BCRM ones.", "Missing customer links are detected and reported instead of being dropped.", "Validation and error handling run before anything is written to BCRM.", "An integration settings screen holds the connection details."],
      features: ["VCRM product import", "VCRM document import", "Customer, product and account mapping", "Missing customer link detection", "API authentication and pagination", "Error handling and validation", "Import diagnostics", "Integration settings"],
      impact: "VCRM is never written to, and mismatches show up in diagnostics. No business metrics are published for this internal integration." }
  ],

  achievements: [
    { icon: "fas fa-graduation-cap", label: "Education", title: "B.Tech, Electronics & Communication Engineering", text: "Santhiram Engineering College · completed 2024 · CGPA 8.0 / 10" },
    { icon: "fas fa-trophy", label: "Achievement", title: "Smart India Hackathon 2023: Second Prize", text: "National-level Government of India initiative." },
    { icon: "fas fa-people-group", label: "Leadership", title: "Mentoring a 4-person engineering team", text: "Code review, release support and technical guidance at Brilliant Technologies." }
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
