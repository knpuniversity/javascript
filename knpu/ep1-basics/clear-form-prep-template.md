# Clearing the Form, Prepping for a Template

Let's do the easy thing first: when we submit the form successfully, these errors
need to disappear!

We already have code for that, so copy it, and isolate it into its own new method
called `_removeFormErrors`:

[[[ code('f9426e2ede') ]]]

Call that from our map function:

[[[ code('4ada7f4ca5') ]]]

The *other* thing we should do is empty, or reset the fields after submit. Let's
create another function that does that *and* removes the form's errors. Call it
`_clearForm`. First call `this._removeFormErrors()`:

[[[ code('f5338fd61b') ]]]

To "reset" the form, get the DOM Element itself - there will be only one - by using `[0]`
and calling `reset()` on it:

[[[ code('71c93c92c1') ]]]

I love that this `[0]` thing isn't a mystery anymore!

Call this from up in success: `self._clearForm()`:

[[[ code('8997862325') ]]]

Ok, test this baby out! Submit it empty, then fill it out for real and submit.
Boom!

## Client-Side Templating??

Ok, back to the main task: on success, we need to add a new row to the table.
We *could* do this the easy way: by manually parsing the JSON and building the
table. But there's one big problem: I do *not* want to duplicate the row markup
in Twig AND in JavaScript. Instead, we're going to use client-side templates.

Let's start off simple: at the bottom of our object, add a new function: `_addRow`
that has a `repLog` argument. For now just log that: this will be the RepLog data
that the AJAX call sends back:

[[[ code('aed1ae6f36') ]]]

Call this from up in the `success` callback: `self._addRow(data)`:

[[[ code('759daca88e') ]]]

Let's make sure things are working so far: refresh and add a new element. Yes!
The data has `id`, `itemLabel` and even a `links` key with a URL for this RepLog.
We are ready to template!

In a nutshell, a client-side, or JavaScript templating engine is like having Twig,
but in JavaScript. There are a lot of different JavaScript templating libraries,
but they all work the same: write a template - a mixture of HTML and dynamic code -
and then render it, passing in variables that are used inside. Again, it's *just*
like using Twig... but in JavaScript!

One simple templating engine comes from a library called *Underscore.js*. This is
basically a bunch of nice, utility functions for arrays, strings and other things.
It also happens to have a templating engine.

Google for Underscore CDN so we can be lazy and include it externally. Copy the
minified version and then go back and open `app/Resources/views/base.html.twig`.
Add the new script tag at the bottom:

[[[ code('3e0bc11ebe') ]]]

Now, let's start templating!
