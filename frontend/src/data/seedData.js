
export const WEEK_MAP = ['Sunday','Monday','Tuesday','Wednesday','Thursday','Friday','Saturday'];



export const STATUS_FILTERS = [
  { value: 'all',         label: 'All',        color: 'gray'   },
  { value: 'pending',     label: 'Pending',     color: 'yellow' },
  { value: 'in-progress', label: 'In Progress', color: 'blue'   },
  { value: 'completed',   label: 'Completed',   color: 'green'  },
  { value: 'overdue',     label: 'Overdue',     color: 'red'    },
];

export const PRIORITY_OPTS = [
  { value: 'urgent', label: '🔴 Urgent' },
  { value: 'high',   label: '🟠 High'   },
  { value: 'medium', label: '🟡 Medium' },
  { value: 'low',    label: '🟢 Low'    },
];

export const TYPE_OPTS = [
  { value: 'Assignment', label: 'Assignment' },
  { value: 'Report', label: 'Report' },
  { value: 'Essay', label: 'Essay' },
  { value: 'Practical', label: 'Practical' },
  { value: 'Research', label: 'Research' },
  { value: 'Proposal', label: 'Proposal' },
  { value: 'Project', label: 'Project' },
  { value: 'Exam Prep', label: 'Exam Prep' },
];

export const GRADE_POINTS = { 'A+':4.0,'A':4.0,'A-':3.7,'B+':3.3,'B':3.0,'B-':2.7,'C+':2.3,'C':2.0,'C-':1.7,'D':1.0 };

export const COURSES = [
  { code: 'SE 4121', name: 'Advanced Software Engineering',    credits: 3, color: '#3b74f5' },
  { code: 'SE 4122', name: 'Mobile App Development',          credits: 3, color: '#8b5cf6' },
  { code: 'SE 4123', name: 'Cloud Computing & DevOps',        credits: 3, color: '#10b981' },
  { code: 'SE 4124', name: 'Machine Learning Fundamentals',   credits: 3, color: '#f59e0b' },
  { code: 'SE 4125', name: 'Software Security & Testing',     credits: 3, color: '#ef4444' },
  { code: 'SE 4126', name: 'Research Methods in SE',          credits: 2, color: '#ec4899' },
];

const sid = (n) => `seed-schedule-${n}`;
const aid = (n) => `seed-assign-${n}`;

export const SCHEDULE_SEED = [
  { id: sid(1),  day: 'Monday',    startTime: '08:00', endTime: '09:30', course: 'SE 4121', room: 'LT-01', type: 'Lecture', lecturer: 'Dr. Perera' },
  { id: sid(2),  day: 'Monday',    startTime: '10:00', endTime: '11:30', course: 'SE 4122', room: 'Lab-3', type: 'Lab',     lecturer: 'Mr. Silva' },
  { id: sid(3),  day: 'Monday',    startTime: '13:00', endTime: '14:30', course: 'SE 4124', room: 'LT-02', type: 'Lecture', lecturer: 'Dr. Fernando' },
  { id: sid(4),  day: 'Tuesday',   startTime: '09:00', endTime: '10:30', course: 'SE 4123', room: 'LT-03', type: 'Lecture', lecturer: 'Dr. Jayawardena' },
  { id: sid(5),  day: 'Tuesday',   startTime: '11:00', endTime: '12:30', course: 'SE 4125', room: 'LT-01', type: 'Lecture', lecturer: 'Dr. Bandara' },
  { id: sid(6),  day: 'Wednesday', startTime: '08:30', endTime: '10:00', course: 'SE 4121', room: 'Lab-1', type: 'Lab',     lecturer: 'Mr. Karunaratne' },
  { id: sid(7),  day: 'Wednesday', startTime: '10:30', endTime: '12:00', course: 'SE 4126', room: 'SR-02', type: 'Seminar', lecturer: 'Dr. Wickramasinghe' },
  { id: sid(8),  day: 'Wednesday', startTime: '14:00', endTime: '15:30', course: 'SE 4124', room: 'Lab-2', type: 'Lab',     lecturer: 'Dr. Fernando' },
  { id: sid(9),  day: 'Thursday',  startTime: '09:00', endTime: '10:30', course: 'SE 4122', room: 'LT-02', type: 'Lecture', lecturer: 'Mr. Silva' },
  { id: sid(10), day: 'Thursday',  startTime: '11:00', endTime: '12:30', course: 'SE 4123', room: 'Lab-4', type: 'Lab',     lecturer: 'Dr. Jayawardena' },
  { id: sid(11), day: 'Thursday',  startTime: '13:30', endTime: '15:00', course: 'SE 4125', room: 'LT-03', type: 'Lecture', lecturer: 'Dr. Bandara' },
  { id: sid(12), day: 'Friday',    startTime: '08:00', endTime: '09:30', course: 'SE 4126', room: 'LT-01', type: 'Lecture', lecturer: 'Dr. Wickramasinghe' },
  { id: sid(13), day: 'Friday',    startTime: '10:00', endTime: '11:30', course: 'SE 4121', room: 'LT-02', type: 'Lecture', lecturer: 'Dr. Perera' },
];

