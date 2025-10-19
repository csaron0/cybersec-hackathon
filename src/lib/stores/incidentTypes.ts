// Incident Types data store and helper functions
// This ensures consistency across all pages that use incident type data

export type Severity = 'Critical' | 'High' | 'Medium' | 'Low';
export type Urgency = 'Critical' | 'High' | 'Medium' | 'Low';
export type AlertLevel = 'immediate' | 'urgent' | 'standard';
export type FieldType = 'text' | 'textarea' | 'select' | 'radio' | 'checkbox' | 'date' | 'datetime-local';

export interface FormField {
	id: string;
	title: string;
	description: string;
	type: FieldType;
	required: boolean;
	options?: string[];
}

export interface PersonnelAssignment {
	id: string;
	name: string;
	role: string;
	department: string;
	email: string;
	phone: string;
	alertLevel: AlertLevel;
}

export interface IncidentType {
	id: string;
	name: string;
	title: string; // For main page display
	description: string;
	severity: Severity;
	urgency: Urgency; // For main page compatibility
	urgencyClass: string; // For main page badge styling
	icon: string; // SVG path for main page
	iconEmoji: string; // Emoji for incident types page
	color: string;
	formFields: FormField[];
	draftTemplate: string;
	personnel: PersonnelAssignment[];
	autoAlerts: boolean;
	slaHours: number;
	created: Date;
	lastModified: Date;
}

