'use strict';

{
    const API = {
        endpoints: {
            laureate: 'http://api.nobelprize.org/v1/laureate.json?',
            prize: 'http://api.nobelprize.org/v1/prize.json?'
        },
        queries: [
            {
                description: 'Select a query',
                endpoint: ''
            },
            {
                description: 'All female laureates',
                endpoint: 'laureate',
                queryString: 'gender=female'
            },
            {
                description: 'All Dutch laureates',
                endpoint: 'laureate',
                queryString: 'bornCountryCode=NL'
            },
            {
                description: 'Physics prizes 1900-1925',
                endpoint: 'prize',
                queryString: 'year=1925&yearTo=25&category=physics'
            },
            {
                description: 'Nobel Prizes 2017',
                endpoint: 'prize',
                queryString: 'year=2017'
            },
            {
                description: 'Physicists working on quantum electrodynamics',
                endpoint: 'laureate',
                queryString: 'motivation=quantum electrodynamics'
            },
        ]
    };

    // console.log(url);


    //cb(error,data);
    function renderLaureates(laureates) {
        const root = document.getElementById('root');
        //const listContainer = document.createElement('div');
        const listContainer = createAndAppend('div', root);

        listContainer.id = 'list-container';
        //root.appendChild(listContainer);
        laureates.laureates.forEach(laureate => {
            const listItem = createAndAppend('div', listContainer)
            //const listItem = document.createElement('div');
            listItem.setAttribute('class', 'list-item');
            // const table = document.createElement('table');
            //    listItem.appendChild(table);
            const table = createAndAppend('table', listItem);
            const tbody = createAndAppend('tbody', table);
            const tr = createAndAppend('tr', tbody);

            const tdEx = createAndAppend('td', tr);
            tdEx.innerHTML = "Name ";
            const td = createAndAppend('td', tr);
            td.setAttribute('class', 'label');
            td.innerHTML = laureate.firstname + " " + laureate.surname;


        });

    }
    function createAndAppend(tagName, parent) {
        const elem = document.createElement(tagName);
        parent.appendChild(elem);
        return elem;
    }
    function fetchJSON(url, cb) {


        const xhr = new XMLHttpRequest();
        xhr.open('GET', url);
        xhr.responseType = 'json';
        xhr.onreadystatechange = () => {
            // console.log(xhr.readyState);
            if (xhr.readyState === 4) {
                if (xhr.status < 400) {
                    //console.log(xhr.response);
                    cb(null, xhr.response);
                } else {
                    cb(new Error(xhr.statusText));
                    //console.error(xhr.statusText);
                }

            }
        };
        xhr.send();
    }
    function renderSelect() {
        const root = document.getElementById('root');
        const select = createAndAppend('select', root);
        API.queries.forEach(query => {
            const option = createAndAppend('option', select);
            const url = API.endpoints[query.endpoint] + query.queryString;
            option.setAttribute('value', url);
            option.innerHTML = query.description;

        });
        select.addEventListener('change', event => {
            const url = event.target.value;
        });

    }
    renderSelect();
    const url = API.endpoints.laureate + API.queries[1].queryString;
    fetchJSON(url, (error, data) => {
        if (error !== null) {
            console.log(error);

        } else {
            renderLaureates(data);
        }

    }
    );

}
