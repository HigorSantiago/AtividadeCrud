import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
import ProfessorTableRow from "./ProfessorTableRow";
import FirebaseContext from "../../../utils/FirebaseContext";
import FirebaseProfessorService from "../../../services/FirebaseProfessorService";
import RestrictedPage from "../../../utils/RestrictedPage";

const ListProfessorPage = () =>
    <FirebaseContext.Consumer>
        {
            (firebase)=> 
                <RestrictedPage isLogged={firebase.getUser() != null}>
                    <ListProfessor firebase={firebase}/>
                </RestrictedPage>
        }
    </FirebaseContext.Consumer>

function ListProfessor(props) {

    const [professors, setProfessors] = useState([])

    useEffect(
        () => {
           
            FirebaseProfessorService.list_onSnapshot(
                props.firebase.getFirestoreDb(),
                (professors)=>{
  
                    setProfessors(professors)
                }
            )
        }
        ,
        []
    )

    function deleteProfessorById(_id){
        let professorsTemp = professors
        for(let i=0;i<professorsTemp.length;i++){
            if(professorsTemp[i]._id === _id){
               
                professorsTemp.splice(i,1)
            }
        }
        setProfessors([...professorsTemp]) 
      
    }

    function generateTable() {

        if (!professors) return
        return professors.map(
            (professor, i) => {
                return <ProfessorTableRow 
                            professor={professor} 
                            key={i} 
                            deleteProfessorById={deleteProfessorById}
                            firestore={props.firebase.getFirestoreDb()}/>
            }
        )
    }

    return (
        <>
            <main>
                <h2>
                    Listar Professores
                </h2>
                <table className="table table-striped">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Nome</th>
                            <th>Universidade</th>
                            <th>Degree</th>
                            <th colSpan={2} style={{ textAlign: "center" }}></th>
                        </tr>
                    </thead>
                    <tbody>
                        {generateTable()}
                    </tbody>
                </table>
            </main>
            <nav>
                <Link to="/">Home</Link>
            </nav>
        </>
    );
}

export default ListProfessorPage
