import React from "react";
import "./styles.scss";
import useVisualMode from "../../hooks/useVisualMode";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";
import Form from "./Form";
import Status from "./Status";

const EMPTY = "EMPTY";
const SHOW = "SHOW";
const CREATE = "CREATE";
const EDIT = "EDIT";
const CONFIRM = "CONFIRM";
const SAVING = "Saving";
const DELETING = "Deleting";

export default function Appointment(props) {
  const {id, time, interview, interviewers, bookInterview} = props;
  const {student, interviewer} = interview || {};

  const { mode, transition, back } = useVisualMode( interview ? SHOW : EMPTY);

  const save = (name, interviewer) => {
    const newInterview = {
      student: name,
      interviewer
    };

    transition(SAVING);
    bookInterview(id, newInterview)
      .then(() => transition(SHOW));
  }

  return (
    <article className="appointment">
      <Header time={time} />
      {mode === EMPTY && <Empty onAdd={() => transition(CREATE)} />}
      {mode === SHOW && (
        <Show
          student={student}
          interviewer={interviewer}
        />
      )}
      {mode === CREATE && (
        <Form
          interviewers={interviewers}
          onSave={save}
          onCancel={() => back()}
      />
      )}
      {mode === SAVING && <Status message={SAVING}/>}
    </article>
  );
}