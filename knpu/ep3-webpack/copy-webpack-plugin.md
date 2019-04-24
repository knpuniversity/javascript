# copy-webpack-plugin

Our *source* files all live in `web/assets`. We code there, and Webpack moves everything
we need to `web/build`. At runtime, when the user actually loads the site, *nothing*
is read from `web/assets`. Nope! The user downloads *all* files from `web/build`.

And that means... well... `web/assets` does *not* need to be publicly accessible
anymore! We can - and should - *hide* our source files.

Yes, I mean we can, literally:

```terminal
mv web/assets assets
```

The `assets/` directory now lives at the root of our project.

And really... that doesn't break much. All of our files use relative paths internally
to refer to each other. The *only* thing we need to update is `webpack.config.js`:
to remove the `web/` from the 3 entries:

[[[ code('3e0f6b7a0c') ]]]

Yep, that's it.

Find your `webpack` terminal tab and restart!

```terminal
./node_modules/.bin/webpack --watch
```

Everything still builds... and the page still loads *fine*.

## Static, Non-Webpacked Image Files

Except... we lost something small. Before this change, the leaderboard had a little
dumbbell image. Inspect that element. Yea, inside the `h2`, there is a good, old-fashioned
`img` tag. And it references `/assets/images/dumbbell.png`. I was wrong! I said *nothing*
was referencing the public `web/assets` directory. But that's not true!

In `app/Resources/views/lift/index.html.twig`, yep, there is the `img` tag:

[[[ code('533c62757a') ]]]

## The copy-webpack-plugin

How can we fix this? It would be silly to keep *all* of our source files in a public
directory *just* so we can reference a few, static images.

The answer? With a plugin called `copy-webpack-plugin`. Google for it.

This plugin is a little tool that allows you to copy files from one location to
another when Webpack runs. For us, it means we could copy files to the `build/`
directory that *aren't* processed through Webpack.

Let's get it installed! Copy the name of the package. Then, in your favorite open
terminal tab, run:

```terminal
yarn add copy-webpack-plugin@4 --dev
```

Back in the documentation, copy the `require` line. In our `webpack.config.js`, paste
that, but use the trendier `const` keyword:

[[[ code('96ce5647db') ]]]

I'll also copy the `new CopyWebpackPlugin()` line. This goes under the `plugins` key:

[[[ code('280826ba42') ]]]

So here's the deal: in the `images/` directory, we have a *mixture* of images. One -
`dumbbell-mini.png` - is processed through Webpack and copied to the `build/` directory
already. But the other, `dumbbell.png` is *not*.

To organize this, create a *new* directory in `assets/` called `static/`. Move the
dumbbell file there. This directory will hold all assets that are *not* processed
by Webpack.

Now, for `CopyWebpackPlugin`, we will copy from `./assets/static` to `static/`. I'll
add a comment about what this means: copies to `{output}/static`:

[[[ code('0419f466d0') ]]]

Give it a try! Hit `Ctrl`+`C` to stop Webpack, then restart it!

```terminal
yarn add copy-webpack-plugin --dev
```

And *instantly*, we have a `web/build/static` directory with `dumbbell.png` inside!

This is nothing *crazy*, but it works well! In our template - `index.html.twig` -
change the `src` to `build/static/dumbbell.png`:

[[[ code('2052e370b7') ]]]

Also open `login.html.twig`: we have another `img` tag there too:

[[[ code('5659784fd9') ]]]

When we refresh, no nasty surprises this time! The image loads.

Next! Let's add some fanciness to our CSS... by using Sass...
