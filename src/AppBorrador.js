import { Admin, Resource } from 'admin-on-rest'
import { Delete } from 'admin-on-rest/lib/mui'
import UnitsOfMeasureIcon from 'material-ui/svg-icons/action/all-out'
import ColorIcon from 'material-ui/svg-icons/action/group-work'
import VendorIcon from 'material-ui/svg-icons/action/store'
import React from 'react'
import Dashboard from './Dashboard'
import Menu from './Menu'
import authClient from './authClient'
import {
  BLBICreate,
  BLBIEdit,
  BLBIListing,
} from './resources/blanks_listing_by_item'
import {
  BLIWCEdit,
  BLIWCListing,
} from './resources/blanks_listing_item_with_cost'
import { ColorCreate, ColorEdit, ColorList } from './resources/color'
import { CostCalCulatorCreate } from './resources/cost_calculator'
import {
  FinalCalculationCreate,
  FinalCalculationEdit,
  FinalCalculationList,
} from './resources/final_calculation'
import {
  RawMaterialCreate,
  RawMaterialEdit,
  RawMaterialListing,
} from './resources/raw_material'
import {
  RawMaterialTypeCreate,
  RawMaterialTypeEdit,
  RawMaterialTypeList,
} from './resources/raw_material_type'
import {
  UnitsOfMeasureCreate,
  UnitsOfMeasureEdit,
  UnitsOfMeasureList,
} from './resources/unitsofmeasure'
import { VendorCreate, VendorEdit, VendorList } from './resources/vendor'
import restClient from './restClient'

const App = () => (
  <Admin
    title='Aakron Costing Module'
    authClient={authClient}
    restClient={restClient}
    dashboard={Dashboard}
    menu={Menu}
  >

    {/* ===== */}

    <Resource
      name='blanks_listing_item_with_costs'
      list={BLIWCListing}
      edit={BLIWCEdit}
      remove={Delete}
    />

    <Resource
      name='blanks_listing_by_items'
      list={BLBIListing}
      create={BLBICreate}
      edit={BLBIEdit}
      remove={Delete}
    />

    {/* ===== */}

    <Resource
      name='colors'
      list={ColorList}
      icon={ColorIcon}
      remove={Delete}
      edit={ColorEdit}
      create={ColorCreate}
    />

    <Resource
      name='units_of_measures'
      list={UnitsOfMeasureList}
      icon={UnitsOfMeasureIcon}
      edit={UnitsOfMeasureEdit}
      remove={Delete}
      create={UnitsOfMeasureCreate}
    />

    <Resource
      name='vendors'
      list={VendorList}
      icon={VendorIcon}
      edit={VendorEdit}
      remove={Delete}
      create={VendorCreate}
    />

    <Resource
      name='rawmaterialtypes'
      list={RawMaterialTypeList}
      remove={Delete}
      edit={RawMaterialTypeEdit}
      create={RawMaterialTypeCreate}
    />

    <Resource
      name='raw_materials'
      list={RawMaterialListing}
      create={RawMaterialCreate}
      edit={RawMaterialEdit}
      remove={Delete}
    />

    <Resource
      name='final_calculations'
      list={FinalCalculationList}
      edit={FinalCalculationEdit}
      create={FinalCalculationCreate}
      remove={Delete}
    />

    <Resource name='cost_calculator' create={CostCalCulatorCreate} />
  </Admin>
);

export default App;
