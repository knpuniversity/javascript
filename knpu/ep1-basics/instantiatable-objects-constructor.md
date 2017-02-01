# Instantiatable Objects & Constructors

Ok ok, it's *finally* time to talk about the JavaScript elephant in the room:
*prototypical inheritance*. This means, *real* JavaScript objects that we can
*instantiate*!

But first, let's do just a *little* bit of reorganization on `Helper` - it'll make
our next step easier to understand.

Instead of putting all of my functions directly inside my object immediately, I'll
just say `var Helper = {}`:

[[[ code('cdfe338ef1') ]]]

*Then* set the `Helper.initialize` key to a function, and `Helper.calculateTotalWeight`
equal to its function:

[[[ code('31467327f6') ]]]

This didn't change anything: it's just a different way of putting keys onto an object.

## Everything is ~~Awesome~~ (an Object)!

Ok, in JavaScript, *everything* is an object, and this is quite different than PHP.
Obviously, `Helper` is an object. But we already saw earlier that functions are
*also* objects. This means when we say `this.handleRepLogDelete` - which references
a function - we can call some method on it called `bind()`.

Heck, even *strings* are objects: we'll see that in a moment. The only downside with
our `Helper` or `RepLogApp` objects so far is that they are effectively static.

## The Goal: Non-Static Objects

Why? Because, there can only ever be *one* `Helper` object. If I had *two* areas
on my page, and I wanted to calculate the total weight in each, we'd be in trouble!
If we called `initialize()` a second time for the second area, it would *override*
the original `$wrapper` property. It acts like a static object. And that's what we
need to fix: I want to be able to *instantiate* objects... just like we do in PHP
with the `new` keyword. This will let us create *two* Helper instances, each with
their *own* `$wrapper` property.

## Creating your Constructor

How do we do that? Instead of setting `Helper` to `{}`, set it to a function. Let's
set `Helper` to what *was* our `initialize()` method:

[[[ code('6491299eab') ]]]

Huh. So now, `Helper` is a *function*... But remember that functions are objects,
so it's *totally* valid to add properties or methods to it.

Why would set our object to a function? Because now we are allowed to say
`this.helper = new Helper($wrapper)`:

[[[ code('02691433ee') ]]]

JavaScript *does* have the new keyword just like PHP! And you can use it once `Helper`
is actually a function. This returns a new *instance* of `Helper`, which we set
on a property.

In PHP, when you say `new Helper()`, PHP calls the *constructor* on your object,
if you have one. The same happens here, the function *is* the constructor. At this
point, we could create *multiple* Helper instances, each with their *own*
`$wrapper`.

Now, instead of using `Helper` in a static kind of way, we use its instance:
`this.helper`:

[[[ code('8da5dd285b') ]]]

Before we keep celebrating, let's try this. Go back, refresh, and delete one of
our items! Huh, it worked... but the total didn't update. And, we have an error:

> Uncaught TypeError: this.helper.calculateTotalWeight is not a function

That's odd! Why does it think our Helper doesn't have that key? The answer is all
about the prototype.
