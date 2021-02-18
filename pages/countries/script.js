loadTable()

function onClickFilter() {
    const fieldData = document.getElementById("find");
    loadTable(fieldData.value);
}

async function loadTable(filter = null) {
    let url = "https://restcountries.eu/rest/v2/all?fields=name;capital;region";
    if(filter) url = "https://restcountries.eu/rest/v2/name/" + filter;

    const data = await fetchData(url);

    var existingTable = document.getElementById("table");
    if(existingTable) existingTable.remove();

    var div = document.getElementById("table-div");
    var table = document.createElement("table");
    table.setAttribute("id", "table");
    
    var header = document.createElement('tr');
    header.innerHTML = 
        '<th id="header"> Name </th>' + 
        '<th id="header"> Capital </th>' + 
        '<th id="header"> Region </th>'; 
    table.appendChild(header);

    data.map(value => {
        var tr = document.createElement('tr');
        tr.innerHTML = 
            '<th>' + value.name + '</th>' +
            '<th>' + value.capital + '</th>' +
            '<th>' + value.region + '</th>';
        table.appendChild(tr);
    })

    div.appendChild(table);
}

function fetchData(url) {
    return fetch(url)
        .then((response) => {
            if(response.status !== 200) return [];

            return response.json().then(data => data);
        })
        .catch((err) => console.log(err));
}