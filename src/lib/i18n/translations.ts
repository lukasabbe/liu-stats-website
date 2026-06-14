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
		notAffiliated: 'Not affiliated with Linköping University',
		viewReports: 'View Evaliuate Scores',
		viewStats: 'View Exam Stats',
		noReports: 'No Evaliuate scores available for this course.',
		showData: 'Show data',
		closeData: 'Close data',
		date: 'Date',
		average: 'Average',
		evalBanner:
			'Course Evaliuate scores are now available! Search for a course and click "View Evaliuate Scores" to see trends over time.',
		evalBannerTitle: 'New'
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
		notAffiliated: 'Hemsidan har ingen koppling till Linköpings Universitet.',
		viewReports: 'Visa Evaliuatebetyg',
		viewStats: 'Visa tentastatistik',
		noReports: 'Inga Evaliuatebetyg tillgängliga för denna kurs.',
		showData: 'Visa data',
		closeData: 'Stäng data',
		date: 'Datum',
		average: 'Medelvärde',
		evalBanner:
			'Evaliuatebetyg finns nu tillgängliga! Sök efter en kurs och klicka på "Visa Evaliuatebetyg" för att se trendgrafer',
		evalBannerTitle: 'Nyhet'
	}
} as const;

export type Locale = keyof typeof translations;
export type TranslationKey = keyof typeof translations.en;
