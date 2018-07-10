# Passing Data from your Server to React

Look inside `RepLogCreator`. The items in the drop-down are hardcoded. But, in
reality, we can't just put whatever we want here: there is a specific set of valid
options stored in our backend code.

We *already* know this is true because the last option is totally fake! When we
send that to the server, it hits us with a validation error.

So, here is the question: instead of hardcoding these options, should we load them
dynamically from the server?

The answer is... maybe? If these options won't ever change or change often, it's
*really* not that big of a deal. The advantage is... simplicity!

But, if they *will* change often, or if having an invalid one on accident would
cause a *hugely* critical or embarrassing bug, then yea, you *should* load them
dynamically... so that you can sleep soundly at night.

## Refactoring Data to the Top Level Component

Whenever your JavaScript app needs server data, there are two options. But, they
both start the same way: by moving our `itemOptions` up into `RepLogApp`, which
is the only component that's even *aware* a server exists!

Copy the `itemOptions` and then open `RepLogApp`. On top, initialize a new
`itemOptions` state set to that array.

Because all state is automatically passed as props to `RepLogs`, go there and add
the new prop type: `itemOptions` as an array that is required.

Above, destructure that, then, below, pass it down to `RepLogCreator` as
`itemOptions={itemptions}`.

Copy the prop type, then do the same in `RepLogCreator`: define the prop type
at the bottom, then go to the top of the function to destructure out `itemOptions`.

Below, use the local `itemOptions` variable for the `map` function.

Cool! When we refresh... cool! The options aren't dynamic yet, but they *are*
stored as state. If you change a value... yep! it shows up.

## Two Ways to Load Server Data

Now that the data lives in our top-level component, let's talk about the *two*
ways we can load this dynamically from the server. Actually, we already know the
first way - we did it with `repLogs`! We could set `itemOptions` to an empty
array, then make an AJAX call from inside `componentDidMount()`. Of course, we
would *also* need to create an API endpoint, but that's no big deal.

Or, you could use the second option: render a global variable inside Twig and read
it in JavaScript. The advantage is that *this* data is available immediately: you
can populate your app with some initial data, without waiting for the AJAX call.

## Passing the Options as Props

Copy the options again and go into the *entry* file: `rep_log_react.js`. This will
*not* be the final home for these options - but it will get us one step closer.
Create a new `itemOptions` variable and paste! *Now*, pass these as a new prop:
`itemOptions={itemOptions}`.

Thanks to this, `RepLogApp` will now *receive* a new `itemOptions` prop. Remove
the state *entirely*.

At the bottom, set this prop type: `itemOptions` is an array, and you *could*
make it required - I'll talk more about that in a minute.

Oh, and this is cool! We deleted the `itemOptions` state but *added* an `itemOptions`
prop. And because we're passing *all* props & state to `RepLogs`, it is *still*
receiving an `itemOptions` prop. In other words, this just works.

Side note: I *originally* set `itemOptions` to state because this is *needed* if
you wanted to make an AJAX call to populate them: they would be empty at first,
then *change* a moment later when the request finished. But really, `itemOptions`
don't ever need to change. So once we passed them as props, we could remove the
state.

But, if the item options really *did* need to be state - if this was something
that changed throughout the life of our app - we could *still* use this strategy.
We could use the `itemOptions` prop to set the *initial* value of the state.
This literally means that you *would* still have an `itemOptions` state, and it
would be initialized to `this.props.itemOptions`.

I might even call the prop `initialItemOptions` for clarity... though if you *do*
have a state and prop with the same name, that's fine. If you look down in `render()`,
the state would override the prop, because the `...state` comes second.

## Setting Initial Props

Anyways, down in `propTypes`, I did *not* make `itemOptions` a *required* prop.
In a real application, I probably would: I don't want the select to *ever* be
empty. But sometimes, you *will* create a component where you want a prop to be
truly optional. And in those cases, you need to be careful: if we didn't pass the
`itemOptions` prop, our code would explode! `itemOptions` would be undefined instead
of an array... which would be a problem when `RepLogCreator` calls `.map` on it.

To solve this, you can give any prop a default value. It's super easy: add
`RepLogApp.defaultProps =` an object with `itemOptions` set to an empty array.

Ok: we have *removed* the hardcoded `itemOptions` from our React app entirely.
But... we're not done: they're still hardcoded in `rep_log_react.js`. We need to
fetch this value dynamically from the server. Let's do that next!
