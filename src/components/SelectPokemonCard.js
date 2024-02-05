import React, {useEffect, useState} from 'react';
import './SelectPokemonCard.css';


function SelectPokemoncard({children, clickHandler, fieldClass, cardPlayer, pokemoncards}) {
    const [toRead, setToRead] = useState(true);
    const [pokemons, setPokemons] = useState([{}]);
    let pokemonSave = [{}];

    //   console.log('pokemons to select', pokemoncards)

    useEffect(() => {


        if (toRead) {
            pokemonSave = pokemoncards;
            setToRead(false);
            setPokemons(pokemonSave);
        }


    }, [toRead]);


    return (

        <ul>
            {console.log(pokemons)}
            <select

                id="select-card"
                placeholder="enter your card"
                name="cardPlayerA"

                onChange={clickHandler}
                className={fieldClass}
                onClick={clickHandler}
            >
                {children}
                {pokemons && !toRead && pokemons.map((pokemon, index) => {
                    return (
                        <>
                            {pokemon &&
                                <>

                                    {index === 0 &&
                                        <option value="">
                                            <li key={index}><h1>Select one of below</h1></li>
                                        </option>
                                    }
                                    <option value={pokemon}>

                                        <li key={index + 1}><h1>{pokemon}</h1></li>
                                    </option>
                                </>
                            }
                        </>)
                })}
            </select>
        </ul>);
}

export default SelectPokemoncard;