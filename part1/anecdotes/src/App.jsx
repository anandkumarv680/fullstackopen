import { useState } from 'react'

const Anecdote = ({prop, selected, value}) =>{
  return(
  <>
  <div>{prop[selected]}</div>
  <p>Has {value[selected]} votes</p>
  </>)
}
const Max = ({prop,value}) =>{
  const maxVotes = Math.max(...Object.values(value))
  const maxIndex = Object.keys(value).find(key => value[key] === maxVotes)
  return(
  <>
  <div>{prop[maxIndex]}</div>
  <p>Has {maxVotes} votes</p>
  </>);
}

function App() {

  const anecdotes = [
    'If it hurts, do it more often.',
    'Adding manpower to a late software project makes it later!',
    'The first 90 percent of the code accounts for the first 90 percent of the development time...The remaining 10 percent of the code accounts for the other 90 percent of the development time.',
    'Any fool can write code that a computer can understand. Good programmers write code that humans can understand.',
    'Premature optimization is the root of all evil.',
    'Debugging is twice as hard as writing the code in the first place. Therefore, if you write the code as cleverly as possible, you are, by definition, not smart enough to debug it.',
    'Programming without an extremely heavy use of console.log is same as if a doctor would refuse to use x-rays or blood tests when diagnosing patients.',
    'The only way to go fast, is to go well.'
  ]
   
  const [selected, setSelected] = useState(0)
  const [vote, setVoted] = useState({0:0,1:0,2:0,3:0,4:0,5:0,6:0,7:0});

  return (
    <>
    <h1>Anecdote of the day</h1>
    <Anecdote prop={anecdotes} selected={selected} value={vote}></Anecdote>
    <button onClick={() => setVoted({...vote,[selected] : vote[selected] + 1})}>vote</button>
    <button onClick={() => setSelected(Math.floor(Math.random() * 8))}>next anecdote</button>
    <h1>Anecdote with most votes</h1>
    <Max value={vote} prop={anecdotes}></Max>
    </>
  )
}

export default App
