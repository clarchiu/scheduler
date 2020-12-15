import { useState, useEffect } from "react";
import axios from "axios";

const DAYS_URL = "/api/days/";
const APPOINTMENTS_URL = "/api/appointments/";
const INTERVIEWERS_URL = "/api/interviewers/"

export default function useApplicationData() {
  const [state, setState] = useState({
    day: "Monday",
    days:[], 
    appointments:{},
    interviewers:{},
  });

  const setDay = day => setState({...state, day});
  const setDays = days => setState(prev => ({...prev, days}));
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
    });
  }, []);

  const updateSpots = (id, increment) => {
    for (const [index, day] of state.days.entries()) {
      if (day.appointments.includes(id)) {
        const newDay = {
          ...day,
          spots: day.spots + increment,
        };
        const days = [...state.days];
        days.splice(index, 1, newDay);
        setDays(days);
      }
    }
  };

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
      .then(() => {
        updateSpots(id, -1);
        setAppointments(appointments);
      });
  };

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
      .then(() => {
        updateSpots(id, 1);
        setAppointments(appointments);
      });
  };

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview,
  };
}