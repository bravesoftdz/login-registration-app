import React, {useContext, useState} from 'react'
import {MyContext} from '../contexts/MyContext'

function Login(){

    const {toggleNav,loginUser,isLoggedIn} = useContext(MyContext);

    const initialState = {
        userInfo:{
            cpf:'',
            password:'',
        },
        errorMsg:'',
        successMsg:'',
    }

    const [state,setState] = useState(initialState);

    // On change input value (CPF & password)
    const onChangeValue = (e) => {
        setState({
            ...state,
            userInfo:{
                ...state.userInfo,
                [e.target.name]:e.target.value
            }
        });
    }

    // On Submit Login From
    const submitForm = async (event) => {
        event.preventDefault();
        const data = await loginUser(state.userInfo);
        if(data.success && data.token){
            setState({
                ...initialState,
            });
            localStorage.setItem('loginToken', data.token);
            await isLoggedIn();
        }
        else{
            setState({
                ...state,
                successMsg:'',
                errorMsg:data.message
            });
        }
    }

    // Show Message on Error or Success
    let successMsg = '';
    let errorMsg = '';
    if(state.errorMsg){
        errorMsg = <div className="error-msg">{state.errorMsg}</div>;
    }
    if(state.successMsg){
        successMsg = <div className="success-msg">{state.successMsg}</div>;
    }



    return(
        <div className="_loginRegister">
            <h1>Login</h1>
            <form  onSubmit={submitForm} noValidate>
                <div className="form-control">
                    <label>CPF</label>
                    <input name="cpf" type="number" required placeholder="Informe seu CPF" value={state.userInfo.cpf} onChange={onChangeValue} />
                </div>
                <div className="form-control">
                    <label>Senha</label>
                    <input name="password" type="password" required placeholder="Informe sua senha" value={state.userInfo.password} onChange={onChangeValue} />
                </div>
                {errorMsg}
                {successMsg}
                <div className="form-control">
                    <button type="submit">Login</button>
                </div>
            </form>
            <div className="_navBtn">
                <button onClick={toggleNav}>Register</button>
            </div>
        </div>
    );
}

export default Login;