import React, { useState } from 'react';
import CSSTransitionGroup from 'react-transition-group/CSSTransitionGroup';
import EventsInfo from './EventsInfo';
import { Modal } from 'react-bootstrap';

function Events(props) {
  const currentMonthView = props.selectedMonth;
  const currentSelectedDay = props.selectedDay;
  const monthEvents = props.selectedMonthEvents;
  const removeEvent = props.removeEvent;

  const [show, setShow] = useState(false);
  const [id, setId] = useState();

  const handleClose = () => setShow(false);

  const monthEventsRendered = monthEvents.map((event, i) => {
    return (
      <div
        key={event.title}
        className="event-container"
        onClick={() => {
          setShow(true);
          setId(event.id);
          }}
        // onClick={() => removeEvent(i)}
      >
        <CSSTransitionGroup
          component="div"
          className="animated-time"
          transitionName="time"
          transitionAppear={true}
          transitionAppearTimeout={500}
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}
        >
          <div className="event-time event-attribute">
            {event.date.format("HH:mm")}
          </div>
        </CSSTransitionGroup>

        <CSSTransitionGroup
          component="div"
          className="animated-title"
          transitionName="title"
          transitionAppear={true}
          transitionAppearTimeout={500}
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}
        >
          <div className="event-title event-attribute">{event.id}</div>
        </CSSTransitionGroup>

        <CSSTransitionGroup
          component="div"
          className="animated-title"
          transitionName="title"
          transitionAppear={true}
          transitionAppearTimeout={500}
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}
        >
          <div className="event-title event-attribute">{event.title}</div>
        </CSSTransitionGroup>

        <CSSTransitionGroup
          component="div"
          className="animated-title"
          transitionName="pooltitle"
          transitionAppear={true}
          transitionAppearTimeout={500}
          transitionEnterTimeout={500}
          transitionLeaveTimeout={500}
        >
          <div className="event-title event-attribute">{event.pooltitle}</div>
        </CSSTransitionGroup>
      </div>
    );
  });

  const dayEventsRendered = [];

  for (var i = 0; i < monthEventsRendered.length; i++) {
    if (monthEvents[i].date.isSame(currentSelectedDay, "day")) {
      dayEventsRendered.push(monthEventsRendered[i]);
    }
  }

  return (
    <div className="day-events">
      {dayEventsRendered}
      <Modal show={show} onHide={handleClose} size="lg">
        <Modal.Header closeButton>
        </Modal.Header>
        <Modal.Body>
          <EventsInfo id={id} />
        </Modal.Body>
      </Modal>
    </div>
  );
}

export default Events;