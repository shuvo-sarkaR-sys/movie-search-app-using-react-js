import React, { useState } from 'react'

const Search = (props) => {
  const [searchValue, setSearchValue] = useState("")
    const handleChange =(e)=>{
      setSearchValue(e.target.value);
    }
    const resetInput =()=>{
      setSearchValue("")
    }
    const handleSubmit =(e)=>{
      e.preventDefault();
      props.search(searchValue)
      resetInput();
    }
  return (
    <form className=' relative bottom-10 left-[450px]'>

      <input className='border-2' type="text" onChange={handleChange} value={searchValue} />
    <input className='bg-slate-500 text-white p-1 rounded-md' onClick={handleSubmit} type="submit" value="SEARCH" />
    </form>
  )
}

export default Search