export const ASSIGNMENT_SEED = [
  {
    id: aid(1), title: 'PWA Implementation Report', course: 'SE 4122',
    description: 'Document the full implementation of your PWA with service workers, caching strategy, and offline capability.',
    dueDate: new Date(Date.now() + 3 * 86400000).toISOString(),
    status: 'pending', priority: 'high', type: 'Report', marks: 25,
    createdAt: new Date().toISOString(),
  },
  {
    id: aid(2), title: 'CI/CD Pipeline Setup', course: 'SE 4123',
    description: 'Configure a complete CI/CD pipeline using GitHub Actions. Include linting, testing, build, and deployment stages.',
    dueDate: new Date(Date.now() + 7 * 86400000).toISOString(),
    status: 'in-progress', priority: 'high', type: 'Practical', marks: 30,
    createdAt: new Date().toISOString(),
  },
  {
    id: aid(3), title: 'ML Model Evaluation Essay', course: 'SE 4124',
    description: 'Write a 2000-word essay evaluating three ML models on the provided dataset with precision/recall metrics.',
    dueDate: new Date(Date.now() + 10 * 86400000).toISOString(),
    status: 'pending', priority: 'medium', type: 'Essay', marks: 20,
    createdAt: new Date().toISOString(),
  },
  {
    id: aid(4), title: 'Security Audit – OWASP Benchmark', course: 'SE 4125',
    description: 'Run SAST tools against the OWASP Benchmark dataset and compute Recall, FPR, Precision, Accuracy, F1.',
    dueDate: new Date(Date.now() + 14 * 86400000).toISOString(),
    status: 'in-progress', priority: 'high', type: 'Research', marks: 40,
    createdAt: new Date().toISOString(),
  },
  {
    id: aid(5), title: 'Software Architecture Diagrams', course: 'SE 4121',
    description: 'Create UML class, sequence, and component diagrams for the e-commerce system case study.',
    dueDate: new Date(Date.now() - 2 * 86400000).toISOString(),
    status: 'completed', priority: 'medium', type: 'Assignment', marks: 15,
    createdAt: new Date(Date.now() - 10 * 86400000).toISOString(),
    completedAt: new Date(Date.now() - 86400000).toISOString(),
  },
  {
    id: aid(6), title: 'Research Proposal – Vulnerability Detection', course: 'SE 4126',
    description: 'Submit a 1500-word research proposal outlining your study on ML-based vulnerability detection.',
    dueDate: new Date(Date.now() + 5 * 86400000).toISOString(),
    status: 'pending', priority: 'urgent', type: 'Proposal', marks: 35,
    createdAt: new Date().toISOString(),
  },
];

export const PROFILE_SEED = {
  name: 'Jenushan',
  regNumber: 'SE/2021/001',
  faculty: 'Faculty of Science',
  degree: 'BSc Honours in Software Engineering',
  year: 4,
  semester: 2,
  gpa: 3.72,
  completedCredits: 78,
  totalCredits: 120,
  avatar: null,
  courses: COURSES,
  completedCourses: [
    { code: 'SE 1111', name: 'Programming Fundamentals',   credits: 3, grade: 'A',  gp: 4.0 },
    { code: 'SE 1112', name: 'Discrete Mathematics',       credits: 3, grade: 'A-', gp: 3.7 },
    { code: 'SE 2121', name: 'Data Structures & Algorithms', credits: 3, grade: 'A', gp: 4.0 },
    { code: 'SE 2122', name: 'Database Systems',           credits: 3, grade: 'B+', gp: 3.3 },
    { code: 'SE 3131', name: 'Operating Systems',          credits: 3, grade: 'A-', gp: 3.7 },
    { code: 'SE 3132', name: 'Computer Networks',          credits: 3, grade: 'A',  gp: 4.0 },
    { code: 'SE 3133', name: 'Software Engineering Principles', credits: 3, grade: 'A', gp: 4.0 },
    { code: 'SE 3134', name: 'Web Technologies',           credits: 3, grade: 'B+', gp: 3.3 },
  ],
  notificationsEnabled: false,
  theme: 'light',
};
