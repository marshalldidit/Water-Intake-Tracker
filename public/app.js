window.addEventListener('load', () => {
  document.getElementById('button-water').addEventListener('click', () => {
    let noWater = document.getElementById('number-water').value;
    console.log(noWater);
   
    // create an object 
    let obj = {number: noWater};

    // stringify the object so that we can send it to the server
    let jsonData = JSON.stringify(obj);

    // fetch to route /activity on the server and send the jsonData to the server
    fetch('/noWater', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json'
        },
        body: jsonData
    })
    .then(response => response.json())
    .then(data => {
        console.log(data);
    })
    .catch(error => {
        console.error('Error:', error);
    });

    // make a fetch request of type POST so that we can send the (noWater) info to the server
  });

  document.getElementById('get-tracker').addEventListener('click', () => {
    // get info on all water intake from the server and display it on the page
    fetch('/getWater')
    .then(response => response.json())
    .then(data => {
        document.getElementById('water-logs').innerHTML = '';
        console.log(data);
        for (let i = 0; i < data.data.length; i++) {
            let string = data.data[i].date + ' : ' + data.data[i].water;
            let elt = document.createElement('p');
            elt.innerHTML = string;
            document.getElementById('water-logs').appendChild(elt);
        }
    })
  })
})
