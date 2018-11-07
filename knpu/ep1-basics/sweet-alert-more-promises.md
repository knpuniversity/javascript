# SweetAlert: Killing it with Promises

For our last trick, Google for a library called [SweetAlert2][sweetalert2].
Very simply, this library give us sweet alert boxes, like this. And you can customize
it in a lot of ways, like having a "Yes" and "Cancel" button.

We're going to use SweetAlert so that when we click the delete icon, an alert opens
so the user can confirm the delete before we actually do it.

## SweetAlert: Basic Usage

To get this installed, go to the CDN. Copy the JavaScript file first. This time,
instead of putting this in our base layout, we'll add the JavaScript to *just* this
page: `index.html.twig`. Add the `<script src="">` and paste:

[[[ code('d0da22e66b') ]]]

This also comes with a CSS file: copy that too. Back in `index.html.twig`, override
a block called `stylesheets` and add the `endblock`. Call `parent()` to include
the normal stylesheets, and then add the link tag with this path:

[[[ code('91fade0a23') ]]]

Perfect!

This library exposes a global `swal()` function. Copy the timer example - it's *somewhat*
similar to what we want. Then, open `RepLogApp.js`. Remember, whenever we reference
a global object, we like to pass it *into* our self-executing function. You don't
need to do this, but it's super hipster. Pass `swal` at the bottom and also `swal`
on top:

[[[ code('cc29d5811f') ]]]

If you want some auto-completion on that library, you can of course select it and
hit `option`+`enter` or `alt`+`enter` to tell PhpStorm to download it.

Down in `handleRepLogDelete`, here's the plan. First, we'll open the alert. And
then, when the user clicks "OK", we'll run all of the code below that actually deletes
the `RepLog`. To prepare for that, isolate all of that into its own new method:
`_deleteRepLog` with a `$link` argument:

[[[ code('6a2ff33925') ]]]

This doesn't change anything: we could still just call this function directly from
above. But instead, paste the SweetAlert code and update the title - "Delete this log" -
and the text - "Did you not actually lift this?". And remove the timer option. Instead,
add `showCancelButton: true`:

***SEEALSO
In version 7, when you click "Cancel", the reject handler is not called anymore. Instead, the success handler is called, but you can use the promise argument to check which button was clicked! See https://github.com/sweetalert2/sweetalert2/releases/tag/v7.0.0 for details!
***

[[[ code('445d7817d0') ]]]

With *just* that, we should be able to refresh, and... oh! Error!

> swal is not defined

Of course! I need be more careful with my ordering. Right now, we still need to
manually make sure that we include the libraries in the correct order: including
SweetAlert first, so that it's available to `RepLogApp`:

[[[ code('25692ae70f') ]]]

We're going to fix this pesky problem in a future tutorial.

Ok, try it again. Things look happy! Now, click the little trash icon. Boom! We
have "OK" and "Cancel".

## Handling a SweetAlert Promise

When we call `swal()`, guess what it returns? A promise! A freaking Promise! We can
tell because the code has a `.then` chained to it, with two arguments. The first
argument is the function that's called on success, and the second is called when
the Promise is rejected. But, we already knew that.

Specifically, for SweetAlert, the success, or resolved handler is called if we click
"OK", and the reject handler is called if we click "Cancel". Easy! Above the `swal()`
call, add `var self = this`. Then, inside the success handler, use `self._deleteRepLog($link)`:

[[[ code('9b1c7fd5a0') ]]]

Down in the reject function, we don't need to do anything. Just call `console.log('canceled')`:

[[[ code('dd9093504d') ]]]

Let's try it! Refresh, click the trash icon and hit "Cancel". Yea, there's the log!
Now hit "OK". It deletes it! Guys, this is why understanding promises is *so* important.

And we *also* know that instead of passing two arguments to `.then()`, we could instead
chain a `.catch()` onto this:

[[[ code('3bb3d0fee7') ]]]


[sweetalert2]: https://sweetalert2.github.io/
