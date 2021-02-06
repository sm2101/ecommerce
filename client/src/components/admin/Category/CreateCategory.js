import React, {useState, useEffect} from 'react';
import AdminNav from '../../Nav/AdminNav';
import {toast} from 'react-toastify';
import {useSelector} from 'react-redux';
import { 
    createCategory, 
    removeCategory, 
    getAllCategories 
} from "../../../Functions/category";
import {EditOutlined,DeleteOutlined} from "@ant-design/icons";
import { Link } from 'react-router-dom';
import CategoryForm from '../../Forms/CategoryForm';
import SearchForm from '../../Forms/SearchForm';
const CreateCategory = () => {

    const [name,setName] = useState(""),
          [loading,setLoading] = useState(false),
          [categories,setCategories] = useState([]),
          [searchQuery, setQuery] = useState("");
    
    const loadCategories = () =>{
        getAllCategories().then(res =>{
            setCategories(res.data)
        }).catch(err =>{
            console.log(err)
        })
    }

    useEffect(() =>{
        loadCategories();
    },[])
    
    const {user} = useSelector(state => ({...state}));
    const handleSubmit = (e) =>{
        e.preventDefault();
        setLoading(true);
        createCategory({name},user.token).then(res=>{
            setLoading(false)
            setName("");
            toast.success("Category Added")
            loadCategories();
        }).catch(err=>{
            setLoading(false)
            console.log(err)
            toast.error("Some error occured")
        })
    }

    const handleRemove = (slug) => {

        if (window.confirm("Delete?")) {
          setLoading(true);
          removeCategory(slug, user.token).then(value => {
              setLoading(false);
              toast.success("Category Deleted");
              loadCategories();
            })
            .catch((err) => {
                setLoading(false);
                console.log(err);
                toast.error("Category can't be deleted. Try again!");
            });
        }
      };
      
      const search = (searchQuery) => (c) =>{
          return c.name.toLowerCase().includes(searchQuery)
      }

    return (
        <>
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-2">
                <AdminNav />
              </div>
              <div className="col">
                {loading?<h3>Loading...</h3>:<h3>Create Category</h3>}
                <CategoryForm 
                handleSubmit = {handleSubmit}
                name = {name}
                setName = {setName}
                />
                <hr />
                <SearchForm 
                searchQuery = {searchQuery}
                setQuery = {setQuery}
                />
                {categories.filter(search(searchQuery)).map((c) => (
                <div className = "alert alert-secondary" key={c._id}>
                    {c.name} 
                    <span onClick = {() => handleRemove(c.slug)} class = "btn btn-sm float-end">
                        <DeleteOutlined className = "text-danger" />
                    </span> 
                    <Link to = {`/admin/category/${c.slug}`}>
                    <span class = "btn btn-sm float-end">
                        <EditOutlined />
                    </span> 
                    </Link>
                </div>
                ))}
            </div>
            </div>
          </div>
        </>
    )
}

export default CreateCategory;