import React from 'react'
import {useHistory} from 'react-router-dom';
import {useSelector, useDispatch} from 'react-redux'
import {SearchOutlined} from '@ant-design/icons'
import {SEARCH_QUERY} from '../../Actions/types'
const ProductSearchForm = ({setCurrent}) => {
    const dispatch = useDispatch(),
          {search} = useSelector((state) =>({...state})),
          {text} = search,
           history = useHistory();

    const handleSubmit = (e) =>{
        e.preventDefault();
        setCurrent("shop")
        history.push(`/shop?${text}`)
    }

    const handleChange = (e) =>{
        dispatch({
            type:SEARCH_QUERY,
            payload:{
                text : e.target.value,
            }
        })
    }

    return (
        <form className = "form-inline my-2 y-lg-3" onSubmit = {handleSubmit}>
            <div className="input-group">
            <input 
            type = "search" 
            value = {text} 
            className = "form-control mr-sm-2" 
            placeholder = "Search"
            onChange = {handleChange}
            />
            <span className="input-group-text">
            <SearchOutlined onClick = {handleSubmit} style = {{cursor:"pointer"}}/>
            </span>
            </div>
        </form>
    )
}

export default ProductSearchForm
