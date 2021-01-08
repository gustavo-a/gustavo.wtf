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
