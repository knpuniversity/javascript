# Temporary Messages & componentWillUnmount

That success message is cool... but it should probably disappear after a few seconds.
No problem! We can use the native `setTimeout()` function to change the state *back*
to empty after a few seconds.

Go back to `RepLogApp`. Let's refactor things a bit first: create a new method
called `setSuccessMessage` with a message argument. Inside, set the state.

We're making this change so that we can re-use our cool success message feature
easily in multiple places. Above, instead of setting the `successMessage` in the
object, use `this.setSuccessMessage()` and paste the text there.

## Watch out for Multiple Re-Renders

But! There is a downside to this approach! *Every* time you change the state, React
re-renders out component. Thanks to this change, it's going to re-render once for
this state and then *again* right after. That is *probably* not something you need
to worry about. But, as your applications grow bigger and bigger and bigger, you
*should* be aware when you're triggering your app to re-render. This is *especially*
important because, when a component like `RepLogApp` re-renders, *all* of its children
are *also* re-rendered, even if the props being passed to them don't change. And
yes, there *are* ways to optimize this. But, for now, just be aware that re-rendering
can be costly for performance. Then later, there *are* ways to optimize.

## Clearing the Message with setTimeout()

Back in `setSuccessMessage()`, to clear the message, use `setTimeout()`, pass it
an arrow function, and use `this.setState()` to reset `successMessage` back to
empty quotes. Let's do that after 3 seconds.

Ok! Let's give this a try! Refresh and lift my big fat cat 5 times. Success! And...
gone!

## Clearing the Timeout

So easy! Except... yes... it was *too* easy. There's an edge case: if
`setSuccessMessage()` is called once, then called again 2 seconds later, the second
message will disappear after only 1 second! It's a minor detail, but we can code
this better.

Basically, *before* we call `setTimeout`, we want to make sure to *clear* any previous
timeout that may be waiting to fire. The `setTimeout()` function returns an integer,
which we can use to clear it. to keep track of that value, in the constructor,
initialize a new property: `this.successMessageTimeoutHandler = 0`.

This has *nothing* to do with React: we're just taking advantage of our object to
store some state. Oh, and the value 0 is just a "null" value in disguise: if we
pass this to `clearTimeout()`, nothing will happen.

Back down in `setSuccessMessage`, before `setTimeout`, add
`clearTimeout(this.successMessageTimeoutHandler)`. To set that property, add
`this.successMessageTimeoutHandler =` before `setTimeout()`.

And finally, to be *completely* on top of things, inside the callback, after we
reset the state, set the timeout handler back to 0.

## Cleaning up Your Component: componentWillUnmount()

And... we're done! Our message will always disappear a full 3 seconds after the
*last* success message has been set. Except... yea... there is *still* one teenie,
tiny problem... and *this* time, it's special to React.

Right now, `RepLogApp` will *always* be rendered on the page. But, that's not true
of React components in general. For example, we could choose to *only* render the
`RepLogCreator` component after clicking a button. Or, if you're using React Router
so that your user can navigate to different "pages", then even `RepLogApp` would
be rendered and unrendered as the user navigates.

Because of this, *if* your component is removed form the page, you need to ask
yourself:

> Is there anything I need to clean up?

The answer is usually... no! But, `setTimeout()` *would* cause a problem. Why?
Basically, if `setState()` is called on a component that is *not* rendered to the
page, React kinda freaks out. Thanks to `setTimeout()`, that could happen if the
component was removed right after setting a success message.

It's not a big deal, but let's clean this up. Scroll up to `componentDidMount()`
and add a new method: `componentWillUnmount()`.

This is another one of those magic lifecycle functions: `componentDidMount` is
called right after your component is rendered to the page. `componentWillUnmount`
is called right before it's *removed*. It's your chance to clean stuff up.

Let's do that: `clearTimeout(this.successMessageTimeoutHandler)`.

Honestly, this isn't that common. But, keep it in mind. Another example could be
if you used an external library to add some cool feature directly to a DOM element.
If you want to clean that up, this is the place to do it.
