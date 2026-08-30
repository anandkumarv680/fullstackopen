const PersonForm = ({userName,addNumber,number,addUser,newName}) => {
    return(
        <>
        name: <input onChange={userName} value={newName} />
        number : <input type="number" onChange={addNumber} value={number} />
        <button type="submit" onClick={addUser}>add</button>
        </>
    )
}

export default PersonForm