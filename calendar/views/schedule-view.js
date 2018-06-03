import TimeView from './time-view';

export default function ScheduleView(context) {
	let times = $('body').find('.times');
	
	context.times.forEach(addTime);

	function addTime(time, task) {
		times.append(TimeView(time, task));
	}
}