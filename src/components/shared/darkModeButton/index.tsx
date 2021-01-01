import React, { useState } from 'react'

import styles from './style.module.css'

const darkModeButton: React.FC = () => {
  const [icon, setIcon] = useState('moon')

  function toggleColorMode(
    e: React.MouseEvent<HTMLButtonElement, MouseEvent>
  ): void {
    e.preventDefault()

    if (
      !localStorage.getItem('theme') ||
      localStorage.getItem('theme') === 'light'
    ) {
      localStorage.theme = 'dark'
      document.querySelector('html')?.classList.add('dark')
      setIcon('sun')
    } else {
      localStorage.theme = 'light'
      document.querySelector('html')?.classList.remove('dark')
      setIcon('moon')
    }
  }

  return (
    <button
      data-a11y="false"
      aria-label="Ativar modo escuro"
      title="Ativar modo escuro"
      className={`${styles.darkMode} ${styles[icon]}`}
      onClick={e => toggleColorMode(e)}
    >
      <div className={styles.darkMode__inner}></div>
      <div className={styles.darkMode__outer}></div>
    </button>
  )
}

export default darkModeButton
