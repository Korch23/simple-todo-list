let itemsList = document.getElementById('lista')
let adicionarButton = document.getElementById("adicionarButton")

let items = JSON.parse(localStorage.getItem('items'))

if (items == null) {
  items = []
  localStorage.setItem('items', JSON.stringify(items))
}

items.forEach(item => {
  adicionarItem(item)
})

adicionarButton.addEventListener('click', () => {
  let novoItem = {
    id: items.length + 1,
    descricao: document.getElementById('novoItem').value,
    completo: false
  }

  items.push(novoItem)
  localStorage.setItem('items', JSON.stringify(items))
  adicionarItem(novoItem)
})

function marcarComoCompletado(item, completo) {
  item.completo = completo
  items[item.id - 1] = item
  localStorage.setItem('items', JSON.stringify(items))
}

function adicionarItem(novoItem) {
  let itemElement = document.createElement('li')

  let itemText = document.createElement('p')
  itemText.innerText = novoItem.descricao

  if (novoItem.completo) {
    itemText.style.textDecoration = 'line-through'
  }

  let completarCheckbox = document.createElement('input')
  completarCheckbox.setAttribute('type', 'checkbox')
  completarCheckbox.checked = novoItem.completo

  completarCheckbox.addEventListener('change', () => {
    if (completarCheckbox.checked) {
      itemText.style.textDecoration = 'line-through'
    } else {
      itemText.style.textDecoration = 'none'
    }

    marcarComoCompletado(novoItem, completarCheckbox.checked)
  })

  itemText.appendChild(completarCheckbox)
  itemElement.appendChild(itemText)
  itemsList.appendChild(itemElement)
}
