import React from "react";
import classNames from "classnames";

import "components/DayListItem.scss";

export default function DayListItem(props) {
  const { name, spots, selected, setDay } = props;
  const itemClass = classNames('day-list__item', { 
    'day-list__item--selected': selected,
    'day-list__item--full': spots <= 0,
  });

  const formatSpots = (spots) => {
    switch (spots) {
      case 0:
        return 'no spots remaining';
      case 1:
        return '1 spot remaining';
      default:
        return spots + ' spots remaining';
    }
  }

  return (
    <li data-testid="day" className={itemClass} onClick={() => setDay(name)}>
      <h2 className="text--regular">{name}</h2> 
      <h3 className="text--light">{formatSpots(spots)}</h3>
    </li>
  );
}