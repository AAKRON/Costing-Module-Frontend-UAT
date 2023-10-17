import {
  Paper,
  Table,
  TableBody,
  TableRow,
} from '@mui/material'
import React from 'react'
import { useEditController } from 'react-admin'

const style = {
  width: '100%',
  textAlign: 'center',
  display: 'inline-block',
}
const textCenterAlign = {
  textAlign: 'center',
  textOverflow: 'inherit'
}
const textLeftAlign = {
  textAlign: 'left',
  textOverflow: 'inherit',
  padding: '1.5rem'
}
const textRightAlign = {
  textAlign: 'right',
  textOverflow: 'inherit',
  padding: '1.5rem'
}
const rightColumnBorder = {
  borderRight: '1px solid #ccc',
  textOverflow: 'inherit'
}
const topBorder = {
  borderTop: '1px solid #ccc',
  textOverflow: 'inherit'
}
const bottomBorder = {
  borderBottom: '1px solid #ccc',
  textOverflow: 'inherit'
}

const JobField = ({ job, type }) => (
  <TableRow style={topBorder}>
    <td colSpan={4}>{job.job_number} - {job.description}</td>
    <td style={textRightAlign}>${job.wages_per_hour}</td>
    <td style={textCenterAlign}>{job.hour_per_piece}</td>
    <td style={textRightAlign}>${job.direct_labor_cost}</td>

    { type === 'price' &&
      <>
        <td style={textRightAlign}>${job.overhead_pricing_cost}</td>
        <td style={textRightAlign}><b>${job.total_pricing_cost}</b></td>
      </>
    }

    {type === 'inventory' &&
      <>
        <td style={textRightAlign}>${job.overhead_inventory_cost}</td>
        <td style={textRightAlign}><b>${job.total_inventory_cost}</b></td>
      </>
    }

  </TableRow>
)

const BlankCostView = ({ type }) => {
  const blank = useEditController()

  if(!blank.record) return null

  return (
    <>
      {blank?.record?.jobs?.length > 0
        ? <div style={{ width: '100%', fontSize: '0.8rem' }}>
            {type === 'price' &&
              <h3>Price Cost($) : <b>${blank?.record?.total_price_cost}</b></h3>
            }
            {type === 'inventory' &&
              <h3>Inventory Cost($) : <b>${blank?.record?.total_inventory_cost}</b></h3>
            }
            <Paper style={style}>
              <Table>
                  <thead style={bottomBorder}>
                    <TableRow>
                      <th colSpan={9} style={textLeftAlign}>
                        <b>Cost Factor</b>
                      </th>
                      <th style={textRightAlign}>
                        <b>Cost($)</b>
                      </th>
                    </TableRow>
                  </thead>

                  <TableBody>
                    <TableRow>
                      <td style={rightColumnBorder} rowSpan={blank.record.jobs.length + 1}>
                        Jobs
                      </td>
                      <th colSpan={4}>Job</th>
                      <th style={textRightAlign}>Wages($)/hr</th>
                      <th style={textCenterAlign}>Hr/pcs</th>
                      <th style={textRightAlign}>Direct Labor ($)</th>
                      <th style={textRightAlign}>Overhead Price</th>
                    </TableRow>

                    {blank?.record?.jobs?.map((job, index) => (
                      <JobField key={index} job={job} type={type}/>
                    ))}

                    <TableRow style={topBorder}>
                      <td style={rightColumnBorder}>Average</td>
                      <td colSpan={8} style={textRightAlign}>
                        Average cost pulled from <b>Final Calc</b>
                      </td>
                      <td style={textRightAlign}>
                        <b>${blank?.record?.blank_average_cost}</b>
                      </td>
                    </TableRow>

                    <TableRow style={topBorder}>
                      <td colSpan={9} style={textRightAlign} >
                      { type === 'price' &&
                        <b>Total Price Cost($)</b>
                      }
                      { type === 'inventory' &&
                        <b>Total Inventory Cost($)</b>  
                      }
                      </td>

                      { type === 'price' &&
                        <td style={textRightAlign}>
                          <b>${blank?.record?.total_price_cost}</b>
                        </td>
                      }
                      { type === 'inventory' &&
                        <td style={textRightAlign}>
                          <b>${blank?.record?.total_inventory_cost}</b>
                        </td>
                      }
                    </TableRow>
                  </TableBody>
              </Table>
            </Paper>
          </div>
        : <div>No {type} Cost</div>
      }
    </>
  )
}

export default BlankCostView