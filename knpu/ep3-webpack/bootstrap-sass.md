# Bootstrap Sass & resolve-url-loader

Right now, we're loading Bootstrap's CSS. That's cool! But, there's a library
called `bootstrap-sass`... which is a *Sass* version of all of the Bootstrap CSS.
That's kind of cool... because if we used *that* instead, we could override some
variables to control the Bootstrap CSS itself!

***TIP
Bootstrap 4 uses Sass natively. You can either require the CSS files or the
Sass files from the main package (from the `sass/` directory).
***

## Installing bootstrap-sass

Let's do it! First, use yarn to remove the old package:

```terminal
yarn remove bootstrap
```

Then, add the new package:

```terminal
yarn add bootstrap-sass --dev
```

This package is *just* like the previous package... except it has Sass files instead
of CSS. It *even* still contains the Bootstrap JavaScript. So to keep loading that,
just change the require to `bootstrap-sass`.

Next, for the CSS require, we need to find the new path. Look inside `node_modules`
for `bootstrap-sass`. Ok! It has an `assets/stylesheets/_bootstrap.scss` file!
This is the key: *it* imports every piece of bootstrap.

Ok! Back in our file, require `bootstrap-sass/assets/stylesheets/_bootstrap.scss`.

Check out the terminal that's running Webpack. It had a *ton* of errors while we
were working, but it's happy again! Try out the site. It's *also* happy.

## Importing Sass instead of Require

So far, to load CSS or Sass, we've required it from JavaScript. But, you can also
se `@import` from *inside* a CSS file. Close the `node_modules/` directory and open
our `main.css`. At the very top of, add `@import`. Then, copy the path to the
bootstrap Sass file, remove it, and add it to the `@import` line.

Since Webpack parses the `@import`, this is basically identical to what we had before.
Except... it doesn't work! Even PhpStorm is *super* angry! When you use `require`
inside a JS file, Webpack knows to look for `bootstrap-sass` inside the `node_modules/`
directory. But when you use a CSS `@import`, that path is relative to *this* file.

No worries! To hint to Webpack that you want to treat this path like a *module*
path, prefix it with `~`.

Ok, do this for Font Awesome too: copy its path, remove the `require` line, and
add `@import ~`, then the path.

## Path Problems in Sass

In theory... this should work *just* like before. Right? Right? Try it!

Oh no! It looks *terrible*! Find your terminal. Interesting:

> Can't resolve `fonts/bootstrap/glyphicons-halflings-regular.svg`

... and then it references our `main.scss` file. Huh. This is really odd.

What's *really* interesting, is that the font file is actually being referenced
from deep inside bootstrap: we require `_bootstrap.scss`, it imports another
file called `_glyphicons.scss` and *it* references the font files. Well, there are
some variables, but this code references that file.

This worked a moment ago... so why would it break? All we did was change the way
that we were require these files?

So... this is a little confusing. Without going into too much detail, when you
`@import` a Sass file from another Sass file in a different directory, any paths
wrapped in `url()` get totally messed up: Webpack, well really, `css-loader`, looks
for them relative to the *original* Sass file. In other words, it's looking for
the font files relative to `main.scss`, not `_glyphicons.scss`

***TIP
An alternative way to fix this is to override the `$icon-font-path` variable and
point it at the `fonts/` directory inside `bootstrap-sass`.
***

## The resolve-url-loader

The most important thing is just fixing this nonsense. How? With another loader.
Find your terminal and run

```terminal
yarn add resolve-URL-loader --dev
```

This loader exists only to solve this issue. Once it's installed, find `webpack.config.js`
and, *right* before `sass-loader`, add `resolve-url-loader`. But in order for this
to work, on `sass-loader`, add `?sourceMap`. We're gonna talk more about source maps
in a few minutes. But internally, the `resolve-url-loader` needs them so it can
do its job.

I know. It's a little crazy. But! If we go back and restart Webpack... it works!
And the page looks *great* again.

Hey! We've got Bootstrap done in Sass! Let's tweak some stuff!
