import React, {useState} from 'react';
import {useNavigate} from "react-router-dom";
import './PokemonPlay.css';
import {createPokemonPlay} from "../services/PokemonService";


function PokemonPlay() {
    const [formState, setFormState] = useState({
        namePlayerA: '',
        cardPlayerA: '',
        nameGymOwner: 'Pewter City',
        cardGymOwner: '',
        usedPokemon: ''
    })
    const navigator = useNavigate();

    function saveOrUpdatePokemonPlay(e) {
        e.preventDefault();

        const pokemonPlay = {...formState}

        createPokemonPlay(pokemonPlay).then((response) => {

            const id = response.data.id;
            const name = response.data.namePlayerA

            navigator(`/pokemoncards/${name}`);

        }).catch(error => {
            console.log(error);
        })
    }

    return (
        <div className="outer-container">
            <div className="inner-container">
                <br/>
                <h2>Pokemon Play</h2>
                <br/>
                <div className="bodypage">
                    <form className="formSpace">
                        <legend className="column">
                            <label> <span className="form-text">
                                First player please enter your name:
                            </span>
                                <input
                                    type='text'
                                    id="namePlayerA"
                                    placeholder="enter your name"
                                    name="namePlayerA"
                                    value={formState.namePlayerA}
                                    className="form-control"
                                    onChange={(e) => setFormState({...formState, [e.target.name]: e.target.value})}/>

                            </label>
                            <br/>
                            <button onClick={saveOrUpdatePokemonPlay}>Submit</button>

                        </legend>
                    </form>
                </div>
            </div>

        </div>
    );
}

export default PokemonPlay;
