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
  { id: 1, name: 'Fortis College', programs: 3, status: 'Active', lastReview: '2026-02-15' },
  { id: 2, name: 'National University', programs: 4, status: 'Active', lastReview: '2026-01-20' },
  { id: 3, name: 'Grand Canyon University', programs: 5, status: 'Pending Review', lastReview: '2025-11-10' },
  { id: 4, name: 'Liberty University', programs: 3, status: 'Active', lastReview: '2026-03-01' },
  { id: 5, name: 'Purdue Global', programs: 6, status: 'Active', lastReview: '2026-02-28' },
];

// ===== Programs (matching reference site) =====
export interface Program {
  id: string;
  name: string;
  partner: string;
  lms: 'Canvas' | 'Blackboard' | 'D2L Brightspace' | 'Moodle';
  status: 'Active' | 'Review' | 'Draft';
  gaps: number;
  alignmentScore: number;
  courses: number;
  ploCount: number;
  accreditation: string;
  plos: ProgramPLO[];
  courseList: ProgramCourse[];
}

export interface ProgramPLO {
  id: string;
  code: string;
  name: string;
  coverage: number;
  introduced: number;
  practiced: number;
  assessed: number;
  status: 'Strong' | 'Adequate' | 'Developing' | 'Gap';
}

export interface ProgramCourse {
  code: string;
  name: string;
  clos: number;
  plosMapped: number;
  ploAlignment: Record<string, 'I' | 'P' | 'A' | ''>;
}

