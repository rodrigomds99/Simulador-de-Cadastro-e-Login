import { useState } from 'react';
import './App.css'
import Login from './Components/Login/Login';
import Register from './Components/Register/Register';

alert("[AVISO] Este é um simulador de Cadastro e Login, por favor não insira suas verdadeiras credenciais!!")

function App() {
  const [currentScreen, setCurrentScreen] = useState("login");
  const toggleScreen = (screen) => {
    setCurrentScreen(screen);
  };

  return (
    <div className='App'>
      {currentScreen === 'login' ? (
        <Login toggleScreen={toggleScreen}/>
      ) : (
        <Register toggleScreen={toggleScreen}/>
      )}
    </div>
  );
}

export default App
