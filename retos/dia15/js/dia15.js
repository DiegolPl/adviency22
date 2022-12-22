let lista = document.getElementById('lista_app');
let tachitos = document.querySelectorAll('.tachito');
let btn_delete_all_gifts = document.getElementById('btn_delete_all');
let gifts = JSON.parse(localStorage.getItem('gifts'));
let btnOpenForm = document.getElementById('btn_open_form');
let btnCloseForm = document.getElementById('close_form_add_gift');
let contenedorFormulario =  document.getElementById('contenedor_formulario');

// // Traeriamos nuestros regalos mediante un async await y fetch desde una url
// const getGifts = async(url) => {
//     const respuesta = await fetch(url).then(res => res.json())
    
//     return respuesta
// } 

// // Generamos una lista a partir de los datos obtenidos de la url
// getGifts('./assets/regalos.json').then(data => generarLista(data))

//Verifico si existe el elemento gifts en localStorage, si no esta lo crea y recargo la app
if(localStorage.getItem('gifts') === null){
    localStorage.setItem('gifts','[]')
    document.location.reload()
}

//Abrir el formulario de agregar regalo
btnOpenForm.addEventListener('click',()=>{
    contenedorFormulario.classList.add('d-grid');
})

//Cerrar el formulario de agregar regalo
btnCloseForm.addEventListener('click',()=>{
    contenedorFormulario.classList.remove('d-grid');
})

// Funcion para agregar un regalo
function addGift(){
    //Obtengo el nombre del regalo y el link en minusculas y la cantidad
    let gift = document.getElementById('gift_input').value.toLowerCase().trim();
    let link = document.getElementById('gift_link').value.toLowerCase().trim();
    let count = document.getElementById('gift_cantidad').value;
    let owner = document.getElementById('gift_owner').value.toLowerCase().trim();
    
    //Verifico que no tenga un elemento vacío o la cantidad sea 0
    if(gift === '' || parseInt(count) === 0 || count === '' || link === '' || owner === ''){
        Swal.fire({
            icon: 'error',
            title: 'Oops...',
            text: 'No puedes agregar un regalo si tienes algún campo vacío!'
        }) 
        return false
    }

    //Verifico si el regalo ya fue introducido, de ser asi le actualizo la cantidad, de lo contrario lo agrego y genero la lista
    let hayCoincidencia = false;
    gifts.forEach(regalo => {
        if(regalo.nombre === gift && regalo.owner === owner){
            hayCoincidencia = true;
        }
    })

    if(hayCoincidencia) {
        let index;
        for(let i = 0; i < gifts.length; i++){
            if(gifts[i].nombre === gift && gifts[i].owner === owner){
                index = i;
            }
        }
        gifts[index].cantidad += parseInt(count);
        localStorage.setItem('gifts',JSON.stringify(gifts))
        generarLista(gifts)
    }else{
        gifts.push({'nombre':gift,'cantidad':parseInt(count),'link':link, 'owner':owner});
        generarLista(gifts)
        localStorage.setItem('gifts',JSON.stringify(gifts))
    }
    
    // Cerrar el formulario
    contenedorFormulario.classList.remove('d-grid');

    // Retorno un false para que no se envie el formulario
    return false
}

function editGift(){
    //Obtengo los nombres originales del regalo y el dueño para poder encontrarlo en la lista
    let oldName = document.getElementById('form_edit_gift').getAttribute('data-name');
    let oldOwner = document.getElementById('form_edit_gift').getAttribute('data-owner');

    //Obtengo el nombre del regalo y el link en minusculas y la cantidad
    let gift = document.getElementById('gift_input_edit').value.toLowerCase().trim();
    let link = document.getElementById('gift_link_edit').value.toLowerCase().trim();
    let count = document.getElementById('gift_cantidad_edit').value;
    let owner = document.getElementById('gift_owner_edit').value.toLowerCase().trim();

    //Obtengo el index del elemento a editar
    let index;
    for(let i = 0; i < gifts.length; i++){
        if(gifts[i].nombre === oldName && gifts[i].owner === oldOwner){
            index = i;
        }
    }

    //Realizo la edicion
    gifts[index].nombre = gift;
    gifts[index].cantidad = parseInt(count);
    gifts[index].link = link;
    gifts[index].owner = owner;

    //Guardo todo
    localStorage.setItem('gifts',JSON.stringify(gifts))

    //Genero la lista actualizada
    generarLista(gifts)

    //Borro el formulario de edicion
    let padre = document.getElementById('contenedor_form_edit').parentElement;
    padre.removeChild(document.getElementById('contenedor_form_edit'));

    return false;
}

