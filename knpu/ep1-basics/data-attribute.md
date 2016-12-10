# A Great Place to Hide Things! The data- Attributes

Time to *finally* hook up the AJAX and delete one of these rows! Woohoo!

As an early birthday gift, I already took care of the server-side work for us. If
you want to check it out, it's inside of the `src/AppBundle/Controller` directory:
`RepLogController`. I have a bunch of different RESTful API endpoints and one is
called, `deleteRepLogAction`. As long as we make a `DELETE` request to `/reps/ID-of-the-rep`,
it'll delete it and return a blank response. Happy birthday!

Back in `index.html.twig`, inside of our listener function, how can we get figure
out the DELETE URL for *this* row? Or, even more simply, what's the ID of *this*
particular RepLog? Well, I have no idea! Yay!

We know that this link is being clicked, but it doesn't give us any information about
the RepLog itself, like its ID or delete URL. 

## Adding a data-url Attribute

This is a *really* common problem: when you want to attach extra metadata to your DOM,
so that you can read it in JavaScript. And guess what! There's an official, standard,
proper way to do this! It's via a data attribute. Yep, according to the silly "rules"
of the web, you're not really supposed to invent new attributes for your elements.
Well, unless the attribute starts with `data-`, followed by lowercase letters. That's
*totally* allowed!

For example, add an attribute called `data-url` and set it equal to the DELETE URL
for *this* RepLog. The Symfony way of generating this is with `path()`, the name
of the route - `rep_log_delete` - and the id: `repLog.id`.

## Reading data- Attributes

Sweet! To read that in JavaScript, simply say `var deleteUrl = $(this)`, which we
know is the link, `.data('url')`. 

That's a little bit of jQuery magic: it's a shortcut that allows you to read any
of your data attributes. Finally, the AJAX call is really simple! I'll use `$.ajax`,
set `url` to `deleteUrl`, method to `DELETE`, and add a `success` function.

Hmm, so after this finishes, we probably want the *entire* row to disappear. Above
the AJAX call, find the row with `$row = $(this).closest('tr')`. In other words,
start with the link, and go up the DOM tree until you find a `tr` element. Oh, and
reminder, this is `$row` because this is a jQuery object! Inside `success`, say
`$row.fadeOut()` for just a *little* bit of fancy.

Ok, try that out! Refresh, delete my coffee cup and life is good. And if I refresh,
it's truly gone. Oh, but dang, if I delete my cup of coffee record, the total weight
at the bottom does *not* change. I need to refresh the page to do that. LAME! I'll
re-add my coffee cup. Now, let's fix that!

## Adding data-weight metadata

If we somehow knew what the weight was for *this* specific row, we could read the
total weight and just subtract it when it's deleted. So how can we figure out the
weight of the row? Well, we could just read the HTML of the third column... but that's
not a *great* solution. Instead, why not use another `data-` attribute?

On the `<tr>` element, add a `data-weight` attribute set to `repLog.totalWeightLifted`.
Also, so that we know *which* `th` to update add a class: `js-total-weight`

Let's hook this up! *Before* the AJAX call - that's important, we'll find out why
soon - find the total weight container by saying `$table.find('js-total-weight')`.
Next add `var newWeight` set to `$totalWeightContainer.html() - $row.data('weight')`.

Use that inside `success`: `$totalWeightContainer.html(newWeight)`.

Let's give this fanciness a try. Go back refresh. 459? Hit delete, it's gone. 454.
We got it!
