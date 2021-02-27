import React from 'react';
import StarRating from 'react-star-ratings'

export const ShowAverage = (p) =>{
    if(p && p.rating){
        let arr = p.rating
        let total = []
        let len = arr.length;

        arr.map(r => total.push(r.star))
        let totalReduced = total.reduce((prev,next) =>
            prev + next, 0
        )

        let high = len*5;

        let result = totalReduced*5/high;

        return(
            <div className = "text-center pb-2">
                <span>
                    <StarRating 
                    rating = {result}
                    starDimension = "30px"
                    starSpacing = "2px"
                    starRatedColor = "#437846"
                    isSelectable = {false}
                    />
                </span>
                <span>
                    {`(${len})`}
                </span>
            </div>
        )
    }
}