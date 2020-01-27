import axios from 'axios'

const initialState = {
    purchases: [],
    budgetLimit: null,
    loading: false
}

const REQUEST_BUDGET_DATA = 'REQUEST_BUDGET_DATA'

export const requestBudgetData = () => {
    const data = axios.get('/api/budget-data').then(res => res.data)
    .catch(err => err.message)
    return {
        type: REQUEST_BUDGET_DATA,
        payload: data
    }
}

const ADD_PURCHASE = 'ADD_PURCHASE'
export const addPurchase = (price, description, category) => {
    const data = axios.post('/api/budget-data/purchase', {price, description, category}).then(res => res.data)
    .catch(err => err.message)
    return{
        type: ADD_PURCHASE,
        payload: data
    }
}

const REMOVE_PURCHASE = 'REMOVE_PURCHASE'
export const removePurchase = (id) => {
    const data = axios.delete(`/api/budget-data/purchase/${id}`).then(res => res.data)
    .catch(err => err.message)
    return{
        type: REMOVE_PURCHASE,
        payload: data
    }
}

export default function budgetReducer(state = initialState, action) {
        switch(action.type){
            case REQUEST_BUDGET_DATA + '_PENDING':
                return{...state, loading: true}
            case REQUEST_BUDGET_DATA + '_FULFILLED':
                return{...state, ...action.payload, loading: false}
            case ADD_PURCHASE + '_PENDING':
                return{...state, loading: true}
            case ADD_PURCHASE + '_FULFILLED':
                return{...state, purchases: action.payload, loading: false}
            case REMOVE_PURCHASE + '_PENDING': 
                return{...state, loading: true}
            case REMOVE_PURCHASE + '_FULFILLED':
                return{...state, purchases: action.payload, loading: false}
            default:
                return state;
    }         
        
}