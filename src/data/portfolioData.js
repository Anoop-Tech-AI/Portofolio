// Portfolio Data Configuration for Anoop
// Editorial developer identity, authentic timeline, skills, and projects

export const personalInfo = {
  name: "ANOOP",
  firstName: "Anoop",
  headlinePillars: [
    "I BUILD SOFTWARE.",
    "I EXPLORE INTELLIGENCE.",
    "I SOLVE PROBLEMS."
  ],
  tagline: "Building Intelligent Solutions Through Code.",
  role: "Computer Science & Engineering Student",
  specialization: "Software Development • Artificial Intelligence & Machine Learning",
  institution: "Keshav Memorial Institute of Technology (KMIT)",
  institutionShort: "KMIT, Hyderabad",
  expectedGraduation: "2028",
  cgpa: "Placeholder (In Progress)",
  location: "Hyderabad, Telangana, India",
  email: "anoop.developer.placeholder@example.com", // Placeholder
  socials: {
    github: "https://github.com/placeholder-anoop", // Placeholder
    linkedin: "https://linkedin.com/in/placeholder-anoop", // Placeholder
    email: "mailto:anoop.developer.placeholder@example.com",
    leetcode: "https://leetcode.com/placeholder-anoop", // Placeholder
    codeforces: "https://codeforces.com/profile/placeholder-anoop", // Placeholder
    hackerrank: "https://hackerrank.com/placeholder-anoop", // Placeholder
  },
  interests: [
    "Software Development",
    "Artificial Intelligence & Machine Learning",
    "Full-Stack Development",
    "Data Structures & Algorithms"
  ],
  bioIntro: "I'm a Computer Science and Engineering student at KMIT, Hyderabad, passionate about software engineering, machine learning, and solving real-world challenges through technology.",
  personalNarrative: {
    story: "My fascination with software began not just with writing code, but with understanding what happens underneath the syntax. When I started programming, I quickly realized that the most rewarding engineering happens at the intersection of solid algorithms and practical system design.",
    aiMotivation: "What excites me about Artificial Intelligence isn't just the ability to call APIs — it's the underlying mechanics. Exploring how vector spaces capture semantic nuance, how retrieval-augmented generation grounds language models in verified facts, and how autonomous agent loops can reason through multi-step workflows.",
    learningApproach: "I believe in understanding technologies from first principles rather than treating frameworks as black boxes. Whether that means writing clean C++ to master memory and time complexity, structuring resilient REST backends, or fine-tuning embedding models for search.",
    aspiration: "My goal is to develop into a disciplined software engineer capable of designing scalable, fault-tolerant backends and intelligent systems that make a tangible difference."
  }
};

export const educationData = {
  degree: "Bachelor of Technology (B.Tech)",
  branch: "Computer Science and Engineering",
  institution: "Keshav Memorial Institute of Technology (KMIT)",
  location: "Hyderabad, Telangana, India",
  period: "2024 – 2028",
  expectedGraduation: "2028",
  cgpaPlaceholder: "Academic Record In Progress (Will update upon semester evaluations)",
  highlights: [
    "Rigorous computational curriculum spanning data structures, system architecture, and algorithmic design.",
    "Active participant in technical coding clubs, programming contests, and hands-on laboratory hackathons.",
    "Independent research into Agentic AI workflows, vector databases, and full-stack systems engineering."
  ]
};

