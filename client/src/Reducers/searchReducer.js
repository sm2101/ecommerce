import{SEARCH_QUERY} from '../Actions/types';
const searchReducer = (state = "",action) =>{
    switch(action.type){
        case SEARCH_QUERY:
            return {...state, ...action.payload};
        default:
            return state;
    }
}

export default searchReducer;