import React, {useEffect, useState} from 'react';
import {useNavigate, useParams} from "react-router-dom";
import ListPokemonCards from "../components/ListPokemonCards";
import './ListCards.css';

function ListCards() {

    const pokemoncards = ["Charizard", "Blastoise", "Venusaur", "Ditto", "Raichu", "Gyarados"];
    const [pokemons, setPokemons] = useState([]);
    const [toList, setToList] = useState(true);
    const [play, setPlay] = useState("")

    const {name} = useParams();

    const navigator = useNavigate();


    useEffect(() => {

        if (pokemons && toList) {

            setPokemons(pokemoncards);
            setToList(false)

        }
    }, [toList]);


    function enterGame(e) {
        e.preventDefault();
        const answer = {play};
        // console.log('play entered', answer)
        navigator(`/pokemonplay/${name}`);

    }

    return (
        <>


            <form className="formSpaceSmall">
                <legend className="column">

                    <label> <span className="form-text">
                                Would you like to enter a gym looking for a fight?
                            </span>
                        <input
                            type='text'
                            id="play"
                            placeholder="please enter yes or no"
                            name="play"
                            value={play}
                            className="form-control"
                            onChange={(e) => setPlay(e.target.value)}/>

                    </label>
                    <br/>
                    <button onClick={enterGame}>Submit
                    </button>

                </legend>

            </form>
            {toList &&
                <>
                    <h3>To start your game, we have given you 6 Pokemons to use. These are the Pokemons you get:</h3>
                    <ListPokemonCards
                        pokemoncards={pokemons}
                        setPokemoncards={setPokemons}

                    />
                </>
            }
        </>
    )

}

export default ListCards;