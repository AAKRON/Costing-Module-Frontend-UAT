// import FinalCalcIcon from '@mui/icons-material/AccountBalanceWallet'
import ArrowRight from '@mui/icons-material/ArrowRight'
// import CostCalcIcon from '@mui/icons-material/Build'
import BomIcon from '@mui/icons-material/ChromeReaderMode'
import DashboardIcon from '@mui/icons-material/Dashboard'
import RawMaterialIcon from '@mui/icons-material/Dns'
import FileDownloadRounded from '@mui/icons-material/FileDownloadRounded'
import JobIcon from '@mui/icons-material/Gavel'
import BlankIcon from '@mui/icons-material/Loyalty'
import AdminIcon from '@mui/icons-material/Settings'
import ItemIcon from '@mui/icons-material/ViewStream'
import { Divider, MenuItem, Popover } from '@mui/material'
import { useState } from 'react'
import { Link, Menu } from 'react-admin'
import { isAdmin } from '../helpers/functions'

export default () => {
  const [menuJobs, setMenuJobs] = useState(null)
  const [menuBlanks, setMenuBlanks] = useState(null)
  const [menuItems, setMenuItems] = useState(null)
  const [menuBillMaterials, setMenuBillMaterials] = useState(null)
  const [menuRawMaterial, setMenuRawMaterial] = useState(null)
  const [menuAdmin, setMenuAdmin] = useState(null)

  const Option = ({
    icon,
    to,
    label
  }) => (
    <MenuItem className='link'>
      <Link to={to}>
        {icon}
        <span>{label}</span>
      </Link>
    </MenuItem>
  )

  const OptionWithSubmenu = ({
    icon,
    label,
    nameMenu,
    targetMenu,
    onTargetMenu,
    options,
  }) => (
    <div>
      <MenuItem
        className='link'
        aria-describedby={Boolean(targetMenu) ? nameMenu : undefined}
        onClick={(e) => onTargetMenu(e.currentTarget)}
      >
        <Link>
          {icon}
          <span>{label}</span>
          <ArrowRight style={{ marginLeft: 'auto' }}/>
        </Link>
      </MenuItem>
      <Popover
        className='popover'
        id={Boolean(targetMenu) ? nameMenu : undefined}
        open={Boolean(targetMenu)}
        anchorEl={targetMenu}
        onClose={() => onTargetMenu(null)}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'right',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
      >
        {options?.map((option, index) => (
          <MenuItem className='link' key={index}>
            <Link to={option.to}>
              {option.label}
            </Link>
          </MenuItem>
        ))}
      </Popover>
    </div>
  )

  return (
    <Menu className='menu'>
      {
        Option({
          icon: <DashboardIcon />,
          to: '/',
          label: 'Dashboard'
        })
      }
      <Divider style={{ margin: '0' }} />
  
      {
        Option({
          icon: <FileDownloadRounded />,
          to: '/spreadsheet',
          label: 'Spreadsheet'
        })
      }
      <Divider style={{ margin: '0' }} />

      {
        OptionWithSubmenu({
          icon: <JobIcon />,
          label: 'Jobs',
          nameMenu: 'menu-jobs',
          targetMenu: menuJobs,
          onTargetMenu: setMenuJobs,
          options: [
            { to: 'job_listings', label: 'Listing' },
            { to: 'screens', label: 'Screen' },
          ]
        })
      }
      <Divider style={{ margin: '0' }} />

      {
        OptionWithSubmenu({
          icon: <BlankIcon />,
          label: 'Blanks',
          nameMenu: 'menu-blanks',
          targetMenu: menuBlanks,
          onTargetMenu: setMenuBlanks,
          options: [
            { to: 'blanks', label: 'Listing' },
            { to: 'blank_jobs', label: 'Jobs' },
            { to: 'blank_types', label: 'Types' },
          ]
        })
      }
      <Divider style={{ margin: '0' }} />

      {
        OptionWithSubmenu({
          icon: <ItemIcon />,
          label: 'Items',
          nameMenu: 'menu-items',
          targetMenu: menuItems,
          onTargetMenu: setMenuItems,
          options: [
            { to: 'items', label: 'Listing' },
            { to: 'item_jobs', label: 'Jobs' },
            { to: 'boxes', label: 'Boxes' },
            { to: 'item_types', label: 'Types' },
          ]
        })
      }
       <Divider style={{ margin: '0' }} />

      {
        OptionWithSubmenu({
          icon: <BomIcon />,
          label: 'Bill of Materials',
          nameMenu: 'menu-bill-materials',
          targetMenu: menuBillMaterials,
          onTargetMenu: setMenuBillMaterials,
          options: [
            { to: 'blanks_listing_item_with_costs', label: 'Listing Item with Cost' },
            { to: 'blanks_listing_by_items', label: 'Listing By Item' },
          ]
        })
      }
      <Divider style={{ margin: '0' }} />

      {
        OptionWithSubmenu({
          icon: <RawMaterialIcon />,
          label: 'Raw Material',
          nameMenu: 'menu-raw-material',
          targetMenu: menuRawMaterial,
          onTargetMenu: setMenuRawMaterial,
          options: [
            { to: 'raw_materials', label: 'Listing' },
            { to: 'colors', label: 'Colors' },
            { to: 'units_of_measures', label: 'Units of Measure' },
            { to: 'rawmaterialtypes', label: 'Types' },
            { to: 'vendors', label: 'Vendor' },
          ]
        })
      }{/*
      <Divider style={{ margin: '0' }} />
    
      {
        Option({
          icon: <FinalCalcIcon />,
          to: '/final_calculations',
          label: 'Final Calc (P)'
        })
      }
      <Divider style={{ margin: '0' }} />

      {
        Option({
          icon: <CostCalcIcon />,
          to: '/cost_calculator/create',
          label: 'Cost Calculator (P)'
        })
      } */}
      <Divider style={{ margin: '0' }} />
  
      { isAdmin() && 
        <div>
          {
            OptionWithSubmenu({
              icon: <AdminIcon />,
              label: 'Admin',
              nameMenu: 'menu-admin',
              targetMenu: menuAdmin,
              onTargetMenu: setMenuAdmin,
              options: [
                { to: 'users', label: 'Users' },
                { to: 'app_constants', label: 'Global' },
              ]
            })
          }
        </div>
      }
    </Menu>
  )
}