import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import {enterPokemonCard, enterPokemonPlay, updatePokemonPlay} from "../services/PokemonService";
import './Playpokemon.css';
import ListPokemonCards from "../components/ListPokemonCards";
import SelectPokemonCard from "../components/SelectPokemonCard";


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
        usedPokemon: ''
    });

    const {name} = useParams();
    const navigator = useNavigate();

    const words = name.split(',');


    useEffect(() => {


            if (name && (words.length < 2 && enterGame)) {
                setEnterGame(false);
                enterPokemonPlay(words[0]).then((response) => {

                    setPokemonPlay({...response.data});
                }).catch(error => {
                    console.log(error);
                })

            }

        if (name) {
            if (enterCard) {
                setEnterCard(false);


                enterPokemonCard(words[0]).then((responseCard) => {

                    const cards = responseCard.data.map((record) => {
                            return ([{name: record.name, hp: record.hp}]);

                        });

                        if (words[1] > "") {
                            setPokemonPlay(
                                {
                                    namePlayerA: words[0],
                                    cardPlayerA: '',
                                    nameGymOwner: 'Pewter City',
                                    cardGymOwner: words[1],
                                    usedPokemon: ''
                                },
                            )
                        }

                        setPokemons(cards);


                    }).catch(error => {
                        console.log(error);
                    })
                }


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
        console.log(updatedPokemonplay);
        updatePokemonPlay(words[0], updatedPokemonplay).then((response) => {

            const id = response.data.id;
            navigator(`/pokemonplay/enterfight/${id}`);

        }).catch(error => {
            console.error(error);
        })

    }

    function handleChange(evt) {

        const value =
            evt.target.type === "checkbox" ? evt.target.checked : evt.target.value;
        setPokemonPlay({...pokemonPlay,  [evt.target.name]: value, "usedPokemon": value});


      // console.log('new value', value, evt.target.name, evt.target.value, evt.target.checked);
    }


    return (
        <>

            {pokemons && pokemons.length > 1 && pokemons.length === Object.keys(pokemons).length &&

                <div className="outer-container">
                    <div className="inner-container">
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
                                        Pewter City: Hello stranger, I'm Pewter City, the owner of this gym, Who are
                                        you?
                                    </h4>
                                    <span className="item-detail">
                                        {pokemonPlay.namePlayerA}: I'm {pokemonPlay.namePlayerA} and I'm here to
                                        challenge
                                        you
                                        for a battle
                                    </span>
                                    <h4 className="item-detail">{pokemonPlay.nameGymOwner}: So you are after my badge
                                        too, lets fight!!!
                                    </h4>
                                    <h4 className="item-detail">{pokemonPlay.nameGymOwner}: I'll choose
                                        you, {pokemonPlay.cardGymOwner}
                                    </h4>


                                </label>
                                <label htmlFor="select-card" className="row">
                                    <span className="item-detail">{pokemonPlay.namePlayerA}: I'll choose you, </span>


                                    <SelectPokemonCard
                                        fieldClass="form-text"
                                        clickHandler={handleChange}
                                        cardPlayer={pokemonPlay.cardPlayerA}
                                    pokemoncards={pokemoncards}
                                    >

                                    </SelectPokemonCard>
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