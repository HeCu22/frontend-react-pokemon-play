import React, {useEffect, useState} from 'react';
import './SelectPokemonItem.css';



function SelectPokemonItem({children, clickHandler, fieldClass, pokemonitem, pokemonitems}) {
    const [toRead, setToRead] = useState(true);
    const [pokemonItemsMap, setPokemonItemsMap] = useState([{}]);
    let pokemonItemSave = [{}];

    console.log(pokemonitem);

    useEffect(() => {


        if (toRead) {
            pokemonItemSave = pokemonitems;
            setToRead(false);
            setPokemonItemsMap(pokemonItemSave);
        }
        ;


    }, [toRead]);


    //
    // <select
    //     type='text'
    //     id="select-card"
    //     placeholder="enter your card"
    //     name="cardPlayerA"
    //     cardPlayer={cardPlayer}
    //     onChange={clickHandler}
    //     className={fieldClass}
    //     onClick={clickHandler}
    // >
    //



    return (
        <ul>
            <select
               id="select-card"
                placeholder="enter value from list"
                name={pokemonitem}
               value={pokemonitem}

                onChange={clickHandler}
                className={fieldClass}
                onClick={clickHandler}
            >
                {children}
                {pokemonItemsMap && !toRead && pokemonItemsMap.map((pokemonItemFound, index) => {
                    return (
                        <>
                            {pokemonItemsMap &&
                                <option value={pokemonItemFound}>
                                    <li key={index}><h1>{pokemonItemFound}</h1></li>
                                </option>
                            }
                        </>)
                })}
            </select>
        </ul>);
}

export default SelectPokemonItem;