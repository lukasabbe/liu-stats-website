import { error } from '@sveltejs/kit';
import { getCourseStatistic } from 'liu-tentor-package';
import type { PageLoad } from './$types';

type EvaluateQuestion = {
	title: string;
	avgValue: number;
};

type EvaluateReport = {
	title: string;
	date: string;
	courseCode: string;
	year: string;
	semester: string;
	questions: EvaluateQuestion[];
};

export const load: PageLoad = async ({ params, fetch }) => {
	const course = params.course;
	if (!course) {
		error(404, 'Course not found');
	}
	try {
		const courseStats = await getCourseStatistic(course);
		if (!courseStats) {
			error(404, 'Course not found');
		}

		let evaluationReports: EvaluateReport[] = [];
		try {
			const res = await fetch(`https://liutentor.lukasabbe.com/api/evaluate/${course}`);
			if (res.ok) {
				evaluationReports = await res.json() as EvaluateReport[];
			}
		} catch {
			// evaluation data is optional
		}

		return { courseStats, evaluationReports };
	} catch (e) {
		error(500, 'Failed to load course');
	}
};
