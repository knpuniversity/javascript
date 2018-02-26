# Multiple Pages / Entries

This is all *really* nice... but, so far... it *kinda* looks like Webpack only works
for single-page apps! I mean, if this were the *only* page in our app, we could
write all of our JavaScript in the one entry file, require what we need and... be done!

But even our small app has another page: `/login`. And this page has its *own* custom
JavaScript.... which right now, is done in this boring, old, non-Webpack-ified
`login.js` file.

So... how can we *also* process *this* file through Webpack? We *could* require it
from `rep_log.js`, but that's wasteful! We *really* only need this code on the
*login* page.

## Multiple Entries

The answer is... so simple: add a *second* entry called `login` that will load the
`assets/js/login.js` file.

I want you to think of each entry as a separate *page* on your site. Or, you can
think of each entry as a separate JavaScript application that runs on your site.
Like, we have our main "rep log" application and also our "login" application.

Because we just changed the webpack config, go back and restart Encore:

```terminal-silent
yarn run encore dev --watch
```

## Webpack-Sponsored Cleanup

And *now* we can improve things! First, remove that self-executing function. Then,
more importantly, *require* the dependencies we need: in this case jQuery with
`const $ = require('jquery')`.

That's it! Go back and... refresh! Bah:

> require is not defined

Boo! My bad - I forgot to *use* the new built file. Open
`templates/bundles/FOSUserBundle/Security/login.html.twig`. Point the script tag
to `build/login.js`.

And *now*... it works! When I type a *really* login username, this message appears
thanks to that JavaScript.

## The "layout" Entry

But... there's one last problem. Open the base layout file: `base.html.twig`. Yep,
we *also* include one JavaScript file on *every* page. It doesn't do much... just
adds a tooltip when you hover over your username.

So... how do we handle this? How can we Webpackify *this* file? I mean, the layout
is not its own *page*... so... can it be its own entry? The answer is... yes! Add
another entry called `layout` and point it to `assets/js/layout.js`.

Here's the deal: *usually* you will include exactly *one* script tag for a built
JavaScript file on each page - like `rep_log.js` or `login.js`. But, if you have
some JavaScript that should be included on *every* page, you can think of *that*
JavaScript as its own, mini JS application. In that case, you'll have *two* built
files per page: your layout JavaScript *and* your page-specific JavaScript... if
you have any for that page.

Go back and restart Webpack so it reads the new config. But... let's *not* refactor
this file yet: we'll do that next. In `base.html.twig`, use the new file:
`build/layout.js`.

Boom! Try it! Refresh the page! Yes! It *still* works. Next, let's refactor `layout.js`
to remove the self-executing function and require its dependencies. But this time...
there's a surprise!
