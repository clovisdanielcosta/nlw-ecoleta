

function populateUFs() {
    const ufSelect = document.querySelector("select[name=uf")

    fetch("https://servicodados.ibge.gov.br/api/v1/localidades/estados")
    .then( res => res.json() )
    .then( states => {

        for ( const state of states ) {
            ufSelect.innerHTML += `<option value="${state.id}">${state.nome}</option>`
        }

    } )
}

populateUFs()


function getCities(event) {
    const citySelect = document.querySelector("[name=city]")
    const stateInput = document.querySelector("[name=city]")
    
    const ufValue = event.target.value
    
    const indexOfSelectedState = event.target.selectedIndex
    stateInput.value = event.target.options[indexOfSelectedState].text 

    const url = `https://servicodados.ibge.gov.br/api/v1/localidades/estados/${ufValue}/municipios`
    
    citySelect.innerHTML = "<option value>Selecione a Cidade</option>"
    citySelect.disabled = true

    fetch(url)
    .then( res => res.json() )
    .then( cities => {
        for ( const city of cities ) {
            citySelect.innerHTML += `<option value="${city.nome}">${city.nome}</option>`
        }
        
        citySelect.disabled = false 
        
    } )
}

document
.querySelector("select[name=uf]")
.addEventListener("change", getCities)

/* ìtens da Coleta
    Pegando todos os ítens */
const itemsToCollect = document.querySelectorAll(".items-grid li")

for (const item of itemsToCollect) {
    /* Adicionando ouvidor de e eventos e passando uma função */
    item.addEventListener("click", handleSelectedItem)
}

const collectedItems = document.querySelector("input[name=items")

let selectedItems = []

function  handleSelectedItem(event) {
    /* Dando um console para verificar
    console.log(event.target.dataset.id); */
    const itemLi = event.target
    
    /* Adicionar ou remover uma classe */
    itemLi.classList.toggle("selected")
    
    const itemId = itemLi.dataset.id

    console.log('ITEM ID:', itemId);

    // Verificar se existem itens selecionados,se sim
    // pegar os itens selecionados

    const alreadySelected = selectedItems.findIndex(item => {
        const itemFound = item == itemId // true ou false
        return itemFound
    })

    // Se já estuver selecionado
    if ( alreadySelected >= 0 ) {
        //Tira da seleção
        const filteredItems = selectedItems.filter( item => {
            const itemIsDifferent = item != itemId // false
            return itemIsDifferent
        })

        selectedItems = filteredItems
    } else {
        // Se não estiver selecionado
        // adicionar à seleção
        selectedItems.push(itemId)
    }

    console.log('selectedItems', selectedItems);
    

    // Atualiza o input escondido para o envio do formulário
    collectedItems.value = selectedItems
    
}

