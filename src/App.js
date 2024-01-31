import './App.css';
import ListCards from "./pages/ListCards";
import HeaderComponent from "./components/HeaderComponent";
import FooterComponent from "./components/FooterComponent";
import {BrowserRouter, Routes, Route} from "react-router-dom";
import PokemonPlay from "./pages/PokemonPlay";
import PlayPokemon from "./pages/PlayPokemon";
import Enterfight from "./pages/Enterfight";

function App() {

    return (
        <>
            <BrowserRouter>
                <HeaderComponent/>
                <Routes>
                    {/*// http://localhost:3000*/}
                    <Route path="/" element={<PokemonPlay/>}></Route>

                    {/*// http://localhost:3000/pokemoncards*/}
                    <Route path="/pokemoncards" element={<ListCards/>}></Route>

                    {/*// http://localhost:3000/pokemonplay/name
                    */}
                    <Route path="/pokemoncards/:name" element={<ListCards/>}></Route>

                    {/*// http://localhost:3000/pokemonplay         */}
                    <Route path="/pokemonplay" element={<PokemonPlay/>}></Route>

                    {/*// http://localhost:3000/pokemonplay
                    */}
                    <Route path="/pokemonplay/:name" element={<PlayPokemon/>}></Route>
                    {/*// http://localhost:3000/pokemonplay/enterfight
                    */}
                    <Route path="/pokemonplay/enterfight/:id" element={<Enterfight/>}></Route>
                    {/*// http://localhost:3000/pokemonplay/nextround
                    */}
                    <Route path="/pokemonplay/nextround/a/:id" element={<Enterfight/>}></Route>
                    {/*// http://localhost:3000/pokemonplay/nextround
                    */}
                    <Route path="/pokemonplay/nextround/:id" element={<Enterfight/>}></Route>
                </Routes>
                <FooterComponent/>
            </BrowserRouter>

        </>
    );
}

export default App;
