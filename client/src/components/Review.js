import React from "react";

const Review = ({ subject, body, stars, date, }) => (
  <div>
    <h2>{subject}</h2>
    <p>{body}</p>
    <p>{stars}</p>
    <p>{date}</p>
  </div>
)

export default Review;
