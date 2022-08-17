# Mapa y WeakMap

Hasta ahora, todas las novedades de ES2015 han sido nuevas construcciones del lenguaje: ¡nuevas sintaxis y palabras clave, como `let`, `const` y clases! Y eso no es casualidad: estas son las cosas más importantes que hay que entender.

Pero ES2015 viene repleto de otras novedades, como nuevas funciones y nuevos objetos. Y la mayoría de ellos son bastante fáciles de entender: cuando veas un objeto o una función que no reconozcas, búscalo, mira cómo funciona... ¡y sigue adelante!

## El objeto mapa

Pero, hay un conjunto de objetos... juego de palabras... del que sí quiero hablar. Son, `Map`, `WeakMap` y... ¡ `Set`!

Vuelve a entrar en `play.js`. Vamos a experimentar primero con `Map`.

Ahora mismo, cuando necesitas una matriz asociativa, simplemente creas un objeto `foods = {}`
y empezar a añadirle cosas deliciosas: `foods.italian = 'gelato'`,`foods.mexican = 'torta'` y `foods.canadian = 'poutine'`. La poutine es súper deliciosa:

[[[ code('6e92ec2771') ]]]

En el fondo, por supuesto, podemos registrar `foods.italian`:

[[[ code('bec3ab8e47') ]]]

Y no es de extrañar que nuestra consola nos diga que debemos comer helado. ¡Buena idea!

En ES2015, ahora tenemos una nueva herramienta: en lugar de crear un objeto simple, podemos crear un nuevo objeto `Map`. La sintaxis es ligeramente diferente: en lugar de `foods.italian = 'gelato'`, utiliza `foods.set('italian', 'gelato')`:

[[[ code('d73823a9f1') ]]]

Repite esto para las otras dos claves. Y al final, busca el valor con `foods.get('italian')`:

[[[ code('be253ca1ba') ]]]

¡Sencillo y bonito! ¡Y funciona exactamente igual que antes!

¡Genial! Así que... tenemos un nuevo objeto `Map`... y es una forma diferente de crear un array asociativo. ¿Pero por qué lo vamos a utilizar? ¡Porque viene con unos bonitos métodos de ayuda! Por ejemplo, podemos decir `foods.has('french')`:

[[[ code('871715f9e7') ]]]

Y eso devuelve `false`. Un fastidio para nosotros.

Antes no era muy difícil comprobar si una clave existía, pero esto parece limpio.

## Mapa con claves que no son de cadena

El mapa tiene otra ventaja... que es un poco loca: ¡puedes utilizar claves que no sean de cadena!

Prueba esto: crea una nueva variable: `let southernUSStates` ajustada a una matriz de`Tennessee`, `Kentucky`, y `Texas`:

[[[ code('95d59280a9') ]]]

Ahora podemos decir `foods.set(southernUSStates)` y establecerlo en `hot chicken`:

[[[ code('b703816d4e') ]]]

Sí, la clave es en realidad un objeto. ¡Y eso no es un problema!

Nota complementaria importante: el pollo picante es realmente algo que sólo debes comer en Tennessee, pero para este ejemplo, necesitaba incluir algunos otros estados. En Texas, debes comer Brisket.

De todos modos, en la parte inferior, utiliza `foods.get(southernUSStates)` para sacar ese valor:

[[[ code('12dd063bd7') ]]]

¡Y funciona tal y como queremos!

Si te preguntas cuándo será útil esto... estate atento. Ah, y hay otra propiedad que deberías conocer: `foods.size`:

[[[ code('9ad2385cb1') ]]]

Que imprimirá 4. ¡Saluda al nuevo objeto `Map`!

***TIP
También puedes hacer un bucle sobre un `Map` utilizando nuestro nuevo amigo: el bucle `for of`. Puedes hacer un bucle sobre los valores o las claves!```js
// loop over the keys *and* values
for (let [countryKey, food] of foods.entries()) {
    console.log(countryKey, food); // e.g. italian gelato
}

// loop over the keys (e.g. italian)
for (let countryKey of foods.keys()) {
    console.log(countryKey);
}
```Entre bastidores, el último ejemplo utiliza [destructuring][desestructuración] para asignar cada uno de los valores devueltos por `entries()` a las variables `countryKey` y `food`. ¡Ya está todo listo!
***

## Presentamos WeakMap... ¿un mapa peor?

ES2015 también nos ofrece un nuevo objeto muy similar: `WeakMap`:

[[[ code('5be00f8592') ]]]

Y aquí es donde las cosas se vuelven un poco locas. ¿Por qué tenemos un `Map` y un `WeakMap`?

¡Averigüémoslo! Primero intenta ejecutar nuestro código con `WeakMap`.

Woh, ¡estalla!

> Valor inválido utilizado como clave del mapa de la semana

`Map` y `WeakMap` son básicamente lo mismo... excepto que `WeakMap` tiene un requisito extra: sus claves deben ser objetos. Así que sí, por ahora, parece que `WeakMap` es sólo una versión peor de `Map`.

Convierte cada clave en un array, que es un objeto. En el fondo, utiliza `foods.get()`y pásale el array `italian`:

[[[ code('fc08c0d2b2') ]]]

Ahora, cuando lo ejecuto, funciona bien. Espera, o, ¿lo hace?

Dos cosas interesantes: esto imprime `undefined`, `hot chicken`, `undefined`. En primer lugar, aunque la matriz `['italian']` en `get()` es igual a la matriz `['italian']` utilizada en set, no son el mismo objeto en memoria. Son dos objetos distintos, por lo que parece una clave diferente a `WeakMap`. Por eso imprime `undefined`.

En segundo lugar, con `WeakMap`, no puedes llamar a `foods.size`. Eso no funciona con `WeakMap`.

## WeakMap y la recolección de basura

Permíteme mostrarte otra locura, que empezará a mostrarte el propósito de `WeakMap`. Después de colocar el `southernUSStates` en el array, voy a colocar`southernUSStates` en null:

[[[ code('caa149b87a') ]]]

Cuando lo pruebes ahora, se imprimirá, por supuesto, "indefinido". Eso tiene sentido: ahora estamos pasando `null` a la función `get()`.

Pero lo que no puedes ver es que el objeto `southernUSStates` ya no existe... ¡en ningún lugar de la memoria! 

¿Por qué? En JavaScript, si tienes una variable a la que ya no hace referencia ninguna otra cosa, como `southernUSStates`, es susceptible de ser eliminada por la recolección de basura de JavaScript. Lo mismo ocurre en PHP.

Pero normalmente, como establecemos `southernUSStates` como clave en `WeakMap`, esta referencia a `southernUSStates` evitaría esa recogida de basura. Eso ocurre con `Map`, pero no con `WeakMap`: no impide la recogida de basura. En otras palabras, aunque `southernUSStates` siga en nuestro `WeakMap`, al no estar referenciado en ningún otro sitio, se elimina de la memoria gracias a la recogida de basura.

Pero, en realidad, ¿con qué frecuencia tienes que preocuparte de la recogida de basura cuando construyes una aplicación web? Probablemente no muy a menudo. Así que, llegados a este punto, deberías utilizar `Map`en todas partes: es más fácil y tiene más funciones.

Y eso es cierto Excepto para un caso de uso especial, fascinante y friki de `WeakMap`. ¡Conozcámoslo!

[destructuring]: http://knpuniversity.com/screencast/javascript-es6/destructuring
