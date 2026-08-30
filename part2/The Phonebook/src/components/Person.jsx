const Person = ({ persons, filter }) => {
    return (
        <>
            {persons
                .filter(p => p.name.toLowerCase().includes(filter.toLowerCase()))
                .map(p => <p key={p.name}>{p.name} {p.number}</p>)}
        </>
    )
}

export default Person