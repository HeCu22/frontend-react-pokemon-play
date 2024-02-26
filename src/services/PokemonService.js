import axios from "axios";
import pokemonPlay from "../pages/PokemonPlay";

const REST_API_BASE_URL_CARDS = 'https://pokeapi.co/api/v2/pokemon';

const REST_API_BASE_URL = "http://localhost:8080/api/pokemonplay";



export const listPokemon = (pokemonName) =>  axios.get(REST_API_BASE_URL_CARDS  + '/' + pokemonName.toLowerCase());

export const createPokemonPlay = (pokemonplay) => axios.post(REST_API_BASE_URL, pokemonplay);
export const updatePokemonPlay = (namePlayerA, pokemonplay) => axios.put(REST_API_BASE_URL  + '/' + namePlayerA, pokemonplay);

export const enterPokemonPlay = (namePlayerA) => axios.get(REST_API_BASE_URL + '/enterplay/' + namePlayerA);

export const getPokemonPlayById = (pokemonPlayId) => axios.get(REST_API_BASE_URL + '/' + pokemonPlayId);
export const getPokemonPlayByName = (namePlayerA) => axios.get(REST_API_BASE_URL + '/' + namePlayerA);

export const enterPokemonCard = (namePlayerA) => axios.get(REST_API_BASE_URL + '/entercard/' + namePlayerA);
export const enterFightRound = (id, pokemonplay) => axios.put(REST_API_BASE_URL + '/enterfight/' + id, pokemonplay);
export const nextRound = (answer, pokemonplay) => axios.put(REST_API_BASE_URL + "/nextround/" + answer, pokemonplay);
export const getFightResults = (id) => axios.get(REST_API_BASE_URL + "/textlines/textlines");