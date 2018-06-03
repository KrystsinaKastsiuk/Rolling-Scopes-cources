import DayView from './day-view';

export default function CalendarView(context) {
  let calendar = createCalendar(),
  days = $(calendar).find('.days'),
  ds= 1;

  context.days.forEach(addDay);

  function createCalendar() {
    return $(`
      <div class="calendar">
        <div class="days"></div>
      </div>
    `)[0];
  }

  function addDay(day) {
    days.append(DayView(day));
  }

  return calendar;
}