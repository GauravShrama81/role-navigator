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

// ===== Standards Management mock data =====
export interface OutcomeSet {
  id: string;
  name: string;
  type: 'partner' | 'global';
  source: string;
  version: string;
  discipline: string;
  outcomeCount: number;
  lastUpdated: string;
  status: 'active' | 'draft' | 'archived';
}

export const outcomeSets: OutcomeSet[] = [
  { id: 'os1', name: 'AI Competency Framework', type: 'global', source: 'Risepoint', version: '2.1', discipline: 'Computer Science', outcomeCount: 18, lastUpdated: '2026-02-10', status: 'active' },
  { id: 'os2', name: 'Nursing Clinical Standards', type: 'partner', source: 'Northern Highlands', version: '1.4', discipline: 'Nursing', outcomeCount: 24, lastUpdated: '2026-01-15', status: 'active' },
  { id: 'os3', name: 'Business Core Competencies', type: 'global', source: 'Risepoint', version: '3.0', discipline: 'Business', outcomeCount: 15, lastUpdated: '2026-03-01', status: 'active' },
  { id: 'os4', name: 'Cybersecurity Workforce Framework', type: 'global', source: 'NICE/BLS', version: '1.0', discipline: 'Cybersecurity', outcomeCount: 32, lastUpdated: '2025-12-20', status: 'active' },
  { id: 'os5', name: 'General Education PLOs', type: 'partner', source: 'Meridian University', version: '2.0', discipline: 'General', outcomeCount: 8, lastUpdated: '2026-02-28', status: 'active' },
  { id: 'os6', name: 'Data Science Proficiencies', type: 'global', source: 'Risepoint', version: '1.2', discipline: 'Data Science', outcomeCount: 20, lastUpdated: '2026-01-30', status: 'draft' },
];

export interface OutcomeHierarchy {
  id: string;
  code: string;
  text: string;
  level: 'PLO' | 'Sub-Outcome' | 'CLO' | 'Assessment';
  children?: OutcomeHierarchy[];
}

export const sampleHierarchy: OutcomeHierarchy[] = [
  {
    id: 'plo1', code: 'PLO 1', text: 'Critical Thinking & Analysis', level: 'PLO',
    children: [
      {
        id: 'clo1-1', code: 'CLO 1.1', text: 'Evaluate arguments using formal logic', level: 'CLO',
        children: [
          { id: 'a1-1-1', code: 'A 1.1.1', text: 'Logic Case Study Analysis', level: 'Assessment' },
          { id: 'a1-1-2', code: 'A 1.1.2', text: 'Argument Mapping Exercise', level: 'Assessment' },
        ],
      },
      {
        id: 'clo1-2', code: 'CLO 1.2', text: 'Apply quantitative reasoning to problem solving', level: 'CLO',
        children: [
          { id: 'a1-2-1', code: 'A 1.2.1', text: 'Quantitative Reasoning Portfolio', level: 'Assessment' },
        ],
      },
    ],
  },
  {
    id: 'plo2', code: 'PLO 2', text: 'Technical Design & Implementation', level: 'PLO',
    children: [
      {
        id: 'sub2-1', code: 'SO 2.1', text: 'Software Architecture', level: 'Sub-Outcome',
        children: [
          {
            id: 'clo2-1-1', code: 'CLO 2.1.1', text: 'Design modular software systems', level: 'CLO',
            children: [
              { id: 'a2-1-1-1', code: 'A 2.1.1.1', text: 'Architecture Design Project', level: 'Assessment' },
            ],
          },
        ],
      },
      {
        id: 'sub2-2', code: 'SO 2.2', text: 'Database Systems', level: 'Sub-Outcome',
        children: [
          { id: 'clo2-2-1', code: 'CLO 2.2.1', text: 'Implement normalized database schemas', level: 'CLO' },
        ],
      },
    ],
  },
  {
    id: 'plo3', code: 'PLO 3', text: 'Professional Communication', level: 'PLO',
    children: [
      { id: 'clo3-1', code: 'CLO 3.1', text: 'Write technical documentation', level: 'CLO' },
      { id: 'clo3-2', code: 'CLO 3.2', text: 'Present findings to stakeholders', level: 'CLO' },
    ],
  },
];

