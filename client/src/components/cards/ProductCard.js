import React from 'react'
import { Card } from "antd";
import {useHistory} from "react-router-dom"
import {EditOutlined, DeleteOutlined} from "@ant-design/icons"
const { Meta } = Card;
const ProductCard = ({product, handleRemove}) => {
    const { title, description, images, slug } = product;

    const history = useHistory();
    const handleEdit = (slug) =>{
      history.push(`/admin/product/${slug}`)
    }
    return (
        <Card className = "p-2"
      cover={
        <img
          src={images && images.length ? images[0].url : "https://i1.wp.com/fremontgurdwara.org/wp-content/uploads/2020/06/no-image-icon-2.png"}
          style={{ height: "150px", objectFit: "cover" }}
          alt="Product image"
        />
      }
      actions = {[
          <EditOutlined 
          className = "text-warning"
          onClick = {() => handleEdit(slug)} 
          />,
          <DeleteOutlined 
          className = "btn btn-danger"
          onClick = {() => handleRemove(slug)}
          />
      ]}
    >
      <Meta 
      title={title} 
      description={`${description && description.substring(0,50)}...`} 
      />
    </Card>
    )
}

export default ProductCard
