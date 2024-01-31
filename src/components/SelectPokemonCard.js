import React, {useEffect, useState} from 'react';
import './SelectPokemonCard.css';



function SelectPokemoncard({children, clickHandler, fieldClass, cardPlayer,  pokemoncards}) {
    const [toRead, setToRead] = useState(true);
    const [pokemons, setPokemons] = useState([{}]);
    let pokemonSave = [{}];

    console.log('pokemons to select', pokemoncards)

    useEffect(() => {


        if (toRead) {
            pokemonSave = pokemoncards;
            setToRead(false);
            setPokemons(pokemonSave);
        }



    }, [toRead]);


    return (
        <ul>
            <select
             //   type='text'
                id="select-card"
                placeholder="enter your card"
                name="cardPlayerA"
            //    cardPlayer={cardPlayer}
                onChange={clickHandler}
                className={fieldClass}
                onClick={clickHandler}
            >
                {children}
                {pokemons && !toRead && pokemons.map((pokemon, index) => {
                    return (
                        <>
                            {pokemon &&
                                <option value={pokemon}>
                                    <li key={index}><h1>{pokemon}</h1></li>
                                </option>
                            }
                        </>)
                })}
            </select>
        </ul>);
}

export default SelectPokemoncard;