# Dumb Components with State

Our form works... but has no validation. Well, that's not *completely* true. In
general, there are *three* types of validation. First, server-side validation, which
we absolutely need and will talk about later. Second, client-side validation via
JavaScript, which is optional, but a nice way to give quick feedback. And
third, client-side HTML5 validation, which isn't flexible at all, but is *super*
easy to add. In fact, we already have some: the `required` attributes on the form:
these prevent the user from submitting the form empty.

But, right now, you *can* enter a negative number. And... that makes no sense! So
let's add some client-side validation in our React app to prevent this. Oh, and by
the way, the input field *already* disallows entering letters - that's another HTML5
validation feature thanks to this `type="number"`.

## Preventing the Form Submit

The form handling-logic lives in `RepLogCreator.handleFormSubmit()`. So, if we want
to prevent the form from submitting or add an error message, that code needs to
live here.

And the first half is easy! If `quantityInput.value <= 0` then... somehow,
we need to add an error message. And because we *don't* want to continue processing,
just return.

Let's see how this looks so far. Try negative 10, select an item and... yep! The
form does not clear.

## Dumb Components with State

Great! Now, how can we add an error message? Think about it: *sometimes*
our form will need an error message and sometimes it will *not*. The error is a
piece of data that we need to *change*. In other words, it needs to be stored as
state!

Ya! If we had an "error message" state, we could use that down in `render()`. And
then, whenever the state changed, React would re-render this component and print
out the new message.

But, hmm. Right now, *all* our state lives in the top-level component: `RepLogApp`.
That's on purpose! `RepLogApp` is a smart, stateful component. And, because it
holds *all* of the state, all the other components can be dumb, *stateless* components
that render markup with little or no logic.

This is a *good* distinction. But, in the real world, there *are* some situations
when a dumb, presentation component - like `RepLogCreator` - *should* hold some
state. This is one of them! 

Why? Well, RepLogApp's job is to be worried about the *business* logic of our app,
independent of markup. So, it keeps track of things like the `repLogs`. But, a
form validation error is not *really* business logic: it's state that just exists
to support the form's user interface. Heck, as I keep mentioning, `RepLogApp`
isn't even aware that our app has a form!

This was a hard distinction for me to *fully* understand. So, here's a different
explanation, entirely stolen from our brave co-author Frank:

> `RepLogCreator` is concerned about the creation process. It's like a bouncer
> at the club and the input field is the front door. The input only gets into
> the club if it meets certain criteria. By handling that logic in `RepLogCreator`,
> we allow the rest of our application to be unaware of this: it's taken care
> of for them. It also prevents `RepLogApp` - the manager of the club - from
> *needing* to know how `RepLogCreator` is doing its job.

Here's the point: I want your dumb components to, at first, *not* have state. But
if you *do* need some state in order to power the user interface for that component,
that's totally fine. And if you're *totally* confused, don't sweat it. If you *do*
put your state in the wrong place, you'll either realize it eventually, or it'll
just mean a bit more work for you. It's not the end of the world, nothing is permanent.

So, let's give `RepLogCreator` some state!
