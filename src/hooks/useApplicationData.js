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

  const updateInterview = (method, id, increment, interview) => {
    const appointment = {
      ...state.appointments[id],
      inteview: interview? { ...interview } : null
    };
    const appointments = {
      ...state.appointments,
      [id]: appointment
    };
    return axios({
      method,
      url: api.appointments + id,
      data: interview ? { interview } : null
    })
    .then(() => {
      updateSpots(id, increment);
      setAppointments(appointments);
    });
  }

  const bookInterview = (id, interview) => {
    return updateInterview("put", id, -1, interview);
  };

  const cancelInterview = (id) => {
    return updateInterview("delete", id, 1);
  };

  return {
    state,
    setDay,
    bookInterview,
    cancelInterview,
  };
}