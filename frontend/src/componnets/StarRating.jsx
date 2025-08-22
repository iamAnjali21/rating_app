// components/StarRating.jsx
import React, { useState } from "react";

function StarRating({ onRate }) {
  const [rating, setRating] = useState(0);
  const [hover, setHover] = useState(0);

  return (
    <div className="d-flex mt-3">
      {[1, 2, 3, 4, 5].map((star) => (
        <span
          key={star}
          className={`fs-2 mx-1 ${star <= (hover || rating) ? "text-warning" : "text-secondary"}`}
          style={{ cursor: "pointer" }}
          onClick={() => {
            setRating(star);
            if (onRate) onRate(star);
          }}
          onMouseEnter={() => setHover(star)}
          onMouseLeave={() => setHover(0)}
        >
          ★
        </span>
      ))}
    </div>
  );
}
export default StarRating;