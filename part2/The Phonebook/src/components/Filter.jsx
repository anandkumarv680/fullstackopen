const Filter = ({setFilter}) =>{
  return(
    <>
    filter show with <input type="text" onChange={(event) => setFilter(event.target.value)} />
    </>
  )
}

export default Filter