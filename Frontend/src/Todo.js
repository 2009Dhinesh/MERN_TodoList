import { useEffect, useState } from 'react';
export default function Todo(){


    const [title , setTitle] =useState('');
    const [description , setDescription] =useState('');

    // edit 
    const [editTitle , setEditTitle] =useState('');
    const [editDescription , setEditDescription] =useState('');

    const [todos , setTodos] = useState([]);
    const [error , setError] = useState('');
    const [success , setSuccess] = useState('');
    const [editingId , setEditingId] = useState(-1);
    const apiUrl = "http://localhost:3002";
    const handleSubmit =()=>{
        setError('')
        // check inputs
        if(title.trim() !== '' || description.trim()  !== ''){

            fetch(apiUrl + "/todos", {
                method: "POST" ,
                headers : {
                    'content-Type' : 'application/json'
                },
                body: JSON.stringify({title , description})
            } ).then((res) => {
                if(res.ok){
                    // add item to list
                    setTodos([...todos , {title , description}]);
                    setSuccess('Item added Successfully');
                    setTitle('');
                    setDescription('');
                    setTimeout(() => {
                        setSuccess('');
                    } , 3000)
                }else{
                    // set error
                    setError('unable to create todo item');
                }
            }).catch(()=>{
                setError('unable to create todo item');
            })
        }
    }

    useEffect(()=>{
        getItems()
    },[])

    const getItems = () =>{
        fetch(apiUrl + '/todos').then((res)=>{
            return res.json()
        }).then(res=>setTodos(res))
    }
    console.log(apiUrl + "/todos"+editingId)
    const handleUpdate = ()=>{
        setError('')
        // check inputs
        if(editTitle.trim() !== '' || editDescription.trim()  !== ''){

            fetch(apiUrl + "/todos/"+editingId , {
                method: "PUT" ,
                headers : {
                    'content-Type' : 'application/json'
                },
                body: JSON.stringify({title :editTitle, description:editDescription})
            } ).then((res) => {
                if(res.ok){
                    // update item to list
                    const updateItems = todos.map((item)=>{
                        if(item._id === editingId){
                            item.title = editTitle;
                            item.description =editDescription;
                        }
                        return item;
                    })
                    setTodos(updateItems);
                    setSuccess('Item updated Successfully');
                    setEditDescription('');
                    setEditTitle('');
                    setTimeout(() => {
                        setSuccess('');
                    } , 3000)
                    setEditingId(-1);
                }else{
                    // set error
                    setError('unable to create todo item');
                }
            }).catch(()=>{
                setError('unable to create todo item');
            })
        }
    }

    const handleEdit = (item)=>{
        setEditingId(item._id);
        setEditTitle(item.title);
        setEditDescription(item.description)
    }

    const handleEditCancel = ()=>{
        setEditingId(-1)
    }

    const handleDelete =(id)=>{
        if(window.confirm("Yor are sure to delete this field")){
            fetch( apiUrl + "/todos/" + id,{
                method : 'DELETE'
            }).then(()=>{
                const updateTodos = todos.filter((item)=> item._id !== id);
                setTodos(updateTodos);
            })


        }
    }

    return(<>
    
        <div className="row p-3 bg-success text-light">
            <h1>Todo List Using MERN Stack </h1>
        </div>
        <div className="row">
            <h3>Add Item</h3>
            {success && <p className="text-success">{success}</p>}
            <div className="from-group d-flex gap-2">
                <input type="text" className="from-control" placeholder="Title" value={title} onChange={ (e)=>setTitle(e.target.value)}/>
                <input type="text" className="from-control" placeholder="Description"  value={description} onChange={ (e)=>setDescription(e.target.value)}/>
                <button className="btn btn-dark" onClick={ handleSubmit }>Submit</button>
            </div>
            {error && <p className='text-danger'>{error}</p>}

            <div className='row mt-3'>
                <h3>Tasks</h3>
                <div className='col-md-6'>
                    <ul className='list-group'>
                        {
                            todos.map((item)=> <li className='list-group-item bg-info align-items-center d-flex justify-content-between my-2'>
                            <div className='d-flex flex-column'>
                                {
                                    editingId === -1 || editingId !== item._id? <>
                                        <span className='fw-bold'>{item.title}</span>
                                        <span >{item.description}</span>
                                    </> 
                                    :
                                    <>
                                        <div className="from-group d-flex gap-2">
                                            <input type="text" className="from-control" placehoder="Title" value={editTitle} onChange={ (e)=>setEditTitle(e.target.value)}/>
                                            <input type="text" className="from-control" placehoder="Description"  value={editDescription} onChange={ (e)=>setEditDescription(e.target.value)}/>
                                        </div>
                                    </>
                                }
                            </div>
                            <div  className='d-flex gap-2'>
                                {editingId === -1 || editingId !== item._id ?
                                    <button className='btn btn-warning'onClick={ ()=>handleEdit(item) }>Edit</button>
                                    :
                                    <button className='btn btn-warning'onClick={ handleUpdate }>Update</button>

                                }
                                {editingId === -1 || editingId !== item._id ?
                                    <button className='btn btn-danger' onClick={()=>handleDelete(item._id)}>Delete</button>
                                    :
                                    <button className='btn btn-danger' onClick={handleEditCancel}>Cancel</button>
                                    }
                            </div>
                        </li>
                            )
                        }
                    
                    </ul>
                </div>
            </div>
        </div>
    
    </>)
}
