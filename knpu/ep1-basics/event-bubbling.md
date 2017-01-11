# All about Event Bubbling

I'm feeling so good about our first click listener, let's add another! When I click
*anywhere* on a row, I also want to log a message.

Back in the template, give the entire table a `js` class so we can select it. How
about `js-rep-log-table`:

[[[ code('f49f8cc3cb') ]]]

Down below, find that and look inside for the `tbody tr` elements. Then, `.on('click')`
add a function that prints some fascinating text: `console.log('row clicked')`:

[[[ code('642b07b670') ]]]

Beautiful! Refresh and click the row. No surprises: we see "row clicked". But check
this out: click the delete link. Hot diggity - *two* log messages! Of course it would
do this! I clicked the delete link, but the delete link is inside of the row. Both
things got clicked!

## All about Event Bubbling

Welcome to *event bubbling*, an important concept in JavaScript that's *just* boring
enough that you've probably avoided reading articles about it in the past. Let's make
it awesome.

Here it goes: when we click, we cause a `click` event. Now technically, when I click
the delete icon, the element that I'm *actually* clicking is the *span* that holds
the icon. Cool! So, your browser goes to that `span` element and says:

> Top of the morning! I'd like to trigger a *click* event on you!

Then, if there are any listener functions attached on `click`, those are called.
Next, your browser goes up one level to the anchor and says:

> Ahoy Matey! I'd like to trigger a *click* event on you!

And the same thing happens again: if there are any `click` listener functions attached
to *that* element, those are executed. This includes *our* listener function. From
here, it just keeps going: *bubbling* all the way up the tree: to the `td`, the `tr`,
`tbody`, `table`, and eventually, to the `<body>` tag itself.

And *that* is why we see "todo delete" first: the event bubbling process notifies
the link element and *then* bubles up and notifies the `tr`.

## Prefixing $variables with $

Cool! Let's play with this! First, let's clean up our code a bit and make a minor
performance improvement. Add `var $table = $('.js-rep-log-table')`. Then below, instead
of searching the entire page for these delete links, use `$table.find()` to *only*
look inside that table:

[[[ code('111689648d') ]]]

Do the same below: `$table.find()` and look for the `tbody tr` elements in that:

[[[ code('ed5d7b309a') ]]]

If you refresh now, it still works great. But some of you might be wondering about
my variable name: `$table`? For PHP developers, that looks weird... because, ya know,
`$` means something important in PHP. But in JavaScript, `$` is *not* a special character.
In fact, it's *so* not special that - if you want - you can even start a variable
name with it. Madness! So the `$` in `$table` isn't doing anything special, but it
*is* a fairly common convention to denote a variable that is a `jQuery` object.

It's nice because when I see `$table`, I think:

> Oh! This starts with a `$`! Good show! I bet it's a jQuery object, and I can call
> find() or any other fancy jQuery method on it. Jolly good!

Now that we understand event bubbling, let's mess with it! Yes, we can actually
*stop* the bubbling process... which is probably *not* something you want to do...
but you might already be doing it accidentally.
