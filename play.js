let foods = new Map();
foods.set('italian', 'gelato');
foods.set('mexican', 'tortas');
foods.set('canadian', 'poutine');

console.log(
    foods.get('italian'),
    foods.has('french')
);