// Personal Developer Journey Timeline (Authentic milestones)
export const developmentTimeline = [
  {
    year: "2024",
    title: "Commenced B.Tech in CSE at KMIT Hyderabad",
    tagline: "Academic Inception & Computational Foundations",
    description: "Entered undergraduate studies in Computer Science and Engineering at Keshav Memorial Institute of Technology, focusing on foundational mathematics, discrete structures, and problem-solving.",
    status: "Milestone",
    skillsGained: ["C Programming", "Computational Thinking", "Discrete Mathematics"]
  },
  {
    year: "2024 – 2025",
    title: "Core Programming & Algorithmic Rigor",
    tagline: "Mastering C++, Java & Object-Oriented Principles",
    description: "Transitioned to C++ and Java. Developed disciplined habits in memory management, Standard Template Library (STL), object-oriented software design, and competitive coding fundamentals.",
    status: "Foundations",
    skillsGained: ["C++", "Java", "OOP", "Data Structures", "Algorithm Design"]
  },
  {
    year: "2025",
    title: "Full-Stack & Backend Engineering",
    tagline: "From Local Scripts to Scalable Web Architectures",
    description: "Built web applications and REST APIs. Implemented database schema design in MongoDB and SQL, crafted backend routing with Node.js/Express, and modern interactive UIs using React.",
    status: "Applied Development",
    skillsGained: ["Node.js", "Express.js", "MongoDB", "React", "REST APIs"]
  },
  {
    year: "2025 – Present",
    title: "Intelligent Systems, RAG & Agentic AI",
    tagline: "Pioneering Context-Aware Software",
    description: "Ventured deeply into modern AI architectures. Architecting RetailMind-AI using LangGraph, BGE-M3 embeddings, and ChromaDB vector search; prototyping MedSafe AI with FastAPI and document extraction.",
    status: "Active Exploration",
    skillsGained: ["Python", "FastAPI", "RAG", "Vector Databases", "LangGraph", "NLP"]
  },
  {
    year: "2028 Horizon",
    title: "Software & AI Engineering Graduation",
    tagline: "Industry Impact & Large-Scale Systems",
    description: "Target graduation year with a comprehensive portfolio of production-grade projects, robust algorithmic competencies, and deep readiness for software engineering and AI systems roles.",
    status: "Forward Vision",
    skillsGained: ["System Design", "Distributed Systems", "Applied AI Engineering"]
  }
];

export const skillCategories = [
  {
    id: "programming",
    title: "Programming Languages",
    iconName: "Code2",
    description: "Core languages for high-performance systems and scripting",
    activelyUsed: ["C++", "Python", "Java", "JavaScript"],
    exploring: [],
    relatedProjects: ["retailmind-ai", "medsafe-ai", "student-management-system", "devops-cicd-practice"]
  },
  {
    id: "ai-ml",
    title: "AI & Machine Learning",
    iconName: "BrainCircuit",
    description: "Semantic search, neural architectures, and reasoning loops",
    activelyUsed: [
      "Artificial Intelligence",
      "Machine Learning",
      "Deep Learning",
      "Natural Language Processing",
      "Sentiment Analysis",
      "Retrieval-Augmented Generation (RAG)",
      "Data Preprocessing",
      "Feature Engineering"
    ],
    exploring: [
      "AI Agents",
      "LangGraph / CrewAI",
      "Large Language Models",
      "BGE-M3 Embeddings",
      "TensorFlow",
      "Keras",
      "Model Evaluation"
    ],
    relatedProjects: ["retailmind-ai", "medsafe-ai"]
  },
  {
    id: "web",
    title: "Web & Backend Development",
    iconName: "Globe",
    description: "Full-stack application engineering and RESTful APIs",
    activelyUsed: ["React.js", "Node.js", "Express.js", "REST APIs", "HTML5", "CSS3", "JavaScript"],
    exploring: ["FastAPI", "Microservices Architecture"],
    relatedProjects: ["medsafe-ai", "student-management-system"]
  },
  {
    id: "databases",
    title: "Databases & Storage",
    iconName: "Database",
    description: "Relational, document, and vector storage engines",
    activelyUsed: ["SQL", "MongoDB", "MongoDB Atlas"],
    exploring: ["ChromaDB", "FAISS Vector Store"],
    relatedProjects: ["retailmind-ai", "student-management-system"]
  },
  {
    id: "tools",
    title: "DevOps & Tooling",
    iconName: "Wrench",
    description: "Containerization, version control, and developer workflows",
    activelyUsed: ["Git", "GitHub", "Linux", "VS Code", "Postman"],
    exploring: ["Docker", "Kubernetes", "Jenkins", "Minikube", "Jupyter Notebook"],
    relatedProjects: ["devops-cicd-practice", "retailmind-ai"]
  },
  {
    id: "core-cs",
    title: "Core Computer Science",
    iconName: "Layers",
    description: "Asymptotic analysis and foundational principles",
    activelyUsed: [
      "Data Structures and Algorithms",
      "Object-Oriented Programming",
      "Algorithm Design",
      "Problem Solving"
    ],
    exploring: [
      "Database Management Systems",
      "Computer Networks",
      "Software Engineering Architecture"
    ],
    relatedProjects: ["retailmind-ai", "student-management-system"]
  }
];

