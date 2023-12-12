import axios from 'axios'
import React from 'react'
import { useState } from 'react'
import { useEffect } from 'react'

export default function Companies() {
    useEffect(()=>{
        getUsercompanies()
      },[])
    
          
          const [companies,setCompanies]=useState('')
          async function getUsercompanies() {
            try {
              const response = await axios.get('https://dashboard.go-tex.net/gotex-co-test/companies/get-all',
              {
                headers: {
                  Authorization: `Bearer ${localStorage.getItem('userToken')}`,
                },
              });
              console.log(response.data.data)
              setCompanies(response.data.data)
            } catch (error) {
              console.error(error);
            }
          }

         
  return (
    <div>Companies</div>
  )
}
