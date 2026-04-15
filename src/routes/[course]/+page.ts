import { error } from '@sveltejs/kit';
import { getCourseStatistic } from 'liu-tentor-package';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
	const course = params.course;
	if (!course) {
		error(404, 'Course not found');
	}
	try {
		const courseStats = await getCourseStatistic(course);
		if (!courseStats) {
			error(404, 'Course not found');
		}
		return { courseStats };
	} catch (e) {
		error(500, 'Failed to load course');
	}
};
