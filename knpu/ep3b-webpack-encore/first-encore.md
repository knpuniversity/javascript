# Our First Encore

Create a new file: `webpack.config.js`. Here's how Webpack works: we create a config
file that tells it *which* file to load, where to save the final file, and a few
other things. Then... it does the rest!

But... Webpack's configuration is *complex*. A fully-featured setup will probably
be a few *hundred* lines of complicate config! Heck, our Webpack tutorial was over
3 hours long! Very simply: Encore is a tool that helps generate that complex
config.

## Setting up webpack.config.js

Click on the documentation to find the "First Example". Hey! A `webpack.config.js`
file to get us started! Copy that! Then, paste it in our file. But, I'm going to
simplify and delete a few things: we'll add this stuff back later. *Just* keep
`setOutputPath()`, `setPublicPath()` and `addEntry()`:

[[[ code('96634290a4') ]]]

And hey, check out that first line! Since this file will be executed by Node, we can
require stuff! This imports the `Encore` object:

[[[ code('df89c06748') ]]]

Then, at the bottom, we ask Encore to give us the final config, and we *export* it:

[[[ code('79287a0b08') ]]]

There are only *three* things we need to tell Webpack: the directory where we want
to save the final files - `public/build` - the public path to that directory - so
`/build` since `public/` is the document root - and an "entry":

[[[ code('87dcc04f7e') ]]]

Point this to our JavaScript file: `./public/assets/js/RepLogApp.js`. Change the first
argument to `rep_log`:

[[[ code('7eb60c4f53') ]]]

This tells Webpack to work its magic on `RepLogApp.js`. The first argument will be
the name of the final file, `.js` - so `rep_log.js`.

## Running Encore

And... that's it! Find your terminal. Encore has its own executable. To use it, run:

```terminal
./node_modules/.bin/encore dev
```

The "dev" part tells Encore to create a "development" build. And... cool! Two files
written to `public/build`. Let's check them out! Alright! There's `rep_log.js`. We'll
talk about `manifest.json` later.

Cool! Let's point our script tag at the new file. Open `templates/lift/index.html.twig`.
This is the template that runs our main page. At the bottom, change the path to
`build/rep_log.js`:

[[[ code('d4246bd2f7') ]]]

If you're *not* a Symfony user, don't worry, the `asset()` function isn't doing anything
special. Ok, let's try it! Find your browser and, refresh! Woo! It works! People, this
is *amazing*! We can *finally* organize JavaScript into multiple files and not worry
about "forgetting" to add all the script tags we need. The `require` function is
a *game-changer*!

If you look at the compiled `rep_log.js` file, you can see a bunch of Webpack code
at the top, which helps things work internally  - and... below, our code! It's not
minimized because this is a *development* build. We'll talk about production builds
later.

## Making PhpStorm Happy

If you're using PhpStorm like me, there are a few things we can do to make our life
*much* more awesome. Open Preferences and search for ECMAScript. Under
"Languages & Frameworks" -> "JavaScript", make sure that `ECMAScript 6` is selected.

Then, search for "Node" and find the "Node.js and NPM" section. Click to "Enable"
the Node.js Core library.

And *finally*, if you're using Symfony, search for Symfony. If you don't see a
Symfony section, you should *totally* download the Symfony plugin - we have some
details about this in a [different screencast][micro_app_phpstorm]. Make sure it's
enabled, and - most importantly - change the web directory to `public`. This will
give auto-completion on the `asset` function.

## Watching for Changes

Back to Encore! There's one *big* bummer when introducing a "build" system for
JavaScript like we just did: each time you change a file, you will need to re-run
Encore! Lame! That's why Encore has a fancy "watch" option. Run:

```terminal
./node_module/.bin/encore dev --watch
```

This will build, but now it's watching for changes! Let's just add a space here
and save. Yes! Encore *already* re-built the files. Stop this whenever you want
with `Ctrl`+`C`.

Oh, and since this command is *long*, there's a shortcut:

```terminal
yarn run encore dev
```

or, better... use the `--watch` flag:


```terminal-silent
yarn run encore dev --watch
```

## Build Notifications!

Great! But... sometimes... we're going to make mistakes. Yes, I know, it's hard
to imagine. Let's make a syntax error. Back at the terminal, woh! The build *failed*!
But if you weren't watching the terminal closely, you might not realize this happened!

No problem! Let's enable a build notification system! In `webpack.config.js`,
just add `enableBuildNotifications()`:

[[[ code('f38c0b7861') ]]]

The "watch" functionality has *one* weakness: whenever you update `webpack.config.js`,
you'll need to restart Encore before it sees those changes. So... stop it and run
Encore again:

```terminal-silent
yarn run encore dev --watch
```

Bah, error! Scroll up! Check this out, it says:

> Install `webpack-notifier` to use `enableBuildNotifications()`

And then it tells us to run a command. Cool! Encore has a *ton* of features... but
to stay light, it doesn't *ship* with the all of the dependencies for these optional
features. But, it's no problem: if you need to install something, Encore will tell
you. Copy that command and run:

```terminal
yarn add webpack-notifier --dev
```

Run encore again:

```terminal-silent
yarn run encore dev --watch
```

It works! And cool! A desktop notification. Now, make a mistake! Yes! An obvious
build error. Fix it and... build successful!

Ok, we've got a pretty sweet system already. But Webpack is going to let us do
*so* much more.


[micro_app_phpstorm]: https://knpuniversity.com/screencast/symfony/micro-app-phpstorm
