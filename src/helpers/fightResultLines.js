function FightResultLines(textlines, updatedPokemonplay) {
    let linenumber = 0;
    const results = [];

    for (let i = 0; i < textlines.length; i++) {
        const string = textlines[i].substring(0, 15);
        console.log('string', string, linenumber);
        if (string.includes(updatedPokemonplay.namePlayerA) || string.includes(updatedPokemonplay.cardPlayerA)) {
            //  console.log('string', string, updatedPokemonplay.namePlayerA, linenumber);
            if (linenumber % 2 > 0) {
                results[linenumber] = "";
                linenumber++;
            }
        } else {
            if (string.includes(updatedPokemonplay.nameGymOwner) || string.includes(updatedPokemonplay.cardGymOwner)) {
                if (linenumber % 2 === 0) {
                    results[linenumber] = "";
                    linenumber++;
                }

            }
        }

        results[linenumber] = textlines[i];
        linenumber++;

    }
    console.log('results', results);
    return results;
}

export default FightResultLines;