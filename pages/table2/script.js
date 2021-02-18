//window.setTimeout(() => changeTitle(), 5000);

myFunction()
// load_home()

function myFunction() {
    let change = true;
    setInterval(changeTitle, 1000);

    function changeTitle() {
        change = !change;

        if(change) {
            return document.title = "teste";
        }
        return document.title = "Lucas 01";
    }
}

function load_home() {
    const table = document.getElementById('my-table');
    table.innerHTML='<object style="width: 100%; height: Calc(100% - 80px)" type="text/html" data="table/index.html"></object>';
}

loadTable()

async function loadTable() {
    const url = "https://restcountries.eu/rest/v2/all";
    const data = await fetchData(url);
    var table = document.getElementById("table");

    var header = document.createElement('tr');
    header.innerHTML = '<th> Name </th> <th> Capital </th> <th> Region </th>';
    table.appendChild(header);
    
    data.map(value => {
        var tr = document.createElement('tr');
        tr.innerHTML = 
            '<th>' + value.name + '</th>' +
            '<th>' + value.capital + '</th>' +
            '<th>' + value.region + '</th>';
        table.appendChild(tr);
    })
}

function fetchData(url) {
    return fetch(url)
        .then((response) => {
            if(response.status !== 200) console.log(response.status);

            return response.json().then(data => data);
        })
        .catch((err) => console.log(err));
}