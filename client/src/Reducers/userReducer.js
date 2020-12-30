import{LOGGED_IN_USER,LOGOUT} from '../Actions/types';
const userReducer = (state = null,action) =>{
    switch(action.type){
        case LOGGED_IN_USER:
            return action.payload;
        case LOGOUT:
            return action.payload;
        default:
            return state;
    }
}

export default userReducer;