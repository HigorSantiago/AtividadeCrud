
import React, {useState} from 'react';
import './App.css'
import "../node_modules/bootstrap/dist/css/bootstrap.min.css";
import { Routes, Route, Link, useNavigate } from "react-router-dom";

import Home from './components/Home';
import About from './components/About';

import CreateStudent from './components/crud/student/CreateStudent';
import ListStudent from './components/crud/student/ListStudent';
import EditStudent from './components/crud/student/EditStudent';

import CreateProfessor from './components/crud/professor/CreateProfessor';
import ListProfessor from './components/crud/professor/ListProfessor';
import EditProfessor from './components/crud/professor/EditProfessor';

import FirebaseContext from "./utils/FirebaseContext";
import FirebaseUserService from "./services/FirebaseUserService";

import { NavDropdown } from 'react-bootstrap';

const AppPage = () =>
  <FirebaseContext.Consumer>
    {(firebase) => <App firebase={firebase} />}
  </FirebaseContext.Consumer>

function App(props){
  const [logged, setLogged] = useState(false)
  const navigate = useNavigate()

  const renderUserLogoutButton = () => {
    if (props.firebase.getUser() != null)
      return (
    	<div style={{ marginRight: 20, color: "dark" }}>
          Ola, higorsantiago@gmail.com
          <button className='btn btn-warning' style={{ marginLeft: 10}} onClick={() => logout()} >Logout</button>
        </div>
      )
    return
  }

  const logout = () => {
    if (props.firebase.getUser() != null) {
      FirebaseUserService.logout(
        props.firebase.getAuthentication(),
        (res) => {
          if (res) {
            props.firebase.setUser(null)
            setLogged(false)
            navigate('/')
          }
        }
      )
    }
  }

  return (
    <div className='container'>
      <nav className='navbar navbar-expand-lg navbar-light bg-light'>
        <Link to="/" className="navbar-brand" style={{ paddingLeft: 20 }}>CRUD</Link>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav mr-auto">
            <li className="navitem"><Link to="/" className="nav-link" >Home</Link></li>
            <li className="navitem"><Link to="about" className="nav-link">Sobre</Link></li>
            <NavDropdown title="Estudante" id="navbarScrollingDropdown">
              <NavDropdown.Item><Link to="createStudent" className="btn" style={{ paddingLeft: 0 }}>Criar Estudante</Link></NavDropdown.Item>
              <NavDropdown.Item><Link to="listStudent" className="btn" style={{ paddingLeft: 0 }}>Listar Estudante</Link></NavDropdown.Item>
            </NavDropdown>
            <NavDropdown title="Professor" id="navbarScrollingDropdown">
              <NavDropdown.Item><Link to="createProfessor" className="btn" style={{ paddingLeft: 0 }}>Criar Professor</Link></NavDropdown.Item>
              <NavDropdown.Item><Link to="listProfessor" className="btn" style={{ paddingLeft: 0 }}>Listar Professor</Link></NavDropdown.Item>
            </NavDropdown>
            {}
          </ul>
        </div>
        {renderUserLogoutButton()}

      </nav>
      <Routes>
        <Route path="/" element={<Home setLogged={setLogged} />} />
        <Route path="about" element={<About />} />
        <Route path="createStudent" element={<CreateStudent />} />
        <Route path="listStudent" element={<ListStudent />} />
        <Route path="editStudent/:id" element={<EditStudent />} />
        <Route path="createProfessor" element={<CreateProfessor />} />
        <Route path="listProfessor" element={<ListProfessor />} />
        <Route path="editProfessor/:id" element={<EditProfessor />} />
      </Routes>
    </div>
  )
}

export default AppPage;