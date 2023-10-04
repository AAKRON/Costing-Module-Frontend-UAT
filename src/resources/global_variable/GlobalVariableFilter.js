import { Filter, TextInput } from 'admin-on-rest/lib/mui';
import React from 'react';

export const GlobalVariableFilter = (props) => (
    <Filter {...props}>
        <TextInput label='Search by name' source='q' alwaysOn/>
    </Filter>
);
