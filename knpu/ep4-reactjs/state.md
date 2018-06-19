# State: For Magic Updating Good Times

It turns out that a React component has *two* types of data: props, which we access
with `this.props` and something different called state. Understanding the difference
between props and state is, well, just about the most important thing in React.

## Props vs State

Once a component receives a prop, like, we pass `true` for the `withHeart` prop,
that prop is constant. A component never changes a prop: it's just a value that
it receives, *reads* and uses.

So, when you think of props, think of "data that doesn't change". We're going to
*slightly* complicate that later... but for now, think: props are data that we
never change, they're constant. Or, "immutable" to be more hipster.

The `withHeart` prop is a really good example: once our app renders, the heart will
be there or not be there. We don't need that to ever change based on some user
interaction or some data changing. It will *always* be there... or it will *always*
not be there.

But when you want to make things *interactive*, when you have data that needs to
*change* while your app is alive, well, then you need to store that data somewhere
else: state, which you can access with `this.state`.

So... *why* exactly is there this distinction between `props` that must be immutable
and `state`, which is allowed to change? We'll learn about that: it goes to the
core of React's architecture.

## Adding highlightRowId State

But first, let's do some coding and add our first user interactivity! Here's
the goal: when the user clicks a row in the table, I want to highlight that row.

From a data standpoint, this means that, somewhere in our `RepLogApp` component,
we need to keep track of *which* of these rep log rows is currently highlighted.
We can do that by keeping track of the highlighted row id. Literally, we could
store that row 1, 2 or 8 is highlighted.

But because this data will *change* throughout the lifecycle of our app, we're
not going to store the id in `props`. Nope, we're going to store it as `state`.

Once you've decide that you have some data that needs to be stored as state,
you need to initialize that value on your state. That's always done the same way:
by overriding the `constructor()` function. The constructor of React components
receive a `props` argument. And then, you're supposed to call `super(props)` to
execute the parent constructor. You'll see this pattern over and over again.

To set the initial `state`, just set the property directly: `this.state` equals
an object, with, how about, a `highlightedRowId` key set to null. Nothing will
be highlighed at first.

## Using State in render()

Cool! Down in render, we can use this data *just* like we do with props. But, let's
use object destructuring to get this value as a variable:
`const { highlightedRowId } = this.state`.

This is another common React pattern. Instead of referring to
`this.state.highlightedRowId` down below, we use destructuring so that we can
be lazier later and use the shorter variable name.

I'll break the `tr` onto multiple lines. *If* this row should be highlighted,
we'll give it a special class: add `className={}` and use the ternary syntax:
if `highlightedRowId === ` *this* repLog's id, then add an `info` class. Otherwise,
print no class. This `info` class already exists in the CSS of our app.

Cool! If we try it now, we, of course, don't expect anything to be highlighted:
we initialized the state to `null`. And, yep! It works... probably: none of the
rows have the class.

## React Developer Tools

One of the most *awesome* things about developing with React is a tool called the
"React Developer Tools". It's an extension for Chrome or Firefox, so you can install
it from the Chrome Web Store or from Firefox Add-Ons.

After installing it, your browser's developer tools will have a new React tab!
Ooooooo. Check this out: it shows your entire component and element hierarchy.
*And*, you can click to see all the different props for every part.

Click on the `RepLogApp` component on top. Woh! It shows us the `withHeart` prop
and the `highlightedRowId` state! *And*, we can mess with it! Remember: the rep
log ids are 1, 2 and 8. Change `highlightedRowId` to 2. Boom! That row instantly
updates to have the class! Change it to 1... and 8. Super fun!

## How React Re-Renders Things

This looks like magic... but really, it's just that React is really, really smart.
Behind the scenes, whenever some "state" changes on a React component, React automatically
re-executes the `render()` method on that component. So, if we change this number
from 8 back to 2, it calls the `render()` method again and *we* return the new
React element objects.

Because of this, you *might* think that *all* of this HTML is completely replaced
each time we re-render. But actually, dang, nope! React is, yet again, too smart
for that. Instead of replacing everything, React *compares* the React element objects
from *before* the re-render to the *new* element objects after. Yep, it performs
a "diff" to see what changed. And then, it only updates the parts of the DOM that
*need* to change.

We can actually *watch* this happen! Open the table but collapse the rows so we can
see them all. Then, I'll re-select the `RepLogApp` component and scroll back down.
Watch closely when we change the state: from 2 to 1. Did you see it highlight the
two class attributes that changed in yellow? Watch again: 1 to 8.

That yellow highlight is my browser's way of telling us that these two attributes
were *literally* the *only* thing that changed. In React, we re-render all of the
elements. But in the DOM, React only updates the things it needs to.

The big takeaway is this: `state` is allowed to change. And each time it *does*,
React calls `render()` on our component and updates the DOM as needed.

## But... who Updates State?

Of course, our ultimate goal is *not* just to update state via the cool React dev
tools. Nope, we want to update the state when the user clicks a row.

Before we do that, there is *one* small housekeeping item. In addition to
destructuring state, I like to do the same with props. Add
`const { withHeart } = this.props`. Then below, use if `withHeart`.

It's a small detail, but it's nice to setup *all* the variables right on top.

Now, let's add some click magic and update our state!
