// Portfolio Data Configuration for Anoop
// Contains all factual profile information, skills, projects, education, and configurable placeholders

export const personalInfo = {
  name: "ANOOP",
  tagline: "Building Intelligent Solutions Through Code.",
  role: "Computer Science & Engineering Student | Aspiring Software & AI Engineer",
  institution: "KMIT – Hyderabad",
  expectedGraduation: "2028",
  cgpa: "Placeholder (Pending / In Progress)",
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
  bioIntro: "I'm a Computer Science and Engineering student passionate about software development, artificial intelligence, machine learning, and solving real-world problems through technology.",
  aboutParagraphs: [
    "I'm Anoop, a Computer Science and Engineering student at KMIT, Hyderabad. I'm continuously developing my technical knowledge through hands-on projects, programming, problem-solving, and exploring emerging technologies.",
    "My interests include artificial intelligence, machine learning, software engineering, backend development, and building practical applications that address real-world challenges.",
    "I believe in understanding technologies deeply rather than simply using them. My goal is to become a strong software engineer capable of designing and developing intelligent, scalable systems."
  ]
};

export const educationData = {
  degree: "Bachelor of Technology (B.Tech)",
  branch: "Computer Science and Engineering",
  institution: "Keshav Memorial Institute of Technology (KMIT)",
  location: "Hyderabad, Telangana",
  period: "2024 – 2028",
  expectedGraduation: "2028",
  cgpaPlaceholder: "Academic Record In Progress (Will update upon semester evaluations)",
  highlights: [
    "Core focus on Algorithmic Foundations, Object-Oriented Design, and Intelligent Computing",
    "Active participant in technical coding clubs and project incubation initiatives",
    "Hands-on laboratory experience across Systems, Database Engineering, and Modern Web Stacks"
  ]
};

export const skillCategories = [
  {
    id: "programming",
    title: "Programming Languages",
    iconName: "Code2",
    description: "Core languages for building robust software & systems",
    skills: ["Java", "Python", "C++", "JavaScript"]
  },
  {
    id: "web",
    title: "Web Development",
    iconName: "Globe",
    description: "Full-stack web application development and API engineering",
    skills: ["HTML5", "CSS3", "JavaScript", "React.js", "Node.js", "Express.js", "REST APIs"]
  },
  {
    id: "databases",
    title: "Databases",
    iconName: "Database",
    description: "Relational and document storage solutions",
    skills: ["SQL", "MongoDB", "MongoDB Atlas"]
  },
  {
    id: "ai-ml",
    title: "AI & Machine Learning",
    iconName: "BrainCircuit",
    description: "Intelligent systems, deep learning architectures & generative workflows",
    skills: [
      "Artificial Intelligence",
      "Machine Learning",
      "Deep Learning",
      "Artificial Neural Networks",
      "TensorFlow",
      "Keras",
      "Natural Language Processing",
      "Sentiment Analysis",
      "Retrieval-Augmented Generation (RAG)",
      "Large Language Models",
      "AI Agents",
      "Feature Engineering",
      "Data Preprocessing",
      "Model Evaluation"
    ]
  },
  {
    id: "tools",
    title: "Tools & Technologies",
    iconName: "Wrench",
    description: "Modern DevOps, containerization, and developer tooling",
    skills: [
      "Git",
      "GitHub",
      "Docker",
      "Kubernetes",
      "Jenkins",
      "Linux",
      "VS Code",
      "Jupyter Notebook",
      "Postman",
      "FastAPI"
    ]
  },
  {
    id: "core-cs",
    title: "Core Computer Science",
    iconName: "Layers",
    description: "Foundational CS principles and analytical competencies",
    skills: [
      "Data Structures and Algorithms",
      "Database Management Systems",
      "Computer Networks",
      "Software Engineering",
      "Object-Oriented Programming",
      "Algorithm Design",
      "Problem Solving"
    ]
  }
];

