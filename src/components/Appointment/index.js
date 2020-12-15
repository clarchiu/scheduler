import React from "react";
import "./styles.scss";
import useVisualMode from "../../hooks/useVisualMode";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";
import Confirm from "./Confirm";
import Error from "./Error";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const EDIT = "EDIT";
const CONFIRM = "CONFIRM";
const SAVING = "Saving";
const DELETING = "Deleting";
const ERR_SAVE = "ERR_SAVE";
const ERR_DELETE = "ERR_DELETE";

export default function Appointment(props) {
  const {id, time, interview, interviewers, bookInterview, cancelInterview} = props;
  const {student, interviewer} = interview || {};

  const { mode, transition, back } = useVisualMode( interview ? SHOW : EMPTY);

  const save = (name, interviewer) => {
    const newInterview = {
      student: name,
      interviewer
    };

    transition(SAVING);
    bookInterview(id, newInterview)
      .then(() => transition(SHOW))
      .catch(() => transition(ERR_SAVE, true));
  };

  const destroy = () => {
    transition(DELETING, true);
    cancelInterview(id)
      .then(() => transition(EMPTY))
      .catch(() => transition(ERR_DELETE, true));
  };

  return (
    <article className="appointment">
      <Header time={time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={student}
          interviewer={interviewer}
          onEdit={() => transition(EDIT)}
          onDelete={() => transition(CONFIRM)}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={interviewers}
          onSave={save}
          onCancel={() => back()}
      />
      )}
      {mode === EDIT && (
        <Form
          name={student}
          interviewer={interviewer.id}
          interviewers={interviewers}
          onSave={save}
          onCancel={() => back()}
      />
      )}
      {mode === CONFIRM && (
        <Confirm
          message="Delete the appointment?"
          onConfirm={destroy}
          onCancel={() => back()}
        />
      )}
      {mode === SAVING && <Status message={SAVING}/>}
      {mode === DELETING && <Status message={DELETING}/>}
      {mode === ERR_SAVE && (
        <Error 
          message="Could not save appointment"
          onClose={() => back()}
        />
      )}
      {mode === ERR_DELETE && (
        <Error 
          message="Could not delete appointment"
          onClose={() => back()}
        />
      )}
      
    </article>
  );
}