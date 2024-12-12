'use client'
 
import { useState, useEffect } from 'react'
 
export function Mdxs() {
  const [mdxs, setData] = useState([])
 
  useEffect(() => {
    async function fetchPosts() {
      const res = await fetch('https://api.oneblock.vn/be/mdx/')
      const data = await res.json()
      console.log(data);
      setData(data)
    }
    fetchPosts()
  }, [])
  

   // Handle delete
   const handleDelete = async (id:number) => {
    try {
      await fetch(`http://103.82.133.178:8080/be/mdx/1/${id}`, {
        method: "delete",
      });
      // Remove the deleted item from the state
      setData((mdxs) => mdxs.filter(item => item.id !== id));
    } catch (error) {
      console.error('Error deleting item:', error);
    }
  };

  // Handle edit
  const handleEdit = (id:number) => {
    alert(`Edit item with ID: ${id}`);
    // Implement edit functionality here
  };
 
  if (!mdxs || mdxs.length == 0) return <div>Loading...</div>
 
  return (
    <div>
    <h1>Data List</h1>
    <table id="customers">
      <thead>
        <tr>
          <th>ID</th>
          <th>Name</th>
          <th></th>
          <th></th>
        </tr>
      </thead>
      <tbody>
        {mdxs.map((item) => (
          <tr key={item.id}>
            <td>{item.id}</td>
            <td>{item.name}</td>
            <td>
              <button onClick={() => handleEdit(item.id)}>Edit</button>
            </td>
            <td><button onClick={() => handleDelete(item.id)}>Delete</button></td>
          </tr>
        ))}
      </tbody>
    </table>
  </div>
  )
}