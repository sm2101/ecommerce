import React from 'react'

export default function SearchForm({searchQuery, setQuery}) {
    const handleSearchChange = (e) =>{
        e.preventDefault()
        setQuery(e.target.value.toLowerCase());
    }
    return (
        <>
         <input 
        type="search" 
        placeholder = "Filter name"
        value = {searchQuery}
        onChange = {handleSearchChange}
        className = "form-control mb-4"
        />   
        </>
    )
}
