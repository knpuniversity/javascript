# Arrow Functions

You will see the *first* big feature or ES2015 used *everywhere*... and at first,
it looks *weird*. Very simply, there is a new, shorter syntax for creating anonymous
functions.

For example, in our `.then()`, we have an anonymous function:

[[[ code('7e81c42327') ]]]

In ES2015, we can remove the word `function`, and add an "equal arrow" (`=>`) after
the arguments:

[[[ code('a2c97f8e56') ]]]

That's it! That will do the exact same thing as before. Well, PhpStorm is *really*
angry about this, but ignore it for a second. Let's try it! This `loadRepLogs()`
function is called on page-load to populate the table. Refresh!

It works: no errors.

## Make PhpStorm Less Angry

But, apparently PhpStorm hates the arrow function! That's because it's setup to
only recognize *old*, ES5 JavaScript.

Go into your settings and search for ES6. Under "Languages & Frameworks", "JavaScript",
you can choose what version it should use. Let's go with "ECMAScript 6". Hit ok...
and once it's done indexing... ding! It's happy! And I'm happy too!

If you see a bubble about a "File Watcher to transpile using Babel", ignore that!
But, we will talk about that "Babel" thing later, it's more than just a cool-sounding
word. Babel.

## Different Arrow Syntaxes

So the arrow syntax is nothing Earth-shattering. But it's used a lot, so you need
to train your eyes to recognize that it's just an anonymous function.

And sometimes, it can look a bit different. For example, the parentheses around
the arguments? Totally optional! Without them, everything still works:

[[[ code('e5652b11b1') ]]]

*I* like the parentheses: I feel like it gives my arrow functions a bit more structure.
But other code might not have them.

## The Arrow Function's (Secret) Superpower (this)

Now if this were *all* the arrow function did, I would be pretty disappointed. After
all, did we *really* need a new syntax, *just* to save us from typing the word function?
Well don't worry, because the arrow function has one, very amazing super power.

To show it off, inside of the anonymous function, `console.log(this, self)`:

[[[ code('403bfd8bc6') ]]]

We know that inside of an anonymous function, `this` always changes to be something
different. And that's why we added the `self` variable: it allows us to refer to
our `RepLogApp` object from inside the callback.

Ok, find your browser and refresh! Woh, check this out: `this` *appears* to be our
`RepLogApp` object! Yea, `this` and `self` are the same thing! What!?

It turns out, a classic anonymous function and the new arrow function *do* have
one difference: when you use an arrow function, the `this` variable is *preserved*.
That's *awesome* news, and it's why I now use the arrow function everywhere in my
code.

We can finally remove this silly `var = self` thing. And instead, below, use `this`.
But because we're inside of *another* anonymous function, replace it with the new
arrow syntax to get things work:

[[[ code('e522a43dc4') ]]]

Try that out! It still works!

## Arrow Functions Everywhere!

Let's use the arrow syntax everywhere! Below, when we use SweetAlert, remove the
`self` variable and - in `preConfirm` - use `()` for empty arguments, then add the
arrow. Inside, we can use `this`! Use the arrow function again below:

[[[ code('9398515e33') ]]]

Here, we're not using `this`, but I like to stay consistent and use the arrow
function *everywhere*.

Keep going! Inside the next method, remove `self`, and add our arrow function:

[[[ code('10767ab75b') ]]]

Do the same for `fadeOut()`. But here, we *were* using `this`, which previously pointed
to the DOM Element object that was fading out. We can't use `this` anymore, but that's
fine! Replace it with `$row.remove()` and then `this.updateTotalWeight()`:

[[[ code('42cc6002eb') ]]]

Double-check that things work. Refresh! Delete one of the items and... perfect!

Since we're going to use arrow functions for *all* anonymous functions, search for
`function()`. Yep, we're going to replace *everything*, except for the methods
in our objects. Remove `function()`, and add the arrow:

[[[ code('3dbb5f2d9d') ]]]

Repeat it again, and remove *another* `self` variable: just use `this`:

[[[ code('b3c85a24ec') ]]]

I'll fast-forward through the rest of the changes.

## Looping without Using this

If you were watching *really* closely, you may have noticed a problem. Before,
inside the `$.each()` callback, `this` was the element that we were iterating over
at that exact time:

[[[ code('5c67414da5') ]]]

But now that we're using the arrow function, obviously, that won't work. No worries!
Just give your arrow function two arguments: `index` and `element`. Use `element`
instead of `this`:

[[[ code('29cdc157d2') ]]]

If we search for `.each()`, there is one other spot with the same problem. Same solution:
add `index, element` and use `element` inside:

[[[ code('b684a36596') ]]]

## Arrow Function without a Body

Now that we're using the arrow function everywhere, there's *one* more variation
that you'll see. Scroll back up and find the `preConfirm` option on SweetAlert:

[[[ code('7d657705df') ]]]

In this case, the arrow function is nothing more than a single `return` statement.
In this situation, to be extra fancy, you can *remove* the function body and return
statement entirely:

[[[ code('629fb82e34') ]]]

When you don't have the curly braces, it means that this value will be returned.
It looks weird at first, but it *means* the same thing that we had before. You *will*
see this kind of stuff in code examples.

Phew! After making *all* these changes, let's refresh and try them. The list loads,
we can delete, and the form still validates. Bananas!

Next, I think we should write some Node.js!
