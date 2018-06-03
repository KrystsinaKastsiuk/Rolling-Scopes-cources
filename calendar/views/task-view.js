import TaskView from '../viewmodels/task-viewmodel.js';

export default function addTask() {
	for (var i = 0; i < TaskView.length; i++) {
		$(`span:contains(${TaskView[i].day}) + table  td:contains(${TaskView[i].time}) + td` ).text(`${TaskView[i].task}`);
	};
}