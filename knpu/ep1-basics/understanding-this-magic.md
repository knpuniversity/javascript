# Getting to the bottom of the this Variable

In PHP, when we call a function like `updateTotalWeightLifted()`:

[[[ code('542bd486ae') ]]]

We expect the `this` variable inside of that function to be whatever object we're
inside of right now. In that case, it is. But in so many other cases, `this`
is something different! Like inside `handleRowClick` and `handleRepLogDelete`:

[[[ code('361a3c2136') ]]]

What's going on? And more importantly, how can we fix it? When I'm inside a method
in an object, I want `this` to act normal: I want it to point to my *object*.

## How do I Know what this Is?

Here's the deal: when you call a function in JavaScript, you can *choose* to change
what `this` is inside of that function when you call it. That means you could have
one function and 10 different people could call your function and decide to set
`this` to 10 different things.

Now, in reality, it's not that bad. But we *do* need to remember one rule of thumb:
whenever you have a callback function - meaning someone else is calling a function
after something happens - `this` will have changed. We've already seen this a lot:
in the `click` functions, inside of `.each()`, inside of `success` and even inside
of `$row.fadeOut()`:

[[[ code('4f8819723d') ]]]

So what *is* `this` inside of these functions? It depends on the situation, so you
need to read the docs for the `success` function, the `fadeOut()` function or the
`.each()` function to be sure. For `fadeOut()`, `this` ends up being the DOM Element
that just finished fading out. So, we can actually call `$(this).remove()`:

[[[ code('60434b9bee') ]]]

That's the same as before.

## Being a Magician with this!

Let's have a little fun with the weirdness of `this`. Create a new function - just
for debugging - called `whatIsThis` with a single argument, a `greeting`. Inside,
just `console.log()` `this` and our `greeting`:

[[[ code('06c0a60ac6') ]]]

Next, at the bottom of `initialize`, add `this.whatIsThis()` and pass it `hello`:

[[[ code('f82633607b') ]]]

Simple enough! And since we're calling this function directly - not as a callback -
I would expect `this` to *actually* be what we expect: our `RepLogApp` object. Let's
find out. Refresh! Expand the logged object. Yea, it's `RepLogApp`! Cool!

But now, let's get tricky! Create a new variable called `newThis` and set it to
an object with important stuff like `cat` set to `meow` and `dog` set to `woof`:

[[[ code('dc536abbc4') ]]]

To force `newThis` to be `this` inside our function, call the function *indirectly* with
`this.whatIsThis.call()` and pass it `newThis` and the greeting, `hello`:

[[[ code('7a0bb4888e') ]]]

Oh, and quick note: `this.whatIsThis` is, obviously, a function. But in JavaScript,
functions are actually *objects* themselves! And there are a number of different methods
that you can call on them, like `.call()`. The first argument to `call()` is the variable
that should be used for `this`, followed by any arguments that should be passed to
the function itself.

Refresh now and check this out! `this` is now our thoughtful cat, meow, dog, woof
object. That is what is happening behind the scenes with your callback functions.

Now that we understand the magic behind `this`, how can we fix it? How can we guarantee
that `this` is always our `RepLogApp` object when we're inside of it?