export const projectsData = [
  {
    id: "retailmind-ai",
    title: "RetailMind-AI",
    subtitle: "Agentic Retail Recommendation System with Memory and RAG",
    tagline: "Flagship AI Project • Multi-Agent Pipeline",
    problemStatement: "Traditional eCommerce search engines rely on rudimentary keyword matching and global star ratings, failing to understand nuanced customer queries or synthesize thousands of authentic customer review aspects into explainable buying decisions.",
    solution: "Architecting a multi-agent recommendation engine powered by RAG and contextual memory. The system ingests the Amazon Reviews Dataset, vectorizes semantic feedback via BGE-M3 embeddings into ChromaDB/FAISS, and extracts sentiment and aspect ratings to present explainable, auditable product guidance.",
    architecture: [
      { step: "01", name: "Query Understanding", desc: "Deconstructs intent, user constraints, and budget parameters." },
      { step: "02", name: "RAG Retrieval", desc: "Dense vector retrieval with BGE-M3 and hybrid semantic ranking." },
      { step: "03", name: "Conversational Memory", desc: "Preserves user context across iterative clarification rounds." },
      { step: "04", name: "Sentiment & Aspect Analysis", desc: "Parses authentic review nuances (durability, value, quality)." },
      { step: "05", name: "Multi-Factor Ranking", desc: "Balances relevance, user sentiment, and objective product metrics." },
      { step: "06", name: "Explainable Output", desc: "Generates clear natural language rationale for recommendations." }
    ],
    contribution: "Designed the multi-stage agentic workflow, configured the embedding and vector retrieval pipeline, and integrated review sentiment parsing.",
    technologies: [
      "Python",
      "LangGraph / CrewAI",
      "BGE-M3",
      "ChromaDB / FAISS",
      "RAG",
      "Amazon Reviews Dataset",
      "NLP",
      "Sentiment Analysis"
    ],
    status: "Under Development",
    statusType: "in-progress",
    category: "AI / Machine Learning",
    badgeColor: "text-amber-400 bg-amber-400/10 border-amber-400/20",
    themeAccent: "amber",
    githubPlaceholder: "https://github.com/placeholder-anoop/RetailMind-AI"
  },
  {
    id: "medsafe-ai",
    title: "MedSafe AI",
    subtitle: "Detection of Medication Errors & Dangerous Drug Interactions",
    tagline: "Healthcare Intelligence • Clinical Document Analysis",
    problemStatement: "Adverse drug interactions and handwritten prescription misinterpretations pose critical healthcare hazards. Clinicians and patients need rapid, reliable automated screening of prescribed drugs against verified medical interaction matrices.",
    solution: "Engineered a clinical safety tool that processes raw clinical and prescription records, extracts pharmacological entities (drug names, dosages, frequencies), normalizes data into structured JSON, and flags dangerous pharmacological conflicts.",
    architecture: [
      { step: "01", name: "Prescription Ingestion", desc: "Captures unstructured prescription text or scanned inputs." },
      { step: "02", name: "Document Parsing & NER", desc: "Extracts active drug entities, dosages, and regimens." },
      { step: "03", name: "JSON Normalization", desc: "Standardizes extracted clinical data for downstream verification." },
      { step: "04", name: "Conflict Engine", desc: "Evaluates multi-drug combinations against interaction rules." },
      { step: "05", name: "Clinical Alerts", desc: "Surfaces severity-ranked warnings on a reactive dashboard." }
    ],
    contribution: "Developed the FastAPI backend pipeline for document processing, structured JSON schema mapping, and React dashboard interface.",
    technologies: [
      "Python",
      "FastAPI",
      "React",
      "Vite",
      "AI/ML",
      "Document Processing",
      "JSON"
    ],
    status: "Under Development",
    statusType: "in-progress",
    category: "Healthcare AI & Full-Stack",
    badgeColor: "text-sky-400 bg-sky-400/10 border-sky-400/20",
    themeAccent: "sky",
    githubPlaceholder: "https://github.com/placeholder-anoop/MedSafe-AI"
  },
  {
    id: "student-management-system",
    title: "Student Management System",
    subtitle: "Modular Student CRUD Service with Mongoose",
    tagline: "Backend Engineering • RESTful API",
    problemStatement: "Educational registries require dependable, structured data persistence with strict validation, predictable response structures, and efficient querying.",
    solution: "Developed a clean RESTful backend service with full Create, Read, Update, and Delete operations for student academic records, incorporating input sanitization, schema constraints, and modular router/controller organization.",
    architecture: [
      { step: "01", name: "Express Routing", desc: "Clean REST endpoints handling HTTP CRUD verbs." },
      { step: "02", name: "Validation Middleware", desc: "Ensures type safety, required fields, and data hygiene." },
      { step: "03", name: "Controller Logic", desc: "Decoupled business logic coordinating data flows." },
      { step: "04", name: "Mongoose Schema", desc: "Strict schema constraints, indexes, and transformations." },
      { step: "05", name: "MongoDB Persistence", desc: "High-throughput document storage and querying." }
    ],
    contribution: "Implemented the entire backend architecture, API contract definitions, Mongoose schemas, and route integration tests.",
    technologies: [
      "Node.js",
      "Express.js",
      "MongoDB",
      "Mongoose",
      "REST APIs"
    ],
    status: "Completed Project",
    statusType: "completed",
    category: "Backend & Database",
    badgeColor: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
    themeAccent: "emerald",
    githubPlaceholder: "https://github.com/placeholder-anoop/Student-Management-System"
  },
  {
    id: "devops-cicd-practice",
    title: "DevOps & CI/CD Practice",
    subtitle: "Automated Build, Containerization & Orchestration",
    tagline: "Infrastructure Practice • Container Workflows",
    problemStatement: "Modern software reliability depends on deterministic builds, environment isolation, and automated validation before shipping code to production.",
    solution: "Practiced and configured an end-to-end continuous integration and deployment pipeline that automates code commits into Maven builds, packages applications into Docker images, and deploys them to local Minikube Kubernetes pods.",
    architecture: [
      { step: "01", name: "Git Webhook Trigger", desc: "Automated event fired upon code commits." },
      { step: "02", name: "Jenkins Pipeline", desc: "Orchestrates multi-stage build and testing lifecycle." },
      { step: "03", name: "Maven Build & Test", desc: "Compiles Java application and runs test suites." },
      { step: "04", name: "Docker Image Build", desc: "Creates lightweight, containerized execution environment." },
      { step: "05", name: "Kubernetes Pod Deploy", desc: "Orchestrates container deployment in local Minikube cluster." }
    ],
    contribution: "Authored Dockerfiles, Jenkinsfile automation scripts, and Kubernetes deployment/service YAML manifests.",
    technologies: [
      "Git",
      "GitHub",
      "Jenkins",
      "Docker",
      "Kubernetes",
      "Maven",
      "Java",
      "Minikube"
    ],
    status: "Hands-on Practice / Labs",
    statusType: "in-progress",
    category: "DevOps & Cloud",
    badgeColor: "text-purple-400 bg-purple-400/10 border-purple-400/20",
    themeAccent: "purple",
    githubPlaceholder: "https://github.com/placeholder-anoop/DevOps-Practice"
  }
];

