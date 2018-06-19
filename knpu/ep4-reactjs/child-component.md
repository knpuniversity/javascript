# Child Component

Our `RepLogApp` component is getting kinda big! I'm so proud! It's not only the
amount of HTML, but also its complexity. We're now handling an event, updating state
in a handler function *and*, below, this `repLogs` row stuff is pretty complex on
its own!

In PHP, if you're working on a class, sometimes that class can become so big or
so *complex* that, for your own sanity, you choose create a *new* class and move
some of that logic into it. Another reason you might create a new class is if you
want to make some of your logic re-usable.

Well, that exact idea is true in React: when a component becomes too big or too
complex & confusing, you can choose to move part of it into a *new* component.
This isn't some *ground-breaking* strategy: it just simple code organization!
And, in theory, you could re-use the new component in multiple places.

## Creating the RepLogList Component

Because the rep log table is already pretty complex, let's move that into its own
component first. In the `RepLog` directory, create a new file: how about, `RepLogList.js`.
Inside, every React component begins the same way: import `React` and `{ Component }`
from `react`. Then, `export default class RepLogList extends Component`. Add
the *one* required method: `render()`.

So... hmm...  I basically want to move my rep logs rows into that component. We
could move the whole table, or just the inside - don't over-think it. Let's copy
all of the `tbody`. Then, return, add parenthesis so we can use multiple lines
and, paste!

Cool! Of course, we're missing the `repLogs` variable! Right now, because that's
still hardcoded, let's just move that variable over into the `render()` method
of the new component.

But, we *do* still have one problem: `highlightedRowId`. Um, ignore that for a
minute. Back in `RepLogApp`, delete the `tbody`. At the top, this is cool:
`import RepLogList from './RepLogList'`. And because `RepLogList` is a component,
we can render it just like we did with `RepLogApp`: go into the middle of the
markup and add `<RepLogList />`.

## Leaving State at the Top Level (for now)

That's it! We have successfully broken our big component into a smaller piece. Well,
I guess we shouldn't celebrate *too* much, because, when we refresh, in the console,
yep! React is always trying to bring us down: the `highlightedRowId` variable is
not defined in `RepLogList`!

That makes perfect sense: our child component - `RepLogList` - needs to know this
value so that it can add the `info` class. But... hmm... we have a problem! The
`highlightedRowId` state lives in a different component: our top-level `RepLogApp`
component! So, how can access the state of our parent component?

Well, before I answer that, there is *technically* another option: we could just
move the `highlightedRowId` state into the `RepLogList` component. And, technically,
this would work! Look closely: `RepLogApp` isn't using that data anywhere else! So
if we moved the state, everything would work!

But... dor a reason I can't fully explain yet, I *don't* want you to do that. Nope,
I want you to leave *all* of your state in the top level component of your app.
That means, I want *all* of your child components to have zero state. Don't worry:
we'll talk a lot more about this strategy later.

## Passing Props down the Tree

But, because I'm being rude and *forcing* you to keep all of your state in
`RepLogApp`, the question becomes: how can we *pass* this `highlightedRowId` state
into `RepLogList`?

Guess what? We *already* know the answer! We *already* know how to pass data into
a component: *props*. We have the `highlightedRowId` variable that's coming from
state. Scroll down to `RepLogList` and add a new prop: `highlightedRowId={}` and
pass that variable. 

And *now* we can go back into `RepLogList` and use this in `render()`! At the top,
let's continue to destructure our props & state:
`const { highlightedRowId } = this.props`. And, just like earlier, *ignore* this
error about props validation: we'll talk about that soon.

Ok... we're done! Move back to your browser and, refresh! It works! And if you check
out the React dev tools, you can still see `RepLogApp` on top... but down here,
hey! There is the embedded `RepLogList`. Now, things get fun: click back on
`RepLogApp` and change the state to 2. This causes React to re-render that component.
Check out `RepLogList` again - yea! You can see that its prop automatically updated!

This highlights one really, really important detail: while you may have multiple
components that have *some* state, each *piece* of state like the `highlightedRowId` -
needs to live in exactly *one* component. What I mean is: you are *not* allowed
to have, for example, a `highlightedRowId` state in `RepLogApp` and also a
`highlightedRowId` state in `RepLogList`. Nope! That would *duplicate* that data.
Instead, each piece of state will live in just one component. And then, if a child
component needs that data, we'll pass it as a prop.

## Props are Immutable... but Change

We already know that whenever something updates the state of a component, React
automatically re-renders that component by calling `render()`. And actually,
the same is true for props. When the `highlightedRowId` state changes, this changes
that props of `RepLogList` and *that* causes it to *also* re-render. Which, is
*exactly* what we want!

But, earlier, I told you that props are immutable: that props can never be changed.
That's true, but it's maybe not the best way to explain it. In `RepLogApp`, when
the `highlightedRowId` state changes, we *will* pass a *new* value to `RepLogList`
for the `highlightedRowId` prop. But, here's the important part: once `RepLostList`
receives that prop, it never changes it. You will *never* change something on
`this.props`.

We're going to see this pattern over and over again: we hold state in one component,
change the state in that component and then pass that state to any child component
that needs it as a prop. And *now* we know that when that state changes, all the
child components that use it will automatically re-render.

But... our click handling code is now broken! Let's fix it!
