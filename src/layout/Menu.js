import ArrowRight from '@mui/icons-material/ArrowRight'
import DashboardIcon from '@mui/icons-material/Dashboard'
import FileDownloadRounded from '@mui/icons-material/FileDownloadRounded'
import JobIcon from '@mui/icons-material/Gavel'
import BlankIcon from '@mui/icons-material/Loyalty'
import AdminIcon from '@mui/icons-material/Settings'
import ItemIcon from '@mui/icons-material/ViewStream'
import { Divider, MenuItem, Popover } from '@mui/material'
import { useState } from 'react'
import { Link, Menu } from 'react-admin'

export default () => {
  const [menuJobs, setMenuJobs] = useState(null)
  const [menuBlanks, setMenuBlanks] = useState(null)
  const [menuItems, setMenuItems] = useState(null)
  const [menuAdmin, setMenuAdmin] = useState(null)

  return (
    <Menu className='menu'>
      <MenuItem className='link'>
        <Link to='/'>
          <DashboardIcon />
          <span>Dashboard</span>
        </Link>
      </MenuItem>

      <Divider style={{ margin: '0' }} />
    
      <MenuItem className='link'>
        <Link to='/spreadsheet'>
          <FileDownloadRounded />
          <span>Spreadsheet</span>
        </Link>
      </MenuItem>

      <Divider style={{ margin: '0' }} />

      <MenuItem
        className='link'
        aria-describedby={Boolean(menuJobs) ? 'menu-jobs' : undefined}
        onClick={(e) => setMenuJobs(e.currentTarget)}
      >
        <Link>
          <JobIcon />
          <span>Jobs</span>
          <ArrowRight style={{ marginLeft: 'auto' }}/>
        </Link>
      </MenuItem>
      <Popover
        className='popover'
        id={Boolean(menuJobs) ? 'menu-jobs' : undefined}
        open={Boolean(menuJobs)}
        anchorEl={menuJobs}
        onClose={() => setMenuJobs(null)}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <MenuItem className='link'>
          <Link to='job_listings'>
            Listing
          </Link>
        </MenuItem>
        <MenuItem className='link'>
          <Link to='screens'>
            Screen
          </Link>
        </MenuItem>
      </Popover>
  
      <Divider style={{ margin: '0' }} />

      <MenuItem
        className='link'
        aria-describedby={Boolean(menuBlanks) ? 'menu-blanks' : undefined}
        onClick={(e) => setMenuBlanks(e.currentTarget)}
      >
        <Link>
          <BlankIcon />
          <span>Blanks</span>
          <ArrowRight style={{ marginLeft: 'auto' }}/>
        </Link>
      </MenuItem>
      <Popover
        className='popover'
        id={Boolean(menuBlanks) ? 'menu-blanks' : undefined}
        open={Boolean(menuBlanks)}
        anchorEl={menuBlanks}
        onClose={() => setMenuBlanks(null)}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <MenuItem className='link'>
          <Link to='blanks'>
            Listing
          </Link>
        </MenuItem>
        <MenuItem className='link'>
          <Link to='blank_jobs'>
            Jobs
          </Link>
        </MenuItem>
        <MenuItem className='link'>
          <Link to='blank_types'>
            Types
          </Link>
        </MenuItem>
      </Popover>
  
      <Divider style={{ margin: '0' }} />

      <MenuItem
        className='link'
        aria-describedby={Boolean(menuItems) ? 'menu-items' : undefined}
        onClick={(e) => setMenuItems(e.currentTarget)}
      >
        <Link>
          <ItemIcon />
          <span>Items</span>
          <ArrowRight style={{ marginLeft: 'auto' }}/>
        </Link>
      </MenuItem>
      <Popover
        className='popover'
        id={Boolean(menuItems) ? 'menu-items' : undefined}
        open={Boolean(menuItems)}
        anchorEl={menuItems}
        onClose={() => setMenuItems(null)}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        <MenuItem className='link'>
          <Link to='items'>
            Listing
          </Link>
        </MenuItem>
        <MenuItem className='link'>
          <Link to='item_jobs'>
            Jobs
          </Link>
        </MenuItem>
        <MenuItem className='link'>
          <Link to='boxes'>
            Boxes
          </Link>
        </MenuItem>
        <MenuItem className='link'>
          <Link to='item_types'>
            Types
          </Link>
        </MenuItem>
      </Popover>
  
      <Divider style={{ margin: '0' }} />

      { localStorage.getItem('role') === 'admin' &&
        <div>
          <MenuItem
            className='link'
            aria-describedby={Boolean(menuAdmin) ? 'menu-blanks' : undefined}
            onClick={(e) => setMenuAdmin(e.currentTarget)}
          >
            <Link>
              <AdminIcon />
              <span>Admin</span>
              <ArrowRight style={{ marginLeft: 'auto' }}/>
            </Link>
          </MenuItem>
          <Popover
            className='popover'
            id={Boolean(menuAdmin) ? 'menu-blanks' : undefined}
            open={Boolean(menuAdmin)}
            anchorEl={menuAdmin}
            onClose={() => setMenuAdmin(null)}
            anchorOrigin={{
              vertical: 'top',
              horizontal: 'right',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'left',
            }}
          >
            <MenuItem className='link'>
              <Link to='users'>
                Users
              </Link>
            </MenuItem>
            <MenuItem className='link'>
              <Link to='app_constants'>
                Global
              </Link>
            </MenuItem>
          </Popover>
        </div>
      }
    </Menu>
  )
}