// Centralized incident types data
export const incidentTypes: IncidentType[] = [
	{
		id: 'ransomware',
		name: 'Ransomware Attack',
		title: 'Ransomware Attack',
		description: 'Report incidents involving file encryption, ransom demands, or suspected ransomware activity.',
		severity: 'Critical',
		urgency: 'Critical',
		urgencyClass: 'badge-error',
		icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z',
		iconEmoji: '🔒',
		color: 'error',
		formFields: [
			{
				id: 'discovery_method',
				title: 'How was the ransomware discovered?',
				description: 'Describe how you first became aware of the attack',
				type: 'select',
				required: true,
				options: [
					'User reported encrypted files',
					'Antivirus alert',
					'System monitoring',
					'Ransom note'
				]
			},
			{
				id: 'affected_systems',
				title: 'Which systems are affected?',
				description: 'List all compromised systems and devices',
				type: 'textarea',
				required: true
			}
		],
		draftTemplate: `# Ransomware Incident Response

## Executive Summary
[Brief overview of the ransomware attack]

## Incident Details
- **Discovery Time**: [When was it discovered]
- **Affected Systems**: [List of impacted systems]
- **Ransom Demand**: [Amount and payment method]

## Immediate Actions
- [ ] Isolate affected systems
- [ ] Preserve evidence
- [ ] Notify stakeholders
- [ ] Assess backup integrity

## Communication Plan
[Stakeholder notification strategy]`,
		personnel: [
			{
				id: '1',
				name: 'Mike Johnson',
				role: 'Security Team Lead',
				department: 'IT Security',
				email: 'mike.johnson@bobolink.com',
				phone: '+1-555-0101',
				alertLevel: 'immediate'
			},
			{
				id: '2',
				name: 'Sarah Wilson',
				role: 'IT Director',
				department: 'Information Technology',
				email: 'sarah.wilson@bobolink.com',
				phone: '+1-555-0102',
				alertLevel: 'immediate'
			}
		],
		autoAlerts: true,
		slaHours: 2,
		created: new Date('2024-10-15'),
		lastModified: new Date('2024-10-17')
	},
	{
		id: 'phishing',
		name: 'Phishing Attack',
		title: 'Phishing Attack',
		description: 'Report suspicious emails, fake websites, or social engineering attempts targeting credentials.',
		severity: 'High',
		urgency: 'High',
		urgencyClass: 'badge-warning',
		icon: 'M3 8l7.89 4.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z',
		iconEmoji: '🎣',
		color: 'warning',
		formFields: [
			{
				id: 'email_source',
				title: 'Phishing email source',
				description: 'Where did the phishing attempt originate?',
				type: 'select',
				required: true,
				options: [
					'External email',
					'Internal email (compromised account)',
					'Text message',
					'Phone call',
					'Website'
				]
			},
			{
				id: 'targets',
				title: 'Who was targeted?',
				description: 'List affected users or departments',
				type: 'textarea',
				required: true
			}
		],
		draftTemplate: `# Phishing Incident Response

## Incident Overview
[Description of the phishing attempt]

## Analysis
- **Attack Vector**: [Email, SMS, phone, website]
- **Targeted Users**: [Who was targeted]
- **Information Sought**: [What data was the attacker after]

## Response Actions
- [ ] Block malicious domains/IPs
- [ ] Reset compromised credentials
- [ ] User awareness notification
- [ ] Email security review`,
		personnel: [
			{
				id: '3',
				name: 'Security Team',
				role: 'Incident Response',
				department: 'IT Security',
				email: 'security@bobolink.com',
				phone: '+1-555-0103',
				alertLevel: 'urgent'
			}
		],
		autoAlerts: true,
		slaHours: 4,
		created: new Date('2024-10-10'),
		lastModified: new Date('2024-10-16')
	},
	{
		id: 'malware',
		name: 'Malware Infection',
		title: 'Malware Infection',
		description: 'Report suspected malware, viruses, trojans, or any malicious software on systems.',
		severity: 'High',
		urgency: 'High',
		urgencyClass: 'badge-warning',
		icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
		iconEmoji: '🦠',
		color: 'warning',
		formFields: [
			{
				id: 'malware_type',
				title: 'Type of malware detected',
				description: 'What kind of malicious software was found?',
				type: 'select',
				required: true,
				options: [
					'Virus',
					'Trojan',
					'Worm',
					'Spyware',
					'Adware',
					'Unknown'
				]
			}
		],
		draftTemplate: `# Malware Incident Response

## Malware Analysis
- **Type**: [Virus, trojan, worm, etc.]
- **Affected Systems**: [List of infected systems]
- **Detection Method**: [How was it discovered]

## Containment
- [ ] Isolate infected systems
- [ ] Run full system scans
- [ ] Update antivirus signatures
- [ ] Network traffic analysis`,
		personnel: [],
		autoAlerts: true,
		slaHours: 6,
		created: new Date('2024-10-12'),
		lastModified: new Date('2024-10-15')
	},
	{
		id: 'data-breach',
		name: 'Data Breach',
		title: 'Data Breach',
		description: 'Report unauthorized access, data theft, or exposure of sensitive information.',
		severity: 'Critical',
		urgency: 'Critical',
		urgencyClass: 'badge-error',
		icon: 'M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z',
		iconEmoji: '🛡️',
		color: 'error',
		formFields: [
			{
				id: 'breach_type',
				title: 'Type of data breach',
				description: 'What type of data was potentially compromised',
				type: 'checkbox',
				required: true,
				options: [
					'Customer data',
					'Employee records',
					'Financial data',
					'Healthcare records',
					'Other'
				]
			}
		],
		draftTemplate: `# Data Breach Incident Response

## Incident Overview
[Description of the breach]

## Data Assessment
- **Type of Data**: [What data was accessed]
- **Number of Records**: [Estimated volume]
- **Data Sensitivity**: [Classification level]

## Legal and Compliance
- [ ] Notify legal team
- [ ] Review regulatory requirements
- [ ] Prepare breach notifications`,
		personnel: [
			{
				id: '4',
				name: 'Legal Team',
				role: 'Legal Counsel',
				department: 'Legal',
				email: 'legal@bobolink.com',
				phone: '+1-555-0200',
				alertLevel: 'immediate'
			}
		],
		autoAlerts: true,
		slaHours: 1,
		created: new Date('2024-10-10'),
		lastModified: new Date('2024-10-16')
	},
	{
		id: 'ddos',
		name: 'DDoS Attack',
		title: 'DDoS Attack',
		description: 'Report distributed denial of service attacks or unusual traffic patterns affecting services.',
		severity: 'High',
		urgency: 'High',
		urgencyClass: 'badge-warning',
		icon: 'M13 10V3L4 14h7v7l9-11h-7z',
		iconEmoji: '⚡',
		color: 'warning',
		formFields: [
			{
				id: 'attack_vector',
				title: 'Attack vector',
				description: 'How is the DDoS attack being carried out?',
				type: 'select',
				required: true,
				options: [
					'Network layer (volumetric)',
					'Application layer',
					'Protocol attacks',
					'Mixed attack'
				]
			}
		],
		draftTemplate: `# DDoS Attack Response

## Attack Analysis
- **Attack Type**: [Volumetric, application, protocol]
- **Target Services**: [Which services are affected]
- **Traffic Volume**: [Scale of the attack]

## Mitigation Steps
- [ ] Activate DDoS protection
- [ ] Traffic filtering implementation
- [ ] ISP coordination
- [ ] Service prioritization`,
		personnel: [],
		autoAlerts: true,
		slaHours: 2,
		created: new Date('2024-10-14'),
		lastModified: new Date('2024-10-17')
	},
	{
		id: 'insider-threat',
		name: 'Insider Threat',
		title: 'Insider Threat',
		description: 'Report suspicious activities by employees or other authorized users within the organization.',
		severity: 'Medium',
		urgency: 'Medium',
		urgencyClass: 'badge-info',
		icon: 'M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z',
		iconEmoji: '👤',
		color: 'info',
		formFields: [
			{
				id: 'insider_type',
				title: 'Type of insider threat',
				description: 'What kind of suspicious activity was observed?',
				type: 'select',
				required: true,
				options: [
					'Data exfiltration',
					'Unauthorized access',
					'Policy violation',
					'Suspicious behavior'
				]
			}
		],
		draftTemplate: `# Insider Threat Investigation

## Threat Assessment
- **Individual**: [Name/ID if known]
- **Suspicious Activity**: [What was observed]
- **Data at Risk**: [What information might be compromised]

## Investigation Plan
- [ ] Preserve digital evidence
- [ ] Interview witnesses
- [ ] Access log review
- [ ] HR coordination`,
		personnel: [],
		autoAlerts: false,
		slaHours: 24,
		created: new Date('2024-10-11'),
		lastModified: new Date('2024-10-15')
	},
	{
		id: 'system-compromise',
		name: 'System Compromise',
		title: 'System Compromise',
		description: 'Report unauthorized access to systems, servers, or network infrastructure.',
		severity: 'Critical',
		urgency: 'Critical',
		urgencyClass: 'badge-error',
		icon: 'M9 12l2 2 4-4m5.618-4.016A11.955 11.955 0 0112 2.944a11.955 11.955 0 01-8.618 3.04A12.02 12.02 0 003 9c0 5.591 3.824 10.29 9 11.622 5.176-1.332 9-6.03 9-11.622 0-1.042-.133-2.052-.382-3.016z',
		iconEmoji: '🖥️',
		color: 'error',
		formFields: [
			{
				id: 'compromise_type',
				title: 'Type of system compromise',
				description: 'How was the system compromised?',
				type: 'select',
				required: true,
				options: [
					'Remote access breach',
					'Privilege escalation',
					'Backdoor installation',
					'Unknown method'
				]
			}
		],
		draftTemplate: `# System Compromise Response

## Compromise Analysis
- **Affected Systems**: [Which systems were compromised]
- **Attack Method**: [How the compromise occurred]
- **Data at Risk**: [What information is potentially exposed]

## Recovery Actions
- [ ] Isolate compromised systems
- [ ] Forensic imaging
- [ ] Credential reset
- [ ] Security patch review`,
		personnel: [],
		autoAlerts: true,
		slaHours: 1,
		created: new Date('2024-10-13'),
		lastModified: new Date('2024-10-16')
	},
	{
		id: 'suspicious-activity',
		name: 'Suspicious Activity',
		title: 'Suspicious Activity',
		description: 'Report any other suspicious behavior, unusual network activity, or potential security concerns.',
		severity: 'Medium',
		urgency: 'Medium',
		urgencyClass: 'badge-info',
		icon: 'M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L4.082 16.5c-.77.833.192 2.5 1.732 2.5z',
		iconEmoji: '🔍',
		color: 'info',
		formFields: [
			{
				id: 'activity_type',
				title: 'Type of suspicious activity',
				description: 'What kind of unusual activity was observed?',
				type: 'textarea',
				required: true
			}
		],
		draftTemplate: `# Suspicious Activity Investigation

## Activity Description
[Detailed description of the suspicious behavior]

## Initial Assessment
- **Risk Level**: [Low/Medium/High]
- **Potential Impact**: [What could be affected]
- **Evidence**: [What evidence exists]

## Next Steps
- [ ] Gather additional evidence
- [ ] Determine if escalation needed
- [ ] Monitor for continued activity`,
		personnel: [],
		autoAlerts: false,
		slaHours: 12,
		created: new Date('2024-10-09'),
		lastModified: new Date('2024-10-14')
	}
];

