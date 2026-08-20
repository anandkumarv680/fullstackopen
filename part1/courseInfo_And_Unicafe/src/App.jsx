import { useState } from "react"

const Button = ({onClick, text}) =>{
  return(
    <button onClick={onClick}>{text}</button>
  );
};

const Statistics = ({good,bad,neutral}) =>{
  const all = good + neutral + bad;
  if(all === 0){
    return(
      <p>No feedback given</p>
    );
  }
  const average = (good - bad) / all;
  const positive = (good/all) * 100;
  
  return(
    <>
    <table>
      <tbody>
        <StatisticLine text="good" value={good}></StatisticLine>
        <StatisticLine text="bad" value={bad}></StatisticLine>
        <StatisticLine text="neutral" value={neutral}></StatisticLine>
        <StatisticLine text="all" value={all}></StatisticLine>
        <StatisticLine text="average" value={average}></StatisticLine>
        <StatisticLine text="positive" value={`${positive} %`}></StatisticLine>
      </tbody>
    </table>
    </>
  );
};

const StatisticLine = ({text,value}) =>{
  return(
    <tr>
      <td>{text}</td>
      <td>{value}</td>
    </tr>
  );
};

const App = () => {
  const [good, setGood] = useState(0);
  const [neutral, setNeutral] = useState(0);
  const [bad, setBad] = useState(0);
  return (
    <>
    <div>
      <h1>Give FeedBack</h1>
      <Button onClick={()=>setGood(good + 1)} text="good"></Button>
      <Button onClick={()=>setNeutral(neutral + 1)} text="neutral"></Button>
      <Button onClick={()=>setBad(bad + 1)} text="bad"></Button>
    </div>
    <div>
      <h1>Statistics</h1>
      <Statistics good={good} bad={bad} neutral={neutral}></Statistics>
    </div>
    </>
  )
}

export default App