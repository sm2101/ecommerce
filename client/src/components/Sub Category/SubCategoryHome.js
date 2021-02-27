import React, {useState, useEffect} from 'react'
import {getSubCat} from '../../Functions/subCat';
import UserProductCard from '../cards/UserProductCard'
import SkeletonCard from '../cards/SkeletonCard'
const SubCategoryHome = ({match}) => {
    const [products, setProducts] = useState([]),
          [subCategory, setSubCategory] = useState({}),
          [loading, setLoading] = useState(false);

          const {slug} = match.params
    
    useEffect(()=>{
        setLoading(true)
        getSubCat(slug).then(res =>{
            setLoading(false);
            setSubCategory(res.data.subCat)
            setProducts(res.data.products)
        })
    },[])

    return (
        <div className  = "container-fluid">
            <div className="container">
            {loading?(
                    <SkeletonCard count = {6}/>
                ):(<div className = "row">
                    {products.map(p =>(
                        <div className = "col-12 col-md-6 col-lg-3" key = {p._id}>
                            <UserProductCard product = {p}/>
                        </div>
                    ))}
                </div>)}
            </div>
        </div>
    )
}

export default SubCategoryHome
