import './App.css';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'bootstrap/dist/js/bootstrap.bundle.min';
import Navbar from './components/Navbar';
import { BrowserRouter ,Routes, Route } from 'react-router-dom';
import Home from'./components/Home'
import ProblemList from './components/ProblemList';
import Login from './components/Login';
import SignUp from './components/SignUp';
import Workspace from './components/Workspace';
import Submission from './components/Submission';
import PrivateComponent from './components/PrivateComponent';
import AddQuestions from './components/AddQuestions';


function App() {
  return (
    <div>
     <BrowserRouter>
     <Navbar/>
    <Routes>
     <Route element={<PrivateComponent/>}>
    <Route path="/" element={<Home/>} />
    <Route path="/problemList" element={<ProblemList/>} />
    <Route path="/editor" element={<Workspace/>}/>
    <Route path="/submission" element={<Submission/>}/>
    <Route path="/questions" element={<AddQuestions/>}/>
    </Route>

    <Route path="/register" element={<SignUp/>} />
    <Route path="/login" element={<Login/>} />


    </Routes>
     </BrowserRouter>
   
     
    </div>
  );
}

export default App;
