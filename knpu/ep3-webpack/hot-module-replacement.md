# Hot Module Replacement

If you read the documentation about the webpack-dev-server, you'll read about HMR:
heavy metal rock. Or, actually, in this context, it means hot module replacement.
HMR is *amazing*: it allows Webpack to *update* your page... *without* refreshing!
But... you need to configure your system correctly to be able to do this. *And*,
unless you do even more setup, it only works for CSS. You *can* make it work for
JavaScript - especially if you're using a framework like React or Vue, but you won't
get it out of the box.

Anyways, let's get HMR working for CSS at least.

## Activating HMR: --hot

To activate it, stop the dev server and re-run it with a `--hot` flag... because
HMR is the hotness... and also because it stands for *hot* module replacement:

```terminal-silent
./node_modules/.bin/webpack-dev-server --hot
```

Go refresh the browser to reset things. Now, make a change to our CSS and move back
to the browser:

[[[ code('542162a2f7') ]]]

Huh, it *still* refreshed. It's not working!

## Webpack, AJAX and publicPath

Go to your browser's console, click the gear icon and check "Preserve logs". Thanks
to this, the console will *not* clear logs when the page reloads.

Refresh once more... wait for the page to load... and then clear the console. Go
make another change to the app, then move back. It says "App updated", "Recompiling",
but then it refreshes the whole page!

These messages are coming from the HMR system. And check this out: it says
"Checking for updates on the server", and then you see a *failed* request to
`http://localhost:8000`. Finally, it says "Cannot find Update" and it refreshes
the page.

What's going on? In addition to our built assets, the dev server - so `localhost:8080` -
serves a JSON file - this `*.hot-update.json` - with information about what was just
updated.

So, why is that failing? Well, since our site actually lives at `localhost:8000`,
when Webpack makes an AJAX call for this file, it makes it to `localhost:8000` instead
of `localhost:8080`. Internally, Webpack doesn't know that all of our assets are
being hosted on some other host!

This is actually more important than just the dev server. Sometimes - like with a
cool feature called code splitting that we'll see later - Webpack needs to make an
AJAX call back to the server. In order to do this, it *must* know what the public
URL is to your assets. Actually, we've already set this in `webpack.config.js`. In
the `output` section, we set `publicPath` to `/build/`:

[[[ code('997ef48051') ]]]

So... what's the problem? That *is* our public path, right? Not anymore! If you're
using the `webpack-dev-server` - or if you're using a CDN on production - this
`publicPath` must be absolute: it needs to include the host name where your assets
are *really* stored. This is used for any Webpack AJAX calls *and* also to point
to assets, like font files from inside CSS. That's why we saw some font file 404's
in the last chapter.

## Absolute publicPath

Let's fix this! Above the config, set two new variables. First, set `useDevServer`
to `true`:

[[[ code('bfaf7062dc') ]]]

That will allow us to easily turn this off later. Then, add `const publicPath =`.
If `devServer` is true, set this to `http://localhost:8080/build/`. Otherwise,
use the normal `/build/`:

[[[ code('116e62c59d') ]]]

Down below, use this variable for `publicPath`:

[[[ code('9c04519eef') ]]]

## Solving webpack-dev-server CORS problems

And while we're here, scroll down to `devServer` and add one new key called `headers`.
Add a single header: `Access-Control-Allow-Origin` set to `*`:

[[[ code('e34c7fa91d') ]]]

Since our *site* is served on a different host than our assets... well really a different
port... CORS security will prevent some requests from working. This header will
allow those requests to be made.

Phew! Restart the dev server one more time. Then, manually refresh the page to reset
everything. Clear out the log messages.

Ready for this? Go back to `main.scss`, make a change, then come back:

[[[ code('245058ef14') ]]]

It says "App updated", "Recompiling"... then a few other things. But... it did *not*
refresh! Did it work? I'm not sure! Let's make a more dramatic change: how about
2% to 99%:

[[[ code('b44089a3c8') ]]]

Move back to your browser. Wow! The button turns nearly black... *without* reloading!
This is HMR.

But, as I mentioned earlier, this will *only* work for CSS. You *can* get this to
work with JavaScript - especially if you're using a front-end framework, But, that's
beyond this tutorial.

Next! Let's move our app towards being ready for production, by fixing the annoying
CSS delay when we refresh.
