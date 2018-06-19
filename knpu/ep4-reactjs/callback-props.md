# Notifying Parent Components: Callback Props

We're storing our `highlightedRowId` state in our top level component and passing
it down to our child component as a prop. There, we read that prop and use it in
`render()`. It's all very zen.

Until... we go the browser and click on one of the rows. Whoops! Our console exploded:

> handleRowClick is not a function

This comes from `RepLogList`. Yep... it's right! There is *no* `handleRowClick`
method on `RepLogList`. That method lives on the *parent* component: `RepLogApp`.

## Communicating from Child to Parent

We've just hit a very important moment. The parent component passes data down to
the child via props. Thanks to this, the child component can be really dumb! It
just receives props and renders them. That's it. *Importantly*, the child never
communicates back *up* to the parent. Heck, the `RepLogList` component doesn't even
*know* who its parent is! In theory, we could render `RepLogList` from 10 different
parent components!

So... that leaves us stuck: inside `onClick`, we need to update he `highlightedRowId`
state on our parent component. How can we a child component update the state of
a parent? The answer: it can't!

Wait wait, it's not time to panic... yet. Remember: the child component doesn't
know who its parent is... heck! It doesn't even know that `highlightedRowId` is
something that is stored in state somewhere! `RepLogList` just says:

> I don't know, I'm just a React component, and somebody passes me a
> `highlightedRowId` prop and I render it. I don't know and I don't care if
> it's stored in state.

So, how do we solve this problem? In the same way that we pass *data* from a parent
component into a child component, we can also pass *callback* functions from parent
to child that we expect the child to call when some *interaction* occurs.

## Passing a Callback Prop

It's best to see this in action. First, just to clean things up, in the handler
function, remove the `event` argument: we were never using this anyways. Next, down
where we render `RepLogList`, let's break this into multiple lines. Then pass in
another prop called `onRowClick` set to `this.handleRowClick`. But, make sure you
don't *call* that function: just pass the function as a reference.

Thanks to this, in the child component, *we* have a fancy new `onRowClick` prop.
Destructure this into a new variable. Then, `onClick`, we're dumb, we don't know
*anything* about state, but we *do* know that we're passed an `onRowClick` prop,
and that we're supposed to call this, um, when the row is clicked! Cool! Call it
and pass it `repLog.id`.

That's it! When the user clicks the row, our dumb component will execute the callback
and pass the rep log id. The parent maintains complete control of what to do when
this happens.

Let's try it! Move over and refresh. Bah! We still have an error:

> Cannot read property setState() of undefined

Whoops! Whenever we have a callback handler like this, we need to guarantee that
the `this` keyword is bound to this object. There are a few ways to do this, but
I usually do this in one consistent way: go to the constructor and add
`this.handleRowClick = this.handleRowClick.bind(this)`.

After doing this, no matter *who* calls this method, `this` will always refer to
this `RepLogApp` instance.

Refresh one more time. And, click! We got it!

We have just seen a *massively* important pattern. Our state lives on our top level
component. Then, we communicate *to* our children by passing data as props *and*
we allow those children to communicate *back* to the parent component by passing
them *callback* functions that should be executed when some interaction happens.

Oh, and by following this pattern, we've started to identify two types of components:
*stateful* smart component versus *stateless* dumb components. An important distinction
we'll talk about next.
