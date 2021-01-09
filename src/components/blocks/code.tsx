import React from 'react'
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter'
import { dracula } from 'react-syntax-highlighter/dist/esm/styles/prism'

interface Props {
  language: string
  children: React.ReactNode
}

const codeBlock: React.FC<Props> = ({ language, children }) => (
  <SyntaxHighlighter
    style={dracula}
    language={language}
    showLineNumbers={false}
  >
    {children}
  </SyntaxHighlighter>
)

export default codeBlock

export const getLanguage = node => {
  if (node.attribs.class != null) {
    return node.attribs.class.replace('wp-block-code ', '')
  }
  return null
}

export const getCode = node => {
  if (node.children.length > 0 && node.children[0].name === 'code') {
    return node.children[0].children
  } else {
    return node.children
  }
}
