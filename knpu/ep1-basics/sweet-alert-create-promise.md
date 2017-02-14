# Sweet Alert: Create a Promise!

And we also *also* know that both functions are passed a value, and what that value
is depends on the library. Add an `arg` to `.catch()` and log it:

[[[ code('81047e36af') ]]]

Ok, refresh, hit delete and hit cancel. Oh, it's a string: "cancel". Try it again,
but hit escape this time to close the alert. Now it's `esc`. Interesting! If you
search for "Promise" on its docs, you'll find a spot called "Handling Dismissals".
Ah, it basically says:

> When an alert is dismissed by the user, the reject function is passed one of these
> strings, documenting the reason it was dismissed.

That's pretty cool. And more importantly, it was easy for us to understand.

## Kung fu by Creating another Promise

Because we understand Promises, there's one other really cool thing we can do.
Search for `preConfirm`. If you pass a `preConfirm` option, then after the user
clicks "Ok", but before SweetAlert closes, it will call your function. You can do
anything inside... but if what you want to do is asynchronous, like an AJAX call,
then you need to return a Promise from this function. This will tell SweetAlert when
your work is done so that it knows when it's ok to close the alert.

Let's try it! First, add a `showLoaderOnConfirm` option set to `true`:

[[[ code('885686589c') ]]]

That will show a little loading icon after the user clicks "OK". Next, add
the `preConfirm` option set to a function. Inside, return a `new Promise` with
the familiar `resolve` and `reject` arguments:

[[[ code('9eddbbfb15') ]]]

Just to fake it, let's pretend we need to do some work before we can actually
delete the `RepLog`, and that work will take about a second. Use `setTimeout()`
to fake this: pass that a function and set it to wait for one second. After the
second, we'll call `resolve()`:

[[[ code('b48619b4f2') ]]]

Try it! Refresh and click delete. After I hit ok, you should see a loading icon
for one second, before the alert finally closes. Do it! There it was! Viva promises!

More realistically, sometimes - instead of doing my work after the alert closes,
I like to do my work, my AJAX call, inside of `preConfirm`. After all, SweetAlert
shows the user a pretty fancy loading icon while they're waiting. Let's do that
here - it's *super* easy!

Move the `self._deleteRepLog()` call up into the `preConfirm` function and return
it. Then get rid of the `.then()` entirely:

[[[ code('ee4f6e6f09') ]]]

This is *totally* legal, as long as the `_deleteRepLog()` function returns a Promise.
In other words, as long as we *return* `$.ajax()`, SweetAlert will be happy:

[[[ code('0c7c55d968') ]]]

We can still keep the catch here, because if you hit cancel, that will still reject
the promise and call `.catch()`. Head back, refresh, and click delete. You should
see the loading icon for *just* a moment, while our AJAX call finishes. Hit "Ok"!
Beautiful!

## Cleanup My Mistakes

Oh, and by the way, if you noticed that I was still using `.done()` in a few places,
that was an accident! Let's change this to `.then()`, and do the same thing in `loadRepLogs`:

[[[ code('54891439f0') ]]]

Now we're using the *true* Promise functions, not the `.done()` function that only lives
in jQuery.

Woh, we're done! I hope you guys *thoroughly* enjoyed this weird dive into some
of the neglected parts of JavaScript! In the next tutorial in this series, we're
going to talk about ES6, a *new* version of JavaScript, which has a lot of
new features and new syntaxes that you probably haven't seen yet. But, they're
*critical* to writing modern JavaScript.

All right guys, see you next time.
