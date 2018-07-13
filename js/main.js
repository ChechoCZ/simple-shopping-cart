let list = [
  {
    'description': 'rice',
    'amount': '1',
    'value': '5.40'
  },
  {
    'description': 'beer',
    'amount': '12',
    'value': '1.99'
  },
  {
    'description': 'meet',
    'amount': '1',
    'value': '15.00'
  }
];

function getTotal(list) {

  let total = 0;

  for (let key in list) {
    total += list[key].value * list[key].amount;
  }

  document.getElementById('totalValue').innerHTML = formatValue(total);

  return total;
}

function setList(list) {

  let table = `<thead>
                <tr>
                  <td>Description</td>
                  <td>Amount</td>
                  <td>Value</td>
                  <td>Action</td>
                </tr>
              </thead>
              <tbody>`;

  for (let key in list) {
    table += '<tr><td>' + formatDescription(list[key].description) + '</td><td>' + formatAmount(list[key].amount) + '</td><td>' + formatValue(list[key].value) + '<td><button onclick="setUpdate(' + key + ')" class="btn btn-default">Edit</button> <button onclick="deleteData(' + key + ')" class="btn btn-default">Delete</button></td>' + '</td></tr>';
  }

  table += '</tbody>';
  document.getElementById('listTable').innerHTML = table;

  getTotal(list);

  saveToLocalStorage(list);
  
}

function formatDescription(description) {
  let str = description.toLowerCase();
  str = str.charAt(0).toUpperCase() + str.slice(1);
  return str;
}

function formatAmount(amount) {
  return parseInt(amount);
}

function formatValue(value) {
  let str = parseFloat(value).toFixed(2);
  str = str.replace('.', ',');
  str = '$ ' + str;
  return str;
}

function addData() {

  if (!validate()) {
    return;
  }
  
  const description = document.getElementById('description').value;
  const amount =  document.getElementById('amount').value;
  const value =  document.getElementById('value').value;

  list.unshift({
    'description': description,
    'amount': amount,
    'value': value
  });

  setList(list);

}

function setUpdate(id) {

  const obj = list[id];

  document.getElementById('description').value = obj.description;
  document.getElementById('amount').value = obj.amount;
  document.getElementById('value').value = obj.value;

  document.getElementById('btnUpdate').style.display = 'inline-block';
  document.getElementById('btnAdd').style.display = 'none';

  document.getElementById('inputIDUpdate').innerHTML = '<input type="hidden" id="idUpdate" value="' + id + '">';

}

function resetForm() {

  document.getElementById('description').value = '';
  document.getElementById('amount').value = '';
  document.getElementById('value').value = '';

  document.getElementById('btnUpdate').style.display = 'none';
  document.getElementById('btnAdd').style.display = 'inline-block';

  document.getElementById('inputIDUpdate').innerHTML = '';

  document.getElementById('errors').style.display = 'none';

}

function updateData() {

  if (!validate()) {
    return;
  }

  const id = document.getElementById('idUpdate').value;

  const description = document.getElementById('description').value;
  const amount =  document.getElementById('amount').value;
  const value =  document.getElementById('value').value;

  list[id] = {'description': description, 'amount': amount, 'value': value};
  resetForm();
  setList(list);

}

function deleteData(id) {
  if (confirm('Delete this item?')) {
    if (id === list.length - 1) {
      list.pop();
    } else if (id === 0) {
      list.shift();
    } else {
      const arrAuxIni = list.slice(0, id);
      const arrAuxEnd = list.slice(id + 1);
      list = arrAuxIni.concat(arrAuxEnd);
    }
    setList(list);
  }
}

function validate() {

  let errors = '';

  const description = document.getElementById('description').value;
  const amount =  document.getElementById('amount').value;
  const value =  document.getElementById('value').value;

  document.getElementById('errors').style.display = 'none';

  if (description === '') {
    errors += '<li>Fill out Description</li>';
  }

  if (amount === '') {
    errors += '<li>Fill out a quantity</li>';
  } else if (isNaN(amount)) {
    errors += '<li>Invalid quantity format</li>';
  }

  if (value === '') {
    errors += '<li>Fill out a value</li>';
  } else if (isNaN(value)) {
    errors += '<li>Invalid value format</li>';
  }

  if (errors !== '') {
    document.getElementById('errors').style.display = 'block';
    document.getElementById('errors').className = 'alert alert-danger';
    document.getElementById('errors').innerHTML = '<strong>Error: </strong><ul>' + errors + '</ul>';
    return 0;
  } else {
    return 1;
  }
}

function deleteList() {
  if (confirm('Delete List?')) {
    list = [];
    setList(list);
  }
}

function saveToLocalStorage(list) {
  const jsonStr = JSON.stringify(list);
  localStorage.setItem('list', jsonStr);
}

function initListStorage() {
  
  const testList = localStorage.getItem('list');

  if (testList) {
    list = JSON.parse(testList);    
  }

 setList(list);

}

initListStorage();