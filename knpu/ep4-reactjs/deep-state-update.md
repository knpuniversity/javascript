# Updating Deep State Data

Oh man, I let a bug crawl into our app. When we delete a rep log, it goes away,
but, yuck, we get a big error:

> Unexpected end of JSON input

This comes from `rep_log_api.js`. We call `response.json()`... which works *great*
when the response is *actually* JSON. But, our delete endpoint returns *nothing*.

To fix this, we could create two different functions: one that decodes JSON and
one that doesn't. But, I'll just make our code a bit fancier so it doesn't explode.

Use `return response.text()`: this returns a Promise where the data is the raw response
content. Chain `.then` and use an arrow function with a `text` argument. Then,
if `text`, return `JSON.parse(text)`, else empty quotes.

Go over, refresh and... delete! Ok, much better.

## Success Message on Delete

We have this cool system now where we can lift our cat 26 times and see this
temporary success message. So, we might as well do the same thing for delete. And
this is easy! Inside of `RepLogApp`, down in `handleDeleteRepLog`, chain off the
delete: `.then()`, an arrow function, and `this.setSuccessMessage()`: Item was
Un-lifted.

Cool! Move back and try it! Success!

## "Ghosting" the Deleting Row

We *could* be satisfied with our loading & success message setup. But... if you
want... we can get even fancier. Right now, we delete the rep log state immediately,
but we don't show the success message until *after* the AJAX call finishes. If you
want that to feel more synchronized, we *could* move the `setState()` call so that
it fires once the rep log is *actually* deleted.

But, we're *trading* problems. Refresh again. When you click delete, there's a
slight pause before the user gets *any* feedback. I'll add a few more items to
the list real quick so we can keep playing with things.

Anyways, here's how we could improve this: when the user clicks delete, let's
immediately change the *opacity* on the row that's being deleted, as a sort of
"loading" indication.

Go into `RepLogList`: *this* is where we render the `tr` elements. So, imagine
if there were a field on each `repLog` called `isDeleting`. If there were, we
could say `style={}`, create an object, and set `opacity`: if `isDeleting` is
true, use .3 else 1.

*This* was easy. The interesting part of this problem is *how* we can add that
new `isDeleting` field. Well, it *looks* simple at first: at the top of
`handleDeleteRepoLog`, before we call `deleteRepLog()`, we want to set the state
of *one* of our rep logs to have `isDeleting: true`.

But... hmm... this is tricky. First, we need to find the *one* rep log by its id.
Then, we need to set this flag, but without *mutating* that object or the array
that it's inside of! Woh!

Here's the trick: use `this.setState()`, but pass it an arrow function with the
`prevState` arg. We're doing this because our new state will *depend* on the old
state. Return the new state we want to set, which is the `repLogs` key.

So, to *not* mutate the state, we basically want to create a *new* array, put all
the existing rep logs inside of it, and update the *one* rep logs... um... without
actually updating it. Sheesh.

This is another one of those moments where you can understand why React can be so
hard! But, the fix is easy, and it's an old friend of our's: map! Use.
`prevState.repLogs.map()` with a `repLog` argument to the arrow function.

The map function will return a *new* array, so that handles *part* of the problem.
Inside, if `repLog.id !== id` that's being deleted, just return `repLog`. And finally,
we need basically "clone" this last rep log and set the flag on the new object.
The way to do that is with return `Object.assign()` passing it an empty object,
`repLog`, then the fields to update: `isDeleting: true`.

This is a lot like an `array_merge` in PHP: the 3rd argument is merged on top of
the second, and then that's merged onto the first. The *key* is that strange first
argument: the empty object. Thanks to that, we're creating that *new* object,
and then all the data is merged onto *it*. The `repLog` is *not* modified.

Phew! But... awesome! We've now learned how to *add* to an array, remove from an
array, and even *change* something inside an array, *all* without mutating it.
If your state structure is deeper than a simple object inside an array, it's probably
too deep. In other words, you now know how to handle the most common, tough,
state-setting situations.

Let's temporarily add a return statement below this so we can *really* see if this
is working. Ok, move over and refresh! Hit delete: that looks awesome! Our update
worked perfectly.

Go back and remove the `return`.
