# The for of Loop

One of the *crazy* things about JavaScript... is that there's not *one* good way
to loop over a collection! In PHP, we have `foreach`, and it works perfectly. But
in JavaScript, you need to create an ugly custom `for` loop. Well actually, there
*is* a `.forEach()` function, but it *only* works on arrays, not other loopable
things, like the Set object we'll talk about later. And, with `.forEach()`, there is
no `break` if you want to exit the loop early.

That's why we've been using jQuery's `$.each()`. But guess what? ES2015 fixes this,
finally. Introducing, the `for of` loop!

It looks like this: `for (let repLog of data.items)`:

[[[ code('fb4bf6264e') ]]]

And it's pretty easy to follow: `repLog` is the new variable inside the loop, and `data.items`
is the thing we want to loop over. We're no longer passing this an anonymous function,
so we can get rid of everything else. That's it. Say hello to your new best friend:
the `for of` loop.

Let's look for the other `$.each()` spots and update those too! Instead, say
for `let fieldData of $form.serializeArray()`:

[[[ code('9fb34dec57') ]]]

Before, the anonymous function received a key and *then* the `fieldData`. But,
we didn't actually need the key: the `$.each()` function just forced us to add it.
Now, things are cleaner!

***TIP
Since we are in a `for` loop now, we need to also update the `return` statement to be `continue`.
***

Make this same change in two more places: for `$element of $form.find(':input')`.
Ah, don't forget your `let` or `var`:

[[[ code('1a47ed7580') ]]]

Then, one more below: for `let $element of $elements`:

[[[ code('1058c41a6e') ]]]

Oh, and PhpStorm is warning me because I forgot to remove one of my closing parentheses!
And, we don't need that semicolon! Yay!

So, use the `for of` loop for everything! Well actually, that's not 100% true. `for of`
is perfect when you want to loop over a collection of items. But, if you want to
loop over an *associative* array... or object, and you need to know the *key* for
each item, then you'll use `for in`.

***TIP
Actually, you *can* use `for of` with an object, with a clever combination of
`Object.entries()` and array destructuring!

```js
let pets = {
  beagle: 'Bark Twain',
  poodle: 'Snuffles'
};

for (let [petKey, petName] of Object.entries(pets)) {
  console.log(petKey, petName);
}
```

BUT, the `Object.entries()` method is still experimental, and *may* be
included in ES2017.
***

This is the one limitation of `for of`: it gives you the *value* of the
item you're looping over, but not its key, or index. In fact, if try to
use `for of` with an object, you'll get an error.
