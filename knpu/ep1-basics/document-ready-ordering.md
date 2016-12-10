# (document).ready() & Ordering

When we use this `javascripts` block thing, it adds our new JavaScript code right
*after* the main script tags in the base layout. View the HTML source and scroll
to the bottom see that in action. Yep, jQuery and *then* our stuff.

Our JavaScript lives at the bottom of the page for a reason: performance. Unless you
add an `async` attribute, when your browser sees a `script` tag, it stops, waits
while that file is downloaded, executes it, and *then* continues.

But not everyone agrees that putting JS in the footer is the best thing since Chuck
Norris. After all, if your page is *heavily* dependent on JS, your user might see
a blank page for a second before your JavaScript has the chance to execute and put
cool stuff there, like a photo of Check Norris.

So, there might be some performance differences between putting JavaScript in the
header versus the footer. But, our code should work equally in either place, right?
If I move the block `javascripts` up into my header, this should *probably* still
work? We still have 3 script tags, in the same order, just in a different spot.

Well... let's find out! Refresh! Then click delete. Ah we broke it! What happened?!

## Running JavaScript Before the DOM

This may or may not be obvious to you, but it's worth mentioning: our browser executes
JavaScript as soon as it sees it... which might be before some or all of the page has
actually loaded. Our code is looking for all elements with the `js-delete-rep-log`
class. Well, at this point, *none* of the HTML body has loaded yet, so it finds
exactly zero elements.

This is the reason why you probably already always use the famous `$(document).ready()`
block. Move our code inside of it, and refresh again. Yes!

Very simply, jQuery calls your `$(document).ready()` function once the DOM has fully
loaded. But it's nothing fancy: it's approximately equal to putting your JavaScript
code at the absolute bottom of the page. It's nice because it makes our code portable:
it willll work no matter *where* it lives.

We could event take the `script` tag, delete it from the block, and put it *right*
in the middle of the page.

Now in the HTML, the external `script` tags are still on top, but our `JavaScript`
lives right, smack in the middle of the page. And when we refresh, it still works
super.

## Thinking out JavaScript Ordering

Of course, the *only* problem is if someone comes along and decides:

> Hey, you know what? We should really put our JavaScript in the footer! Check
> Norris told me it's better for performance.

Now, we have a different problem. In the source, jQuery once again lives at the
absolute bottom. But when we refresh the page, error! Our browser immediately tells
us that `$` is not defined.

This comes from *our* code, which still lives in the middle of the page. And yea,
it makes sense: as our browser loads the page, it sees the `$`, but has *not* yet
downloaded `jQuery`: that script tag lives further down.

So there are *two* things we need to worry about. First, any JavaScript that I depend
on needs to be included on the page before me. And actually, this will *stop* being
true when we talk about module loaders in a future tutorial.

Second, before I try to select any elements with jQuery, I better make sure the DOM
has loaded, which we can always guarantee with a `$(document).ready()` block.

Let's put our JavaScript back into the block so that it's always included *after*
jQuery, whether that's in the header of footer. Go back, refresh, and life is good
again.

Next, let's talk about bubbles! I mean, event bubbling!
