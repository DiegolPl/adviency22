function caidaDeCopitos(){
    let copito = document.createElement('SPAN');
    copito.classList.add('copito');
    let valorX = Math.floor(Math.random() * 98);
    copito.setAttribute('style',`--urlImg:url(\'../assets/images/copo2.png\');left: ${valorX}%`);
    document.querySelector('body').appendChild(copito);
    setTimeout(()=>{
        document.querySelector('body').removeChild(copito)  
    },5000)
}

setInterval(caidaDeCopitos,300)