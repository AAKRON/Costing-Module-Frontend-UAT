import { AppBar as ComponentAppBar, TitlePortal } from 'react-admin'

const AppBar = () =>  {
  return (
    <ComponentAppBar color='primary'>
      <TitlePortal />

      <span>
        Database: {localStorage.getItem('db')}
      </span>
    </ComponentAppBar>
  )
}

export default AppBar