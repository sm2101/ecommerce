import React, {useState, useEffect} from 'react';
import AdminNav from '../../Nav/AdminNav';
import {toast} from 'react-toastify';
import {useSelector} from 'react-redux';
import { 
    updateProduct,
    getProduct
} from "../../../Functions/products";
import {  
    getAllCategories,
    getCategorySubs 
} from "../../../Functions/category";
// import {EditOutlined,DeleteOutlined} from "@ant-design/icons";
// import { Link } from 'react-router-dom';
import UpdateProdductForm from '../../Forms/UpdateProductForm';
import FileUpload from '../../Forms/FileUpload';
export default function UpdateProduct({match}) {
    const slug = match.params.slug;
    const [loading, setLoading] = useState(""),
          [values, setValues] = useState({
              title:"",
              description:"",
              price:"",
              category:"",
              categories:[],
              subCat:[],
              shipping:"",
              quantity:"",
              images:[],
              color:""
          }),
          [subOptions, setSubOptions] = useState([]),
          [subDropDown, setSubDropDown] = useState(false);

    const {user} = useSelector((state) =>({...state}));

    const loadProduct = () =>{
        getProduct(slug).then(res =>{
            console.log(values);
            setValues({...values, ...res.data})
            console.log(values)
        }).catch(err =>{
            console.log(err);
        })
    }

    const loadCategories = () =>{
        getAllCategories().then(res =>{
            setValues({...values,  categories: res.data});
        }).catch(err =>{
            console.log(err)
        })
    }

    const getSubs = (e) =>{
        e.preventDefault()
        const catId = e.target.value;
        setValues({...values, subCat:[] ,category:catId});
        getCategorySubs(catId).then(res =>{
            setSubOptions(res.data)
            setSubDropDown(true);
        }).catch(err =>{
            console.log(err);
        })
    }

    useEffect(() =>{
        loadProduct();
        loadCategories();

    },[])

    const handleSubmit = (e) =>{
        e.preventDefault();
        setLoading(true)
        updateProduct(values,user.token).then(res =>{
            console.log(res)
            window.alert("Product updated!");
            window.location.reload();
            setLoading(false);
        }).catch(err =>{
            console.log(err);
            toast.error("Some error occured")
            setLoading(false);
        })
    }
    const handleChange = (e) =>{
        e.preventDefault();
        setValues({...values,[e.target.name]:e.target.value})
    }
    return (
        <>
        <div className="container-fluid">
          <div className="row">
            <div className="col-md-2">
              <AdminNav />
            </div>
            <div className="col">
              {loading?<h3>Loading...</h3>:<h3>Update Product</h3>}
              <FileUpload 
              values = {values}
              setValues = {setValues}
              setLoading = {setLoading}
              />
             <UpdateProdductForm 
             getSubs = {getSubs} 
             handleChange = {handleChange} 
             handleSubmit = {handleSubmit} 
             values = {values} 
             subOptions = {subOptions}
             subDropDown = {subDropDown}
             setValues = {setValues}
             />
          </div>
          </div>
        </div>
      </>
    )
}
