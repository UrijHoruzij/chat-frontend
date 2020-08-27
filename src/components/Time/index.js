import React, { Fragment } from "react";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import ruLocale from "date-fns/locale/ru";

const Time = ({ date }) => (
  <Fragment>
    {formatDistanceToNow(date, { addSuffix: true, locale: ruLocale })}
  </Fragment>
);

export default Time;
