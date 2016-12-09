# All about Event Bubbling

Before we finish the delete link, let's add a *second* event listener! When I click
*anywhere* on a row, I also want to log a message.

Back in the template, give the entire table a `js` class so we can select it. How
about `js-rep-log-table`. Down below, find that, then look for `tbody` and then
the `tr` elements inside of it. Then, `.on('click')` add a function with
`console.log('row clicked')`.

Beautiful! Go back and refresh. No surprises: we see "row clicked". But check this
out: click the delete link. Cool! It logs "todo delete" and *then* "row clicked".
Of course it would do this! I'm clicking the delete link, but the delete link is
inside of the row, so both things are being clicked.

## All about Event Bubbling

Welcome to *event bubbling*, an important idea in JavaScript that's *just* boring
enough that you've probably avoided reading articles about it in the past. Let's make
it awesome.

Ok, when we click, we cause a `click` event. Now technically, when I click the delete
icon, the element that I'm *actually* clicking is the *span* that holds the icon.
Cool! So, your browser goes to that `span` element and says:

> Hey! I'd like to trigger a *click* event on you!

If there are any listener functions attached on `click`, those are called. Next,
your browser goes up on level to the anchor and says:

> Good afternoon! I'd like to trigger a *click* event on you!

And the same thing happens again: if there are any listener functions attached on
`click`, those are executed. This includes *our* listener function. From here, it
repeats: *bubbling* all the way up the tree: to the `td`, the `tr`, `tbody`, `table`,
and eventually, to the `<body>` tag itself.

This is why we see "todo delete" first: the event bubbling process notifies the
link element first, and *then* notifies the `tr` later.

## Prefixing $variables with $

Cool! Let's play with this! First, we can clean our code up a little bit and make
a minor performance improvement. Add `var $table = $('.js-rep-log-table')`. Then
below, instead of searching the entire page for these delete links, update it to
`$table.find()` to *only* look insode that table. Do the same below: add `$table.find()`
and look for the `tbody tr` elements in that.

If you refresh now, it still works great. But you might be wondering about my variable
name: `$table`? For PHP developers, this looks weird... because, ya know, `$` means
something important in PHP. But in JavaScript, `$` is *not* a special character.
In fact, it's *so* not special that - if you want - you can even start a variable
name with it. So the `$` in `$table` isn't doing anything special: it's just a convention
that's commonly used to denote a variable that is a `jQuery` object.

It's nice because when I see `$table`, I think:

> Oh! This starts with a `$`! I bet it's a jQuery object, and I can call find()
> or any other jQuery method on it. Far out!

Ok, let's keep going with how we could *stop* event bubbling... and why we probably
don't want to accidentally do that.
