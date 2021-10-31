import {LOGIN_USER,REGISTER_USER} from '../_action/types'
import {useDispatch} from "react-redux";
import {useState} from "react";
import {loginUser} from "../_action/user_action";

export default function (state={},action){
    switch (action.type) {
        case LOGIN_USER:
            return{ ...state, loginSuccess: action.payload}
        case REGISTER_USER:
            return{ ...state, registre: action.payload}
        default:
            return state;

    }
}