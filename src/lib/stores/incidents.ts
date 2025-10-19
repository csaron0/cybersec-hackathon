// Incident data store and helper functions
// This ensures consistency across all pages that use incident data

export interface Incident {
    id: string;
    title: string;
    statusIndex: number;
    priority: 'Low' | 'Medium' | 'High' | 'Critical';
    assignee: string;
    created: Date;
    type: string;
    description: string;
}

// Centralized incident data
export const incidents: Record<string, Incident> = {
    '1': {
        id: '1',
        title: 'Port of Rotterdam Malware Disruption',
        statusIndex: 1,
        priority: 'Critical',
        assignee: 'Maritime Security Team',
        created: new Date('2024-10-19T06:45:00'),
        type: 'malware',
        description:
            'Wiper malware affecting critical port logistics systems. Container operations disrupted, multilingual stakeholder communications coordinated.'
    },
    '2': {
        id: '2',
        title: 'Phishing Campaign - HR Department',
        statusIndex: 3, // Communications Drafting
        priority: 'High',
        assignee: 'Jane Smith',
        created: new Date('2024-10-17T11:15:00'),
        type: 'phishing',
        description:
            'Employees reported suspicious emails claiming to be from HR with malicious attachments.'
    },
    '3': {
        id: '3',
        title: 'Data Breach - Customer Database',
        statusIndex: 2, // Legal & Regulatory Assessment
        priority: 'Critical',
        assignee: 'Security Team Beta',
        created: new Date('2024-10-17T14:20:00'),
        type: 'data-breach',
        description: 'Unauthorized access detected to customer database. Investigation ongoing.'
    },
    '4': {
        id: '4',
        title: 'DDoS Attack - Web Services',
        statusIndex: 4, // Management Approval
        priority: 'High',
        assignee: 'Network Team',
        created: new Date('2024-10-18T07:45:00'),
        type: 'ddos',
        description: 'Large-scale distributed denial of service attack targeting our web services.'
    },
    '5': {
        id: '5',
        title: 'Insider Threat - Suspicious Activity',
        statusIndex: 7, // Post-Incident Review & Closure
        priority: 'Medium',
        assignee: 'Security Team Alpha',
        created: new Date('2024-10-18T10:20:00'),
        type: 'insider-threat',
        description: 'Investigation completed. No malicious activity found.'
    }
};

// Workflow stages (copied from IncidentWorkflow component for consistency)
export const workflowStages = [
    {
        status: 'Incident Opened',
        description: 'Initial incident report received and logged',
        color: 'error',
        icon: `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.268 18.5c-.77.833.192 2.5z"></path></svg>`,
        allowedRoles: ['Security Team', 'Operations', 'IT Support']
    },
    {
        status: 'Initial Triage & Technical Review',
        description: 'Technical assessment and impact analysis',
        color: 'warning',
        icon: `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2m-6 9l2 2 4-4"></path></svg>`,
        allowedRoles: ['Security Team', 'Technical Lead', 'Incident Manager']
    },
    {
        status: 'Legal & Regulatory Assessment',
        description: 'Legal review and regulatory compliance check',
        color: 'secondary',
        icon: `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16l3-1m-3 1l-3-1"></path></svg>`,
        allowedRoles: ['Legal Team', 'Compliance', 'Risk Management']
    },
    {
        status: 'Communications Drafting',
        description: 'Draft external communications and press materials',
        color: 'info',
        icon: `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path></svg>`,
        allowedRoles: ['PR Team', 'Communications', 'Marketing']
    },
    {
        status: 'Management Approval',
        description: 'Executive review and go/no-go decision',
        color: 'accent',
        icon: `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`,
        allowedRoles: ['C-Suite', 'Executive Team', 'Senior Management']
    },
    {
        status: 'External Notification & Publication',
        description: 'Public disclosure and stakeholder notification',
        color: 'primary',
        icon: `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11.049 2.927c.3-.921 1.603-.921 1.902 0l1.519 4.674a1 1 0 00.95.69h4.915c.969 0 1.371 1.24.588 1.81l-3.976 2.888a1 1 0 00-.363 1.118l1.518 4.674c.3.922-.755 1.688-1.538 1.118l-3.976-2.888a1 1 0 00-1.176 0l-3.976 2.888c-.783.57-1.838-.197-1.538-1.118l1.518-4.674a1 1 0 00-.363-1.118l-3.976-2.888c-.784-.57-.38-1.81.588-1.81h4.914a1 1 0 00.951-.69l1.519-4.674z"></path></svg>`,
        allowedRoles: ['PR Team', 'Communications', 'Executive Team']
    },
    {
        status: 'Ongoing Updates & Monitoring',
        description: 'Monitor situation and provide status updates',
        color: 'warning',
        icon: `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"></path><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z"></path></svg>`,
        allowedRoles: ['Incident Manager', 'Communications', 'Operations']
    },
    {
        status: 'Post-Incident Review & Closure',
        description: 'Final review, lessons learned, and case closure',
        color: 'success',
        icon: `<svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24"><path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z"></path></svg>`,
        allowedRoles: ['Incident Manager', 'Security Team', 'Quality Assurance']
    }
];

// Helper functions
export function getIncidentById(id: string): Incident | undefined {
    return incidents[id];
}

export function getAllIncidents(): Incident[] {
    return Object.values(incidents);
}

export function getActiveIncidents(): Incident[] {
    // Return incidents that are not in the final closure stage
    return Object.values(incidents).filter(incident => incident.statusIndex < 7);
}

export function getStatusName(statusIndex: number): string {
    return workflowStages[statusIndex]?.status || 'Unknown Status';
}

export function getStatusDescription(statusIndex: number): string {
    return workflowStages[statusIndex]?.description || 'Unknown Description';
}

export function getStatusColor(statusIndex: number): string {
    return workflowStages[statusIndex]?.color || 'neutral';
}

export function getWorkflowStages() {
    return workflowStages;
}

// Helper to get incident with computed status name
export function getIncidentWithStatus(id: string): (Incident & { statusName: string }) | undefined {
    const incident = getIncidentById(id);
    if (!incident) return undefined;

    return {
        ...incident,
        statusName: getStatusName(incident.statusIndex)
    };
}

// Helper to get all incidents with computed status names
export function getAllIncidentsWithStatus(): (Incident & { statusName: string })[] {
    return getAllIncidents().map(incident => ({
        ...incident,
        statusName: getStatusName(incident.statusIndex)
    }));
}

// Helper to get active incidents with computed status names
export function getActiveIncidentsWithStatus(): (Incident & { statusName: string })[] {
    return getActiveIncidents().map(incident => ({
        ...incident,
        statusName: getStatusName(incident.statusIndex)
    }));
}