export const programsList: Program[] = [
  {
    id: 'p1',
    name: 'Healthcare Administration, BS',
    partner: 'Fortis College',
    lms: 'Canvas',
    status: 'Active',
    gaps: 2,
    alignmentScore: 78,
    courses: 10,
    ploCount: 7,
    accreditation: 'ACHE/AUPHA competency-aligned',
    plos: [
      { id: 'plo1', code: 'PLO 1', name: 'Healthcare Systems', coverage: 88, introduced: 3, practiced: 4, assessed: 2, status: 'Strong' },
      { id: 'plo2', code: 'PLO 2', name: 'Ethics & Compliance', coverage: 80, introduced: 2, practiced: 3, assessed: 3, status: 'Strong' },
      { id: 'plo3', code: 'PLO 3', name: 'Healthcare Finance', coverage: 62, introduced: 2, practiced: 2, assessed: 2, status: 'Developing' },
      { id: 'plo4', code: 'PLO 4', name: 'Leadership & Management', coverage: 68, introduced: 1, practiced: 3, assessed: 2, status: 'Adequate' },
      { id: 'plo5', code: 'PLO 5', name: 'Quality & Patient Safety', coverage: 22, introduced: 0, practiced: 1, assessed: 1, status: 'Gap' },
      { id: 'plo6', code: 'PLO 6', name: 'Health Informatics', coverage: 35, introduced: 1, practiced: 1, assessed: 1, status: 'Gap' },
      { id: 'plo7', code: 'PLO 7', name: 'Health Policy & Law', coverage: 70, introduced: 2, practiced: 2, assessed: 2, status: 'Adequate' },
    ],
    courseList: [
      { code: 'HADM 101', name: 'Intro to Healthcare Administration', clos: 4, plosMapped: 4, ploAlignment: { 'PLO 1': 'I', 'PLO 2': 'I', 'PLO 3': '', 'PLO 4': 'I', 'PLO 5': '', 'PLO 6': '', 'PLO 7': 'I' } },
      { code: 'HADM 201', name: 'Health Policy & Law', clos: 2, plosMapped: 3, ploAlignment: { 'PLO 1': 'P', 'PLO 2': 'P', 'PLO 3': '', 'PLO 4': '', 'PLO 5': '', 'PLO 6': '', 'PLO 7': 'A' } },
      { code: 'HADM 210', name: 'Healthcare Finance & Economics', clos: 4, plosMapped: 3, ploAlignment: { 'PLO 1': 'I', 'PLO 2': '', 'PLO 3': 'A', 'PLO 4': '', 'PLO 5': 'I', 'PLO 6': '', 'PLO 7': '' } },
      { code: 'HADM 220', name: 'Ethics & Compliance in Healthcare', clos: 5, plosMapped: 4, ploAlignment: { 'PLO 1': 'I', 'PLO 2': 'A', 'PLO 3': '', 'PLO 4': 'I', 'PLO 5': '', 'PLO 6': '', 'PLO 7': 'P' } },
      { code: 'HADM 301', name: 'Healthcare Leadership & Management', clos: 2, plosMapped: 5, ploAlignment: { 'PLO 1': 'P', 'PLO 2': 'P', 'PLO 3': 'P', 'PLO 4': 'A', 'PLO 5': '', 'PLO 6': '', 'PLO 7': 'I' } },
      { code: 'HADM 310', name: 'Quality Improvement & Patient Safety', clos: 1, plosMapped: 5, ploAlignment: { 'PLO 1': 'I', 'PLO 2': '', 'PLO 3': 'P', 'PLO 4': 'P', 'PLO 5': 'A', 'PLO 6': 'P', 'PLO 7': '' } },
      { code: 'HADM 320', name: 'Health Informatics & Data Systems', clos: 3, plosMapped: 4, ploAlignment: { 'PLO 1': 'I', 'PLO 2': '', 'PLO 3': '', 'PLO 4': 'I', 'PLO 5': 'P', 'PLO 6': 'A', 'PLO 7': '' } },
      { code: 'HADM 401', name: 'Strategic Management Capstone', clos: 2, plosMapped: 7, ploAlignment: { 'PLO 1': 'A', 'PLO 2': 'A', 'PLO 3': 'A', 'PLO 4': 'A', 'PLO 5': 'A', 'PLO 6': 'P', 'PLO 7': 'A' } },
      { code: 'HADM 420', name: 'Healthcare Administration Practicum', clos: 1, plosMapped: 4, ploAlignment: { 'PLO 1': 'P', 'PLO 2': 'P', 'PLO 3': '', 'PLO 4': 'P', 'PLO 5': 'A', 'PLO 6': '', 'PLO 7': '' } },
      { code: 'NURS 305', name: 'Interprofessional Practice (cross-listed)', clos: 3, plosMapped: 5, ploAlignment: { 'PLO 1': '', 'PLO 2': 'I', 'PLO 3': '', 'PLO 4': 'P', 'PLO 5': 'P', 'PLO 6': 'I', 'PLO 7': 'I' } },
    ],
  },
  {
    id: 'p2',
    name: 'Nursing, BSN',
    partner: 'National University',
    lms: 'Blackboard',
    status: 'Active',
    gaps: 1,
    alignmentScore: 85,
    courses: 12,
    ploCount: 6,
    accreditation: 'CCNE-aligned',
    plos: [
      { id: 'n-plo1', code: 'PLO 1', name: 'Patient-Centered Care', coverage: 92, introduced: 4, practiced: 5, assessed: 3, status: 'Strong' },
      { id: 'n-plo2', code: 'PLO 2', name: 'Evidence-Based Practice', coverage: 88, introduced: 3, practiced: 4, assessed: 3, status: 'Strong' },
      { id: 'n-plo3', code: 'PLO 3', name: 'Clinical Judgment', coverage: 82, introduced: 2, practiced: 4, assessed: 3, status: 'Strong' },
      { id: 'n-plo4', code: 'PLO 4', name: 'Interprofessional Collaboration', coverage: 78, introduced: 3, practiced: 3, assessed: 2, status: 'Adequate' },
      { id: 'n-plo5', code: 'PLO 5', name: 'Quality & Safety', coverage: 85, introduced: 2, practiced: 4, assessed: 3, status: 'Strong' },
      { id: 'n-plo6', code: 'PLO 6', name: 'Informatics & Technology', coverage: 45, introduced: 1, practiced: 1, assessed: 1, status: 'Gap' },
    ],
    courseList: [],
  },
  {
    id: 'p3',
    name: 'Business Administration, MBA',
    partner: 'Grand Canyon University',
    lms: 'D2L Brightspace',
    status: 'Review',
    gaps: 4,
    alignmentScore: 58,
    courses: 14,
    ploCount: 8,
    accreditation: 'AACSB-aligned',
    plos: [
      { id: 'b-plo1', code: 'PLO 1', name: 'Strategic Thinking', coverage: 72, introduced: 2, practiced: 3, assessed: 2, status: 'Adequate' },
      { id: 'b-plo2', code: 'PLO 2', name: 'Financial Acumen', coverage: 65, introduced: 2, practiced: 2, assessed: 1, status: 'Developing' },
      { id: 'b-plo3', code: 'PLO 3', name: 'Marketing Analytics', coverage: 40, introduced: 1, practiced: 1, assessed: 0, status: 'Gap' },
      { id: 'b-plo4', code: 'PLO 4', name: 'Operations Management', coverage: 55, introduced: 1, practiced: 2, assessed: 1, status: 'Developing' },
      { id: 'b-plo5', code: 'PLO 5', name: 'Leadership & Ethics', coverage: 78, introduced: 2, practiced: 3, assessed: 2, status: 'Adequate' },
      { id: 'b-plo6', code: 'PLO 6', name: 'Global Business', coverage: 30, introduced: 1, practiced: 0, assessed: 0, status: 'Gap' },
      { id: 'b-plo7', code: 'PLO 7', name: 'Data-Driven Decision Making', coverage: 38, introduced: 1, practiced: 1, assessed: 0, status: 'Gap' },
      { id: 'b-plo8', code: 'PLO 8', name: 'Communication', coverage: 82, introduced: 3, practiced: 3, assessed: 2, status: 'Strong' },
    ],
    courseList: [],
  },
  {
    id: 'p4',
    name: 'Information Technology, BS',
    partner: 'Liberty University',
    lms: 'Canvas',
    status: 'Active',
    gaps: 1,
    alignmentScore: 71,
    courses: 10,
    ploCount: 6,
    accreditation: 'ABET-aligned',
    plos: [
      { id: 'it-plo1', code: 'PLO 1', name: 'Systems Architecture', coverage: 80, introduced: 2, practiced: 3, assessed: 2, status: 'Strong' },
      { id: 'it-plo2', code: 'PLO 2', name: 'Networking & Security', coverage: 75, introduced: 2, practiced: 2, assessed: 2, status: 'Adequate' },
      { id: 'it-plo3', code: 'PLO 3', name: 'Database Management', coverage: 68, introduced: 2, practiced: 2, assessed: 1, status: 'Adequate' },
      { id: 'it-plo4', code: 'PLO 4', name: 'Project Management', coverage: 72, introduced: 2, practiced: 3, assessed: 1, status: 'Adequate' },
      { id: 'it-plo5', code: 'PLO 5', name: 'Cloud Computing', coverage: 35, introduced: 1, practiced: 1, assessed: 0, status: 'Gap' },
      { id: 'it-plo6', code: 'PLO 6', name: 'Professional Ethics', coverage: 78, introduced: 2, practiced: 2, assessed: 2, status: 'Adequate' },
    ],
    courseList: [],
  },
  {
    id: 'p5',
    name: 'Psychology, BS',
    partner: 'Purdue Global',
    lms: 'Canvas',
    status: 'Review',
    gaps: 6,
    alignmentScore: 42,
    courses: 12,
    ploCount: 7,
    accreditation: 'APA guidelines-aligned',
    plos: [
      { id: 'ps-plo1', code: 'PLO 1', name: 'Knowledge Base', coverage: 65, introduced: 3, practiced: 2, assessed: 1, status: 'Developing' },
      { id: 'ps-plo2', code: 'PLO 2', name: 'Scientific Inquiry', coverage: 52, introduced: 2, practiced: 1, assessed: 1, status: 'Developing' },
      { id: 'ps-plo3', code: 'PLO 3', name: 'Ethical Responsibility', coverage: 45, introduced: 1, practiced: 1, assessed: 1, status: 'Gap' },
      { id: 'ps-plo4', code: 'PLO 4', name: 'Communication', coverage: 38, introduced: 1, practiced: 1, assessed: 0, status: 'Gap' },
      { id: 'ps-plo5', code: 'PLO 5', name: 'Professional Development', coverage: 28, introduced: 1, practiced: 0, assessed: 0, status: 'Gap' },
      { id: 'ps-plo6', code: 'PLO 6', name: 'Diversity & Sociocultural', coverage: 35, introduced: 1, practiced: 1, assessed: 0, status: 'Gap' },
      { id: 'ps-plo7', code: 'PLO 7', name: 'Applied Psychology', coverage: 30, introduced: 1, practiced: 0, assessed: 0, status: 'Gap' },
    ],
    courseList: [],
  },
];

