require('../styles/calendar.css');
import Day from '../models/day';

export default function CalendarViewModel() {
    this.days = [
        new Day('MONDAY, 17 Nov'),
        new Day('TUESDAY, 18 Nov'),
        new Day('WEDNESDAY, 19 Nov'),
        new Day('THURSDAY, 20 Nov'),
        new Day('FRIDAY, 21 Nov'),
        new Day('SATURDAY, 22 Nov'),
        new Day('SUNDAY, 23 Nov'),
    ];
}