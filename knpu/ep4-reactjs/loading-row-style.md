# Success Messages + The Style Attribute

When you a have a super-fancy, AJAX-powered app like we do, success messages and
loading animations are *essential* to having a beautiful user experience. Ok course,
you can choose *how* fancy you want to get: more fancy just means more complexity.

Let's look at one rough spot. Watch carefully: there's a delay between when we submit
the form and when the new row appears. Sure, that was pretty quick - but if it
is ever *any* slower, it's going to look broken.

The delay is because we are *not* doing an optimistic UI update: we don't set the
state until *after* the AJAX called finishes. Let's smooth this out: let's add
a "loading" row at the bottom of the table while we're saving.

## Adding the "saving" State

To do this, our app needs to know whether or not a new rep log is currently being
saved. So, we need some new state! And this state will *definitely* live in `RepLogApp`,
because it's the only component that is even *aware* that AJAX is happening. Call
it `isSavingNewRepLog` and initialize it to false.

Down below, before we call `createRepLog()`, add `this.setState()` to change
`isSavingNewRepLog` to `true`. And *after* the AJAX call finishes, let's break
this onto multiple lines and then set this same key *back* to false.

That felt *great*! Adding and managing new state in our smart component continues
to be *really* simple.

## Passing & Using the Prop

Next: where do we need to use this value? The `tbody` lives in `RepLogList`: this
is where we'll add a temporary row. So, we need to, once again, do the prop-passing
dance. First, all state is already passed from `RepLogApp` to `RepLogs`. Inside
that component, define a new prop type: `isSavingNewRepLog` as a required bool.
Above, destructure it and then, find `RepLogList` and pass it down.

Copy the new prop type and *also* put it into `RpeLogList`. In `render()`, destructure
the new variable.

Ok! *Now* we're ready. Move down to *after* the map function: so that our new tr
appears at the bottom of the table. To print the new row *only* when we need it,
use the trick we learned earlier: `isSavingNewRepLog &&`, then open a set or
parentheses. Now, just add the `tr` and `td`: "Lifting to the database...". Give
that a `colSpan=4` and `className="text-center"` to center it.

## The style Prop

And, hmm... it might look better if we lower the opacity a bit. Let's do that
with a `style` prop. But, the `style` prop works a bit different than the style
HTML attribute: instead of being a string of styles, we'll pass it an object with
the styles we want. This is cleaner, but the syntax looks a bit nuts. First, we
use `{}` to move into JavaScript mode. Then, add *another* `{}` to define an
object, with `opacity: .5`.

The double `{{` almost looks like Twig code. But really, we're just entering JavaScript
and then creating an object.

Let's try it! Move over, refresh fill out the form and... watch closely. There it
was! It was *perfect*!

Next, let's make our user feel even *more* warm and fuzzy about staying in shape
by adding a temporary success message on top.

## Success Message

We're adding some little "touches" to make the UI better... so let's keep going!
Let's add a new success message once the new rep log API calls finishes.

Once again, in `RepLogApp`, we need some new state for this message. Give it a
generic name - `successMessage` - we may be able to use this in a few other places,
like after deleting a rep log.

Below, after `createRepLog()` finishes, update this state: `successMessage` set
to "Rep Log Saved!".

Cool! This time, I want to print the message right on top of the app, above the
table. That markup lives in `RepLogs`. Go straight into that component and define
the new prop type: `successMessage` as a string that's required.

Go destructure that variable... then, after the `input`, use our trick:
`successMessage &&` open parentheses. Let's print a div with a few bootstrap
classes: `alert alert-success text-center`. Inside, print the text!

Easy! Head back to your browser and refresh! Let's delete a few rep logs to clean
things up. Then, lift your coffee cup 12 times and, submit! Boom! There is our
new message.

The only problem is that the message stays up there... permanently. That should
probably disappear after a few seconds. Let's do that next!

