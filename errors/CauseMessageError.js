export const generatorUserError = (data) => {
  return `faltan de agregar productos o tienen valores incorrectos
    - title   tiene que ser un string:           ${data.title}

    - description  tiene que ser un string:      ${data.description}

    - thumbnail tiene que ser un string:         ${data.thumbnail}

    - size  tiene que ser S M L:                 ${data.size}

    - price tiene que ser num:                   ${data.price}

    - code  tiene que ser num:                   ${data.code}
    
    - stock tiene que ser num:                   ${data.stock}
    `;

};

export const generatorID = (pid) => {
  return `el carrito es: ${pid}, debes crear un carrito nuevo o iniciar session   
  `;



};

