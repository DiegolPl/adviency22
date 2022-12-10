function addGift(){
    //Obtengo el valor del input
    let gift = document.getElementById('gift_input').value;
    
    //Obtengo elemento lista
    let lista = document.getElementById('lista_app');
    
    //Creo el elemento li, le agrego el texto y lo agrego a la lista
    let newListItem = document.createElement('LI');
    newListItem.innerText = gift;
    lista.appendChild(newListItem);

    //Retorno false para evitar que se envie el formulario
    return false
}