import React from 'react'

const sidebar = ({ children }: { children: React.ReactNode[] }) => {
  return (
    <div className="sticky top-4">
      {children.map(child => (
        <div className="mb-4">{child}</div>
      ))}
    </div>
  )
}

export default sidebar
