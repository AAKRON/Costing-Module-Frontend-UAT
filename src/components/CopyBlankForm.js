import {
  Autocomplete,
  Box,
  Button,
  Divider,
  TextField,
} from '@mui/material'
import { Fragment, useEffect, useLayoutEffect, useState } from 'react'
import { useNotify, useRefresh } from 'react-admin'
import { stringHelpers } from '../helpers/stringHelpers'
import restClient from '../providers/restClient'

const CopyBlankForm = ({ data, docNumber, callback }) => {
  const notify = useNotify()
  const refresh = useRefresh()
  const [items, setItems] = useState([])
  const [copyBlanks, setCopyBlanks] = useState([])
  const [selectOption, setSelectOption] = useState(null)

  const fetchItems = () =>
    restClient.getList('item-list-only', {
      pagination: { page: 1, perPage: -1 },
      sort: { field: 'id', order: 'ASC' },
    })

  const submitForm = async (e) => {
    e.preventDefault()

    if (!selectOption) {
      notify('Please select an item number')
      return
    }

    const targetItemNumber = stringHelpers.extractLeadingNumber(selectOption)

    const blanksData = copyBlanks.map((blank) => ({
      blank_number: blank.blank_number.toString(),
      mult: blank.mult,
      div: blank.div,
    }))

    const response = await restClient.update('update-item-blanks-only', {
      id: targetItemNumber,
      data: { blanks: blanksData },
    })

    if (response) {
      notify('Blank(s) copied successfully')
      callback()
      refresh()
    } else {
      notify('Blank(s) failed to copy')
    }
  }

  const blankField = (blank) => (
    <div
      style={{
        display: 'grid',
        gridTemplateColumns: '1fr 1fr 1fr',
        gap: '1rem',
        marginTop: '0.5rem',
      }}
    >
      <TextField label='Blank Number' value={blank.blank_number} disabled />
      <TextField label='Multiplication' value={blank.mult} disabled />
      <TextField label='Division' value={blank.div} disabled />
    </div>
  )

  useEffect(() => {
    fetchItems()
      .then(({ data }) => setItems(data))
      .catch((err) => console.log('Error fetching items', err))
  }, [])

  useLayoutEffect(() => {
    setCopyBlanks(data.blanks_listing_by_item || [])
  }, [])

  return (
    <form onSubmit={submitForm}>
      <Box sx={{ padding: '1rem' }}>
        <Autocomplete
          options={items
            .filter((i) => i.item_number != docNumber)
            .sort((a, b) => a.item_number - b.item_number)
            .map((item) => `${item.item_number} - ${item.description}`)}
          onChange={(e, val) => setSelectOption(val)}
          value={selectOption}
          renderInput={(params) => (
            <TextField {...params} label='Type the target item number' />
          )}
        />

        <div style={{ marginTop: '1rem', maxHeight: '300px', overflow: 'auto' }}>
          {copyBlanks.map((blank, index) => (
            <Fragment key={index}>{blankField(blank)}</Fragment>
          ))}
        </div>
      </Box>

      <Divider />

      <Box sx={{ display: 'flex', justifyContent: 'flex-end', padding: '1rem' }}>
        <Button onClick={callback}>Cancel</Button>
        {selectOption && <Button type='submit'>Copy Over</Button>}
      </Box>
    </form>
  )
}

export default CopyBlankForm
