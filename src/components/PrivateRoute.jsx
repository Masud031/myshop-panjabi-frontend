
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { Navigate, useLocation } from 'react-router-dom';

// eslint-disable-next-line react/prop-types
const PrivateRoute = ({children, role}) => {
    const {user} = useSelector((state) => state.auth);
    const [checking, setChecking] = useState(true);
    const location = useLocation()
    
    useEffect(() => {
    // Simulate "rehydration check"
    const timer = setTimeout(() => setChecking(false), 200);
    return () => clearTimeout(timer);
  }, []);
    if (checking) return <div>Loading...</div>; // optional spinner



    if(!user) {
        alert("You must be logged in")
        return <Navigate to="/login" state={{from: location}}  replace/>
    }
    if(role && user?.role !== role) {
        alert ("Access denied! You must be an admin");
        return <Navigate to="/login" state={{from: location}}  replace/>
    }
  return children;
}

export default PrivateRoute