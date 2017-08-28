# Tweaking Bootstrap's Sass

Now that we finally have Bootstrap's Sass working, we can celebrate! Inside
`_bootstrap.scss`, the first thing it imports is an `_variables.scss` file.
I'll hold `Command` and click to open that.

Awesome! This holds a *bunch* of variables that are used throughout the rest of the
Sass files. Yep, this means we can override these to control colors and many other
things.

Copy the `$brand-primary` variable line. Then, at the top of our `main.scss` file,
before we import Bootstrap, *override* that variable. Make sure to remove the default.

This variable is used to color some buttons and a lot of other things. Let's make
it a little lighter: change the 6.5 to 2.5. It's not important, but the new color
should be `#3885C7`:

[[[ code('ac2f0983f7') ]]]

Back in the browser, inspect the "I Lifted It!" button. Yep! The current color is
`#337AB7`. Now, refresh! Check it out. Yes! It's the slightly lighter `#3885C7`.

So this is *really* the reason why you might want to import Bootstrap as Sass, instead
of CSS.

## Importing Only Parts of Bootstrap

Let's do one more thing! The `_bootstrap.scss` file imports *every* part of Bootstrap.
But what if you don't *need* every part of Bootstrap? For example, we are *not*
using the glyphicons. Importing that CSS is wasteful!

Let's fix this! Copy the *entire* contents of `_bootstrap.scss`. Then, in our `css/`
directory, create a new `_bootstrap.scss` file and paste that here.

As *soon* as we do that... all the paths are broken! Yea, that makes sense: we're
in a different directory. No problem, I'll copy `"bootstrap` and do a "Find and Replace"
to replace this with `"~bootstrap-sass/assets/stylesheets/bootstrap`. Replace everything!

[[[ code('e22e6f5657') ]]]

Yay! Happy paths!

Next, in `main.scss`, import this file instead of the core one. Just, `./_bootstrap.scss.`:

[[[ code('72e0da5410') ]]]

If this is all we did, nothing would change: we're still importing everything. But
now... we have power! In `_bootstrap.scss`, comment out the `glyphicons` line:

[[[ code('5cf11b2fb5') ]]]

Cool! We don't need to restart Webpack after this change, but, stop it temporarily
so that we can clean out the `build/` directory:

```terminal
rm -rf web/build/*
```

Now, re-run webpack:

```terminal-silent
./node_modules/.bin/webpack --watch
```

Check it out! In `web/build`, we still have the Font Awesome fonts... but we do *not*
have the glyphicon fonts anymore. That's awesome! We're not parsing the `_glyphicons.scss`
file anymore, so Webpack never sees those font files and so never moves them. This
is proof that our CSS file is now just a *little* bit smaller.

Ok, let's add some sourcemaps to make debugging a lot nicer.
