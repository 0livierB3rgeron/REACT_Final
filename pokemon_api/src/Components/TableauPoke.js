// Fichier Tableau.js
import React from 'react';
import LigneTableauPoke from './LigneTableauPoke';

class TableauPoke extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
        };
        
      }
    
    

    render() {
        let ligneTab = [];
        this.props.tableauPoke.forEach(function(pokemons) {

            ligneTab.push(<LigneTableauPoke  getRow={this.props.getRow} Poke={pokemons} key={pokemons.id}/>);
            
        }.bind(this));
        return (
        <div>
            <table className="PokesTable">
                <thead>
                <tr>
                    <th>Nom</th>
                    <th>Type</th>
                    <th>Abilité</th>
                    <th>Stats Total</th>
                </tr>
                </thead>
                <tbody>
                    {ligneTab}
                </tbody>
            </table>
        </div>
        )
    }
}

export default (TableauPoke);