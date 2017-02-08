# JavaScript Templating

Here's the goal: use a JavaScript template to render a new RepLog `<tr>` after we
successfully submit the form. The first step is to, well, create the template - a
big string with a mix of HTML and dynamic code. If you look at the Underscore.js docs,
you'll see how their templates are supposed to look.

Now, we don't want to actually put our templates right inside JavaScript like they
show, that would get messy fast. Instead, one great method is to add a new `script`
tag with a special `type="text/template"` attribute. Give this an id, like `js-rep-log-row-template`,
so we can find it later:

[[[ code('9859473cd8') ]]]

***TIP
The `text/template` part doesn't do anything special at all: it's just a standard
to indicate that what's inside is *not* actually JavaScript, but something else.
***

This is one of the few places where I use ids in my code. Inside, we basically want
to duplicate the `_repRow.html.twig` template, but update it to be written for Underscore.js.

So temporarily, we are *totally* going to have duplication between our Twig, server-side
template and our Underscore.js, client-side template. Copy all the `<tr>` code, then
paste it into the new `script` tag.

Now, update things to use the Underscore.js templating format. So, `<%= totalWeightLifted %>`:

[[[ code('219cba1f39') ]]]

This is the print syntax, and I'm using a `totalWeightLifted` variable because eventually
we're going to pass these keys to the template as variables: `totalWeightLifted`, `reps`,
`id`, `itemLabel` and `links`.

Do the same thing to print out `itemLabel`. Keep going: the next line will be `reps`.
And then use `totalWeightLifted` again... but make sure you use the right syntax!

[[[ code('56a2b7ecd6') ]]]

But what about this `data-url`? We can't use the Twig `path` function anymore. But
we *can* use this `links._self` key! That's supposed to be the link to where we can
GET info about this RepLog, but because our API is well-built, it's also the URL
to use for a DELETE request.

Great! Print out `<%= links._self %>`:

[[[ code('386c1ded8f') ]]]

## Rendering the Template

Gosh, that's a nice template. Let's go use it! Find our `_addRow()` function. First,
find the template text: `$('#js-rep-log-row-template').html()`:

[[[ code('b21688e2e0') ]]]

Done! Our `script` tag trick is an easy way to store a template, but we could have
also loaded it via AJAX. Winning!

Next, create a template object: `var tpl = _.template(tplText)`:

[[[ code('31c2652877') ]]]

That doesn't render the template, it just *prepares* it. Oh, and like before, my
editor doesn't know what `_` is... so I'll switch back to `base.html.twig`, press
`option`+`enter` or `alt`+`enter`, and download that library. Much happier!

To finally render the template, add `var html = tpl(repLog)`, where `repLog` is an
array of all of the variables that should be available in the template:

[[[ code('a43fe7e40b') ]]]

Finally, celebrate by adding the new markup to the table: `this.$wrapper.find('tbody')`
and then `.append($.parseHTML(html))`:

[[[ code('b45a232722') ]]]

The `$.parseHTML()` function turns raw HTML into a jQuery object.

And since we have a new row, we also need to update the total weight. Easy!
`this.updateTotalWeightLifted()`:

[[[ code('55087c5f69') ]]]

Deep breath. Let's give this a shot. Refresh the page. I think we should lift our
coffee cup ten times to stay in shape. Bah, error! Oh, that was Ryan being lazy:
our endpoint returns a `links` key, not `link`. Let's fix that:

[[[ code('669e296b7a') ]]]

Ok, refresh and try it gain! This time, let's lift our coffee cup 20 times! It's
alive!!!

If you watch closely, it's even updating the total weight at the bottom.

I love it! Except for the massive duplication: it's a real bummer to have the row
template in two places. Let me show you one way to fix this.
