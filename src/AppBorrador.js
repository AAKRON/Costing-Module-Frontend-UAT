import { Admin, Resource } from "admin-on-rest"
import { Delete } from "admin-on-rest/lib/mui"
import UnitsOfMeasureIcon from "material-ui/svg-icons/action/all-out"
import JobIcon from "material-ui/svg-icons/action/gavel"
import ColorIcon from "material-ui/svg-icons/action/group-work"
import BIcon from "material-ui/svg-icons/action/loyalty"
import VendorIcon from "material-ui/svg-icons/action/store"
import ItemIcon from "material-ui/svg-icons/action/view-stream"
import ItemJobIcon from "material-ui/svg-icons/device/widgets"
import React from "react"
import Dashboard from "./Dashboard"
import Menu from "./Menu"
import authClient from "./authClient"
import {
  BlankTypeCreate,
  BlankTypeEdit,
  BlankTypeListing,
} from "./resources/blank_type"
import { BlankCreate, BlankEdit, BlankList } from "./resources/blanks"
import { BlankJobEdit, BlanksJobList } from "./resources/blanks_job"
import {
  BLBICreate,
  BLBIEdit,
  BLBIListing,
} from "./resources/blanks_listing_by_item"
import {
  BLIWCEdit,
  BLIWCListing,
} from "./resources/blanks_listing_item_with_cost"
import { BoxCreate, BoxEdit, BoxListing } from "./resources/box"
import { ColorCreate, ColorEdit, ColorList } from "./resources/color"
import { CostCalCulatorCreate } from "./resources/cost_calculator"
import {
  FinalCalculationCreate,
  FinalCalculationEdit,
  FinalCalculationList,
} from "./resources/final_calculation"
import {
  GlobalVariableCreate,
  GlobalVariableEdit,
  GlobalVariableListing,
} from "./resources/global_variable"
import { ItemCreate, ItemEdit, ItemList } from "./resources/item"
import { ItemJobEdit, ItemJobsList } from "./resources/item_job"
import {
  ItemTypeCreate,
  ItemTypeEdit,
  ItemTypeListing,
} from "./resources/item_type"
import { JobCreate, JobEdit, JobList } from "./resources/job"
import {
  RawMaterialCreate,
  RawMaterialEdit,
  RawMaterialListing,
} from "./resources/raw_material"
import {
  RawMaterialTypeCreate,
  RawMaterialTypeEdit,
  RawMaterialTypeList,
} from "./resources/raw_material_type"
import { ScreenCreate, ScreenEdit, ScreenListing } from "./resources/screen"
import {
  UnitsOfMeasureCreate,
  UnitsOfMeasureEdit,
  UnitsOfMeasureList,
} from "./resources/unitsofmeasure"
import { UserCreate, UserEdit, UserListing } from "./resources/user"
import { VendorCreate, VendorEdit, VendorList } from "./resources/vendor"
import restClient from "./restClient"

const App = () => (
  <Admin
    title="Aakron Costing Module"
    authClient={authClient}
    restClient={restClient}
    dashboard={Dashboard}
    menu={Menu}
  >
    <Resource
      name="job_listings"
      list={JobList}
      icon={JobIcon}
      edit={JobEdit}
      create={JobCreate}
      remove={Delete}
    />

    <Resource
      name="screens"
      list={ScreenListing}
      create={ScreenCreate}
      edit={ScreenEdit}
      remove={Delete}
    />

    <Resource
      name="items"
      list={ItemList}
      edit={ItemEdit}
      create={ItemCreate}
      remove={Delete}
      icon={ItemIcon}
    />

    <Resource
      name="item_jobs"
      list={ItemJobsList}
      icon={ItemJobIcon}
      edit={ItemJobEdit}
    />

    <Resource
      name="boxes"
      list={BoxListing}
      create={BoxCreate}
      edit={BoxEdit}
      remove={Delete}
    />

    <Resource
      name="item_types"
      list={ItemTypeListing}
      edit={ItemTypeEdit}
      create={ItemTypeCreate}
      remove={Delete}
    />

    <Resource
      name="blanks"
      list={BlankList}
      create={BlankCreate}
      icon={BIcon}
      edit={BlankEdit}
      remove={Delete}
    />

    <Resource name="blank_jobs" list={BlanksJobList} edit={BlankJobEdit} />

    <Resource
      name="blank_types"
      list={BlankTypeListing}
      edit={BlankTypeEdit}
      create={BlankTypeCreate}
      remove={Delete}
    />

    <Resource
      name="colors"
      list={ColorList}
      icon={ColorIcon}
      remove={Delete}
      edit={ColorEdit}
      create={ColorCreate}
    />

    <Resource
      name="units_of_measures"
      list={UnitsOfMeasureList}
      icon={UnitsOfMeasureIcon}
      edit={UnitsOfMeasureEdit}
      remove={Delete}
      create={UnitsOfMeasureCreate}
    />

    <Resource
      name="vendors"
      list={VendorList}
      icon={VendorIcon}
      edit={VendorEdit}
      remove={Delete}
      create={VendorCreate}
    />

    <Resource
      name="rawmaterialtypes"
      list={RawMaterialTypeList}
      remove={Delete}
      edit={RawMaterialTypeEdit}
      create={RawMaterialTypeCreate}
    />

    <Resource
      name="raw_materials"
      list={RawMaterialListing}
      create={RawMaterialCreate}
      edit={RawMaterialEdit}
      remove={Delete}
    />

    <Resource
      name="final_calculations"
      list={FinalCalculationList}
      edit={FinalCalculationEdit}
      create={FinalCalculationCreate}
      remove={Delete}
    />

    <Resource
      name="blanks_listing_item_with_costs"
      list={BLIWCListing}
      edit={BLIWCEdit}
      remove={Delete}
    />

    <Resource
      name="blanks_listing_by_items"
      list={BLBIListing}
      create={BLBICreate}
      edit={BLBIEdit}
      remove={Delete}
    />

    <Resource name="cost_calculator" create={CostCalCulatorCreate} />

    <Resource
      name="users"
      list={UserListing}
      edit={UserEdit}
      create={UserCreate}
      remove={Delete}
    />

    <Resource
      name="app_constants"
      list={GlobalVariableListing}
      edit={GlobalVariableEdit}
      create={GlobalVariableCreate}
    />
  </Admin>
);

export default App;
