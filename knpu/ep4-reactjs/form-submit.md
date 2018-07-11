# Handling a Form Submit

Hey! Our `repLogs` live in state! And so, I think it's finally time to add some
magic to our form and get it functional. Here's our *next* goal: when the user submits
this form, we want to take its data and *update* the `repLogs` state so that a
new row is rendered in the table.

The form itself lives in `RepLogs`, near the bottom. But, the state we need to
modify lives in our parent: `RepLogApp`. To communicate back *up* the tree, we'll
follow a familiar pattern: pass a *callback* from parent to child, just like we
did with `onRowClick`.

## Adding the onSubmit Behavior

Start in `RepLogApp`: add the handler function: `handleNewItemSubmit()` with an
event object. To prevent the form from *actually* trying to submit, use
`event.preventDefault()`, just like normal JavaScript.

For now, log some stuff! I love when a good form submits! Oh, and *also* log
`event.target`. Because this function will handle the `form` element's submit,
`event.target` will be the form itself. We're going to need that so we can read
the values from its fields.

Pass this callback as a new prop: `onNewItemSubmit = {this.handleNewItemSubmit}`.
And, hey! We're starting to see a naming convention. This isn't anything official,
but I like to name my *methods* "handleSomeEvent" and my *props* "onSomeEvent".

In `RepLogs`, head *straight* down to `propTypes` to describe the prop:
`onNewItemSubmit` is a required function.

*Love* it! Back in render, destructure this into a variable. So: how can we attach
a "submit" listener to the form? Ah... it's just `onSubmit={onNewItemSubmit}`.

So simple! Go over to the browser and give it a nice refresh! Select an item...
fill in a number and... we got it! Every time we submit by pressing enter or clicking
the button, we see our insightful message. And as promised, the `event.target` that
we're logging is *literally* the raw, form DOM element.

This is actually really nice. React *always* guarantees that `event.target` will
be the element that you attached the listener to.

## Reading the Form Data

Next question! How can we read the values from our fields? Look at the form in
`RepLogs`: there's the select element and... the textarea. Check it out: it has a
*name* attribute: `reps`. We can use that and normal, boring JavaScript to find that
field and get its value.

By the way... if you've read a little bit about forms and React, this might not
be what you were expecting. Don't worry. I'm going to show you a *few* different
ways to get the values from form fields, including the pros and cons of each, and
which method I recommend and when.

But right now, forget about React, and remember that, under the hood, there is a
boring HTML form sitting on the page that we can interact with.

In `RepLogApp`, it's time to flex our native JavaScript muscles! To read the
`reps` textarea, use `event.target` - that's the form - `.elements.namedItem('reps')`.
This will give us the `textarea` element. Reads its value with `.value`.

Let's go try it! Move over, refresh... select "My Laptop" and lift it 50 times.
Yes! There's the 50! Victory!

## Keep your Smart Component Unaware of Markup

But, before we go further, I need to ask an important philosophical question:

> If your shirt isn't tucked into your pants, are your pants tucked into your shirt?

Hmm. Thought provoking. And also: if our smart component - `RepLogApp` - should not
be responsible for rendering *any* HTML, should its `handleNewItemSubmit()` method
be aware that there is an HTML form and a field with a `name="reps"` attribute
inside?

Actually... no! It makes no sense for `handleNewItemSubmit()` to suddenly be aware
of a specific HTML structure that's rendered by its child. In fact, *all* `RepLogApp`
should care about is that, when - *somehow* - a new rep log is created in the app,
its `handleNewItemSubmit()` function is called so that it can update the `repLogs` state.
If it's created with a form, or with some random fields during a 10-step process
or just with black magic... `RepLogApp` should not care!

So, check this out: copy the inside of the function: I'm going to move most of
this callback into `RepLogs` as a *new* handler function. *Inside* `render()`,
add a new function: `handleFormSubmit()` with our normal event argument. Then,
paste the logic.

Down in `onSubmit`, instead of calling the parent handler, call the new function:
`handleFormSubmit`.

Yep, this feels *much* better. `handleFormSubmit()` is responsible for calling
`event.preventDefault()` and uses the form structure - which is created right
inside this component - to read the names of the fields. Finally, at the bottom,
call the parent handler: `onNewItemSubmit()`.

Actually, *this* is the reason why I put the new function *inside* of `render()`
instead of above the function like I did with `calculateTotalWeightFancier()`:
our callback needs access to the props.

Here's the last important part: instead of passing the event object or the form
element to the parent `onNewItemSubmit()` callback, only pass it what it needs: the
new rep log's raw data. For now, hardcode an item name - "Big fat cat" - but copy
the number of true rep logs and paste.

Back in `RepLogApp`, clear out `handleNewItemSubmit` and give it two fresh args:
`itemName` and `repCount`. Log a todo below: we will eventually use this to update
the state. And log those values so we can check things!

I love it! `RepLogApp` still has a callback, but it's now unaware of the form. It
doesn't care *how* rep logs are created, it only cares that its callback is executed
when that happens. All the form logic is *right* where it should be.

Try it out! Refresh the page, select an item, enter 45 and... submit! The Big
fat cat is hardcoded, but the 45 is our real data.

As *simple* as it is to read the values of the fields by using the `name` attribute,
you probably won't do this in practice. Instead, we'll learn two other ways:
refs & state. We'll jump into `refs` next.
