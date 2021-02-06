import React from 'react'
import AdminNav from '../../Nav/AdminNav';
export default function CreateSubCat() {
    return (
        <>
          <div className="container-fluid">
            <div className="row">
              <div className="col-md-2">
                <AdminNav />
              </div>
              {/* <div className="col">
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
            </div> */}
            </div>
          </div>
        </>
    )
}
