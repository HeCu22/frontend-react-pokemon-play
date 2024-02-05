import React, {useEffect, useState} from 'react';
import {useParams, useNavigate} from "react-router-dom";
import {enterFight, getPokemonPlayById, listPokemon, nextRound, updatePokemonPlay} from "../services/PokemonService";
import './Enterfight.css';
import SelectPokemonCard from "../components/SelectPokemonCard";
import fightResultLines from "../helpers/fightResultLines";

function Enterfight() {

    const [answer, setAnswer] = useState('')
    const [initialised, setInitialised] = useState(false);
    const [pokemonPlay, setPokemonPlay] = useState({
        namePlayerA: '',
        cardPlayerA: '',
        nameGymOwner: '',
        cardGymOwner: '',
        usedCard: ''
    });
    const [cardP, setCardP] = useState("");
    const [cardG, setCardG] = useState("");
    const [fightResults, setFightResults] = useState([]);
    const attacks = ["leafStorm", "solarBeam", "fireLash", "leechSeed", "leaveBlade", "inferno", "pyroBall", "fireLash", "flameThrower", "thunderPunch", "electroBall", "thunder", "voltTackle", "surf", "hydroPump", "hydroCanon", "rainDance"];

    const {id} = useParams();
    const navigator = useNavigate();
    //   console.log('id', id);

    useEffect(() => {

        if (id && !initialised) {
            setInitialised(true);
            getPokemonPlayById(id).then((response) => {
            //    console.log(response.data);

                setPokemonPlay({...response.data})

                listPokemon(response.data.cardPlayerA).then((responsecard) => {
                    setCardP(responsecard.data.sprites.front_default);


                    listPokemon(response.data.cardGymOwner).then((responsecard2) => {
                        setCardG(responsecard2.data.sprites.front_default);

                        firstStep(response.data);

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


    }, [id, initialised])


    function firstStep(pokemonplay) {
        console.log('started fight', answer);
        const updatedPokemonplay = {...pokemonplay}
        enterFight(id, updatedPokemonplay).then((response) => {
            // console.log(response.data);
            const results = fightResultLines(response.data.textlines,updatedPokemonplay);
            setFightResults(results);
            navigator(`/pokemonplay/enterfight/${id}`);

        }).catch(error => {
            console.error(error);
        })
    }


    function toNextStep(e) {
        e.preventDefault();
        console.log('yes continue with fight', answer);
        const updatedPokemonplay = {...pokemonPlay}


        switch (answer) {
            case "yes":

                enterFight(id, updatedPokemonplay).then((response) => {
                    //         console.log(response.data);
                    const results = fightResultLines(response.data.textlines, updatedPokemonplay);
                    setFightResults(results);
                    navigator(`/pokemoncards/${pokemonPlay.namePlayerA}`);
                }).catch(error => {
                    console.error(error);
                })
                setAnswer('');
                break;

            case "no":
                console.log('started fight', answer);
                setFightResults(["Thank you for playing"]);
                setAnswer('');
                break;
            case "a":
                nextRound(answer, updatedPokemonplay).then((response) => {
                    //       console.log(response.data);
                    const results = fightResultLines(response.data.textlines, updatedPokemonplay);
                    setFightResults(results);
                    navigator(`/pokemonplay/nextround/${answer}/${id}`);

                }).catch(error => {
                    console.error(error);
                })
                setAnswer('');
                break;
            case "c":
                getPokemonPlayById(id).then((response) => {
                    console.log('playchange', response.data);

                    setPokemonPlay({...response.data})
                    navigator(`/pokemonplay/${response.data.namePlayerA},${response.data.cardGymOwner}`);

                }).catch(error => {
                    console.error(error);
                })
                setAnswer('');
                break;
            default:
                console.log('answer:', answer);
                const found = attacks.find((attackfound) => {
                    return attackfound === answer
                })
                if (found) {
                    nextRound(answer.toLowerCase(), updatedPokemonplay).then((response) => {
                        // console.log(response.data);

                        const results = fightResultLines(response.data.textlines, updatedPokemonplay);
                        setFightResults(results);
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
        <div className="outer-container">

            {pokemonPlay && initialised &&
                <div className="inner-container bodypage">
                    <h2>Enter fight for {pokemonPlay.namePlayerA}</h2>
                    <form className="formSpace">
                        <legend>
                            <div className="row">
                                <h5 className="item-detail"> Name player </h5>
                                <h5 className="item-detail"> Card </h5>
                                <h5 className="item-detail"> Name Gymowner </h5>
                                <h5 className="item-detail"> Card: </h5>

                            </div>
                            <div className="row">
                                <span className="item-detail">   {pokemonPlay.namePlayerA} </span>
                                <span className="item-detail">    {pokemonPlay.cardPlayerA}    </span>
                                <span className="item-detail">   {pokemonPlay.nameGymOwner}      </span>
                                <span className="item-detail">  {pokemonPlay.cardGymOwner}        </span>

                            </div>
                            <div className="row">
                                <span className="item-detail"></span>
                                <span className="item-detail"><img src={cardP} alt="card"/></span>
                                <span className="item-detail"></span>
                                <span className="item-detail"><img src={cardG} alt="card"/></span>

                            </div>
                            <br/>

                            <label htmlFor="answer" className="row">
                                {fightResults.length > 1 ?
                                    <span
                                        className="item-detail">{fightResults[fightResults.length - 2]} </span>
                                    : <span className="item-detail">Enter yes or no</span>}
                                {fightResults[fightResults.length - 2] === "Choose your attack" ?
                                    <>
                                        <SelectPokemonCard
                                            fieldClass="form-control"
                                            clickHandler={(e) => setAnswer(e.target.value)}
                                            cardPlayer={answer}
                                            pokemoncards={attacks}
                                        >

                                        </SelectPokemonCard>
                                    </>

                                    :
                                    <input
                                        type='text'
                                        id="answer"
                                        placeholder={fightResults[fightResults.length - 1]}
                                        name="answer"
                                        value={answer}
                                        className="form-control"
                                        onChange={(e) => setAnswer(e.target.value)}/>

                                }


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
                                    if (lineItem.substring(0, 16).includes(pokemonPlay.nameGymOwner) || lineItem.substring(0, 15).includes(pokemonPlay.cardGymOwner)) {
                                        aligntext = "form-text-right";
                                    }

                                    return (
                                        <>

                                            <li className={aligntext} key={index}>
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

            }

        </div>
    );
}

export default Enterfight;