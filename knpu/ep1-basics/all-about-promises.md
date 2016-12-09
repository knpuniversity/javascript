# All About Promises!

Ever heard of a JavaScript promise? It's a *hugely* important concept in modern
JavaScript - if you haven't seen it yet, you will soon.

We all know that in JavaScript, a lot of things can happen asynchronously. For example,
Ajax calls happen asynchronously and even fading out en element happens asynchronously:
we call the `fadeOut()` function, but it doesn't finish until later. This is *so*
common that JavaScript has created an interface to standardize how this is handled.
If you understand how it works, well, you'll have a huge advantage.

## Hello Promise

Google for "JavaScript promise" and click into the [Mozilla.org article](https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise).
To handle asynchronous operations, JavaScript has an object called a Promise. Yep,
it's literally in plain, normal JavaScript - there are no libraries being used.
There *are* some browser compatibility issues, especially with Internet Explorer,
but it's easy to fix, and we'll talk about it later.

This article talks about the two different situations where you might use a Promise.
The first situation is if *you* are the one executing code asynchronously and want
to allow others to do something when you're done. That's not very common, but we'll
see an example later.

The second situation is when someone *else* is doing something asynchronously - like
an AJAX call - and *you* want to do something when it finishes. We're *already*
doing stuff like this in at least 5 places in our code!

## Promises Versus $.ajax

Whenever something asynchronous happen, there are two possible outcomes: either
the asynchronous finished successfully, or it failed. In Promise language, we say
that the Promise was fulfilled or the promise was rejected.

Look at the code block, but ignore the creation of the Promise - that's the part
we normally don't need to worry about. Here's the basic idea: if something happens
asynchronously - like an AJAX call - that code should return a Promise object. If
it does, we can call `.then()` on it, and pass it the function that should be executed
when the operation finishes successfully.

Now that we know that, Google for "jQuery Ajax" to find the
[$.ajax documentation](http://api.jquery.com/jquery.ajax/). Check this out: normally
when we call `$.ajax`, we don't think about what this function *returns*. In fact,
we're not assigning it to anything in our code.

But apparently, it returns something called a `jqXHR` object. Search for `jqXHR object`
on this page - you'll find a header that talks about it. First, it gives a bunch
of basic details about this object. Fine. But look down below code block:

> The jqXHR object implements the Promise interface, giving it all the properties,
> methods, and behavior of a Promise.

Woh! In other words, what we get back from `$.ajax` is an object that has all the
functionality of a `Promise`! An easy, and mostly-accurate way of thinking about
that is: the `jqXHR` object is a sub-class of `Promise`.

Below, it shows you all of the different methods you can call on the `jqXHR` object.
You can call `.done`, which is an alternative to the `success` option, or `.fail`
as an alternative to the `failure` option. AND, check this out, you can call `.then`,
because `then` exists on the `Promise` object.

## Adding Promise Handlers

In practice, this means we can call `.done()` on our `$.ajax()`. It'll receive the
same `data` argument that's passed to `success`. Add a little `console.log('I am successful!')`.
Let's also `console.log(data)`.

And guess what?  We can just chain *more* handlers off of this one: add another
`.done()` that looks the same. Print a message - `another handler` - and also
`console.log(data)` again.

## Using the Standard: *only* .then

Effectively `$.ajax()` returns an object that has all the functionality of a
`Promise` *plus* a few additional methods. The only methods that a *true* `Promise`
has on it are `then` and `catch`, for when a promise is rejected, or fails. But
jQuery's object also has `always`, `fail`, `done` and others that you can see inside
what they call their "deferred object".

The story here is that jQuery implemented this functionality *before* the `Promise`
object was standard in JavaScript. You could use any of these methods, but instead
I want to focus on treating what we get back from jQuery as a *pure* `Promise` object.
I want to pretend that these other methods don't exist and keep our code very standard.
That means using only `.then` and `.catch`. In other words, I'm saying:

> Don't rely on `.done`, just use `.then`, which is the method you would
> use with *any* other library that implements Promises.

## Modifying the Value in .then

Ok, go back and refrsh now. When we submit, both handlers are still called. Woh,
but check this out: our first data prints out correctly... but the second on is
undefined?

If you look back at the `Promise` documentation, this makes sense. It says:

> then appends a fulfillment handler on the `Promise` and returns a *new*
> `Promise` resolving to the return value of the recalled handler.

Ah, so when we add the second `.then`, that's not being attached to the *original*
`Promise`, that's being attached to the `Promise` that's returned from the first
`.then`. And according to the rules, the *value* for that `Promise` is equal to
whatever we return from the first.

Ok, so let's prove that's the case: `return data`. Back in the browser, it works!
Both handlers are passed the same `data`.

But what about handling failures? Oh, that's pretty crazy.
