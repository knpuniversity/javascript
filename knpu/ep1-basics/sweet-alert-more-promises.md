# SweetAlert: Killing it with Promises

For our last trick, Google for a library called [SweetAlert2](https://limonte.github.io/sweetalert2/).
Very simply, this library give us sweet alert boxes, like this. And you can customize
it in a lot of ways, like having a "Yes" and "Cancel" button.

We're going to use SweetAlert so that when we click the delete icon, an alert opens
so that the user can confirm the delete before we do it.

## SweetAlert: Basic Usage

To get this installed, go to the CDN. Copy the JavaScript file first. This time,
instead of putting this in our base layout, we'll add the JavaScript to *just* this
page: `index.html.twig`. Add the `<script src="">` and paste. This also comes with
a CSS file: copy that as well. Back in `index.html.twig`, override a block called
`stylesheets` and add the `endblock`. Call `parent()` to include the normal stylesheets,
and then add the link tag to this path.

Perfect!

This library exposes a global `swal` function. Copy the timer example - it's *somewhat*
similar to what we want. Then, open `RepLogApp.js`. Remember, whenever we reference
a global object, we like to pass it *into* our self-executing function. You don't
need to do this, but it's kind of hipster. Pass `swal` at the bottom and also `swal`
on top.

If you want some auto-completion on that library, you can of course select it and
hit `option+enter` or `alt+enter` to tell PhpStorm to download it.

Down on `handleRepLogDelete`, here's the plan. First, we'll open the alert. And
then, when the click "OK", we'll run all of the code below that actually deletes
the `RepLog`. To prepare for that, let's isolate all of that into its own new method:
`_deleteRepLog` with a `$link` argument.

This doesn't change anything: we could still just call this function directly from
above. But instead, paste the SweetAlert code and update the title - "Delete this log" -
and the text - "Did you not actually lift this". And remove the timer option. Instead,
add `showCancelButton: true`.

With *just* that, we should be able to refresh, and... oh! Error!

> swal is not defined

Of course, I need be more careful with my ordering. Right now, we still need to
manually make sure that we include the libraries in the correct order: including
SweetAlert first, so that it's available to `RepLogApp`. We're going to fix this
pesky problem in a future tutorial.

Ok, try it again. Thinks look happy. Now, click the little trash icon. Boom! We
have "OK" and "Cancel".

## Handling a SweetAlert Promise

When we call `swal()`, guess what it returns? A promise! A freaking Promise! We can
tell because the code has a `.then` chained to it, with two arguments. The first
argument is the function that's called on success, and the second is called when
the Promise is rejected. But, we already knew that.

Specifically, for SweetAlert, the success, or resolved handler is called if we click
"Okay", and the reject handler is called if we click "Cancel". So easy! Above the
`swal()` call, add `var self = this`. Then, inside the success handler, use
`self._deleteRepLog($link)`.

Down in the reject function, we don't need to do anything. Just call
`console.log('canceled')`.

Let's try it! Refresh, click the trash icon hit "Cancel". Yea, there's the log!
Now hit "OK". It deletes it! Guys, this is why understanding promises is *so* important.

And we *also* know that instead of passing two arguments to `.then`, we could instead
chain a `.catch()` onto this.

## Values Passed to the Promise?

And we also *also* know that both functions are passed a value, and what that value
is depends on the library. And an `arg` arg to `.catch` and log it. Ok, refresh,
hit delete and hit cancel. Oh, it's a string: "cancel". Try it again, but hit escape
this time to close the alert. Now it's `esc`. Interesting! If you search for "Promise"
on its docs, you'll find a spot called "Handling Dismissals". Ah, it basically says:

> When an alert is dismissed by the user, the reject function is passed one of these
> strings, documenting the reason it was dismissed.

That's pretty cool. And more importantly, it was easy for us to understand.

## Kung fu by Creating another Promise

Because we understand Promises, there's one other really cool thing we can do.
Search for `preConfirm`. If you pass a `preConfirm` option, then after the user
clicks "Ok", but before SweetAlert closes, it will call your function. You can do
anything inside... but if what you need to do is asynchronous, like an AJAX call,
then you need to do return a Promise. This will tell SweetAlert when your work is
done so that it knows when it's ok to close the alert.

Let's try it! First, add a `showLoaderOnConfirm` option set to `true`: that will
show a little loading icon after the user clicks "OK". Then, add the `preConfirm`
option set to a function. Inside, return a `new Promise` with the familiar `resolve`
and `reject` arguments.

Just to fake it, let's pretend we need to do some work before we can actually
delete the `RepLog`, and that work will take about a second. Use `setTimeout()`
to fake this: pass that a function and set it to wait for one second. After the
second, we'll call `resolve()`.

Try it! Refresh and click delete. After I hit ok, you should see a loading icon
for one second, before the alert finally closes. Do it! There it was! Viva promises!

More realistically, sometimes - instead of doing my work after the alert closes,
I like to do my work, my AJAX call, inside of `preConfirm`. After all, SweetAlert
shows the user a pretty fancy loading icon when they're waiting. Let's do that
here - it's *super* easy!

Move the `self._deleteRepLog()` call up into the `preConfirm` function and return
it. Then get of the `.then` entirely. This is *totally* legal, as long as the `_deleteRepLog`
function returns a Promise. In other words, as long as we *return* `$.ajax`, SweetAlert
will be happy.

We can still keep the catch here, because if you hit cancel, that will still reject
the promise and call `.catch`. Head back and refresh, and click delete. You should
see the loading icon for *just* a moment, while our AJAX call finishes. Hit "Ok"!
Beautiful!

## Cleanup My Mistakes

Oh, and by the way, if you noticed that I was still using `.done()` in a few places,
that was an accident! Let's change this to `.then`, and do the same thing in `loadRepLogs`.
Now we're using the *true* Promise functions, not the `.done()` that only lives
in jQuery.

Woh, we're done! I hope you guys *thoroughly* enjoyed this weird dive into some
of the neglected parts of JavaScript! In the next tutorial in this series, we're
going to talk about ES6, the *newest* version of JavaScript, which has a lot of
new features and new syntaxes that you probably haven't seen yet. But, they're *critical*
to writing modern JavaScript.

All right guys, see you next time.
