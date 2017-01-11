# "Static" Objects & the this Variable

We just found out that, *somehow*, `this.$wrapper` is *not* our jQuery object,
it's undefined!

[[[ code('eca06bf261') ]]]

Rude! How is that even possible! The answer! Because JavaScript is weird, *especially*
when it comes to the crazy `this` variable!

## When this is not this

Here's the deal: whenever you are in a callback function, like the `success` callback
of an AJAX call, the callback of an event listener, or even when passing a callback
to the `setTimeout()` function, the `this` variable in your callback *changes* to be
something else. And we already knew that! We know that `this` in our event handler
is actually a reference to the DOM Element object that was clicked. So the `this`
variable in `handleRepLogDelete` is *not* our `RepLogApp` object, even though we're
*inside* of that object. Creepy!

We're going to talk a lot more about this situation... in a moment.

## Referencing your Object "Statically"

Fortunately, for now, the fix is easy. If you think about it, the `RepLogApp` object
is very similar to a class in PHP that has *only* static properties and methods.
I mean, could we create multiple `RepLogApp` objects? Nope! There can only ever be
one. And because of that, each property - like `$wrapper` - acts like a static property:
you set and access it, but it's attached to our "static", single object: `RepLogApp`,
not to an individual *instance* of `RepLogApp`. 

If this is hard to wrap your head around, don't worry! Coming from PHP, objects in
JavaScript are weird... and they'll get stranger before we're done. But, most things
you can do in PHP you can also do in JavaScript... it just looks different. The
stuff inside the object may not have some special `static` keyword on them, but this
is what static properties and methods look like in JavaScript.

And like static properties and methods in PHP, you can reference them by their class
name. Well, in JavaScript, that mean, by their object name - `RepLogApp`:

[[[ code('4ad7708c6a') ]]]

Ok, go back and refresh now. Hit delete. It *actually* works! Sorry, I shouldn't
sound so surprised!

## Refactoring to More Methods!

Since we're running out of items, let's add a few more!

Now that we have a fancy object, we can use it to get even *more* organized, by
breaking big functions into smaller ones.

For example, we could create a new function called, `updateTotalWeightLifted`:

[[[ code('a9ad191146') ]]]

Instead of figuring out the total weight lifted here and doing the update down
in the success callback:

[[[ code('c1a671c6b6') ]]]

We'll just call this method and have *it* do all that heavy lifting.

Add `var totalWeight = 0`:

[[[ code('0ff5205d72') ]]]

Then I'll say, `this.$wrapper`, which I can do because we're *not* in a callback
function: `this` is our object. Then, `.find` to look for all `tbody tr` elements,
and `.each()` to loop over them:

[[[ code('3e8d21d4de') ]]]

But stop! Notice that when you use `.each()`, you pass it a callback function! So
guess what? Inside, `this` is no longer our `RepLogApp` object, it's something different.
In this case, `this` is the individual `tr` DOM Element object that we're looping over
in this moment.

Inside, add up all the total weights with `totalWeight += $(this).data()` and read
the `data-weight` attribute:

[[[ code('9a9b52ad9a') ]]]

Finally use `this.$wrapper.find()` to look for our `js-total-weight` element and
set its HTML to `totalWeight`:

[[[ code('47c468cc56') ]]]

Cool!

Down in `handleRepLogDelete`, we don't need any of this logic anymore, nor this
logic. We just need to call our new function. The only gotcha is that the `fadeOut()`
function doesn't actually remove the row from the DOM, so our new weight-totaling
function would *still* count its weight.

Fix it by telling `fadeOut()` to use `normal` speed, pass it a function to be called
when it finishes fading, and then say `$row.remove()` to fully remove it from the DOM:

[[[ code('cf1d3f5f68') ]]]

*Now* we can call `updateTotalWeightLifted`.

But check this out: we're actually inside of *another* callback function, which is
inside of a callback function, inside of our entire function which is itself a callback!
So, `this` is *definitely* not our `RepLogApp` object.

No worries, play it safe and use `RepLogApp.updateTotalWeightLifted()` instead:

[[[ code('f2dada5aa6') ]]]

That's the equivalent in PHP of calling a static method by using its *class* name.

Ok, try it out! Refresh the page. We're at 765. Now delete a row... 657! Nice! Let's
finally figure out what's *really* going on with the `this` variable... *and* how
to make it act better!
