import ArrowRight from '@mui/icons-material/ArrowRight'
import DashboardIcon from '@mui/icons-material/Dashboard'
import JobIcon from '@mui/icons-material/Gavel'
import { Divider, MenuItem, Popover } from '@mui/material'
import { useState } from 'react'
import { Link } from 'react-admin'

export default () => {
  const [menuJobs, setMenuJobs] = useState(null)

  return (
    <div className='menu'>
      <MenuItem className='link'>
        <Link to='/'>
          <DashboardIcon />
          <span>Dashboard</span>
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
    </div>
  )
}