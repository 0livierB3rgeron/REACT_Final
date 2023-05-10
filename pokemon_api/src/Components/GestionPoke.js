import React from 'react';
import axios from 'axios';
import TableauPoke from './TableauPoke';
import FormPoke from './FormPoke';

class GestionPoke extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pokemons : [],
            isLoaded : false,
            row: []
        };
        this.addPokemon = this.addPokemon.bind(this);
        this.modifyPokemon = this.modifyPokemon.bind(this);
       
    }
    
    componentDidMount(){
        axios.get('http://127.0.0.1/EpreuveFinale/SLIM_finale/pokemon')
            .then((response) => {
                const pokemons = response.data.Pokemon;
                this.setState({pokemons : pokemons, isLoaded : true})
            }
            )

    }

    getRow = (returned) => this.setState({row: returned});


    //Modifier un pokemon qui existe déjà.
    modifyPokemon(id, poke){
        axios({
            method: 'PUT',
            url: `http://127.0.0.1/EpreuveFinale/SLIM_finale/pokemon/${id}`,
            data:{
              nom: poke.nom,
              type: poke.type,
              abilitie: poke.abilitie,
              stats_total: poke.stats_total
            }
          })
          .then((resultat) => {
            const pokeEditer = this.state.pokemons.map(poke =>{
                if(id == poke.id){
                    return{
                        nom: resultat.data.nom,
                        type: resultat.data.type,
                        abilite: resultat.data.abilite,
                        stats_total: resultat.data.stats_total
                    }
                }
                return poke;
            });
            this.setState({pokemons: pokeEditer});
          });
    }

    //Ajouter un pokemon
    addPokemon(poke){
        axios({
          method: 'POST',
          url: 'http://127.0.0.1/EpreuveFinale/SLIM_finale/pokemon',
          data:{
            nom: poke.nom,
            type: poke.type,
            abilite: poke.abilite,
            stats_total: poke.stats_total
          }

        })
        .then((resultat) =>{
            poke.id = resultat.data.id;

            const poke = [...this.state.pokemons, poke];
            this.setState({pokemons:poke});
        })
    }
    
    render() {
        if(this.state.isLoaded){
            return (
                <div>
                    <FormPoke  modifyPokemon= {this.modifyPokemon} pokemon = {this.state.row} addPokemon={this.addPokemon}/>
                    <TableauPoke getRow = {this.getRow} tableauPoke = {this.state.pokemons}/>
                </div>
            );
        }
        else{
            return(
                <p>Erreur</p>
            );
        }
            
    }
}

export default (GestionPoke);