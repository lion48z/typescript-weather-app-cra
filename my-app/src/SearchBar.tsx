import { useState } from 'react'

const SearchBar = () => {
    const [search, setSearch] = useState('')
  return (
    <div>
        <input type="text"className="form-control" placeholder="Enter location" />
        <button type="button" className="btn btn-primary"onClick={() => console.log('Search clicked')}>Search</button>
    </div>
  )
}

export default SearchBar

