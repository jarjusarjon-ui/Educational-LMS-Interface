import { 
  StudentProfile, 
  Course, 
  Assignment, 
  Quiz, 
  OnlineExam, 
  GradeEntry, 
  TimetableEvent, 
  ForumPost, 
  ChatThread, 
  LibraryBook, 
  TuitionInvoice, 
  Certificate, 
  JobOpportunity 
} from "./types";

export const initialStudentProfile: StudentProfile = {
  id: "st_9082",
  matricNo: "22018294",
  name: "Alieu Jallow",
  email: "alieu.jallow@utg.edu.gm",
  photoUrl: "https://upload.wikimedia.org/wikipedia/en/e/eb/University_of_the_Gambia_Logo.png", // official UTG logo
  program: "Bachelor of Science in Software Engineering",
  department: "Department of Computer Science & Information Technology",
  academicLevel: "Level 400",
  semester: "1st Semester 2025/2026",
  cgpa: 3.74,
  gpa: 3.82,
  totalCredits: 124,
  attendancePercentage: 92,
  skills: ["React & Node.js", "Python & Django", "PostgreSQL", "Software Architecture", "UI/UX Design", "Gambia National Quiz Runner-up"],
  achievements: ["UTG Hackathon 2025 First Place Winner", "Dean's List Award: Fall 2024", "UTG Tech Club Vice President"],
  emergencyContact: {
    name: "Lamin Jallow",
    relationship: "Father",
    phone: "+220 991 8234"
  }
};

