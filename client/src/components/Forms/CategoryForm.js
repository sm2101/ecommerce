import React from 'react'

export default function CategoryForm({handleSubmit, name, setName}) {
    return (
        <>
         <form onSubmit = {handleSubmit}>
            <div className="form-group">
                <label htmlFor="name">Name</label>
                <input 
                    type="text" 
                    className="form-control"
                    value = {name}
                    onChange = {(e)=>setName(e.target.value)}
                    required
                />
                <button className="btn btn-primary">Save</button>
            </div>
        </form>
        </>
    )
}
