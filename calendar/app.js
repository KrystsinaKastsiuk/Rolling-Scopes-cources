let { DayView, DayViewModel, TimeView, TimeViewModel, TaskView } = require('../calendar/');


window.addEventListener('load', () => {
    document.body.appendChild(DayView(new DayViewModel()));
    TimeView(new TimeViewModel());
    
	debugger;
	
	TaskView();

})