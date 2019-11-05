
import React from 'react';
import AdviceContent from '../content/AdviceContent';
import { Accordion } from 'semantic-ui-react'

// <h1>Let me give you some advice, it's me Advice!</h1>

const Content = () => (
    <Accordion defaultActiveIndex={[]} panels={AdviceContent.adviceContent} exclusive={false} />
  )


export default Content;