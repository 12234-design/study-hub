// JIIT Noida Academic Structure & Official Course Curriculum
// T1 (20 Marks), T2 (20 Marks), T3 (35 Marks)
// Verified from JIIT Shelf Academic Records

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

// JIIT Common First Year (Sem 1 and Sem 2) Curriculum for All Branches
function createCommonSem1(prefix) {
  return [
    {
      id: `${prefix}_s1_sdf1`,
      code: "15B11CI111",
      name: "Software Development Fundamentals - I",
      color: "#3b82f6",
      chapters: [
        { id: `${prefix}_sdf1_1`, name: "C Programming Basics, Variables & Operators", examTag: "T1", weightage: "Medium", status: "completed", targetHours: 5 },
        { id: `${prefix}_sdf1_2`, name: "Control Structures & Loops (while, for, do-while)", examTag: "T1", weightage: "High", status: "in-progress", targetHours: 7 },
        { id: `${prefix}_sdf1_3`, name: "Functions, Recursion & Scope Rules", examTag: "T2", weightage: "High", status: "not-started", targetHours: 8 },
        { id: `${prefix}_sdf1_4`, name: "1D/2D Arrays, Strings & Character Manipulation", examTag: "T2", weightage: "High", status: "not-started", targetHours: 8 },
        { id: `${prefix}_sdf1_5`, name: "Pointers, Dynamic Memory Allocation & Structs", examTag: "T3", weightage: "High", status: "not-started", targetHours: 10 }
      ]
    },
    {
      id: `${prefix}_s1_math1`,
      code: "15B11MA111",
      name: "Mathematics - I",
      color: "#6366f1",
      chapters: [
        { id: `${prefix}_m1_1`, name: "Matrices, Rank, Eigenvalues & Cayley-Hamilton", examTag: "T1", weightage: "High", status: "completed", targetHours: 7 },
        { id: `${prefix}_m1_2`, name: "Differential Calculus & Mean Value Theorems", examTag: "T1", weightage: "Medium", status: "not-started", targetHours: 6 },
        { id: `${prefix}_m1_3`, name: "Partial Differentiation & Maxima/Minima (Lagrange)", examTag: "T2", weightage: "High", status: "not-started", targetHours: 8 },
        { id: `${prefix}_m1_4`, name: "Multiple Integrals (Double & Triple Integrals)", examTag: "T2", weightage: "High", status: "not-started", targetHours: 8 },
        { id: `${prefix}_m1_5`, name: "Vector Calculus (Grad, Div, Curl, Gauss/Stokes)", examTag: "T3", weightage: "High", status: "not-started", targetHours: 9 }
      ]
    },
    {
      id: `${prefix}_s1_phy1`,
      code: "15B11PH111",
      name: "Physics - I",
      color: "#06b6d4",
      chapters: [
        { id: `${prefix}_p1_1`, name: "Interference & Diffraction of Light", examTag: "T1", weightage: "High", status: "completed", targetHours: 6 },
        { id: `${prefix}_p1_2`, name: "Polarization & Laser Fundamentals", examTag: "T1", weightage: "Medium", status: "not-started", targetHours: 6 },
        { id: `${prefix}_p1_3`, name: "Fiber Optics & Dielectric Properties", examTag: "T2", weightage: "Medium", status: "not-started", targetHours: 6 },
        { id: `${prefix}_p1_4`, name: "Electromagnetism & Maxwell's Equations", examTag: "T2", weightage: "High", status: "not-started", targetHours: 8 },
        { id: `${prefix}_p1_5`, name: "Quantum Mechanics & Wave Packets", examTag: "T3", weightage: "High", status: "not-started", targetHours: 8 }
      ]
    },
    {
      id: `${prefix}_s1_be`,
      code: "24B11EC111",
      name: "Basic Electronics",
      color: "#f59e0b",
      chapters: [
        { id: `${prefix}_be_1`, name: "Semiconductor Physics & PN Junction Diode", examTag: "T1", weightage: "High", status: "completed", targetHours: 6 },
        { id: `${prefix}_be_2`, name: "Diode Applications: Rectifiers, Clippers & Clampers", examTag: "T1", weightage: "High", status: "not-started", targetHours: 7 },
        { id: `${prefix}_be_3`, name: "BJT Configurations, Biasing & Load Lines", examTag: "T2", weightage: "High", status: "not-started", targetHours: 8 },
        { id: `${prefix}_be_4`, name: "Operational Amplifiers (Op-Amps) & Inverting/Non-inverting", examTag: "T3", weightage: "High", status: "not-started", targetHours: 9 }
      ]
    },
    {
      id: `${prefix}_s1_eng`,
      code: "15B11HS112",
      name: "English",
      color: "#10b981",
      chapters: [
        { id: `${prefix}_eng_1`, name: "Grammar, Vocabulary & Phonetics", examTag: "T1", weightage: "Medium", status: "completed", targetHours: 4 },
        { id: `${prefix}_eng_2`, name: "Technical Writing & Reading Comprehension", examTag: "T1", weightage: "Medium", status: "not-started", targetHours: 4 },
        { id: `${prefix}_eng_3`, name: "Formal Letter, Resume & Professional Emails", examTag: "T2", weightage: "High", status: "not-started", targetHours: 5 },
        { id: `${prefix}_eng_4`, name: "Presentation & Oral Communication Skills", examTag: "T3", weightage: "High", status: "not-started", targetHours: 6 }
      ]
    },
    {
      id: `${prefix}_s1_sdflab1`,
      code: "24B15CS111",
      name: "SDF Lab - I",
      color: "#3b82f6",
      chapters: [
        { id: `${prefix}_sdfl1_1`, name: "Lab 1-3: Variables, Arithmetic Expressions & Conditionals", examTag: "T1", weightage: "Medium", status: "completed", targetHours: 4 },
        { id: `${prefix}_sdfl1_2`, name: "Lab 4-6: Iterative Loops & Pattern Programs", examTag: "T1", weightage: "High", status: "in-progress", targetHours: 5 },
        { id: `${prefix}_sdfl1_3`, name: "Lab 7-9: Function Implementation & Array Operations", examTag: "T2", weightage: "High", status: "not-started", targetHours: 6 },
        { id: `${prefix}_sdfl1_4`, name: "Lab 10-12: Pointers, Structs & End-Term Practical Evaluation", examTag: "T3", weightage: "High", status: "not-started", targetHours: 7 }
      ]
    },
    {
      id: `${prefix}_s1_belab`,
      code: "24B15EC111",
      name: "Basic Electronics Lab",
      color: "#f59e0b",
      chapters: [
        { id: `${prefix}_bel_1`, name: "Exp 1-3: PN Junction & Zener Diode V-I Characteristics", examTag: "T1", weightage: "Medium", status: "completed", targetHours: 4 },
        { id: `${prefix}_bel_2`, name: "Exp 4-6: Half-Wave & Full-Wave Rectifier Circuits with Filter", examTag: "T1", weightage: "High", status: "not-started", targetHours: 5 },
        { id: `${prefix}_bel_3`, name: "Exp 7-9: BJT Input & Output Static Characteristics (CE Mode)", examTag: "T2", weightage: "High", status: "not-started", targetHours: 6 },
        { id: `${prefix}_bel_4`, name: "Exp 10-12: Inverting & Non-Inverting Op-Amp Configurations", examTag: "T3", weightage: "High", status: "not-started", targetHours: 6 }
      ]
    },
    {
      id: `${prefix}_s1_phylab1`,
      code: "15B17PH171",
      name: "Physics Lab - I",
      color: "#06b6d4",
      chapters: [
        { id: `${prefix}_phyl1_1`, name: "Exp 1-3: Newton's Rings & Resolving Power of Telescope", examTag: "T1", weightage: "Medium", status: "completed", targetHours: 4 },
        { id: `${prefix}_phyl1_2`, name: "Exp 4-6: Diffraction Grating & Wavelength Calculation", examTag: "T1", weightage: "High", status: "not-started", targetHours: 5 },
        { id: `${prefix}_phyl1_3`, name: "Exp 7-9: Laser Divergence, Polarimeter & Specific Rotation", examTag: "T2", weightage: "High", status: "not-started", targetHours: 5 },
        { id: `${prefix}_phyl1_4`, name: "Exp 10-12: Hall Effect & Comprehensive Lab Viva", examTag: "T3", weightage: "High", status: "not-started", targetHours: 6 }
      ]
    },
    {
      id: `${prefix}_s1_edlab`,
      code: "18B15GE111",
      name: "Engineering Drawing & Design Lab",
      color: "#8b5cf6",
      chapters: [
        { id: `${prefix}_edl_1`, name: "Sheets 1-3: Scales, Lettering & Orthographic Projections", examTag: "T1", weightage: "Medium", status: "completed", targetHours: 5 },
        { id: `${prefix}_edl_2`, name: "Sheets 4-6: Projection of Lines & Planes", examTag: "T1", weightage: "High", status: "not-started", targetHours: 6 },
        { id: `${prefix}_edl_3`, name: "Sheets 7-9: Projection of Solids & Section of Solids", examTag: "T2", weightage: "High", status: "not-started", targetHours: 6 },
        { id: `${prefix}_edl_4`, name: "Sheets 10-12: Isometric Views & CAD Tool Fundamentals", examTag: "T3", weightage: "High", status: "not-started", targetHours: 7 }
      ]
    }
  ];
}

