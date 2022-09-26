const Clickbutton = document.querySelectorAll('.button')
const tbody = document.querySelector('.tbody')
const comprabtn = document.getElementById('btn__comprar')

let carrito = []




Clickbutton.forEach(btn => {
  btn.addEventListener('click', addToCarritoItem)
})


function addToCarritoItem(e){
  const button = e.target
  const item = button.closest('.card')
  const itemTitle = item.querySelector('.card-title').textContent;
  const itemPrice = item.querySelector('.precio').textContent;
  const itemImg = item.querySelector('.card-img-top').src;
  
  const newItem = {
    title: itemTitle,
    precio: itemPrice,
    img: itemImg,
    cantidad: 1
  }

  addItemCarrito(newItem)
}


function addItemCarrito(newItem){
  Toastify({
    text: "Producto agregado al carrito",
    duration: 3000,
    destination: "https://github.com/apvarun/toastify-js",
    newWindow: true,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "center", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: "linear-gradient(160deg, #0093E9 0%, #80D0C7 100%)",
      color:"black",
      fontWeight: "bold",
    },
    onClick: function(){} // Callback after click
  }).showToast();
  /*const alert = document.querySelector('.alert')

  setTimeout( function(){
    alert.classList.add('hide')
  }, 2000)
    alert.classList.remove('hide')*/

  const InputElemnto = tbody.getElementsByClassName('input__elemento')
  for(let i =0; i < carrito.length ; i++){
    if(carrito[i].title.trim() === newItem.title.trim()){
      carrito[i].cantidad ++;
      const inputValue = InputElemnto[i]
      inputValue.value++;
      CarritoTotal()
      return null;
    }
  }
  
  carrito.push(newItem)
  
  renderCarrito()
} 


function renderCarrito(){
  tbody.innerHTML = ''
  carrito.map(item => {
    const tr = document.createElement('tr')
    tr.classList.add('ItemCarrito')
    let{img, title, precio, cantidad}=item;
    const Content = `
    <th scope="row">1</th>
            <td class="table__productos">
              <img src=${img}  alt="">
              <h6 class="title">${title}</h6>
            </td>
            <td class="table__price"><p>${precio}</p></td>
            <td class="table__cantidad">
              <input type="number" min="1" value=${cantidad} class="input__elemento">
              <button class="delete btn btn-danger">x</button>
            </td>
    
    `
    tr.innerHTML = Content;
    tbody.append(tr)

    tr.querySelector(".delete").addEventListener('click', removeItemCarrito)
    tr.querySelector(".input__elemento").addEventListener('change', sumaCantidad)
  })
  CarritoTotal()
}

function CarritoTotal(){
  let Total = 0;
  const itemCartTotal = document.querySelector('.itemCartTotal')
  carrito.forEach((item) => {
    const precio = Number(item.precio.replace("$", ''))
    Total = Total + precio*item.cantidad
  })

  itemCartTotal.innerHTML = `Total $${Total}`
  addLocalStorage()
}

function removeItemCarrito(e){
  const buttonDelete = e.target
  const tr = buttonDelete.closest(".ItemCarrito")
  const title = tr.querySelector('.title').textContent;
  for(let i=0; i<carrito.length ; i++){

    if(carrito[i].title.trim() === title.trim()){
      carrito.splice(i, 1)
    }
  }
  Toastify({
    text: "Producto Eliminado",
    duration: 3000,
    destination: "https://github.com/apvarun/toastify-js",
    newWindow: true,
    close: true,
    gravity: "top", // `top` or `bottom`
    position: "center", // `left`, `center` or `right`
    stopOnFocus: true, // Prevents dismissing of toast on hover
    style: {
      background: "linear-gradient(160deg, #ff2600 0%, #ff7b00 100%)",
      color:"black",
      fontWeight: "bold",
    },
    onClick: function(){} // Callback after click
  }).showToast();
  /*const alert = document.querySelector('.remove')

  setTimeout( function(){
    alert.classList.add('.remove')
  }, 2000)
    alert.classList.remove('.remove')*/

  tr.remove()
  CarritoTotal()
}

function sumaCantidad(e){
  const sumaInput  = e.target
  const tr = sumaInput.closest(".ItemCarrito")
  const title = tr.querySelector('.title').textContent;
  carrito.forEach(item => {
    if(item.title.trim() === title){
      sumaInput.value < 1 ?  (sumaInput.value = 1) : sumaInput.value;
      item.cantidad = sumaInput.value;
      CarritoTotal()
    }
  })
}

function addLocalStorage(){
  localStorage.setItem('carrito', JSON.stringify(carrito))
}

window.onload = function(){
  const storage = JSON.parse(localStorage.getItem('carrito'));
  if(storage){
    carrito = storage;
    renderCarrito()
  }
}


//formulario//

const formulario = document.getElementById("formulario");
const inputs = document.querySelectorAll("#formulario input");
const formulario__btn = document.querySelector(".formulario__btn")

const expresiones = {
  usuario: /^[a-zA-Z0-9\_\-]{4,16}$/, 
  nombre: /^[a-zA-ZÀ-ÿ\s]{1,40}$/, 
  password: /^.{4,12}$/, 
  correo: /^[a-zA-Z0-9_.+-]+@[a-zA-Z0-9-]+\.[a-zA-Z0-9-.]+$/,
  telefono: /^\d{7,14}$/, 
};

