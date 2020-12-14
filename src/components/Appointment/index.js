import React, { Fragment, useState } from "react";
import "./styles.scss";

import Header from "./Header";
import Show from "./Show";
import Empty from "./Empty";

export default function Appointment(props) {
  const {time, interview} = props;
  const {student, interviewer} = interview || {};
  return (
    <article className="appointment">
      <Header time={time} />
      {interview ? 
        <Show student={student} interviewer={interviewer}/> :
        <Empty />
      }
    </article>
  );
}