import React from "react";
import moment from "moment";

const Notifications = ({ notifications }) => {
  return (
    <div className="section">
      <div className="card z-depth-0 mercury notification-container">
        <div className="card-content">
          <span className="card-title white-text text-darken-3 ">
            Notifications
          </span>
          <ul className="notifications grey-text lighten-5">
            {notifications.map((item) => {
              return (
                <li key={item.id}>
                  <span className="blue-text lighten-1">{item.user}</span>
                  <span className="white-text"> {item.content}</span>
                  <div className="grey-text note-date">
                    {moment(item.time.toDate()).fromNow()}
                  </div>
                </li>
              );
            })}
          </ul>
        </div>
      </div>
    </div>
  );
};

export default Notifications;
