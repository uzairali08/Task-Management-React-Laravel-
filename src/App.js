import { BrowserRouter, Route, Routes } from 'react-router-dom';
import './App.css';
import Home from './Home';
import RegisterForm from './Forms/RegisterForm';
import LoginForm from './Forms/LoginForm';
import TaskCreationForm from './Forms/TaskCreationForm';
import HeaderNavbar from './HeaderNavbar';
import Protected from './Protected Routing/Protected';
import AllTasks from './AllTasks';
import MyTasks from './MyTasks';
import EditTask from './Forms/EditTask';
import CompletedTasks from './CompletedTasks';

function App() {
  
  return (
    <BrowserRouter>
    <HeaderNavbar />
    <Routes>
      {/* Home page */}
      <Route path="/" element={<Home />} />
      <Route path="/Home" element={<Home />} />

      {/* Register and Login Page routes */}
      <Route path="/Register" element={<RegisterForm />} />
      <Route path="/Login" element={<LoginForm />} />

      {/* Task Creation and Assignment Form  */}
      <Route path="/TaskCreation" element={<Protected Component={TaskCreationForm} />} />

      {/* All Tasks  */}
      <Route path="/AllTasks" element={<Protected Component={AllTasks} />} />

      {/* Current User Tasks  */}
      <Route path="/MyTasks" element={<Protected Component={MyTasks} />} />

      {/* Edit Tasks  */}
      <Route path="/EditTask/:taskId" element={<Protected Component={EditTask} />} />

      {/* Completed Tasks  */}
      <Route path="/CompletedTasks" element={<Protected Component={CompletedTasks} />} />
      
    </Routes>
    </BrowserRouter>
  );
}

export default App;
