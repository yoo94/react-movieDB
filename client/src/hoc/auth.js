import React, {useEffect} from 'react';
import {useDispatch} from "react-redux";
import {auth} from "../_action/user_action";
export default function (SpecificComponent, option, adminRoute = null) {
        //option 1.null-아무나 출입 , 2.true-로그인한 유저만 3.false-로그인한 유저는 출입불가능
        //adminRoute- 어드민이냐아니냐
    function AuthenticationCheck(props) {

        const dispatch = useDispatch();

        useEffect(() => {
            dispatch(auth()).then(response => {
                //로그인 안했을때
                if(!response.payload.isAuth){
                    if(option){
                        props.history.push('/login')
                    }
                }else{
                    //로그인 했을때
                    if(adminRoute && !response.payload.isAdmin){
                        props.history.push('/')
                    }else{
                        if(option === false){
                            props.history.push('/')
                        }
                    }
                }


            })
        }, [])
        return(
            <SpecificComponent/>
        )
    }

    return AuthenticationCheck
}