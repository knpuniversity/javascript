# Controlled Component Form

With *controlled* components, the value for *each* field in your form needs to be
set to state. And then, you need to make sure to *update* that state whenever the
field changes. But once you do this, everything else is super nice! The input
automatically renders with the correct value, and it's dead-simple to read that
state and use it in other places.

In `RepLogCreator`, we did *not* use this strategy. Nope, we took advantage
of `refs` to access the DOM elements directly, and then read the values from there.

To *really* compare these two approaches, let's see how it would look to use
"controlled components" inside of `RepLogCreator`. Then, later, I'll give you *my*
clear recommendation on when to use each.

Copy `RepLogCreator` and create a *new* file: `RepLogCreatorControlledComponents.js`.
Next, in `RepLogs`, copy the import statement, comment it out and, instead, import
`RepLogCreator` from this new file.

[[[ code('09d776268c') ]]]

[[[ code('0ca12edb68') ]]]

## Adding the new State

Perfect! Because our form has two fields - the select & the input - we need two
new pieces of state. On top, add `selectedItemId` set to empty quotes and
`quantityValue` set to 0. Delete the old refs stuff.

[[[ code('8a90e13ce3') ]]]

In `render()` destructure these out of state, and use them below: instead of `ref=`,
use `value={selectedItemId}`. On the input, the same thing: `value={quantityValue}`.

[[[ code('073444b37a') ]]]

Oh, this is cool: when you use a controlled component with a select element, you
add the `value=` to the *select* element itself! That's *not* how HTML works. Normally,
you need to add a `selected` attribute to the correct `option`. But in React, you
can pretend like the select itself holds the value. It's pretty nice.

## Adding the Handler Functions

As *soon* as you bind the value of a field to state, you *must* add an onChange handler.
Above, create `handleSelectedItemChange()` with an event argument. Inside, all we
need to do is set state: `this.setState()` with `selectedItemId` set to
`event.target.value`. `event.target` gives us the *select* DOM element, and then
we use `.value`. We don't need to read the `selectedIndex` like before.

[[[ code('c094960fcf') ]]]

Copy this function, paste, and call it `handleQuantityInputChange`. This time, update
`quantityValue`... but the `event.target.value` part can stay the same. Nice!

[[[ code('fce8f61d8f') ]]]

Before we use these functions in render, head up to the constructor and bind both
of them to this.

*Finally*, head back down to hook up the handlers:
`onChange={this.handleSelectedItemChange}` and for the input,
`onChange={this.handleQuantityInputChange}`.

[[[ code('e359c3b970') ]]]

Ok: the controlled components are setup! Move over, refresh, inspect element to
find the text input, click it, and *then* go over to React. The dev tools show
us this *exact* element... which is nice because we can scroll up to find
`RepLogCreator` and see its state!

Select a new item. New state! Change the input. New state again!

## Using the new State

The hard work is *now* behind us. Find `handleFormSubmit()`. Instead of looking
at the DOM elements themselves... we can just read the state! On top, destructure
what we need: `const { selectedItemId, quantityValue } = this.state`. Delete the
old refs stuff.

[[[ code('3101a503e3') ]]]

Then, in the if statement, it's just if `quantityValue`. That *is* nice.

[[[ code('608687bac0') ]]]

Use that again below for `onAddRepLog`. For the first argument, put a TODO *just*
for a minute. Then, at the bottom, *clearing* the form fields is also easier:
delete the old code, then re-set the `selectedItemId` and `quantityValue` state
back to their original values.

[[[ code('6ea4c5560d') ]]]

Ok, back to that `onAddRepLog()` call. The first argument is the item *label*:
that's the visual part of the option, not its value. But our state - `selectedItemId`
*is* the value. We're going to change this to use the value later, once we introduce
some AJAX. But, thanks to the `itemOptions` property we created earlier, we can
use the option id to find the text. I'll create a new `itemLabel` variable and paste
in some code. This is *super* not important: it just *finds* the item by id, and,
at the end, we call `.text` to get that property.

[[[ code('8e6b6b4185') ]]]

Use that below: `itemLabel`.

[[[ code('2ad9443672') ]]]

And... I think we're ready! Move over and refresh. Lift our big fat cat 25 times.
We got it! Try some coffee while we're at it.

## Controlled Versus Uncontrolled Components

Ok, let's finally judge these two approaches. The old `RepLogCreator` uses the
first strategy, called "Uncontrolled Components". It's about 100 lines long.
`RepLogCreatorControlledComponents` is a bit longer: 116 lines. And that reflects
the fact that controlled components require more setup: each field needs its
own state *and* a handler to update state. Sure, there *are* some clever ways to make
one handler that can update everything. But, the point is, the added state and
handlers means a bit more setup & complexity. On the bright side, when you need
to read or update those values, it's super easy! Just use the state. Oh, even this
is too much code: I forgot to use the local `selectedItemId` variable.

Controlled components are the React officially-recommended approach to forms. However,
because of the added complexity & state, we recommend using "uncontrolled components"
instead... most of the time. But, this is subjective, and you'll be fine either way.
No decision is permanent, and switching from uncontrolled components to controlled
is easy.

So, when *do* we recommend *controlled* components? The biggest time is when you
want to do render something as *soon* as a field changes - not *just* on submit.
For example, if you wanted to validate a field as the user is typing, disable or
enable the submit button as the user is typing or reformat a field - like a phone
number field... once again... as the user is typing. This is why the `heartCount`
input was *perfect* as a controlled component: we want to re-render the hearts
*immediately* as the field changes.

If you're not in one of these situations, you can totally still use controlled
components! But we usually prefer uncontrolled components.

Oh, and remember another downside to controlled components is that they *do*
require your component to have state. And so, if your dumb component is a function,
like `RepLogs`, you'll need to refactor it to a class. No huge deal - just something
to think about.

In `RepLogs`, let's change the import to use our original component.
