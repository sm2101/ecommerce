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
export default function CreateProduct() {
    return (
        <div>
            
        </div>
    )
}
