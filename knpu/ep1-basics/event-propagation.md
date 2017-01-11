# The Event Argument & stopPropagation

Back to our mission: when I click a delete link, it works... but I *hate* that it
puts that annoying `#` in my URL and scrolls me up to the top of the page. You
guys have probably seen and fixed that a million times. The easiest way is by finding
your listener function and - at the bottom - returning `false`:

[[[ code('bdffeae398') ]]]

Go back, remove that pound sign, refresh, and click! Haha! Get outta here pound sign!

But woh, something else changed: we're also *not* getting the "row clicked" text
anymore. If I click *just* the row, I get it, but if I click the delete icon, it
only triggers the event on *that* element. What the heck just happened?

## The Event (e) Listener Argument

Back up a step. Whenever a listener function is called, your browser passes it an
*event* argument, commonly just named `e`:

[[[ code('d83ac8013c') ]]]

This `e` variable is *packed* with information and some functions. The most important
is `e.preventDefault()`:

[[[ code('6c1acb8c76') ]]]

Another is `e.stopPropagation()`:

[[[ code('201c4d6be6') ]]]

It turns out that when you return `false` from a listener function, it is equivalent
to calling `e.preventDefault()` *and* `e.stopPropagation()`. To prove it, remove
the `return false` and refresh:

[[[ code('e3c2436fae') ]]]

Yep, same behavior: no `#` sign, but still no "row clicked" when we click the delete icon.

## e.preventDefault() versus e.stopPropagation()

The `e.preventDefault()` says: don't do the default, browser behavior for this event.
Normally, when you "click" a "link", your browser navigates to its `href`... which
is a `#`. So cool, `e.preventDefault()` stops that! But `e.stopPropagation()` tells
your browser to *not* bubble this event any further up the DOM tree. And that's probably
*not* what you want. Do you really want your event listener to be *so* bold that
it decides to prevent *all* other listeners from firing? I've literally *never* 
had a use-case for this.

So get rid of that pesky `e.stopPropagation()` and refresh again:

[[[ code('223801c5e1') ]]]

And things are back to normal!

You should use `e.preventDefault()` in *most* cases, but not always. Sometimes,
like with a `keyup` event, if you call `preventDefault()`, that'll prevent whatever
the user just typed from actually going into the text box.

Now, what else can this magical event argument help us with?
