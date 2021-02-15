import React, {useState, useEffect} from 'react';
import AdminNav from '../../Nav/AdminNav';
import {toast} from 'react-toastify';
import {useSelector} from 'react-redux';
import { 
    getSubCat,
    updateSubCat
} from "../../../Functions/subCat";
import {getAllCategories} from '../../../Functions/category'
import CategoryForm from '../../Forms/CategoryForm'

export default function UpdateSubCat({history,match}) {
    const [name,setName] = useState(""),
          [loading,setLoading] = useState(false),
          [categories,setCategories] = useState([]),
          [parent, setParent] = useState("");

    const loadSubCat =(slug) =>{
        getSubCat(slug).then(s =>{
            setName(s.data.name);
            setParent(s.data.parent);
        })
    }
    const loadCategories = () =>{
        getAllCategories().then(res =>{
            setCategories(res.data)
        }).catch(err =>{
            console.log(err)
        })
    }
    useEffect(() =>{
        const slug = match.params.slug;
        loadCategories();
        loadSubCat(slug);
    },[match.params.slug])
    
    const {user} = useSelector(state => ({...state}));
    const handleSubmit = (e) =>{
        e.preventDefault()
        setLoading(true);
        updateSubCat(match.params.slug, {name, parent},user.token).then(res =>{
            setLoading(false);
            setName("");
            toast.success("Sub Category updated")
            history.push("/admin/sub-category")
        }).catch(err =>{
            console.log(err);
            toast.error("Update failed. Try Again!")
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
                  <div className="form-group">
                    <label htmlFor="Category-list">Parent Category</label>
                    <select id = "Category-list" className = "form-control" onChange = {e => setParent(e.target.value)}>
                        <option value = "">Select a Parent Category</option>
                        {categories.length > 0 && categories.map((c)=>{
                            return (
                            <option value ={c._id} key = {c._id} selected = {c._id === parent}>{c.name}</option>
                            )
                        })}
                    </select>
                </div>

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