// ===== AI Mapping suggestions (matching reference) =====
export interface AIMappingSuggestion {
  id: string;
  cloText: string;
  ploCode: string;
  ploText: string;
  confidence: number;
  course: string;
  status: 'pending' | 'accepted' | 'rejected';
}

export const aiMappingSuggestions: AIMappingSuggestion[] = [
  { id: 'ai1', cloText: 'Identify and analyze the roles of major stakeholders in the US healthcare delivery system, including hospitals, insurers, government agencies, and integrated delivery networks.', ploCode: 'PLO 1', ploText: 'Analyze the structure, financing, and governance of the US healthcare delivery system.', confidence: 91, course: 'HADM 101', status: 'pending' },
  { id: 'ai2', cloText: 'Describe reimbursement models including Diagnosis-Related Groups (DRG), capitation, bundled payments, and the transition from fee-for-service to value-based care.', ploCode: 'PLO 3', ploText: 'Apply financial management principles including DRG and capitation reimbursement to healthcare operations.', confidence: 76, course: 'HADM 101', status: 'pending' },
  { id: 'ai3', cloText: 'Examine ethical decision-making frameworks (principlism, utilitarianism, deontology) as applied to patient care scenarios and healthcare administrative contexts.', ploCode: 'PLO 2', ploText: 'Apply ethical frameworks, legal standards, and compliance requirements to healthcare administrative decision-making.', confidence: 88, course: 'HADM 101', status: 'pending' },
  { id: 'ai4', cloText: 'Describe the role of accreditation bodies (TJC, NCQA, AAAHC) in maintaining quality standards and the implications of accreditation status for healthcare organizations.', ploCode: 'PLO 5', ploText: 'Evaluate quality improvement methodologies, patient safety frameworks, and CMS core measures.', confidence: 54, course: 'HADM 101', status: 'pending' },
  { id: 'ai5', cloText: 'Analyze the impact of landmark federal legislation — including the ACA, HIPAA, and Medicare Modernization Act — on healthcare access, insurance coverage, and delivery system reform.', ploCode: 'PLO 7', ploText: 'Interpret the impact of federal and state legislation and regulatory agencies on healthcare access and delivery.', confidence: 83, course: 'HADM 201', status: 'pending' },
  { id: 'ai6', cloText: 'Evaluate the regulatory functions of state health departments, insurance commissioners, and certificate-of-need laws in shaping healthcare markets and provider networks.', ploCode: 'PLO 7', ploText: 'Interpret the impact of federal and state legislation and regulatory agencies on healthcare access and delivery.', confidence: 79, course: 'HADM 201', status: 'pending' },
  { id: 'ai7', cloText: 'Apply transformational and servant leadership frameworks to manage interdisciplinary healthcare teams, resolve conflict, and drive organizational change in complex clinical environments.', ploCode: 'PLO 4', ploText: 'Demonstrate leadership competencies including strategic planning, workforce management, and team effectiveness.', confidence: 92, course: 'HADM 301', status: 'pending' },
  { id: 'ai8', cloText: 'Design quality improvement initiatives using Plan-Do-Study-Act (PDSA) cycles, Lean process improvement, and root cause analysis in a simulated hospital department.', ploCode: 'PLO 5', ploText: 'Evaluate quality improvement methodologies, patient safety frameworks, and CMS core measures.', confidence: 87, course: 'HADM 301', status: 'pending' },
  { id: 'ai9', cloText: 'Implement data analytics workflows using EHR-derived datasets to monitor patient outcomes, operational KPIs, and CMS quality measures including HCAHPS and core measures.', ploCode: 'PLO 6', ploText: 'Utilize health information technology, EHR, and data analytics platforms to support administrative decision-making.', confidence: 85, course: 'HADM 310', status: 'pending' },
  { id: 'ai10', cloText: 'Synthesize ACHE healthcare leadership competencies through an evidence-based capstone project developed with a community health organization or integrated delivery network.', ploCode: 'PLO 1', ploText: 'Analyze the structure, financing, and governance of the US healthcare delivery system.', confidence: 89, course: 'HADM 401', status: 'pending' },
  { id: 'ai11', cloText: 'Develop and present evidence-based strategic recommendations to senior healthcare administrators and boards using professional executive communication standards.', ploCode: 'PLO 4', ploText: 'Demonstrate leadership competencies including strategic planning, workforce management, and team effectiveness.', confidence: 78, course: 'HADM 401', status: 'pending' },
  { id: 'ai12', cloText: 'Apply practicum-based learning to evaluate the implementation and operational impact of state and federal healthcare policy mandates within a supervised administrative setting.', ploCode: 'PLO 7', ploText: 'Interpret the impact of federal and state legislation and regulatory agencies on healthcare access and delivery.', confidence: 82, course: 'HADM 420', status: 'pending' },
];

