import AddBoxIcon from '@mui/icons-material/AddBox'
import DeleteIcon from '@mui/icons-material/DeleteForever'
import {
  Autocomplete,
  Box,
  Button,
  Divider,
  IconButton,
  TextField
} from '@mui/material'
import { Fragment, useEffect, useState } from 'react'
import { useNotify, useRefresh } from 'react-admin'
import { stringHelpers } from '../helpers/stringHelpers'
import restClient from '../providers/restClient'

const AddBlankForm = ({
  data,
  docNumber,
  callback,
}) => {
  const notify = useNotify()
  const refresh = useRefresh()
  const [newBlanks, setNewBlanks] = useState([])
  const [blanks, setBlanks] = useState([])

  const removeBlank = (blank) => {
    const blanksTemp = [...newBlanks]
    const newBlanksTemp = blanksTemp.filter((b) => b.blank_number !== blank.blank_number)
    setNewBlanks(newBlanksTemp)
  }

  const fetchBlanks = () => {
    return restClient.getList('blank-list-only', {
      pagination: { page: 1, perPage: -1 },
      sort: { field: 'id', order: 'ASC' },
    })
  }

  const selectBlankNumberEdit = (data, index) => {
    if(!data){
      updateNewBlank(index, { blank_number: '' })
      return
    }
  
    const blankNumber = stringHelpers.extractLeadingNumber(data)
    updateNewBlank(index, { blank_number: blankNumber })
  }

  const updateNewBlank = (blankIndex, newValues) => {
    const updatedBlanks = [...newBlanks]
    updatedBlanks[blankIndex] = { ...updatedBlanks[blankIndex], ...newValues }
    setNewBlanks(updatedBlanks)
  }

  const AddNewBlank = () => {
    setNewBlanks([...newBlanks, { blank_number: '', mult: 1, div: 1 }])
  }

  const blankField = (blank, blankIndex) => {
    return (
      <div
        style={{
          display: 'grid',
          alignItems: 'center',
          gridTemplateColumns: '2fr 1fr 1fr auto',
          gap: '1rem',
        }}
      >
        <Autocomplete
          options={
            blanks.filter((j) => !newBlanks.some((nj) => nj.blank_number == j.blank_number))
              .filter((j) => !data.blanks_listing_by_item.some((dj) => dj.blank_number == j.blank_number))
              .sort((a, b) => a.blank_number - b.blank_number)
              .map((blank) => `${blank.blank_number} - ${blank.description}`)
          }
          onChange={(e, data) => selectBlankNumberEdit(data, blankIndex)}
          value={blank.blank_number
            ? `${blank.blank_number} - ${blanks.find((b) => b.blank_number == blank.blank_number)?.description}`
            : ''
          }
          renderInput={(params) =>
            <TextField {...params} label='Type the blank number' />
          }
        />

        <TextField
          label='Multiplication'
          name='multiplication'
          type='number'
          onChange={(e) => updateNewBlank(blankIndex, { mult: e.target.value })}
          value={blank.mult}
        />

        <TextField
          label='Division'
          name='division'
          type='number'
          onChange={(e) => updateNewBlank(blankIndex, { div: e.target.value })}
          value={blank.div}
        />

        <IconButton
          onClick={() => removeBlank(blank)}
        >
          <DeleteIcon />
        </IconButton>
      </div>
    )
  }

  const submitForm = async(e) => {
    e.preventDefault()

    if(newBlanks.length === 0){
      notify('Please add at least one blank')
      return
    }

    if(!newBlanks.every((newBlank) =>
      newBlank.blank_number && newBlank.mult && newBlank.div
    )){
      notify('Please fill all the fields')
      return
    }

    const data = newBlanks.map((newBlank) => ({
      blank_number: newBlank.blank_number.toString(),
      mult: newBlank.mult,
      div: newBlank.div,
    }))

    const response = await restClient.update('update-item-blanks-only', {
      id: docNumber,
      data:{
        blanks: data
      },
    })

    if(response){
      notify('Blank(s) added successfully')
      callback()
      refresh()
    }else{
      notify('Blank(s) failed to add')
    }
  }
  
  useEffect(() => {
    fetchBlanks().then(({ data }) => {
      setBlanks(data)
    }).catch((err) => {
      console.log('Error fetching blanks', err)
    })
  }, [])
  
  return (
    <form
      onSubmit={submitForm}
    >
      <Box sx={{
        padding: '1rem',
      }}>
        <TextField
          type='text'
          disabled={true}
          label={`Item number`}
          fullWidth
          value={data.item_number}
        />

        <Button
          sx={{
            marginTop: '1rem',
          }}
          onClick={AddNewBlank}
        >
          <AddBoxIcon />
          Add Blank
        </Button>

        <div
        style={{
          marginTop: '1rem',
          maxHeight: '300px',
          overflow: 'auto',
        }}
        >
          {newBlanks.map((newBlank, index) => (
            <Fragment key={index}>
              {blankField(newBlank, index)}
            </Fragment>
          ))}
        </div>
      </Box>

      <Divider />

      <Box sx={{
        display: 'flex',
        justifyContent: 'flex-end',
        padding: '1rem',
      }}>
        <Button
          onClick={callback}
        >
          Cancel
        </Button>
        {newBlanks.length > 0 &&
          <Button
            type='submit'
          >
            Add Over
          </Button>
        }
      </Box>
    </form>
  )
}

export default AddBlankForm