export const initialCourses: Course[] = [
  {
    id: "cos_401",
    code: "SEN 401",
    title: "Software Architecture & Design Patterns",
    image: "https://images.unsplash.com/photo-1605379399642-870262d3d051?q=80&w=600&auto=format&fit=crop",
    lecturer: "Dr. Alieu Sowe",
    lecturerAvatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop",
    semester: "Level 400 - 1st Semester",
    creditHours: 4,
    progress: 68,
    completed: false,
    nextLesson: "Microservices vs. Monoliths Architecture",
    assignmentStatus: "pending",
    quizStatus: "available",
    rating: 4.8,
    overview: "This course covers advanced software engineering concepts, focusing on architectural patterns, modular design, clean code, design patterns, microservices architecture, and system scalability. Students will learn how to design, evaluate, and implement robust, maintainable, and scalable software systems for modern production environments.",
    learningObjectives: [
      "Understand and apply creational, structural, and behavioral design patterns.",
      "Analyze systemic trade-offs between architectural styles (e.g., SOA, microservices, event-driven).",
      "Draft comprehensive software architecture documentations using UML and system models.",
      "Evaluate system qualities such as scalability, maintainability, reliability, and security."
    ],
    modules: [
      {
        id: "m1",
        title: "Module 1: Introduction to Architectural Patterns",
        lessons: [
          {
            id: "l1_1",
            title: "1.1 Welcome & Syllabus Overview",
            duration: "12:45",
            videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
            completed: true,
            transcript: "Welcome to SEN 401 Software Architecture. In this lecture, we will outline the syllabus, talk about assignments, and look at the role of an architect at Google or in local tech scenes.",
            notes: "Architecture is the structure of structures. Read Chapters 1-3 of the Clean Architecture textbook.",
            downloads: [
              { name: "Course_Syllabus_SEN401.pdf", size: "1.2 MB", url: "#" },
              { name: "Reading_List_Patterns.pdf", size: "320 KB", url: "#" }
            ],
            comments: [
              { id: "c1", user: "Mariama Barrow", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop", text: "Excited for this course! Will we build a real-world microservices app?", date: "July 01, 2026" },
              { id: "c2", user: "Dr. Alieu Sowe", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop", text: "Yes Mariama, the final group project involves building a fully clustered system with Node.js and Docker.", date: "July 01, 2026" }
            ]
          },
          {
            id: "l1_2",
            title: "1.2 SOLID Principles in Software Design",
            duration: "24:10",
            videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
            completed: true,
            transcript: "The SOLID principles are five design principles of object-oriented class design. They are: Single Responsibility, Open/Closed, Liskov Substitution, Interface Segregation, and Dependency Inversion.",
            notes: "Ensure complete understanding of the Dependency Inversion principle as it drives clean architecture layers.",
            downloads: [{ name: "SOLID_Code_Examples.zip", size: "2.4 MB", url: "#" }]
          }
        ]
      },
      {
        id: "m2",
        title: "Module 2: Creational & Structural Design Patterns",
        lessons: [
          {
            id: "l2_1",
            title: "2.1 Singleton and Factory Patterns",
            duration: "30:15",
            videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
            completed: true,
            transcript: "Singletons guarantee that a class has only one instance and provides a global point of access to it. Factories handle instantiation logic abstractly.",
            notes: "Warning: Singletons can be an anti-pattern when overused. Keep them local or managed by DI containers."
          },
          {
            id: "l2_2",
            title: "2.2 Adapter, Decorator, and Proxy Patterns",
            duration: "28:50",
            videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
            completed: false,
            transcript: "This lecture demonstrates adapter, decorator, and proxy patterns. We use adapters to map interface mismatches, decorators to add dynamic behavior, and proxies to intercept invocations.",
            notes: "Implement a logging decorator as an exercise.",
            downloads: [{ name: "Structural_Patterns_Lab.pdf", size: "850 KB", url: "#" }]
          }
        ]
      },
      {
        id: "m3",
        title: "Module 3: Advanced Architectures (Active)",
        lessons: [
          {
            id: "l3_1",
            title: "3.1 Monolithic vs Microservices Architecture",
            duration: "35:40",
            videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
            completed: false,
            transcript: "We analyze why companies transition from monolothic systems to distributed microservices, including scaling factors, engineering boundaries, and deployability risks.",
            notes: "Read the Martin Fowler blogs on Microservices. Analyze service boundaries."
          },
          {
            id: "l3_2",
            title: "3.2 Event-Driven Architecture & Message Brokers",
            duration: "40:22",
            videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
            completed: false,
            transcript: "Event Sourcing and Pub/Sub mechanics with RabbitMQ or Kafka. Understanding asynchronous messaging, eventual consistency, and network partitions."
          }
        ]
      }
    ],
    announcements: [
      {
        id: "an_1",
        title: "Midterm Exam Date and Instructions",
        content: "Please note that the midsemester exam for SEN 401 will hold on Tuesday, July 14, 2026 in Lab A at 10:00 AM. It will be closed-book and cover Modules 1 and 2. Ensure your laptop is fully charged to boot the UTG Exam browser.",
        date: "July 02, 2026",
        important: true
      },
      {
        id: "an_2",
        title: "Virtual Office Hours rescheduled",
        content: "Office hours this Friday will be shifted to 4:00 PM - 5:30 PM due to a faculty meeting. The Google Meet link remains unchanged.",
        date: "June 28, 2026",
        important: false
      }
    ],
    faqs: [
      {
        id: "faq_1",
        question: "Can we write our final project in Python instead of Node.js?",
        answer: "Yes, you are allowed to use Python (FastAPI/Django) as long as you deploy it using docker-compose and write full integration tests."
      },
      {
        id: "faq_2",
        question: "Is attendance of live online sessions mandatory?",
        answer: "Yes. Attendance is tracked automatically on the portal. You must attend at least 80% of live classes to be eligible for the exam."
      }
    ],
    liveSession: {
      id: "live_401",
      topic: "Interactive Live Q&A: Microservices and System Design",
      date: "July 04, 2026",
      time: "10:00 AM - 12:00 PM",
      link: "https://meet.google.com/abc-defg-hij",
      active: true
    }
  },
  {
    id: "cos_411",
    code: "CSC 411",
    title: "Database Management Systems II",
    image: "https://images.unsplash.com/photo-1544383835-bda2bc66a55d?q=80&w=600&auto=format&fit=crop",
    lecturer: "Prof. Fatou Touray",
    lecturerAvatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=150&auto=format&fit=crop",
    semester: "Level 400 - 1st Semester",
    creditHours: 3,
    progress: 85,
    completed: false,
    nextLesson: "NoSQL DBs, MongoDB vs Cassandra",
    assignmentStatus: "submitted",
    quizStatus: "completed",
    rating: 4.6,
    overview: "Building on introductory database courses, CSC 411 covers advanced SQL queries, transaction isolation levels, indexing mechanics (B-Trees & Hash indexes), query execution plans, query optimization, NoSQL systems, and distributed database clustering. Practical labs are executed on PostgreSQL and MongoDB.",
    learningObjectives: [
      "Explain the ACID properties of transactions and configure transaction isolation levels.",
      "Build optimized query execution plans using indexing and SQL rewrites.",
      "Design highly available distributed database architectures with replication and sharding.",
      "Understand CAP Theorem and select databases matching architectural priorities."
    ],
    modules: [
      {
        id: "db_m1",
        title: "Module 1: Query Optimization & Indexing",
        lessons: [
          {
            id: "db_l1_1",
            title: "1.1 B-Tree and Hash Indexing Mechanics",
            duration: "25:00",
            videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
            completed: true
          },
          {
            id: "db_l1_2",
            title: "1.2 Reading Query Execution Plans (EXPLAIN)",
            duration: "22:15",
            videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
            completed: true
          }
        ]
      }
    ],
    announcements: [
      {
        id: "an_db1",
        title: "Assignment 2 Graded",
        content: "Assignment 2 on PostgreSQL Query Execution Plans is fully graded. Feedback and scores are visible in the Grades module.",
        date: "June 29, 2026",
        important: false
      }
    ],
    faqs: []
  },
  {
    id: "cos_415",
    code: "CSC 415",
    title: "Artificial Intelligence & Machine Learning",
    image: "https://images.unsplash.com/photo-1677442136019-21780efad99a?q=80&w=600&auto=format&fit=crop",
    lecturer: "Dr. Ousman Sabally",
    lecturerAvatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?q=80&w=150&auto=format&fit=crop",
    semester: "Level 400 - 1st Semester",
    creditHours: 4,
    progress: 40,
    completed: false,
    nextLesson: "Gradient Descent and Backpropagation",
    assignmentStatus: "pending",
    quizStatus: "available",
    rating: 4.9,
    overview: "This course introduces key paradigms in Artificial Intelligence and Machine Learning. Students will explore classical search algorithms, logical reasoning, regression, classification, neural networks, deep learning models, natural language processing, and ethical considerations of AI. Practical works are written using Python, NumPy, and PyTorch.",
    learningObjectives: [
      "Implement and evaluate search heuristics (A*, Minimax) for structured environments.",
      "Design and train supervised learning models (Linear Regression, Logistic Regression, SVM).",
      "Construct multi-layer neural networks and tune hyper-parameters.",
      "Examine local ethical issues including biased models and AI's impact on West African agriculture/tech."
    ],
    modules: [
      {
        id: "ai_m1",
        title: "Module 1: Classical Search Heuristics",
        lessons: [
          {
            id: "ai_l1_1",
            title: "1.1 Introduction to Intelligent Agents",
            duration: "18:20",
            videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
            completed: true
          },
          {
            id: "ai_l1_2",
            title: "1.2 Uniformed vs Informed Search (A* Heuristics)",
            duration: "32:40",
            videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
            completed: true
          }
        ]
      }
    ],
    announcements: [],
    faqs: []
  },
  {
    id: "cos_431",
    code: "SEN 431",
    title: "Mobile Application Engineering",
    image: "https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=600&auto=format&fit=crop",
    lecturer: "Mr. Lamin Jobe",
    lecturerAvatar: "https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?q=80&w=150&auto=format&fit=crop",
    semester: "Level 400 - 1st Semester",
    creditHours: 3,
    progress: 100,
    completed: true,
    nextLesson: "Course Completed! Prepare for project presentation",
    assignmentStatus: "graded",
    quizStatus: "none",
    rating: 4.7,
    overview: "This course covers the engineering, design, and deployment of native and cross-platform mobile applications. Focus areas include React Native, Kotlin/Compose, mobile state management, offline database persistence (SQLite/WatermelonDB), background tasks, push notifications, and app store deployment. Students build and deploy an offline-first app.",
    learningObjectives: [
      "Build highly interactive mobile user interfaces using declarative rendering.",
      "Configure complex client navigation routers (Stack, Tabs, Drawers).",
      "Manage async states, network offline synchronization, and hardware APIs.",
      "Build and compile production-ready APKs and bundles."
    ],
    modules: [
      {
        id: "mo_m1",
        title: "Module 1: Cross-Platform Native Rendering",
        lessons: [
          {
            id: "mo_l1_1",
            title: "1.1 Welcome & Native vs Cross-Platform Paradigms",
            duration: "15:40",
            videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
            completed: true
          },
          {
            id: "mo_l1_2",
            title: "1.2 Layout Systems & Flexbox on Mobile Screen",
            duration: "25:30",
            videoUrl: "https://www.w3schools.com/html/mov_bbb.mp4",
            completed: true
          }
        ]
      }
    ],
    announcements: [
      {
        id: "an_mo1",
        title: "Project Presentation Schedule Released",
        content: "The presentation of your final mobile applications will start on Monday, July 13. Please book a 15-minute slot on my calendar before Friday.",
        date: "July 01, 2026",
        important: true
      }
    ],
    faqs: []
  }
];

export const initialAssignments: Assignment[] = [
  {
    id: "as_01",
    courseId: "cos_401",
    courseCode: "SEN 401",
    title: "Assignment 1: UML Modeling and Architectural Mapping",
    instructions: "Design a comprehensive component and deployment diagram for a high-traffic e-commerce system that handles 50,000 transactions/sec. Write a 1,500-word explanation of your architectural choices, including trade-offs between monolithic architecture and event-driven microservices. Submit as a single PDF.",
    deadline: "July 12, 2026 23:59",
    fileUploaded: null,
    uploadedDate: null,
    status: "pending",
    marks: null,
    feedback: null,
    allowResubmission: true,
    rubric: [
      { criterion: "System Diagram Accuracy", maxPoints: 30, description: "Correct notation of UML component and deployment elements" },
      { criterion: "Architectural Justification", maxPoints: 40, description: "Logical reasoning behind decoupling boundaries and data pipelines" },
      { criterion: "Trade-offs Analysis", maxPoints: 30, description: "Comparison of latencies, database locks, and single-point-of-failures" }
    ]
  },
  {
    id: "as_02",
    courseId: "cos_415",
    courseCode: "CSC 415",
    title: "Assignment 1: Multi-Layer Perceptron From Scratch",
    instructions: "Write a pure Python implementation of a Multi-Layer Perceptron (MLP) using NumPy only. Implement forward propagation, backpropagation, categorical cross-entropy loss, and SGD optimization. Train it on the MNIST handwritten digit dataset. Submit a Jupyter Notebook (.ipynb) with fully commented cells and loss convergence graphs.",
    deadline: "July 09, 2026 23:59",
    fileUploaded: null,
    uploadedDate: null,
    status: "pending",
    marks: null,
    feedback: null,
    allowResubmission: false,
    rubric: [
      { criterion: "Gradient Derivation", maxPoints: 40, description: "Correct implementation of chain-rule and weight updates" },
      { criterion: "Convergence Output", maxPoints: 30, description: "Graphs showing steady decline in training and validation loss below 0.1" },
      { criterion: "Code Structure", maxPoints: 30, description: "Proper functions encapsulation and matrix operations avoiding loops" }
    ]
  },
  {
    id: "as_03",
    courseId: "cos_411",
    courseCode: "CSC 411",
    title: "Assignment 2: PostgreSQL Index Tuning Lab",
    instructions: "Analyze a large database schema with over 10 million record entries. Identify bottleneck queries, generate EXPLAIN (ANALYZE, BUFFERS) query plans, write optimized composite indexes, and measure execution speedup. Record detailed before-and-after query metrics.",
    deadline: "June 25, 2026 23:59",
    fileUploaded: "CSC_411_PostgreSQL_Lab2_Alieu_Jallow.pdf",
    uploadedDate: "June 24, 2026 15:30",
    status: "submitted",
    marks: null,
    feedback: null,
    allowResubmission: true,
    rubric: []
  },
  {
    id: "as_04",
    courseId: "cos_431",
    courseCode: "SEN 431",
    title: "Final Capstone Project: Offline-First Mobile App",
    instructions: "Design, build, and deploy an offline-first mobile application in React Native or Flutter. Integrate SQLite for local data persistence, sync queues for online reconcile, and biometrics. Submit the GitHub repository link and a 5-minute video demonstration.",
    deadline: "June 20, 2026 23:59",
    fileUploaded: "SEN_431_Capstone_App_Final.zip",
    uploadedDate: "June 19, 2026 11:24",
    status: "graded",
    marks: "95 / 100",
    feedback: "Exceptional system architecture, Alieu! Your background database sync handler solves complex synchronization conflicts masterfully. Excellent UI layout, fits beautifully on Gambia 3G networks.",
    allowResubmission: false,
    rubric: []
  }
];

export const initialQuizzes: Quiz[] = [
  {
    id: "qz_01",
    courseId: "cos_401",
    courseCode: "SEN 401",
    title: "Quiz 1: Design Patterns and Creational Paradigms",
    durationMinutes: 15,
    dueDate: "July 08, 2026 23:59",
    status: "available",
    questions: [
      {
        id: "q1",
        text: "Which design pattern is best suited for restricting a class to a single instance while providing global access to it?",
        type: "mcq",
        options: ["Prototype Pattern", "Singleton Pattern", "Factory Method", "Builder Pattern"],
        correctAnswer: "Singleton Pattern"
      },
      {
        id: "q2",
        text: "True or False: The Abstract Factory pattern creates concrete products directly without using abstract product interfaces.",
        type: "true_false",
        correctAnswer: "False"
      },
      {
        id: "q3",
        text: "Which SOLID design principle is violated if subclasses are not fully interchangeable with their base classes?",
        type: "mcq",
        options: ["Single Responsibility", "Open/Closed Principle", "Liskov Substitution Principle", "Dependency Inversion"],
        correctAnswer: "Liskov Substitution Principle"
      },
      {
        id: "q4",
        text: "Describe briefly why the Dependency Inversion Principle is key to building modular frameworks.",
        type: "short_answer",
        correctAnswer: "It decouples high-level policy modules from low-level detail modules by making both depend on abstractions, allowing details to change without breaking business core rules."
      }
    ]
  },
  {
    id: "qz_02",
    courseId: "cos_411",
    courseCode: "CSC 411",
    title: "Quiz 2: Transaction Isolation & ACID Properties",
    durationMinutes: 10,
    dueDate: "June 20, 2026 23:59",
    status: "completed",
    score: 90,
    attempts: 1,
    questions: [
      {
        id: "dbq1",
        text: "What is the highest isolation level in SQL standard database transactions?",
        type: "mcq",
        options: ["Read Committed", "Repeatable Read", "Serializable", "Read Uncommitted"],
        correctAnswer: "Serializable",
        chosenAnswer: "Serializable"
      },
      {
        id: "dbq2",
        text: "The 'I' in ACID transactions stands for: ____________",
        type: "fill_blank",
        correctAnswer: "Isolation",
        chosenAnswer: "Isolation"
      }
    ]
  }
];

export const initialExams: OnlineExam[] = [
  {
    id: "ex_401",
    courseCode: "SEN 401",
    title: "SEN 401 Mid-Semester Online Examination",
    durationMinutes: 60,
    scheduledTime: "July 14, 2026 10:00 AM",
    status: "upcoming",
    rules: [
      "This is a monitored exam. You must keep your camera and microphone enabled inside the UTG Secure IFrame.",
      "Leaving full-screen mode or switching browser tabs will trigger automatic system warnings and can flag your session.",
      "Answer all parts. Questions comprise multiple-choice, matching, and short system design essays.",
      "The system will auto-save your answers every 30 seconds."
    ],
    questions: [
      {
        id: "ex_q1",
        text: "Which architectural style centers around asynchronous event streams, message publishers, and consumer queues to isolate execution contexts?",
        type: "mcq",
        options: ["Monolithic Pipeline", "Event-Driven Architecture", "Service Oriented Layering", "Client-Server RPC"],
        correctAnswer: "Event-Driven Architecture"
      },
      {
        id: "ex_q2",
        text: "In Microservices databases, 'Eventual Consistency' is a trade-off governed by which system design theorem?",
        type: "mcq",
        options: ["Fowler's Law", "CAP Theorem", "Amdahl's Law", "Conway's Law"],
        correctAnswer: "CAP Theorem"
      },
      {
        id: "ex_q3",
        text: "Explain the main differences between Domain-Driven Design (DDD) 'Bounded Contexts' and standard sub-domains.",
        type: "essay",
        correctAnswer: "A sub-domain is a part of the actual business problem space, whereas a Bounded Context defines a boundary within the solution space where a specific domain model applies consistently. Inside a Bounded Context, terms have unique, strictly defined meanings, which prevents semantic overloading."
      }
    ]
  }
];

export const initialGrades: GradeEntry[] = [
  // Current semester
  { courseCode: "SEN 431", courseTitle: "Mobile Application Engineering", credits: 3, grade: "A", score: 92, points: 4.0, semester: "1st Semester 2025/2026" },
  { courseCode: "CSC 411", courseTitle: "Database Management Systems II", credits: 3, grade: "A-", score: 87, points: 3.7, semester: "1st Semester 2025/2026" },
  
  // Previous Semesters
  { courseCode: "SEN 302", courseTitle: "Requirements Engineering", credits: 3, grade: "A", score: 94, points: 4.0, semester: "2nd Semester 2024/2025" },
  { courseCode: "CSC 312", courseTitle: "Operating Systems", credits: 4, grade: "B+", score: 83, points: 3.3, semester: "2nd Semester 2024/2025" },
  { courseCode: "CSC 316", courseTitle: "Algorithm Analysis & Complexity", credits: 4, grade: "A", score: 91, points: 4.0, semester: "2nd Semester 2024/2025" },
  { courseCode: "CSC 311", courseTitle: "Database Management Systems I", credits: 3, grade: "B+", score: 81, points: 3.3, semester: "1st Semester 2024/2025" },
  { courseCode: "MTH 201", courseTitle: "Linear Algebra", credits: 4, grade: "A-", score: 86, points: 3.7, semester: "1st Semester 2024/2025" },
  { courseCode: "SEN 301", courseTitle: "Software Verification & Validation", credits: 3, grade: "A", score: 96, points: 4.0, semester: "1st Semester 2024/2025" }
];

export const initialTimetable: TimetableEvent[] = [
  { id: "tt_1", courseCode: "SEN 401", title: "Software Architecture", type: "lecture", day: "Monday", startTime: "09:00", endTime: "11:00", room: "FST Seminar Room A", link: "https://meet.google.com/abc-defg-hij" },
  { id: "tt_2", courseCode: "CSC 415", title: "AI & Machine Learning", type: "lecture", day: "Monday", startTime: "12:00", endTime: "14:00", room: "IT Lab B", link: "https://meet.google.com/xyz-lmno-pqr" },
  { id: "tt_3", courseCode: "CSC 411", title: "Advanced Databases", type: "lecture", day: "Tuesday", startTime: "10:00", endTime: "12:00", room: "FST Room 12", link: "https://meet.google.com/pqr-stuv-wxy" },
  { id: "tt_4", courseCode: "SEN 401", title: "Software Architecture (Tutorial)", type: "tutorial", day: "Wednesday", startTime: "11:00", endTime: "13:00", room: "FST Room 4", link: "https://meet.google.com/abc-defg-hij" },
  { id: "tt_5", courseCode: "CSC 415", title: "AI & Machine Learning (Lab)", type: "lab", day: "Thursday", startTime: "14:00", endTime: "16:00", room: "AI Lab C", link: "https://meet.google.com/xyz-lmno-pqr" }
];

export const initialForumPosts: ForumPost[] = [
  {
    id: "fp_1",
    courseId: "cos_401",
    courseCode: "SEN 401",
    author: "Alieu Jallow",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop",
    role: "student",
    title: "Understanding Dependency Inversion in Hexagonal Architecture",
    content: "Hi classmates! I am working on building out the directories for our software architecture group lab. When applying Hexagonal Architecture (Ports and Adapters), should the repository interface (Port) live inside the domain core module, or inside the database module? I am slightly confused by different online blogs.",
    date: "July 02, 2026 12:44 PM",
    likes: 8,
    replies: [
      {
        id: "fr_1",
        author: "Dr. Alieu Sowe",
        avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop",
        role: "lecturer",
        content: "Excellent question, Alieu. The Port interface MUST live in the Domain Core module. This represents the requirement that the domain core defines for data storage. The adapter (which implements the interface, e.g. SQLRepository) lives in the Infrastructure/Database module. This is the essence of Dependency Inversion: the database depends on the domain core, not the other way around.",
        date: "July 02, 2026 01:15 PM"
      },
      {
        id: "fr_2",
        author: "Mariama Barrow",
        avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop",
        role: "student",
        content: "Thanks Dr. Sowe! That makes perfect sense. So our business logic never compiles against any raw SQL drivers directly.",
        date: "July 02, 2026 01:40 PM"
      }
    ]
  },
  {
    id: "fp_2",
    courseId: "cos_401",
    courseCode: "SEN 401",
    author: "Dr. Alieu Sowe",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop",
    role: "lecturer",
    title: "Recommended textbooks on Enterprise Patterns",
    content: "Greetings all. For supplementary reading, I highly recommend downloading 'Patterns of Enterprise Application Architecture' by Martin Fowler from our UTG Digital Library. Pay close attention to Unit of Work and Data Mapper sections as they are highly relevant for the upcoming quiz.",
    date: "June 28, 2026 09:30 AM",
    likes: 12,
    pinned: true,
    replies: []
  }
];

export const initialChats: ChatThread[] = [
  {
    id: "ch_1",
    name: "Dr. Alieu Sowe",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop",
    isGroup: false,
    lastMessage: "Make sure you include the UML models in your submission.",
    unreadCount: 1,
    role: "SEN 401 Lecturer",
    messages: [
      { id: "m_c1_1", sender: "Alieu Jallow", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop", text: "Good afternoon Dr. Sowe. I wanted to verify if a hand-drawn architecture model is acceptable for Assignment 1 if scanned?", timestamp: "July 01, 14:15", isMe: true },
      { id: "m_c1_2", sender: "Dr. Alieu Sowe", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop", text: "Hello Alieu. I strongly prefer digital models created in Draw.io or Lucidchart. It is much cleaner to read and grade.", timestamp: "July 01, 15:30", isMe: false },
      { id: "m_c1_3", sender: "Alieu Jallow", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop", text: "Understood, I will draw them digitally then. Thank you, sir.", timestamp: "July 01, 15:35", isMe: true },
      { id: "m_c1_4", sender: "Dr. Alieu Sowe", avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?q=80&w=150&auto=format&fit=crop", text: "Make sure you include the UML models in your submission.", timestamp: "July 02, 11:20", isMe: false }
    ]
  },
  {
    id: "ch_2",
    name: "UTG Tech Club Study Group",
    avatar: "https://images.unsplash.com/photo-1582213782179-e0d53f98f2ca?q=80&w=150&auto=format&fit=crop",
    isGroup: true,
    lastMessage: "Mariama: I just finished training my MLP, it hit 94% accuracy!",
    unreadCount: 0,
    messages: [
      { id: "m_c2_1", sender: "Ebrima Darboe", avatar: "https://images.unsplash.com/photo-1539571696357-5a69c17a67c6?q=80&w=100&auto=format&fit=crop", text: "Who has started the Python AI coding?", timestamp: "June 29, 10:00", isMe: false },
      { id: "m_c2_2", sender: "Alieu Jallow", avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?q=80&w=100&auto=format&fit=crop", text: "I have. The matrices multiplications are quite clean once you match dimensions in NumPy.", timestamp: "June 29, 10:05", isMe: true },
      { id: "m_c2_3", sender: "Mariama Barrow", avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?q=80&w=150&auto=format&fit=crop", text: "I just finished training my MLP, it hit 94% accuracy!", timestamp: "June 29, 10:44", isMe: false }
    ]
  }
];

export const initialLibraryBooks: LibraryBook[] = [
  {
    id: "bk_1",
    title: "Clean Architecture: A Craftsman's Guide to Software Structure",
    author: "Robert C. Martin",
    category: "Software Engineering",
    year: 2017,
    coverUrl: "https://images.unsplash.com/photo-1532012197267-da84d127e765?q=80&w=150&auto=format&fit=crop",
    citation: "Martin, R. C. (2017). Clean architecture. Prentice Hall.",
    downloadsCount: 1420,
    fileSize: "8.4 MB"
  },
  {
    id: "bk_2",
    title: "Patterns of Enterprise Application Architecture",
    author: "Martin Fowler",
    category: "Software Engineering",
    year: 2002,
    coverUrl: "https://images.unsplash.com/photo-1629654297299-c8506221ca97?q=80&w=150&auto=format&fit=crop",
    citation: "Fowler, M. (2002). Patterns of Enterprise Application Architecture. Addison-Wesley.",
    downloadsCount: 980,
    fileSize: "14.2 MB"
  },
  {
    id: "bk_3",
    title: "Introduction to Machine Learning with Python",
    author: "Andreas C. Müller & Sarah Guido",
    category: "Artificial Intelligence",
    year: 2016,
    coverUrl: "https://images.unsplash.com/photo-1515879218367-8466d910aaa4?q=80&w=150&auto=format&fit=crop",
    citation: "Müller, A. C., & Guido, S. (2016). Introduction to machine learning with Python. O'Reilly Media.",
    downloadsCount: 2150,
    fileSize: "11.1 MB"
  },
  {
    id: "bk_4",
    title: "Database System Concepts (7th Edition)",
    author: "Abraham Silberschatz",
    category: "Computer Science",
    year: 2019,
    coverUrl: "https://images.unsplash.com/photo-1543002588-bfa74002ed7e?q=80&w=150&auto=format&fit=crop",
    citation: "Silberschatz, A., Korth, H. F., & Sudarshan, S. (2019). Database system concepts. McGraw-Hill.",
    downloadsCount: 740,
    fileSize: "23.5 MB"
  }
];

export const initialInvoices: TuitionInvoice[] = [
  { id: "inv_01", title: "UTG Semester Registration Fee - Fall 2025/2026", amount: 18400, status: "paid", dueDate: "January 15, 2026", datePaid: "January 14, 2026", receiptNumber: "UTG-REC-90184" },
  { id: "inv_02", title: "FST Laboratory & Resource Levy", amount: 3500, status: "paid", dueDate: "February 01, 2026", datePaid: "January 28, 2026", receiptNumber: "UTG-REC-91022" },
  { id: "inv_03", title: "Tuition Fees (1st Semester Level 400)", amount: 28500, status: "unpaid", dueDate: "July 20, 2026" }
];

export const initialCertificates: Certificate[] = [
  { id: "cert_01", title: "Specialization Certificate in Enterprise Database Management", issuedBy: "UTG FST Department", issueDate: "June 30, 2025", qrCodeUrl: "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=UTG-CERT-CSC411-22018294", courseId: "cos_411" },
  { id: "cert_02", title: "Full-Stack Web Development Honors Badge", issuedBy: "UTG Computer Science Club", issueDate: "April 12, 2025", qrCodeUrl: "https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=UTG-BADGE-WEB-22018294", courseId: "cos_431" }
];

export const initialJobOpportunities: JobOpportunity[] = [
  {
    id: "job_01",
    title: "Junior Cloud Engineer Internship",
    company: "QCell Gambia Limited",
    location: "Kairaba Avenue, Serrekunda",
    type: "Internship",
    salary: "D15,000 / month",
    deadline: "July 20, 2026",
    description: "QCell is looking for a dynamic student intern from UTG's Software Engineering department to join our systems operations team. You will support infrastructure provisioning, write bash automation scripts, and manage cloud monitoring alerts.",
    requirements: [
      "Basic understanding of Linux system administration",
      "Familiarity with containerization (Docker)",
      "Good knowledge of networking protocols (TCP/IP, DNS)",
      "Strong problem-solving mindset and team communication"
    ]
  },
  {
    id: "job_02",
    title: "Junior Python Web Developer",
    company: "InSist Global Gambia",
    location: "Fajara, Bakau",
    type: "Full-time",
    salary: "D35,000 - D45,000 / month",
    deadline: "August 05, 2026",
    description: "InSist Global, Gambia's leading software development house, is looking to recruit outstanding final-year UTG Computer Science graduates. You will build and scale web applications, configure relational SQL servers, and collaborate in agile sprint cycles.",
    requirements: [
      "Proficient in Python and Django/Flask",
      "Familiarity with React or Vue frontend frameworks",
      "Understanding of relational database modeling (PostgreSQL)",
      "Strong analytical and logic execution"
    ]
  }
];
