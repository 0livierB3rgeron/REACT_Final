import logo from './logo.svg';
import './App.css';
import React from 'react';
import GestionPoke from './Components/GestionPoke';
import TableauPoke from './Components/TableauPoke';

class App extends React.Component {
  render(){
    
    return (
      <div className="App">
      <header className="App-header">
          <h1>Pokemon API</h1>

          <GestionPoke/>

      </header>
    </div>
    );
  }
}

export default (App);