const usuarios = {
  usuario: "luis123",
  nombre: "luis",
  password: "abc123",
  correo: "correo@gmail.com",
  telefono: "1152367587",
  
}

const desectructurar=({usuario, nombre, password, correo, telefono})=>{
  console.log(usuario, nombre, password, correo, telefono)
}

desectructurar(usuarios)


 


const campos = {
  usuario: false,
  nombre: false,
  password: false,
  correo: false,
  telefono: false,
};

function registro(usuario, nombre, password, correo, telefono){
  this.usuario = usuario;
  this.nombre = nombre;
  this.password = password;
  this.correo = correo;
  this.telefono = parseInt (telefono);
  
}





const validarformulario = (e) => {
  switch (e.target.name) {
    case "usuario":
      validarCampo(expresiones.usuario, e.target, "usuario");
      break;

    case "nombre":
      validarCampo(expresiones.nombre, e.target, "nombre");
      break;

    case "password":
      validarCampo(expresiones.password, e.target, "password");
      validarpassword2();
      break;

    case "password2":
      validarpassword2();
      break;

    case "correo":
      validarCampo(expresiones.correo, e.target, "correo");
      break;

    case "telefono":
      validarCampo(expresiones.telefono, e.target, "telefono");
      break;
  }
};

const validarCampo = (expresion, input, campo) => {
  if (expresion.test(input.value)) {
    document
      .getElementById(`grupo__${campo}`)
      .classList.remove("formulario__grupo-incorrecto");
    document
      .getElementById(`grupo__${campo}`)
      .classList.add("formulario__grupo-correcto");
    document
      .querySelector(`#grupo__${campo} i`)
      .classList.add("fa-check-circle");
    document
      .querySelector(`#grupo__${campo} i`)
      .classList.remove("fa-times-circle");
    document
      .querySelector(`#grupo__${campo} .formulario__input-error`)
      .classList.remove("formulario__input-error-activo");
    campos[campo] = true;
  } else {
    document
      .getElementById(`grupo__${campo}`)
      .classList.add("formulario__grupo-incorrecto");
    document
      .getElementById(`grupo__${campo}`)
      .classList.remove("formulario__grupo-correcto");
    document
      .querySelector(`#grupo__${campo} i`)
      .classList.add("fa-times-circle");
    document
      .querySelector(`#grupo__${campo} i`)
      .classList.remove("fa-check-circle");
    document
      .querySelector(`#grupo__${campo} .formulario__input-error`)
      .classList.add("formulario__input-error-activo");
    campos[campo] = false;
  }
  
};

const validarpassword2 = () => {
  const inputPassword1 = document.getElementById("password");
  const inputPassword2 = document.getElementById("password2");
  

  if (inputPassword1.value !== inputPassword2.value) {
    document
      .getElementById(`grupo__password2`)
      .classList.add("formulario__grupo-incorrecto");
    document
      .getElementById(`grupo__password2`)
      .classList.remove("formulario__grupo-correcto");
    document
      .querySelector(`#grupo__password2 i`)
      .classList.add("fa-times-circle");
    document
      .querySelector(`#grupo__password2 i`)
      .classList.remove("fa-check-circle");
    document
      .querySelector(`#grupo__password2 .formulario__input-error`)
      .classList.add("formulario__input-error-activo");
    campos["password"] = false;
  } else {
    document
      .getElementById(`grupo__password2`)
      .classList.remove("formulario__grupo-incorrecto");
    document
      .getElementById(`grupo__password2`)
      .classList.add("formulario__grupo-correcto");
    document
      .querySelector(`#grupo__password2 i`)
      .classList.remove("fa-times-circle");
    document
      .querySelector(`#grupo__password2 i`)
      .classList.add("fa-check-circle");
    document
      .querySelector(`#grupo__password2 .formulario__input-error`)
      .classList.remove("formulario__input-error-activo");
    campos["password"] = true;
  }
};

inputs.forEach((input) => {
  input.addEventListener("keyup", validarformulario);
  input.addEventListener("blur", validarformulario);
});

formulario.addEventListener("submit", (e) => {
  e.preventDefault();

  const terminos = document.getElementById("terminos");
  /*if (
    campos.usuario &&
    campos.nombre &&
    campos.password &&
    campos.correo &&
    campos.telefono &&
    terminos.checked
  ) {
    formulario.reset();*/
    
    campos.usuario&&campos.nombre&&campos,password&&campos.correo&&campos.telefono&&terminos.checked ? formulario.reset() : document.getElementById("formulario__mensaje").classList.add("formulario__mensaje-activo");

    document
      .getElementById("formulario__mensaje-exito")
      .classList.add("formulario__mensaje-exito-activo");
    setTimeout(() => {
      document
        .getElementById("formulario__mensaje-exito")
        .classList.remove("formulario__mensaje-exito-activo");
    }, 5000);

    document
      .querySelectorAll(".formulario__grupo-correcto")
      .forEach((icono) => {
        icono.classList.remove("formulario__grupo-correcto");
      })
  }) /*else {
    document
      .getElementById("formulario__mensaje")
      .classList.add("formulario__mensaje-activo");
  }
});*/





function cargarUsuario(arr,obj){
  return arr.push(obj);
}



formulario__btn.addEventListener("click", () =>{
  const nuevoUsuario= new registro(usuario.value, nombre.value, password.value, correo.value, telefono.value, )
  console.log(nuevoUsuario)
   //cargarUsuario(inventarioUsr,)
}) 