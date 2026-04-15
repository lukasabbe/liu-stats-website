import { getCourseStatistic } from 'liu-tentor-package';
import type { PageLoad } from './$types';

export const load: PageLoad = async ({ params }) => {
	const course = params.course;
	const courseStats = await getCourseStatistic(course);
	return { courseStats };
};
