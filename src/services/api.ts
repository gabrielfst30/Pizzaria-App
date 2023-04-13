import axios from 'axios'

//hospendando API backend-pizzaria
const api =  axios.create({
    //baseURL: 'http://localhost:8888'
    baseURL: 'http://10.53.22.67:8888'
})

export { api };