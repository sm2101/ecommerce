import React, {useState, useEffect} from 'react';
import AdminNav from '../../Nav/AdminNav';
import {toast} from 'react-toastify';
import {useSelector} from 'react-redux';
import { 
    getCategory,
    updateteCategory
} from "../../../Functions/category";
import CategoryForm from '../../Forms/CategoryForm'

export default function UpdateCategory({history,match}) {
    const [name,setName] = useState(""),
          [loading,setLoading] = useState(false);

    const loadCategory =(slug) =>{
        getCategory(slug).then(c =>{
            setName(c.data.name)
        })
    }
    useEffect(() =>{
        const slug = match.params.slug;
        loadCategory(slug);
    },[])
    
    const {user} = useSelector(state => ({...state}));
    const handleSubmit = (e) =>{
        e.preventDefault()
        setLoading(true);
        updateteCategory(match.params.slug, {name},user.token).then(res =>{
            setLoading(false);
            setName("");
            toast.success("Category updated")
            history.push("/admin/category")
        }).catch(err =>{
            console.log(err);
        })
    }
    return (
        <>
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-2">
                <AdminNav />
              </div>
              <div className="col">
                  {loading?<h3>Loading...</h3>:<h3>Update Category</h3>}
                <CategoryForm 
                handleSubmit = {handleSubmit}
                name = {name}
                setName = {setName}
                />
            </div>
            </div>
          </div>
        </>
    )
}
