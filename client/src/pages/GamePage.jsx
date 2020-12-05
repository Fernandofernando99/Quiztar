import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux'
import { useHistory } from 'react-router-dom'
import { getQuestions, setQuestionsOrder } from '../store/actions/userAction'
import Quiz from '../components/Quiz'
import Swal from 'sweetalert2';

function GamePage () {
  const { isLoading, questions, userData, score, questionsOrder, currentQuizNumber, isFinish } = useSelector(state => state)
  const dispatch = useDispatch()
  const url = 'http://localhost:5000/quiztar'
  const history = useHistory()

  useEffect(() => {
    if (userData === null) {
      history.push('/')
    } else {
      dispatch(getQuestions(url, userData._id ))
    }
    //eslint-disable-next-line
  }, [])

  useEffect(() => {
    if (questions?.length > 0) {
      shuffleQuestions()
    }
    //eslint-disable-next-line
  }, [questions])

  useEffect(() => {
    if (isFinish === true) {
      Swal.fire({
        icon: 'success',
        title: 'Game Sudah Selesai',
        text: `Skor akhir kamu ${score}`,
      })
      console.log("ttest");
      history.push('/')
    }
    //eslint-disable-next-line
  }, [isFinish])

  const shuffleQuestions = () => {
    let orderArr = []
    let orderObj = {}
    while (orderArr.length < 10) {
      let random = Math.floor(Math.random() * 10)
      if (orderObj[random] === undefined) {
        orderObj[random] = 1
        orderArr.push(random)
      }
    }
    dispatch(setQuestionsOrder(orderArr))
  }

  return (
    <div>
      {
        isLoading &&  questionsOrder.length === 0
        ? <button className="donnutSpinner"></button>
        : <>
            <h1>SKOR: {score}</h1>
            <Quiz question={questions[Number(questionsOrder[currentQuizNumber])]}/>
          </>
      }
    </div>
  )
}

export default GamePage