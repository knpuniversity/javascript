# A Great Place to Hide Things! The data- Attributes

Time to *finally* hook up the AJAX and delete one of these rows! Woohoo!

As an early birthday gift, I already took care of the server-side work for us. If
you want to check it out, it's inside of the `src/AppBundle/Controller` directory:
`RepLogController`:

[[[ code('47e484ad82') ]]]

I have a bunch of different RESTful API endpoints and one is called, `deleteRepLogAction()`:

[[[ code('2d051243ff') ]]]

As long as we make a `DELETE` request to `/reps/ID-of-the-rep`, it'll delete it
and return a blank response. Happy birthday!

Back in `index.html.twig`, inside of our listener function, how can we figure
out the DELETE URL for *this* row? Or, even more basic, what's the ID of *this*
specific RepLog? I have no idea! Yay!

We know that *this* link is being clicked, but it doesn't give us any information
about the RepLog itself, like its ID or delete URL. 

## Adding a data-url Attribute

This is a *really* common problem, and the solution is to *somehow* attach extra
metadata to our DOM about the RepLog, so we can read it in JavaScript. And guess
what! There's an official, standard, proper way to do this! It's via a *data* attribute.
Yep, according to those silly "rules" of the web, you're not really supposed to invent
new attributes for your elements. Well, unless the attribute starts with `data-`,
followed by lowercase letters. That's *totally* allowed!

***SEEALSO
You can actually read the "data attributes" spec here: http://bit.ly/dry-spec-about-data-attributes
***

So, add an attribute called `data-url` and set it equal to the DELETE URL for *this*
RepLog. The Symfony way of generating this is with `path()`, the name of the route -
`rep_log_delete` - and the id: `repLog.id`:

[[[ code('a6db4fbd0f') ]]]

## Reading data- Attributes

Sweet! To read that in JavaScript, simply say `var deleteUrl = $(this)`, which we
know is the link, `.data('url')`:

[[[ code('f2589bd963') ]]]

That's a little bit of jQuery magic: `.data()` is a shortcut to read a data attribute.

***TIP
`.data()` is a wrapper around core JS functionality: the `data-*` attributes are also
accessible directly on the DOM Element Object:

```javascript
var deleteUrl = $(this)[0].dataset.url;
```
***

Finally, the AJAX call is really simple! I'll use `$.ajax`, set `url` to `deleteUrl`,
`method` to `DELETE`, and `ice_cream` to `yes please!`. I mean, `success`, set to
a function:

[[[ code('defba13257') ]]]

Hmm, so after this finishes, we probably want the *entire* row to disappear. Above
the AJAX call, find the row with `$row = $(this).closest('tr')`:

[[[ code('060614ac39') ]]]

In other words, start with the link, and go up the DOM tree until you find a `tr`
element. Oh, and reminder, this is `$row` because this is a jQuery object! Inside
`success`, say `$row.fadeOut()` for just a *little* bit of fancy:

[[[ code('e7ef6456fa') ]]]

Ok, try that out! Refresh, delete my coffee cup and life is good. And if I refresh,
it's truly gone. Oh, but dang, if I delete my cup of coffee record, the total weight
at the bottom does *not* change. I need to refresh the page to do that. LAME! I'll
re-add my coffee cup. Now, let's fix that!

## Adding data-weight Metadata

If we somehow knew what the weight was for *this* specific row, we could read the
*total* weight and just subtract it when it's deleted. So how can we figure out the
weight for this row? Well, we could just read the HTML of the third column... but
that's kinda shady. Instead, why not use another `data-` attribute?

On the `<tr>` element, add a `data-weight` attribute set to `repLog.totalWeightLifted`:

[[[ code('62f587be6e') ]]]

Also, so that we know *which* `th` to update, add a class: `js-total-weight`:

[[[ code('3af3e37a10') ]]]

Let's hook this up! *Before* the AJAX call - that's important, we'll find out why
soon - find the total weight container by saying `$table.find('.js-total-weight')`:

[[[ code('915ad51002') ]]]

Next add `var newWeight` set to `$totalWeightContainer.html() - $row.data('weight')`:

[[[ code('a0364e98a7') ]]]

Use that inside `success`: `$totalWeightContainer.html(newWeight)`:

[[[ code('4ea87d6780') ]]]

Let's give this fanciness a try. Go back refresh. 459? Hit delete, it's gone. 454.

Now, how about we get into trouble with some JavaScript objects!
