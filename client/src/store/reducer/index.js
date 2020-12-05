import { SETSTATUSLOADING, SETQUESTIONS, SETUSER, ADDSCORE, SETQUESTIONSORDER, SETCURRENTQUIZNUMBER } from '../actions/index'

let game_initial_state = {
  userData: null,
  isLoading: false,
  questions: [],
  score: 0,
  questionsOrder: [],
  currentQuizNumber: 0,
  isFinish: false
}

function reducer (state = game_initial_state, action) {
  switch(action.type) {
    case ADDSCORE:
      return {...state, score: state.score + 10}
    case SETCURRENTQUIZNUMBER:
      if (state.currentQuizNumber < state.questionsOrder.length) {
        return {...state, currentQuizNumber: state.currentQuizNumber + 1}
      } else {
        return {...state, isFinish: true}
      }
    case SETUSER:
      return {...state, userData: action.payload, questions: [],
        score: 0,
        questionsOrder: [],
        currentQuizNumber: 0,
        isFinish: false
      }
    case SETSTATUSLOADING:
      return {...state, isLoading: action.payload}
    case SETQUESTIONS:
      return {...state, questions: action.payload}
    case SETQUESTIONSORDER:
      return {...state, questionsOrder: action.payload}
    default:
      return state;
  }
}

export default reducer