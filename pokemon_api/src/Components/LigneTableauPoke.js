// Fichier Tableau.js
import React from 'react';

class LigneTableauPoke extends React.Component {
    constructor(props) {
        super(props);
      }

      handleNameChange = (event) => {
        this.props.getRow(this.props.Poke);
    }

    render() {
        return (
        <tr>
            <td name='row' onClick={this.handleNameChange}>{this.props.Poke.nom}</td>
            <td>{this.props.Poke.type}</td>
            <td>{this.props.Poke.abilite}</td>
            <td >{this.props.Poke.stats_total}</td>
        </tr>

        )
    }
}

export default (LigneTableauPoke);