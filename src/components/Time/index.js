import React, { Fragment } from "react";
import PropTypes from "prop-types";
import format from "date-fns/format";
import formatDistanceToNow from "date-fns/formatDistanceToNow";
import ruLocale from "date-fns/locale/ru";

const Time = ({ date, type }) => {
  return type === "short" ? (
    date === new Date() ? (
      <Fragment>{format(date, "MM.dd.yyyy")}</Fragment>
    ) : (
      <Fragment>{format(date, "HH:mm")}</Fragment>
    )
  ) : (
    <Fragment>
      {formatDistanceToNow(date, {
        addSuffix: true,
        locale: ruLocale,
      })}
    </Fragment>
  );
};

Time.propTypes = {
  date: PropTypes.object,
  type: PropTypes.string,
};

export default Time;
