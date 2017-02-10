# All About Promises!

Ok, let's talk promises: JavaScript promises. These are a *hugely* important concept
in modern JavaScript, and if you haven't seen them yet, you will soon.

We all know that in JavaScript, a lot of things can happen asynchronously. For example,
Ajax calls happen asynchronously and even fading out an element happens asynchronously:
we call the `fadeOut()` function, but it doesn't finish until later. This is *so*
common that JavaScript has created an interface to standardize how this is handled.
If you understand how it works, you will have a huge advantage.

## Hello Promise

Google for "JavaScript promise" and click into the [Mozilla.org article][promise].
To handle asynchronous operations, JavaScript has an object called a Promise. Yep,
it's literally an object in plain, normal JavaScript - there are no libraries being
used. There *are* some browser compatibility issues, especially with Internet Explorer...
like always... but it's easy to fix, and we'll talk about it later.

This article describes the two sides to a Promise. First, if *you* need to execute
some asynchronous code and then notify someone later, then *you* will *create*
a `Promise` object. That's basically what jQuery does internally when we tell it
to execute an AJAX call. This isn't very common to do in *our* code, but we'll see
an example later.

The second side is what *we* do all the time: this is when someone *else* is doing
the asynchronous work for us, and we need to do something when it finishes. We're
*already* doing stuff like this in at least 5 places in our code!

## Promises Versus $.ajax

Whenever something asynchronous happen, there are two possible outcomes: either
the asynchronous call finished successfully, or it failed. In Promise language, we
say that the Promise was fulfilled or the Promise was rejected.

Here's the basic idea: if something happens asynchronously - like an AJAX call -
that code should return a Promise object. If it does, we can call `.then()` on it,
and pass it the function that should be executed when the operation finishes successfully.

Now that we know that, Google for "jQuery Ajax" to find the [$.ajax() documentation][jquery_ajax].
Check this out: normally when we call `$.ajax()`, we don't think about what
this function *returns*. In fact, we're not assigning it to anything in our code.

But apparently, it returns something called a `jqXHR` object. Search for `jqXHR object`
on this page - you'll find a header that talks about it. First, it gives a bunch
of basic details about this object. Fine. But look below the code block:

> The jqXHR object implements the Promise interface, giving it all the properties,
> methods, and behavior of a Promise.

Woh! In other words, what we get back from `$.ajax()` is an object that has all the
functionality of a `Promise`! An easy, and mostly-accurate way of thinking about
this is: the `jqXHR` object is a sub-class of `Promise`.

Below, it shows you all of the different methods you can call on the `jqXHR` object.
You can call `.done()`, which is an alternative to the `success` option, or `.fail()`
as an alternative to the `failure` option. AND, check this out, you can call `.then()`,
because `.then()` exists on the `Promise` object.

## Adding Promise Handlers

In practice, this means we can call `.done()` on our `$.ajax()`. It'll receive the
same `data` argument that's passed to `success`. Add a little `console.log('I am successful!')`.
Let's also `console.log(data)`:

[[[ code('673cfe23a8') ]]]

And guess what?  We can just chain *more* handlers off of this one: add another
`.done()` that looks the same. Print a message - `another handler` - and also
`console.log(data)` again:

[[[ code('6112677939') ]]]

## Using the Standard: *only* `.then()`

Effectively `$.ajax()` returns an object that has all the functionality of a
`Promise` *plus* a few additional methods. The only methods that a *true* `Promise`
has on it are `.then()` and `.catch()`, for when a promise is rejected, or fails. But
jQuery's object also has `.always()`, `.fail()`, `.done()` and others that you can
see inside what they call their "deferred object".

The story here is that jQuery implemented this functionality *before* the `Promise`
object was a standard. You could use any of these methods, but instead, I want to
focus on treating what we get back from jQuery as a *pure* `Promise` object. I want
to pretend that these other methods don't exist, and only rely on `.then()` and `.catch()`:

[[[ code('576e9a6057') ]]]

In other words, I'm saying:

> Don't rely on `.done()`, just use `.then()`, which is the method you would
> use with *any* other library that implements Promises.

## Modifying the Value in .then

Ok, go back and refresh now. When we submit, both handlers are still called. But
woh! Check this out: our first data prints out correctly... but the second one is
undefined?

If you look back at the `Promise` documentation, this makes sense. It says:

> `.then()` appends a fulfillment handler on the `Promise` and returns a *new*
> `Promise` resolving to the return value of the called handler.

Ah, so when we add the second `.then()`, that's not being attached to the *original*
`Promise`, that's being attached to a new `Promise` that's returned from the first
`.then()`. And according to the rules, the *value* for that new `Promise` is equal
to whatever we return from the first.

Ok, so let's prove that's the case: `return data`:

[[[ code('a1ca0262ed') ]]]

Back in the browser, it works! Both handlers are passed the same `data`.

But what about handling failures? Oh, that's pretty crazy.


[promise]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise
[jquery_ajax]: http://api.jquery.com/jquery.ajax/
