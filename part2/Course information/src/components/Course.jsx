const Header = (props) => <h1>{props.course}</h1>

const Content = (props) => (
  <div>
    <Part part={props.parts[0]} />
    <Part part={props.parts[1]} />
    <Part part={props.parts[2]} />
    <Part part={props.parts[3]} />
  </div>
)

const Content2 = (props) => (
  <div>
    <Part part={props.parts[0]} />
    <Part part={props.parts[1]} />
  </div>
)



const Part = (props) => (
  <p>
    {props.part.name} {props.part.exercises}
  </p>
)

const Total = ({ sum }) => <h4>Number of {sum} exercises </h4>

const Course = ({ course }) => {
  const sum = (c) => c.parts.reduce((prev, curr) => prev + curr.exercises, 0)


  return (
    <>
      <div>
        <Header course={course[0].name} />
        <Content parts={course[0].parts} />
        <Total sum={sum(course[0])} />
        <Header course={course[1].name} />
        <Content2 parts={course[1].parts} />
        <Total sum={sum(course[1])} />
      </div>
    </>
  )
}

export default Course;