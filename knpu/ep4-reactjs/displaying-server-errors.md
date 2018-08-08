# Displaying Server Validation Errors

When server-side validation fails, the API returns a 400 status code with the
*details* of the error in the response. And thanks to the change we just made,
`fetch()` *now* throws an error, which we can handle!

Open `RepLogApp`: inside of `handleAddRepLog`, if the call to `createRepLog` fails,
we need to grab the validation error messages and put them on the screen. And now
that our Promise can fail, we can do this with a `.catch()`. Pass this an arrow
function. For now, just `console.log(error.response)`.

[[[ code('ccc98bcde7') ]]]

Let's see what that looks like: refresh, try dark matter again and... cool! We have
the Response object!

Let's decode this *just* like we did before with success: `error.response.json()`.
This returns *another* Promise, so add `.then` with an `errorsData` argument for the
next arrow function. Log that... then let's go see what it looks like: dark matter,
10 times... perfect!

[[[ code('8c69abee01') ]]]

It has an `errors` key, and a list of errors below where the *key* tells us which
field this is for. So, how can we print this onto the screen? Well... it depends
on how fancy you want to get. You *could* use the key of each error to find the
field it belongs to, and render the error in that place. Or, you could print all
of the errors on *top* of the form. *Or*, you could be *even* lazier like me and
just print the first error above the form.

## Adding the Error State

To do that, we need new state inside of `RepLogApp` to keep track of the current
"rep log validation" error message. Add one called `newRepLogValidationErrorMessage`.
set to empty quotes.

[[[ code('8b4e4ea3a5') ]]]

But wait, this is interesting. When we added client-side validation, we stored it
in `RepLogCreator` and *it* handled *all* of that logic. But because `RepLogApp`
is the only component that's aware of the server, this is state that *it* needs to
handle. And, it's not really *form* validation logic: remember `RepLogApp` doesn't
even *know* our app uses a form. Nope, it's really a *business* logic validation
failure: something, *somehow* tried to save a rep log with invalid data.

Copy that name and go down to `handleAddRepLog()`. First, *if* we're successful,
in case there was *already* a validation message on the screen, we need to set it
*back* to empty quotes to remove it.

[[[ code('11b38c3f75') ]]]

Down in `catch()`, add `const errors = errorsData.errors`. Then, to get *just* the
first error... um... it's actually a bit tricky. Silly JavaScript! Use
`const firstError = errors[Object.keys(errors)[0]]`.

Wow! We need to do this because `errors` isn't an *array*, it's an object with keys.
Use this in the `setState()` call: `newRepLogValidationErrorMessage` set to `firstError`.

[[[ code('25f17fa8f2') ]]]

## Passing & Using the Error State

Done! As you know, the new state is instantly passed down to the child as a prop.
But we need to *use* this state in `RepLogCreator`: I want to put the message right
above the form.

Ok! Time to pass some props around! Step 1: define the new prop type as a required
string. Step 2: destructure this to a new variable. And step 3, pass to `RepLogCreator`.
But wait! Let's change the name `validationErrorMessage=` then the variable.

[[[ code('918a0b6e77') ]]]

Why the name change? Well... if you think about it, even though we called this
component `RepLogCreator`, there's nothing about the component that's specific to
*creating* rep logs. We could easily reuse it later for editing *existing* rep
logs... which is awesome!

All `RepLogCreator` cares about is that we're passing it *the* validation error
message: it doesn't care that it's the result of creating a *new* rep log versus
editing an existing one.

Anyways, let's go use this: add the prop type: `validationErrorMessage` as a string
that's required. Then, destructure it. Oh, we don't have any props destructuring
yet. No problem - use `const {} = this.props` and *then* add `validationErrorMessage`.
I typed that a bit backwards so PhpStorm would auto-complete the variable name.

[[[ code('377b9e4b04') ]]]

Finally, *just* inside the form, use our trick: `validationErrorMessage &&`, some
parenthesis and a div with `className="alert alert-danger"` and the message inside.

[[[ code('06d4adece8') ]]]

*We're* only printing the first message. But if you wanted to print a list instead,
it's no big deal: just use the `map()` function like normal to render all of them.

Let's see if it works! Move over and make sure everything is refreshed. Select dark
matter, 10, and... yes! We got it! Hmm, except, because we're not printing the error
*next* to the field... it's not super obvious what I need to fix! *If* you're going
to be lazy like us, you need to make sure the errors are descriptive.

Go into `src/Form/Type/RepLogType.php`. Most validation comes from our `RepLog` entity.
But the form fields *themselves* can add some "sanity" validation. To customize
the message, add an option: `invalid_message` set to
"Please lift something that is understood by our scientists."

[[[ code('dd4b377a0c') ]]]

Much easier to understand! Try that: refresh, choose dark matter and... got it!

Except... hmm: when you get a validation error, the "Lifting to the database"
loading message is still there! It... shouldn't be. Let's fix that and learn about a
super-useful language feature called "object rest spread".