// ===== Cartridge Ingestion mock data =====
export interface CartridgeImport {
  id: string;
  fileName: string;
  courseName: string;
  lms: 'Canvas' | 'Brightspace' | 'Blackboard' | 'Moodle';
  format: 'IMS CC' | 'Thin CC';
  status: 'complete' | 'processing' | 'warning' | 'error';
  importDate: string;
  objectivesFound: number;
  assessmentsFound: number;
  modulesFound: number;
  size: string;
  partner: string;
}

export const cartridgeImports: CartridgeImport[] = [
  { id: 'c1', fileName: 'CS101_Fall2026.imscc', courseName: 'CS 101 - Intro to CS', lms: 'Canvas', format: 'IMS CC', status: 'complete', importDate: '2026-03-15', objectivesFound: 8, assessmentsFound: 6, modulesFound: 14, size: '24 MB', partner: 'Meridian University' },
  { id: 'c2', fileName: 'CS201_Fall2026.imscc', courseName: 'CS 201 - Data Structures', lms: 'Canvas', format: 'IMS CC', status: 'complete', importDate: '2026-03-15', objectivesFound: 12, assessmentsFound: 8, modulesFound: 16, size: '31 MB', partner: 'Meridian University' },
  { id: 'c3', fileName: 'CS301_Spring2026.imscc', courseName: 'CS 301 - Algorithms', lms: 'Canvas', format: 'IMS CC', status: 'complete', importDate: '2026-03-15', objectivesFound: 10, assessmentsFound: 7, modulesFound: 12, size: '18 MB', partner: 'Meridian University' },
  { id: 'c4', fileName: 'BUS101_export.zip', courseName: 'BUS 101 - Intro to Business', lms: 'Blackboard', format: 'IMS CC', status: 'warning', importDate: '2026-03-14', objectivesFound: 5, assessmentsFound: 4, modulesFound: 10, size: '15 MB', partner: 'Pacific Western College' },
  { id: 'c5', fileName: 'NUR201_clinical.imscc', courseName: 'NUR 201 - Clinical Foundations', lms: 'Brightspace', format: 'IMS CC', status: 'complete', importDate: '2026-03-12', objectivesFound: 14, assessmentsFound: 9, modulesFound: 8, size: '42 MB', partner: 'Northern Highlands University' },
  { id: 'c6', fileName: 'CYB110_intro.imscc', courseName: 'CYB 110 - Intro to Cybersecurity', lms: 'Moodle', format: 'Thin CC', status: 'processing', importDate: '2026-03-16', objectivesFound: 0, assessmentsFound: 0, modulesFound: 0, size: '8 MB', partner: 'Eastshore Technical Institute' },
  { id: 'c7', fileName: 'MBA500_strategy.imscc', courseName: 'MBA 500 - Strategic Management', lms: 'Canvas', format: 'IMS CC', status: 'error', importDate: '2026-03-16', objectivesFound: 0, assessmentsFound: 0, modulesFound: 0, size: '55 MB', partner: 'Pacific Western College' },
];

// ===== Outcome Mapping mock data =====
export interface MappingItem {
  id: string;
  clo: string;
  cloText: string;
  course: string;
  plo: string;
  ploText: string;
  level: 0 | 1 | 2 | 3;
  mappedBy: string;
  mappedDate: string;
}

