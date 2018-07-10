# Displaying Server Validation Errors

When server-side validation fails, the API returns a 400 status code with the
*details* of the error in the response. And thanks to the change we just made,
`fetch()` *now* throws an error, which we can handle!

Open `RepLogApp`: inside of `handleAddRepLog`, if the call to `createRepLog` fails,
we need to grab the validation error messages and put them on the screen. And now
that our Promise can fail, we can do this by adding a `.catch()`. Pass this an arrow
function. for now, just `console.log(error.response)`.

Let's see what that looks like: refresh, try dark matter again and... cool! We have
the Response object!

Let's decode this *just* like we did before with success: `error.response.json()`.
This returns *another* Promise, so add `.then` with an `errorsData` argument for the
next arrow function. Log that... then let's go see what it looks like: dark matter,
10 times... perfect!

It has an `errors` key, and a list of errors below where the *key* tells us what
field this is for. So, how can we print this onto the screen? Well... it depends
on how fancy you want to get. You *could* use the key of each error to find the
field it belongs to, and render the error in that place. Or, you could print all
of the errors on top of the form. We're going to be *even* a bit lazier: we'll
print the first error above the form.

## Adding the Error State

To do that, we need new state inside of `RepLogApp` to keep track of the current
"rep log validation" error message. Add one called `newRepLogValidationErrorMessage`.
set to empty quotes.

But wait, this is interesting. When we added client-side validation, we stored it
in `RepLogCreator` and *it* handled *all* of that logic. But because `RepLogApp`
is the only component that's aware of the server, this is state that *it* needs to
handle. 

Copy that name and go down to `handleAddRepLog()`. First, *if* we're successful,
in case there was *already* a validation message on the screen, we need to set it
*back* to empty quotes to remove it.

Down in `catch()`, add `const errors = errorsData.errors`. Then, to get *just* the
first error... um... it's actually a bit tricky. Silly JavaScript! Use
`const firstError = errors[Object.keys(errors)[0]]`.

Wow! We need to do this because `errors` isn't an *array*, it's an object with keys.
Use this in the `setState()` call: `newRepLogValidationErrorMessage` set to `firstError`.

## Passing & Using the Error State

Done! As you know, the new state is instantly passed down to the child as a prop.
But we need to *use* this state in `RepLogCreator`: I want to put the message right
above the form. We'll need it *right* at the top of `render()`.

Ok! Time to pass some props around! Step 1: define the new prop type as a required
string. Step 2: destructure this to a new variable. And step 3, pass to `RepLogCreator`.
But wait! Let's change the name `validationErrorMessage=` then the variable.

Why the name change? Well... if you think about it, even though we called this
component `RepLogCreator`, there's nothing about the component that's specific to
*creating* rep logs. We could easily reuse it later for editing *existing* rep
logs... which is awesome!

All `RepLogCreator` cares about is that we're passing it *the* validation error
message - it doesn't care that it's the result of creating a *new* rep log versus
editing an existing one.

Anyways, let's go use this: add the prop type: `validationErrorMessage` as a string
that's required. Then, destructure it. Oh, we don't any props destructuring yet.
No problem - use `const {} = this.props` and *then* add `validationErrorMessage`.
I typed that a bit backwards so PhpStorm would auto-complete the variable name.

Finally, *just* inside the form, use our trick: `validationErrorMessage &&`, some
parenthesis and a div with `className="alert alert-danger"` and the message inside.

*We're* only printing the first message. But if you wanted to print a list instead,
it's no big deal: just use the `map()` function like normal to render all of them.

Let's see if it works! Move over and make sure everything is refreshed. Select dark
matter, 10, and... yes we got it! Hmm, except, because w're not printing the error
*next* to the field... it's not obvious what I need to fix! *If* you're going to be
lazy like us, you need to make sure the errors are descriptive.

Go into `src/Form/Type/RepLogType.php`. Most validation comes from our `RepLog` entity.
But sometimes the form fields *themselves* will add some "sanity" validation. To
customize the message, add an option: `invalid_message` set to
"Please lift something that is understood by our scientists."

Much easier to understand! Try that: refresh, choose dark matter and... got it!

Next! Except... hmm: when you get a validation error, the "Lifting to the database"
loading message is still there! It shouldn't be. Let's fix that and learn about a
super-useful language feature called the "object rest spread".
