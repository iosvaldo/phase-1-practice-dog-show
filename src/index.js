document.addEventListener('DOMContentLoaded', () => {
fetchDog()
const btns = document.getElementsByTagName('button')
const form = document.querySelector('#dog-form')
let dogObj
let dogOfTheRow

setTimeout(() => {
  Array.from(btns).forEach((btn) => {
    btn.addEventListener('click', (e) => {
      dogOfTheRow = e.target.parentNode.parentNode
      dogObj = {
        'id': dogOfTheRow.id,
        'name': dogOfTheRow.children[0].innerText,
        'breed': dogOfTheRow.children[1].innerText,
        'sex': dogOfTheRow.children[2].innerText
      }
      editDog(dogObj)
    })
  })
}, 500)

form.addEventListener('submit', (e) => {
e.preventDefault()
dogObj.name = e.target.elements['name'].value
dogObj.breed = e.target.elements['breed'].value
dogObj.sex = e.target.elements['sex'].value
updateDog(dogObj)
dogOfTheRow.children[0].innerText = dogObj.name
dogOfTheRow.children[1].innerText = dogObj.breed
dogOfTheRow.children[2].innerText = dogObj.sex
form.reset()
})
})

function fetchDog() {
  return fetch('http://localhost:3000/dogs')
    .then(res => res.json())
    .then(data => {
      Array.from(data).forEach((dog) => {
        dogTable(dog)
      })
    })
}

function dogTable(dogObj) {
  const tableBody = document.querySelector('#table-body')
  const table = document.createElement('tr')
  table.id = dogObj.id
  table.innerHTML = `<td>${dogObj.name}</td>
                       <td>${dogObj.breed}</td>
                       <td>${dogObj.sex}</td>
                       <td><button>Edit Dog</button></td>`
  tableBody.appendChild(table)
}

function editDog(dogObj) {
  const form = document.querySelector('#dog-form')
  form.elements['name'].value = dogObj.name
  form.elements['breed'].value = dogObj.breed
  form.elements['sex'].value = dogObj.sex
}

function updateDog(dogObj) {
  fetch(`http://localhost:3000/dogs/${dogObj.id}`, {
      method: 'PATCH',
      headers: {
        'Content-Type': 'application/json',
        Accept: 'application/json'
      },
      body: JSON.stringify(dogObj)
    })
    .then(res => res.json())
}