export const problemSolvingData = {
  headline: "Algorithmic Precision & Computational Discipline",
  description: "Approaching problems not through trial and error, but through disciplined mathematical abstraction, algorithmic paradigms, and asymptotic optimization.",
  pillars: [
    {
      title: "Data Structures & Algorithms",
      desc: "Deep focus on arrays, trees, graphs, heaps, dynamic programming, and amortized complexity analysis.",
      icon: "Cpu"
    },
    {
      title: "C++ Programming",
      desc: "Leveraging modern C++ with Standard Template Library (STL) for high-performance memory-efficient executions.",
      icon: "Terminal"
    },
    {
      title: "Algorithmic Thinking",
      desc: "Deconstructing complex computational requirements into modular, mathematically verifiable sub-problems.",
      icon: "Binary"
    },
    {
      title: "Logical Reasoning & CP",
      desc: "Regular competitive programming practice refining edge-case analysis, state transitions, and search spaces.",
      icon: "Target"
    }
  ],
  approachSteps: [
    { step: "01", title: "Constraint & Bounds Analysis", desc: "Isolate inputs (n ≤ 10⁵), deduce target time complexity O(n log n) or O(n), and identify corner states." },
    { step: "02", title: "Invariant & Paradigm Mapping", desc: "Map to proven paradigms: Two-Pointers, Monotonic Queue, Binary Search on Answer, or DP." },
    { step: "03", title: "Space-Time Trade-off Optimization", desc: "Weigh auxiliary memory vs runtime; verify space bounds and cache locality." },
    { step: "04", title: "Idiomatic & Guarded Code", desc: "Implement clean C++/Python with zero off-by-one errors and clear invariants." }
  ],
  platforms: [
    { name: "LeetCode", placeholder: "https://leetcode.com/placeholder-anoop", status: "Active Coding Profile", focus: "Data Structures & Algorithms" },
    { name: "Codeforces", placeholder: "https://codeforces.com/profile/placeholder-anoop", status: "Contest Rating Track", focus: "Competitive Programming" },
    { name: "GitHub", placeholder: "https://github.com/placeholder-anoop", status: "DSA Code Repository", focus: "Algorithm Implementations" },
    { name: "HackerRank", placeholder: "https://hackerrank.com/placeholder-anoop", status: "Problem Solving Badges", focus: "Domain Proficiencies" }
  ]
};

