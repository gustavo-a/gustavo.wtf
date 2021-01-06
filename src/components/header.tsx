import React from 'react'

import Logo from '@components/shared/logo'
import Menu from '@components/shared/menu/menu'
import MenuItem from '@components/shared/menu/menuItem'
import DarkModeButton from '@components/shared/darkModeButton/index'

const Header: React.FC = () => (
  <header>
    <div className="container px-4 py-4">
      <div className="flex flex-wrap justify-between items-center">
        <Logo />

        <div className="flex items-center">
          <Menu className="mr-4">
            <MenuItem link="/" name="home" />
            <MenuItem link="/sobre" name="sobre mim" />
            <MenuItem link="/contato" name="contato" />
          </Menu>

          <DarkModeButton />
        </div>
      </div>
    </div>
  </header>
)

export default Header
