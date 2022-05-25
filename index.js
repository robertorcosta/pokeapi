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
    csv_save(pokemon)
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
// referencia para função de CSV
// https://www.codegrepper.com/code-examples/javascript/convert+array+to+csv+file+javascript
var objectToCSVRow = function (dataObject) {
    var dataArray = new Array;
    for (var o in dataObject) {
        var innerValue = dataObject[o] === null ? '' : dataObject[o].toString();
        var result = innerValue.replace(/"/g, '""');
        result = '"' + result + '"';
        dataArray.push(result);
    }
    return dataArray.join(' ') + '\r\n';
}

const csv_save = (data) => {

    if (!data.length) {
        return;
    }

    var csvContent = "data:text/csv;charset=utf-8,";

    // headers
    csvContent += objectToCSVRow(Object.keys(data[0]));

    data.forEach(function (item) {
        csvContent += objectToCSVRow(item);
    });

    var encodedUri = encodeURI(csvContent);
    var link = document.createElement("a");
    link.setAttribute("href", encodedUri);
    link.setAttribute("download", "pokedex.csv");
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
}

fetchPokemon();

