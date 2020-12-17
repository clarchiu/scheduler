const API_URLS = {
  days: "/api/days/",
  appointments: "/api/appointments/",
  interviewers: "/api/interviewers/",
};

const APPOINTMENT_STATES = {
  EMPTY: "EMPTY",
  SHOW: "SHOW",
  CREATE: "CREATE",
  EDIT: "EDIT",
  CONFIRM: "CONFIRM",
  SAVING: "Saving",
  DELETING: "Deleting",
  ERR_SAVE: "ERR_SAVE",
  ERR_DELETE: "ERR_DELETE",
}

export {
  API_URLS,
  APPOINTMENT_STATES,
}