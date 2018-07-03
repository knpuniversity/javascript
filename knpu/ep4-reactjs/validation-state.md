# Form Validation State

When the user tries submits a negative quantity, let's show them an error message!
On a React level, this means we'll need some new state to store that message. And,
like we just discussed, because this state is *really* tied to our form, and is
just meant to power the UI, the best place for it is inside `RepLogCreator`.

To add state, we always start the same way: initialize it in the constructor:
`this.state =` and object, and call it `quantityInputError` set to empty quotes.

Below, remove the todo and add `this.setState()` with `quantityInputError` set
to `Please enter a value greater than zero`.

And when the form submit *is* successful, we need to make sure any existing error
does *not* show. Copy the `setState()` line and set it to an empty string.

State, check! Down in render, as always, start by destructuring the varaible:
`const { quantityInputError } = this.state`. Let's use this to do *two* things:
add a class to make the form element look red *and* print the message.

Because we're using Bootstrap, to make the form red, the `form-group` div needs
a new `has-error` class. Empty out `className`, enter into JavaScript mode and use
"ticks" to use a "template literal". This makes using multiple classes with logic
a bit easier: re-add `form-group`, then type `${}` to do "string interpolation".
Oooo. Inside, *if* `quantityInputError` then print `has-error`, else print nothing.

## The Cool Conditional String Printing Syntax

Cool. And to actually print the message, go down after the input. Here, I want surround
the error in a red error div, but *only* if there actually *is* an error. We could
use the ternary syntax here... and use some JSX inline. That's fine. But, there's
a cool, but weird shortcut syntax that we can use *whenever* we want to print a
string *only* when that string is not empty. Here it is: `quantityInputError &&`
and then the JSX: `<span className="help-block">`, print `quantityInputError`,
close the tag, and exit from JavaScript mode.

Woh. Before we talk about this, try it! Move over, make sure the page is *fully*
refreshed, select an item, be annoying and use a negative number and... there
it is! Oh, it's ugly - we'll fix that soon.

But first, this syntax. It's weird because this bit of code works *different* in
JavaScript versus PHP! In JavaScript, if `quantityInputError` is empty, or "falsey",
this return false and we print nothing. But if `quantityInputError` has some text
in it, so, it's "truthy", then JavaScript returns the *second* part of the expression:
our JSX. So, this entire block will return `false` or this JSX. In PHP, this would
always return true or false.

So... yes, this is another fancy syntax. If you love it, nice! If you hate it, use
the ternary syntax instead.

## Cleaning up the Form Design

Before we move on, oof, we need to make this look less ugly. Go back into `RepLogs`
and scroll down. Add a few divs: `className="row"` and another
`className="col-md-6"`. Move `RepLogCreator` inside.

Then, back in `RepLogCreator`, find the form element and... remove the `form-inline`
class.

Give your browser a nice refresh. That puts the form elements onto their own lines.
And *that* makes our validation error look great.

Our form is looking great! So let's talk about a totally *different* way of handling
form data: controlled inputs.
