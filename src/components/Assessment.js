import React from 'react';

const Assessment = ({assessment, select}) => {
  return (<li onClick={() => select(assessment)} >{assessment.name}</li>)
}

export default Assessment