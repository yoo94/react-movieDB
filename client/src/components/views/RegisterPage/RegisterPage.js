import React, {useState} from 'react'
import {useDispatch} from "react-redux";
import {registerUser} from "../../../_action/user_action";


function RegisterPage(props) {
    const dispatch = useDispatch()
    const [Email, setEmail] = useState("")
    const [Password, setPassword] = useState("")
    const [Name, setName] = useState("")
    const [ConfirmPassword, setConfirmPassword] = useState("")

    const onEmailHandler = (event) => {
        setEmail(event.currentTarget.value)
    }
    const onPasswordlHandler = (event) => {
        setPassword(event.currentTarget.value)
    }
    const onNameHandler = (event) => {
        setName(event.currentTarget.value)
    }
    const onConfirmPasswordHandler = (event) => {
        setConfirmPassword(event.currentTarget.value)
    }
    const onsubmitHandler = (event) => {
        event.preventDefault();

        if(Password !== ConfirmPassword){
            return alert("비밀번호 확인을 다시 확인해 주세요")
        }

        let body = {
            email: Email,
            name: Name,
            password: Password,
        }

        dispatch(registerUser(body))
            .then(response => {
                if(response.payload.success){
                    alert("회원가입 완료")
                    props.history.push("/login")
                }else {
                    alert("회원가입 실패")
                }
            })
    }
    return (
    <div style={{
        display: 'flex',
        justifyContent: 'center',
        alignItems: 'center',
        width: '100%',
        height: '100vh'
    }}>
        <form style={{display: 'flex', flexDirection: 'column'}} onSubmit={onsubmitHandler}>
            <label>Email</label>
            <input type="email" value={Email} onChange={onEmailHandler}/>
            <label>Name</label>
            <input type="text" value={Name} onChange={onNameHandler}/>
            <label>Password</label>
            <input type="password" value={Password} onChange={onPasswordlHandler}/>
            <label>Confirm Password</label>
            <input type="password" value={ConfirmPassword}
                   onChange={onConfirmPasswordHandler}/><label>Password</label>
            <br/>
            <button>LOGIN</button>
        </form>
    </div>
)
}

export default RegisterPage