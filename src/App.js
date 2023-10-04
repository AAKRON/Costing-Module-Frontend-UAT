import React from 'react'
import { Admin, Resource } from 'react-admin'
import Dashboard from './layout/Dashboard'
import Menu from './layout/Menu'
import authClient from './providers/authClient'
import restClient from './providers/restClient'
import { BlankCreate, BlankEdit, BlankList } from './resources/blanks'
import { BlankJobEdit, BlanksJobList } from './resources/blanks_job'
import { JobCreate, JobEdit, JobList } from './resources/job'
import { ScreenCreate, ScreenEdit, ScreenListing } from './resources/screen'

const App = () => (
  <Admin
    title='Aakron Costing Module'
    authProvider={authClient}
    dataProvider={restClient}
    dashboard={Dashboard}
    menu={Menu}
  >
    <Resource
      name='job_listings'
      list={JobList}
      edit={JobEdit}
      create={JobCreate}
    />
    <Resource
      name='screens'
      list={ScreenListing}
      create={ScreenCreate}
      edit={ScreenEdit}
    />

    <Resource
      name='blanks'
      list={BlankList}
      create={BlankCreate}
      edit={BlankEdit}
    />
    <Resource
      name='blank_jobs'
      list={BlanksJobList}
      edit={BlankJobEdit}
    />
  </Admin>
)

export default App;