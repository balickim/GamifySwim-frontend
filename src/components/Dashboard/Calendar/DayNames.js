import React from 'react';

class DayNames extends React.Component {
  render() {
    return (
      <div className="row days-header">
        <span className="calendarBox day-name">Pon</span>
        <span className="calendarBox day-name">Wt</span>
        <span className="calendarBox day-name">Śr</span>
        <span className="calendarBox day-name">Czw</span>
        <span className="calendarBox day-name">Pią</span>
        <span className="calendarBox day-name">Sob</span>
        <span className="calendarBox day-name">Nie</span>
      </div>
    );
  }
}

export default DayNames;