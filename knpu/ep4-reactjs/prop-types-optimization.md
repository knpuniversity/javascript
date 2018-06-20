# Removing propTypes on Production

The *whole* purpose of propTypes is to help us during development: they
don't add any actual functionality to our code. And, for that reason, some people
will *remove* the propTypes code when they build their assets for production. It's
not a big deal, it just saves some space.

This is *totally* optiona, but let's do it real quick! Google for
"babel-plugin-transform-react-remove-prop-types". Wow! First prize for longest name!

This is a Babel plugin that can propTypes. Copy the library name, find your terminal,
and install this:

```terminal
yarn add babel-plugin-transform-react-remove-prop-types --dev
```

While that's downloading, go back to its docs. Usually, this is configured via a
`.babelrc` file: this activates the plugin on the production environment. Except,
because we're using Webpack Encore, it handles the Babel configuration for us.

Fortunately, Encore gives us a hook to modify it. Add `.configureBabel()` and
pass this a function with one arg: call it `babelConfig`. Now, when Encore builds,
it will create our Babel configuration, then call this function so we can modify
it. We need to add a new `env` key, with this config below it. Copy the production,
plugins part. Then, add `babelConfig.env =` and paste. This is safe because, if
you logged the `babelConfig` object, Encore doesn't give it an `env` key. So,
we're not overriding anything.

Oh wait, actually, I made a mistake! This won't *quite* work, because we can't
rely on Babel knowing whether or not we're creating our production build. Instead,
use if `Encore.isProduction()`. Then, inside, add the plugin with
`babel.plugins.push()`, copy the plugin name, and paste!

Remove the stuff below. This is simpler anyways: *if* we're building for production,
add this handy plugin.

Ok, we're not going to build for production right now, but to make sure we didn't
break anything, go back to the terminal that runs encore, press Ctrl+C to stop
it, then restart:

```terminal-silent
yarn run encore dev-server
```

And... no errors! Later, when we execute `yarn run encore production`, the prop
types stuff won't be there.
