import React from 'react';
import '../styles/Assessment.css';

const Assessment = ({assessment, select}) => {
  return (<div onClick={() => select(assessment)} className="assessment" ><h3 className="assessmentName">{assessment.name}</h3></div>)
}

export default Assessment