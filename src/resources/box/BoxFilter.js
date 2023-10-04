import React from "react";
import { Filter, TextInput } from "admin-on-rest/lib/mui";
import { NumberInput } from "admin-on-rest/lib/mui/input";

export const BoxFilter = (props) => (
  <Filter {...props}>
    <NumberInput label="Search by cost per box" source="cost_per_box" alwaysOn />
    <TextInput label="Search by box name" source="box_name" alwaysOn />
    <NumberInput label="Search by box ID" source="id" alwaysOn />
  </Filter>
);
