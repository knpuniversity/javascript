# Integrating FOSJsRoutingBundle

Open `Components/RepLogApp.js` and search for `Routing`. Guess what? *This* `Routing`
variable is a *global* variable. Boo! It's our *last* one. In `templates/`, open
the base layout. Other than a polyfill - which we won't talk about - there are only
*two* script tags left. These give us the `Router` variable and they come
from FOSJsRoutingBundle: a *really* cool bundle that allows you to generate URLs
from Symfony routes in JavaScript.

Our goal is clear: refactor our code so that we can *require* the Router instead
of relying on the global variable.

## Requiring the router.js File

The *first* interesting thing is that this is *not* a Node package. Nope, it's a
normal PHP package that *happens* to have a JavaScript file inside. But, that doesn't
really make any difference... except that the *path* for it is ugly: it lives
in `vendor/friendsofsymfony/jsrouting-bundle/Resources/public/js/router.js`.
Wow! Ok then: `const Routing = require()`, then go up a few directories and follow
the path: `vendor/friendsofsymfony/jsrouting-bundle/Resources/public/js/router.js`.

Simple enough! Let's try it! In your browser, refresh! Bah! Error!

> The route rep_log_list does not exist

Booo! This error comes from *inside* the Router. Here's what's going on: this JavaScript
library is more complex than most. The *first* script tag gives us the Router variable.
But the *second* executes a dynamic endpoint that fetches a JSON list of the route
information and then *sets* that on the router.

When we simply require the router... we *do* get the Router object... but it has
no routes! So the question is: how can we get the dynamic route info so that it can
be set into the router?

Actually, this *is* possible! If you look at the [Usage](https://symfony.com/doc/master/bundles/FOSJsRoutingBundle/usage.html)
section of the bundle's docs, it talks about how to integrate with Webpack Encore.
Basically, by running a `bin/console` command, you can *dump* your route information
to a static JSON file. Then, you can *require* that JSON from Webpack and set it
on the Router. Oh, and don't worry about this `import` syntax - it's basically the
same as `require`, and we'll talk about it next.

So this is really cool! It shows how you can even require JSON files from JavaScript!
But... it has a downside: each time you add a new route, you need to re-run the
command. That can be a pain during development. It's still a *great* option - and
is a bit faster on production - but it *does* have that weakness.

## Creating the Fake Router Module

And there *is* another option. It's not quite as fancy or awesome... but it's easier.
Inside `assets/js/Components`, create a new file called `Routing.js`. Inside, um,
just say, `module.exports = window.Routing`.

Yep! We *are* going to continue using the global variable. But *now*, we can *at least*
require *this* file from everywhere else so that our code *looks* more responsible:
`const Routing = require('./Routing')`.

And now, when we refresh, it works. The *cool* thing about this hacky solution is
that if you want to change to the better solution later, it's easy! Just put the
correct code in `Router.js`, and everything will already be using it. Nice!
