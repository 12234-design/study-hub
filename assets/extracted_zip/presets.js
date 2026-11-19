// JIIT Noida Academic Structure & Exam Presets
// T1 (20 Marks), T2 (20 Marks), T3 (35 Marks)

const JIIT_EXAMS = {
  t1: {
    key: "t1",
    name: "T1 Examination (20 Marks)",
    shortName: "T1 Exam",
    marks: "20 Marks",
    weightageDesc: "Test 1: 20% of theory evaluation (Syllabus: Units 1 & 2)",
    targetDate: "2027-02-15T09:30:00",
    badgeColor: "#3b82f6",
    advice: "💡 T1 Strategy: Focus on foundational concepts (Units 1 & 2). Review tutorial problem sheets and faculty lecture notes thoroughly!"
  },
  t2: {
    key: "t2",
    name: "T2 Examination (20 Marks)",
    shortName: "T2 Exam",
    marks: "20 Marks",
    weightageDesc: "Test 2: 20% of theory evaluation (Syllabus: Units 3 & 4)",
    targetDate: "2027-03-25T09:30:00",
    badgeColor: "#06b6d4",
    advice: "💡 T2 Strategy: Test 2 is typically the most rigorous application-oriented exam. Solve previous year T2 question papers and code/derivations!"
  },
  t3: {
    key: "t3",
    name: "T3 Examination (35 Marks - End Sem)",
    shortName: "T3 End-Sem Exam",
    marks: "35 Marks",
    weightageDesc: "Test 3: Major End-Semester Final (Full / Major Syllabus)",
    targetDate: "2027-05-18T09:30:00",
    badgeColor: "#6366f1",
    advice: "🚨 T3 Strategy: End-Semester carries the heaviest weightage (35 marks)! Prioritize comprehensive revision of all modules, previous T1/T2 mistakes, and high-credit core subjects."
  }
};

