

function SearchBar (props) {
    const handleSearchChange = (event) => {
        props.setSearchBar (event.target.value)
    }
    
    return(
        <>
        <input onChange={handleSearchChange} value={props.SearchBar} placeholder="Busca tus eventos" type="text"/>
    </>
)
}

export default SearchBar