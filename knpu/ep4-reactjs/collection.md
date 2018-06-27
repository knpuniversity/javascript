# Collection & Rendering a Table

The `RepLogApp` component eventually needs to render all the elements we see on
the original app: with a table and a form. No problem! Go find the template for
this page: `templates/lift/index.html.twig`. Hey! There's our table! And the form
lives in this included template. Copy the *entire* old markup. Then, go back to
`RepLogApp` and replace our code with this. But, I don't want to worry about the
form yet... so remove that. Oh, and I kinda liked the `withHeart` feature, so let's
make sure we're still printing `{heart}`.

[[[ code('0e56f3ea66') ]]]

## class -> className

Sweet! Once again, PhpStorm just did an amazing thing - automagically - when we pasted
in the code. Check out the `className="table table-striped"`. Hmm, look at the
original code in the template: it had `class=""`... because that's what it *should*
be in HTML! Well... in React, you actually *can't* use `class`. You can see it's
highlighted:

> Unknown property class found, use className instead

React can't use `class` because `class` is a keyword inside of JavaScript. And for
that reason, in JSX, you need to use `className` instead. But ultimately, this
will render as a normal `class` attribute on the page.

And, don't worry, there aren't tons of weird attributes like this in React: this
is basically the only one you're likely to use.

The point is: PhpStorm is smart enough to convert our pasted `class` props to `className`
automatically. Notice that I said `props`: while we *think* of these as HTML
attributes, they're technically `props`, which React ultimately renders as attributes.

## Finish our Static "Mock Up"

Let's clean a few things up! We don't need this `js-rep-log-table` class: it was
used by the old JavaScript. And below, this is the column that prints the *total*
weight. Remove the class that was used by the old JavaScript and, for now, just put
a TODO inside.

And finally, *just* to see how it looks with data, let's hack in one fake row full
of invented stuff. Use ... for the last column: someday, we'll add a delete link
here.

[[[ code('5993192a7d') ]]]

Cool! Building a static version of your app first is a *great* way to start. And
JSX makes that really easy.

Let's go check it out: find your browser and refresh! Hey hey! This is starting
to look real!

## Use Static Data First

In our old app, on page load, we make an AJAX request to load the "rep logs"- that's
what we call our data - and use that to render the table.

Eventually, we'll do the same thing in React. But *before* you work with dynamic
data, you should *first* make your app render using static data. Check this out,
inside `render()`, create a new constant called `repLogs` and then set that to some
fake data that matches the format of your API. We now have 3 fake rep logs with
`id`, `itemLabel` and `totalWeight`.

[[[ code('da061af437') ]]]

## Rendering a Collection

Below, inside the `tbody`, we basically want to convert each "rep log" into a
`tr` React element with the data printed inside of it. To do that, we're going to
use a *really* common pattern in React... which might feel a bit weird at first.

Above `render()`, create a new constant called `repLogElement` set to `repLogs.map()`.
Pass this a callback function with one argument: `repLog`. I'll use the arrow syntax
for the callback. Inside, we're going to return a React element via JSX: add
parenthesis so we can use multiple lines. Then, just build out the row: `<tr>`,
then `<td>` with `{repLog.itemLabel}`.

If you're not familiar with the `map` function, that's ok: it's much less common
in PHP. Basically, it loops over each element in `repLogs`, calls our function,
and then, whatever our function returns, is added to the `repLogElement` array.
So, ultimately, `repLogElement` will be an array of `<tr>` React element objects.

Add the next `<td>`. Let's see... ah, this column is "How Many". Fill in the second
column with `{repLog.reps}`, then another `<td>` with `{repLog.totalWeightLifted}`
and finally one more with `...`: this will be the delete link... someday.

.[[[ code('1c68fa9881') ]]]

Great! Wait... but the `tr` has a little warning: something about a missing `key`
prop. We'll talk about that in a minute. Until then, ignore that silly warning! What
could go wrong?!

Now that we have an array of React element objects, this is pretty sweet: go down,
delete the hardcoded row and - wait for it - just print `repLogElements`.

Yea, it looks a bit crazy: we're literally printing an array of React elements!
But, try it - go back to your browser and refresh! It works! It prints each
row!

But, we have a *big* warning from React. Let's fix that next, and introduce a new
best practice to keep our code readable.
