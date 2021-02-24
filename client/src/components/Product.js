import React ,{useState, useEffect} from 'react'
import {getProduct} from '../Functions/products'
import ProductPage from '../components/cards/ProductPage'
const Product = ({match}) => {
    const [product, setProduct] = useState({});

    const {slug} = match.params;

    const loadProduct = () => {
        getProduct(slug).then(res =>{
            setProduct(res.data)
        })
    }

    useEffect(()=>{
        loadProduct();
    },[])

    return (
        <div className = "container-fluid m-0">
            <div className="row">
                <ProductPage product = {product} />
            </div>
        </div>
    )
}

export default Product
