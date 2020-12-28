import React, { useState, useEffect } from 'react';
import { BACKEND } from '../../../config';
import dayjs from 'dayjs';
import DayNames from './DayNames';
import Week from './Week';
import Day from './Day';
import Events from './Events'
import AdvancedFormat from 'dayjs/plugin/advancedFormat';

dayjs.extend(AdvancedFormat);

function Calendar(props) {
  const [selectedMonth,setSelectedMonth] = useState(dayjs().startOf("month"));
  const [selectedDay,setSelectedDay] = useState(dayjs().startOf("day"));
  const [selectedMonthEvents,setSelectedMonthEvents] = useState([]);
  const [showEvents,setShowEvents] = useState(false);

  useEffect(()=>{
    initialiseEvents();
  },[]) 

  const previous = () => {
    const currentMonthView = selectedMonth;

    setSelectedMonth(currentMonthView.subtract(1, "month"));

    initialiseEvents();
  }

  const next = () => {
    const currentMonthView = selectedMonth;

    setSelectedMonth(currentMonthView.add(1, "month"));

    initialiseEvents();
  }

  const select = (day) => {
    setSelectedMonth(day.date);
    setSelectedDay(day.date.clone());
    setShowEvents(true);
  }

  const goToCurrentMonthView = () => {
    const currentMonthView = selectedMonth;
    setSelectedMonth(dayjs());
  }
  
  const showCalendar = () => {
    setSelectedMonth(selectedMonth);
    setSelectedDay(selectedDay);
    setShowEvents(false);
  }

  const renderMonthLabel = () => {
    const currentMonthView = selectedMonth;
    return (
      <span className="calendar-box month-label">
        {currentMonthView.format("MMMM YYYY")}
      </span>
    );
  }

  const renderDayLabel = () => {
    const currentSelectedDay = selectedDay;
    return (
      <span className="calendar-box month-label">
        {currentSelectedDay.format("DD MMMM YYYY")}
      </span>
    );
  }
  
  const renderTodayLabel = () => {
    const currentSelectedDay = selectedDay;
    return (
      <span className="calendar-box today-label" onClick={goToCurrentMonthView}>
        Today
      </span>
    );
  }
  
  const renderWeeks = () => {
    const currentMonthView = selectedMonth;
    const currentSelectedDay = selectedDay;
    const monthEvents = selectedMonthEvents;

    console.log('%cCalendar.js line:87 currentMonthView', 'color: #007acc;', currentMonthView);

    let weeks = [];
    let done = false;
    let previousCurrentNextView = currentMonthView
      .clone()
      .startOf("month")
      .subtract(1, "day")
      .day(1);
    console.log('%cCalendar.js line:97 previousCurrentNextView', 'color: #007acc;', previousCurrentNextView);
    let count = 0;
    let monthIndex = previousCurrentNextView.month();
    console.log('%cCalendar.js line:95 monthIndex', 'color: #007acc;', monthIndex);
    while (!done) {
      weeks.push(
        <Week
          previousCurrentNextView={previousCurrentNextView.clone()}
          currentMonthView={currentMonthView}
          monthEvents={monthEvents}
          selected={currentSelectedDay}
          select={day => select(day)}
        />
      );
      previousCurrentNextView.add(1, "week");
      done = count++ > 2 && monthIndex !== previousCurrentNextView.month();
      monthIndex = previousCurrentNextView.month();
    }
    return weeks;
  }

  const handleAdd = () => {
    const monthEvents = selectedMonthEvents;
    const currentSelectedDate = selectedDay;

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
        setSelectedMonthEvents(monthEvents);
        break;
    }
  }

  const addEvent = () => {
    const currentSelectedDate = selectedDay;
    let isAfterDay = dayjs().startOf("day").subtract(1, "day");

    if (currentSelectedDate.isAfter(isAfterDay)) {
      handleAdd();
    } else {
      if (confirm("Are you sure you want to add an event in the past?")) {
        handleAdd();
      } else {
      } // end confirm past
    } //end is in the past
  }

  const removeEvent = (i) => {
    const monthEvents = selectedMonthEvents.slice();
    const currentSelectedDate = selectedDay;

    if (confirm("Are you sure you want to remove this event?")) {
      let index = i;

      if (index != -1) {
        monthEvents.splice(index, 1);
      } else {
        alert("No events to remove on this day!");
      }
      setSelectedMonthEvents(monthEvents);
    }
  }

  const initialiseEvents = () => {
    const monthEvents = selectedMonthEvents;

    let allEvents = [];

    let year = JSON.stringify(selectedMonth.$d).substr(1,4);
    let month = selectedMonth.$d.getMonth()+1;

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
                allEvents.push({id: data.trainings[i].id,
                              title: data.trainings[i].title,
                              date: dayjs(data.trainings[i].trainingdatestart),
                              description: data.trainings[i].description,
                              pooltitle: data.trainings[i].pooltitle,
                              dynamic: false});
              }
                setSelectedMonthEvents(allEvents);
              })
  }

    const currentMonthView = selectedMonth;
    const currentSelectedDay = selectedDay;
    // const showEvents = showEvents;

    if (showEvents) {
      return (
        <div className="calendar-rectangle">
          <div className="calendar-content">
            <section className="main-calendar">
              <header className="calendar-header">
                <div className="calendar-row title-header">
                  {renderDayLabel()}
                </div>
                <div className="calendar-row button-container">
                  <i
                    className="calendar-box arrow fa fa-angle-left"
                    onClick={showCalendar}
                  />
                  <i
                    className="calendar-box event-button fa fa-plus-square"
                    onClick={addEvent}
                  />
                </div>
              </header>
              <Events
                selectedMonth={selectedMonth}
                selectedDay={selectedDay}
                selectedMonthEvents={selectedMonthEvents}
                removeEvent={i => removeEvent(i)}
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
                    onClick={previous}
                  />
                  <div className="calendar-box header-text">
                  {renderTodayLabel()}
                  {renderMonthLabel()}
                  </div>
                  <i className="calendar-box arrow fa fa-angle-right" onClick={next} />
                </div>
                <DayNames />
              </header>
              <div className="days-container">
                {renderWeeks()}
              </div>
            </section>
          </div>
        </div>
      );
    }
}

export default Calendar