export const currentlyExploring = [
  {
    title: "Advanced AI Systems",
    desc: "Autonomous multi-agent orchestration patterns, tool calling, and structured output verification.",
    tag: "Next-Gen AI",
    badge: "Active Focus"
  },
  {
    title: "Agentic AI",
    desc: "Autonomous reasoning loops, stateful task execution frameworks like LangGraph and CrewAI.",
    tag: "Agentic Frameworks",
    badge: "Building"
  },
  {
    title: "Large Language Models",
    desc: "Context window mechanics, attention mechanisms, tokenization, and prompt optimization strategies.",
    tag: "Generative Models",
    badge: "Research"
  },
  {
    title: "Retrieval-Augmented Generation",
    desc: "Hybrid search, sparse & dense embedding models (BGE-M3), vector indexing, and reranking pipelines.",
    tag: "RAG & Search",
    badge: "Core Project"
  },
  {
    title: "Full-Stack Development",
    desc: "Modern reactive interfaces paired with resilient RESTful and asynchronous backend microservices.",
    tag: "React & Node",
    badge: "Applied"
  },
  {
    title: "Advanced DSA",
    desc: "Advanced graph theory (SCCs, Network Flow), Segment Trees, Trie optimizations, and Fenwick trees.",
    tag: "Algorithms",
    badge: "Continuous"
  },
  {
    title: "Software Engineering",
    desc: "Clean architecture, SOLID principles, design patterns, testing strategies, and maintainability.",
    tag: "Systems Design",
    badge: "Foundational"
  }
];
