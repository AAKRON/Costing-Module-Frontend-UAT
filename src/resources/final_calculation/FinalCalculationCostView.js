import {
  Paper,
  Table,
  TableBody,
  TableRow
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
  padding: '0.5rem'
}
const textRightAlign = {
  textAlign: 'right',
  textOverflow: 'inherit',
  padding: '0.5rem'
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

const BlankField = ({ blank }) => (
  <TableRow style={topBorder}>
    <td style={textLeftAlign}>{blank.blank_number}</td>
    <td style={textCenterAlign}>{blank.blank_name}</td>
    <td colSpan={2} style={textCenterAlign}>{blank.color_description}</td>
    <td style={textRightAlign}>${blank.total}</td>
  </TableRow>
)


const FinalCalculationCostView = () => {
  const blank = useEditController()

  if(!blank.record) return null

  const total_blank_cost = blank.record.blank_final_calculations_view?.reduce(
    (a, b) => Number(a) + Number(b.total),
    0
  )

  return (
    <div style={{ width: '100%', fontSize: '0.8rem' }}>
      {blank.record.total_cost &&
        <h3>
          Total Cost($) : <b>${blank.record.total_cost}</b>
        </h3>
      }

      <Paper style={style}>
        <Table>
          <thead>
            <TableRow>
              <th colSpan={5}>
                <b>Cost Factor</b>
              </th>
              <th style={textRightAlign}>
                <b>Cost($)</b>
              </th>
            </TableRow>
          </thead>

          <TableBody>
            <TableRow style={topBorder}>
              <td style={rightColumnBorder} rowSpan={2}>
                Raw Material
              </td>
              <th colSpan={2}>Name</th>
              <th style={textRightAlign}>
                Cost
              </th>
              <th style={textCenterAlign}>
                Pcs / Unit One
              </th>
            </TableRow>

            <TableRow style={topBorder}>
              <td colSpan={2}>
                <span>{blank.record.raw_material_name}</span>
              </td>
              <td style={textRightAlign}>
                ${blank.record.raw_material_cost}
              </td>
              <td style={textCenterAlign}>
                {blank.record.number_of_pieces_per_unit_one}
              </td>
              <td style={textRightAlign}>
                <b>${blank.record.raw_calculated}</b>
              </td>
            </TableRow>

            <TableRow style={topBorder}>
              <td style={rightColumnBorder} rowSpan={3}>
                Colorant
              </td>
              <th>Name</th>
              <th style={textRightAlign}>
                Cost
              </th>
              <th style={textCenterAlign}>
                Pcs/Unit
              </th>
              <th style={textCenterAlign}>
                % Of Colorant
              </th>
            </TableRow>

            <TableRow style={topBorder}>
              <td>
                {blank.record.colorant_one}
              </td>
              <td style={textRightAlign}>
                ${blank.record.color_one_cost}
              </td>
              <td style={textCenterAlign}>
                {blank.record.number_of_pieces_per_unit_one}
              </td>
              <td style={textCenterAlign}>
                {blank.record.percentage_of_colorant_one}
              </td>
              <td style={textRightAlign}>
                <b>${blank.record.fina_color_one_cost}</b>
              </td>
            </TableRow>

            <TableRow style={topBorder}>
              <td>
                {blank.record.colorant_two || '-'}
              </td>
              <td style={textRightAlign}>
                ${blank.record.color_two_cost}
              </td>
              <td style={textCenterAlign}>
                {blank.record.number_of_pieces_per_unit_two}
              </td>
              <td style={textCenterAlign}>
                {blank.record.percentage_of_colorant_two}
              </td>
              <td style={textRightAlign}>
                <b>${blank.record.fina_color_two_cost}</b>
              </td>
            </TableRow>

            <TableRow style={topBorder}>
              <td colSpan={5} style={textRightAlign}>
                <b>Total Cost($)</b>
              </td>
              <td style={textRightAlign}>
                <b>${blank.record.total_cost}</b>
              </td>
            </TableRow>
          </TableBody>
        </Table>
      </Paper>

      {blank.record.blank_average_cost &&
        <h3>
          Total Average Blank Cost($) :{' '}
          <b>${blank.record.blank_average_cost}</b>
        </h3>
      }
  
      <Paper style={style}>
        <Table>
          <thead>
            <TableRow>
              <th colSpan={5} style={textLeftAlign}>
                <b>Cost Factor</b>
              </th>
              <th style={textRightAlign}>
                <b>Cost($)</b>
              </th>
            </TableRow>
          </thead>

          <TableBody>
            <TableRow style={topBorder}>
              <td
                style={rightColumnBorder}
                rowSpan={
                  blank.record.blank_final_calculations_view?.length + 4
                }
              >
                Blank
              </td>
              <th style={textLeftAlign}>Blank number</th>
              <th style={textCenterAlign}>
                Blank Name
              </th>
              <th colSpan={2}>Color</th>
            </TableRow>

            {blank.record.blank_final_calculations_view?.map((blank, index) => (
              <BlankField key={index} blank={blank} />
            ))}

            <TableRow style={topBorder}>
              <td style={textRightAlign} colSpan='4'>
                Total Blank Cost($)
              </td>
              <td style={textRightAlign}>
                <b>${total_blank_cost?.toFixed(4)}</b>
              </td>
            </TableRow>

            <TableRow style={topBorder}>
              <td style={textRightAlign} colSpan='4'>
                Number Of Blank
              </td>
              <td style={textRightAlign}>
                <b>
                  {blank.record.blank_final_calculations_view?.length}
                </b>
              </td>
            </TableRow>

            <TableRow style={topBorder}>
              <td style={textRightAlign} colSpan='4'>
                Total Average Blank Cost($)
              </td>
              <td style={textRightAlign}>
                <b>
                  $
                  {total_blank_cost &&
                    (total_blank_cost / blank.record.blank_final_calculations_view?.length).toFixed(4)
                  }
                </b>
              </td>
            </TableRow>
          </TableBody>
        </Table>
      </Paper>
    </div>
  )
}

export default FinalCalculationCostView
