import './App.css'
import AppRouter from './routes/AppRouter'
import {useEffect} from "react";
import {sender} from "./utils/sender.ts";
import type User from "./models/userModel.ts";
import {userStore} from "./store/UserStore.ts";
import {messageStore} from "./store/MessageStore.ts";

function App() {
  const setUser = userStore((state) => state.setUser);
  const setLoading = userStore((state) => state.setLoading);
  const user = userStore((state) => state.user);
  const connectWs = messageStore((state) => state.connectWs);
  const disconnectWs = messageStore((state) => state.disconnectWs);

  useEffect(() => {
    const token = localStorage.getItem('token');
    if (!token) {
      setLoading(false);
      return;
    }

    sender<User>({
      url: "/api/auth/me",
      method: "GET"
    }).then((reponse) => {
      setUser(reponse);
    })
      .catch(() => localStorage.removeItem('token'))
      .finally(() => setLoading(false));
  }, [setLoading, setUser]);

  // Ouvre la connexion WebSocket dès qu'un utilisateur est authentifié
  useEffect(() => {
    const token = localStorage.getItem('token');
    if (user && token) {
      connectWs(token);
    }
    return () => {
      disconnectWs();
    };
  }, [user, connectWs, disconnectWs]);

  return <AppRouter />;
}

export default App;
