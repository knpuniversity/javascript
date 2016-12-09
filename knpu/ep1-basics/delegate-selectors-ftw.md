# Delegate Selectors FTW!

So dang. Every time we add something new, it adds a new row to the table, but deleting
it doesn't work until we refresh. What's going on here?

Well, let's think about it. In `RepLogApp`, the constructor function is called when
we instantiate it. So, inside `$(document).ready()`. That means it's executed after
the entire page has loaded.

Then, at *that* exact moment, our code finds all elements with a `js-delete-rep-log`
class in the HTML at that moment, and attaches the listener to each DOM Element.
So if we have 10 delete links on the page initially, it attaches this listener to
those 10 individual DOM Elements. If we add a new `js-delete-rep-log` element later,
there will be no listener attached to it. The problem is really simple. So, what
is the fix?

If you're like me, you may have fxied this in a really crappy way before. Whenever
I would add something dynamically to my page, I would manually try to attach any
missing listeners to it. SO error prone and annoying!

## Your New Best Friend: Delegate Selectors

But there's a much, much, much better way. AND, it comes with a fancy name: a
delegate selector. Here's the idea, instead of attaching the listener to DOM elements
that might be dynamically added to the page later, attach the listener to an element
that will *always* be on the page. In our case, we know that `this.$wrapper` will
always be on a page.

Here's how it looks: instead of saying `this.$wrapper.find()`, use `this.$wrapper.on`
to attach the listener to the rapper. Then, add an extra second argument, which is
the selector for the element that you truly want to react to.

That's it! This works *exactly* the same as before. It just says:

> Whenever a click event bubbles up to `$wrapper`, please check to see if any
> elements inside of it with a `js-delete-rep-log` were also clicked. If they were,
> fire this function! And have a great day!

You know what else! When it calls `handleRepLogDelete`, the `e.currentTarget` is
*still* the same as before: it will be the `js-delete-rep-log` link element. So
all our code still works.!

Ah, this is sweet! So let's use delegate selectors *everywhere*. Get rid of the
`.find` and add the selector as the second argument.

To make sure this isn't one big elaborate lie, head back and refresh! Add a new
rep log to the page... and delete it! It works! And we can also submit the form
again without refreshing!

So always use delegate selectors: they just make your life easy. And since we designed
our `RepLogApp` object around a `$wrapper` element, there was *no* work to get this
rocking.
