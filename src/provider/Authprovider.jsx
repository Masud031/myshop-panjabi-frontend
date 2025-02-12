// import { createContext, useEffect, useState } from "react";
// import {  createUserWithEmailAndPassword, getAuth, onAuthStateChanged,signInWithEmailAndPassword, signOut } from "firebase/auth";
// import app from "../pages/Home/firebase/firebase.init";


// export const Authcontext=createContext();
// const auth = getAuth(app);

// const Authprovider = ({children}) => {
// const[user,setUser]=useState(null);
// const [loading,setLoading]=useState(true)

// const creatUser=(email,password)=>{
//     setLoading(true);
//     return createUserWithEmailAndPassword(auth,email,password);
// }
// const signIn=(email,password)=>{
//     setLoading(true);
//     return signInWithEmailAndPassword(email,password);
// }
// const logOut=()=>{
//     setLoading(true);
//     return signOut(auth);
// }

// useEffect(()=>{
//    const unsubscribe= onAuthStateChanged(auth,currentUser=>{
//         setUser(currentUser)
//         setLoading(false)
     
//     });
//     return ()=>{
//         unsubscribe();
//     }
// },[])
//     const authInfo={
//         user,
//         loading,
//         creatUser,
//         signIn,
//         logOut
        
//     }
//     return (
//         <Authcontext.Provider value={authInfo}>
//             {children}
//         </Authcontext.Provider>
//     );
// };

// export default Authprovider;