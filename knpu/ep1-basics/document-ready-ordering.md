# (document).ready() & Ordering

When we use this `javascripts` block thing, it adds our new JavaScript right *after*
the main JavaScript in the base layout. View the HTML source and scroll to the bottom
see that in action. Yep, jQuery and *then* our JavaScript.

Cool! I added my JavaScript to the bottom of the page for performance: unless you
add an `async` attribute, when your browser sees a `script` tag, it stops, waits
while that file is downloaded, executes it, and *then* continues.

But not everyone agrees that putting JS in the footer is the best. After all, if
your page is *heavily* dependent on JS, your user might see a blank page for a second
before your JavaScript has the chance to be executed and put cool stuff there.

Ok, so there might be a performance difference between putting JavaScript in the
header versus the footer. But, or code should work either place, right? If I move
the block `javascripts` up into my header, this should *probably* still work? We
still have 3 script tags, just in a different spot.

Well, let's find out. Refresh! Then click delete. We broke it! What happened!

## Running JavaScript Before the DOM

This may or may not be obvious to you, but it's worth mentioning: our browser executes
JavaScript as soon as it sees it... which might be before some or all of the page has
actually rendered. Our code is looking for all elements with the `js-delete-rep-log`
class. Well, at this point, *none* of the HTML body has rendered yet, so it finds
exactly zero items.

This is the reason why you probably already always use the famous `$(document).ready()`
block. Move our code inside of it, and refresh again. Yes!

Very simply, jQuery calls your `$(document).ready()` function once the DOM has fully
loaded. But it's nothing fancy: it's approximately equal to putting your JavaScript
code at the absolute bottom of the page. It's just nice because it makes our code
portable: it'll work like we expect no matter *where* it lives.

For example, we could take the `script` tag, delete it from the layer, and actually
put it right in the middle of our page.

Now in the HTML, the external `script` tags are still on top, but our `JavaScript`
lives right, mack in the middle of the page. And when we refresh, it still works
fine.

## Thinking out JavaScript Ordering

Of course, the *only* problem with this is that if someone comes along and decides:

> Hey, you know what? We should really put our JavaScript in the footer!

Then we have a different problem. In the source, jQuery once again lives at the
absolute bottom. And when we refresh the page, error! Our browser immediately tells
us that `$` is not defined.

That's from *our* code in the middle of the page. And yea, it makes sense: as our
browser loads the page, it sees the `$`, but hasn't *yet* downloaded `jQuery`: that
script tag is still further down on the page.

So there are *two* things we need to worry about. First, any JavaScript that I depend
on needs to be included on the page before me. And actually, this will *stop* being
true when we talk about module loaders in a future tutorial.

Second, before I try to select any elements with jQuery, I better make sure the DOM
has loaded, which we can always guarantee with a `$(document).ready() block`.

Let's put our JavaScript back into the block so that it's always included *after*
jQuery, whether that's in the header of footer. Go back, refresh, and life is good
again.
