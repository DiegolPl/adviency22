let lista = document.getElementById('lista_app');
let tachitos = document.querySelectorAll('.tachito');
let btn_delete_all_gifts = document.getElementById('btn_delete_all');
let gifts = JSON.parse(localStorage.getItem('gifts'));

function addGift(){
    //Obtengo el nombre del regalo en minusculas y la cantidad
    let gift = document.getElementById('gift_input').value.toLowerCase().trim();
    let count = document.getElementById('gift_cantidad').value;
    
    //Verifico que no tenga un elemento vacío o la cantidad sea 0
    if(gift === '' || parseInt(count) === 0 || count === ''){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No puedes agregar un regalo vacío!'
        }) 
        return false
    }

    //Verifico si el regalo ya fue introducido, de ser asi le actualizo la cantidad, de lo contrario lo agrego y genero la lista
    let hayCoincidencia = false;
    gifts.forEach(regalo => {
        if(regalo.nombre === gift){
            hayCoincidencia = true;
        }
    })

    if(hayCoincidencia) {
        let index;
        for(let i = 0; i < gifts.length; i++){
            if(gifts[i].nombre === gift){
                index = i;
            }
        }
        gifts[index].cantidad += parseInt(count);
        localStorage.setItem('gifts',JSON.stringify(gifts))
        generarLista(gifts)
    }else{
        gifts.push({'nombre':gift,'cantidad':parseInt(count)});
        generarLista(gifts)
        localStorage.setItem('gifts',JSON.stringify(gifts))
    }
    
    // Retorno un false para que no se envie el formulario
    return false
}

function generarLista(regalos){
    //Verifico si la lista tiene elementos, si tiene genera la lista, de lo contrario me carga la imagen de que no hay regalos
    if(gifts.length > 0){
        lista.innerHTML = ''
    
        regalos.forEach(regalo => {
            let contenedorRegalos = document.createElement('DIV');
            contenedorRegalos.classList.add('contenedor_gifts');
            lista.appendChild(contenedorRegalos);

            let cantidad = document.createElement('SPAN');
            cantidad.innerText = regalo.cantidad;
            cantidad.classList.add('cantidad_gifts');
            contenedorRegalos.appendChild(cantidad);

            let newListItem = document.createElement('LI');
            newListItem.innerText = regalo.nombre;
            contenedorRegalos.appendChild(newListItem);
    
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
                        let index;
                        for(let i = 0; i < gifts.length; i++){
                            if(gifts[i].nombre === tachito.previousElementSibling.children[1].textContent){
                                index = i;
                            }
                        }
                        gifts.splice(index,1)
                        lista.removeChild(tachito.previousElementSibling)
                        lista.removeChild(tachito)
                        localStorage.setItem('gifts',JSON.stringify(gifts))
                    }
                }).then(()=>checkList())
                
            })
            lista.appendChild(tachito);
    
            //Vacio el input
            document.getElementById('gift_input').value = '';
            document.getElementById('gift_cantidad').value = '';
    
        });
    }else{
        checkList()
    }
}

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
              gifts.splice(0,gifts.length)
              lista.innerHTML = ''
              localStorage.setItem('gifts',JSON.stringify(gifts))
            }
        }).then(()=>checkList())
    }
})


function checkList(){
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

generarLista(gifts)