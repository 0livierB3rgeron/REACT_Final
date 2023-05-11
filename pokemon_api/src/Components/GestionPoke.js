import React from 'react';
import axios from 'axios';
import TableauPoke from './TableauPoke';

class GestionPoke extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            pokemons : [],
            isLoaded : false,
            id: 0,
            nom: "",
            type: "",
            abilite: "",
            stats_total: "",
            message: "",
            codeHTTP: "",
            img: "",
            nomUser: "",
            mdp: "",
            cle: ""
        };
        this.addPokemon = this.addPokemon.bind(this);
        this.modifyPokemon = this.modifyPokemon.bind(this);
        this.clearInput = this.clearInput.bind(this);
        this.handleChange = this.handleChange.bind(this);
        this.refresh = this.refresh.bind(this);
        this.deletePokemon = this.deletePokemon.bind(this);
        this.callPokeAPI = this.callPokeAPI.bind(this);
        this.createUser = this.createUser.bind(this);
  
    }

    handleChange(event) {
        const name = event.target.name;
        const value = event.target.value;
        this.setState({
            [name]: value
        });
        console.log(this.state.nomUser)
    }
    
    clearInput(event) {
        this.setState({
            nom: "",
            type: "",
            abilite: "",        
            stats_total: "",
            nomUser: "",
            mdp: "",
            cle: ""
        });
    }

    componentDidMount(){
        axios.get('http://127.0.0.1/EpreuveFinale/SLIM_finale/pokemon')
            .then((response) => {
                const pokemons = response.data.Pokemon;
                this.setState({
                    pokemons : pokemons, 
                    isLoaded : true,
                })
            }
            )
        this.callPokeAPI();
    }

    /*
    * FONCTION QUI RAFRAÎCHIT LE TABLEAU
    */
    refresh(){
        axios.get('http://127.0.0.1/EpreuveFinale/SLIM_finale/pokemon')
        .then((response) => {
            const pokemons = response.data.Pokemon;
            this.setState({pokemons : pokemons, isLoaded : true})
        }
        )
    }

    /**
     * Fonction qui crée un user
     */
    createUser(){
        axios({
            method: 'POST',
            url: 'http://127.0.0.1/EpreuveFinale/SLIM_finale/user',
            data:{
              nomUser: this.state.nomUser,
              mdp: this.state.mdp,
              cle: this.state.cle,
            }
          })
          .then((resultat) =>{
              if(resultat.status === 201){
  
                  this.setState({
                      codeHTTP: resultat.status,
                      message: resultat.statusText + " le traitement à bien fonctionner!" + " " + resultat.data.code_usager + " à été crée"
                  })
              }
              else{
                  this.setState({
                      codeHTTP: resultat.status,
                      message: resultat.statusText + " erreur est arrivé"
                  })
              }
  
          })

    }


    /**
     * FONCTION QUI APPEL UN API QUI N'EST PAS LE MIEN
     *
     */
    callPokeAPI(){
        axios.get('https://pokeapi.co/api/v2/pokemon/gengar')
        .then((response) => {
            const img = response.data.sprites.front_shiny;
            this.setState({img : img, isLoaded : true})
        }
        )
    }



    /*
    * FONCTION QUI VA CHERCHER LES DONNÉE DE LA RANGÉ CLIQUER
    */
    getRow = (returned) =>  this.setState({nom: returned.nom, id: returned.id, type: returned.type, abilite: returned.abilite, stats_total: returned.stats_total});

    /*
    * FONCTION QUI SUPPRIME UN POKEMON
    */
    deletePokemon(){
        const id = this.state.id;
        axios({
            method: 'DELETE',
            url: `http://127.0.0.1/EpreuveFinale/SLIM_finale/pokemon/${id}`,
          })
          .then((resultat) =>{
            if(resultat.status === 200){

                this.setState({
                    codeHTTP: resultat.status,
                    message: resultat.statusText + " le traitement à bien fonctionner!" + " " + resultat.data.nom + " à été supprimer"
                })
            }
            else{
                this.setState({
                    codeHTTP: resultat.status,
                    message: resultat.statusText + " erreur est arrivé"
                })
            }
            this.refresh();
        })
    }

    /*
    * FONCTION QUI MODIFIE UN POKEMON
    */
    modifyPokemon(){
        const id = this.state.id;
        axios({
            method: 'PUT',
            url: `http://127.0.0.1/EpreuveFinale/SLIM_finale/pokemon/${id}`,
            data:{
              nom: this.state.nom,
              type: this.state.type,
              abilite: this.state.abilite,
              stats_total: this.state.stats_total
            }
          })
          .then((resultat) => {
            const pokeEditer = this.state.pokemons.map(poke =>{
                if(id === poke.id){
                    return{
                        nom: resultat.data.nom,
                        type: resultat.data.type,
                        abilite: resultat.data.abilite,
                        stats_total: resultat.data.stats_total
                    }
                }
                if(resultat.status === 200){

                    this.setState({
                        codeHTTP: resultat.status,
                        message: resultat.statusText + " le traitement à bien fonctionner!" + " " + resultat.data.nom + " à été modifier"
                    })
                }
                else if(resultat.status === 201){
                    this.setState({
                        codeHTTP: resultat.status,
                        message: resultat.statusText + " le traitement à bien fonctionner!" + " " + resultat.data.nom + " à été crée, car il n'existait pas"
                    })
                }
                else{
                    this.setState({
                        codeHTTP: resultat.status,
                        message: resultat.statusText + " erreur est arrivé"
                    })
                }
                return poke;
            });
            this.setState({pokemons: pokeEditer});
            this.clearInput();
          });
    }

    /*
    * FONCTION QUI CRÉE UN POKEMON
    */
    addPokemon(){
        axios({
          method: 'POST',
          url: 'http://127.0.0.1/EpreuveFinale/SLIM_finale/pokemon',
          data:{
            nom: this.state.nom,
            type: this.state.type,
            abilite: this.state.abilite,
            stats_total: this.state.stats_total
          }

        })
        .then((resultat) =>{
            if(resultat.status === 201){

                this.setState({
                    codeHTTP: resultat.status,
                    message: resultat.statusText + " le traitement à bien fonctionner!" + " " + resultat.data.nom + " à été crée"
                })
            }
            else{
                this.setState({
                    codeHTTP: resultat.status,
                    message: resultat.statusText + " erreur est arrivé"
                })
            }

        })
    }
    
    render() {
        if(this.state.isLoaded){
            return (
            <div>
                <form>
                    <table>
                        <label> - Connexion/Creation Usager -</label>
                        <tr>------------------------------------------</tr>
                        <tr>
                            <td><label>Usager :</label></td>
                            <td>
                                <input 
                                type='text'
                                id='nomUser'
                                name='nomUser'
                                value={this.state.nomUser}
                                onChange={this.handleChange}>
                                </input>
                            </td>
                        </tr>
                        <tr>
                            <td><label>Mots de passe :</label></td>
                            <td>
                                <input 
                                type='text'
                                id='mdp'
                                name='mdp'
                                value={this.state.mdp}
                                onChange={this.handleChange}>
                                </input>
                            </td>
                        
                        </tr>
                        <tr>
                            <td><label>Cle API :</label></td>
                            <td>
                                <input 
                                type='text'
                                id='cle'
                                name='cle'
                                value={this.state.cle}
                                onChange={this.handleChange}>
                                </input>
                            </td>
                        
                        </tr>
                        <tr>
                                <td></td>
                                <td style={{'textAlign':'right'}}>
                                    <input type="button" value="Cancel" onClick={this.clearInput}/>
                                    <input type="button" value="Créer" onClick={this.createUser}/>
                                    <input type="button" value="Connecter" />
                                </td>
                        </tr>
                        <tr>------------------------------------------</tr>
                    </table>
                </form>
                <p>Image vien de -- https://pokeapi.co/ -- </p>
                <img src={this.state.img} alt='' height={200}></img>
                <h2>Ajouter/Modifier un Pokémon</h2>
                <p>HTTP: {this.state.codeHTTP}</p>
                <p>{this.state.message}</p>
                <form onSubmit={this.addPokemon}>

                    <table className='PokeTable'>
                        <tbody>
                            <tr>
                                <td><label>Nom :</label></td>
                                <td>
                                    <input
                                        type="text"
                                        id="nom"
                                        name="nom"
                                        value={this.state.nom}
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
                                        value={this.state.type}
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
                                        value={this.state.abilite}
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
                                        value={this.state.stats_total}
                                        onChange={this.handleChange}
                                    />
                                </td>
                            </tr>

                            <tr>
                                <td></td>
                                <td style={{'textAlign':'right'}}>
                                    <input type="button" value="Cancel" onClick={this.clearInput}/>
                                    <input type="button" value="Modifier" onClick={this.modifyPokemon}/>
                                    <input type="button" value="Supprimer" onClick={this.deletePokemon}/>
                                    <input type="submit" value="Ajouter" />
                                </td>
                            </tr>
                        </tbody>
                    </table>
                </form>
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