function obtenerId (){
  let id = JSON.parse(localStorage.getItem('id'));
  masInformacion(id);
}
obtenerId();


function masInformacion(id){
  url = `https://www.thecocktaildb.com/api/json/v1/1/lookup.php?i=${id}`;
  fetch(url)
  .then(response =>{
    if(!response.ok){
        throw new Error('Error en la petición: ' + response.statusText);
    }
    return response.json(); //Parsear la respuesta como un JSON
})
.then(dataInfo => {
    //Procesar la respuesta
    const masInfos = dataInfo.drinks;
    const div = document.querySelector('.infoCoctail');

    if(div.children.length>0){
      console.log('tiene contenido');
      div.innerHTML = '';
      imprimirInfo(masInfos, div);
    }else{
      imprimirInfo(masInfos, div);
    }
})
}

function imprimirInfo(masInfos, div){
  masInfos.forEach(masInfo=>{
    const title = document.createElement('h3');
    title.textContent = 'Bebida: '+masInfo.strDrink;
    title.classList.add('card-title' , 'title', masInfo.idDrink, 'text-primary');
    div.appendChild(title);
    if(masInfo.strTags !== null){
      const tag = document.createElement('h4');
    tag.textContent = 'Tags: '+masInfo.strTags;
    tag.classList.add('p-3');
    div.appendChild(tag);
    }
    const cat = document.createElement('h5');
    cat.textContent = 'Categoría: '+masInfo.strCategory;
    div.appendChild(cat);
    const tipe = document.createElement('p');
    tipe.textContent = 'Tipo de bebida: '+ masInfo.strAlcoholic;
    div.appendChild(tipe);
    const imagen = document.createElement('img');
    imagen.src = masInfo.strDrinkThumb;
    imagen.style.width = '500px';
    imagen.style.height = 'auto';
    imagen.classList.add('p-3');
    div.appendChild(imagen);
    const instrucciones = document.createElement('p');
    instrucciones.textContent = 'Instrucciones: '+ verificarNulo(masInfo.strInstructions) + verificarNulo(masInfo.strInstructionsES)  + verificarNulo(masInfo.strInstructionsDE) + verificarNulo(masInfo.strInstructionsFR)  + verificarNulo(masInfo.strInstructionsIT);
    instrucciones.classList.add('p-3'); 
    div.appendChild(instrucciones);
    const ingredientes = document.createElement('p');
    ingredientes.textContent = 'Ingredientes: '+ verificarNulo(masInfo.strIngredient1) + verificarNulo(masInfo.strIngredient2) + verificarNulo(masInfo.strIngredient3) + verificarNulo(masInfo.strIngredient4) + verificarNulo(masInfo.strIngredient5)+ verificarNulo(masInfo.strIngredient6)  + verificarNulo(masInfo.strIngredient7)  + verificarNulo(masInfo.strIngredient8) + verificarNulo(masInfo.strIngredient9) + verificarNulo(masInfo.strIngredient10) +verificarNulo(masInfo.strIngredient11) + verificarNulo(masInfo.strIngredient12) + verificarNulo(masInfo.strIngredient13) + verificarNulo(masInfo.strIngredient14) + verificarNulo(masInfo.strIngredient15);
    div.appendChild(ingredientes);
    const fechaModificacion = document.createElement('p');
    fechaModificacion.textContent = 'Fecha de modificación: '+ masInfo.dateModified;
    div.appendChild(fechaModificacion);
})

limpiarLocalStorage();
}

function verificarNulo(dato){
  if(dato === null){
    return '';
  }else{
    return ' - ' + dato;
  }
}

function limpiarLocalStorage(){
  localStorage.removeItem('id');
}