import React from 'react';
import '../styles/Student.css';

const Student = ({student, select}) => {
  return (<div onClick={() => select(student)} className="student" >
            <h4 className="studentName">{student.name}</h4>
          </div>)
}

export default Student