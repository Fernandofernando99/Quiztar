import React, { useEffect, useState } from 'react'
import Button from '@material-ui/core/Button';
import PlayArrow from '@material-ui/icons/PlayArrow';
import TextField from '@material-ui/core/TextField';
import Box from '@material-ui/core/Box';
import logo from '../favourites.svg';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import FormLabel from '@material-ui/core/FormLabel';
import Grid from '@material-ui/core/Grid';
import { useHistory } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { addUser } from '../store/actions/userAction'

function LoginPage () {
  let history = useHistory()
  const url = 'http://localhost:5000/users'
  const dispatch = useDispatch()
  const { userData, isLoading } = useSelector(state => state)
  const [user, setUser] = useState({
    name: '',
    gender: '',
    age: ''
  })

  useEffect(() => {
    if (userData !== null && isLoading === false) {
      history.push('/questions')
    }
    //eslint-disable-next-line
  }, [isLoading])

  const toGamePage = () => {
    dispatch(addUser(url, user))
  }

  const checkComplete = () => {
    if (user.name !== '' && user.gender !== '' && user.age !== '') {
      return false
    } else {
      return true
    }
  }

  const handleUserDataChange = (e) => {
    const { value, name } = e.target
    if (name === 'age') {
      if ( Number(value) >= 1  ) {
        return setUser({...user, [name]: value})
      } else {
        return setUser({...user, [name]: ''})
      }
    }
    return setUser({...user, [name]: value})
  }

  return (
    <div>
      <img src={logo} className="App-logo" alt="logo" />
      <form autoComplete="off">
        <Grid
          container
          direction="column"
        >
          <Box
            mb={2}
            mt={2}
          >
            <TextField
              required
              value={user.name}
              name="name"
              onChange={(e) => handleUserDataChange(e)}
              label="Nama"
              variant="outlined"
            />
          </Box>
          <Box
            mb={2}
          >
            <TextField
              required
              value={user.age}
              label="Umur"
              name="age"
              variant="outlined"
              type="number"
              onChange={(e) => handleUserDataChange(e)}
            />
          </Box>
          <FormControl row="true" component="fieldset">
            <FormLabel component="legend">Jenis Kelamin</FormLabel>
            <RadioGroup onChange={(e) => handleUserDataChange(e)} value={user.gender} row aria-label="gender" name="gender">
              <FormControlLabel value="perempuan" control={<Radio />} label="perempuan"/>
              <FormControlLabel value="laki-laki" control={<Radio />} label="laki-laki" />
            </RadioGroup>
          </FormControl>
          <Button
            disabled={checkComplete()}
            onClick={() => toGamePage()}
            variant="contained"
            color="primary"
            startIcon={<PlayArrow />}
          >Play</Button>
        </Grid>
      </form>
    </div>
  )

}

export default LoginPage