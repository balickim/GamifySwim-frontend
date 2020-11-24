import React from 'react';
import { BACKEND } from '../../../config';
import moment from 'moment';
import DayNames from './DayNames';
import Week from './Week';
import Day from './Day';
import Events from './Events'

class Calendar extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedMonth: moment().startOf("month"),
      selectedDay: moment().startOf("day"),
      selectedMonthEvents: [],
      showEvents: false
    };
  }

  componentDidMount() {
    this.previous = this.previous.bind(this);
    this.next = this.next.bind(this);
    this.addEvent = this.addEvent.bind(this);
    this.showCalendar = this.showCalendar.bind(this);
    this.goToCurrentMonthView = this.goToCurrentMonthView.bind(this);

    this.initialiseEvents();
  }

  previous = () => {
    const currentMonthView = this.state.selectedMonth;

    this.setState({
      selectedMonth: currentMonthView.subtract(1, "month")
    });

    this.initialiseEvents();
  }

  next = () => {
    const currentMonthView = this.state.selectedMonth;

    this.setState({
      selectedMonth: currentMonthView.add(1, "month")
    });

    this.initialiseEvents();
  }

  select(day) {
    this.setState({
      selectedMonth: day.date,
      selectedDay: day.date.clone(),
      showEvents: true
    });
  }

  goToCurrentMonthView(){
    const currentMonthView = this.state.selectedMonth;
    this.setState({
      selectedMonth: moment()
    });
  }
  
  showCalendar = () => {
    this.setState({
      selectedMonth: this.state.selectedMonth,
      selectedDay: this.state.selectedDay,
      showEvents: false
    });
  }

  renderMonthLabel = () => {
    const currentMonthView = this.state.selectedMonth;
    return (
      <span className="calendar-box month-label">
        {currentMonthView.format("MMMM YYYY")}
      </span>
    );
  }

  renderDayLabel() {
    const currentSelectedDay = this.state.selectedDay;
    return (
      <span className="calendar-box month-label">
        {currentSelectedDay.format("DD MMMM YYYY")}
      </span>
    );
  }
  
  renderTodayLabel = () => {
    const currentSelectedDay = this.state.selectedDay;
    return (
      <span className="calendar-box today-label" onClick={this.goToCurrentMonthView}>
        Today
      </span>
    );
  }
  
  renderWeeks = () => {
    const currentMonthView = this.state.selectedMonth;
    const currentSelectedDay = this.state.selectedDay;
    const monthEvents = this.state.selectedMonthEvents;

    let weeks = [];
    let done = false;
    let previousCurrentNextView = currentMonthView
      .clone()
      .startOf("month")
      .subtract(1, "d")
      .day("Monday");
    let count = 0;
    let monthIndex = previousCurrentNextView.month();

    while (!done) {
      weeks.push(
        <Week
          previousCurrentNextView={previousCurrentNextView.clone()}
          currentMonthView={currentMonthView}
          monthEvents={monthEvents}
          selected={currentSelectedDay}
          select={day => this.select(day)}
        />
      );
      previousCurrentNextView.add(1, "w");
      done = count++ > 2 && monthIndex !== previousCurrentNextView.month();
      monthIndex = previousCurrentNextView.month();
    }
    return weeks;
  }

  handleAdd = () => {
    const monthEvents = this.state.selectedMonthEvents;
    const currentSelectedDate = this.state.selectedDay;

    let newEvents = [];

    var eventTitle = prompt("Please enter a name for your event: ");

    switch (eventTitle) {
      case "":
        alert("Event name cannot be empty.");
        break;
      case null:
        alert("Changed your mind? You can add one later!");
        break;
      default:
        var newEvent = {
          title: eventTitle,
          date: currentSelectedDate,
          dynamic: true
        };

        newEvents.push(newEvent);

        for (var i = 0; i < newEvents.length; i++) {
          monthEvents.push(newEvents[i]);
        }

        this.setState({
          selectedMonthEvents: monthEvents
        });
        break;
    }
  }

  addEvent = () => {
    const currentSelectedDate = this.state.selectedDay;
    let isAfterDay = moment().startOf("day").subtract(1, "d");

    if (currentSelectedDate.isAfter(isAfterDay)) {
      this.handleAdd();
    } else {
      if (confirm("Are you sure you want to add an event in the past?")) {
        this.handleAdd();
      } else {
      } // end confirm past
    } //end is in the past
  }

  removeEvent(i) {
    const monthEvents = this.state.selectedMonthEvents.slice();
    const currentSelectedDate = this.state.selectedDay;

    if (confirm("Are you sure you want to remove this event?")) {
      let index = i;

      if (index != -1) {
        monthEvents.splice(index, 1);
      } else {
        alert("No events to remove on this day!");
      }

      this.setState({
        selectedMonthEvents: monthEvents
      });
    }
  }

  initialiseEvents = () => {
    const monthEvents = this.state.selectedMonthEvents;

    let allEvents = [];

    let year = JSON.stringify(this.state.selectedMonth._d).substr(1,4);
    let month = this.state.selectedMonth._d.getMonth()+1;

        const requestOptions = {
          method: 'POST',
          body: JSON.stringify({month, year}),
          headers: { 'Content-Type': 'application/json' },
          credentials: 'include'
      };
      fetch(`${BACKEND.ADDRESS}/user/trainingsmonth`, requestOptions)
          .then(response => response.json())
          .then(data => {
              for (var i = 0; i < data.trainings.length; i++) {
                allEvents.push({title: data.trainings[i].title,
                              date: moment(data.trainings[i].trainingdatestart),
                              dynamic: false});
              }
              this.setState({
                      selectedMonthEvents: allEvents
                    });
              })
  }

  render() {
    const currentMonthView = this.state.selectedMonth;
    const currentSelectedDay = this.state.selectedDay;
    const showEvents = this.state.showEvents;

    if (showEvents) {
      return (
        <div className="calendar-rectangle">
          <div className="calendar-content">
            <section className="main-calendar">
              <header className="calendar-header">
                <div className="calendar-row title-header">
                  {this.renderDayLabel()}
                </div>
                <div className="calendar-row button-container">
                  <i
                    className="calendar-box arrow fa fa-angle-left"
                    onClick={this.showCalendar}
                  />
                  <i
                    className="calendar-box event-button fa fa-plus-square"
                    onClick={this.addEvent}
                  />
                </div>
              </header>
              <Events
                selectedMonth={this.state.selectedMonth}
                selectedDay={this.state.selectedDay}
                selectedMonthEvents={this.state.selectedMonthEvents}
                removeEvent={i => this.removeEvent(i)}
              />
            </section>
          </div>
        </div>
      );
    } else {
      return (
        <div className="calendar-rectangle">
          <div className="calendar-content">
            <section className="main-calendar">
              <header className="calendar-header">
                <div className="calendar-row title-header">
                  <i
                    className="calendar-box arrow fa fa-angle-left"
                    onClick={this.previous}
                  />
                  <div className="calendar-box header-text">
                  {this.renderTodayLabel()}
                  {this.renderMonthLabel()}
                  </div>
                  <i className="calendar-box arrow fa fa-angle-right" onClick={this.next} />
                </div>
                <DayNames />
              </header>
              <div className="days-container">
                {this.renderWeeks()}
              </div>
            </section>
          </div>
        </div>
      );
    }
  }
}

export default Calendar