// ===== Workforce alignment data =====
export interface WorkforceFit {
  competency: string;
  status: 'Strong' | 'Adequate' | 'Developing' | 'Weak';
}

export const workforceFitData: WorkforceFit[] = [
  { competency: 'Strategic Planning & Organizational Management', status: 'Strong' },
  { competency: 'Healthcare Financial Management & Budgeting', status: 'Adequate' },
  { competency: 'Quality Improvement & Patient Safety', status: 'Weak' },
  { competency: 'Regulatory Compliance & Risk Management', status: 'Adequate' },
  { competency: 'Health Information Technology (EHR/HIT)', status: 'Weak' },
  { competency: 'Workforce Management & Team Leadership', status: 'Strong' },
  { competency: 'Patient Experience & Care Coordination', status: 'Adequate' },
  { competency: 'Population Health & Data Analytics', status: 'Developing' },
];

// ===== Legacy data kept for existing pages =====
export const programs = [
  { id: 1, partnerId: 1, name: 'Healthcare Administration, BS', courses: 10, healthScore: 78, status: 'Active' },
  { id: 2, partnerId: 2, name: 'Nursing, BSN', courses: 12, healthScore: 85, status: 'Active' },
  { id: 3, partnerId: 3, name: 'Business Administration, MBA', courses: 14, healthScore: 58, status: 'Review' },
  { id: 4, partnerId: 4, name: 'Information Technology, BS', courses: 10, healthScore: 71, status: 'Active' },
  { id: 5, partnerId: 5, name: 'Psychology, BS', courses: 12, healthScore: 42, status: 'Review' },
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
  icon?: string;
  group: string;
  badge?: number;
}

