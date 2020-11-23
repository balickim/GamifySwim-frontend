import React from 'react';

class DayNames extends React.Component {
  render() {
    return (
      <div className="calendar-row days-header">
        <span className="calendar-box day-name">Pon</span>
        <span className="calendar-box day-name">Wt</span>
        <span className="calendar-box day-name">Śr</span>
        <span className="calendar-box day-name">Czw</span>
        <span className="calendar-box day-name">Pią</span>
        <span className="calendar-box day-name">Sob</span>
        <span className="calendar-box day-name">Nie</span>
      </div>
    );
  }
}

export default DayNames;