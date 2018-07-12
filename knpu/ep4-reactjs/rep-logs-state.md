# Moving the Rep Logs to State

Communication always flows *down* in React: data lives in one component and is passed
*down* to its children as props. Actually, both data *and* callbacks are passed
from parent to child: child components use callbacks to communicate back up to the
parent when something happens. For example, `RepLogs` passes an `onRowClick` to
`RepLogList`. It uses that to tell its parent when that interaction occurs.

So, parents pass data *to* their children. But, parents do *not*, *ask* children
for information. Well, it's technically possible, but it's not the normal flow.

For example, `RepLogApp` passes the `highlightedRowId` to `RepLogs`. But,
`RepLogApp` does *not* ever *ask* `RepLogs` to give it any data that lives inside
`RepLogs`. Information only flows down.

## Why state Lives up High

For that reason, in general, we need the `state` of our application to live as
*high* up the component hierarchy as possible. Why? Because we can pass a piece of
state *down* to all of the components that need to use it. When that state changes,
that change naturally flows down and everything updates beautifully.

But, imagine if a piece of state lived in a *child* component, but we wanted to use
it in the `render()` method of a parent. Well, that just won't work! The parent
can't ask the child for that data: information does not flow up.

*This* is the reason why we will put *all* of our state in the top level component:
`RepLogApp`. Again, this is not an absolute rule, but it's a great rule to follow
for now. We'll talk later about when it's ok to move state lower, into a child component.

## Moving RepLogs to state

Anyways, the *most* important piece of data in our app is the rep logs themselves.
And, these *will* need to change dynamically as the user adds new rep logs and deletes
old ones. That means, rep logs need to be stored as *state*.

To get the static version of our app up and running, we just hardcoded these inside
`RepLogList`. Time to move this to state! Copy the dummy rep log data and go to
`RepLogApp`. Whenever we have new state, we need to initialize it in the constructor.
Add a new `repLogs` key to this array and paste!

[[[ code('3c1345f499') ]]]

Yea, eventually the `repLogs` state will start empty, and we'll then populate it
by making an AJAX call to the server for the existing rep logs. But, until then,
the dummy data makes building things easier.

## Passing the RepLogs State Down

The new state lives in the top-level component. But... we need to use it down in
`RepLogList`. No problem! We just need to pass this down our tree. Fetch the
`repLogs` out of state, then pass this as a prop to `RepLogs`.

[[[ code('9d043b400b') ]]]

In `RepLogs`, before using the new prop, head down to the bottom: we want to define
all props in `propTypes`. Add `repLogs` set to `PropTypes.array.isRequired`.

[[[ code('db7c1b1682') ]]]

Copy that, because, `RepLogList` will receive the same prop.

[[[ code('ce7cdd1d95') ]]]

Ok! We *are* passing the `repLogs` prop to the `RepLogs` component. At the top
of `render()`, read `repLogs` out of props. And then, do the prop-passing dance:
send this straight into `RepLogList`.

[[[ code('e6039c834a') ]]]

*Finally*, in that component, get `repLogs` out of props and... delete the
hardcoded stuff.

[[[ code('407b7f281f') ]]]

This is sweet! Move back to your browser and refresh! Hey hey! It's not broken!
Check out the React dev tools, and look at the top `RepLogApp` component. Yep!
You can see the `repLogs` state. Now... mess with it! Change the reps from 25
to 50.... boom! The UI on the child component updates instantly!

But, look back at `RepLogApp`, it has two pieces of state & one prop. And... it's
passing *all* of that into its child as props. With a trick, we can be lazier, and
do this automatically.