export const dashboardNavItems: NavItem[] = [
  { label: 'Dashboard', path: '/dashboard', roles: ['atm', 'aps', 'md', 'id'], group: 'OVERVIEW', icon: 'LayoutDashboard' },
  { label: 'Programs', path: '/dashboard/programs', roles: ['atm', 'aps', 'md', 'id'], group: 'PROGRAMS', icon: 'GraduationCap', badge: 5 },
  { label: 'AI Mapping', path: '/dashboard/ai-mapping', roles: ['atm', 'aps'], group: 'PROGRAMS', icon: 'Sparkles', badge: 12 },
  { label: 'Analytics', path: '/dashboard/analytics', roles: ['atm', 'aps', 'md', 'id'], group: 'PROGRAMS', icon: 'BarChart3' },
  { label: 'Audit & Gaps', path: '/dashboard/reports', roles: ['atm', 'aps', 'md', 'id'], group: 'INTELLIGENCE', icon: 'SearchCheck', badge: 3 },
  { label: 'Orchestrations', path: '/dashboard/workflow', roles: ['atm', 'aps'], group: 'INTELLIGENCE', icon: 'Workflow' },
  { label: 'Standards', path: '/dashboard/standards', roles: ['atm', 'id'], group: 'REVIEW', icon: 'BookOpen' },
  { label: 'Ingestion', path: '/dashboard/ingestion', roles: ['atm'], group: 'REVIEW', icon: 'Upload' },
  { label: 'Scenarios', path: '/dashboard/scenarios', roles: ['atm', 'aps'], group: 'REVIEW', icon: 'GitBranch' },
  { label: 'Outputs & Exports', path: '/dashboard/mapping', roles: ['atm', 'aps', 'md'], group: 'REVIEW', icon: 'FileOutput' },
  { label: 'Market Intel', path: '/dashboard/market', roles: ['aps', 'md'], group: 'MARKET', icon: 'TrendingUp' },
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
  { id: 'wc3', soc: '15-1252', occupation: 'Software Developers', competency: 'Apply testing methodologies', category: 'Software Development', mapped: false },
  { id: 'wc4', soc: '15-1212', occupation: 'Information Security Analysts', competency: 'Implement security protocols', category: 'Cybersecurity', mapped: true, mappedTo: 'PLO 6' },
  { id: 'wc5', soc: '15-1212', occupation: 'Information Security Analysts', competency: 'Conduct risk assessments', category: 'Cybersecurity', mapped: false },
  { id: 'wc6', soc: '15-2051', occupation: 'Data Scientists', competency: 'Apply statistical analysis', category: 'Data Science', mapped: true, mappedTo: 'PLO 1' },
  { id: 'wc7', soc: '15-2051', occupation: 'Data Scientists', competency: 'Build predictive models', category: 'Data Science', mapped: false },
  { id: 'wc8', soc: '11-9111', occupation: 'Healthcare Administrators', competency: 'Strategic Planning', category: 'Healthcare', mapped: true, mappedTo: 'PLO 4' },
];
