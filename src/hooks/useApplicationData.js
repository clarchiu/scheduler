import { useState, useEffect } from "react";
import axios from "axios";

import { API_URLS as api } from "../constants";

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
      Promise.resolve(axios.get(api.days)),
      Promise.resolve(axios.get(api.appointments)),
      Promise.resolve(axios.get(api.interviewers)),
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

  const updateSpots = (id, booking, editing) => {
    for (const [index, day] of state.days.entries()) {
      if (day.appointments.includes(id)) {
        const newDay = {
          ...day,
          spots: day.spots + (booking ? 
                             (editing ? 0 : -1) : 1),
        };
        const days = [...state.days];
        days.splice(index, 1, newDay);
        setDays(days);
      }
    }
  };

  const bookInterview = (id, interview) => {
    const appointment = state.appointments[id];
    const newAppointment = {
      ...appointment,
      interview: { ...interview },
    };
    const appointments = {
      ...state.appointments,
      [id]: newAppointment
    };
    return axios.put(api.appointments + id, { interview })
    .then(() => {
      updateSpots(id, true, appointment.interview != null);
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
    return axios.delete(api.appointments + id)
    .then(() => {
      updateSpots(id, false);
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