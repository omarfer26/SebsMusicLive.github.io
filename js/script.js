fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?i=list')
  .then(response => {
    if (!response.ok) {
      throw new Error('Error en la solicitud: ' + response.statusText);
    }
    return response.json();  // Parsear la respuesta como JSON
  })
  .then(datdIngredients => {
    // Procesar la respuesta
    const ingredients = datdIngredients.drinks;

    const select = document.querySelector('.ingredientsSelect');

    ingredients.forEach(ingredient=>{
        const option = document.createElement('option');
        option.value = ingredient.strIngredient1;
        option.textContent = ingredient.strIngredient1;
        select.appendChild(option);
    })
  })
  .catch(error => {
    console.error('Error:', error);
  });

fetch('https://www.thecocktaildb.com/api/json/v1/1/list.php?a=list')
  .then(response => {
    if (!response.ok) {
      throw new Error('Error en la solicitud: ' + response.statusText);
    }
    return response.json();  // Parsear la respuesta como JSON
  })
  .then(dataCategory => {
    // Procesar la respuesta
    const categories = dataCategory.drinks;

    const select = document.querySelector('.categorySelect');

    categories.forEach(category=>{
        const option = document.createElement('option');
        option.value = category.strAlcoholic;
        option.textContent = category.strAlcoholic;
        select.appendChild(option);
    })
  })
  .catch(error => {
    console.error('Error:', error);
  });


  document.querySelector('#form').addEventListener('submit', (e)=>{
    e.preventDefault();
    const data = Object.fromEntries(
      new FormData(e.target)
    )

    ingredienteCategoriaONombre(data.ingredients, data.category, data.name);
  })

 function ingredienteCategoriaONombre(ingredient,category,nombre) {
    if(ingredient === '' && category === '' && nombre === ''){
      alert('Debes elegir una opción');
  }else if(ingredient === 'Gin'){
    listarIngredientesGin();
  }else if(ingredient === 'Vodka'){
    listarIngredientesVodka();
  }else if(category === 'Alcoholic'){
    listarCategoriaAlcoholica();
  }
  else if(category === 'Non alcoholic'){
    listarCategoriaNonAlcoholica();
  }else if(nombre !== ''){
    buscarPorNombre(nombre);
  }
  }

  listarIngredientesGin = ()=>{
    url = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Gin";
    fetch(url)
    .then(response =>{
        if(!response.ok){
            throw new Error('Error en la petición: ' + response.statusText);
        }
        return response.json(); //Parsear la respuesta como un JSON
    })
    .then(dataGin => {
      
        //Procesar la respuesta
        const gins = dataGin.drinks;
    const div = document.querySelector('#cocteles');


        if(div.children.length>0){
          console.log('tiene contenido');
          div.innerHTML = '';
          imprimirPorGin(gins, div);
        }else{
          imprimirPorGin(gins, div);
        }
    })
  }


  function imprimirPorGin(gins, div){
    gins.forEach(gin=>{
      const divC = document.createElement('div');
      divC.classList.add('col-3', 'p-4', 'text-center', 'justify-content-center', 'align-items-center');
      const h3 = document.createElement('h3');
      h3.textContent = gin.strDrink;
      h3.classList.add('card-title' , 'title', gin.idDrink, 'mb-3', 'fs-5');
      divC.appendChild(h3);
      const img = document.createElement('img');
      img.src = gin.strDrinkThumb;
      img.onclick = ()=>{
        const id = gin.idDrink;
        localStorage.setItem('id', JSON.stringify(id));
        window.location.href = 'infoCoctail.html';
      }
      divC.appendChild(img);
      img.style.width = '200px';
      img.style.height = '200px';
      img.style.cursor = 'pointer';
      const p = document.createElement('p');
      p.textContent = gin.idDrink;
      divC.appendChild(p);

      div.appendChild(divC);
  })
  }

  listarIngredientesVodka = ()=> {
    url = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?i=Vodka";
    fetch(url)
    .then(response =>{
        if(!response.ok){
            throw new Error('Error en la petición: ' + response.statusText);
        }
        return response.json(); //Parsear la respuesta como un JSON
    })
    .then(dataVodka => {
        //Procesar la respuesta
        const vodkas = dataVodka.drinks;
        const div = document.querySelector('#cocteles');
        if(div.children.length>0){
          console.log('tiene contenido');
          div.innerHTML = '';
          imprimirPorVodka(vodkas, div);
        }else{
          imprimirPorVodka(vodkas, div);
      }
    })
  }

  imprimirPorVodka = (vodkas, div)=>{
    vodkas.forEach(vodka=>{
      const divC = document.createElement('div');
      divC.classList.add('col-3', 'p-4', 'text-center', 'justify-content-center', 'align-items-center');
      const h3 = document.createElement('h3');
      h3.textContent = vodka.strDrink;
      h3.classList.add('card-title' , 'title', vodka.idDrink, 'mb-3', 'fs-5');
      divC.appendChild(h3);
      const img = document.createElement('img');
      img.src = vodka.strDrinkThumb;
      img.onclick = ()=>{
        const id = vodka.idDrink;
        localStorage.setItem('id', JSON.stringify(id));
        window.location.href = 'infoCoctail.html';
      }
      divC.appendChild(img);
      img.style.width = '200px';
      img.style.height = '200px';
      img.style.cursor = 'pointer';
      const p = document.createElement('p');
      p.textContent = vodka.idDrink;
      divC.appendChild(p);

      div.appendChild(divC);
  })
  }
  listarCategoriaAlcoholica = ()=>{
    url = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Alcoholic";
    fetch(url)
    .then(response =>{
        if(!response.ok){
            throw new Error('Error en la petición: ' + response.statusText);
        }
        return response.json(); //Parsear la respuesta como un JSON
    })
    .then(dataAlcoholic => {
      
        //Procesar la respuesta
        const alcoholics = dataAlcoholic.drinks;
        const div = document.querySelector('#cocteles');

        if(div.children.length>0){
          console.log('tiene contenido');
          div.innerHTML = '';
          imprimirAlcoholic(alcoholics, div);
        }else{
          imprimirAlcoholic(alcoholics, div);
        }
    })
  }

  function imprimirAlcoholic(alcoholics, div){
    alcoholics.forEach(alcoholic=>{
      const divC = document.createElement('div');
      divC.classList.add('col-3', 'p-4', 'text-center', 'justify-content-center', 'align-items-center');
      const h3 = document.createElement('h3');
      h3.textContent = alcoholic.strDrink;
      h3.classList.add('card-title' , 'title', alcoholic.idDrink, 'mb-3', 'fs-5');
      divC.appendChild(h3);
      const img = document.createElement('img');
      img.src = alcoholic.strDrinkThumb;
      img.onclick = ()=>{
        const id = alcoholic.idDrink;
        localStorage.setItem('id', JSON.stringify(id));
        window.location.href = 'infoCoctail.html';
      }
      img.style.width = '200px';
      img.style.height = '200px';
      img.style.cursor = 'pointer';
      divC.appendChild(img);
      const p = document.createElement('p');
      p.classList.add('mt-3');
      p.textContent = alcoholic.idDrink;
      divC.appendChild(p);

      div.appendChild(divC);

  })
  }

  listarCategoriaNonAlcoholica = ()=>{
    url = "https://www.thecocktaildb.com/api/json/v1/1/filter.php?a=Non_Alcoholic";
    fetch(url)
    .then(response =>{
        if(!response.ok){
            throw new Error('Error en la petición: ' + response.statusText);
        }
        return response.json(); //Parsear la respuesta como un JSON
    })
    .then(dataNonAlcoholic => {
      
        //Procesar la respuesta
        const nonAlcoholics = dataNonAlcoholic.drinks;
        const div = document.querySelector('#cocteles');

        if(div.children.length>0){
          console.log('tiene contenido');
          div.innerHTML = '';
          imprimirNoAlcoholic(nonAlcoholics, div);
        }else{
          imprimirNoAlcoholic(nonAlcoholics, div);
        }
    })
  }

  function imprimirNoAlcoholic(nonAlcoholics, div){
    nonAlcoholics.forEach(nonAlcoholic=>{
      const divC = document.createElement('div');
      divC.classList.add('col-3', 'p-4', 'text-center', 'justify-content-center', 'align-items-center');
      const h3 = document.createElement('h3');
      h3.textContent = nonAlcoholic.strDrink;
      h3.classList.add('card-title' , 'title', nonAlcoholic.idDrink, 'mb-3', 'fs-5');
      divC.appendChild(h3);
      const img = document.createElement('img');
      img.src = nonAlcoholic.strDrinkThumb;
      img.onclick = ()=>{
        const id = nonAlcoholic.idDrink;
        localStorage.setItem('id', JSON.stringify(id));
        window.location.href = 'infoCoctail.html';
      }
      img.style.width = '200px';
      img.style.height = '200px';
      img.style.cursor = 'pointer';
      divC.appendChild(img);
      const p = document.createElement('p');
      p.textContent = nonAlcoholic.idDrink;
      divC.appendChild(p);

      div.appendChild(divC);
  })

  }

  function buscarPorNombre(nombre){
    url = `https://www.thecocktaildb.com/api/json/v1/1/search.php?s=${nombre}`;
    console.log(url);
    fetch(url)
    .then(response =>{
        if(!response.ok){
            throw new Error('Error en la petición: ' + response.statusText);
        }
        return response.json(); //Parsear la respuesta como un JSON
    })
    .then(dataNombre => {
      
        //Procesar la respuesta
        const nombreDatos = dataNombre.drinks;
        const div = document.querySelector('#cocteles');

        if(div.children.length>0){
          console.log('tiene contenido');
          div.innerHTML = '';
          imprimirPorNombre(nombreDatos, div);
        }else{
          imprimirPorNombre(nombreDatos, div);
        }
    })
  }

  function imprimirPorNombre(nombreDatos, div){
    nombreDatos.forEach(nombreDato=>{
      const divC = document.createElement('div');
      divC.classList.add('col-3', 'p-4', 'text-center', 'justify-content-center', 'align-items-center');
      const h3 = document.createElement('h3');
      h3.textContent = nombreDato.strDrink;
      h3.classList.add('card-title' , 'title', nombreDato.idDrink, 'mb-3', 'fs-5');
      divC.appendChild(h3);
      const img = document.createElement('img');
      img.src = nombreDato.strDrinkThumb;
      img.onclick = ()=>{
        const id = nombreDato.idDrink;
        localStorage.setItem('id', JSON.stringify(id));
        window.location.href = 'infoCoctail.html';
      }
      img.style.width = '200px';
      img.style.height = '200px';
      img.style.cursor = 'pointer';
      divC.appendChild(img);
      const p = document.createElement('p');
      p.textContent = nombreDato.idDrink;
      divC.appendChild(p);

      div.appendChild(divC);
  })

  }