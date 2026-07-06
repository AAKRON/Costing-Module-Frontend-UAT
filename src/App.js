import React, { useEffect } from 'react'
import { Route } from 'react-router-dom'
import { Admin, CustomRoutes, Resource, nanoLightTheme } from 'react-admin'
import { createTheme } from '@mui/material/styles'
import Dashboard from './layout/Dashboard'
import Layout from './layout/Layout'
import authClient from './providers/authClient'
import restClient from './providers/restClient'
import YearManagement from './pages/YearManagement'
import { BlankTypeCreate, BlankTypeEdit } from './resources/blank_type'
import { BlankTypeListing } from './resources/blank_type/BlankTypeListing'
import { BlankCreate, BlankEdit, BlankList } from './resources/blanks'
import { BlankJobEdit, BlanksJobList } from './resources/blanks_job'
import { BLBICreate, BLBIEdit, BLBIListing } from './resources/blanks_listing_by_item'
import { BLIWCListing } from './resources/blanks_listing_item_with_cost'
import { BoxCreate, BoxEdit, BoxListing } from './resources/box'
import { ColorCreate, ColorEdit, ColorList } from './resources/color'
import { CostCalCulatorCreate } from './resources/cost_calculator'
import { FinalCalculationCreate, FinalCalculationEdit, FinalCalculationList } from './resources/final_calculation'
import { GlobalVariableEdit } from './resources/global_variable'
import { GlobalVariableCreate } from './resources/global_variable/GlobalVariableCreate'
import { GlobalVariableListing } from './resources/global_variable/GlobalVariableListing'
import { ItemCreate, ItemEdit, ItemList } from './resources/item'
import { ItemJobEdit, ItemJobsList } from './resources/item_job'
import { ItemTypeCreate, ItemTypeEdit, ItemTypeListing } from './resources/item_type'
import { JobCreate, JobEdit, JobList } from './resources/job'
import { RawMaterialCreate, RawMaterialEdit, RawMaterialListing } from './resources/raw_material'
import { RawMaterialTypeCreate, RawMaterialTypeEdit, RawMaterialTypeList } from './resources/raw_material_type'
import { ScreenCreate, ScreenEdit, ScreenListing } from './resources/screen'
import Spreadsheet from './resources/spreadsheet'
import { UnitsOfMeasureCreate, UnitsOfMeasureEdit, UnitsOfMeasureList } from './resources/unitsofmeasure'
import { UserCreate, UserEdit, UserListing } from './resources/user'
import { VendorCreate, VendorEdit, VendorList } from './resources/vendor'

const DEFAULT_YEAR = '2027'

const theme = createTheme({
  ...nanoLightTheme,
  palette: {
    ...nanoLightTheme.palette,
    secondary: { main: '#1565c0' },
  },
})

class ErrorBoundary extends React.Component {
  constructor(props) {
    super(props)
    this.state = { error: null }
  }
  static getDerivedStateFromError(error) {
    return { error }
  }
  render() {
    if (this.state.error) {
      return (
        <div style={{ padding: '2rem', fontFamily: 'monospace' }}>
          <h2>App Error</h2>
          <pre style={{ color: 'red', whiteSpace: 'pre-wrap' }}>
            {this.state.error.toString()}
            {this.state.error.stack}
          </pre>
        </div>
      )
    }
    return this.props.children
  }
}

const App = () => {
  useEffect(() => {
    if (localStorage.getItem('db') === null) {
      localStorage.setItem('db', DEFAULT_YEAR)
    }
  }, [])

  return (
    <ErrorBoundary>
      <Admin
        title='Aakron Costing Module'
        authProvider={authClient}
        dataProvider={restClient}
        layout={Layout}
        dashboard={Dashboard}
        theme={theme}
      >
        <CustomRoutes>
          <Route path='/year-management' element={<YearManagement />} />
        </CustomRoutes>

        <Resource name='spreadsheet' list={Spreadsheet} />

        <Resource name='job_listings' list={JobList} edit={JobEdit} create={JobCreate} />
        <Resource name='screens' list={ScreenListing} edit={ScreenEdit} create={ScreenCreate} />

        <Resource name='blanks' list={BlankList} edit={BlankEdit} create={BlankCreate} />
        <Resource name='blank_jobs' list={BlanksJobList} edit={BlankJobEdit} />
        <Resource name='blank_types' list={BlankTypeListing} edit={BlankTypeEdit} create={BlankTypeCreate} />

        <Resource name='items' list={ItemList} edit={ItemEdit} create={ItemCreate} />
        <Resource name='item_jobs' list={ItemJobsList} edit={ItemJobEdit} />
        <Resource name='boxes' list={BoxListing} edit={BoxEdit} create={BoxCreate} />
        <Resource name='item_types' list={ItemTypeListing} edit={ItemTypeEdit} create={ItemTypeCreate} />

        <Resource name='blanks_listing_item_with_costs' list={BLIWCListing} />
        <Resource name='blanks_listing_by_items' list={BLBIListing} create={BLBICreate} edit={BLBIEdit} />

        <Resource name='raw_materials' list={RawMaterialListing} create={RawMaterialCreate} edit={RawMaterialEdit} />
        <Resource name='colors' list={ColorList} edit={ColorEdit} create={ColorCreate} />
        <Resource name='units_of_measures' list={UnitsOfMeasureList} edit={UnitsOfMeasureEdit} create={UnitsOfMeasureCreate} />
        <Resource name='rawmaterialtypes' list={RawMaterialTypeList} edit={RawMaterialTypeEdit} create={RawMaterialTypeCreate} />
        <Resource name='vendors' list={VendorList} create={VendorCreate} edit={VendorEdit} />

        <Resource name='final_calculations' list={FinalCalculationList} create={FinalCalculationCreate} edit={FinalCalculationEdit} />
        <Resource name='cost_calculator' create={CostCalCulatorCreate} />

        <Resource name='users' list={UserListing} edit={UserEdit} create={UserCreate} />
        <Resource name='app_constants' list={GlobalVariableListing} edit={GlobalVariableEdit} create={GlobalVariableCreate} />
      </Admin>
    </ErrorBoundary>
  )
}

export default App
