import React, {useContext,useState} from 'react'
import {MyContext} from '../contexts/MyContext'

function Register(){
    const {toggleNav,registerUser} = useContext(MyContext);
    const initialState = {
        userInfo:{
            name:'',
            email:'',
            cpf:'',
            password:'',
        },
        errorMsg:'',
        successMsg:'',
    }
    const [state,setState] = useState(initialState);

    // On Submit the Registration Form
    const submitForm = async (event) => {
        event.preventDefault();
        const data = await registerUser(state.userInfo);
        if(data.success){
            setState({
                ...initialState,
                successMsg:data.message,
            });
        }
        else{
            setState({
                ...state,
                successMsg:'',
                errorMsg:data.message
            });
        }
    }

    // On change the Input Value (name, email, password)
    const onChangeValue = (e) => {
        setState({
            ...state,
            userInfo:{
                ...state.userInfo,
                [e.target.name]:e.target.value
            }
        });
    }
    
    // Show Message on Success or Error
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
            <h1>Sign Up</h1>
            <form onSubmit={submitForm} noValidate>
                <div className="form-control">
                    <label>Nome Completo</label>
                    <input name="name" required type="text" value={state.userInfo.name} onChange={onChangeValue} placeholder="Informe seu nome completo"/>
                </div>
                <div className="form-control">
                    <label>e-Mail</label>
                    <input name="email" required type="email" value={state.userInfo.email} onChange={onChangeValue} placeholder="Informe seu endereço de e-mail"/>
                </div>
                <div className="form-control">
                    <label>CPF</label>
                    <input name="cpf" required type="number" value={state.userInfo.cpf} onChange={onChangeValue} placeholder="Informe seu CPF"/>
                </div>
                <div className="form-control">
                    <label>Senha</label>
                    <input name="password" required type="password" value={state.userInfo.password} onChange={onChangeValue} placeholder="informe uma senha"/>
                </div>
                {errorMsg}
                {successMsg}
                <div className="form-control">
                    <button type="submit">Sign Up</button>
                </div>
            </form>
            <div className="_navBtn">
                <button  onClick={toggleNav}>Login</button>
            </div>
        </div>
    );
}

export default Register