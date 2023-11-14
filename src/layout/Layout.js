import { Layout as ComponentLayout } from 'react-admin'
import AppBar from './AppBar'
import Menu from './Menu'

const Layout = ({
  children: Children,
  title,
}) => {

  return(
    <ComponentLayout
      appBar={AppBar}
      appBarAlwaysOn
      menu={Menu}
      children={Children}
      title={title}
    />
  )
}

export default Layout