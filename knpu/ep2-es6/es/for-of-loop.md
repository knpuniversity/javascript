# El para del bucle

Una de las locuras de JavaScript... ¡es que no hay una sola forma buena de hacer un bucle sobre una colección! En PHP, tenemos `foreach`, y funciona perfectamente. Pero en JavaScript, tienes que crear un feo bucle personalizado `for`. Bueno, en realidad, existe una función `.forEach()`, pero sólo funciona con matrices, no con otras cosas que puedan ser objeto de bucle, como el objeto Set del que hablaremos más adelante. Y, con `.forEach()`, no hay `break` si quieres salir del bucle antes de tiempo.

Por eso hemos utilizado el `$.each()` de jQuery. Pero, ¿adivina qué? ES2015 soluciona esto, por fin. Presentamos el bucle `for of` 

Su aspecto es el siguiente: `for (let repLog of data.items)`:

[[[ code('fb4bf6264e') ]]]

Y es bastante fácil de seguir: `repLog` es la nueva variable dentro del bucle, y `data.items`es lo que queremos recorrer en bucle. Ya no le pasamos una función anónima, así que podemos deshacernos de todo lo demás. Eso es todo. Saluda a tu nuevo mejor amigo: el bucle `for of`.

Busquemos los otros puntos de `$.each()` y actualicemos también esos En cambio, digamos que para `let fieldData of $form.serializeArray()`:

[[[ code('9fb34dec57') ]]]

Antes, la función anónima recibía una clave y luego la `fieldData`. Pero, en realidad, no necesitábamos la clave: la función `$.each()` sólo nos obligaba a añadirla. Ahora, ¡las cosas están más limpias!

***TIP
Como ahora estamos en un bucle `for`, también tenemos que actualizar la sentencia `return` para que sea `continue`.
***

Haz este mismo cambio en dos lugares más: para `$element of $form.find(':input')`. Ah, no olvides tu `let` o `var`:

[[[ code('1a47ed7580') ]]]

Luego, uno más abajo: para `let $element of $elements`:

[[[ code('1058c41a6e') ]]]

Ah, y PhpStorm me avisa porque me he olvidado de quitar uno de mis paréntesis de cierre! Y, ¡no necesitamos ese punto y coma! ¡Sí!

Así que, ¡utiliza el bucle `for of` para todo! Bueno, en realidad, eso no es 100% cierto. `for of`
es perfecto cuando quieres hacer un bucle sobre una colección de elementos. Pero, si quieres hacer un bucle sobre una matriz asociativa... o un objeto, y necesitas saber la clave de cada elemento, entonces usarás `for in`.

***TIP
En realidad, puedes utilizar `for of` con un objeto, con una combinación inteligente de`Object.entries()` y la desestructuración de la matriz.```js
let pets = {
  beagle: 'Bark Twain',
  poodle: 'Snuffles'
};

for (let [petKey, petName] of Object.entries(pets)) {
  console.log(petKey, petName);
}
```PERO, el método `Object.entries()` es todavía experimental, y puede que se incluya en ES2017.
***

Esta es la única limitación de `for of`: te da el valor del elemento sobre el que haces el bucle, pero no su clave o índice. De hecho, si intentas utilizar `for of` con un objeto, obtendrás un error.
