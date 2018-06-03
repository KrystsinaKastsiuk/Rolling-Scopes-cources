export default function TimeView({time, task}) {
	return $(`
		<tr class="time">
			<td class="hour">${time}</td>
			<td class="task">${task}</td>
		</tr>
	`);
}