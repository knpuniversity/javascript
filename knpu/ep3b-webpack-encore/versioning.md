# Asset Versioning & Cache Busting

There is *one* last thing I want to talk about, and it's one of my *favorite* features
in Encore. Here's the question: how can we *version* our assets? Or, even *more*
simple, how can we bust browser cache? For example, right now, if I change something
in `RepLogApp.js`, then of course Webpack will create an updated `rep_log.js` file.
But, when an existing user comes back to our site, their browser might use the old,
*cached* version! Lame!

## Enabling Versioning

This is a *classic* problem. But with Encore, we can solve it beautifully and
automatically! In `webpack.config.js`, first add `.cleanOutputBeforeBuild()`.
That's a nice little function that will empty the `public/build` directory whenever
you run Encore. Then, here's the key: `enableVersioning()`.

That's it! Because we just changed our config, restart Encore:

```terminal-silent
yarn watch
```

*Now* look at the `build/` directory. Woh! Suddenly, all of our files have a *hash*
in the filename! The hash is based on the file's *contents*: so whenever the file
changes, it gets a new filename. This is *awesome*! *Now* when `rep_log.js` changes,
it will have a new filename. And when we deploy to production, the user's browser
will see the *new* filename and load it, instead of using the old, cached version.

## Versioned Filenamed with manifest.json

Perfect! Except... we just broke *everything*. Find your browser and refresh. Yep!
It's horrible! And this makes sense: in the base layout, our `script` tag simply
points to `build/layout.js`. But this is *not* the filename anymore - it's missing
the hash part!

Of course, we *could* type the filename manually here. But, gross! Then, *every*
time we updated a file, we would need to update its script tag.

Here's the *key* to fix this. Behind the scenes, as *soon* as we started using Encore,
it generated a `manifest.json` file automatically. This is a map from the *source*
filename to the current *hashed* filename! That's great! If we could somehow tell
Symfony's `asset` function to read this and make the transformation, then, well...
everything would work perfectly!

And... yea! That feature exists! Open `config/packages/framework.yaml`. Anywhere,
but I'll do it at the bottom, add `assets:` then `json_manifest_path` set to
`%kernel.project_dir%/public/build/manifest.json`.

This is a built-in feature that tells Symfony to look for a JSON file at this path,
and to use it to lookup the *real* filename. In other words... just, refresh! Yea,
everything is beautiful again! Check out the page source: it's using the *hashed*
filename from the manifest file.

And if you change one of the files - like `layout.js`: add a `console.log()`... as
*soon* as we do this, Webpack rebuilds. In the `build/` directory - you might need
to synchronize it, but yes! It creates a *new* filename. When you refresh, the system
automatically uses that inside the source.

## Long-Lived Expires Headers

This is *free* asset versioning and cache busting! If you want to get *really*
crazy, you can also now give your site a performance boost! To do that, you'll need
to configure your web server to set long-lived `Expires` header on any files in
the `/build` directory. 

Basically, by setting an `Expires` header, your web server can instruct the browser
of each user to cache any downloaded assets... forever! Then, when the user continues
browsing your site, it will load faster because their browser *knows* it's safe to
use these files from cache. And of course, when we *do* make a change to a file in
the future, the browser *will* download it thanks to its new filename.

The exact config is different in Nginx versus Apache, but it's a common thing to
add. Google for "Nginx expires header for directory".

OK guys, I hope, hope, hope you love Webpack Encore as much as I do! It has even
more features that we didn't talk about, like `enableReactPreset()` to build React
apps or `enableVueLoader` for Vue.js. And we're adding new features all the time
so that it's easier to use front-end frameworks and enjoy some of the really amazing
things that are coming from the JavaScript world... without needing to read 100
blog posts every day.

So get out there and write amazing JavaScript! And I hope you'll stay with us for
our next tutorial about React.js & Symfony!

All right guys, seeya next time!
