import React from 'react'
import { Admin, Resource } from 'react-admin'
import Dashboard from './layout/Dashboard'
import Menu from './layout/Menu'
import authClient from './providers/authClient'
import restClient from './providers/restClient'
import { BlankTypeCreate, BlankTypeEdit } from './resources/blank_type'
import { BlankTypeListing } from './resources/blank_type/BlankTypeListing'
import { BlankCreate, BlankEdit, BlankList } from './resources/blanks'
import { BlankJobEdit, BlanksJobList } from './resources/blanks_job'
import { BLBICreate, BLBIEdit, BLBIListing } from './resources/blanks_listing_by_item'
import { BLIWCEdit, BLIWCListing } from './resources/blanks_listing_item_with_cost'
import { BoxCreate, BoxEdit, BoxListing } from './resources/box'
import { GlobalVariableEdit } from './resources/global_variable'
import { GlobalVariableCreate } from './resources/global_variable/GlobalVariableCreate'
import { GlobalVariableListing } from './resources/global_variable/GlobalVariableListing'
import { ItemCreate, ItemEdit, ItemList } from './resources/item'
import { ItemJobEdit, ItemJobsList } from './resources/item_job'
import { ItemTypeCreate, ItemTypeEdit, ItemTypeListing } from './resources/item_type'
import { JobCreate, JobEdit, JobList } from './resources/job'
import { ScreenCreate, ScreenEdit, ScreenListing } from './resources/screen'
import Spreadsheet from './resources/spreadsheet'
import { UserCreate, UserEdit, UserListing } from './resources/user'

const App = () => (
  <Admin
    title='Aakron Costing Module'
    authProvider={authClient}
    dataProvider={restClient}
    dashboard={Dashboard}
    menu={Menu}
  >
    <Resource
      name='spreadsheet'
      list={Spreadsheet}
    />

    <Resource
      name='job_listings'
      list={JobList}
      edit={JobEdit}
      create={JobCreate}
    />
    <Resource
      name='screens'
      list={ScreenListing}
      edit={ScreenEdit}
      create={ScreenCreate}
    />

    <Resource
      name='blanks'
      list={BlankList}
      edit={BlankEdit}
      create={BlankCreate}
    />
    <Resource
      name='blank_jobs'
      list={BlanksJobList}
      edit={BlankJobEdit}
    />
    <Resource
      name='blank_types'
      list={BlankTypeListing}
      edit={BlankTypeEdit}
      create={BlankTypeCreate}
    />

    <Resource
      name='items'
      list={ItemList}
      edit={ItemEdit}
      create={ItemCreate}
    />
    <Resource
      name='item_jobs'
      list={ItemJobsList}
      edit={ItemJobEdit}
    />
    <Resource
      name='boxes'
      list={BoxListing}
      edit={BoxEdit}
      create={BoxCreate}
    />
    <Resource
      name='item_types'
      list={ItemTypeListing}
      edit={ItemTypeEdit}
      create={ItemTypeCreate}
    />

    <Resource
      name='blanks_listing_item_with_costs'
      list={BLIWCListing}
      edit={BLIWCEdit}
    />
    <Resource
      name='blanks_listing_by_items'
      list={BLBIListing}
      create={BLBICreate}
      edit={BLBIEdit}
    />

    <Resource
      name='users'
      list={UserListing}
      edit={UserEdit}
      create={UserCreate}
    />
    <Resource
      name='app_constants'
      list={GlobalVariableListing}
      edit={GlobalVariableEdit}
      create={GlobalVariableCreate}
    />
  </Admin>
)

export default App