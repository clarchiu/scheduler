import React, { useState, useEffect } from "react";
import axios from "axios";

import "components/Application.scss";

import DayList from "./DayList";
import Appointment from "./Appointment";
import { getAppointmentsForDay, getInterview, getInterviewersForDay } from "../helpers/selectors";

const DAYS_URL = "/api/days/";
const APPOINTMENTS_URL = "/api/appointments/";
const INTERVIEWERS_URL = "/api/interviewers/"

export default function Application() {
  const [state, setState] = useState({
    day: "Monday",
    days:[], 
    appointments:{},
    interviewers:{},
  });

  const setDay = day => setState({...state, day});
  const setAppointments = appointments => setState(prev => ({...prev, appointments}));


  useEffect(() => {
    Promise.all([
      Promise.resolve(axios.get(DAYS_URL)),
      Promise.resolve(axios.get(APPOINTMENTS_URL)),
      Promise.resolve(axios.get(INTERVIEWERS_URL)),
    ])
    .then(([daysRes, appointmentsRes, interviewersRes]) => {
      setState(prev => ({
        ...prev,
        days: daysRes.data,
        appointments: appointmentsRes.data,
        interviewers: interviewersRes.data,
      }));
    })
  }, []);

  const { day, days } = state;
  const schedule = getAppointmentsForDay(state, day);
  const interviewers = getInterviewersForDay(state,day);

  const bookInterview = (id, interview) => {
    const appointment = {
      ...state.appointments[id],
      interview: { ...interview }
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.put(APPOINTMENTS_URL + id, { interview })
      .then(() => setAppointments(appointments))
      .catch(err => console.log(err));
  }

  const cancelInterview = (id) => {
    const appointment = {
      ...state.appointments[id],
      interview: null,
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios.delete(APPOINTMENTS_URL + id)
      .then(() => setAppointments(appointments))
      .catch(err => console.log(err));
  }

  const scheduleElements = schedule.map((appointment) => {
    const interview = getInterview(state, appointment.interview);
  
    return (
      <Appointment
        key={appointment.id}
        id={appointment.id}
        time={appointment.time}
        interview={interview}
        interviewers={interviewers}
        bookInterview={bookInterview}
        cancelInterview={cancelInterview}
      />
    );
  });

  return (
    <main className="layout">
      <section className="sidebar">
        <img
          className="sidebar--centered"
          src="images/logo.png"
          alt="Interview Scheduler"
        />
        <hr className="sidebar__separator sidebar--centered" />
        <nav className="sidebar__menu">
          <DayList
            days={days}
            day={day}
            setDay={setDay}
          />
        </nav>
        <img
          className="sidebar__lhl sidebar--centered"
          src="images/lhl.png"
          alt="Lighthouse Labs"
        />
      </section>
      <section className="schedule">
        {scheduleElements}
        <Appointment key="last" time="5pm" />
      </section>
    </main>
  );
}
