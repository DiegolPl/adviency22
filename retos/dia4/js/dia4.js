let lista = document.getElementById('lista_app');
let tachitos = document.querySelectorAll('.tachito');

function addGift(){
    let gift = document.getElementById('gift_input').value;
    //Creo el elemento li, le agrego el texto y lo agrego a la lista
    let newListItem = document.createElement('LI');
    newListItem.innerText = gift;
    lista.appendChild(newListItem);

    let tachito = document.createElement('SPAN');
    tachito.classList.add('material-symbols-outlined');
    tachito.classList.add('tachito');
    tachito.setAttribute('title','Eliminar')
    tachito.innerText = 'delete';
    
    tachito.addEventListener('click',()=>{
        lista.removeChild(tachito.previousElementSibling)
        lista.removeChild(tachito)   
    })

    lista.appendChild(tachito);

    //Retorno false para evitar que se envie el formulario
    return false
}

tachitos.forEach(el => {
    el.addEventListener('click',()=>{
        lista.removeChild(el.previousElementSibling)
        lista.removeChild(el)   
    })
})