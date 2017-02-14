# Promise Chaining

Oh, but now we can get *even* cooler! The `.catch()` handler above reads the `responseText`
off of the `jqXHR` object and uses its error data:

[[[ code('d282a04f31') ]]]

If we want, we could simplify the code in the handler by doing that *before* we reject
our Promise.

## Controlling Resolved Values

Let me show you: copy the `errorData` line and move it down into the other `.catch()`.
Now, when we call `reject()`, pass it this:

[[[ code('f24341fe8f') ]]]

As soon as we do that, any `.catch()` handlers will be passed the nice, clean `errorData`:

[[[ code('03488e6a90') ]]]

We no longer need to worry about parsing the JSON.

Refresh! And submit the form. Yes! Now, if we ever need to call `_saveRepLog()` from
somewhere else, attaching a `.catch()` handler will be easier: we're passed the most
relevant error data.

Creating your own `Promise` objects is not that common, but it's super powerful,
giving you the ability to perform *multiple* asynchronous actions and allow other
functions to do something once they *all* finish.

## Returning a Promise from a Handler

Now, there *was* an easier way to do this. Sometimes, inside a handler - like `.then()`,
you'll want to make *another* asynchronous action:

[[[ code('ed11166d47') ]]]

That's exactly what's happening in `_saveRepLog()`. In this case, you can actually return
a `Promise` from your handler.

Here's a simpler version of how our code could have looked to solve this same problem.
Well, simpler at least in terms of the number of lines.

The first `$.ajax()` returns a `Promise`, and we immediately attach a `.then()` listener
to it. From inside of *that* `.then()`, we return *another* `Promise`. When you do
this, any *other* chained handlers will not be called until *that* `Promise`, meaning,
the second AJAX call, has completed.

Let me say it a different way. First, because we're chaining `.then()` onto the `$.ajax()`,
the return value of `_saveRepLog()` is actually whatever the `.then()` function returns.
And what is that? Both `.then()` and `.catch()` always return a *Promise* object.

And, up until now, the *value* used by the `Promise` returned by `.then()` or `.catch()`
would be whatever value the function inside returned. But! *If* that function returns
a *Promise*, then effectively, *that* `Promise` is what is ultimately returned
by `.then()` or `.catch()`.

***TIP
Technically, `.then()` should return a new `Promise` that mimics that `Promise`
returned by the function inside of it. But it's easier to imagine that
it directly returns the `Promise` that was returned inside of it.
***

That's a long way of saying that *other* chained listeners, will wait until that
internal `Promise` is resolved. In our example, it means that any `.then()` handlers
attached to `_saveRepLog()` will wait until the *inner* AJAX call is finished.
In fact, that's the whole point of Promises: to allow us to perform multiple asynchronous
actions by chaining a few `.then()` calls, instead of doing the old, ugly, nested
handler functions.

Phew! Ok! Let's move on to *one* last, real-world example of using a Promise: inside
an external library.
