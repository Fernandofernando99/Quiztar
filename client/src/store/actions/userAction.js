import { SETSTATUSLOADING, SETQUESTIONS, SETUSER, ADDSCORE, SETCURRENTQUIZNUMBER, SETQUESTIONSORDER } from './index'
import axios from 'axios';

export function addScore () {
  return {
    type: ADDSCORE
  }
}

export function setCurrentQuizNumber () {
  return {
    type: SETCURRENTQUIZNUMBER
  }
}

export function setQuestionsOrder (orderArr) {
  return {
    type: SETQUESTIONSORDER,
    payload: orderArr
  }
}

export function setUser (userObj) {
  return {
    type: SETUSER,
    payload: userObj
  }
}

export function setQuestions (questions) {
  return {
    type: SETQUESTIONS,
    payload: questions
  }
}

export function addUser (url, userCredential) {
  return (dispatch) => {
    dispatch(setStatusLoading(true))
    axios({
      url: url,
      method: 'POST',
      data: userCredential
    })
      .then(response => {
        dispatch(setUser(response.data.ops[0]))
      })
      .catch(err => {
        dispatch(setUser(null))
      })
      .finally(end => {
        dispatch(setStatusLoading(false))
      })
  }
}

export function getQuestions (url, userId) {
  return (dispatch) => {
    dispatch(setStatusLoading(true))
    axios({
      url: url,
      method: 'GET',
      headers: {
        id: userId
      }
    })
      .then(response => {
        dispatch(setQuestions(response.data))
      })
      .catch(err => {
        dispatch(setQuestions(null))
      })
      .finally(end => {
        dispatch(setStatusLoading(false))
      })
  }
}

export function setStatusLoading (status) {
  return {
    type: SETSTATUSLOADING,
    payload: status 
  }
}