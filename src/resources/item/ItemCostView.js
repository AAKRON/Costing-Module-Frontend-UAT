import {
  Paper,
  Table,
  TableBody,
  TableRow,
} from '@mui/material'
import React from 'react'
import { Link, useEditController } from 'react-admin'

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
  padding: '0.75rem'
}
const textRightAlign = {
  textAlign: 'right',
  textOverflow: 'inherit',
  padding: '0.75rem'
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

const BlankField = ({ blank, type }) => (
  <TableRow style={bottomBorder}>
    <td colSpan={3} style={textLeftAlign}>{blank.blank_number} - {blank.description}</td>
    <td colSpan={2} style={textLeftAlign}>{blank.blank_type}</td>
    {type === 'price' &&
      <td style={textRightAlign}>
        <Link to={`/blanks/${blank.id}`} style={{ textDecoration : 'none', color : '#00bcd4'}}>${blank.total_blank_cost_for_price}</Link>
      </td>
    }
    {type === 'inventory' &&
      <td style={textRightAlign}>
        <Link to={`/blanks/${blank.id}`} style={{ textDecoration : 'none', color : '#00bcd4'}}>${blank.total_blank_cost_for_inventory}</Link>
      </td>
    }
    <td style={textCenterAlign}>{blank.multiplication}</td>
    <td style={textCenterAlign}>{blank.division}</td>
    {type === 'price' &&
      <td style={textRightAlign}><b>${blank.total_blank_cost_for_price_modify}</b></td>
    }
    {type === 'inventory' &&
      <td style={textRightAlign}><b>${blank.total_blank_cost_for_inventory_modify}</b></td>
    }
  </TableRow>
)

const JobField = ({ job, type }) => (
  <TableRow style={bottomBorder}>
    <td colSpan={4} style={textLeftAlign}>{job.job_number} - {job.description}</td>
    <td style={textRightAlign}>${job.wages_per_hour}</td>
    <td style={textCenterAlign}>{job.hour_per_piece}</td>
    <td style={textRightAlign}>${job.direct_labor_cost}</td>
    {type === 'price' &&
    <td style={textRightAlign}>${job.overhead_pricing_cost}</td>
    }
    {type === 'price' &&
    <td style={textRightAlign}><b>${job.total_pricing_cost}</b></td>
    }
    {type === 'inventory' &&
    <td style={textRightAlign}>${job.overhead_inventory_cost}</td>
    }
    {type === 'inventory' &&
    <td style={textRightAlign}><b>${job.total_inventory_cost}</b></td>
    }
  </TableRow>
)

const ScreenField = ({ screen }) => {
  if (screen.screen_cost !== '-') {
    return (
      <TableRow style={bottomBorder}>
        <td colSpan={6} style={textLeftAlign}>{screen.job_number} - {screen.description}</td>
        <td colSpan={2} style={textCenterAlign}>{screen.screen_name}</td>
        <td style={textRightAlign}><b>${screen.screen_cost}</b></td>
      </TableRow>
    )
  }
}

const ItemCostView = ({ type }) => {
  const item = useEditController()

  if(!item.record) return null

 if(
    item.record?.blanks === undefined ||
    item.record?.jobs === undefined ||
    item.record?.ink_cost === ''
  ) return (<div>{type} Cost Loading....</div>)

  return (
    <div style={{ width: '100%', fontSize: '0.8rem' }}>
      {type === 'price' &&
      <h3>Price Cost($) : <b>${item.record.total_price_cost}</b></h3>
      }
      {type === 'inventory' &&
      <h3>Inventory Cost($) : <b>${item.record.total_inventory_cost}</b></h3>
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
              {item.record.blanks.length > 0 &&
                <TableRow style={bottomBorder}>
                  <td style={rightColumnBorder} rowSpan={item.record.blanks.length + 1}>
                    Blanks
                  </td>
                  <th colSpan={3} style={textLeftAlign}>Blank</th>
                  <th colSpan={2} style={textLeftAlign}>Blank Type</th>
                  <th style={textRightAlign} >Cost($)</th>
                  <th style={textCenterAlign}>Multiplication</th>
                  <th style={textCenterAlign}>Division</th>
                </TableRow>
              }
              { item.record.blanks.length > 0 &&
                item.record.blanks.map((blank, index) => <BlankField key={index} blank={blank} type={type}/>)
              }
              { item.record.jobs.length > 0 &&
              <TableRow style={bottomBorder}>
                <td style={rightColumnBorder} rowSpan={item.record.jobs.length + 1}>
                  Jobs
                </td>
                <th colSpan={4} style={textLeftAlign}>Job</th>
                <th style={textRightAlign}>Wages($)/hr</th>
                <th style={textCenterAlign}>Hr/pcs</th>
                <th style={textRightAlign}>Direct Labor ($)</th>
                <th style={textRightAlign}>Overhead Price</th>
              </TableRow>
              }
              { item.record.jobs.length > 0 &&
                item.record.jobs.map((job, index) => <JobField key={index} job={job} type={type}/>)
              }
              { item.record.screen.length > 0 &&
                <TableRow style={bottomBorder}>
                  <td rowSpan={item.record.screen.length + 1} style={rightColumnBorder}>
                    Screens
                  </td>
                  <th colSpan={6} style={textLeftAlign}>Job</th>
                  <th colSpan={2} style={textCenterAlign}>Screen Name</th>
                </TableRow>
              }
              { item.record.screen.length > 0 &&
                item.record.screen.map((screen, index) => <ScreenField key={index} screen={screen}/>)
              }
              { item.record.box_name &&
                <TableRow style={bottomBorder}>
                  <td rowSpan={2} style={rightColumnBorder}>
                    Box
                  </td>
                  <th colSpan={4} style={textLeftAlign}>Name</th>
                  <th colSpan={2} style={textCenterAlign}>Cost</th>
                  <th colSpan={2} style={textCenterAlign}>Number Of pcs/box</th>
                </TableRow>
              }
              { item.record.box_name &&
                <TableRow style={bottomBorder}>
                  <td colSpan={4} style={textLeftAlign}>{item.record.box_name}</td>
                  <td colSpan={2} style={textCenterAlign}>${item.record.box_cost}</td>
                  <td colSpan={2} style={textCenterAlign}>{item.record.number_of_pcs_per_box}</td>
                  <td style={textRightAlign}><b>${item.record.item_box_cost}</b></td>
                </TableRow>
              }
              { item.record.secondary_box_name &&
                <TableRow style={bottomBorder}>
                  <td rowSpan={2} style={rightColumnBorder}>
                    Secondary Box
                  </td>
                  <th colSpan={4} style={textLeftAlign}>Name</th>
                  <th colSpan={2} style={textCenterAlign}>Cost</th>
                  <th colSpan={2} style={textCenterAlign}>Number Of pcs/box</th>
                </TableRow>
              }
              { item.record.secondary_box_name &&
                <TableRow style={bottomBorder}>
                  <td colSpan={4} style={textLeftAlign}>{item.record.secondary_box_name}</td>
                  <td colSpan={2} style={textCenterAlign}>${item.record.secondary_box_cost}</td>
                  <td colSpan={2} style={textCenterAlign}>{item.record.number_of_pcs_per_secondary_box}</td>
                  <td style={textRightAlign}><b>${item.record.secondary_box_cost}</b></td>
                </TableRow>
              }
              
              <TableRow style={bottomBorder}>
                <td  style={rightColumnBorder}>Ink Cost</td>
                <td colSpan={9} style={textRightAlign}><b>${item.record.ink_cost}</b></td>
              </TableRow>

              <TableRow>
                <td colSpan={9} style={textRightAlign} >
                { type === 'price' &&
                  <b>Total Price Cost($)</b>
                }
                { type === 'inventory' &&
                  <b>Total Inventory Cost($)</b>
                }
                </td>
                { type === 'price' &&
                <td style={textRightAlign}><b>${item.record.total_price_cost}</b></td>
                }
                { type === 'inventory' &&
                <td style={textRightAlign}><b>${item.record.total_inventory_cost}</b></td>
                }

              </TableRow>
            </TableBody>
        </Table>
      </Paper>
    </div>
  )
}

export default ItemCostView
