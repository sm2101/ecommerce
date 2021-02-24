import React from 'react';
import {Card} from 'antd';
import {Link} from 'react-router-dom';
import {HeartOutlined, ShoppingCartOutlined, StarOutlined} from '@ant-design/icons';
import "react-responsive-carousel/lib/styles/carousel.min.css";
import {Carousel} from 'react-responsive-carousel';
const {Meta} = Card;
const ProductPage = ({product}) => {
    const {title,description,images,slug} = product
    return (
        <>
        <div className="col-12 col-md-7">
            {images && images.length ?<Carousel showArrows = {true} autoPlay infiniteLoop>
                {images && images.map(i => (
                    <img src = {i.url} key={i.public_id}></img>
                ))}
            </Carousel> :
            <Card
            cover = {
                <img
                    src="https://i1.wp.com/fremontgurdwara.org/wp-content/uploads/2020/06/no-image-icon-2.png"
                    style={{ height: "25rem", objectFit: "cover" }}
                    alt="Default"
                />
            }
            ></Card> 
            }
        </div>
        <div className="col-12 col-md-5">
            <Card
            actions = {[
                <>
                <ShoppingCartOutlined className = "text-success"/>Add to Cart
                </>,
                <>
                <HeartOutlined className = "text-danger"/> Add to wishLisht
                </>,
                <>
                <StarOutlined className = "text-warning"/>Leave a rating
                </>
            ]}
            >
                <Meta
                title = {title}
                description = {description}
                ></Meta>
            </Card>
        </div>
        </>
    )
}

export default ProductPage
