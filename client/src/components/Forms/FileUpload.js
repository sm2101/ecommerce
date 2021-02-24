import React from 'react';
import Resizer from 'react-image-file-resizer';
import axios from 'axios';
import {useSelector} from 'react-redux'
import { toast } from 'react-toastify';
import {Avatar, Badge} from 'antd';
import Item from 'antd/lib/list/Item';
const FileUpload = ({values,setValues,setLoading}) => {

    const {user} = useSelector((state) => ({...state}));
    const handleRemoval = (public_id) =>{
        setLoading(true);
        axios.post(`${process.env.REACT_APP_API}/remove-image`,{public_id},{
            headers:{
                authToken : user ? user.token :"",
            }
        }).then(res =>{
            setLoading(false);
            const {images} = values;
            let newImages = images.filter((img)=>{
                return img.public_id !== public_id
            });
            toast.success("image deleted")
            setValues({...values,images:newImages})
        }).catch(err =>{
            setLoading(false);
            toast.error("Image deletion failed")
        })
    }
    const handleChange = (e)=>{
        let files = e.target.files;
        let uploadedFiles = values.images;
        if(files.length > 0){
            setLoading(true)
            files.forEach(f => {
                console.log("upload started");
                Resizer.imageFileResizer(f,360,360,'JPEG',100,0,(uri)=>{
                    console.log("resize done")
                    axios.post(`${process.env.REACT_APP_API}/upload-images`,{
                        img:uri
                    },{
                        headers:{
                            authToken : user ? user.token :"",
                        }
                    }).then(res =>{
                        setLoading(false);
                        console.log("upload done");
                        uploadedFiles.push(res.data);
                        setValues({...values,images:uploadedFiles})

                    }).catch(err =>{
                        setLoading(false);
                        console.log(err);
                        toast.error("File Upload failed")
                    })
                },'base64');
            });
        }
    }
    return (
        <>
        <div className="row">
            {values.images &&
          values.images.map((image) => (
            <span className = "avatar-item col-2">
                <Badge
            count="X"
            key={image.public_id}
            onClick = {() => handleRemoval(image.public_id)}
            style={{ cursor: "pointer" }}
          >
            <Avatar
              src={image.url}
              size={100}
              shape="square"
              className="ml-3"
            />
          </Badge>
            </span>
          ))}
        </div>
        <div className="form-group">
            <label htmlFor="img">
                Upload Image(s)
            </label>
            <input 
                type="file" 
                multiple
                id="img" 
                name = "images"
                className="form-control"
                accept = "images/*"
                onChange = {handleChange}
            />
        </div>
        </>
    )
}

export default FileUpload