export const projectsData = [
  {
    id: "retailmind-ai",
    title: "RetailMind-AI",
    subtitle: "Agentic Retail Recommendation System with Memory and RAG",
    description: "An intelligent retail recommendation system designed to understand user queries, retrieve relevant product information, analyze customer reviews, identify product aspects and generate explainable recommendations.",
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
    architecture: [
      "Query Understanding",
      "RAG Retrieval",
      "Memory",
      "Sentiment & Aspect Analysis",
      "Ranking",
      "Explainable Recommendations"
    ],
    status: "Under Development",
    statusType: "in-progress", // 'completed' | 'in-progress'
    category: "AI / Machine Learning",
    badgeColor: "text-amber-400 bg-amber-400/10 border-amber-400/20",
    summary: "Architecting a multi-agent recommendation pipeline leveraging vector semantic search with BGE-M3 embeddings and contextual memory for personalized, auditable retail guidance.",
    hasArchitectureDiagram: true
  },
  {
    id: "medsafe-ai",
    title: "MedSafe AI",
    subtitle: "AI-Based Detection of Medication Errors and Dangerous Drug Interactions",
    description: "An AI-powered healthcare safety project focused on identifying medication errors and potentially dangerous drug interactions. Involves processing clinical and prescription documents and converting information into structured JSON for downstream analysis.",
    technologies: [
      "Python",
      "FastAPI",
      "React",
      "Vite",
      "AI/ML",
      "Document Processing",
      "JSON"
    ],
    architecture: [
      "Prescription Ingestion",
      "Document Processing & OCR/NER",
      "Structured JSON Normalization",
      "Interaction Risk Engine",
      "Clinical Alert Dashboard"
    ],
    status: "Under Development",
    statusType: "in-progress",
    category: "AI & Full-Stack",
    badgeColor: "text-sky-400 bg-sky-400/10 border-sky-400/20",
    summary: "Building an automated clinical verification interface that extracts active drug compounds from medical prescriptions and checks against safety interaction databases."
  },
  {
    id: "student-management-system",
    title: "Student Management System",
    subtitle: "Student CRUD Application",
    description: "A backend application implementing student record management with create, read, update and delete operations.",
    technologies: [
      "Node.js",
      "Express.js",
      "MongoDB",
      "Mongoose",
      "REST APIs"
    ],
    architecture: [
      "Express Routing",
      "Middleware & Validation",
      "Controller Logic",
      "Mongoose Schema Models",
      "MongoDB Database"
    ],
    status: "Completed Project",
    statusType: "completed",
    category: "Backend & Database",
    badgeColor: "text-emerald-400 bg-emerald-400/10 border-emerald-400/20",
    summary: "Engineered a modular RESTful CRUD service for student academic registries with data validation, schema enforcement, and responsive query endpoints."
  },
  {
    id: "devops-cicd-practice",
    title: "DevOps & CI/CD Practice",
    subtitle: "Automated Build & Container Orchestration Workflow",
    description: "Practical experience building and deploying applications using containerization, orchestration and CI/CD workflows.",
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
    architecture: [
      "Code Push (Git)",
      "Jenkins Pipeline Trigger",
      "Maven Build & Unit Test",
      "Docker Image Containerization",
      "Minikube / Kubernetes Pod Deployment"
    ],
    status: "Hands-on Practice / Labs",
    statusType: "in-progress",
    category: "DevOps & Cloud",
    badgeColor: "text-purple-400 bg-purple-400/10 border-purple-400/20",
    summary: "Constructed containerized build automation with automated triggers, Docker container packaging, and local Kubernetes cluster deployment routines."
  }
];

export const problemSolvingData = {
  headline: "Algorithmic Precision & Rigorous Thinking",
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
    { step: "01", title: "Problem Deconstruction", desc: "Isolate constraints, clarify assumptions, and inspect boundary conditions." },
    { step: "02", title: "Asymptotic Analysis", desc: "Evaluate brute force vs. target time O(n log n) / O(n) and auxiliary space." },
    { step: "03", title: "Optimal Pattern Selection", desc: "Map to proven paradigms: Two-Pointers, Sliding Window, Monotonic Stacks, DP." },
    { step: "04", title: "Clean & Robust Implementation", desc: "Write clean C++/Python code with zero memory leaks and guarded invariants." }
  ],
  platforms: [
    { name: "LeetCode", placeholder: "https://leetcode.com/placeholder-anoop", status: "Active Coding Profile" },
    { name: "Codeforces", placeholder: "https://codeforces.com/profile/placeholder-anoop", status: "Contest Rating Track" },
    { name: "GitHub", placeholder: "https://github.com/placeholder-anoop", status: "DSA Code Repository" },
    { name: "HackerRank", placeholder: "https://hackerrank.com/placeholder-anoop", status: "Problem Solving Badges" }
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
