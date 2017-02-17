# Catching a Failed Promise

What about handling failures? As you can see in the `Promise` documentation, the
`.then()` function has an optional second argument: a function that will be called
on failure. In other words, we can go to the end of `.then()` and add a `function`.
We know that the *value* passed to jQuery failures is the `jqXHR`. Let's
`console.log('failed')` and also log `jqXHR.responseText`:

[[[ code('91a8bb920a') ]]]

Ok, refresh! Keep the form blank and submit. Ok cool! It *did* call our failure
handler and it *did* print the `responseText` correctly.

## Standardizing around .catch

The second way - and better way - to handle rejections, is to use the `.catch()`
function. Both approaches are identical, but this is easier for me to understand.
Instead of passing a second argument to `.then()`, close up that function and then
call `.catch()`:

[[[ code('766dee64fa') ]]]

This will do the *exact* same thing as before.

## Catch Recovers from Errors

But in both cases, something very weird happens: the second `.then()` success handler
is being called. Wait, what? So the first `.then()` is being skipped, which makes sense,
because the AJAX call failed. But after `.catch()`, the second `.then()` is being called.
Why?

Here's the deal: `catch` is named `catch` for a reason: you really need to think
about it in the same way as a `try-catch` block in PHP. It will catch the failed
`Promise` above and return a new `Promise` that resolves successfully. That means
that any handlers attached to it - like our second `.then()` - will execute as *if*
everything was fine.

We're going to talk more about this, but obviously, this is *probably* not what
we want. Instead, move the `.catch()` to the end:

[[[ code('dbea7e2337') ]]]

Now, the second `.then()` will only be executed if the first `.then()` is executed.
The `.catch()` will catch any failed Promises - or errors - at the bottom. More
on the error catching later.

Refresh now! Cool - *only* the `catch()` handler is running.

## Refactoring Away from success

Ok, with our new `Promise` powers, let's refactor our `success` and `error` callbacks
to modern and elegant, promises.

To do that, just copy our code from `success` into `.then()`:

[[[ code('3e53676faa') ]]]

I'm not worried about returning anything because we're not chaining our "then"s.
Remove the second `.then()` and move the `error` callback code into `.catch()`:

[[[ code('ceb248d217') ]]]

With any luck, that will work *exactly* like before. Yea! The error looks good.
And adding a new one works too.

Let's find our two other `$.ajax()` spots. Do the same thing there: Move the `success`
function to `.then()`, and move the other `success` also to `.then()`:

[[[ code('c20689799d') ]]]

Awesome!

## Why is this Awesome for me?

One of the *big* advantages of Promises over adding `success` or `error` options
is that you can refactor your asynchronous code into external functions. Let's try
it: create a new function called, `_saveRepLog` with a `data` argument:

[[[ code('8d916ec203') ]]]

Now, move our AJAX code here, and return it. Set the `data` key to `JSON.stringify(data)`.
And for the `url`, we can replace this with `Routing.generate('rep_log_new')`:

[[[ code('159ee7baf7') ]]]

In the controller, make sure to expose that route to JavaScript:

[[[ code('250a9c535d') ]]]

Here's the point: above, replace the AJAX call with simply `this._saveRepLog()` and
pass it `formData`:

[[[ code('f5bfa474c4') ]]]

Isolating asynchronous code like this wasn't possible before because, in *this*
function, we couldn't add any success or failure options to the AJAX call. But now,
since we know `_saveRepLog()` returns a `Promise`, and since we also know that
Promises have `.then()` and `.catch()` methods, we're super dangerous. If we ever
needed to save a RepLog from somewhere else in our code, we could call `_saveRepLog()`
to do that... and even attach *new* handlers in that case.

Next, let's look at another mysterious behavior of `.catch()`.
