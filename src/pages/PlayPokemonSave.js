import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {enterPokemonCard, enterPokemonPlay, getPokemonPlayById, updatePokemonPlay} from "../services/PokemonService";
import './Playpokemon.css';
import ListPokemonCards from "../components/ListPokemonCards";
import SelectPokemonItem from "../components/SelectPokemonItem";


function PlayPokemon() {
    const pokemoncards = ["Charizard", "Blastoise", "Venusaur", "Ditto", "Raichu", "Gyarados"];
    const [pokemons, setPokemons] = useState([]);
    const [enterGame, setEnterGame] = useState(true);
    const [enterCard, setEnterCard] = useState(true);
    const [pokemonPlay, setPokemonPlay] = useState({
        namePlayerA: '',
        cardPlayerA: '',
        nameGymOwner: 'Pewter City',
        cardGymOwner: '',
        usedCard: ''
    });

    const {name} = useParams();
    const navigator = useNavigate();

    useEffect(() => {


            if (name && enterGame) {
                setEnterGame(false);
                enterPokemonPlay(name).then((response) => {
                    //         console.log('enter pokemon response', response.data);
                    setPokemonPlay({...response.data});
                }).catch(error => {
                    console.log(error);
                })

            }

            if (name && enterCard) {
                setEnterCard(false);


                enterPokemonCard(name).then((responseCard) => {
                    console.log('enter pokemon card', responseCard.data);
                    const cardNames = responseCard.data.map(({name}) => name);
                    console.log('mapresult', cardNames);
                    setPokemons(cardNames);


                }).catch(error => {
                    console.log(error);
                })
            }


        },
        [name]
    )

    // useEffect(() => {
    //     console.log(  'ik word uitgevoerd na mounting', resultarray);
    // },[pokemons]);

    // useEffect(() => {
    //     console.log(        'ik word iedere keer uitgevoerd na rendering', resultarray);
    // });




    function updateToPokemonPlay(e) {
        e.preventDefault();
        const updatedPokemonplay = {...pokemonPlay}
        updatePokemonPlay(name, updatedPokemonplay).then((response) => {
            console.log(response.data);
            const id = response.data.id;
            navigator(`/pokemonplay/enterfight/${id}`);

        }).catch(error => {
            console.error(error);
        })

    }

    function handleChange(evt) {
        const value =
            evt.target.type === "checkbox" ? evt.target.checked : evt.target.value;
        setPokemonPlay({...pokemonPlay, [evt.target.name]: value});
        console.log('new value', value, evt.target.name, evt.target.value, evt.target.checked);
    }


    return (
        <>

            {pokemons && pokemons.length > 1 && pokemons.length === Object.keys(pokemons).length &&

                <div className="outer-container">
                    <div className="inner-container">
                        {/*{console.log('ik ben gerenderd', pokemons[1..valueOf(pokemons.length)], Object.keys(pokemons).length)}*/}
                        <br/>
                        <h2>Enter Pokemon Play</h2>
                        <br/>
                        <form className="formSpace" onSubmit={updateToPokemonPlay}>
                            <legend className="column form-text">
                                <label htmlFor="player-fields">
                            <span className="">
                                You have entered the Brock gym.
                            </span>
                                    <span className="item-detail">
                                In front of you stands a pokemon trainer
                                    </span>
                                    <h4 className="item-detail">
                                        Pewter City: Hello stranger, I'm Pewter City, the owner of this gym, Who are you?
                                    </h4>
                                    <span className="item-detail">
                                        {pokemonPlay.namePlayerA}: I'm {pokemonPlay.namePlayerA} and I'm here to
                                        challenge
                                        you
                                        for a battle
                                    </span>
                                    <h4 className="item-detail">{pokemonPlay.nameGymOwner}: So you are after my badge too, lets fight!!!
                                    </h4>
                                    <h4 className="item-detail">{pokemonPlay.nameGymOwner}: I'll choose you, {pokemonPlay.cardGymOwner}
                                    </h4>


                                </label>
                                <label htmlFor="select-card" className="row">
                                    <span className="item-detail">{pokemonPlay.namePlayerA}: I'll choose you, </span>


                                    <SelectPokemonItem
                                        fieldClass="form-text"
                                        clickHandler={handleChange}
                                        pokemonitem={pokemonPlay.cardPlayerA}
                                        pokemonitems={pokemons}
                                    >

                                    </SelectPokemonItem>
                                </label>
                                <button onClick={updateToPokemonPlay}>Submit</button>
                            </legend>
                        </form>

                        <ListPokemonCards
                            pokemoncards={pokemons}
                            setPokemoncards={setPokemons}
                        />
                    </div>
                </div>

            }
        </>
    )

}

export default PlayPokemon;