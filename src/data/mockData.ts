// Mock data for the CIP prototype

export type Role = 'atm' | 'aps' | 'md' | 'id';

export interface RoleInfo {
  key: Role;
  label: string;
  fullLabel: string;
  description: string;
  avatar: string;
}

export const roles: RoleInfo[] = [
  { key: 'atm', label: 'ATM', fullLabel: 'ATM Team', description: 'Import, manage, and analyze outcome data', avatar: 'AT' },
  { key: 'aps', label: 'APS', fullLabel: 'Academic Program Strategist', description: 'Lead curriculum conversations with partners', avatar: 'PS' },
  { key: 'md', label: 'MD', fullLabel: 'Managing Director', description: 'Access summary reports for partner engagement', avatar: 'MD' },
  { key: 'id', label: 'ID', fullLabel: 'Instructional Designer', description: 'Reference alignment data during course design', avatar: 'ID' },
];

export const partners = [
  { id: 1, name: 'Meridian University', programs: 12, status: 'Active', lastReview: '2026-02-15' },
  { id: 2, name: 'Pacific Western College', programs: 8, status: 'Active', lastReview: '2026-01-20' },
  { id: 3, name: 'Northern Highlands University', programs: 15, status: 'Pending Review', lastReview: '2025-11-10' },
  { id: 4, name: 'Eastshore Technical Institute', programs: 6, status: 'Active', lastReview: '2026-03-01' },
  { id: 5, name: 'Summit State University', programs: 20, status: 'Active', lastReview: '2026-02-28' },
];

export const programs = [
  { id: 1, partnerId: 1, name: 'B.S. Computer Science', courses: 12, healthScore: 87, status: 'Reviewed' },
  { id: 2, partnerId: 1, name: 'M.S. Data Analytics', courses: 10, healthScore: 92, status: 'Reviewed' },
  { id: 3, partnerId: 2, name: 'B.A. Business Administration', courses: 14, healthScore: 71, status: 'Needs Review' },
  { id: 4, partnerId: 2, name: 'M.B.A.', courses: 16, healthScore: 65, status: 'In Progress' },
  { id: 5, partnerId: 3, name: 'B.S. Nursing (BSN)', courses: 18, healthScore: 78, status: 'Reviewed' },
  { id: 6, partnerId: 4, name: 'A.S. Cybersecurity', courses: 8, healthScore: 94, status: 'Reviewed' },
];

export const heatmapData = {
  courses: ['CS 101', 'CS 201', 'CS 301', 'CS 310', 'CS 350', 'CS 401', 'CS 410', 'CS 450', 'CS 490', 'CS 495'],
  outcomes: ['PLO 1: Critical Thinking', 'PLO 2: Technical Design', 'PLO 3: Communication', 'PLO 4: Ethics', 'PLO 5: Teamwork', 'PLO 6: Problem Solving'],
  matrix: [
    [3, 2, 0, 1, 0, 3],
    [2, 3, 1, 0, 2, 3],
    [1, 3, 0, 0, 1, 2],
    [0, 2, 2, 1, 3, 1],
    [1, 1, 3, 0, 2, 2],
    [2, 3, 1, 2, 1, 3],
    [0, 2, 2, 3, 1, 1],
    [3, 3, 0, 1, 2, 3],
    [2, 1, 3, 2, 3, 2],
    [3, 2, 2, 1, 3, 3],
  ],
};

export const coverageGaps = [
  { outcome: 'PLO 3: Communication', coveredCourses: 4, totalCourses: 10, severity: 'high' as const },
  { outcome: 'PLO 4: Ethics', coveredCourses: 5, totalCourses: 10, severity: 'medium' as const },
  { outcome: 'PLO 1: Critical Thinking', coveredCourses: 7, totalCourses: 10, severity: 'low' as const },
];

export const workflowSteps = [
  { step: 1, title: 'Export Cartridges', description: 'Export course cartridges from partner LMS (8–12 courses)', duration: '30 min', status: 'complete' as const },
  { step: 2, title: 'Upload & Ingest', description: 'Bulk upload cartridges into CIP for parsing', duration: '15 min', status: 'complete' as const },
  { step: 3, title: 'Map Outcomes', description: 'Align CLOs to PLOs and external standards', duration: '90 min', status: 'active' as const },
  { step: 4, title: 'Generate Reports', description: 'Run alignment analysis and gap reports', duration: '10 min', status: 'pending' as const },
  { step: 5, title: 'Review & Share', description: 'Configure and share partner-ready reports', duration: '30 min', status: 'pending' as const },
];

export const timelineEvents = [
  { date: '2024 Q1', title: 'Initial Review', type: 'review' },
  { date: '2024 Q3', title: 'Curriculum Refresh', type: 'milestone' },
  { date: '2025 Q1', title: 'Mid-Cycle Assessment', type: 'review' },
  { date: '2025 Q3', title: 'Credential Expansion', type: 'milestone' },
  { date: '2026 Q1', title: 'Accreditation Prep', type: 'accreditation' },
  { date: '2026 Q3', title: 'Full Re-Review', type: 'review' },
];

export const statsForRole: Record<Role, { label: string; value: string; change: string }[]> = {
  atm: [
    { label: 'Programs Mapped', value: '47', change: '+8 this month' },
    { label: 'Outcome Sets', value: '124', change: '+12 this quarter' },
    { label: 'Cartridges Ingested', value: '389', change: '+34 this week' },
    { label: 'Reports Generated', value: '156', change: '+22 this month' },
  ],
  aps: [
    { label: 'Partner Reviews', value: '12', change: '3 pending' },
    { label: 'Programs Analyzed', value: '28', change: '+5 this month' },
    { label: 'Credential Opportunities', value: '7', change: '2 new' },
    { label: 'Active Scenarios', value: '15', change: '+4 this quarter' },
  ],
  md: [
    { label: 'Active Partners', value: '23', change: '+2 this quarter' },
    { label: 'Programs in Portfolio', value: '67', change: '+5 this month' },
    { label: 'Avg. Health Score', value: '82%', change: '+3% YoY' },
    { label: 'Re-engagements', value: '8', change: '3 upcoming' },
  ],
  id: [
    { label: 'Courses Designed', value: '34', change: '+6 this quarter' },
    { label: 'Alignments Referenced', value: '89', change: '+15 this month' },
    { label: 'Design Guides', value: '22', change: '+3 this month' },
    { label: 'Workforce Mappings', value: '45', change: '+8 this quarter' },
  ],
};
