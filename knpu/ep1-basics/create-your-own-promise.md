# Making (and Keeping) a Promise

Ignore the error we're getting for a second and go down to the AJAX call. We know
that this method returns a`Promise`, and then we call `.then` on it. But, our handler
expects that the Promise's *value* will be the `RepLogData`. But now, it's null
because that's what the server is returning!

Somehow, I want to fix this method so that it *once again* returns a Promise whose
value is the `RepLog` data.

How? Well first, we're going to read the `Location` header that's sent back in
the response - which is the URL we can use to fetch that RepLog's data. We'll use
that to make a *second* AJAX call to get the data we need.

## Making the Second AJAX Call

Start simple: add another `.then` to this, with 3 arguments: `data`, `textStatus`
and `jqXHR`. Normally, promise handlers are only passed 1 argument, but in this
case jQuery cheats and passes us 3. To fetch the `Location` header, say
`console.log(jqXHR.responseHeader.location)`.

Go see if that works: we still get the errors, but hey! It prints `/reps/76`! Cool!
Let's make an AJAX call to that: copy the `jqXHR` line. Then, add our favorite
`$.ajax()` and set the URL to that header. Add a `.then` to *this* `Promise` with
a `data` argument. Finally, *this* should be the RepLog data.

To check things, add `console.log('now we are REALLY done')` and also `console.log(data)`
to make sure it looks right. Ok, refresh and fill out the form. Ignore the errors,
because there's our message and the *correct* data!

Ok, now we can just return this somehow, right? Wait, that's not going to work...
When we return the main `$.ajax()`, that `Promise` is resolved - meaning finished -
the moment that the *first* AJAX call is made. You can see that because the errors
from the handlers happen first, and *then* the second AJAX call finishes.

Somehow, we need to return a `Promise` that isn't resolved until that *second*
AJAX call finishes.

There are *two* ways to do this - we'll do the harder way... because it's a lot
more interesting - but I'll mention the other way at the end.

## Could we use a Promise?

What we need to do is create our *own* `Promise` object, and take control of exactly
when it's resolved and what value is passed back.

If you look at the `Promise` documentation, you'll find an example of how to do
this: `new Promise()` with one argument: a function that has `resolve` and `reject`
arguments. I know, it looks funny at first.

Inside of that function, you'll do your asynchronous code. As soon as that's done,
call the `resolve` function and pass it whatever *value* should be passed to the
handlers. If something goes wrong, call the `reject` function. This is effectively
what jQuery is doing right now inside of its `$.ajax` function.

## Browser Compatability!? Polyfill

There's one quick gotcha: not *all* browsers support the `Promise` object. But,
no worries! Google for "JavaScript Promise polyfill cdn".

A polyfill is a library that gives you functionality that's normally only available
in a newer version of your language, JavaScript in this case. PHP also has polyfills:
small PHP libraries that backport newer PHP functionality.

This polyfill guarantees that the `Promise` object exists in JavaScript. If it's
already supported by the browser it uses that. But if *not*, it adds it.

Copy the `es6-promise.auto.min.js` path. In the next tutorial, we'll talk *all*
about what that es6 part means. Then, go into `app/Resources/views/base.html.twig`
and add a `script` tag with `src=""` and this path. Now our `Promise` object is
guaranteed!

# Creating a Promise

In `_saveRepLog`, create and return a `new Promise`, passing it the 1 argument
it needs: a function with `resolve` and `reject` arguments. Move *all* of our AJAX
code inside.

Now, all we need to do is call `resolve()` when our asynchronous work is *finally*
resolved. This happens after the *second* AJAX call. Great! Just call `resolve()`
and pass it `data`. Once again, the `RepLog` data should be passed to the success
handlers!

Go back now and refresh. Watch the total at the bottom: lift the big fat cat 10
times and... boom! The new row was added *and* the total was updated. It worked!

This is huge.! Our `_saveRepLog` function *previously* returned a `jqXHR` object,
which implements the `Promise` interface. Now, we've changed that to a *real* `Promise`,
and our code that calls this function didn't need to change at all. The `.then()`
and `.catch()` work exactly like before. Ultimately, before *and* after this change,
`_saveRepLog` returned a promise whose value was the `RepLog` data.

## Handling the Reject

Of course, we also need to the `reject`, which should happen if the original AJAX
call has a validation error. If you fill out the form blank now, we can see the 400
error, but it doesn't call our `.catch` handler.

No problem: after `.then`, add a `.catch` to handle the AJAX failure. Inside that,
call `reject()` and pass it `jqXHR`: the value that our other `.catch` expects.

We *could* also add a `.catch` to the second AJAX call, but this should never fail
under normal circumstances, so I think that's overkill.

Refresh again! And try the form blank. Perfect! But, we can get a *little* bit fancier.
