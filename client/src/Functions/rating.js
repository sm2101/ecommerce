import React from "react";
import StarRating from "react-star-ratings";

export const ShowAverage = (p, show) => {
  if (p && p.rating) {
    let arr = p.rating;
    let total = [];
    let len = arr.length;

    arr.map((r) => total.push(r.star));
    let totalReduced = total.reduce((prev, next) => prev + next, 0);

    let high = len * 5;

    let result = (totalReduced * 5) / high;

    return (
      <div className="text-left pb-2">
        <span>
          <StarRating
            rating={result}
            starDimension="20px"
            starSpacing="2px"
            starRatedColor="Gold"
            isSelectable={false}
          />
        </span>
        {show ? <span>{`(${len})`}</span> : ""}
      </div>
    );
  }
};
