# Deleting Items

Our app is looking great! But I know, we're missing *one* big piece: actually making
AJAX requests so that all of this saves to the server. That is coming *very* soon.
But, we have one more piece of homework first: adding the ability to delete rep logs.

Open up `RepLogList`. This is where we have a little "..." TODO. Turn this into an
anchor tag with a span inside: `className="fa fa-trash"`.

Cool! That should get us a fancy new trash icon. Awesome.

To hook this up, we're going to go through a process that should be starting to feel
familiar... hopefully boring! Here it is: when the user clicks this link in
`RepLogList`,
we ultimately need to update the state that lives in `RepLogApp`. *That* means
we need to pass a handler callback from `RepLogApp` into `RepLogs` and again into
`RepLogList`.

## Adding & Calling the Delete Handler Function

In `RepLogApp`, create that new function: `handleDeleteRepLog`, which is a *great* name,
because this component doesn't know and doesn't care that a *link* will be used
to delete rep logs. Nope, it's all about the data. Give this an `id` argument
so we know *which* rep log to delete. Be lazy and log a todo.

Next, because we have a new handler method, make sure to bind it to `this`.

And finally, pass this as a new prop: `onDeleteRepLog={this.handleDeleteRepLog}`.

Our work here is done. Now, move to `RepLogs`. First, at the bottom, add this
to `propTypes`: `onDeleteRepLog` is `PropTypes.func.isRequired`.

Above in the function, destructure `onDeleteRepLog`, find `RepLogList`, and
pass this again as a prop: `onDeleteRepLog={onDeleteRepLog}`.

Finally, move to `RepLogList`. Start the same: add the new prop to `propTypes` and
destructure the variable. 

Ultimately, we need to execute this callback `onClick()` of the link. We have a choice
here: create an inline arrow function, or add a function above render. If the logic
is simple, both are fine. Add a new `handleDeleteClick` function with two
arguments: the `event` and `repLogId`. Start with `event.preventDefault()` so the
browser doesn't try to follow the link. Then, yep, just `onDeleteRepLog(repLogId)`.

Scroll down to hook this up: `onClick={}`. Hmm, we can't call `handleDeleteClick`
directly... because we *also* need to pass it the id. No worries: use an arrow
function with `(event) => handleDeleteClick()` passing it `event` and - because
we're inside the loop, `repLog.id`.

Let's try it! Refresh! It looks good... and click delete. Nothing happens, but 
check the console. Got it! There is our todo.

## Updating State: Delete from an Array without Mutating

*Now* for the fun part! Go back to `RepLogApp`. Inside the handler, we need to
remove *one* of the `repLog` objects from the `repLogs` state. But... we do *not*
want to *modify* the state. So, the question is: how can we *remove* in item from
an array without *changing* that array?

Here's one great way: call `this.setState()` and pass it the key we want to set:
`repLogs`. Assign *this* to `this.state.repLogs.filter()`, passing this a callback
with a `repLog` argument. For the body, because I didn't add curly braces, we are
*returning* `repLog.id !== id`.

The `filter` function loops over each `repLog`, calls our function, and if it returns
*true*, that `repLog` is added to the new array. This will give us a new, *identical*
array... except without the *one* item.

This will work... but! You might also notice another, familiar problem. Because
the *new* state depends on the existing state, we should pass `setState()` a callback
to avoid a *possible* race condition with state being set at almost the same moment.

Call, `this.setState()` again, but with a callback that receives a `prevState`
argument. Copy the object from below, delete all of that code, and *return* this
from our callback.

That's it! Let's try it! Refresh and... click that trash! It's gone! We got it!
And because React is *awesome*, there is *no* doubt that if I add a new item
and try to delete it... yep - it works too. Because everything is based on state,
there are no surprises.

Ok - it's finally time to start using AJAX to communicate with the server.
