require('../styles/time.css');
import Time from '../models/time';

export default function TimeViewModel() {
    this.times = [
        new Time('10:00', ''),
        new Time('11:00', ''),
        new Time('12:00', ''),
        new Time('13:00', ''),
        new Time('14:00', ''),
        new Time('15:00', ''),
        new Time('16:00', ''),
        new Time('17:00', ''),
        new Time('18:00', ''),
        new Time('19:00', ''),
        new Time('20:00', '')
    ];
}