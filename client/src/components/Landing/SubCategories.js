import React, {useState, useEffect} from 'react'
import { Link } from 'react-router-dom'
import {getAllSubCat} from '../../Functions/subCat'
const SubCategories = () => {
    const [subCategories, setSubCategories] = useState([]),
          [loading, setLoading] = useState(false);

    useEffect(() =>{
        setLoading(true);
        getAllSubCat().then(res =>{
            setSubCategories(res.data);
            setLoading(false);
        })
    },[])

    const showSubCategories = () =>{
        return(
            subCategories.map(s =>(
                <div className = "btn btn-outline-primary col mx-3">
                    <Link to = {`/sub-category/${s.slug}`}>
                        {s.name}
                    </Link>
                </div>
            ))
        )
    }
    
    return (
        <div className = "row d-flex p-0 m-0 justify-content-around mb-5">
            {loading ? (<h4>Loading..</h4>):showSubCategories()}
        </div>
    )
}

export default SubCategories
