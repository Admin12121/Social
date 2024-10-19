import React, { useEffect, useState } from 'react';
import { Navigate, useLocation } from 'react-router-dom';
import { publicRoutes, protectedRoutes, authRoutes, Default_Login_Redirect } from "@/routes";
import supabase from '@/api/feature/sessionProvider';


const RouteProvider = ({ children }:{ children: React.ReactNode }) => {
  const location = useLocation();
  const [session, setSession] = useState<string>()

  useEffect(()=>{
    async function getUserData() {
      await supabase.auth.getSession().then((value)=>{
        if(value.data.session){
          setSession(value.data.session.access_token)
        }
      })
    }
    getUserData()
  },[])

  const isProtectedRoute = protectedRoutes.some(route => new RegExp(route).test(location.pathname));
  // @ts-ignore
  const isPublicRoute = !isProtectedRoute && publicRoutes.some(route => new RegExp(route).test(location.pathname));
  const isAuthRoute = authRoutes.some(route => new RegExp(route).test(location.pathname));
 
  if (isProtectedRoute && !session) {
    return <Navigate to="/" />;
  }

  if (isAuthRoute && session) {
    return <Navigate to={Default_Login_Redirect} />;
  }


  return children;
};

export default RouteProvider;