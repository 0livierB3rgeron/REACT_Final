import React from 'react';


class FormPoke extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            nom: '',
            type: '',
            abilite: '',
            stats_total: ''
        };

        this.handleChange = this.handleChange.bind(this);

        this.handleSubmit = this.handleSubmit.bind(this);

        this.clearInput = this.clearInput.bind(this);
    }

    handleChange(event) {
        const name = event.target.name;
        const value = event.target.value;
    
        this.setState({
            [name]: value
        });
    }

    handleSubmit(event) {
        const pokemon = {
            nom: this.state.nom,
            type: this.state.type,
            abilite: this.state.abilite,
            stats_total: this.state.stats_total
        };
        this.props.addPoke(pokemon);
    
        event.preventDefault();
        this.clearInput();
    }

    modifyPoke(event){
        const pokemon = {
            nom: this.state.nom,
            type: this.state.type,
            abilite: this.state.abilite,
            stats_total: this.state.stats_total
        };
        this.props.modifyPoke(pokemon, pokemon.id);

        event.preventDefault();
        this.clearInput();
    }

    clearInput() {
        this.setState({
            nom: '',
            type: '',
            abilite: '',
            stats_total: ''
        });
    }


    render() {
        return (
            <div className='formPoke'>
            
                <h2>Ajouter/Modifier un Pokémon</h2>

                <form onSubmit={this.handleSubmit}>

                    <table className='PokeTable'>
                        <tbody>
                            <tr>
                                <td><label>Nom :</label></td>
                                <td>
                                    <input
                                        type="text"
                                        id="nom"
                                        name="nom"
                                        value={this.props.pokemon.nom}
                                        onChange={this.handleChange}
                                    />
                                </td>
                            </tr>

                            <tr>
                                <td><label>Type :</label></td>
                                <td>
                                    <input
                                        type="text"
                                        id="type"
                                        name="type"
                                        value={this.props.pokemon.type}
                                        onChange={this.handleChange}
                                    />
                                </td>
                            </tr>

                            <tr>
                                <td><label>Abilité :</label></td>
                                <td>
                                    <input
                                        type="text"
                                        id="abilite"
                                        name="abilite"
                                        value={this.props.pokemon.abilite}
                                        onChange={this.handleChange}
                                    />
                                </td>
                            </tr>

                            <tr>
                                <td><label>Total des Statistiques :</label></td>
                                <td>
                                    <input
                                        type="text"
                                        id="stats_total"
                                        name="stats_total"
                                        value={this.props.pokemon.stats_total}
                                        onChange={this.handleChange}
                                    />
                                </td>
                            </tr>

                            <tr>
                                <td></td>
                                <td style={{'textAlign':'right'}}>
                                    <input type="button" value="Cancel" onClick={this.clearInput}/>
                                    <input type="button" value="Modifier" onClick={this.modifyPoke}/>
                                    <input type="submit" value="Ajouter" />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                    
                    
                </form>
            </div>
        );
    }
}

export default (FormPoke);