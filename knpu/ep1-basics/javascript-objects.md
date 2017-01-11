# Organizing with Objects!

Ok, this all looks pretty good... except that our code is just a bunch of functions
and callback functions! Come on people, if this were PHP code, we would be using
classes and objects. Let's hold our JavaScript to that same standard: let's use objects.

## Creating an Object

How do you create an object? There are a few ways, but for now, it's as simple as
var `RepLogApp = {}`:

[[[ code('3a3c9fdc59') ]]]

Yep, that's an object. Yea, I know, it's just an associative array but an associative
array *is* an object in JavaScript. And its keys become the properties and methods
on the object. See, JavaScript doesn't have *classes* like PHP, only objects. Well,
that's not entirely true, but we'll save that for a future tutorial.

## Adding a Method

Anyways, let's give our object a new method: an `initialize` key set to a `function()`.
We'll call this when the page loads, and its job will be to attach all the event handlers
for all the events that we need on our table. Give it a `$wrapper` argument:

[[[ code('de6d2165d2') ]]]

## Setting a Property

Before we do anything else, set that `$wrapper` argument onto a property:
`this.$wrapper = $wrapper`:

[[[ code('6b880a1013') ]]]

Yep, we just dynamically added a new property. This is the second time we've seen
the `this` variable in JavaScript. And this time, it's more familiar: it refers
to *this* object.

Next, copy our first listener registration code, but change `$table` to `this.$wrapper`.
And instead of using a big ugly anonymous function, let's make this event call a
new method on our object: `this.handleRepLogDelete`:

[[[ code('0963da1b7b') ]]]

We'll add that in a moment.

Repeat this for the other event listener: copy the registration line, change
`$table` to `this.$wrapper`, and then on click, call `this.handleRowClick`:

[[[ code('1786947db9') ]]]

I already like it!

After `initialize`, create these methods! Add a key called, `handleRepLogDelete`
set to a new function:

[[[ code('c217c5d03b') ]]]

Then go copy all of our original handler code, delete it, and put it here:

[[[ code('6065aacb08') ]]]

Make sure you have the, `e` argument exactly like before.

Do the same thing for our other method: `handleRowClick` set to a `function() {}`:

[[[ code('754a566a79') ]]]

I'm not using the, `e` argument, so I don't *need* to add it. Copy the `console.log()`
line, delete it, and put it here:

[[[ code('4539f2bd34') ]]]

## Don't Call your Handler Function: Pass It

There's one *teenie* detail I want you to notice: when we specify the event callback,
`this.handleRepLogDelete` - we're *not* executing it:

[[[ code('edf947b59e') ]]]

I mean, there are no `()` on the end of it. Nope, we're simply passing the function
as a reference to the `on()` function. If you forget and add `()`, things will get crazy.

## Initializing (not Instantiating) the Object

Back in the `(document).ready()`, our job is really simple: find the `$table` and
then pass it to `RepLogApp.initialize()`:

[[[ code('968fd169ca') ]]]

The cool thing about this approach is that now we have an entire object who's job
is to work inside of `this.$wrapper`.

Ok, let's try this! Go back and refresh! Hit delete! Ah, it fails!

> Variable $table is not defined.

The problem is inside of `handleRepLogDelete`. Ah, cool, this makes total sense.
Before, we had a `$table` variable defined above the function. That's gone, but no
problem! Just use `this.$wrapper`:

[[[ code('d5758a76fc') ]]]

You can already see how handy an object can be.

Ok, go back and refresh again. Open up the console, click delete and... whoa! That
doesn't work either! The errors is on the exact same line. What's going on here?
It says:

> Cannot read property 'find' of undefined

How can `this.$wrapper` be undefined? Let's find out.
