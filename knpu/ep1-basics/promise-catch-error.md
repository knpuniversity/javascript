# Promise catch: Catches Errors?

Yay! Let's complicate things!

Our AJAX call works really well, because when we make an AJAX call to create
a new `RepLog`, our server returns all the data for that new `RepLog`. That means
that when we call `.then()` on the AJAX promise, we have all the data we need to
call `_addRow()` and get that new row inserted!

[[[ code('40112da97b') ]]]

Too easy: so let's make it harder!

## Making our Endpoint Less Friendly

Pretend that we don't have full control over our API. And instead of returning the
`RepLog` data from the create endpoint - which is what this line does - it returns
an empty response:

[[[ code('28eff2724c') ]]]

Passing `null` means *no* response content, and 204 is just a different status code
used for empty responses - that part doesn't make any difference.

Now head over and fill out the form successfully. Whoa!

Yep, it blew up - that's not too surprising: we get an error that says:

> `totalWeightLifted` is not defined.

And if you look closely, that's coming from `underscore.js`. This is almost definitely
an error in our template. We pass the response data - which is now empty - into `._addRow()`:

[[[ code('112dfd6e62') ]]]

And that eventually becomes the variables for the template:

[[[ code('6fb5c249d0') ]]]

An empty response means that *no* variables are being passed. Hence, `totalWeightLifted`
is not defined.

But check this out: there's a *second* error:

> JSON Exception: unexpected token

## A catch Catches Errors

This is coming from `RepLogApp.js`, line 94. Woh, it's coming from inside our `.catch()`
handler:

[[[ code('c9bd86cffa') ]]]

Now, as we understand it, our `catch` should only be called when our `Promise` fails,
in other words, when we have an AJAX error. But in this case, the server returns a 204
status code - that is a *successful* status code. So why is our `catch` being called?

Here's the deal: in reality, `.catch()` will be called if your `Promise` is rejected,
*or* if a handler above it throws an error. Since our `.then()` calls `_addRow()`
and *that* throws an exception, this ultimately triggers the `.catch()`. Again, this
works *a lot* like the `try-catch` block in PHP!

***TIP
There are some subtle cases when throwing an exception inside asynchronous code
*won't* trigger your `.catch()`. The [Mozilla Promise Docs][gotchas_when_throwing_errors]
discuss this!
***

## Conditionally Handling in catch

So this complicates things a bit. Before, we assumed that the value passed to `.catch()`
would *always* be the `jqXHR` object: that's what `jQuery` passes when its Promise
is rejected. But now, we're realizing that it might *not* be that, because something
*else* might fail.

Let's `console.log(jqXHR)`:

[[[ code('7cb5ff43f3') ]]]

Ok, refresh and fill out our form. There it is! Thanks to the error, it logs a "ReferenceError".

We've just found out that `.catch()` will catch anything that went wrong... and that
the value passed to your handler will depend on *what* went wrong. This means that,
if you want, you can code for this: `if (jqXHR instanceof ReferenceError)`, then
`console.log('wow!')`:

[[[ code('6e2c9cb54a') ]]]

Let's see if that hits! Refresh, lift some laptops and, there it is!

What JavaScript *doesn't* have is the ability to do more intelligent try-catch
block, where you catch only *certain* types of errors. Instead, `.catch()` handles
*all* errors, but then, you can write *your* code to be a bit smarter.

Since we *really* only want to catch `jqXHR` errors, we could check to see if the
`jqXHR` value is what we're expecting. One way is to check if
`jqXHR.responseText === 'undefined'`. If this *is* undefined, this is not the error
we intended to handle. To *not* handle it, and make that error uncaught, just
`throw jqXHR`:

[[[ code('bcaeb6e406') ]]]

Now, if you wanted to, you could add another `.catch()` on the bottom, and inside its
function, log the `e` value:

[[[ code('3e90461fe6') ]]]

You see, because the first `catch` throws the error, the second one will catch it.

And when we try it now, the error prints *two* times - jQuery's Promise logs a
warning each time an error is thrown inside a Promise. And then at the bottom,
there's our log.

Let's remove the second `.catch()` *and* the `if` statement:

[[[ code('4a00d78a0e') ]]]

Why? Well, I'm not going to code defensively unless I'm coding against a situation
that might possibly happen. In this case, it was developer error: my code just isn't
written correctly for the server. Instead of trying to code around that, we just need
to fix things!

We do the same thing in PHP: most of the time, we let exceptions happen... because
it means we messed up!

Ok, we understand more about `.catch()`, but we still need to fix this whole situation!
To do that, we'll need to create our *own* Promise.


[gotchas_when_throwing_errors]: https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Promise/catch#Gotchas_when_throwing_errors
