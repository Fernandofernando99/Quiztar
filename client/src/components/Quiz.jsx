import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addScore, setCurrentQuizNumber, setUser } from '../store/actions/userAction';
import Button from '@material-ui/core/Button';
import { Grid, Box, TextField } from '@material-ui/core';
import Swal from 'sweetalert2';
import Radio from '@material-ui/core/Radio';
import RadioGroup from '@material-ui/core/RadioGroup';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import FormControl from '@material-ui/core/FormControl';
import Checkbox from '@material-ui/core/Checkbox';
import FormGroup from '@material-ui/core/FormGroup';
import { useHistory } from 'react-router-dom';

function Quiz (props) {
  const dispatch = useDispatch()
  const { currentQuizNumber } = useSelector(state => state)
  const { question } = props
  const history = useHistory()
  const [ answer, setAnswer ] = useState({
    userAnswer: '',
    userTwoAnswer: []
  })
  const [ isCheck, setIsCheck ] = useState({
    Dokter: false,
    Polisi: false,
    Pengacara: false,
    Bidan: false,
    Pilot: false,
    Catur: false,
    Berkuda: false,
    'Sepak Bola': false,
    Bulutangkis: false,
    Golf: false
  })

  const submitAnswer = () => {
    if (answer.userAnswer !== '' || answer.userTwoAnswer.length > 0) {
      if (question.type === 'multipleChoiceTwoAnswer') {
        if (question.answer.includes(answer.userTwoAnswer[0]) && question.answer.includes(answer.userTwoAnswer[1]) && question.answer.length === answer.userTwoAnswer.length) {
          Swal.fire({
            icon: 'success',
            title: 'Jawaban kamu benar',
            text: `Selamat, skor kamu bertambah 10`,
          })
          dispatch(addScore())
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Jawaban kamu salah',
            text: `Yang benar adalah ${question.answer.join(` dan `)}`,
          })
        }
      } else {
        if (answer.userAnswer === question.answer) {
          Swal.fire({
            icon: 'success',
            title: 'Jawaban kamu benar',
            text: `Selamat, skor kamu bertambah 10`,
          })
          dispatch(addScore())
        } else {
          Swal.fire({
            icon: 'error',
            title: 'Jawaban kamu salah',
            text: `Yang benar adalah ${question.answer}`,
          })
        }
      }
      if (currentQuizNumber === 9) {
        Swal.fire({
          icon: 'success',
          title: 'Selamat, anda telah menyelesaikan permainan',
          text: `Terima kasih`,
        })
        dispatch(setUser(null))
        history.push("/")
      } else {
        dispatch(setCurrentQuizNumber())
      }
      setAnswer({
        ...answer,
        userAnswer: '',
        userTwoAnswer: []
      })
    } else {
      Swal.fire({
        icon: 'warning',
        title: 'Kamu belum memberikan jawaban',
        text: `Masukkan jawaban terlebih dahulu`,
      })
    }
  }

  const handleInputChange = (e) => {
    if (question.type === 'multipleChoiceTwoAnswer') {
      const { value, name, checked } = e.target
      setIsCheck({...isCheck, [name]: checked})
      if (value !== '') {
        if (answer.userTwoAnswer.length === 0 || answer.userTwoAnswer?.indexOf(value) === -1) {
          let newAnswer = answer.userTwoAnswer.concat(value)
          setAnswer({...answer, userTwoAnswer: newAnswer})
        } else if (answer.userTwoAnswer?.indexOf(value) !== -1) {
          let indexVal = answer.userTwoAnswer?.indexOf(value)
          let newAnswer = [...answer.userTwoAnswer]
          newAnswer.splice(indexVal, 1)
          setAnswer({...answer, userTwoAnswer: newAnswer})
        }
      }
    } else {
      const { value } = e.target
      setAnswer({
        ...answer,
        userAnswer: value
      })
    }
  }

  const quizTypeControl = () => {
    if (question?.type === 'shortResponse') {
      return (
        <Box
          mb={1}
          ml={1}
          mr={1}
        >
          <h2>{question.title}</h2>
          <Grid
            container
            direction='row'
          >
            {
              question.picName?.map((picTitle, index) => {
                return <img key={index} width='150' alt={picTitle} height='150' src={process.env.PUBLIC_URL + `/assets/${picTitle}.jpg`}></img>
              })
            }
            {
              question.oneQuestion &&
              <Grid
                container
                justify='center'
              >
                <h3>{question.oneQuestion}</h3>
              </Grid> 
            }
          </Grid>
          <TextField
            variant="filled"
            type="number"
            value={answer.userAnswer}
            onChange={(e) => handleInputChange(e)}
            label="Masukkan angka"
          />
        </Box>
      )
    } else if (question?.type === 'multipleChoice') {
      return (
        <Box
        mb={1}
        ml={1}
        mr={1}
        >
          <h2>{question.title}</h2>
          <Grid
            container
            direction='row'
            justify='center'
          >
          {
            question.oneQuestion
            ? <h3>{question.oneQuestion}</h3>
            : <img width='150' alt={'gambar'} height='150' src={process.env.PUBLIC_URL + `/assets/${question.answer}.png`}></img>
          }
          </Grid>
          <FormControl row="true" component="fieldset">
            <RadioGroup onChange={(e) => handleInputChange(e)} value={answer.userAnswer} row aria-label="answer" name="answer">
              {
                question.choices?.map((choice, index) => {
                  return <FormControlLabel key={index} value={choice} control={<Radio />} label={choice}/>
                })
              }
            </RadioGroup>
          </FormControl>
        </Box>
      )
    } else if (question?.type === 'multipleChoiceTwoAnswer') {
      return (
        <Box
        mb={1}
        ml={1}
        mr={1}
        >
          <h2>{question.title}</h2>
          <Grid
            container
            direction='row'
            justify='center'
          >
          {
            question.oneQuestion
            ? <h3>{question.oneQuestion}</h3>
            : <>
              {
                question.answer.map((ans, index) => {
                  return <img key={index} width='150' alt={'gambar'} height='150' src={process.env.PUBLIC_URL + `/assets/${ans}.jpg`}></img>
                })
              }
              </>
          }
          </Grid>
          <Grid
            container
            justify="center"
          >
            <FormGroup>
              {
                question.choices?.map((choice, index) => {
                  return <FormControlLabel key={index}
                  control={<Checkbox checked={isCheck[choice]} value={choice} onChange={(e) => handleInputChange(e)} name={choice} />}
                  label={choice}
                />
                })
              }
            </FormGroup>
          </Grid>
        </Box>
      )
    }
  }

  return (
    <div>
      <Grid
        container
        justify='center'
        direction='column'
      >
        {quizTypeControl()}
        <Grid
          container
          justify="center"
        >
          <Button
            onClick={() => submitAnswer()}
            variant="contained"
            color="secondary"
            size="large"
          >
            Jawab
          </Button>
        </Grid>
      </Grid>
    </div>
  )
}

export default Quiz