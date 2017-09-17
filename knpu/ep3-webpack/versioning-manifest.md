# Versioning manifest.json

Our `script` and `link` tags need to be updated for the new filenames. But... those
filenames are now constantly changing!

Hmm. We need a map: a map to treasure. But also, another map that translates each
original filename to the current, hashed filename. That map is called a *manifest*.
And a new library - `webpack-manifest-plugin` - can create it!

Copy the package name, then find your terminal. Install it!

```terminal
yarn add webpack-manifest-plugin --dev
```

Perfect! At the top of `webpack.config.js`, import that with
`const ManifestPlugin = require()` and then the library name:

[[[ code('4aed4315b1') ]]]

Below, in `plugins`, very simply, say `new ManifestPlugin()`:

[[[ code('7bdfc7f253') ]]]

That is it. Go stop webpack and restart it:

```terminal-silent
yarn dev
```

Ok, it dumped the same files... but now we have a new file: `manifest.json`!
This thing is perfect! It's a map from the original filename to the current, hashed
filename. It's *almost* as good as a treasure map! If we can get our server-side
code to read this map... we are in business!

## copy-webpack-plugin & manifest.json

Oh, and just a note: any files copied by the `copy-webpack-plugin` are *not* in the
manifest. They may add support for this to `webpack-manifest-plugin` in the future.
But right now, even though it *is* possible to add hashes to the copied filenames...
they won't show up in the manifest.

## Always emitting manifest.json

Oh, and quickly, add one option to the plugin: `writeToFileEmit: true`:

[[[ code('3fecdc90b7') ]]]

If you're using the `webpack-dev-server`, no files are written to `web/build`...
*including* `manifest.json`. With this option, that file is *always* written.
We need that... because we're about to read it inside our app!

## Reading manifest.json

Open up the base layout: `app/Resources/views/base.html.twig`. Whenever we reference
an asset filename, we wrap it in this `asset()` function:

[[[ code('46a1ca887f') ]]]

Thanks to that, in Symfony 3.3, we can configure a system that will look for that
filename in `manifest.json` and replace it with the hashed version!

To activate it, open `app/config/config.yml` and, under `assets`, add a key called
`json_manifest_path` set to `%kernel.project_dir%` - that points to the root of our
project - `/web/build/manifest.json`:

[[[ code('b7ecd3153d') ]]]

And... that's it! Go back and... refresh! It works! Wait.. no it doesn't! What's
up?

## The basePath Option

View the page source. Huh... it's still not using the hashed filename. When you
use the `json_manifest_path` system, it literally takes whatever string is passed
to `asset()` - so `build/layout.css` - and looks for that in `manifest.json`. Oh!
But the key is just `layout.css`: there is no `build/`! Can we add that prefix?
Yep! With an option called `basePath` set to `build/`:

[[[ code('21bd6e8a6a') ]]]

***TIP
In a future version of the plugin, you *may* need to also set `publicPath` to `build/`.
***

Re-run webpack:

```terminal-silent
yarn dev
```

Check out the manifest file. It's beautiful! And... refresh! Yes! It updates the
path perfectly! Guys! We have built-in versioning! Whenever we update our files,
Webpack will write a new filename and our app will use it.

This is *great*. But to take *full* advantage of it, you  need to configure your
web server to set a far-future `Expires` headers for everything in your `/build`
directory... except for `/build/static`.
