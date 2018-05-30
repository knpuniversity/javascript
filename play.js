let foods = new WeakMap();
foods.set(['italian'], 'gelato');
foods.set(['mexican'], 'tortas');
foods.set(['canadian'], 'poutine');

let southernUsStates = ['Tennessee', 'Kentucky', 'Texas'];
foods.set(southernUsStates, 'hot chicken');

console.log(
    foods.get(['italian']),
    foods.get(southernUsStates),
    foods.size
);
