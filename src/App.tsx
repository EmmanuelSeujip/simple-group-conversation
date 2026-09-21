import './App.css'
import AppRouter from './routes/AppRouter'
import {useEffect} from "react";
import {sender} from "./utils/sender.ts";
import type User from "./models/userModel.ts";
import {userStore} from "./store/UserStore.ts";

function App() {
  const setUser= userStore((state)=>state.setUser)
  const setLoading= userStore((state)=>state.setLoading) ;
  useEffect( () => {
    const token = localStorage.getItem('token');
    if (!token) {
      setLoading(false);
      return;
    }

    sender<User>({
      url:"/api/auth/me",
      method:"GET"
    }).then((reponse)=>{
      setUser(reponse)
    })
        .catch(() => localStorage.removeItem('token'))
        .finally(() => setLoading(false));
  }, [setLoading, setUser]);
  return <AppRouter />
}

export default App
