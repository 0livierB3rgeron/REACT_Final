// Fichier Tableau.js
import React from 'react';

class LigneTableauPoke extends React.Component {
    constructor(props) {
        super(props);
      }

      handleNameChange = (event) => {
        this.props.getRow(this.props.tableauPoke);
    }

    render() {
        return (
        <tr>
            <td name='row' onClick={this.handleNameChange}>{this.props.tableauPoke.nom}</td>
            <td name='row' onClick={this.handleNameChange}>{this.props.tableauPoke.type}</td>
            <td name='row' onClick={this.handleNameChange}>{this.props.tableauPoke.abilite}</td>
            <td name='row' onClick={this.handleNameChange}>{this.props.tableauPoke.stats_total}</td>
        </tr>

        )
    }
}

export default (LigneTableauPoke);