function generarLista(regalos){

    //Verifico si la lista tiene elementos, si tiene genera la lista, de lo contrario me carga la imagen de que no hay regalos
    if(regalos.length > 0){
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
            newListItem.innerHTML = regalo.nombre;
            contenedorRegalos.appendChild(newListItem);

            let spanOwner = document.createElement('SPAN');
            let owner = capitalizarPalabra(regalo.owner)
            spanOwner.textContent = `para ${owner}`;
            spanOwner.classList.add('gift_owner');
            newListItem.appendChild(spanOwner);

            let spanFoto = document.createElement('SPAN');
            spanFoto.textContent = '(Foto)';
            spanFoto.classList.add('foto_gift');
            newListItem.appendChild(spanFoto);

            spanFoto.addEventListener('click',()=>{
                spanFoto.children[0].classList.toggle('d-grid');
            })

            let contenedorImg = document.createElement('DIV');
            contenedorImg.classList.add('contenedorImg');
            spanFoto.appendChild(contenedorImg);
            
            contenedorImg.addEventListener('click',()=>{
                spanFoto.click
            })
            
            let imgListItem = document.createElement('IMG');
            imgListItem.setAttribute('src',regalo.link);
            imgListItem.setAttribute('alt','Link de una imagen representativa del regalo');
            contenedorImg.appendChild(imgListItem);

            let contenedorAcciones = document.createElement('DIV');
            contenedorAcciones.classList.add('contenedorAcciones');
            lista.appendChild(contenedorAcciones);

            let edit = document.createElement('BUTTON');
            edit.classList.add('material-symbols-outlined');
            edit.classList.add('edit');
            edit.setAttribute('title','Editar')
            edit.setAttribute('tabindex','2 ')
            edit.innerText = 'edit';

            edit.addEventListener('click',()=>{
                //Contenedor de form
                let contenedorFormularioEdit = document.createElement('DIV');
                contenedorFormularioEdit.classList.add('contenedor_formulario');
                contenedorFormularioEdit.classList.add('d-grid');
                contenedorFormularioEdit.setAttribute('id','contenedor_form_edit');
                document.getElementById('box_app').appendChild(contenedorFormularioEdit);

                //Formulario de edit
                let formEdit = document.createElement('FORM');
                formEdit.classList.add('form_gift');
                formEdit.setAttribute('id','form_edit_gift');
                formEdit.setAttribute('data-name', regalo.nombre);
                formEdit.setAttribute('data-owner', regalo.owner);
                formEdit.setAttribute('onsubmit','return editGift()');
                contenedorFormularioEdit.appendChild(formEdit);

                //Titulo de form
                let title = document.createElement('H2');
                title.classList.add('titulo_form');
                title.innerText = 'Editar regalo';
                formEdit.appendChild(title);

                //Boton de cierre
                let btnCloseFormEdit = document.createElement('BUTTON');
                btnCloseFormEdit.classList.add('close_form_gift');
                btnCloseFormEdit.setAttribute('id','close_form_edit_gift');
                btnCloseFormEdit.setAttribute('type','button');
                btnCloseFormEdit.setAttribute('tabindex','2');
                btnCloseFormEdit.innerText = 'X';
                
                btnCloseFormEdit.addEventListener('click',()=>{
                    let padre = contenedorFormularioEdit.parentElement;
                    padre.removeChild(contenedorFormularioEdit);
                })
                
                formEdit.appendChild(btnCloseFormEdit);
                
                //Input regalo
                let inputGift = document.createElement('INPUT');
                inputGift.setAttribute('type','text');
                inputGift.setAttribute('name','gift');
                inputGift.setAttribute('id','gift_input_edit');
                inputGift.setAttribute('placeholder','Agrega el nombre del regalo');
                inputGift.setAttribute('tabindex','2');
                inputGift.value = regalo.nombre;
                formEdit.appendChild(inputGift);
                
                //Input link
                let inputLink = document.createElement('INPUT');
                inputLink.setAttribute('type','text');
                inputLink.setAttribute('name','giftLink');
                inputLink.setAttribute('id','gift_link_edit');
                inputLink.setAttribute('placeholder','Agrega el link de una foto del regalo');
                inputLink.setAttribute('tabindex','2');
                inputLink.value = regalo.link;
                formEdit.appendChild(inputLink);
                
                //Input link
                let inputCantidad = document.createElement('INPUT');
                inputCantidad.setAttribute('type','number');
                inputCantidad.setAttribute('name','giftCantidad');
                inputCantidad.setAttribute('id','gift_cantidad_edit');
                inputCantidad.setAttribute('placeholder','Agrega la cantidad');
                inputCantidad.setAttribute('tabindex','2');
                inputCantidad.value = regalo.cantidad;
                formEdit.appendChild(inputCantidad);
                
                //Input Owner
                let inputOwner = document.createElement('INPUT');
                inputOwner.setAttribute('type','text');
                inputOwner.setAttribute('name','giftOwner');
                inputOwner.setAttribute('id','gift_owner_edit');
                inputOwner.setAttribute('placeholder','Agrega el destinatario');
                inputOwner.setAttribute('tabindex','2');
                inputOwner.value = regalo.owner;
                formEdit.appendChild(inputOwner);

                //Boton Editar
                let botonSave = document.createElement('BUTTON');
                botonSave.classList.add('btn_add_gift');
                botonSave.setAttribute('type','submit');
                botonSave.setAttribute('tabindex','2');
                botonSave.innerText = 'Guardar';
                formEdit.appendChild(botonSave);

            })

            contenedorAcciones.appendChild(edit);

            let tachito = document.createElement('BUTTON');
            tachito.classList.add('material-symbols-outlined');
            tachito.classList.add('tachito');
            tachito.setAttribute('title','Eliminar')
            tachito.setAttribute('tabindex','3')
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
                            let nombreRegalo = tachito.parentElement.previousElementSibling.children[1].textContent;
                            let nombreOwner = tachito.parentElement.previousElementSibling.children[1].children[0].textContent;
                            let primerEspacioRegalo = nombreRegalo.indexOf('para ');
                            let primerEspacioOwner = nombreOwner.indexOf(' ');
                            if(gifts[i].nombre === nombreRegalo.slice(0,primerEspacioRegalo) && 
                            gifts[i].owner === nombreOwner.slice(primerEspacioOwner+1)){
                                index = i;
                            }
                        }
                        gifts.splice(index,1)
                        lista.removeChild(tachito.parentElement.previousElementSibling)
                        lista.removeChild(tachito.parentElement)
                        localStorage.setItem('gifts',JSON.stringify(gifts))
                    }
                }).then(()=>checkList())
                
            })
            contenedorAcciones.appendChild(tachito);
    
            //Vacio los inputs
            document.getElementById('gift_input').value = '';
            document.getElementById('gift_link').value = '';
            document.getElementById('gift_cantidad').value = '';
            document.getElementById('gift_owner').value = '';
    
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

function capitalizarPalabra(word){
    let newWord = '';
    for(let i = 0; i < word.length; i++){
        if(i === 0){
            newWord += word[i].toUpperCase();
        }else if(word[i-1] === ' '){
            newWord += word[i].toUpperCase();
        }else{
            newWord += word[i]
        }

    }
    return newWord
}

generarLista(gifts)