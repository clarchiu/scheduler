import React from "react";
import classNames from "classnames";

import DayListItem from "./DayListItem";


export default function DayList(props) {
  const { days, day, setDay } = props;  
  return (
    <ul>
      {
        days.map(dayData => {
          const { id, name, spots } = dayData;
          return (
            <DayListItem
              key={id}
              name={name}
              spots={spots}
              selected={name === day}
              setDay={setDay}
            />
          );
        })
      }
    </ul>
  );
}