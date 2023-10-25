import ContentCreate from '@mui/icons-material/Create'
import DeleteIcon from '@mui/icons-material/DeleteForever'
import {
  Autocomplete,
  Box,
  Button,
  Card,
  IconButton,
  Modal,
  Table,
  TableBody,
  TableRow,
  TextField,
} from '@mui/material'
import { useEffect, useState } from 'react'
import { useNotify, useRefresh } from 'react-admin'
import { isModifyPermission } from '../helpers/functions'
import { stringHelpers } from '../helpers/stringHelpers'
import restClient from '../providers/restClient'

const ListingItemCost = ({ blanksInitial, id, docNumber }) => {
  const refresh = useRefresh()
  const notify = useNotify()
  const [blanks, setBlanks] = useState([])
  const [blanksListing, setBlanksListing] = useState([])
  const [blankEdit, setBlankEdit] = useState({})
  const [openModal, setOpenModal] = useState(false)

  const fetchBlanks = () =>
    restClient.getList('blank-list-only', {
      pagination: { page: 1, perPage: -1 },
      sort: { field: 'id', order: 'ASC' },
    })

  const editBlank = (blank) => {
    setOpenModal(true)
    setBlankEdit(blank)
  }

  const handleEditBlank = () => {
    // PENDIENT
  }

  const selectBlankNumberEdit = (event, data) => {
    if(!data){
      return
    }
  
    const blank_number = stringHelpers.extractLeadingNumber(data)

    setBlankEdit({
      ...blankEdit,
      blank_number: Number(blank_number),
    })
  }

  const removeBlank = (blank) => {
    const currentItemBlanks = blanks.map((b) => {
      if(b.blank_number === blank.blank_number){
        return {
          ...b,
          deleted: true
        }
      }else{
        return b
      }
    })
  
    setBlanks(currentItemBlanks)
  }

  const handleRemoveBlank = () => {
    // PENDIENT
  }

  const blankField = (blank, index) => {
    return (
      <TableRow key={index} style={{ borderTop: '1px solid #cdcdcd' }}>
        <th style={{ fontWeight: 400, height: '40px' }}>{blank.blank_number}</th>
        <th style={{ fontWeight: 400, textAlign: 'left' }}>{blank.blank_description || '-'}</th>
        <th style={{ fontWeight: 400 }}>{blank.mult}</th>
        <th style={{ fontWeight: 400 }}>{blank.div}</th>
        {isModifyPermission() &&
          <th>
            <IconButton
              onClick={() => editBlank(blank)}
            >
              <ContentCreate />
            </IconButton>
            <IconButton
              onClick={() => removeBlank(blank)}
            >
              <DeleteIcon />
            </IconButton>
          </th>
        }
      </TableRow>
    )
  }

  useEffect(() => {
    fetchBlanks().then(({ data }) => {
      const blanks = data.map(
        (b) => `${b.blank_number} - ${b.description}`
      )
      setBlanksListing(blanks)
    }).catch((err) => {
      console.log('Error fetching items', err)
    })
  }, [])

  useEffect(() => {
    setBlanks(blanksInitial)
  }, [blanksInitial])

  if(blanks === undefined) return <div>Loading...</div>

  return (
    <>
      {blanks?.length > 0
        ? <div style={{ width: '100%'}}>
            <h2>Blanks By Item</h2>

            <Table style={{ marginTop: '1rem', fontSize: '0.9rem' }}>
              <thead style={{ color: '#b7b7b7' }}>
                <TableRow>
                  <th>Blank#</th>
                  <th>Description</th>
                  <th>Multiplication</th>
                  <th>Division</th>
                  <th></th>
                </TableRow>
              </thead>

              <TableBody>
                {blanks?.map((blank, index) => {
                  if(!blank?.deleted) return blankField(blank, index)
                })}
              </TableBody>
            </Table>

            {isModifyPermission() &&
              <Button
                color='primary'
                variant='contained'
                onClick={handleRemoveBlank}
              >
                Save
              </Button>
            }

            <Modal
              open={openModal}
              onClose={() => setOpenModal(false)}
              sx={{
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
              }}
            >
              <Card style={{ padding: '1rem', width: '100%', maxWidth: '500px' }}>
                <h2 style={{ borderBottom: '1px solid #cdcdcd', padding: '0.5rem'}}>
                  Edit Blank
                </h2>

                <Autocomplete
                  options={blanksListing}
                  value={blankEdit?.blank_number + ' - ' + blankEdit?.blank_description}
                  onChange={selectBlankNumberEdit}
                  renderInput={(params) =>
                    <TextField {...params} label='Type the blank number' />
                  }
                />

                <TextField
                  fullWidth
                  label='Multiplication'
                  name='multiplication'
                  type='number'
                  onChange={(e) => setBlankEdit({ ...blankEdit, mult: e.target.value })}
                  value={blankEdit.mult}
                />

                <TextField
                  fullWidth
                  label='Division'
                  name='division'
                  type='number'
                  onChange={(e) => setBlankEdit({ ...blankEdit, div: e.target.value })}
                  value={blankEdit.div}
                />
        
                <Box>
                  <Button
                    onClick={() => setOpenModal(false)}
                  >
                    Cancel
                  </Button>

                  <Button
                    onClick={handleEditBlank}
                  >
                    Update
                  </Button>
                </Box>
              </Card>
            </Modal>
          </div>
        :
          <div>
            No blank(s)
          </div>
      }
    </>
  )
}

export default ListingItemCost