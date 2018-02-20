# Full-JavaScript Rendering & FOSJsRoutingBundle

When you try to render *some* things on the server, but then also want to update them
dynamically in JavaScript, you're going to run into our new problem: template duplication.
There are *kind of* two ways to fix it. First, if you use Twig like I do, there is
a library called twig.js for JavaScript. In theory, you can write *one* Twig template
and then use it on your server, and *also* in JavaScript. I've done this before and
know of other companies that do it also.

My only warning is to keep these shared templates very simple: render simple variables -
like `categoryName` instead of `product.category.name` - and try to avoid using many
filters, because some won't work in JavaScript. But if you keep your templates simple,
it works great.

The second, and more universal way is to *stop* rendering things on your server.
As soon as I decide I need a JavaScript template, the *only* true way to remove
duplication is to remove the duplicated server-side template and render *everything*
via JavaScript.

Inside of our object, add a new function called `loadRepLogs`:

[[[ code('7b74056f2c') ]]]

Call this from our constructor:

[[[ code('283343edf4') ]]]

Because here's the goal: when our object is created, I want to make an AJAX call
to and endpoint that returns *all* of my current RepLogs. We'll then use that to
build *all* of the rows by using our template.

I already created the endpoint: `/reps`:

[[[ code('5c68dbef94') ]]]

We'll look at exactly what this returns in a moment.

## Getting the /reps URL

But first, the question is: how can we get this URL inside of JavaScript? I mean,
we could hardcode it, but that should be your last option. Well, I can think of
three ways:

1. We could add a `data-` attribute to something, like on the `$wrapper` element
   in `index.html.twig`.

2. We could pass the URL *into* our `RepLogApp` object via a second argument
   to the constructor, just like we're doing with `$wrapper`.

3. If you're in Symfony, you could cheat and use a cool library called FOSJsRoutingBundle.

## Using FOSJsRoutingBundle

Google for that, and click the link on the [Symfony.com documentation][FOSJsRoutingBundle].
This allows you to expose some of your URLs in JavaScript. Copy the composer require
line, open up a new tab, paste that and hit enter:

```terminal
composer require friendsofsymfony/jsrouting-bundle
```

While Jordi is wrapping our package with a bow, let's finish the install instructions.
Copy the new bundle line, and add that to `app/AppKernel.php`:

[[[ code('2e3f1b45b5') ]]]

We also need to import some routes: paste this into `app/config/routing.yml`:

[[[ code('f5e6f20281') ]]]

Finally, we need to add two script tags to our page. Open `base.html.twig` and paste
them at the bottom:

[[[ code('f90fad2dbc') ]]]

This bundle exposes a *global* variable called `Routing`. And you can use that `Routing`
variable to generate links in the same way that we use the `path` function in Twig
templates: just pass it the route name and parameters.

Check the install process. Ding!

***TIP
If you have a JavaScript error where `Routing` is not defined, you may need to run:

```terminal
php bin/console assets:install
```
***

Now, head to `RepLogController`. In order to make this route available to that `Routing`
JavaScript variable, we need to add `options={"expose" = true}`:

[[[ code('d7eedf2bc2') ]]]

Back in `RepLogApp`, remember that this library gives us a *global* `Routing` object.
And of course, inside of our self-executing function, we *do* have access to global
variables. But as a best practice, we prefer to *pass* ourselves any global variables
that we end up using. So at the bottom, pass in the global `Routing` object, and
then add `Routing` as an argument on top:

[[[ code('ff817092e0') ]]]

## Making the AJAX Call

Back down in `loadRepLogs`, let's get to work: `$.ajax()`, and set the `url` to
`Routing.generate()`, passing that the name of our route: `rep_log_list`. And on
`success`, just dump that data:

[[[ code('92d300da35') ]]]

Ok, go check it out! Refresh! You can see the `GET` AJAX call made *immediately*.
And adding a new row of course still works.

But look at the data sent back from the server: it has an `items` key with 24 entries.
Inside, each has the *exact* same keys that the server sends us after creating
a *new* RepLog. This is *huge*: these are all the variables we need to pass into
our template!

## Rendering All the Rows in JavaScript

In other words, we're ready to go! Back in `index.html.twig`, find the `<tbody>`
and empty it entirely: we do *not* need to render this stuff on the server anymore:

[[[ code('0d66b83408') ]]]

In fact, we can even delete our `_repRow.html.twig` template entirely!

Let's keep celebrating: inside of `LiftController` - which renders `index.html.twig` -
we don't need to pass in the `repLogs` or `totalWeight` variables to Twig: these
will be filled in via JavaScript. Delete the `totalWeight` variable from Twig:

[[[ code('b314255804') ]]]

If you refresh the page now, we've got a totally empty table. Perfect. Back in `loadRepLogs`,
use `$.each()` to loop over `data.items`. Give the function `key` and `repLog` arguments:

[[[ code('f651574c23') ]]]

Finally, above the AJAX call, add `var self = this`. And inside, say `self._addRow(repLog)`:

[[[ code('0e7f8f2bf2') ]]]

And that should do it! Refresh the page! Slight delay... boom! All the rows load
dynamically: we can delete them and add more. Mission accomplished!


[FOSJsRoutingBundle]: https://symfony.com/doc/master/bundles/FOSJsRoutingBundle/index.html
