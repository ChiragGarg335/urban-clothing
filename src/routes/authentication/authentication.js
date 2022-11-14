import React from 'react'
import SignUpForm from '../../Components/sign-up-form/sign-up-form'
import SignIn from '../../Components/signIn/signIn'
import './authentication.scss'
const Authentication= () => {
    

  return (
    <div className='authentication-container'>
        <SignIn/>
        <SignUpForm/>
    </div>
  )
}

export default Authentication