export const mappingItems: MappingItem[] = [
  { id: 'm1', clo: 'CLO 1.1', cloText: 'Evaluate arguments using formal logic', course: 'CS 101', plo: 'PLO 1', ploText: 'Critical Thinking', level: 2, mappedBy: 'ATM Team', mappedDate: '2026-03-10' },
  { id: 'm2', clo: 'CLO 1.2', cloText: 'Apply quantitative reasoning', course: 'CS 101', plo: 'PLO 1', ploText: 'Critical Thinking', level: 3, mappedBy: 'ATM Team', mappedDate: '2026-03-10' },
  { id: 'm3', clo: 'CLO 2.1', cloText: 'Implement linked list operations', course: 'CS 201', plo: 'PLO 2', ploText: 'Technical Design', level: 3, mappedBy: 'ATM Team', mappedDate: '2026-03-11' },
  { id: 'm4', clo: 'CLO 2.2', cloText: 'Analyze algorithm complexity', course: 'CS 201', plo: 'PLO 6', ploText: 'Problem Solving', level: 2, mappedBy: 'ATM Team', mappedDate: '2026-03-11' },
  { id: 'm5', clo: 'CLO 3.1', cloText: 'Design modular systems', course: 'CS 301', plo: 'PLO 2', ploText: 'Technical Design', level: 3, mappedBy: 'ATM Team', mappedDate: '2026-03-12' },
  { id: 'm6', clo: 'CLO 3.2', cloText: 'Write technical documentation', course: 'CS 301', plo: 'PLO 3', ploText: 'Communication', level: 1, mappedBy: 'ATM Team', mappedDate: '2026-03-12' },
  { id: 'm7', clo: 'CLO 4.1', cloText: 'Apply ethical frameworks to computing', course: 'CS 310', plo: 'PLO 4', ploText: 'Ethics', level: 3, mappedBy: 'ATM Team', mappedDate: '2026-03-13' },
  { id: 'm8', clo: 'CLO 5.1', cloText: 'Collaborate in software development teams', course: 'CS 350', plo: 'PLO 5', ploText: 'Teamwork', level: 2, mappedBy: 'ATM Team', mappedDate: '2026-03-13' },
  { id: 'm9', clo: 'CLO 6.1', cloText: 'Build full-stack web applications', course: 'CS 401', plo: 'PLO 2', ploText: 'Technical Design', level: 3, mappedBy: 'ATM Team', mappedDate: '2026-03-14' },
  { id: 'm10', clo: 'CLO 7.1', cloText: 'Present project outcomes', course: 'CS 490', plo: 'PLO 3', ploText: 'Communication', level: 2, mappedBy: 'ATM Team', mappedDate: '2026-03-14' },
];

// ===== Scenario Planning mock data =====
export interface Scenario {
  id: string;
  name: string;
  description: string;
  type: 'program-pathway' | 'credential-unbundling' | 'program-refresh';
  status: 'draft' | 'active' | 'shared';
  createdBy: string;
  createdDate: string;
  courses: string[];
  gapCount: number;
  newContentCount: number;
  existingContentCount: number;
}

export const scenarios: Scenario[] = [
  {
    id: 's1', name: 'Cybersecurity Certificate from CS Program',
    description: 'Extract cybersecurity-relevant courses from B.S. CS to form a standalone certificate.',
    type: 'credential-unbundling', status: 'active', createdBy: 'APS Team',
    createdDate: '2026-03-01', courses: ['CS 310', 'CS 410', 'CS 450'],
    gapCount: 2, newContentCount: 2, existingContentCount: 8,
  },
  {
    id: 's2', name: 'Data Analytics Micro-credential',
    description: 'Bundle data-focused CLOs into a micro-credential pathway.',
    type: 'credential-unbundling', status: 'draft', createdBy: 'APS Team',
    createdDate: '2026-03-10', courses: ['CS 201', 'CS 301', 'CS 495'],
    gapCount: 1, newContentCount: 1, existingContentCount: 12,
  },
  {
    id: 's3', name: 'B.S. CS — Revised Sequence 2027',
    description: 'Proposed resequencing moving ethics earlier and adding capstone prep.',
    type: 'program-refresh', status: 'shared', createdBy: 'ATM Team',
    createdDate: '2026-02-15', courses: ['CS 101', 'CS 201', 'CS 301', 'CS 310', 'CS 350', 'CS 401', 'CS 410', 'CS 450', 'CS 490', 'CS 495'],
    gapCount: 0, newContentCount: 1, existingContentCount: 48,
  },
  {
    id: 's4', name: 'Healthcare IT Bridge Program',
    description: 'Combine nursing informatics and CS content for a new pathway.',
    type: 'program-pathway', status: 'draft', createdBy: 'APS Team',
    createdDate: '2026-03-14', courses: ['NUR 201', 'CS 101', 'CS 310'],
    gapCount: 4, newContentCount: 6, existingContentCount: 14,
  },
];

