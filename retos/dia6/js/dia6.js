let lista = document.getElementById('lista_app');
let tachitos = document.querySelectorAll('.tachito');
let btn_delete_all_gifts = document.getElementById('btn_delete_all');

function addGift(){
    if(lista.childElementCount === 1){
        lista.removeChild(document.getElementById('contenedor_santa'));
    }

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
                lista.removeChild(tachito.previousElementSibling)
                lista.removeChild(tachito)  
                
            }
        }).then(()=>checkList())
          
    })
    lista.appendChild(tachito);

    document.getElementById('gift_input').value = '';

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
        }).then(()=>checkList())
         
    })
})

btn_delete_all_gifts.addEventListener('click',()=>{
    if(lista.childElementCount > 1){
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
        }).then(()=>checkList())
    }
})


function checkList(){
    console.log(lista.childElementCount)
    if(lista.childElementCount <= 1){
        let contenedor = document.createElement('FIGURE');
        contenedor.setAttribute('id','contenedor_santa');
        contenedor.classList.add('contenedor_santa');
        lista.appendChild(contenedor);

        let imgSanta = document.createElement('IMG');
        imgSanta.setAttribute('src','../../images/santaSad1-removebg.png');
        imgSanta.classList.add('santa_sad');
        contenedor.appendChild(imgSanta);

        let texto1 = document.createElement('P');
        texto1.classList.add('texto_no_gifts');
        texto1.innerText = 'No hay más regalos!';
        contenedor.appendChild(texto1);

        let texto2 = document.createElement('P');
        texto2.classList.add('texto_no_gifts');
        texto2.innerText = 'Por favor, agrega uno!';
        contenedor.appendChild(texto2);
    }
}