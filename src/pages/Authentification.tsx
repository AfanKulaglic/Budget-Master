import React, { useEffect } from 'react'
import '../styles/login.css'
import supabase from '../utils/supabaseClient'; 
import { Auth } from '@supabase/auth-ui-react'
import { useNavigate } from 'react-router-dom'
import { ThemeSupa } from '@supabase/auth-ui-shared'

export const Authentification: React.FC = () => {
  // supabases  
  const navigate = useNavigate()

  useEffect(() => {
    supabase.auth.onAuthStateChange(async (event) => {
      if (event === "SIGNED_IN") {
        navigate('/start')
      } else if (event === "SIGNED_OUT") {
        navigate('/')
      }
    });
  },[])
  

  return (
    <div className='authentification'>
      <h2>Welcome! Please login to continue</h2>
      <p>If you already have an account, please sign in. If you don't have an account yet, you can register for free.</p>
      <Auth
        supabaseClient={supabase}
        appearance={{
          theme: ThemeSupa,
          variables: {
            default: {
              colors: {
                brand: '#6115c4',
                brandAccent: 'transparent',
              },
            },
          },
        }}
        providers={[]}
        theme='dark'
      />
    </div>
  )
}
