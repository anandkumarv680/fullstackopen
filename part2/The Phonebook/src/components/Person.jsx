
const Person = ({ persons, filter, deletePerson }) => {
  return (
    <>
      {persons
        .filter(p =>
          p.name.toLowerCase().includes(filter.toLowerCase())
        )
        .map(p => (
          <div key={p.id}>
            {p.name} {p.number}
            <button onClick={() => deletePerson(p)}>
              delete
            </button>
          </div>
        ))}
    </>
  )
}

export default Person
