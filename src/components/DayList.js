import React from "react";

import DayListItem from "./DayListItem";


export default function DayList(props) {
  const { days, day, setDay } = props;  
  const dayListItems = days.map(dayData => {
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

  return (
    <ul>
      { dayListItems }
    </ul>
  );
}