// ===== Overmapping & Redundancy data =====
export const overmappingData = [
  { clo: 'CLO 2.1: Implement linked list operations', course: 'CS 201', mappedOutcomes: 5, outcomes: ['PLO 1', 'PLO 2', 'PLO 5', 'PLO 6', 'WC Data Structures'], severity: 'high' as const },
  { clo: 'CLO 6.1: Build full-stack web applications', course: 'CS 401', mappedOutcomes: 4, outcomes: ['PLO 2', 'PLO 5', 'PLO 6', 'WC Software Dev'], severity: 'medium' as const },
  { clo: 'CLO 1.2: Apply quantitative reasoning', course: 'CS 101', mappedOutcomes: 4, outcomes: ['PLO 1', 'PLO 6', 'WC Data Analysis', 'WC Problem Solving'], severity: 'medium' as const },
];

export const redundancyData = [
  { objective: 'Explain basic data types and control structures', courses: ['CS 101', 'CS 201', 'CS 301'], intentionalScaffolding: false, severity: 'high' as const },
  { objective: 'Apply version control best practices', courses: ['CS 201', 'CS 350', 'CS 401'], intentionalScaffolding: true, severity: 'low' as const },
  { objective: 'Write unit tests for software modules', courses: ['CS 301', 'CS 401', 'CS 490'], intentionalScaffolding: true, severity: 'low' as const },
  { objective: 'Describe ethical implications of computing', courses: ['CS 101', 'CS 310'], intentionalScaffolding: false, severity: 'medium' as const },
];

// ===== Role-based navigation items =====
export interface NavItem {
  label: string;
  path: string;
  roles: Role[];
}

export const dashboardNavItems: NavItem[] = [
  { label: 'Dashboard', path: '/dashboard', roles: ['atm', 'aps', 'md', 'id'] },
  { label: 'Standards', path: '/dashboard/standards', roles: ['atm', 'id'] },
  { label: 'Ingestion', path: '/dashboard/ingestion', roles: ['atm'] },
  { label: 'Mapping', path: '/dashboard/mapping', roles: ['atm', 'id'] },
  { label: 'Reports', path: '/dashboard/reports', roles: ['atm', 'aps', 'md', 'id'] },
  { label: 'Scenarios', path: '/dashboard/scenarios', roles: ['atm', 'aps'] },
  { label: 'Workflow', path: '/dashboard/workflow', roles: ['atm', 'aps'] },
];

// ===== Workforce competency data =====
export interface WorkforceCompetency {
  id: string;
  soc: string;
  occupation: string;
  competency: string;
  category: string;
  mapped: boolean;
  mappedTo?: string;
}

export const workforceCompetencies: WorkforceCompetency[] = [
  { id: 'wc1', soc: '15-1252', occupation: 'Software Developers', competency: 'Analyze user requirements', category: 'Software Development', mapped: true, mappedTo: 'PLO 2' },
  { id: 'wc2', soc: '15-1252', occupation: 'Software Developers', competency: 'Design software solutions', category: 'Software Development', mapped: true, mappedTo: 'PLO 2' },
  { id: 'wc3', soc: '15-1252', occupation: 'Software Developers', competency: 'Test and debug software', category: 'Software Development', mapped: true, mappedTo: 'PLO 6' },
  { id: 'wc4', soc: '15-1212', occupation: 'Information Security Analysts', competency: 'Monitor security systems', category: 'Cybersecurity', mapped: false },
  { id: 'wc5', soc: '15-1212', occupation: 'Information Security Analysts', competency: 'Develop security policies', category: 'Cybersecurity', mapped: true, mappedTo: 'PLO 4' },
  { id: 'wc6', soc: '15-2051', occupation: 'Data Scientists', competency: 'Develop statistical models', category: 'Data Science', mapped: true, mappedTo: 'PLO 1' },
  { id: 'wc7', soc: '15-2051', occupation: 'Data Scientists', competency: 'Visualize data insights', category: 'Data Science', mapped: false },
  { id: 'wc8', soc: '11-1021', occupation: 'General Managers', competency: 'Strategic planning', category: 'Management', mapped: false },
];
