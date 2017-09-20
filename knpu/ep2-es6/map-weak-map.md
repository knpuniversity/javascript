# Map and WeakMap

So far, all the new ES2015 stuff has been new language *constructs*: new syntaxes
and keywords, like `let`, `const` and classes! And that was no accident: these are
the most important things to understand.

But ES2015 comes packed with *other* new features, like new functions and new objects.
And mostly, those are easy enough to understand: when you see an object or function
you don't recognize, look it up, see how it works... and keep going!

## The Map Object

But, there is one *set* of objects... pun intended... that I *do* want to talk about.
They are, `Map`, `WeakMap` and... `Set`!

Head back into `play.js`. Let's experiment with `Map` first.

Right now, when you need an associative array, you just create an object: `foods = {}`
and start adding delicious things to it: `foods.italian = 'gelato'`,
`foods.mexican = 'torta'` and `foods.canadian = 'poutine'`. Poutine is super delicious:

[[[ code('6e92ec2771') ]]]

At the bottom, of course, we can log `foods.italian`:

[[[ code('bec3ab8e47') ]]]

And no surprise, our console tells us we should eat gelato. Good idea!

In ES2015, we now have a new tool: instead of creating a simple object, we can
create a new `Map` object. The syntax is slightly different: instead of `foods.italian = 'gelato'`,
use `foods.set('italian', 'gelato')`:

[[[ code('d73823a9f1') ]]]

Repeat this for the other two keys. And at the bottom, fetch the value with `foods.get('italian')`:

[[[ code('be253ca1ba') ]]]

Simple and beautiful! And it works exactly like before!

Great! So... we have a new `Map` object... and it's a different way to create an
associative array. But why would we use it? Because it comes with some nice helper
methods! For example, we can say `foods.has('french')`:

[[[ code('871715f9e7') ]]]

And that returns `false`. Bummer for us.

It wasn't too difficult to check if a key existed before, but this *feels* clean.

## Map with Non-String Keys

Map has one other advantage... which is kind of crazy: you can use non-string keys!

Try this: create a new variable: `let southernUSStates` set to an array of
`Tennessee`, `Kentucky`, and `Texas`:

[[[ code('95d59280a9') ]]]

Now we can say `foods.set(southernUSStates)` and set that to `hot chicken`:

[[[ code('b703816d4e') ]]]

Yes, the *key* is actually an *object*. And that's no problem!

Important side note: hot chicken is really only something you should eat in Tennessee,
but for this example, I needed to include a few other states. In Texas, you should
eat Brisket.

Anyways, at the bottom, use `foods.get(southernUSStates)` to fetch out that value:

[[[ code('12dd063bd7') ]]]

And it works just like we want!

If you're wondering *when* this would be useful... stay tuned. Oh, and there's one
other property you should definitely know about: `foods.size`:

[[[ code('9ad2385cb1') ]]]

That will print 4. Say hello to the new `Map` object!

***TIP
You can also loop over a `Map` using our new friend - the `for of` loop. You can
loop over the values or the keys!

```js
// loop over the keys *and* values
for (let [countryKey, food] of foods.entries()) {
    console.log(countryKey, food); // e.g. italian gelato
}

// loop over the keys (e.g. italian)
for (let countryKey of foods.keys()) {
    console.log(countryKey);
}
```

Behind the scenes, the last example uses [destructuring][destructuring] to assign
each returned by `entries()` to the `countryKey` and `food` variables. It's all
coming together!
***

## Introducing WeakMap... a worse Map?

ES2015 also gives us a very *similar* new object: `WeakMap`:

[[[ code('5be00f8592') ]]]

And this is where things get a little nuts. Why do we have a `Map` and a `WeakMap`?

Let's find out! First try to run our code with `WeakMap`.

Woh, it explodes!

> Invalid value used as week map key

`Map` and `WeakMap` are basically the same... except `WeakMap` has an extra requirement:
its keys *must* be objects. So yes, for now, it seems like `WeakMap` is just a worse
version of `Map`.

Turn each key into an array, which is an object. At the bottom, use `foods.get()`
and pass it the `italian` array:

[[[ code('fc08c0d2b2') ]]]

*Now* when I run it, it works fine. Wait, or, does it?

Two interesting things: this prints `undefined`, `hot chicken`, `undefined`. First,
even though the `['italian']` array in `get()` is equal to the `['italian']` array
used in set, they are not the *same* object in memory. These are two distinct objects,
so it looks like a different key to `WeakMap`. That's why it prints `undefined`.

Second, with `WeakMap`, you can't call `foods.size`. That's just not something that
works with `WeakMap`.

## WeakMap and Garbage Collection

Let me show you one *other* crazy thing, which will start to show you the purpose
of `WeakMap`. After we set the `southernUSStates` onto the array, I'm going to set
`southernUSStates` to null:

[[[ code('caa149b87a') ]]]

When you try it now, this of course prints "undefined". That makes sense: we're now
passing `null` to the `get()` function.

But what you *can't* see is that the `southernUSStates` object no longer exists...
anywhere in memory! 

Why? In JavaScript, if you have a variable that isn't referenced by anything else
anymore, like `southernUSStates`, it's eligible to be removed by JavaScript's
garbage collection. The same thing happens in PHP.

But normally, because we set `southernUSStates` as a key on `WeakMap`, this
reference to `southernUSStates` would *prevent* that garbage collection. That's
true with `Map`, but *not* `WeakMap`: it does not prevent garbage collection. In
other words, even though `southernUSStates` is still on our `WeakMap`, since it's
not being referenced anywhere else, it gets removed from memory thanks to garbage
collection.

But, really, how often do you need to worry about garbage collection when building
a web app? Probably not very often. So, at this point, you should just use `Map`
everywhere: it's easier and has more features.

And that's true! Except for one special, fascinating, nerdy `WeakMap` use-case.
Let's learn about it!


[destructuring]: http://knpuniversity.com/screencast/javascript-es6/destructuring
