export default function DayView({name}) {
	return $(`
		<div class="day"><span>${name}</span><table class="times"></table></div>
	`);
}
