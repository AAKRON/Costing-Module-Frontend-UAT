import { Admin, Resource } from 'react-admin'
import Dashboard from './layout/Dashboard'
import Menu from './layout/Menu'
import authClient from './providers/authClient'
import restClient from './providers/restClient'
import { JobCreate, JobEdit, JobList } from './resources/job'

const App = () => (
  <Admin
    title="Aakron Costing Module"
    authProvider={authClient}
    dataProvider={restClient}
    dashboard={Dashboard}
    menu={Menu}
  >
    <Resource
      name="job_listings"
      list={JobList}
      edit={JobEdit}
      create={JobCreate}
    />
  </Admin>
);

export default App;