# The Event Argument & stopPropagation

Back to our mission: when I click a delete link, it works... but I *hate* that it
puts this annoying `#` sign in my URL and scrolls me up to the top of the page. You
guys have probably seen and fixed that a million times. The easiest way to fix it
is to find your listener function and - at the bottom - return `false`.

Go back, remove that pound sign, refresh, and click! Haha! No more pound sign!

But woh, check this out: We're also not getting the "row clicked" text anymore. If
I click *just* the row, I get it, but if I click the delete icon, it only triggers
the event on *that* element. What the heck just happened?

## The Event (e) Listener Argument

First, whenever a listener function is called, your browser passes it an *event*
argument, commonly just called `e`. This `e` variable is *packed* with information
and a few functions. The most important is `e.preventDefault()`. Another is
`e.stopPropagation()`. It turns out that when you return `false` from a listener
function, it is equivalent to calling `e.preventDefault()` and `e.stopPropagation()`.
To prove it, remove the `reutrn false` and refresh. Yep, we have the same behavior:
no `#` sign, but still now "row clicked" when we click the delete icon.

## e.preventDefault() versus e.stopPropagation()

The `e.preventDefault()` says: don't do the default, browser behavior for this event.
When you "click" a "link", normally your browser follows the `href`. So cool,
`e.preventDefault()` stops that! But `e.stopPropagation()` tells your browser to
*not* bubble this event any further up the DOM tree. And that's probably *not* what
you want. Do you really want your event listener to be so bold as to prevent *all*
other listeners from firing? I've literally *never* had this situation.

So get rid of that pesky `e.stopPropagation()` and refresh again. Ah, things are
back to normal!

You'll want to use `e.preventDefault()` in *most* cases, but not always. Sometimes,
like with a `keyup` event, if you prevent default, that'll actually prevent whatever
the user just typed from actually going into a text box, for example.

Next, let's talk a bit more about that magical event argument!
