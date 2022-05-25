const fetchPokemon = () => {
    const promises = [];
    for (let i = 1; i <= 10; i++) {
        const url = `https://pokeapi.co/api/v2/pokemon/${i}`;
        promises.push(fetch(url).then((res) => res.json()));

    }
    Promise.all(promises).then((results) => {
        const pokemon = results.map((result) => ({
            name: result.name,
            image: result.sprites['front_default'],
            ability: result.abilities.map((type) => type.ability.name).join(', '),
            type: result.types.map((type) => type.type.name).join(', '),
            id: result.id
        })).sort((a, b) => a.ability > b.ability ? 1 : -1);
        displayPokemon(pokemon);
        console.log(pokemon);

        //let obj = pokemon.find(o => o.name === 'charizard');

        var form = document.getElementById('formulario');
        var campo = document.getElementById('campo');

        form.addEventListener('submit', function (e) {
            if (campo.value === '') {
                displayPokemon(pokemon);
            } else {
                let obj = pokemon.find(o => o.name === campo.value);

                if (obj != undefined) {
                    displayPokemon([obj])
                    e.preventDefault();
                } else {
                    pokemonNotFound()
                    e.preventDefault();
                }
            }
        }); 

    });
};

const displayPokemon = (pokemon) => {
    const pokemonHTMLString = pokemon
        .map(
            (pokeman) => `
    <li class="card">
        <img class="card-image" src="${pokeman.image}"/>
        <h2 class="card-title">${pokeman.id}. ${pokeman.name}</h2>
        <p class="card-subtitle"><b>Habilidades:</b> ${pokeman.ability}</p>
        <p class="card-subtitle"><b>Tipo:</b> ${pokeman.type}</p>
    </li>
`
        )
        .join('');
    pokedex.innerHTML = pokemonHTMLString;

};

const pokemonNotFound = () => {
    const pokemonHTMLString = `
    <li class="card">
        Não encontrado
    </li>`;
    pokedex.innerHTML = pokemonHTMLString;
};

fetchPokemon();

