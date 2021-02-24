import React from 'react';
import { Card, Skeleton } from "antd";

const SkeletonCard = ({count}) => {
    const card = () =>{
        let total = [];
        for (let i = 0; i < count; i++) {
            total.push(
                <Card className = "col-md-4 col-lg-3 border-0">
                    <Skeleton active></Skeleton>
                </Card>
            )
        }

        return total;
    }
    return (
        <div className = "row pb-4">
            {card()}
        </div>
    )
}

export default SkeletonCard
