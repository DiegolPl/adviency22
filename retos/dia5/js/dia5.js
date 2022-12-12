let lista = document.getElementById('lista_app');
let tachitos = document.querySelectorAll('.tachito');
let btn_delete_all_gifts = document.getElementById('btn_delete_all');

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
        Swal.fire({
            title: 'Estás seguro?',
            text: "No se podrá revertir!",
            icon: 'warning',
            showCancelButton: true,
            confirmButtonColor: '#3085d6',
            cancelButtonColor: '#d33',
            confirmButtonText: 'Sí, borrar!'
        }).then((result) => {
            if (result.isConfirmed) {
              Swal.fire(
                'Borrado!',
                'El regalo ha sido eliminado',
                'success'
              )
              lista.removeChild(el.previousElementSibling)
            lista.removeChild(el)  
            }
        })
         
    })
})

btn_delete_all_gifts.addEventListener('click',()=>{
    Swal.fire({
        title: 'Estás seguro?',
        text: "No se podrá revertir!",
        icon: 'warning',
        showCancelButton: true,
        confirmButtonColor: '#3085d6',
        cancelButtonColor: '#d33',
        confirmButtonText: 'Sí, borrar todo!'
    }).then((result) => {
        if (result.isConfirmed) {
          Swal.fire(
            'Borrado!',
            'Los regalos han sido eliminados',
            'success'
          )
          lista.innerHTML = ''
        }
    })
})