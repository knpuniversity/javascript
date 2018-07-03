# Controlled Component

I have good news and bad news. The bad news? React has *two* totally different
options for interacting with forms. And *nobody* likes unnecessary choices. The
good news? Well... we're going to learn both, but then I'll tell you *exactly*
which choice *I* think you should make, and when.

The first option is what we've been doing so far: you render the form field then
interact with the DOM element directly when you need to read its value or set its
value. In this world, React is basically unaware that this field exists once it's
rendered.

The *second* option is quite different. When you render the field, you *bind* its
value to a piece of *state*. Then, instead of working with the DOM element to read
and set its value, you just read and set that *state*. And, of course, when you
update the state, React re-renders the field with the new value.

In the first approach, the *DOM* is the source of truth for the value of a field.
In the second approach, the *state* is the source of truth.

## Adding the Field State

To show off the second approach, we're going to add a *really* important new feature:
a form field at the top of the page where the user can control the *number* of
hearts they want on the page. If they enter 50, we'll heart them 50 times!

In `RepLogs`, right after the `h1`, add a simple `<input type="number" />`.

Nothing interesting yet. Yep, hello, new, empty field. In order to be able to print
multiple hearts on the page, we need to know how *many* hearts the user wants.
That means we need some new *state*. We *could* put that state inside `RepLogs`.
After all, the number of hearts is a pretty not-important, UI-related state. But,
to keep `RepLogs` simple, let's put it in `RepLogApp`.

Initialize `numberOfHearts` to 1. As *soon* as we do this, thanks to how we're
rendering `RepLogs`, this new state is automatically passed as a prop. Awesome!
Copy `numberOfHearts` and head down to add it as a new prop type: `numberOfHearts`
set to `PropTypes.number.isRequired`.

Above, destructure this value out, and then, this looks a little crazy, copy the
heart, enter JavaScript, paste the heart in some quotes and `.repeat(numberOfHearts)`.

We haven't bound the state to the field yet, but we *should* be able to at least
test our state setup. Refresh the page. One heart. Find the React tools and change
the state to 10. Yay!

## Binding the Input to State

And *this* is where the two options diverge. If we were to do things the same as
before, we would add an `onChange` handler, read the value from the input directly,
and use *that* to set some state. But, the state and the input wouldn't be connected
in any direct way. Oh, and, to be 100% clear, if you want to read a value off of
a DOM element directly, you don't *necessarily* need to use refs. Inside the `onChange`
handler, you can use `event.target` to get the element. No ref needed.

Refs are just a tool: they're handy if you need to find several fields inside a
form, or, in general, whenever you need to work with a DOM element and you don't
have access to it.

*Anyways*, to use the *second*, state-based approach, literally say
`value={numberOfHearts}`.

Try it! Refresh. And, hey! We see a value of 1! But in the console... a huge
error! And also, I *can't* change the field at all! It's *stuck* at 1. The error
explains why:

> You provided a `value` prop to a form field without an `onChange` handler.
> This will render as a read-only field.

## Updating the State

This *new* strategy - where you set the `value` of a field to some state - is called
a controlled component. React will *always* make sure that this value is set to
the value of this prop... which means that it won't allow us to change it! If we
want the value to change, we need to update the underlying state: `numberOfHearts`
in `RepLogApp`.

To do this, add another handler function: `handleHeartChange()`. And rememeber:
our top-level component is *all* about changing state: it shouldn't be aware or
care that there is a form input that's used to change this. So, give it just one
argument: the new `heartCount`.

Inside, set the state! `this.setState()` with `numberOfHearts` set to `heartCount`.

And because we just added a handler function, don't forget to go up to the constructor
and add `this.handleHeartChange = handleHeartChange.bind(this)`.

Down below in render, all our state and props are automatically passed. The only
things we need to pass manually are the handlers: `onHeartChange={this.handleHeartChange}`.

Finally, open `RepLogs` and scroll down to `propTypes`: we're now expect an
`onHeartChange` function that is required. Back up, destructure that new variable.

We need to update the state *whenever* the field changes. This means we need an
`onChange`. Set it to an arrow function with an `e` argument. Inside, it's so nice:
`onHeartChange(e.target.value)`.

We *do* reference the DOM element - `e.target` - but just for a moment so we can
call the handler & update the state.

We're done! Let's try it - refresh! Change this to 10. Ha! It works! We are happy!

## Casting to an Integer

Oh, except, hmm, we just failed prop validation:

> Failed prop type: `numberOfHearts` of type `string` supplied, expected `number`.

Interesting. In `RepLogs`, we expect the `numberOfHearts` prop to be a number...
which makes perfect sense. But apparently, this is now a string! This isn't *that*
important... but it is interesting!

When you read a value from a field, it is, of course, *always* a string! That means
the `numberOfHearts` state becomes a string and *that* is passed down as a prop.
Ok, let's clean that up: we could do that right here, or inside the handler function.
To do it right here, oh, this is bizarre, add a `+` before the varaible.

That will *change* the string to a number. There are other ways to do this -
JavaScript is weird - but this is one way.

Try it again: change the value and... no prop error!

Welcome to the world of "controlled component"! It feels really good... but it
*can* be a bit more work. Don't worry: in a few minutes, we'll talk about when
to use this versus our original strategy.

Oh, but to make this a little bit more fun, change this to `input type="range"`.
Try this. Super-fun-hearts-slider!!!

Next, let's refactor our `RepLogCreator` to use controlled components. This will
be the *best* way to see the difference between the two approaches.
