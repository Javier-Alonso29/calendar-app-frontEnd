import React from 'react'
import { useAuthStore } from '../../hooks/useAuthStore'

export const Navbar = () => {

  const {startLogOut, user} = useAuthStore()

  return (
    <div className='navbar navbar-dark bg-dark mb-4 px-4'>
        <span className='navbar-brand'>
            <li className='fas fa-calendar-alt'></li>
            &nbsp;
            {user.name}
        </span>
        <button className='btn btn-outline-danger' onClick={startLogOut}>
            <li className='fas fa-sign-out-alt'></li>
            &nbsp;
            <span>Salir</span>
        </button>
    </div>
  )
}
