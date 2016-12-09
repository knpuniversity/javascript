# JavaScript Templating

Here's the goal: use a JavaScript template to render a new RepLog `<tr>` after we
successfully submit the form. The first step is to, well, create the template - a
big string with a mix of HTML and dynamic code. If you look at the Underscore docs,
you'll see how their templates are supposed to look.

Now, we don't want to actually put our templates right into JavaScript like they show,
that would defeat the purpose. Instead, one great method is to add a new `script`
tag with a special `type="text/template"` and give it an id, like `js-rep-log-row-template`,
so we can find it later.

***TIP
The `text/template` part doesn't do anything special at all: it's just a standard
to indicate that what's inside is *not* actually JavaScript, but something else.
***

This is one of the few places where I use ids in my code. Inside, we basically want
to duplicate the `_repRow.html.twig` template, but update it to be written for Underscore.

So temporarily, we are *totally* going to have duplication between our Twig, server-side
template and our Underscore, client-side template. Copy all the `<tr>` code, then
paste it into the new `script` tag.

Now, we'll update things to use the Underscore templating format. So, `<%= totalWeightLifted %>`.

This is the print syntax, and I'm using a `totalWeightLifted` variable because eventually
we're going to pass these keys variables to the template: `totalWeightLifted`, `reps`,
`id`, `itemLabel` and `links`.

Do the same thing to print out `itemLabel`. Then, keep going: the next line will
be `reps`. And then use `totalWeightLifted` again... but make sure you use the
right syntax!

But what about this `data-url`? We can't use the Twig `path` function anymore. But
we *can* use this handle `links._self` key! That's suppose to be the link to where
we can GET info about this RepLog, but because our API is well-built, it's also the
URL to use for a DELETE request.

Great! Print out `<%= links._self %>`.

## Rendering the Template

Gosh, that's a nice template. Let's go use it! Find our `_addRow()` function. First,
find the template text: `$('#js-rep-log-row-template').html()`. Done! Our `script`
tag trick is an easy way to store a template, but we also could have loaded it via
AJAX. Winning!

Next, create a template object: `var tpl = _.template(tplText)`.

That doesn't render the template, it just *prepares* it. Oh, and like before, my
editor doesn't know what `_` is... so I'll switch back to `base.htm.twig`, press
`option+enter` or `alt+enter`, and download that library. Much happier!

To finally render the template, add `var html = tpl(repLog)`, where `repLog` is an
array of all of the variables that should be available in the template. Finally,
celebrate by adding the new markup to the table:
`this.$wrapper.find('tbody')` and then `.append($.parseHTML(html))`. The `$.parseHTML()`
turns raw HTML into a jQuery object.

And since we have a new row, we also need to update the total weight. Easy!
`this.updateTotalWeightLifted()`.

Deep breath. Let's give this a shot. Refresh the page. I think we should lift our
coffee cup ten times to stay in shape. Bah, error! Oh, that was Ryan being lazy:
our endpoint returns a `links` key, not `link`. Let's fix that.

Ok, refresh and try it gain! This time, let's lift our coffee cup 20 times! It's
alive!!!

If you watch closely, it's even updating the total weight on the bottom.

I love it! Except for the massive duplication: it's a real bummer to have the row
template in two places. Let me show you one way to fix this.
