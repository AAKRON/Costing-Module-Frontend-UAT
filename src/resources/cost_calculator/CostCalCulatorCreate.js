import {
  Card
} from '@mui/material'
import React from 'react'
import AddCostCalculator from '../../components/AddCostCalculator'

const pageHeader = {
  fontSize: '24px',
  lineHeight: '36px'
}

export const CostCalCulatorCreate = (props) => (
  <Card style={{ margin: '2rem', padding: '1rem' }}>
    <span style={pageHeader}>
      <span>Cost Calculator</span>
    </span>

    <AddCostCalculator />
  </Card>
)
