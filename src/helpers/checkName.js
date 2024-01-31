function checkName(names, name) {
    let found = false;
    for (let i = 0; i < names.length; i++) {
        if (names[i] === name) {
            found = true;
        }

    }

    return found;
}

export default checkName;