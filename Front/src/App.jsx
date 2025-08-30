import { useState } from 'react'
import axios, { all } from 'axios'
import './App.css'
import Row from '../components/Row'
import { useEffect } from 'react'

const url = "http://localhost:3001"


function App() {

  const [task,setTask] = useState("")
  const [tasks, setTasks] = useState([])

  useEffect(() => {
    axios.get(url).then(response => {
      setTasks(response.data)
    })
      .catch(error => {
        alert(error.response.data ? error.response.data.message : error)
      })
  },[])

  const addTask = () => {
    const newTask = {description: task}

    axios.post(url + "/create", {task: newTask}).then(response => {
      setTasks([...tasks,response.data])
      setTask("")
    }).catch(error => {
      alert(error.response ? error.response.data.error.message : error)
    })
  }

  const deleteTask = (deleteItem) => {
    axios.delete(url + "/delete/" + deleteItem).then(response => {
      setTasks(tasks.filter(item => item.id !== deleteItem))
    }).catch(error => {
      alert(error.response ? error.response.data.error.message : error)
    })
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
        <Row item={task} key={task.id} deleteTask={deleteTask}></Row>
      ))}</ul>
      </div>
    </>
  )
}

export default App
