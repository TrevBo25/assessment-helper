import React from 'react';
import '../styles/Student.css';

const Student = ({student, select, deleteStudent}) => {
  return (<div className="student">
            <h4 className="studentName" onClick={() => select(student)}>{student.name}</h4>
            <i className="fas fa-trash-alt" onClick={() => deleteStudent(student.id)}></i>
          </div>)
}

export default Student