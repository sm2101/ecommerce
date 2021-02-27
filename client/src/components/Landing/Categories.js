import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import {getAllCategories} from '../../Functions/category'
const Categories = () => {
    const [categories, setCategories] = useState([]),
          [loading, setLoading] = useState(false);

    useEffect(() =>{
        setLoading(true);
        getAllCategories().then(res =>{
            setCategories(res.data);
            setLoading(false);
        })
    },[])

    const showCategories = () =>{
        return(
            categories.map(c =>(
                <div className = "btn btn-outline-primary col mx-3">
                    <Link to = {`/category/${c.slug}`}>
                        {c.name}
                    </Link>
                </div>
            ))
        )
    }
    
    return (
        <div className = "row d-flex p-0 m-0 justify-content-around mb-5">
            {loading ? (<h4>Loading..</h4>):showCategories()}
        </div>
    )
}

export default Categories
