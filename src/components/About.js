//import React, { Component } from 'react';
import React from 'react';
import AboutContent from '../content/AboutContent';
import { Accordion } from 'semantic-ui-react'

//                 <h1>Haven't you heard? Everyone's talking about, About!</h1>


  
  const Content = () => (
    <Accordion defaultActiveIndex={[]} panels={AboutContent.aboutContent} exclusive={false} />
  )


export default Content;
