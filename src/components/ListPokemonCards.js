import React, {useEffect, useState} from 'react';
import CheckName from "../helpers/checkName";
import {Link} from "react-router-dom";
import {listPokemon} from "../services/PokemonService";
import './ListPokemonCards.css';

function ListPokemonCards({pokemoncards, setPokemoncards}) {


    const [toRead, setToRead] = useState(true);
    const [gelezen, setGelezen] = useState(0);
    const [pokemons, setPokemons] = useState([{}]);

    const dummyData = [{
        // ("Charrizard", 76, 150, "firenougats", "GRRRRRRRRRRRRRRR")

        "id": 0,
        "name": "Charizard",
        "level": 76,                       // game index ?
        "weight": 150,
        "food": "firenougats",
        "sound": "GRRRRRRrrrrrrrrrrrrrrrrr!"
    },
        // "Blastoise", 40, 110, "Pokeflakes", "Blaasstoooiiissss")
        {
            "id": 1,
            "name": "Blastoise",
            "level": 40,
            "weight": 110,
            "food": "Pokeflakes",
            "sound": "BlAAAAaasshhh!"
        },
        {
            //   "Venusaur", 50, 135, "Pokeleafs", "Veennnusaur");
            "id": 2,
            "name": "Venusaur",
            "level": 50,
            "weight": 135,
            "food": "Pokeleafs",
            "sound": "VEEEnUUUuusaur!"
        },
        {
            //   "Ditto", 60, 140, "Everything", "Diiiiito!")
            "id": 3,
            "name": "Ditto",
            "level": 60,
            "weight": 140,
            "food": "Everything",
            "sound": "dddiiitttttttt!"
        },
        // ("Raichu", 80, 160, "Pokebrocks", "Raaiiichhuu!");

        {
            "id": 4,
            "name": "Raichu",
            "level": 80,
            "weight": 160,
            "food": "Pokebrocks",
            "sound": "RaiiichhHHhuuu!"
        },
        // "Gyarados", 90, 180, "Pokeflakes", "Gyaarrraados");
        {
            "id": 5,
            "name": "Gyarados",
            "level": 90,
            "weight": 180,
            "food": "Pokeflakes",
            "sound": "GyaaraAAahh!"
        }


    ]


    let pokemonSave = [{}];

    if (pokemoncards.length > 0) {
        setPokemoncards(pokemoncards);
    }
    ;


    useEffect(() => {
      // console.log('pokemoncards passed', pokemoncards);

        if (pokemoncards.length > 0) {

            //   hier filter ik de namen van de pokemonkaarten  die men kan kiezen
            const pokemoncardnames = dummyData.map((pokemoncard) => {
                return pokemoncard.name;
            });

            pokemonSave = [{}];
            for (let i = 0; i < pokemoncardnames.length; i++) {
                const foundA = CheckName(pokemoncards, pokemoncardnames[i]);
                const found = pokemoncardnames.find((pokemoncardfound) => {
                    return pokemoncardfound === dummyData[i].name
                })
                if (found) {

                    listPokemon(dummyData[i].name).then((response) => {
                        if (found) {
                         //   console.log('ik heb pokemensSave gevuld voor index', i, pokemoncards[i]);
                            setGelezen(i);
                            const pokemoncard = pokemoncards[i];
                            pokemonSave[i] = ({
                                id: dummyData[i].id,
                                name: dummyData[i].name,
                                url: response.data.sprites.front_default,
                                types: response.data.types,
                                level: dummyData[i].level,
                                weight: pokemoncard[0].hp,
                                food: dummyData[i].food,
                                sound: dummyData[i].sound


                            });
                         //   console.log('ik heb pokemensSave gevuld voor index', i, pokemonSave[i]);
                        } else {
                            setGelezen(i);
                            pokemonSave[i] = ({
                                id: dummyData[i].id
                            });
                        }
                    }).catch(error => {
                        console.error(error);
                    })
                }
            }
            if (pokemonSave) {
                setToRead(false);
                setPokemons(pokemonSave);
            }

        } else {
            setToRead(false);

        }
        ;


    }, [toRead]);


    return (
        <div className="outer-container">
            <div className="inner-container">

                <ul className="list-type">
                    {pokemons && pokemons.length === Object.keys(pokemons).length && gelezen > 0 &&
                        pokemons.map((pokemon, index) => {

                        return (
                            <>
                                {pokemon.name &&
                                    <li className="card" key={index}>
                                        <h1><Link to={`/pokemonplay/${pokemon.id}`}>{pokemon.name}</Link></h1>
                                        <p><img src={pokemon.url} alt="afbeelding"/>
                                        </p>
                                        <p><strong>Types:</strong></p>
                                        <ul className="list-type">
                                            {pokemon.types.map((item) => {

                                                return <li key={item.type.url}>
                                                    <span>{item.type.name}</span>
                                                </li>
                                            })}

                                        </ul>

                                        <p> <strong>level: </strong>{pokemon.level}</p>
                                        <p> <strong>weight:</strong> {pokemon.weight}</p>
                                        <p> <strong>food:</strong> {pokemon.food}</p>
                                        <p> <strong> sound:</strong> {pokemon.sound}</p>
                                    </li>
                                }
                            </>)
                    })}
                </ul>


            </div>

        </div>
    );
}

export default ListPokemonCards;