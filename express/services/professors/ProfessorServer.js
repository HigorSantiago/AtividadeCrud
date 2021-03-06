const professorModel = require('../../models/professors/ProfessorModel')

let professors = [
    {_id:0, name:"Jefferson de Carvalho", university: "Sistemas de Informação",degree:"Graduado"},
    {_id:1, name:"Fulano de Tal", university: "Sistemas de Informação",degree:"Doutorado"},
    {_id:2, name:"Sicrano de Tal", university: "Sistemas de Informação",degree:"Graduado"},
    {_id:3, name:"Beltrano de Tal", university: "Sistemas de Informação",degree:"Pós-Grauado"}
]
let _id = 4

class professorService {

    static create(data) {
        let professor = new professorModel(
            _id++,
            data.name,
            data.university,
            data.degree)
        professors.push(professor)
        return professor
    }
    static retrieve(_id) {
        for (let i = 0; i < professors.length; i++) {
            if (professors[i]._id == _id) {
                return professors[i]
            }
        }
        return {}
    }
    static update(_id, data) {
        for (let s of professors) {
            if (s._id == _id) {
                s.name = data.name
                s.university = data.university
                s.degree = data.degree
                return s
            }
        }
        return null
    }
    static delete(_id) {
        for (let i = 0; i < professors.length; i++) {
            if (professors[i]._id == _id) {
                professors.splice(i, 1)
                return true
            }
        }
        return false
    }
    static list() {
        return professors
    }

}

module.exports = professorService