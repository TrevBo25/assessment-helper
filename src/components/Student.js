import React from 'react';

const Student = ({student, select}) => {
  return (<li onClick={() => select(student)}>{student.name}</li>)
}

export default Student