import { Filter, TextInput } from 'admin-on-rest/lib/mui';
import React from 'react';

export const BLBIFilter = (props) => (
    <Filter {...props}>
        <TextInput label='Search by item number' source='q' alwaysOn/>
    </Filter>
);