function createCommonSem2(prefix) {
  return [
    {
      id: `${prefix}_s2_sdf2`,
      code: "15B11CI211",
      name: "Software Development Fundamentals - II",
      color: "#3b82f6",
      chapters: [
        { id: `${prefix}_sdf2_1`, name: "OOP Principles: Classes, Objects & Constructors", examTag: "T1", weightage: "Medium", status: "completed", targetHours: 6 },
        { id: `${prefix}_sdf2_2`, name: "Operator Overloading & Friend Functions", examTag: "T1", weightage: "High", status: "not-started", targetHours: 7 },
        { id: `${prefix}_sdf2_3`, name: "Inheritance Types & Dynamic Binding", examTag: "T2", weightage: "High", status: "not-started", targetHours: 8 },
        { id: `${prefix}_sdf2_4`, name: "Polymorphism, Virtual Functions & Abstract Classes", examTag: "T2", weightage: "High", status: "not-started", targetHours: 9 },
        { id: `${prefix}_sdf2_5`, name: "Templates, STL Containers & Exception Handling", examTag: "T3", weightage: "High", status: "not-started", targetHours: 10 }
      ]
    },
    {
      id: `${prefix}_s2_math2`,
      code: "15B11MA211",
      name: "Mathematics - II",
      color: "#6366f1",
      chapters: [
        { id: `${prefix}_m2_1`, name: "First Order Ordinary Differential Equations", examTag: "T1", weightage: "Medium", status: "completed", targetHours: 6 },
        { id: `${prefix}_m2_2`, name: "Linear Differential Equations of Higher Order", examTag: "T1", weightage: "High", status: "not-started", targetHours: 7 },
        { id: `${prefix}_m2_3`, name: "Laplace Transforms & Applications to ODEs", examTag: "T2", weightage: "High", status: "not-started", targetHours: 9 },
        { id: `${prefix}_m2_4`, name: "Fourier Series & Harmonic Analysis", examTag: "T2", weightage: "High", status: "not-started", targetHours: 8 },
        { id: `${prefix}_m2_5`, name: "Partial Differential Equations (Heat/Wave Equations)", examTag: "T3", weightage: "High", status: "not-started", targetHours: 10 }
      ]
    },
    {
      id: `${prefix}_s2_phy2`,
      code: "15B11PH211",
      name: "Physics - II",
      color: "#06b6d4",
      chapters: [
        { id: `${prefix}_p2_1`, name: "Free Electron Theory & Band Theory of Solids", examTag: "T1", weightage: "High", status: "completed", targetHours: 6 },
        { id: `${prefix}_p2_2`, name: "Semiconductor Physics (Intrinsic/Extrinsic, Hall Effect)", examTag: "T1", weightage: "High", status: "not-started", targetHours: 7 },
        { id: `${prefix}_p2_3`, name: "Magnetic Properties & Superconductivity", examTag: "T2", weightage: "High", status: "not-started", targetHours: 8 },
        { id: `${prefix}_p2_4`, name: "Nanomaterials, Synthesis & Characterization", examTag: "T3", weightage: "High", status: "not-started", targetHours: 8 }
      ]
    },
    {
      id: `${prefix}_s2_uhv`,
      code: "24B11HS111",
      name: "Universal Human Values (UHV)",
      color: "#10b981",
      chapters: [
        { id: `${prefix}_uhv_1`, name: "Understanding Value Education & Self-Exploration", examTag: "T1", weightage: "Medium", status: "completed", targetHours: 4 },
        { id: `${prefix}_uhv_2`, name: "Harmony in Human Being & Relationship Trust", examTag: "T2", weightage: "High", status: "not-started", targetHours: 5 },
        { id: `${prefix}_uhv_3`, name: "Harmony in Society, Nature & Existence", examTag: "T3", weightage: "High", status: "not-started", targetHours: 6 }
      ]
    },
    {
      id: `${prefix}_s2_sdflab2`,
      code: "24B15CS121",
      name: "SDF Lab - II",
      color: "#3b82f6",
      chapters: [
        { id: `${prefix}_sdfl2_1`, name: "Lab 1-3: C++ Classes, Constructors & Deep Copying", examTag: "T1", weightage: "Medium", status: "completed", targetHours: 5 },
        { id: `${prefix}_sdfl2_2`, name: "Lab 4-6: Operator Overloading & Function Overriding", examTag: "T1", weightage: "High", status: "not-started", targetHours: 6 },
        { id: `${prefix}_sdfl2_3`, name: "Lab 7-9: Multi-level Inheritance & Virtual Functions", examTag: "T2", weightage: "High", status: "not-started", targetHours: 6 },
        { id: `${prefix}_sdfl2_4`, name: "Lab 10-12: STL Vectors, Maps & File Stream Operations", examTag: "T3", weightage: "High", status: "not-started", targetHours: 7 }
      ]
    },
    {
      id: `${prefix}_s2_lspclab`,
      code: "24B16HS111",
      name: "LSPC Lab",
      color: "#10b981",
      chapters: [
        { id: `${prefix}_lspc_1`, name: "Unit 1: Language Lab Phonetics, Accent & Syllable Stress", examTag: "T1", weightage: "Medium", status: "completed", targetHours: 4 },
        { id: `${prefix}_lspc_2`, name: "Unit 2: Extempore Speaking & Listening Comprehension", examTag: "T1", weightage: "Medium", status: "not-started", targetHours: 4 },
        { id: `${prefix}_lspc_3`, name: "Unit 3: Mock Interviews, GD Etiquette & Presentation Practice", examTag: "T2", weightage: "High", status: "not-started", targetHours: 5 },
        { id: `${prefix}_lspc_4`, name: "Unit 4: Professional Communication Portfolio Evaluation", examTag: "T3", weightage: "High", status: "not-started", targetHours: 5 }
      ]
    },
    {
      id: `${prefix}_s2_uhvlab`,
      code: "24B15HS111",
      name: "UHV Lab",
      color: "#14b8a6",
      chapters: [
        { id: `${prefix}_uhvl_1`, name: "Session 1-3: Self-Exploration Activities & Value Sharing", examTag: "T1", weightage: "Medium", status: "completed", targetHours: 3 },
        { id: `${prefix}_uhvl_2`, name: "Session 4-6: Exploring Trust & Respect in Relationships", examTag: "T2", weightage: "Medium", status: "not-started", targetHours: 4 },
        { id: `${prefix}_uhvl_3`, name: "Session 7-9: Social Harmony Projects & Reflection Diary", examTag: "T3", weightage: "High", status: "not-started", targetHours: 5 }
      ]
    },
    {
      id: `${prefix}_s2_wslab`,
      code: "18B15GE112",
      name: "Workshop Lab",
      color: "#f59e0b",
      chapters: [
        { id: `${prefix}_ws_1`, name: "Carpentry Shop: T-Lap & Mortise-Tenon Joints", examTag: "T1", weightage: "Medium", status: "completed", targetHours: 4 },
        { id: `${prefix}_ws_2`, name: "Fitting & Sheet Metal Shop: Filing, Sawing & Trays", examTag: "T1", weightage: "High", status: "not-started", targetHours: 5 },
        { id: `${prefix}_ws_3`, name: "Welding & Smithy Shop: Arc Welding & Forging", examTag: "T2", weightage: "High", status: "not-started", targetHours: 6 },
        { id: `${prefix}_ws_4`, name: "Foundry & Machining Practice (Lathe Machine Job)", examTag: "T3", weightage: "High", status: "not-started", targetHours: 6 }
      ]
    },
    {
      id: `${prefix}_s2_phylab2`,
      code: "15B17PH271",
      name: "Physics Lab - II",
      color: "#06b6d4",
      chapters: [
        { id: `${prefix}_phyl2_1`, name: "Exp 1-3: Energy Band Gap of Semiconductor & Solar Cell", examTag: "T1", weightage: "Medium", status: "completed", targetHours: 4 },
        { id: `${prefix}_phyl2_2`, name: "Exp 4-6: Magnetoresistance & B-H Curve Hysteresis", examTag: "T2", weightage: "High", status: "not-started", targetHours: 5 },
        { id: `${prefix}_phyl2_3`, name: "Exp 7-9: Dielectric Constant Measurement & Final Viva", examTag: "T3", weightage: "High", status: "not-started", targetHours: 6 }
      ]
    }
  ];
}

