import { useState } from 'react'
import './App.css'

function App() {

  const [task,setTask] = useState("")
  const [tasks, setTasks] = useState([])

  const addTask = () => {
    setTasks([...tasks,task])
    setTask("")
  }

  const deleteTask = (deleteItem) => {
    const listAfterDelete = tasks.filter(task => task!==deleteItem)
    setTasks(listAfterDelete)
  }

  return (
  
    <>
      <div id="container">
        <h3>Todo</h3>
      <form>
        <input type="text"
        placeholder='Add new task'
        value={task}
        onChange={e => setTask(e.target.value)}
        onKeyDown={e => {if (e.key === "Enter") {
        e.preventDefault()
        addTask()
        }
        }} />
      </form>
      <ul>{tasks.map(task => (
        <li>
          {task}
          <button className='delete-button' onClick={() => deleteTask(task)}>
          delete
          </button>
        </li>
      ))}</ul>
      </div>
    </>
  )
}

export default App
