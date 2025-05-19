import './App.css'
import { Navbar } from './components/common/navbar'
import { AppContainer } from './components/common/container/app container/component'
import { TasksContainer } from './components/task/taskscontainer/component/TasksContainer'

function App() {
  return (
    <>
      <Navbar title='Task Manager'/>
      <AppContainer>
        <TasksContainer />
      </AppContainer>
    </>
  )
}

export default App