// Helper functions
export function getIncidentTypeById(id: string): IncidentType | undefined {
	return incidentTypes.find(type => type.id === id);
}

export function getAllIncidentTypes(): IncidentType[] {
	return incidentTypes;
}

export function getIncidentTypesBySevertiy(severity: Severity): IncidentType[] {
	return incidentTypes.filter(type => type.severity === severity);
}

export function getSeverityClass(severity: string): string {
	switch (severity) {
		case 'Critical':
			return 'badge-error';
		case 'High':
			return 'badge-warning';
		case 'Medium':
			return 'badge-info';
		case 'Low':
			return 'badge-success';
		default:
			return 'badge-neutral';
	}
}

export function addIncidentType(incidentType: Omit<IncidentType, 'id' | 'created' | 'lastModified'>): IncidentType {
	const newType: IncidentType = {
		...incidentType,
		id: Date.now().toString(),
		created: new Date(),
		lastModified: new Date()
	};
	incidentTypes.push(newType);
	return newType;
}

export function updateIncidentType(id: string, updates: Partial<IncidentType>): IncidentType | undefined {
	const index = incidentTypes.findIndex(type => type.id === id);
	if (index === -1) return undefined;
	
	incidentTypes[index] = {
		...incidentTypes[index],
		...updates,
		lastModified: new Date()
	};
	return incidentTypes[index];
}

export function deleteIncidentType(id: string): boolean {
	const index = incidentTypes.findIndex(type => type.id === id);
	if (index === -1) return false;
	
	incidentTypes.splice(index, 1);
	return true;
}