export const translations = {
	en: {
		welcome: 'Welcome to LIU Exam Stats',
		searchPrompt: 'Search for a course to view exam statistics.',
		searchCourse: 'Search a course...',
		course: 'Course',
		courseWebsite: 'Course Website',
		back: 'Back',
		next: 'Next',
		allModules: 'All modules',
		totalStudents: 'Total Students',
		passRate: 'Pass Rate',
		gradeDistribution: 'Grade Distribution',
		github: 'GitHub',
		myWebsite: 'My Website',
		loading: 'Loading...',
		notFound: 'Course not found',
		modules: 'modules',
		notAffiliated: 'Not affiliated with Linköping University'
	},
	sv: {
		welcome: 'Välkommen till LIU tentastatistik',
		searchPrompt: 'Sök efter en kurs för att se tentastatistik.',
		searchCourse: 'Sök kurs...',
		course: 'Kurs',
		courseWebsite: 'Kurswebbplats',
		back: 'Tillbaka',
		next: 'Nästa',
		allModules: 'Alla moment',
		totalStudents: 'Totalt antal studenter',
		passRate: 'Andel godkända',
		gradeDistribution: 'Betygsfördelning',
		github: 'GitHub',
		myWebsite: 'Min webbplats',
		loading: 'Laddar...',
		notFound: 'Kursen hittades inte',
		modules: 'moduler',
		notAffiliated: 'Inte ansluten till Linköpings universitet'
	}
} as const;

export type Locale = keyof typeof translations;
export type TranslationKey = keyof typeof translations.en;
