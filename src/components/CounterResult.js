import React, { useEffect } from 'react';

function CounterResult({ amount }) {
    useEffect(() => {
        return function unmount() {
            console.log('😭 We gaan eraaaaaaan!')
        }
    }, []);

    return (
        <h3>Er is {amount} keer geklikt!</h3>
    );
}

export default CounterResult;