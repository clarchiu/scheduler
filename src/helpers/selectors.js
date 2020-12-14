export function getAppointmentsForDay(state, day) {
  //... returns an array of appointments for that day
  const toReturn = [];
  const { days, appointments } = state;
  const [selectedDay] = days.filter(dayData => dayData.name === day);

  if (days.length && selectedDay) {
    for (const id of selectedDay.appointments) {
      if (appointments[id]) {
        toReturn.push(appointments[id]);
      }
    }
  }

  return toReturn;
}

export function getInterview(state, interview) {
  if (!interview) return null;

  const { interviewer: id } = interview;
  const interviewer = state.interviewers[id];

  const toReturn = interviewer ? {...interview, interviewer} : null;
  return toReturn;
}

export function getInterviewersForDay(state, day) {
  const toReturn = [];
  const { days, interviewers } = state;
  const [selectedDay] = days.filter(dayData => dayData.name === day);

  if (days.length && selectedDay) {
    for (const id of selectedDay.interviewers) {
      if (interviewers[id]) {
        toReturn.push(interviewers[id]);
      }
    }
  }

  return toReturn;
}