// 5 Branches x 4 Semesters Data Architecture for JIIT Noida
const BRANCH_DATA = {
  cse: {
    name: "Computer Science & Engineering",
    shortName: "CSE",
    semesters: {
      sem1: {
        name: "Semester 1",
        subjects: [
          {
            id: "cse_s1_sdf1",
            code: "15B11CI111",
            name: "Software Development Fundamentals - I",
            color: "#3b82f6",
            chapters: [
              { id: "sdf1_1", name: "C Programming Basics, Variables & Operators", examTag: "T1", weightage: "Medium", status: "completed", targetHours: 5 },
              { id: "sdf1_2", name: "Control Structures & Loops (while, for, do-while)", examTag: "T1", weightage: "High", status: "in-progress", targetHours: 7 },
              { id: "sdf1_3", name: "Functions, Recursion & Scope Rules", examTag: "T2", weightage: "High", status: "not-started", targetHours: 8 },
              { id: "sdf1_4", name: "1D/2D Arrays, Strings & Character Manipulation", examTag: "T2", weightage: "High", status: "not-started", targetHours: 9 },
              { id: "sdf1_5", name: "Pointers, Dynamic Memory Allocation & Structs", examTag: "T3", weightage: "High", status: "not-started", targetHours: 10 }
            ]
          },
          {
            id: "cse_s1_math1",
            code: "15B11MA111",
            name: "Mathematics - I",
            color: "#6366f1",
            chapters: [
              { id: "m1_1", name: "Matrices, Rank, Eigenvalues & Cayley-Hamilton", examTag: "T1", weightage: "High", status: "completed", targetHours: 7 },
              { id: "m1_2", name: "Differential Calculus & Mean Value Theorems", examTag: "T1", weightage: "Medium", status: "not-started", targetHours: 6 },
              { id: "m1_3", name: "Partial Differentiation & Maxima/Minima (Lagrange)", examTag: "T2", weightage: "High", status: "not-started", targetHours: 8 },
              { id: "m1_4", name: "Multiple Integrals (Double & Triple Integrals)", examTag: "T2", weightage: "High", status: "not-started", targetHours: 8 },
              { id: "m1_5", name: "Vector Calculus (Grad, Div, Curl, Gauss/Stokes)", examTag: "T3", weightage: "High", status: "not-started", targetHours: 9 }
            ]
          },
          {
            id: "cse_s1_phy1",
            code: "15B11PH111",
            name: "Physics - I",
            color: "#06b6d4",
            chapters: [
              { id: "p1_1", name: "Interference & Diffraction of Light", examTag: "T1", weightage: "High", status: "completed", targetHours: 6 },
              { id: "p1_2", name: "Polarization & Laser Fundamentals", examTag: "T1", weightage: "Medium", status: "not-started", targetHours: 6 },
              { id: "p1_3", name: "Fiber Optics & Dielectric Properties", examTag: "T2", weightage: "Medium", status: "not-started", targetHours: 6 },
              { id: "p1_4", name: "Electromagnetism & Maxwell's Equations", examTag: "T2", weightage: "High", status: "not-started", targetHours: 8 },
              { id: "p1_5", name: "Quantum Mechanics & Wave Packets", examTag: "T3", weightage: "High", status: "not-started", targetHours: 8 }
            ]
          },
          {
            id: "cse_s1_eng",
            code: "15B11HS111",
            name: "English & Professional Communication",
            color: "#10b981",
            chapters: [
              { id: "eng1_1", name: "Grammar, Phonetics & Technical Vocabulary", examTag: "T1", weightage: "Medium", status: "completed", targetHours: 4 },
              { id: "eng1_2", name: "Reading Comprehension & Critical Analysis", examTag: "T1", weightage: "Medium", status: "not-started", targetHours: 4 },
              { id: "eng1_3", name: "Formal Letter, Resume & Email Writing", examTag: "T2", weightage: "High", status: "not-started", targetHours: 5 },
              { id: "eng1_4", name: "Technical Report Writing & Presentation Skills", examTag: "T3", weightage: "High", status: "not-started", targetHours: 6 }
            ]
          }
        ]
      },
      sem2: {
        name: "Semester 2",
        subjects: [
          {
            id: "cse_s2_sdf2",
            code: "15B11CI211",
            name: "Software Development Fundamentals - II (OOP)",
            color: "#3b82f6",
            chapters: [
              { id: "sdf2_1", name: "OOP Concepts: Classes, Objects & Constructors", examTag: "T1", weightage: "Medium", status: "completed", targetHours: 6 },
              { id: "sdf2_2", name: "Operator Overloading & Friend Functions", examTag: "T1", weightage: "High", status: "not-started", targetHours: 7 },
              { id: "sdf2_3", name: "Inheritance Types & Virtual Base Classes", examTag: "T2", weightage: "High", status: "not-started", targetHours: 8 },
              { id: "sdf2_4", name: "Polymorphism, Virtual Functions & Abstract Classes", examTag: "T2", weightage: "High", status: "not-started", targetHours: 9 },
              { id: "sdf2_5", name: "Templates, STL & Exception Handling", examTag: "T3", weightage: "High", status: "not-started", targetHours: 10 }
            ]
          },
          {
            id: "cse_s2_math2",
            code: "15B11MA211",
            name: "Mathematics - II",
            color: "#6366f1",
            chapters: [
              { id: "m2_1", name: "First Order Ordinary Differential Equations", examTag: "T1", weightage: "Medium", status: "completed", targetHours: 6 },
              { id: "m2_2", name: "Linear Differential Equations of Higher Order", examTag: "T1", weightage: "High", status: "not-started", targetHours: 7 },
              { id: "m2_3", name: "Laplace Transforms & Inverse Laplace", examTag: "T2", weightage: "High", status: "not-started", targetHours: 9 },
              { id: "m2_4", name: "Fourier Series & Harmonic Analysis", examTag: "T2", weightage: "High", status: "not-started", targetHours: 8 },
              { id: "m2_5", name: "Partial Differential Equations (Heat/Wave/Laplace)", examTag: "T3", weightage: "High", status: "not-started", targetHours: 10 }
            ]
          },
          {
            id: "cse_s2_bee",
            code: "15B11EC111",
            name: "Electrical Science",
            color: "#f59e0b",
            chapters: [
              { id: "bee_1", name: "DC Circuit Analysis: KCL, KVL, Thevenin, Norton", examTag: "T1", weightage: "High", status: "completed", targetHours: 7 },
              { id: "bee_2", name: "AC Fundamentals, Phasor Diagrams & Resonance", examTag: "T1", weightage: "High", status: "not-started", targetHours: 7 },
              { id: "bee_3", name: "Three Phase Circuits & Transformers", examTag: "T2", weightage: "High", status: "not-started", targetHours: 8 },
              { id: "bee_4", name: "Semiconductor Diodes & BJT Transistors", examTag: "T3", weightage: "High", status: "not-started", targetHours: 9 }
            ]
          }
        ]
      },
      sem3: {
        name: "Semester 3",
        subjects: [
          {
            id: "cse_s3_ds",
            code: "15B11CI311",
            name: "Data Structures",
            color: "#3b82f6",
            chapters: [
              { id: "ds_1", name: "Arrays, Pointers & Linked Lists", examTag: "T1", weightage: "Medium", status: "completed", targetHours: 6 },
              { id: "ds_2", name: "Stacks, Queues & Recursion", examTag: "T1", weightage: "High", status: "in-progress", targetHours: 8 },
              { id: "ds_3", name: "Trees: Binary Trees, BST & Traversals", examTag: "T2", weightage: "High", status: "not-started", targetHours: 9 },
              { id: "ds_4", name: "AVL Trees & Heaps / Priority Queues", examTag: "T2", weightage: "High", status: "not-started", targetHours: 9 },
              { id: "ds_5", name: "Hashing Techniques & Graph Traversals", examTag: "T3", weightage: "High", status: "not-started", targetHours: 11 }
            ]
          },
          {
            id: "cse_s3_de",
            code: "15B11EC311",
            name: "Digital Electronics",
            color: "#06b6d4",
            chapters: [
              { id: "de_1", name: "Number Systems, Boolean Algebra & K-Maps", examTag: "T1", weightage: "Medium", status: "completed", targetHours: 6 },
              { id: "de_2", name: "Combinational Circuits (Adders, Multiplexers, Decoders)", examTag: "T1", weightage: "High", status: "not-started", targetHours: 7 },
              { id: "de_3", name: "Sequential Circuits: Latches, Flip-Flops & Registers", examTag: "T2", weightage: "High", status: "not-started", targetHours: 9 },
              { id: "de_4", name: "Synchronous & Asynchronous Counters", examTag: "T2", weightage: "High", status: "not-started", targetHours: 8 },
              { id: "de_5", name: "Finite State Machines & Memory Devices (RAM/ROM)", examTag: "T3", weightage: "High", status: "not-started", targetHours: 9 }
            ]
          },
          {
            id: "cse_s3_dm",
            code: "15B11MA311",
            name: "Discrete Mathematics",
            color: "#6366f1",
            chapters: [
              { id: "dm_1", name: "Sets, Relations, Equivalence & POSETs", examTag: "T1", weightage: "Medium", status: "completed", targetHours: 6 },
              { id: "dm_2", name: "Propositional Logic & First Order Predicates", examTag: "T1", weightage: "High", status: "not-started", targetHours: 7 },
              { id: "dm_3", name: "Combinatorics, Generating Functions & Recurrence", examTag: "T2", weightage: "High", status: "not-started", targetHours: 9 },
              { id: "dm_4", name: "Algebraic Structures: Groups, Rings & Fields", examTag: "T2", weightage: "High", status: "not-started", targetHours: 8 },
              { id: "dm_5", name: "Graph Theory: Paths, Trees, Coloring & Planarity", examTag: "T3", weightage: "High", status: "not-started", targetHours: 10 }
            ]
          }
        ]
      },
      sem4: {
        name: "Semester 4",
        subjects: [
          {
            id: "cse_s4_os",
            code: "15B11CI411",
            name: "Operating Systems",
            color: "#3b82f6",
            chapters: [
              { id: "os_1", name: "OS Overview, Architecture & System Calls", examTag: "T1", weightage: "Medium", status: "completed", targetHours: 5 },
              { id: "os_2", name: "Process Management & CPU Scheduling Algorithms", examTag: "T1", weightage: "High", status: "in-progress", targetHours: 8 },
              { id: "os_3", name: "Process Synchronization, Semaphores & Monitors", examTag: "T2", weightage: "High", status: "not-started", targetHours: 9 },
              { id: "os_4", name: "Deadlocks: Prevention, Avoidance (Banker's) & Detection", examTag: "T2", weightage: "Medium", status: "not-started", targetHours: 6 },
              { id: "os_5", name: "Memory Management: Paging, Segmentation & Virtual Memory", examTag: "T3", weightage: "High", status: "not-started", targetHours: 10 },
              { id: "os_6", name: "File Systems & Disk Scheduling (SCAN, C-SCAN, SSTF)", examTag: "T3", weightage: "Medium", status: "not-started", targetHours: 6 }
            ]
          },
          {
            id: "cse_s4_dbms",
            code: "15B11CI412",
            name: "Database Systems (DBMS)",
            color: "#06b6d4",
            chapters: [
              { id: "db_1", name: "ER Modeling & Relational Schema Mapping", examTag: "T1", weightage: "Medium", status: "completed", targetHours: 5 },
              { id: "db_2", name: "Relational Algebra & Advanced SQL Queries", examTag: "T1", weightage: "High", status: "in-progress", targetHours: 8 },
              { id: "db_3", name: "Normalization Theory (1NF, 2NF, 3NF, BCNF)", examTag: "T2", weightage: "High", status: "not-started", targetHours: 9 },
              { id: "db_4", name: "Transactions, ACID Properties & Serializability", examTag: "T2", weightage: "High", status: "not-started", targetHours: 7 },
              { id: "db_5", name: "Concurrency Control Protocols & Two-Phase Locking", examTag: "T3", weightage: "High", status: "not-started", targetHours: 8 },
              { id: "db_6", name: "Indexing, B+ Trees & Query Optimization", examTag: "T3", weightage: "Medium", status: "not-started", targetHours: 6 }
            ]
          },
          {
            id: "cse_s4_algo",
            code: "15B11CI413",
            name: "Algorithms & Problem Solving",
            color: "#6366f1",
            chapters: [
              { id: "al_1", name: "Asymptotic Analysis & Recurrences (Master's Theorem)", examTag: "T1", weightage: "Medium", status: "completed", targetHours: 6 },
              { id: "al_2", name: "Divide & Conquer: QuickSort, MergeSort & Inversions", examTag: "T1", weightage: "High", status: "in-progress", targetHours: 8 },
              { id: "al_3", name: "Greedy Algorithms: Prim's, Kruskal's, Huffman & Knapsack", examTag: "T2", weightage: "High", status: "not-started", targetHours: 10 },
              { id: "al_4", name: "Dynamic Programming: LCS, 0/1 Knapsack, Matrix Chain", examTag: "T2", weightage: "High", status: "not-started", targetHours: 12 },
              { id: "al_5", name: "Shortest Paths (Dijkstra, Bellman-Ford) & Network Flow", examTag: "T3", weightage: "High", status: "not-started", targetHours: 10 },
              { id: "al_6", name: "NP-Completeness, Reductions & Approximation", examTag: "T3", weightage: "Medium", status: "not-started", targetHours: 6 }
            ]
          },
          {
            id: "cse_s4_mgmt",
            code: "15B11HS411",
            name: "Principles of Management",
            color: "#10b981",
            chapters: [
              { id: "mg_1", name: "Evolution of Management & Planning Functions", examTag: "T1", weightage: "Medium", status: "completed", targetHours: 4 },
              { id: "mg_2", name: "Organizational Structure & Decision Making Models", examTag: "T1", weightage: "High", status: "not-started", targetHours: 6 },
              { id: "mg_3", name: "Leadership Theories, Motivation & Team Dynamics", examTag: "T2", weightage: "High", status: "not-started", targetHours: 6 },
              { id: "mg_4", name: "Managerial Control Techniques & TQM", examTag: "T2", weightage: "Medium", status: "not-started", targetHours: 5 },
              { id: "mg_5", name: "Strategic Management & Corporate Social Responsibility", examTag: "T3", weightage: "High", status: "not-started", targetHours: 7 }
            ]
          }
        ]
      }
    }
  },

  it: {
    name: "Information Technology",
    shortName: "IT",
    semesters: {
      sem1: {
        name: "Semester 1",
        subjects: [
          {
            id: "it_s1_sdf1",
            code: "15B11CI111",
            name: "Software Development Fundamentals - I",
            color: "#3b82f6",
            chapters: [
              { id: "it_sdf1_1", name: "C Programming Basics & Syntax", examTag: "T1", weightage: "Medium", status: "completed", targetHours: 5 },
              { id: "it_sdf1_2", name: "Control Flow & Iteration Logic", examTag: "T1", weightage: "High", status: "in-progress", targetHours: 7 },
              { id: "it_sdf1_3", name: "Modular Programming & Functions", examTag: "T2", weightage: "High", status: "not-started", targetHours: 8 },
              { id: "it_sdf1_4", name: "Arrays, String Functions & Pointers", examTag: "T3", weightage: "High", status: "not-started", targetHours: 10 }
            ]
          },
          {
            id: "it_s1_math1",
            code: "15B11MA111",
            name: "Mathematics - I",
            color: "#6366f1",
            chapters: [
              { id: "it_m1_1", name: "Matrices, System of Equations & Eigenvalues", examTag: "T1", weightage: "High", status: "completed", targetHours: 7 },
              { id: "it_m1_2", name: "Differential Calculus & Mean Value Theorems", examTag: "T1", weightage: "Medium", status: "not-started", targetHours: 6 },
              { id: "it_m1_3", name: "Partial Derivatives & Multi-variable Calculus", examTag: "T2", weightage: "High", status: "not-started", targetHours: 8 },
              { id: "it_m1_4", name: "Multiple Integrals & Vector Calculus", examTag: "T3", weightage: "High", status: "not-started", targetHours: 9 }
            ]
          }
        ]
      },
      sem2: {
        name: "Semester 2",
        subjects: [
          {
            id: "it_s2_sdf2",
            code: "15B11CI211",
            name: "Software Development Fundamentals - II",
            color: "#3b82f6",
            chapters: [
              { id: "it_sdf2_1", name: "Classes, Encapsulation & Constructors", examTag: "T1", weightage: "Medium", status: "completed", targetHours: 6 },
              { id: "it_sdf2_2", name: "Inheritance & Dynamic Binding", examTag: "T2", weightage: "High", status: "not-started", targetHours: 8 },
              { id: "it_sdf2_3", name: "Polymorphism, Interfaces & STL Containers", examTag: "T3", weightage: "High", status: "not-started", targetHours: 10 }
            ]
          }
        ]
      },
      sem3: {
        name: "Semester 3",
        subjects: [
          {
            id: "it_s3_ds",
            code: "15B11CI311",
            name: "Data Structures & Applications",
            color: "#3b82f6",
            chapters: [
              { id: "it_ds1", name: "Linear Structures: Arrays, Stacks, Queues", examTag: "T1", weightage: "Medium", status: "completed", targetHours: 6 },
              { id: "it_ds2", name: "Non-Linear Structures: Trees & BST", examTag: "T2", weightage: "High", status: "not-started", targetHours: 9 },
              { id: "it_ds3", name: "Hashing, Graphs & Priority Queues", examTag: "T3", weightage: "High", status: "not-started", targetHours: 10 }
            ]
          }
        ]
      },
      sem4: {
        name: "Semester 4",
        subjects: [
          {
            id: "it_s4_dbms",
            code: "15B11CI412",
            name: "Database Systems (DBMS)",
            color: "#06b6d4",
            chapters: [
              { id: "it_db1", name: "ER Model, Relational Schema & SQL", examTag: "T1", weightage: "High", status: "completed", targetHours: 7 },
              { id: "it_db2", name: "Functional Dependencies & Normalization", examTag: "T2", weightage: "High", status: "not-started", targetHours: 9 },
              { id: "it_db3", name: "Transactions, Concurrency & Indexing", examTag: "T3", weightage: "High", status: "not-started", targetHours: 9 }
            ]
          },
          {
            id: "it_s4_os",
            code: "15B11CI411",
            name: "Operating Systems",
            color: "#3b82f6",
            chapters: [
              { id: "it_os1", name: "Processes & CPU Scheduling Algorithms", examTag: "T1", weightage: "High", status: "in-progress", targetHours: 8 },
              { id: "it_os2", name: "Synchronization & Deadlock Avoidance", examTag: "T2", weightage: "High", status: "not-started", targetHours: 8 },
              { id: "it_os3", name: "Virtual Memory Management & File Systems", examTag: "T3", weightage: "High", status: "not-started", targetHours: 9 }
            ]
          }
        ]
      }
    }
  },

  ece: {
    name: "Electronics & Communication Engineering",
    shortName: "ECE",
    semesters: {
      sem1: {
        name: "Semester 1",
        subjects: [
          {
            id: "ece_s1_es",
            code: "15B11EC111",
            name: "Electrical Science",
            color: "#3b82f6",
            chapters: [
              { id: "ece_es1", name: "DC Circuit Network Theorems", examTag: "T1", weightage: "High", status: "completed", targetHours: 6 },
              { id: "ece_es2", name: "Single Phase AC Analysis & Phasors", examTag: "T2", weightage: "High", status: "not-started", targetHours: 8 },
              { id: "ece_es3", name: "Magnetic Circuits & Transformers", examTag: "T3", weightage: "High", status: "not-started", targetHours: 8 }
            ]
          },
          {
            id: "ece_s1_m1",
            code: "15B11MA111",
            name: "Mathematics - I",
            color: "#6366f1",
            chapters: [
              { id: "ece_m1_1", name: "Linear Algebra & Matrices", examTag: "T1", weightage: "High", status: "completed", targetHours: 7 },
              { id: "ece_m1_2", name: "Calculus & Series Expansions", examTag: "T2", weightage: "Medium", status: "not-started", targetHours: 7 },
              { id: "ece_m1_3", name: "Vector Differential Calculus", examTag: "T3", weightage: "High", status: "not-started", targetHours: 8 }
            ]
          }
        ]
      },
      sem2: {
        name: "Semester 2",
        subjects: [
          {
            id: "ece_s2_edc",
            code: "15B11EC211",
            name: "Electronic Devices & Circuits",
            color: "#06b6d4",
            chapters: [
              { id: "edc_1", name: "PN Junction Diode & Rectifiers", examTag: "T1", weightage: "Medium", status: "completed", targetHours: 6 },
              { id: "edc_2", name: "Bipolar Junction Transistors (BJT) & Biasing", examTag: "T2", weightage: "High", status: "not-started", targetHours: 8 },
              { id: "edc_3", name: "MOSFET Characteristics & Small Signal Models", examTag: "T3", weightage: "High", status: "not-started", targetHours: 9 }
            ]
          }
        ]
      },
      sem3: {
        name: "Semester 3",
        subjects: [
          {
            id: "ece_s3_ss",
            code: "15B11EC312",
            name: "Signals and Systems",
            color: "#3b82f6",
            chapters: [
              { id: "ss_1", name: "Continuous & Discrete Time Signal Classifications", examTag: "T1", weightage: "Medium", status: "completed", targetHours: 6 },
              { id: "ss_2", name: "LTI Systems, Convolution & Fourier Series", examTag: "T2", weightage: "High", status: "not-started", targetHours: 9 },
              { id: "ss_3", name: "Z-Transforms & Laplace Transform Analysis", examTag: "T3", weightage: "High", status: "not-started", targetHours: 10 }
            ]
          },
          {
            id: "ece_s3_de",
            code: "15B11EC311",
            name: "Digital Electronics",
            color: "#06b6d4",
            chapters: [
              { id: "ece_de1", name: "Logic Gates, K-Maps & Combinational Logic", examTag: "T1", weightage: "Medium", status: "completed", targetHours: 6 },
              { id: "ece_de2", name: "Flip Flops, Counters & Shift Registers", examTag: "T2", weightage: "High", status: "not-started", targetHours: 8 },
              { id: "ece_de3", name: "Finite State Machines & Logic Families", examTag: "T3", weightage: "High", status: "not-started", targetHours: 8 }
            ]
          }
        ]
      },
      sem4: {
        name: "Semester 4",
        subjects: [
          {
            id: "ece_s4_ac",
            code: "15B11EC411",
            name: "Analog Communications",
            color: "#3b82f6",
            chapters: [
              { id: "ac_1", name: "Amplitude Modulation: DSB-FC, DSB-SC, SSB", examTag: "T1", weightage: "High", status: "completed", targetHours: 7 },
              { id: "ac_2", name: "Angle Modulation: FM & PM Spectra", examTag: "T2", weightage: "High", status: "not-started", targetHours: 9 },
              { id: "ac_3", name: "Noise Performance in AM/FM Receivers", examTag: "T3", weightage: "High", status: "not-started", targetHours: 9 }
            ]
          },
          {
            id: "ece_s4_emft",
            code: "15B11EC412",
            name: "Electromagnetic Field Theory (EMFT)",
            color: "#6366f1",
            chapters: [
              { id: "emft_1", name: "Electrostatics: Gauss Law & Boundary Conditions", examTag: "T1", weightage: "Medium", status: "completed", targetHours: 6 },
              { id: "emft_2", name: "Magnetostatics: Biot-Savart & Ampere's Law", examTag: "T2", weightage: "High", status: "not-started", targetHours: 8 },
              { id: "emft_3", name: "Maxwell's Equations & Plane Wave Propagation", examTag: "T3", weightage: "High", status: "not-started", targetHours: 10 }
            ]
          }
        ]
      }
    }
  },

  mnc: {
    name: "Mathematics and Computing",
    shortName: "MnC",
    semesters: {
      sem1: {
        name: "Semester 1",
        subjects: [
          {
            id: "mnc_s1_la",
            code: "22B11MA111",
            name: "Linear Algebra & Applications",
            color: "#6366f1",
            chapters: [
              { id: "mnc_la1", name: "Vector Spaces, Subspaces & Basis", examTag: "T1", weightage: "High", status: "completed", targetHours: 7 },
              { id: "mnc_la2", name: "Linear Transformations & Rank-Nullity", examTag: "T2", weightage: "High", status: "not-started", targetHours: 8 },
              { id: "mnc_la3", name: "Inner Product Spaces & Orthogonality", examTag: "T3", weightage: "High", status: "not-started", targetHours: 9 }
            ]
          },
          {
            id: "mnc_s1_sdf1",
            code: "15B11CI111",
            name: "Software Development Fundamentals - I",
            color: "#3b82f6",
            chapters: [
              { id: "mnc_sdf1", name: "Computational Thinking & C Syntax", examTag: "T1", weightage: "Medium", status: "completed", targetHours: 5 },
              { id: "mnc_sdf2", name: "Functions, Pointers & Array Processing", examTag: "T2", weightage: "High", status: "not-started", targetHours: 8 },
              { id: "mnc_sdf3", name: "Dynamic Memory & Data Representations", examTag: "T3", weightage: "High", status: "not-started", targetHours: 9 }
            ]
          }
        ]
      },
      sem2: {
        name: "Semester 2",
        subjects: [
          {
            id: "mnc_s2_ra",
            code: "22B11MA211",
            name: "Real Analysis & Multivariable Calculus",
            color: "#6366f1",
            chapters: [
              { id: "mnc_ra1", name: "Sequences, Series & Convergence Tests", examTag: "T1", weightage: "High", status: "completed", targetHours: 7 },
              { id: "mnc_ra2", name: "Continuity, Uniform Continuity & Derivatives", examTag: "T2", weightage: "High", status: "not-started", targetHours: 8 },
              { id: "mnc_ra3", name: "Riemann Integration & Multiple Integrals", examTag: "T3", weightage: "High", status: "not-started", targetHours: 9 }
            ]
          }
        ]
      },
      sem3: {
        name: "Semester 3",
        subjects: [
          {
            id: "mnc_s3_prob",
            code: "22B11MA311",
            name: "Probability & Stochastic Processes",
            color: "#6366f1",
            chapters: [
              { id: "mnc_pr1", name: "Probability Spaces, Random Variables & Distributions", examTag: "T1", weightage: "High", status: "completed", targetHours: 7 },
              { id: "mnc_pr2", name: "Expectation, Variance, Joint Distributions", examTag: "T2", weightage: "High", status: "not-started", targetHours: 9 },
              { id: "mnc_pr3", name: "Markov Chains & Central Limit Theorem", examTag: "T3", weightage: "High", status: "not-started", targetHours: 10 }
            ]
          },
          {
            id: "mnc_s3_ds",
            code: "15B11CI311",
            name: "Data Structures",
            color: "#3b82f6",
            chapters: [
              { id: "mnc_ds1", name: "Abstract Data Types & Linear Lists", examTag: "T1", weightage: "Medium", status: "completed", targetHours: 6 },
              { id: "mnc_ds2", name: "Trees, Balanced BSTs & Graphs", examTag: "T2", weightage: "High", status: "not-started", targetHours: 9 },
              { id: "mnc_ds3", name: "Algorithm Analysis & Sorting Lower Bounds", examTag: "T3", weightage: "High", status: "not-started", targetHours: 9 }
            ]
          }
        ]
      },
      sem4: {
        name: "Semester 4",
        subjects: [
          {
            id: "mnc_s4_num",
            code: "22B11MA411",
            name: "Numerical Methods & Scientific Computing",
            color: "#6366f1",
            chapters: [
              { id: "num_1", name: "Error Analysis & Root Finding (Newton-Raphson)", examTag: "T1", weightage: "Medium", status: "completed", targetHours: 6 },
              { id: "num_2", name: "Interpolation & Numerical Integration (Simpson's)", examTag: "T2", weightage: "High", status: "not-started", targetHours: 8 },
              { id: "num_3", name: "Numerical ODEs (Runge-Kutta) & Matrix Inversion", examTag: "T3", weightage: "High", status: "not-started", targetHours: 9 }
            ]
          },
          {
            id: "mnc_s4_algo",
            code: "15B11CI413",
            name: "Design & Analysis of Algorithms",
            color: "#3b82f6",
            chapters: [
              { id: "mnc_al1", name: "Greedy Strategies & Divide & Conquer", examTag: "T1", weightage: "High", status: "completed", targetHours: 7 },
              { id: "mnc_al2", name: "Dynamic Programming & Graph Algorithms", examTag: "T2", weightage: "High", status: "not-started", targetHours: 10 },
              { id: "mnc_al3", name: "Randomized Algorithms & Intractability", examTag: "T3", weightage: "High", status: "not-started", targetHours: 9 }
            ]
          }
        ]
      }
    }
  },

  rai: {
    name: "Robotics and Artificial Intelligence",
    shortName: "Robotics & AI",
    semesters: {
      sem1: {
        name: "Semester 1",
        subjects: [
          {
            id: "rai_s1_sdf1",
            code: "15B11CI111",
            name: "Software Development Fundamentals - I",
            color: "#3b82f6",
            chapters: [
              { id: "rai_sdf1", name: "C Programming & Procedural Logic", examTag: "T1", weightage: "Medium", status: "completed", targetHours: 5 },
              { id: "rai_sdf2", name: "Algorithms, Loops & Functions", examTag: "T2", weightage: "High", status: "not-started", targetHours: 7 },
              { id: "rai_sdf3", name: "Pointers & Memory Architecture", examTag: "T3", weightage: "High", status: "not-started", targetHours: 9 }
            ]
          },
          {
            id: "rai_s1_phy",
            code: "15B11PH111",
            name: "Engineering Physics",
            color: "#06b6d4",
            chapters: [
              { id: "rai_phy1", name: "Optics, Lasers & Sensor Physics", examTag: "T1", weightage: "Medium", status: "completed", targetHours: 6 },
              { id: "rai_phy2", name: "Electromagnetism & Wave Mechanics", examTag: "T2", weightage: "High", status: "not-started", targetHours: 8 },
              { id: "rai_phy3", name: "Solid State Devices for Sensors", examTag: "T3", weightage: "High", status: "not-started", targetHours: 8 }
            ]
          }
        ]
      },
      sem2: {
        name: "Semester 2",
        subjects: [
          {
            id: "rai_s2_python",
            code: "22B11CI212",
            name: "Python for Artificial Intelligence",
            color: "#3b82f6",
            chapters: [
              { id: "py_1", name: "Python Syntax, Data Structures & Comprehensions", examTag: "T1", weightage: "Medium", status: "completed", targetHours: 6 },
              { id: "py_2", name: "NumPy & Pandas for Numerical Processing", examTag: "T2", weightage: "High", status: "not-started", targetHours: 8 },
              { id: "py_3", name: "Matplotlib, SciPy & Object-Oriented Python", examTag: "T3", weightage: "High", status: "not-started", targetHours: 9 }
            ]
          }
        ]
      },
      sem3: {
        name: "Semester 3",
        subjects: [
          {
            id: "rai_s3_kin",
            code: "22B11ME311",
            name: "Kinematics & Dynamics of Robots",
            color: "#06b6d4",
            chapters: [
              { id: "kin_1", name: "Coordinate Frames, Rotations & Homogeneous Transforms", examTag: "T1", weightage: "High", status: "completed", targetHours: 7 },
              { id: "kin_2", name: "Forward Kinematics (DH Parameters) & Inverse Kinematics", examTag: "T2", weightage: "High", status: "not-started", targetHours: 10 },
              { id: "kin_3", name: "Jacobian, Singularity & Robot Dynamics (Euler-Lagrange)", examTag: "T3", weightage: "High", status: "not-started", targetHours: 10 }
            ]
          },
          {
            id: "rai_s3_ds",
            code: "15B11CI311",
            name: "Data Structures for AI",
            color: "#3b82f6",
            chapters: [
              { id: "rai_ds1", name: "Lists, Stacks, Queues & Graph Representations", examTag: "T1", weightage: "Medium", status: "completed", targetHours: 6 },
              { id: "rai_ds2", name: "State Space Search: BFS, DFS & Priority Queues", examTag: "T2", weightage: "High", status: "not-started", targetHours: 9 },
              { id: "rai_ds3", name: "Trees, Heaps & Spatial Data Structures (k-d trees)", examTag: "T3", weightage: "High", status: "not-started", targetHours: 10 }
            ]
          }
        ]
      },
      sem4: {
        name: "Semester 4",
        subjects: [
          {
            id: "rai_s4_ai",
            code: "22B11CI411",
            name: "Artificial Intelligence Foundations",
            color: "#3b82f6",
            chapters: [
              { id: "ai_1", name: "Intelligent Agents & Uninformed/Informed Search (A*)", examTag: "T1", weightage: "High", status: "completed", targetHours: 7 },
              { id: "ai_2", name: "Adversarial Search (Minimax, Alpha-Beta) & CSP", examTag: "T2", weightage: "High", status: "not-started", targetHours: 9 },
              { id: "ai_3", name: "Knowledge Representation, First Order Logic & Inference", examTag: "T3", weightage: "High", status: "not-started", targetHours: 10 }
            ]
          },
          {
            id: "rai_s4_sens",
            code: "22B11EC413",
            name: "Sensors, Actuators & Robot Interfacing",
            color: "#06b6d4",
            chapters: [
              { id: "sens_1", name: "Sensors: Encoders, IMUs, Lidar & Vision Sensors", examTag: "T1", weightage: "Medium", status: "completed", targetHours: 6 },
              { id: "sens_2", name: "Actuators: DC Motors, BLDC, Stepper Motors & Motor Drivers", examTag: "T2", weightage: "High", status: "not-started", targetHours: 8 },
              { id: "sens_3", name: "Microcontroller Interfacing, PWM & Feedback Control", examTag: "T3", weightage: "High", status: "not-started", targetHours: 9 }
            ]
          }
        ]
      }
    }
  }
};

const JIIT_HABITS = [
  { id: "jh1", text: "Complete at least 3 deep Pomodoro sessions (1.5 hrs focus)", done: false, streak: 6 },
  { id: "jh2", text: "Solve tutorial sheet / numerical problems for today's subjects", done: false, streak: 4 },
  { id: "jh3", text: "Review faculty lecture slides & class notes (30 mins)", done: false, streak: 8 },
  { id: "jh4", text: "Solve previous year T1/T2/T3 question papers (PYQs)", done: false, streak: 3 },
  { id: "jh5", text: "Maintain >75% attendance criteria & review lab assignments", done: false, streak: 15 },
  { id: "jh6", text: "Clear doubt with peer / professor before tomorrow's lecture", done: false, streak: 5 }
];