// 5 Branches x 4 Semesters Official JIIT Shelf Data
const BRANCH_DATA = {
  cse: {
    name: "Computer Science & Engineering",
    shortName: "CSE",
    semesters: {
      sem1: {
        name: "Semester 1",
        subjects: createCommonSem1("cse")
      },
      sem2: {
        name: "Semester 2",
        subjects: createCommonSem2("cse")
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
              { id: "ds_1", name: "Arrays, Pointers & Linked Lists (Singly/Doubly/Circular)", examTag: "T1", weightage: "Medium", status: "completed", targetHours: 6 },
              { id: "ds_2", name: "Stacks, Queues, Deque & Expression Parsing", examTag: "T1", weightage: "High", status: "in-progress", targetHours: 8 },
              { id: "ds_3", name: "Trees: Binary Trees, BST & Tree Traversals", examTag: "T2", weightage: "High", status: "not-started", targetHours: 9 },
              { id: "ds_4", name: "AVL Trees & Heaps / Priority Queues", examTag: "T2", weightage: "High", status: "not-started", targetHours: 9 },
              { id: "ds_5", name: "Hashing Techniques & Graph Traversals (BFS/DFS)", examTag: "T3", weightage: "High", status: "not-started", targetHours: 11 }
            ]
          },
          {
            id: "cse_s3_dbms",
            code: "24B11CS213",
            name: "Database Management Systems",
            color: "#06b6d4",
            chapters: [
              { id: "db_1", name: "ER Modeling & Relational Schema Mapping", examTag: "T1", weightage: "Medium", status: "completed", targetHours: 5 },
              { id: "db_2", name: "Relational Algebra & Advanced SQL Queries", examTag: "T1", weightage: "High", status: "in-progress", targetHours: 8 },
              { id: "db_3", name: "Normalization Theory (1NF, 2NF, 3NF, BCNF)", examTag: "T2", weightage: "High", status: "not-started", targetHours: 9 },
              { id: "db_4", name: "Transactions, ACID Properties & Serializability", examTag: "T2", weightage: "High", status: "not-started", targetHours: 7 },
              { id: "db_5", name: "Concurrency Control Protocols & Two-Phase Locking", examTag: "T3", weightage: "High", status: "not-started", targetHours: 8 }
            ]
          },
          {
            id: "cse_s3_toc",
            code: "24B11CS212",
            name: "Theory of Computation",
            color: "#6366f1",
            chapters: [
              { id: "toc_1", name: "Finite Automata (DFA, NFA, Regular Expressions)", examTag: "T1", weightage: "High", status: "completed", targetHours: 7 },
              { id: "toc_2", name: "Pumping Lemma for Regular Languages & Min-DFA", examTag: "T1", weightage: "High", status: "not-started", targetHours: 8 },
              { id: "toc_3", name: "Context-Free Grammars (CFG) & Pushdown Automata (PDA)", examTag: "T2", weightage: "High", status: "not-started", targetHours: 10 },
              { id: "toc_4", name: "Turing Machines & Decidability vs Undecidability", examTag: "T3", weightage: "High", status: "not-started", targetHours: 10 }
            ]
          },
          {
            id: "cse_s3_mfaids",
            code: "25B11MA213",
            name: "Mathematical Foundations for AI & DS",
            color: "#8b5cf6",
            chapters: [
              { id: "mf_1", name: "Vector Spaces, Orthogonality & Matrix Decompositions", examTag: "T1", weightage: "High", status: "completed", targetHours: 7 },
              { id: "mf_2", name: "Singular Value Decomposition (SVD) & PCA", examTag: "T1", weightage: "High", status: "not-started", targetHours: 8 },
              { id: "mf_3", name: "Multivariate Calculus & Gradient Descent Optimization", examTag: "T2", weightage: "High", status: "not-started", targetHours: 9 },
              { id: "mf_4", name: "Probability Distributions, Bayes Theorem & Estimation", examTag: "T3", weightage: "High", status: "not-started", targetHours: 9 }
            ]
          },
          {
            id: "cse_s3_eco",
            code: "15B11HS211",
            name: "Economics",
            color: "#10b981",
            chapters: [
              { id: "eco_1", name: "Demand, Supply, Elasticity & Consumer Equilibrium", examTag: "T1", weightage: "Medium", status: "completed", targetHours: 4 },
              { id: "eco_2", name: "Production Functions & Cost Analysis", examTag: "T1", weightage: "High", status: "not-started", targetHours: 5 },
              { id: "eco_3", name: "Market Structures: Perfect Competition & Monopoly", examTag: "T2", weightage: "High", status: "not-started", targetHours: 6 },
              { id: "eco_4", name: "Macroeconomics: Inflation, GDP & Monetary Policy", examTag: "T3", weightage: "High", status: "not-started", targetHours: 6 }
            ]
          },
          {
            id: "cse_s3_dslab",
            code: "15B17CI371",
            name: "Data Structures Lab",
            color: "#3b82f6",
            chapters: [
              { id: "dsl_1", name: "Lab 1-3: Linked List Variations & Stack Applications", examTag: "T1", weightage: "Medium", status: "completed", targetHours: 5 },
              { id: "dsl_2", name: "Lab 4-6: Queue Applications & Binary Tree Implementations", examTag: "T1", weightage: "High", status: "not-started", targetHours: 6 },
              { id: "dsl_3", name: "Lab 7-9: BST Insert/Delete & AVL Rotations", examTag: "T2", weightage: "High", status: "not-started", targetHours: 7 },
              { id: "dsl_4", name: "Lab 10-12: Graph Traversals (BFS, DFS) & Min Spanning Trees", examTag: "T3", weightage: "High", status: "not-started", targetHours: 8 }
            ]
          },
          {
            id: "cse_s3_dbmslab",
            code: "24B15CS213",
            name: "DBMS Lab",
            color: "#06b6d4",
            chapters: [
              { id: "dbl_1", name: "Lab 1-3: DDL, DML & Schema Definition Queries in Oracle/MySQL", examTag: "T1", weightage: "Medium", status: "completed", targetHours: 4 },
              { id: "dbl_2", name: "Lab 4-6: Nested Subqueries, Aggregate Functions & Group By", examTag: "T1", weightage: "High", status: "not-started", targetHours: 6 },
              { id: "dbl_3", name: "Lab 7-9: Complex Joins, Views & Index Creation", examTag: "T2", weightage: "High", status: "not-started", targetHours: 6 },
              { id: "dbl_4", name: "Lab 10-12: PL/SQL Triggers, Cursors & Stored Procedures", examTag: "T3", weightage: "High", status: "not-started", targetHours: 7 }
            ]
          },
          {
            id: "cse_s3_javalab",
            code: "24B15CS215",
            name: "OOP using Java Lab",
            color: "#8b5cf6",
            chapters: [
              { id: "javal_1", name: "Lab 1-3: Java Syntax, Classes, Packages & Inheritance", examTag: "T1", weightage: "Medium", status: "completed", targetHours: 5 },
              { id: "javal_2", name: "Lab 4-6: Interfaces, Exception Handling & String Parsing", examTag: "T1", weightage: "High", status: "not-started", targetHours: 6 },
              { id: "javal_3", name: "Lab 7-9: Multithreading, Producer-Consumer & Synchronization", examTag: "T2", weightage: "High", status: "not-started", targetHours: 7 },
              { id: "javal_4", name: "Lab 10-12: Java Collections Framework, Streams & File I/O", examTag: "T3", weightage: "High", status: "not-started", targetHours: 8 }
            ]
          },
          {
            id: "cse_s3_unixlab",
            code: "24B15CS214",
            name: "Unix Programming Lab",
            color: "#f59e0b",
            chapters: [
              { id: "unixl_1", name: "Lab 1-3: Bash Navigation, File Permissions & Grep/Awk/Sed", examTag: "T1", weightage: "Medium", status: "completed", targetHours: 4 },
              { id: "unixl_2", name: "Lab 4-6: Shell Scripting: Conditions, Loops & Functions", examTag: "T1", weightage: "High", status: "not-started", targetHours: 5 },
              { id: "unixl_3", name: "Lab 7-9: Unix System Calls (fork, exec, wait, pipe)", examTag: "T2", weightage: "High", status: "not-started", targetHours: 6 },
              { id: "unixl_4", name: "Lab 10-12: IPC Mechanisms (Shared Memory, Semaphores)", examTag: "T3", weightage: "High", status: "not-started", targetHours: 7 }
            ]
          }
        ]
      },
      sem4: {
        name: "Semester 4",
        subjects: [
          {
            id: "cse_s4_daa",
            code: "24B11CS221",
            name: "Design and Analysis of Algorithms",
            color: "#3b82f6",
            chapters: [
              { id: "daa_1", name: "Asymptotic Analysis & Recurrences (Master Theorem)", examTag: "T1", weightage: "Medium", status: "completed", targetHours: 6 },
              { id: "daa_2", name: "Divide & Conquer: QuickSort, MergeSort & Inversions", examTag: "T1", weightage: "High", status: "in-progress", targetHours: 8 },
              { id: "daa_3", name: "Greedy Strategy: Prim's, Kruskal's, Huffman & Knapsack", examTag: "T2", weightage: "High", status: "not-started", targetHours: 10 },
              { id: "daa_4", name: "Dynamic Programming: LCS, 0/1 Knapsack, Matrix Chain", examTag: "T2", weightage: "High", status: "not-started", targetHours: 12 },
              { id: "daa_5", name: "Graph Shortest Paths (Dijkstra, Bellman-Ford) & Max Flow", examTag: "T3", weightage: "High", status: "not-started", targetHours: 10 },
              { id: "daa_6", name: "NP-Completeness, Reductions & Approximation Algorithms", examTag: "T3", weightage: "Medium", status: "not-started", targetHours: 6 }
            ]
          },
          {
            id: "cse_s4_aiml",
            code: "24B11CS222",
            name: "Artificial Intelligence and Machine Learning",
            color: "#6366f1",
            chapters: [
              { id: "aiml_1", name: "AI Overview, Agents & State Space Search (A*, BFS, DFS)", examTag: "T1", weightage: "High", status: "completed", targetHours: 7 },
              { id: "aiml_2", name: "Game Playing: Minimax & Alpha-Beta Pruning", examTag: "T1", weightage: "High", status: "not-started", targetHours: 7 },
              { id: "aiml_3", name: "Supervised Learning: Linear Regression & Logistic Regression", examTag: "T2", weightage: "High", status: "not-started", targetHours: 9 },
              { id: "aiml_4", name: "Decision Trees, Random Forests & Support Vector Machines (SVM)", examTag: "T2", weightage: "High", status: "not-started", targetHours: 10 },
              { id: "aiml_5", name: "Unsupervised Clustering (K-Means) & Neural Networks Intro", examTag: "T3", weightage: "High", status: "not-started", targetHours: 10 }
            ]
          },
          {
            id: "cse_s4_se",
            code: "24B11CS223",
            name: "Software Engineering",
            color: "#06b6d4",
            chapters: [
              { id: "se_1", name: "Software Process Models: Agile, Scrum, Waterfall & Spiral", examTag: "T1", weightage: "Medium", status: "completed", targetHours: 5 },
              { id: "se_2", name: "Software Requirements Engineering, SRS & Use Cases", examTag: "T1", weightage: "High", status: "not-started", targetHours: 6 },
              { id: "se_3", name: "UML Architecture: Class Diagrams, Sequence & Activity Diagrams", examTag: "T2", weightage: "High", status: "not-started", targetHours: 8 },
              { id: "se_4", name: "Software Testing: Unit Testing, Black-Box & White-Box Testing", examTag: "T2", weightage: "High", status: "not-started", targetHours: 8 },
              { id: "se_5", name: "DevOps, Software Cost Estimation (COCOMO) & Maintenance", examTag: "T3", weightage: "High", status: "not-started", targetHours: 8 }
            ]
          },
          {
            id: "cse_s4_dsco",
            code: "25B11EC311",
            name: "Digital Systems & Comp. Organisation",
            color: "#f59e0b",
            chapters: [
              { id: "dsco_1", name: "Boolean Logic, Multiplexers, Decoders & ALU Design", examTag: "T1", weightage: "High", status: "completed", targetHours: 6 },
              { id: "dsco_2", name: "Sequential Logic: Flip-Flops, Registers & Counters", examTag: "T1", weightage: "High", status: "not-started", targetHours: 7 },
              { id: "dsco_3", name: "Basic Computer Organisation, Instruction Sets & CPU Cycles", examTag: "T2", weightage: "High", status: "not-started", targetHours: 9 },
              { id: "dsco_4", name: "Pipelining, Hazard Resolution & Memory Hierarchy (Cache)", examTag: "T3", weightage: "High", status: "not-started", targetHours: 10 }
            ]
          },
          {
            id: "cse_s4_qm",
            code: "16B1NHS332",
            name: "Quantitative Methods for Social Sc. (Elective)",
            color: "#10b981",
            chapters: [
              { id: "qm_1", name: "Data Measurement Scales & Descriptive Statistical Measures", examTag: "T1", weightage: "Medium", status: "completed", targetHours: 5 },
              { id: "qm_2", name: "Correlation Analysis & Simple Linear Regression", examTag: "T1", weightage: "High", status: "not-started", targetHours: 6 },
              { id: "qm_3", name: "Hypothesis Testing: t-test, z-test, ANOVA & Chi-Square", examTag: "T2", weightage: "High", status: "not-started", targetHours: 8 },
              { id: "qm_4", name: "Time Series Forecasting & Index Numbers", examTag: "T3", weightage: "High", status: "not-started", targetHours: 7 }
            ]
          },
          {
            id: "cse_s4_fmad",
            code: "25B12CS212",
            name: "Fundamentals of Mobile Application Dev. (Elective)",
            color: "#8b5cf6",
            chapters: [
              { id: "fmad_1", name: "Android Architecture, Activities & UI Layouts", examTag: "T1", weightage: "High", status: "completed", targetHours: 6 },
              { id: "fmad_2", name: "Intents, Broadcast Receivers & Adapter Views", examTag: "T1", weightage: "High", status: "not-started", targetHours: 7 },
              { id: "fmad_3", name: "Fragments, Navigation Components & Local Storage (SQLite)", examTag: "T2", weightage: "High", status: "not-started", targetHours: 8 },
              { id: "fmad_4", name: "REST APIs, Background Services & Cloud Integration", examTag: "T3", weightage: "High", status: "not-started", targetHours: 9 }
            ]
          },
          {
            id: "cse_s4_daalab",
            code: "24B15CS221",
            name: "Design & Analysis of Algorithms Lab",
            color: "#3b82f6",
            chapters: [
              { id: "daal_1", name: "Lab 1-3: Empirical Running Time of Sorting (Merge, Quick, Heap)", examTag: "T1", weightage: "Medium", status: "completed", targetHours: 5 },
              { id: "daal_2", name: "Lab 4-6: Greedy Programs: Prim's, Kruskal's & Huffman Codes", examTag: "T1", weightage: "High", status: "not-started", targetHours: 6 },
              { id: "daal_3", name: "Lab 7-9: DP Implementations: LCS, Matrix Chain & 0/1 Knapsack", examTag: "T2", weightage: "High", status: "not-started", targetHours: 7 },
              { id: "daal_4", name: "Lab 10-12: Dijkstra, Bellman-Ford & Backtracking Problems (N-Queens)", examTag: "T3", weightage: "High", status: "not-started", targetHours: 8 }
            ]
          },
          {
            id: "cse_s4_aimllab",
            code: "24B15CS222",
            name: "AI & Machine Learning Lab",
            color: "#6366f1",
            chapters: [
              { id: "aimll_1", name: "Lab 1-3: State Space Search (A*, BFS, DFS) in Python", examTag: "T1", weightage: "High", status: "completed", targetHours: 5 },
              { id: "aimll_2", name: "Lab 4-6: Regression & Classification using Scikit-Learn", examTag: "T1", weightage: "High", status: "not-started", targetHours: 6 },
              { id: "aimll_3", name: "Lab 7-9: Decision Trees, Random Forest & SVM Tuning", examTag: "T2", weightage: "High", status: "not-started", targetHours: 7 },
              { id: "aimll_4", name: "Lab 10-12: K-Means Clustering & Basic MLP Neural Network Model", examTag: "T3", weightage: "High", status: "not-started", targetHours: 8 }
            ]
          },
          {
            id: "cse_s4_dscolab",
            code: "25B15EC311",
            name: "Digital Systems & Comp. Org Lab",
            color: "#f59e0b",
            chapters: [
              { id: "dscol_1", name: "Exp 1-3: Verilog/VHDL Simulation of Combinational Logic (ALU)", examTag: "T1", weightage: "Medium", status: "completed", targetHours: 5 },
              { id: "dscol_2", name: "Exp 4-6: Design of Synchronous Counters & Register Files", examTag: "T1", weightage: "High", status: "not-started", targetHours: 6 },
              { id: "dscol_3", name: "Exp 7-9: Datapath Design & Single-Cycle Processor Simulation", examTag: "T2", weightage: "High", status: "not-started", targetHours: 7 },
              { id: "dscol_4", name: "Exp 10-12: Cache Performance Analysis & Pipeline Hazard Simulation", examTag: "T3", weightage: "High", status: "not-started", targetHours: 8 }
            ]
          },
          {
            id: "cse_s4_cplab",
            code: "24B15CS224",
            name: "Competitive Programming Lab",
            color: "#06b6d4",
            chapters: [
              { id: "cpl_1", name: "Sheet 1-3: Time Complexity Optimizations, Prefix Sums & Two Pointers", examTag: "T1", weightage: "High", status: "completed", targetHours: 5 },
              { id: "cpl_2", name: "Sheet 4-6: Bit Manipulation, Number Theory & Binary Search on Answer", examTag: "T1", weightage: "High", status: "not-started", targetHours: 6 },
              { id: "cpl_3", name: "Sheet 7-9: Graph Problems (DFS/BFS, Disjoint Set Union)", examTag: "T2", weightage: "High", status: "not-started", targetHours: 7 },
              { id: "cpl_4", name: "Sheet 10-12: Advanced DP with Bitmask & Segment Trees", examTag: "T3", weightage: "High", status: "not-started", targetHours: 8 }
            ]
          },
          {
            id: "cse_s4_evslab",
            code: "19B13BT211",
            name: "Environmental Studies Lab",
            color: "#10b981",
            chapters: [
              { id: "evsl_1", name: "Field Exp 1-3: Water Quality Testing: pH, Turbidity & Hardness", examTag: "T1", weightage: "Medium", status: "completed", targetHours: 3 },
              { id: "evsl_2", name: "Field Exp 4-6: Dissolved Oxygen (DO) & Biochemical Oxygen Demand (BOD)", examTag: "T2", weightage: "Medium", status: "not-started", targetHours: 4 },
              { id: "evsl_3", name: "Field Exp 7-9: Air Quality (PM2.5/PM10) & Solid Waste Management Case Study", examTag: "T3", weightage: "High", status: "not-started", targetHours: 4 }
            ]
          },
          {
            id: "cse_s4_fmadlab",
            code: "25B16CS212",
            name: "Fundamentals of Mobile App Dev Lab",
            color: "#8b5cf6",
            chapters: [
              { id: "fmadl_1", name: "Lab 1-3: Android Studio Setup, Layouts & Event Listeners", examTag: "T1", weightage: "Medium", status: "completed", targetHours: 4 },
              { id: "fmadl_2", name: "Lab 4-6: Multi-Screen Navigation & RecyclerView Custom Adapters", examTag: "T1", weightage: "High", status: "not-started", targetHours: 5 },
              { id: "fmadl_3", name: "Lab 7-9: Room Database Persistence & REST API JSON Parsing", examTag: "T2", weightage: "High", status: "not-started", targetHours: 6 },
              { id: "fmadl_4", name: "Lab 10-12: Final Android App Project Showcase & Viva", examTag: "T3", weightage: "High", status: "not-started", targetHours: 7 }
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
        subjects: createCommonSem1("it")
      },
      sem2: {
        name: "Semester 2",
        subjects: createCommonSem2("it")
      },
      sem3: {
        name: "Semester 3",
        subjects: [
          {
            id: "it_s3_ds",
            code: "15B11CI311",
            name: "Data Structures",
            color: "#3b82f6",
            chapters: [
              { id: "it_ds1", name: "Linear Structures: Arrays, Linked Lists, Stacks, Queues", examTag: "T1", weightage: "Medium", status: "completed", targetHours: 6 },
              { id: "it_ds2", name: "Non-Linear Structures: Binary Trees & BST", examTag: "T2", weightage: "High", status: "not-started", targetHours: 9 },
              { id: "it_ds3", name: "Hashing, Graphs & Priority Queues (Heaps)", examTag: "T3", weightage: "High", status: "not-started", targetHours: 10 }
            ]
          },
          {
            id: "it_s3_dbms",
            code: "24B11CS213",
            name: "Database Management Systems",
            color: "#06b6d4",
            chapters: [
              { id: "it_db1", name: "ER Model, Relational Schema & Advanced SQL", examTag: "T1", weightage: "High", status: "completed", targetHours: 7 },
              { id: "it_db2", name: "Functional Dependencies & Normalization (1NF to BCNF)", examTag: "T2", weightage: "High", status: "not-started", targetHours: 9 },
              { id: "it_db3", name: "Transactions, ACID, Concurrency Control & Indexing", examTag: "T3", weightage: "High", status: "not-started", targetHours: 9 }
            ]
          },
          {
            id: "it_s3_toc",
            code: "24B11CS212",
            name: "Theory of Computation",
            color: "#6366f1",
            chapters: [
              { id: "it_toc1", name: "Deterministic & Non-Deterministic Finite Automata", examTag: "T1", weightage: "High", status: "completed", targetHours: 7 },
              { id: "it_toc2", name: "Regular Expressions, Pumping Lemma & Context-Free Grammars", examTag: "T2", weightage: "High", status: "not-started", targetHours: 9 },
              { id: "it_toc3", name: "Pushdown Automata & Turing Machine Basics", examTag: "T3", weightage: "High", status: "not-started", targetHours: 9 }
            ]
          },
          {
            id: "it_s3_mfaids",
            code: "25B11MA213",
            name: "Mathematical Foundations for AI & DS",
            color: "#8b5cf6",
            chapters: [
              { id: "it_mf1", name: "Linear Algebra: Vector Spaces & Matrix Decompositions", examTag: "T1", weightage: "High", status: "completed", targetHours: 7 },
              { id: "it_mf2", name: "PCA & Dimensionality Reduction Techniques", examTag: "T2", weightage: "High", status: "not-started", targetHours: 8 },
              { id: "it_mf3", name: "Multivariate Optimization & Statistical Estimation", examTag: "T3", weightage: "High", status: "not-started", targetHours: 9 }
            ]
          },
          {
            id: "it_s3_dslab",
            code: "15B17CI371",
            name: "Data Structures Lab",
            color: "#3b82f6",
            chapters: [
              { id: "it_dsl_1", name: "Lab 1-3: Linked List Variations & Stack Applications", examTag: "T1", weightage: "Medium", status: "completed", targetHours: 5 },
              { id: "it_dsl_2", name: "Lab 4-6: Queue Applications & Binary Tree Implementations", examTag: "T1", weightage: "High", status: "not-started", targetHours: 6 },
              { id: "it_dsl_3", name: "Lab 7-9: BST Insert/Delete & AVL Rotations", examTag: "T2", weightage: "High", status: "not-started", targetHours: 7 },
              { id: "it_dsl_4", name: "Lab 10-12: Graph Traversals (BFS, DFS) & Min Spanning Trees", examTag: "T3", weightage: "High", status: "not-started", targetHours: 8 }
            ]
          },
          {
            id: "it_s3_dbmslab",
            code: "24B15CS213",
            name: "DBMS Lab",
            color: "#06b6d4",
            chapters: [
              { id: "it_dbl_1", name: "Lab 1-3: DDL, DML & Schema Definition Queries in Oracle/MySQL", examTag: "T1", weightage: "Medium", status: "completed", targetHours: 4 },
              { id: "it_dbl_2", name: "Lab 4-6: Nested Subqueries, Aggregate Functions & Group By", examTag: "T1", weightage: "High", status: "not-started", targetHours: 6 },
              { id: "it_dbl_3", name: "Lab 7-9: Complex Joins, Views & Index Creation", examTag: "T2", weightage: "High", status: "not-started", targetHours: 6 },
              { id: "it_dbl_4", name: "Lab 10-12: PL/SQL Triggers, Cursors & Stored Procedures", examTag: "T3", weightage: "High", status: "not-started", targetHours: 7 }
            ]
          },
          {
            id: "it_s3_javalab",
            code: "24B15CS215",
            name: "OOP using Java Lab",
            color: "#8b5cf6",
            chapters: [
              { id: "it_javal_1", name: "Lab 1-3: Java Syntax, Classes, Packages & Inheritance", examTag: "T1", weightage: "Medium", status: "completed", targetHours: 5 },
              { id: "it_javal_2", name: "Lab 4-6: Interfaces, Exception Handling & String Parsing", examTag: "T1", weightage: "High", status: "not-started", targetHours: 6 },
              { id: "it_javal_3", name: "Lab 7-9: Multithreading, Producer-Consumer & Synchronization", examTag: "T2", weightage: "High", status: "not-started", targetHours: 7 },
              { id: "it_javal_4", name: "Lab 10-12: Java Collections Framework, Streams & File I/O", examTag: "T3", weightage: "High", status: "not-started", targetHours: 8 }
            ]
          },
          {
            id: "it_s3_unixlab",
            code: "24B15CS214",
            name: "Unix Programming Lab",
            color: "#f59e0b",
            chapters: [
              { id: "it_unixl_1", name: "Lab 1-3: Bash Navigation, File Permissions & Grep/Awk/Sed", examTag: "T1", weightage: "Medium", status: "completed", targetHours: 4 },
              { id: "it_unixl_2", name: "Lab 4-6: Shell Scripting: Conditions, Loops & Functions", examTag: "T1", weightage: "High", status: "not-started", targetHours: 5 },
              { id: "it_unixl_3", name: "Lab 7-9: Unix System Calls (fork, exec, wait, pipe)", examTag: "T2", weightage: "High", status: "not-started", targetHours: 6 },
              { id: "it_unixl_4", name: "Lab 10-12: IPC Mechanisms (Shared Memory, Semaphores)", examTag: "T3", weightage: "High", status: "not-started", targetHours: 7 }
            ]
          }
        ]
      },
      sem4: {
        name: "Semester 4",
        subjects: [
          {
            id: "it_s4_daa",
            code: "24B11CS221",
            name: "Design and Analysis of Algorithms",
            color: "#3b82f6",
            chapters: [
              { id: "it_daa1", name: "Recurrences, Divide & Conquer Strategies", examTag: "T1", weightage: "High", status: "completed", targetHours: 7 },
              { id: "it_daa2", name: "Greedy Algorithms & Dynamic Programming", examTag: "T2", weightage: "High", status: "not-started", targetHours: 10 },
              { id: "it_daa3", name: "Graph Algorithms, Network Flow & Intractability", examTag: "T3", weightage: "High", status: "not-started", targetHours: 9 }
            ]
          },
          {
            id: "it_s4_aiml",
            code: "24B11CS222",
            name: "Artificial Intelligence and Machine Learning",
            color: "#6366f1",
            chapters: [
              { id: "it_aiml1", name: "Problem Solving by Search (Informed/Uninformed)", examTag: "T1", weightage: "High", status: "completed", targetHours: 7 },
              { id: "it_aiml2", name: "Supervised Learning: Regressions, SVM & Decision Trees", examTag: "T2", weightage: "High", status: "not-started", targetHours: 9 },
              { id: "it_aiml3", name: "Unsupervised Clustering & Deep Neural Networks Intro", examTag: "T3", weightage: "High", status: "not-started", targetHours: 9 }
            ]
          },
          {
            id: "it_s4_se",
            code: "24B11CS223",
            name: "Software Engineering",
            color: "#06b6d4",
            chapters: [
              { id: "it_se1", name: "Software Development Lifecycle & Agile Methodology", examTag: "T1", weightage: "Medium", status: "completed", targetHours: 5 },
              { id: "it_se2", name: "System Design, UML Models & Architecture", examTag: "T2", weightage: "High", status: "not-started", targetHours: 8 },
              { id: "it_se3", name: "Software Testing, Metrics & Quality Assurance", examTag: "T3", weightage: "High", status: "not-started", targetHours: 8 }
            ]
          },
          {
            id: "it_s4_dsco",
            code: "25B11EC311",
            name: "Digital Systems & Comp. Organisation",
            color: "#f59e0b",
            chapters: [
              { id: "it_dsco1", name: "Digital Logic Gates & Combinational Circuits", examTag: "T1", weightage: "High", status: "completed", targetHours: 6 },
              { id: "it_dsco2", name: "Instruction Formats & Processor Design", examTag: "T2", weightage: "High", status: "not-started", targetHours: 8 },
              { id: "it_dsco3", name: "Pipelining, Cache Memory & Virtual Memory Design", examTag: "T3", weightage: "High", status: "not-started", targetHours: 9 }
            ]
          },
          {
            id: "it_s4_daalab",
            code: "24B15CS221",
            name: "Design & Analysis of Algorithms Lab",
            color: "#3b82f6",
            chapters: [
              { id: "it_daal_1", name: "Lab 1-3: Empirical Running Time of Sorting (Merge, Quick, Heap)", examTag: "T1", weightage: "Medium", status: "completed", targetHours: 5 },
              { id: "it_daal_2", name: "Lab 4-6: Greedy Programs: Prim's, Kruskal's & Huffman Codes", examTag: "T1", weightage: "High", status: "not-started", targetHours: 6 },
              { id: "it_daal_3", name: "Lab 7-9: DP Implementations: LCS, Matrix Chain & 0/1 Knapsack", examTag: "T2", weightage: "High", status: "not-started", targetHours: 7 },
              { id: "it_daal_4", name: "Lab 10-12: Dijkstra, Bellman-Ford & Backtracking Problems (N-Queens)", examTag: "T3", weightage: "High", status: "not-started", targetHours: 8 }
            ]
          },
          {
            id: "it_s4_aimllab",
            code: "24B15CS222",
            name: "AI & Machine Learning Lab",
            color: "#6366f1",
            chapters: [
              { id: "it_aimll_1", name: "Lab 1-3: State Space Search (A*, BFS, DFS) in Python", examTag: "T1", weightage: "High", status: "completed", targetHours: 5 },
              { id: "it_aimll_2", name: "Lab 4-6: Regression & Classification using Scikit-Learn", examTag: "T1", weightage: "High", status: "not-started", targetHours: 6 },
              { id: "it_aimll_3", name: "Lab 7-9: Decision Trees, Random Forest & SVM Tuning", examTag: "T2", weightage: "High", status: "not-started", targetHours: 7 },
              { id: "it_aimll_4", name: "Lab 10-12: K-Means Clustering & Basic MLP Neural Network Model", examTag: "T3", weightage: "High", status: "not-started", targetHours: 8 }
            ]
          },
          {
            id: "it_s4_dscolab",
            code: "25B15EC311",
            name: "Digital Systems & Comp. Org Lab",
            color: "#f59e0b",
            chapters: [
              { id: "it_dscol_1", name: "Exp 1-3: Verilog/VHDL Simulation of Combinational Logic (ALU)", examTag: "T1", weightage: "Medium", status: "completed", targetHours: 5 },
              { id: "it_dscol_2", name: "Exp 4-6: Design of Synchronous Counters & Register Files", examTag: "T1", weightage: "High", status: "not-started", targetHours: 6 },
              { id: "it_dscol_3", name: "Exp 7-9: Datapath Design & Single-Cycle Processor Simulation", examTag: "T2", weightage: "High", status: "not-started", targetHours: 7 },
              { id: "it_dscol_4", name: "Exp 10-12: Cache Performance Analysis & Pipeline Hazard Simulation", examTag: "T3", weightage: "High", status: "not-started", targetHours: 8 }
            ]
          },
          {
            id: "it_s4_cplab",
            code: "24B15CS224",
            name: "Competitive Programming Lab",
            color: "#06b6d4",
            chapters: [
              { id: "it_cpl_1", name: "Sheet 1-3: Time Complexity Optimizations, Prefix Sums & Two Pointers", examTag: "T1", weightage: "High", status: "completed", targetHours: 5 },
              { id: "it_cpl_2", name: "Sheet 4-6: Bit Manipulation, Number Theory & Binary Search on Answer", examTag: "T1", weightage: "High", status: "not-started", targetHours: 6 },
              { id: "it_cpl_3", name: "Sheet 7-9: Graph Problems (DFS/BFS, Disjoint Set Union)", examTag: "T2", weightage: "High", status: "not-started", targetHours: 7 },
              { id: "it_cpl_4", name: "Sheet 10-12: Advanced DP with Bitmask & Segment Trees", examTag: "T3", weightage: "High", status: "not-started", targetHours: 8 }
            ]
          },
          {
            id: "it_s4_evslab",
            code: "19B13BT211",
            name: "Environmental Studies Lab",
            color: "#10b981",
            chapters: [
              { id: "it_evsl_1", name: "Field Exp 1-3: Water Quality Testing: pH, Turbidity & Hardness", examTag: "T1", weightage: "Medium", status: "completed", targetHours: 3 },
              { id: "it_evsl_2", name: "Field Exp 4-6: Dissolved Oxygen (DO) & Biochemical Oxygen Demand (BOD)", examTag: "T2", weightage: "Medium", status: "not-started", targetHours: 4 },
              { id: "it_evsl_3", name: "Field Exp 7-9: Air Quality (PM2.5/PM10) & Solid Waste Management Case Study", examTag: "T3", weightage: "High", status: "not-started", targetHours: 4 }
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
        subjects: createCommonSem1("ece")
      },
      sem2: {
        name: "Semester 2",
        subjects: createCommonSem2("ece")
      },
      sem3: {
        name: "Semester 3",
        subjects: [
          {
            id: "ece_s3_prp",
            code: "15B11MA301",
            name: "Probability and Random Processes",
            color: "#6366f1",
            chapters: [
              { id: "prp_1", name: "Probability Axioms, Random Variables & PDF/CDF", examTag: "T1", weightage: "High", status: "completed", targetHours: 7 },
              { id: "prp_2", name: "Two Dimensional Random Variables & Covariance", examTag: "T1", weightage: "High", status: "not-started", targetHours: 7 },
              { id: "prp_3", name: "Stationary Random Processes & Autocorrelation", examTag: "T2", weightage: "High", status: "not-started", targetHours: 9 },
              { id: "prp_4", name: "Power Spectral Density & Linear Systems Response", examTag: "T3", weightage: "High", status: "not-started", targetHours: 9 }
            ]
          },
          {
            id: "ece_s3_edc2",
            code: "24B11EC211",
            name: "Electronic Devices and Circuits",
            color: "#06b6d4",
            chapters: [
              { id: "edc_1", name: "Amplifier Biasing Stability & Thermal Runaway", examTag: "T1", weightage: "High", status: "completed", targetHours: 6 },
              { id: "edc_2", name: "Feedback Amplifiers (Current/Voltage Series & Shunt)", examTag: "T2", weightage: "High", status: "not-started", targetHours: 8 },
              { id: "edc_3", name: "Sinusoidal Oscillators & Power Amplifiers", examTag: "T3", weightage: "High", status: "not-started", targetHours: 9 }
            ]
          },
          {
            id: "ece_s3_dcd",
            code: "18B11EC215",
            name: "Digital Circuit Design",
            color: "#3b82f6",
            chapters: [
              { id: "dcd_1", name: "Boolean Algebra, K-Maps & Quine-McCluskey", examTag: "T1", weightage: "High", status: "completed", targetHours: 6 },
              { id: "dcd_2", name: "Combinational Design: Adders, MUX, Encoders", examTag: "T1", weightage: "High", status: "not-started", targetHours: 7 },
              { id: "dcd_3", name: "Sequential Circuit Design: Latches, Flip-Flops & FSMs", examTag: "T2", weightage: "High", status: "not-started", targetHours: 9 },
              { id: "dcd_4", name: "Asynchronous Circuits & Programmable Logic (FPGA/CPLD)", examTag: "T3", weightage: "High", status: "not-started", targetHours: 9 }
            ]
          },
          {
            id: "ece_s3_ss",
            code: "18B11EC214",
            name: "Signals and Systems",
            color: "#8b5cf6",
            chapters: [
              { id: "ss_1", name: "Continuous & Discrete Time Signals & Systems", examTag: "T1", weightage: "High", status: "completed", targetHours: 6 },
              { id: "ss_2", name: "LTI Systems, Convolution & Fourier Analysis", examTag: "T2", weightage: "High", status: "not-started", targetHours: 9 },
              { id: "ss_3", name: "Laplace Transform & Z-Transform System Transfer Functions", examTag: "T3", weightage: "High", status: "not-started", targetHours: 10 }
            ]
          },
          {
            id: "ece_s3_eco",
            code: "15B11HS211",
            name: "Economics",
            color: "#10b981",
            chapters: [
              { id: "ece_eco1", name: "Microeconomics: Consumer Choice & Market Pricing", examTag: "T1", weightage: "Medium", status: "completed", targetHours: 4 },
              { id: "ece_eco2", name: "Cost Structures, Break-Even & Revenue Curves", examTag: "T2", weightage: "High", status: "not-started", targetHours: 5 },
              { id: "ece_eco3", name: "National Income, Banking System & Inflation", examTag: "T3", weightage: "High", status: "not-started", targetHours: 6 }
            ]
          },
          {
            id: "ece_s3_evslab",
            code: "19B13BT211",
            name: "Environmental Studies Lab",
            color: "#10b981",
            chapters: [
              { id: "ece_evsl_1", name: "Field Exp 1-3: Water Quality Testing: pH, Turbidity & Hardness", examTag: "T1", weightage: "Medium", status: "completed", targetHours: 3 },
              { id: "ece_evsl_2", name: "Field Exp 4-6: Dissolved Oxygen (DO) & Biochemical Oxygen Demand (BOD)", examTag: "T2", weightage: "Medium", status: "not-started", targetHours: 4 },
              { id: "ece_evsl_3", name: "Field Exp 7-9: Air Quality (PM2.5/PM10) & Solid Waste Management Case Study", examTag: "T3", weightage: "High", status: "not-started", targetHours: 4 }
            ]
          },
          {
            id: "ece_s3_dcdlab",
            code: "18B15EC215",
            name: "Digital Circuit Design Lab",
            color: "#3b82f6",
            chapters: [
              { id: "ece_dcdl_1", name: "Exp 1-3: Realization of Logic Gates, Half/Full Adders & Subtractors", examTag: "T1", weightage: "Medium", status: "completed", targetHours: 4 },
              { id: "ece_dcdl_2", name: "Exp 4-6: Multiplexers, De-multiplexers & Code Converters", examTag: "T1", weightage: "High", status: "not-started", targetHours: 5 },
              { id: "ece_dcdl_3", name: "Exp 7-9: Synchronous & Asynchronous Up/Down Counters & Shift Registers", examTag: "T2", weightage: "High", status: "not-started", targetHours: 6 },
              { id: "ece_dcdl_4", name: "Exp 10-12: Verilog HDL Simulation of Sequential Finite State Machines", examTag: "T3", weightage: "High", status: "not-started", targetHours: 7 }
            ]
          },
          {
            id: "ece_s3_sslab",
            code: "18B15EC214",
            name: "Signals and Systems Lab",
            color: "#8b5cf6",
            chapters: [
              { id: "ece_ssl_1", name: "Exp 1-3: Generation of Elementary Signals & Basic Operations in MATLAB", examTag: "T1", weightage: "Medium", status: "completed", targetHours: 4 },
              { id: "ece_ssl_2", name: "Exp 4-6: Linear Convolution, Circular Convolution & System Linearity", examTag: "T1", weightage: "High", status: "not-started", targetHours: 5 },
              { id: "ece_ssl_3", name: "Exp 7-9: Fourier Series & Discrete-Time Fourier Transform (DTFT) Analysis", examTag: "T2", weightage: "High", status: "not-started", targetHours: 6 },
              { id: "ece_ssl_4", name: "Exp 10-12: Pole-Zero Plotting & Z-Transform System Transfer Functions", examTag: "T3", weightage: "High", status: "not-started", targetHours: 6 }
            ]
          },
          {
            id: "ece_s3_edclab",
            code: "24B15EC211",
            name: "Electronic Devices & Circuits Lab",
            color: "#06b6d4",
            chapters: [
              { id: "ece_edcl_1", name: "Exp 1-3: Frequency Response of Single Stage BJT RC Coupled Amplifier", examTag: "T1", weightage: "Medium", status: "completed", targetHours: 4 },
              { id: "ece_edcl_2", name: "Exp 4-6: Voltage Shunt & Current Series Feedback Amplifier Characteristics", examTag: "T1", weightage: "High", status: "not-started", targetHours: 5 },
              { id: "ece_edcl_3", name: "Exp 7-9: RC Phase Shift & Colpitts Oscillator Circuit Implementation", examTag: "T2", weightage: "High", status: "not-started", targetHours: 6 },
              { id: "ece_edcl_4", name: "Exp 10-12: Class A & Class B Push-Pull Power Amplifier Testing & Viva", examTag: "T3", weightage: "High", status: "not-started", targetHours: 6 }
            ]
          }
        ]
      },
      sem4: {
        name: "Semester 4",
        subjects: [
          {
            id: "ece_s4_ac",
            code: "18B11EC411",
            name: "Analog Communications",
            color: "#3b82f6",
            chapters: [
              { id: "ac_1", name: "Amplitude Modulation: DSB-FC, DSB-SC, SSB & VSB", examTag: "T1", weightage: "High", status: "completed", targetHours: 7 },
              { id: "ac_2", name: "Angle Modulation: Frequency (FM) & Phase (PM) Spectra", examTag: "T2", weightage: "High", status: "not-started", targetHours: 9 },
              { id: "ac_3", name: "Noise Analysis in CW Modulation Systems & Pulse Modulation", examTag: "T3", weightage: "High", status: "not-started", targetHours: 9 }
            ]
          },
          {
            id: "ece_s4_emft",
            code: "15B11EC412",
            name: "Electromagnetic Field Theory (EMFT)",
            color: "#6366f1",
            chapters: [
              { id: "emft_1", name: "Electrostatics: Gauss's Law, Potential & Poisson's Equation", examTag: "T1", weightage: "Medium", status: "completed", targetHours: 6 },
              { id: "emft_2", name: "Magnetostatics: Biot-Savart Law, Ampere's Law & Vector Potential", examTag: "T2", weightage: "High", status: "not-started", targetHours: 8 },
              { id: "emft_3", name: "Maxwell's Equations, Wave Equations & Wave Propagation", examTag: "T3", weightage: "High", status: "not-started", targetHours: 10 }
            ]
          },
          {
            id: "ece_s4_mpmc",
            code: "15B11EC414",
            name: "Microprocessors & Microcontrollers",
            color: "#06b6d4",
            chapters: [
              { id: "mpmc_1", name: "8085 Microprocessor Architecture & Instruction Set", examTag: "T1", weightage: "High", status: "completed", targetHours: 7 },
              { id: "mpmc_2", name: "8086 Architecture, Addressing Modes & Assembly Programming", examTag: "T2", weightage: "High", status: "not-started", targetHours: 9 },
              { id: "mpmc_3", name: "Interfacing: 8255 PPI, Interrupts, Timers & 8051 Microcontroller", examTag: "T3", weightage: "High", status: "not-started", targetHours: 10 }
            ]
          },
          {
            id: "ece_s4_dsplab",
            code: "15B17EC471",
            name: "Digital Signal Processing Lab",
            color: "#6366f1",
            chapters: [
              { id: "ece_dspl_1", name: "Exp 1-3: Computation of N-point DFT & FFT Radix-2 Algorithms in MATLAB", examTag: "T1", weightage: "Medium", status: "completed", targetHours: 5 },
              { id: "ece_dspl_2", name: "Exp 4-6: Design of FIR Filters using Hamming, Hanning & Kaiser Windows", examTag: "T1", weightage: "High", status: "not-started", targetHours: 6 },
              { id: "ece_dspl_3", name: "Exp 7-9: Design of Butterworth & Chebyshev IIR Digital Filters (Bilinear/Impulse)", examTag: "T2", weightage: "High", status: "not-started", targetHours: 7 },
              { id: "ece_dspl_4", name: "Exp 10-12: Implementation of Digital Filtering on DSP Starter Kit (DSK)", examTag: "T3", weightage: "High", status: "not-started", targetHours: 7 }
            ]
          },
          {
            id: "ece_s4_aelab",
            code: "18B15EC411",
            name: "Analog Electronics Lab",
            color: "#f59e0b",
            chapters: [
              { id: "ece_ael_1", name: "Exp 1-3: Op-Amp Applications: Integrator, Differentiator & Precision Rectifier", examTag: "T1", weightage: "Medium", status: "completed", targetHours: 4 },
              { id: "ece_ael_2", name: "Exp 4-6: Active Filters: 2nd Order Low-Pass, High-Pass & Band-Pass Butterworth", examTag: "T1", weightage: "High", status: "not-started", targetHours: 5 },
              { id: "ece_ael_3", name: "Exp 7-9: Schmitt Trigger, Monostable & Astable Multivibrators using 555 Timer", examTag: "T2", weightage: "High", status: "not-started", targetHours: 6 },
              { id: "ece_ael_4", name: "Exp 10-12: Voltage Regulators (IC 723) & Phase Locked Loop (PLL 565)", examTag: "T3", weightage: "High", status: "not-started", targetHours: 6 }
            ]
          },
          {
            id: "ece_s4_adclab",
            code: "18B15EC412",
            name: "Analog & Digital Communication Lab",
            color: "#06b6d4",
            chapters: [
              { id: "ece_adcl_1", name: "Exp 1-3: DSB-FC AM Generation & Envelope Detection Modulation Index", examTag: "T1", weightage: "Medium", status: "completed", targetHours: 5 },
              { id: "ece_adcl_2", name: "Exp 4-6: Frequency Modulation (FM) & Demodulation using Varactor & Ratio Detector", examTag: "T1", weightage: "High", status: "not-started", targetHours: 6 },
              { id: "ece_adcl_3", name: "Exp 7-9: Pulse Code Modulation (PCM), PAM, PWM & PPM Circuits", examTag: "T2", weightage: "High", status: "not-started", targetHours: 6 },
              { id: "ece_adcl_4", name: "Exp 10-12: Digital Carrier Modulation: ASK, FSK, BPSK Generation & Detection", examTag: "T3", weightage: "High", status: "not-started", targetHours: 7 }
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
        subjects: createCommonSem1("mnc")
      },
      sem2: {
        name: "Semester 2",
        subjects: createCommonSem2("mnc")
      },
      sem3: {
        name: "Semester 3",
        subjects: [
          {
            id: "mnc_s3_ds",
            code: "15B11CI311",
            name: "Data Structures",
            color: "#3b82f6",
            chapters: [
              { id: "mnc_ds1", name: "Linear Data Structures & Dynamic Lists", examTag: "T1", weightage: "Medium", status: "completed", targetHours: 6 },
              { id: "mnc_ds2", name: "Trees, Balanced Search Trees (AVL/Red-Black)", examTag: "T2", weightage: "High", status: "not-started", targetHours: 9 },
              { id: "mnc_ds3", name: "Graphs, Shortest Paths & Priority Queues", examTag: "T3", weightage: "High", status: "not-started", targetHours: 10 }
            ]
          },
          {
            id: "mnc_s3_dslab",
            code: "15B17CI371",
            name: "Data Structures Lab",
            color: "#3b82f6",
            chapters: [
              { id: "mnc_dsl_1", name: "Lab 1-3: Linked List Variations & Stack Applications", examTag: "T1", weightage: "Medium", status: "completed", targetHours: 5 },
              { id: "mnc_dsl_2", name: "Lab 4-6: Queue Applications & Binary Tree Implementations", examTag: "T1", weightage: "High", status: "not-started", targetHours: 6 },
              { id: "mnc_dsl_3", name: "Lab 7-9: BST Insert/Delete & AVL Rotations", examTag: "T2", weightage: "High", status: "not-started", targetHours: 7 },
              { id: "mnc_dsl_4", name: "Lab 10-12: Graph Traversals (BFS, DFS) & Min Spanning Trees", examTag: "T3", weightage: "High", status: "not-started", targetHours: 8 }
            ]
          },
          {
            id: "mnc_s3_eco",
            code: "15B11HS211",
            name: "Economics",
            color: "#10b981",
            chapters: [
              { id: "mnc_eco1", name: "Microeconomics: Supply, Demand & Elasticity", examTag: "T1", weightage: "Medium", status: "completed", targetHours: 4 },
              { id: "mnc_eco2", name: "Production Functions, Cost Structures & Monopoly", examTag: "T2", weightage: "High", status: "not-started", targetHours: 5 },
              { id: "mnc_eco3", name: "Macroeconomics: National Income, Inflation & Monetary Policy", examTag: "T3", weightage: "High", status: "not-started", targetHours: 6 }
            ]
          },
          {
            id: "mnc_s3_toc",
            code: "24B11CS212",
            name: "Theory of Computation",
            color: "#6366f1",
            chapters: [
              { id: "mnc_toc1", name: "DFA, NFA, Regular Expressions & State Minimization", examTag: "T1", weightage: "High", status: "completed", targetHours: 7 },
              { id: "mnc_toc2", name: "Context-Free Languages & Pushdown Automata", examTag: "T2", weightage: "High", status: "not-started", targetHours: 9 },
              { id: "mnc_toc3", name: "Turing Machine Computability & Halting Problem", examTag: "T3", weightage: "High", status: "not-started", targetHours: 9 }
            ]
          },
          {
            id: "mnc_s3_dbms",
            code: "24B11CS213",
            name: "Database Management Systems",
            color: "#06b6d4",
            chapters: [
              { id: "mnc_db1", name: "Relational Data Model & Structured Query Language", examTag: "T1", weightage: "High", status: "completed", targetHours: 6 },
              { id: "mnc_db2", name: "Normalization (1NF to BCNF) & Dependency Preservation", examTag: "T2", weightage: "High", status: "not-started", targetHours: 8 },
              { id: "mnc_db3", name: "Transactions, Concurrency Protocols & Indexing", examTag: "T3", weightage: "High", status: "not-started", targetHours: 9 }
            ]
          },
          {
            id: "mnc_s3_dbmslab",
            code: "24B15CS213",
            name: "DBMS Lab",
            color: "#06b6d4",
            chapters: [
              { id: "mnc_dbl_1", name: "Lab 1-3: DDL, DML & Schema Definition Queries in Oracle/MySQL", examTag: "T1", weightage: "Medium", status: "completed", targetHours: 4 },
              { id: "mnc_dbl_2", name: "Lab 4-6: Nested Subqueries, Aggregate Functions & Group By", examTag: "T1", weightage: "High", status: "not-started", targetHours: 6 },
              { id: "mnc_dbl_3", name: "Lab 7-9: Complex Joins, Views & Index Creation", examTag: "T2", weightage: "High", status: "not-started", targetHours: 6 },
              { id: "mnc_dbl_4", name: "Lab 10-12: PL/SQL Triggers, Cursors & Stored Procedures", examTag: "T3", weightage: "High", status: "not-started", targetHours: 7 }
            ]
          },
          {
            id: "mnc_s3_unixlab",
            code: "24B15CS214",
            name: "Unix Programming Lab",
            color: "#f59e0b",
            chapters: [
              { id: "mnc_unixl_1", name: "Lab 1-3: Bash Navigation, File Permissions & Grep/Awk/Sed", examTag: "T1", weightage: "Medium", status: "completed", targetHours: 4 },
              { id: "mnc_unixl_2", name: "Lab 4-6: Shell Scripting: Conditions, Loops & Functions", examTag: "T1", weightage: "High", status: "not-started", targetHours: 5 },
              { id: "mnc_unixl_3", name: "Lab 7-9: Unix System Calls (fork, exec, wait, pipe)", examTag: "T2", weightage: "High", status: "not-started", targetHours: 6 },
              { id: "mnc_unixl_4", name: "Lab 10-12: IPC Mechanisms (Shared Memory, Semaphores)", examTag: "T3", weightage: "High", status: "not-started", targetHours: 7 }
            ]
          },
          {
            id: "mnc_s3_javalab",
            code: "24B15CS215",
            name: "OOP using Java Lab",
            color: "#8b5cf6",
            chapters: [
              { id: "mnc_javal_1", name: "Lab 1-3: Java Syntax, Classes, Packages & Inheritance", examTag: "T1", weightage: "Medium", status: "completed", targetHours: 5 },
              { id: "mnc_javal_2", name: "Lab 4-6: Interfaces, Exception Handling & String Parsing", examTag: "T1", weightage: "High", status: "not-started", targetHours: 6 },
              { id: "mnc_javal_3", name: "Lab 7-9: Multithreading, Producer-Consumer & Synchronization", examTag: "T2", weightage: "High", status: "not-started", targetHours: 7 },
              { id: "mnc_javal_4", name: "Lab 10-12: Java Collections Framework, Streams & File I/O", examTag: "T3", weightage: "High", status: "not-started", targetHours: 8 }
            ]
          },
          {
            id: "mnc_s3_mfaids",
            code: "25B11MA213",
            name: "Mathematical Foundations for AI & DS",
            color: "#8b5cf6",
            chapters: [
              { id: "mnc_mf1", name: "Vector Spaces, Orthogonality & QR Decomposition", examTag: "T1", weightage: "High", status: "completed", targetHours: 7 },
              { id: "mnc_mf2", name: "SVD, Spectral Theorem & Principal Component Analysis", examTag: "T1", weightage: "High", status: "not-started", targetHours: 8 },
              { id: "mnc_mf3", name: "Convex Optimization, Gradients & Loss Minimization", examTag: "T2", weightage: "High", status: "not-started", targetHours: 9 },
              { id: "mnc_mf4", name: "Probability Foundations, Bayesian Inference & MLE", examTag: "T3", weightage: "High", status: "not-started", targetHours: 9 }
            ]
          }
        ]
      },
      sem4: {
        name: "Semester 4",
        subjects: [
          {
            id: "mnc_s4_daa",
            code: "24B11CS221",
            name: "Design and Analysis of Algorithms",
            color: "#3b82f6",
            chapters: [
              { id: "mnc_daa1", name: "Algorithm Complexities & Divide & Conquer", examTag: "T1", weightage: "High", status: "completed", targetHours: 7 },
              { id: "mnc_daa2", name: "Greedy Heuristics & Dynamic Programming Paradigms", examTag: "T2", weightage: "High", status: "not-started", targetHours: 10 },
              { id: "mnc_daa3", name: "Network Flows, Randomization & NP-Completeness", examTag: "T3", weightage: "High", status: "not-started", targetHours: 9 }
            ]
          },
          {
            id: "mnc_s4_aiml",
            code: "24B11CS222",
            name: "Artificial Intelligence and Machine Learning",
            color: "#6366f1",
            chapters: [
              { id: "mnc_ai1", name: "Search Algorithms (A*, Heuristics) & Constraint Satisfaction", examTag: "T1", weightage: "High", status: "completed", targetHours: 7 },
              { id: "mnc_ai2", name: "Statistical Machine Learning Models & Kernels", examTag: "T2", weightage: "High", status: "not-started", targetHours: 9 },
              { id: "mnc_ai3", name: "Clustering, Neural Networks & Learning Theory", examTag: "T3", weightage: "High", status: "not-started", targetHours: 9 }
            ]
          },
          {
            id: "mnc_s4_se",
            code: "24B11CS223",
            name: "Software Engineering",
            color: "#06b6d4",
            chapters: [
              { id: "mnc_se1", name: "Software Development Lifecycle & Agile Methodology", examTag: "T1", weightage: "Medium", status: "completed", targetHours: 5 },
              { id: "mnc_se2", name: "System Design, Architectural Patterns & UML", examTag: "T2", weightage: "High", status: "not-started", targetHours: 8 },
              { id: "mnc_se3", name: "Software Testing, Code Refactoring & Metrics", examTag: "T3", weightage: "High", status: "not-started", targetHours: 8 }
            ]
          },
          {
            id: "mnc_s4_dsco",
            code: "25B11EC311",
            name: "Digital Systems & Comp. Organisation",
            color: "#f59e0b",
            chapters: [
              { id: "mnc_dsco1", name: "Combinational & Sequential Logic Design", examTag: "T1", weightage: "High", status: "completed", targetHours: 6 },
              { id: "mnc_dsco2", name: "CPU Datapath, ALU & Instruction Set Architectures", examTag: "T2", weightage: "High", status: "not-started", targetHours: 8 },
              { id: "mnc_dsco3", name: "Pipelining, Memory Hierarchy & Cache Design", examTag: "T3", weightage: "High", status: "not-started", targetHours: 9 }
            ]
          },
          {
            id: "mnc_s4_cplab",
            code: "24B15CS224",
            name: "Competitive Programming Lab",
            color: "#06b6d4",
            chapters: [
              { id: "mnc_cpl_1", name: "Sheet 1-3: Time Complexity Optimizations, Prefix Sums & Two Pointers", examTag: "T1", weightage: "High", status: "completed", targetHours: 5 },
              { id: "mnc_cpl_2", name: "Sheet 4-6: Bit Manipulation, Number Theory & Binary Search on Answer", examTag: "T1", weightage: "High", status: "not-started", targetHours: 6 },
              { id: "mnc_cpl_3", name: "Sheet 7-9: Graph Problems (DFS/BFS, Disjoint Set Union)", examTag: "T2", weightage: "High", status: "not-started", targetHours: 7 },
              { id: "mnc_cpl_4", name: "Sheet 10-12: Advanced DP with Bitmask & Segment Trees", examTag: "T3", weightage: "High", status: "not-started", targetHours: 8 }
            ]
          },
          {
            id: "mnc_s4_daalab",
            code: "24B15CS221",
            name: "Design & Analysis of Algorithms Lab",
            color: "#3b82f6",
            chapters: [
              { id: "mnc_daal_1", name: "Lab 1-3: Empirical Running Time of Sorting (Merge, Quick, Heap)", examTag: "T1", weightage: "Medium", status: "completed", targetHours: 5 },
              { id: "mnc_daal_2", name: "Lab 4-6: Greedy Programs: Prim's, Kruskal's & Huffman Codes", examTag: "T1", weightage: "High", status: "not-started", targetHours: 6 },
              { id: "mnc_daal_3", name: "Lab 7-9: DP Implementations: LCS, Matrix Chain & 0/1 Knapsack", examTag: "T2", weightage: "High", status: "not-started", targetHours: 7 },
              { id: "mnc_daal_4", name: "Lab 10-12: Dijkstra, Bellman-Ford & Backtracking Problems (N-Queens)", examTag: "T3", weightage: "High", status: "not-started", targetHours: 8 }
            ]
          },
          {
            id: "mnc_s4_aimllab",
            code: "24B15CS222",
            name: "AI & Machine Learning Lab",
            color: "#6366f1",
            chapters: [
              { id: "mnc_aimll_1", name: "Lab 1-3: State Space Search (A*, BFS, DFS) in Python", examTag: "T1", weightage: "High", status: "completed", targetHours: 5 },
              { id: "mnc_aimll_2", name: "Lab 4-6: Regression & Classification using Scikit-Learn", examTag: "T1", weightage: "High", status: "not-started", targetHours: 6 },
              { id: "mnc_aimll_3", name: "Lab 7-9: Decision Trees, Random Forest & SVM Tuning", examTag: "T2", weightage: "High", status: "not-started", targetHours: 7 },
              { id: "mnc_aimll_4", name: "Lab 10-12: K-Means Clustering & Basic MLP Neural Network Model", examTag: "T3", weightage: "High", status: "not-started", targetHours: 8 }
            ]
          },
          {
            id: "mnc_s4_dscolab",
            code: "25B15EC311",
            name: "Digital Systems & Comp. Org Lab",
            color: "#f59e0b",
            chapters: [
              { id: "mnc_dscol_1", name: "Exp 1-3: Verilog/VHDL Simulation of Combinational Logic (ALU)", examTag: "T1", weightage: "Medium", status: "completed", targetHours: 5 },
              { id: "mnc_dscol_2", name: "Exp 4-6: Design of Synchronous Counters & Register Files", examTag: "T1", weightage: "High", status: "not-started", targetHours: 6 },
              { id: "mnc_dscol_3", name: "Exp 7-9: Datapath Design & Single-Cycle Processor Simulation", examTag: "T2", weightage: "High", status: "not-started", targetHours: 7 },
              { id: "mnc_dscol_4", name: "Exp 10-12: Cache Performance Analysis & Pipeline Hazard Simulation", examTag: "T3", weightage: "High", status: "not-started", targetHours: 8 }
            ]
          },
          {
            id: "mnc_s4_evslab",
            code: "19B13BT211",
            name: "Environmental Studies Lab",
            color: "#10b981",
            chapters: [
              { id: "mnc_evsl_1", name: "Field Exp 1-3: Water Quality Testing: pH, Turbidity & Hardness", examTag: "T1", weightage: "Medium", status: "completed", targetHours: 3 },
              { id: "mnc_evsl_2", name: "Field Exp 4-6: Dissolved Oxygen (DO) & Biochemical Oxygen Demand (BOD)", examTag: "T2", weightage: "Medium", status: "not-started", targetHours: 4 },
              { id: "mnc_evsl_3", name: "Field Exp 7-9: Air Quality (PM2.5/PM10) & Solid Waste Management Case Study", examTag: "T3", weightage: "High", status: "not-started", targetHours: 4 }
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
        subjects: createCommonSem1("rai")
      },
      sem2: {
        name: "Semester 2",
        subjects: createCommonSem2("rai")
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
