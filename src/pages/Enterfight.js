import React, {useEffect, useState} from 'react';
import {useParams, useNavigate} from "react-router-dom";
import {
    enterFightRound, getFightResults,
    getPokemonPlayById,
    listPokemon,
    nextRound,
} from "../services/PokemonService";
import './Enterfight.css';

import fightResultLines from "../helpers/fightResultLines";


function Enterfight() {

    const [answer, setAnswer] = useState('');
    const [initialised, setInitialised] = useState(false);
    const [pokemonPlay, setPokemonPlay] = useState({
        namePlayerA: '',
        cardPlayerA: '',
        nameGymOwner: '',
        cardGymOwner: '',
        usedPokemon: ''
    });
    const [cardP, setCardP] = useState("");
    const [cardG, setCardG] = useState("");
    const [fightResults, setFightResults] = useState(["Enter 'start' to begin", "Every new game, gymowner starts with attack"]);
    const attacks = ["leafStorm", "solarBeam", "fireLash", "leechSeed", "leaveBlade", "inferno", "pyroBall", "fireLash", "flameThrower", "thunderPunch", "electroBall", "thunder", "voltTackle", "surf", "hydroPump", "hydroCanon", "rainDance"];
    const [optionsToChoose, setOptions] = useState(["start"]);
    const {id} = useParams();
    const navigator = useNavigate();
    const currentId = parseInt(id);
    const [numberNext, setNumberNext] = useState(0);

    useEffect(() => {

        if (id && !initialised) {
            setInitialised(true);
            getPokemonPlayById(id).then((response) => {

                setPokemonPlay({...response.data})

                listPokemon(response.data.cardPlayerA).then((responsecard) => {
                    setCardP(responsecard.data.sprites.front_default);
                    listPokemon(response.data.cardGymOwner).then((responsecard2) => {
                        setCardG(responsecard2.data.sprites.front_default);

                        getFightResults(id).then((resultLines) => {
                            const lastindex = resultLines.data.length;
                            setNumberNext(lastindex);
                         //   console.log('card', resultLines.data);

                            //   if (results2[results2.length - 3].includes("defeated")) {

                            if (resultLines.data.length === 0 || resultLines.data[lastindex - 3].textline.includes("defeated")) {

                            } else {

                                if (resultLines.data.length > 0 && resultLines.data[lastindex - 1].pokemonplayDto.id === currentId) {
                                    setFightResults(["Pokemoncard change", "Attack or change your Pokemon", "Type a for attack or c for change"]);
                                    setOptions(["a", "c"]);
                                }
                                ;
                            }

                        }).catch(error => {
                            console.error(error);
                        })


                    }).catch(error => {
                        console.log(error);
                    })

                }).catch(error => {
                    console.log(error);
                })


            }).catch(error => {
                console.log(error);
            })

        }


    }, [])


    function firstStep(pokemonplay) {

        const updatedPokemonplay = {...pokemonplay}
        let returnValue = [];

        enterFightRound(id, updatedPokemonplay).then((responseresults) => {
            setFightResults(["Choose your attack", "one of the below"]);
            getFightResults(id).then((resultLines) => {
                const results = resultLines.data.filter((item) => {
                    const playId = item.pokemonplayDto.id;

                    if (playId === currentId && numberNext < item.id) {
                        return item.textline;
                    }
                });
                setNumberNext(resultLines.data.length);
                const results2 = fightResultLines(results.map((item) => item.textline), updatedPokemonplay);
                setFightResults(results2);

            }).catch(error => {
                console.error(error);
            })


        }).catch(error => {
            console.error(error);
        })
    }


    function toNextStep(e) {
        e.preventDefault();
        //   console.log('yes continue with fight', answer);
        const updatedPokemonplay = {...pokemonPlay}

        setOptions([])


        switch (answer) {
            case "start":
                //   console.log('firststep call from function toNextStep:');
                setOptions(["a", "c"]);
                firstStep(pokemonPlay);

                break;
            case "yes":
                navigator(`/pokemoncards/${pokemonPlay.namePlayerA}`);

                setAnswer('');
                setOptions([""]);
                break;

            case "no":
                //   console.log('restart fight?', answer);
                setFightResults(["Thank you for playing"]);
                setAnswer('');
                setOptions(["start"]);
                break;
            case "a":
                nextRound(answer, updatedPokemonplay).then((responsenextround) => {

                    setFightResults(["Choose your attack", "one of the below"]);
                    getFightResults(id).then((resultLines) => {
                        const results = resultLines.data.filter((item) => {
                            const playId = item.pokemonplayDto.id;
                            if (playId === currentId && numberNext < item.id) {
                                return item.textline;
                            }
                        });
                        setNumberNext(resultLines.data.length);
                        const results2 = fightResultLines(results.map((item) => item.textline), updatedPokemonplay);
                        setFightResults(results2);

                        if (results2[results2.length - 3].includes("defeated")) {
                            setOptions(["yes", "no"])
                        } else {
                            const attackOptions = results2.slice(0, 4);
                            setOptions(attackOptions);
                        }
                        ;

                    }).catch(error => {
                        console.error(error);
                    })


                    navigator(`/pokemonplay/nextround/${answer}/${id}`);

                }).catch(error => {
                    console.error(error);
                })
                setAnswer('');
                break;
            case "c":
                getPokemonPlayById(id).then((responsechange) => {
                    // console.log('playchange', responsechange.data);

                    setPokemonPlay({...responsechange.data})
                    navigator(`/pokemonplay/${responsechange.data.namePlayerA},${responsechange.data.cardGymOwner}`);

                }).catch(error => {
                    console.error(error);
                })
                setAnswer('');
                setOptions(["a", "c"]);
                break;
            default:
                //   console.log('answer:', answer);
                const found = attacks.find((attackfound) => {
                    return attackfound === answer
                })
                if (found) {
                    nextRound(answer.toLowerCase(), updatedPokemonplay).then((responsenext) => {
                        setFightResults(["Choose your attack", "one of the below"]);
                        getFightResults(id).then((resultLines) => {
                            const results = resultLines.data.filter((item) => {
                                const playId = item.pokemonplayDto.id;
                                if (playId === currentId && numberNext < item.id) {
                                    return item.textline;
                                }
                            });
                            setNumberNext(resultLines.data.length);
                            const results2 = fightResultLines(results.map((item) => item.textline), updatedPokemonplay);
                            setFightResults(results2);

                        }).catch(error => {
                            console.error(error);
                        })
                        setOptions(["a", "c"]);

                        navigator(`/pokemonplay/nextround/${id}`);

                    }).catch(error => {
                        console.error(error);
                    })
                } else {
                    console.log('no answer')
                }

                setAnswer('');

        }
    }


    return (
        <>

            {pokemonPlay && initialised &&
                <div className="outer-container">
                    <div className="inner-container bodypage">

                        <h2>Enter fight for {pokemonPlay.namePlayerA}</h2>
                        <form className="formSpace">
                            <legend>
                                <label className="row">
                                    <div className="card-fight">
                                         <span> <h5 className=""> Name player: </h5>
                                             {pokemonPlay.namePlayerA} </span>
                                        <span>    <h5 className=""> Card: </h5>
                                            {pokemonPlay.cardPlayerA}    </span>
                                        <span><img src={cardP} alt="card"/></span>
                                    </div>

                                    <div className="card-fight">
                                          <span>
                                        <h5 className="l"> Name owner </h5>  {pokemonPlay.nameGymOwner}      </span>
                                        <span> <h5 className=""> Card: </h5> {pokemonPlay.cardGymOwner}        </span>
                                        <span><img src={cardG} alt="card"/></span>
                                    </div>
                                </label>

                                <br/>

                                <label htmlFor={answer} className="column">
                                    {fightResults.length > 1 ?
                                        <span
                                            className="item-detail">{fightResults[fightResults.length - 2]} </span>
                                        : <span className="item-detail">Enter 'start' to begin your game..</span>
                                    }


                                    <select
                                        id="select-option"
                                        name={answer}
                                        value={answer}
                                        onChange={(e) => setAnswer(e.target.value)}
                                        placeholder="select one of the below">
                                        <option className=""> choose</option>
                                        {optionsToChoose &&

                                            optionsToChoose.map((option) => {
                                                //   console.log('option', option)
                                                return <option key={option} className="" value={option}>
                                                    <h1>{option}</h1>
                                                </option>

                                            })

                                        }


                                    </select>


                                </label>
                                <button onClick={toNextStep}>Submit</button>

                            </legend>


                        </form>
                        <div>
                            <span> Fight results: {initialised} </span>
                            <ul className="results">
                                {fightResults && fightResults.length > 0 &&
                                    fightResults.map((lineItem, index) => {
                                        const string = pokemonPlay.cardGymOwner;
                                        let aligntext = "form-text-left";
                                        if (lineItem.substring(0, 16).includes(pokemonPlay.nameGymOwner) || lineItem.substring(0, 15).includes(pokemonPlay.cardGymOwner) || lineItem.substring(0, 15).includes("Attack")) {
                                            aligntext = "form-text-right";
                                        }

                                        return (
                                            <>

                                                <li className={aligntext} key={(new Date())}>
                                                   <span>
                                                       {lineItem} </span>
                                                </li>
                                            </>
                                        )
                                    })}
                            </ul>
                            <br/>
                        </div>
                    </div>
                </div>

            }

        </>
    );
}

export default Enterfight;