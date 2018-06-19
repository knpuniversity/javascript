# The key Prop & Inline Rendering

We just rendered an array of React `<tr>` element objects. And as a thank you,
React has awarded us with a big ugly error! It says:

> Warning: each child in an array should have a unique "key" prop.

Rude! Here we are, with a *perfectly* functional table, and React is ruining our
magical moment. Well... ok, it's warning us for a good reason. And, PhpStorm was
*also* trying to help.

## Why a Collection needs a key

Here's the deal: soon, we're going to use React to perform automagical updates to
the UI when data changes. Eventually, we'll use this to add and remove rows to this
table as we create and delete rep logs! But... when you have a collection of items
like this, if we update the data on one of the rep logs, React isn't totally sure
which row to update in the DOM. For example, if this rep log's weight suddenly changed
to 150, it's possible that React would update the wrong row!

To help React, we need to give each row a unique key - kind of like how each row
in a database table has a primary key. To do this, go to the outer-element of each
item and literally add a `key` prop. This needs to be something that is unique *and*
won't change. So, basically, it should be the `id`.

Solved! This `key` prop isn't a big deal, it's just a chore you need to handle
each time you render a collection. But don't worry: if you forget, React will
remind you!

Try it now: head over and refresh! The page still works, and the warning is gone!

## Rendering Inline

There's one minor downside to this new setup. Up here, we use the `map` function
to create an array of `repLogElements`. Down below, we render that.

What's the problem? Well, just that, if you're looking at `render()` to see your
markup, when you see `{repLogElements}`, you need to scroll back up to see what
this is. Whenever possible, it's better to keep all of your markup in one place.

And, we *can* do that... by being a bit clever. Copy the `repLogs.map()` code, then
delete the `repLogElements` variable entirely. Back inside JSX, clear out the variable
and... paste!

That's it! It's really the *same* thing we had before! This loops over the
`repLogs` array, builds an array of "rep log" element objects, then... prints them!

Try it! Move over and, refresh! Yes!

At first, the syntax may look weird. But, it's now *very* obvious that inside the
`tbody`, we are printing a bunch of `tr` elements.

## Shorter Arrow Functions

And if this isn't fancy enough for you, well, you won't be disappointed. If you're
still getting used to how the arrow functions look, you may not love this next change.
But, if it's too weird, don't use it!

Because the arrow function is, um, a *function*, we usually surround the body of
the function with curly braces. But, if the only line in your function is the return
statement, you can *remove* the curly braces and just put the code for the return.
Oops, I have one extra curly brace.

We now have a function with one argument that *returns* this JSX element.

Move over and try it! Woohoo! It works! These are the types of little things
in React that you don't *need* to do. And, if it makes your head spin, keep it
simple. But, I want you to at least *know* about these tricks. Because, often, it's
*these* types of shortcuts that end up making React *look* hard.

Let's finish building the static version of our app next: by adding the form!
