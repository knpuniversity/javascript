# Multiple Entries / Pages

Our simple site actually has two pages: this main "lift stuff" page, and also a login
page... which has *just* a little bit of its own JavaScript: a toggleable message
and an error if you get crazy and type a super-long username.

Open up the template: `app/Resources/FOSUserBundle/views/Security/login.html.twig`.
Yep, it has a `script` tag for `assets/js/login.js`: a traditional, non-webpacked
file:

[[[ code('a1afff40d7') ]]]

And... that's a bummer! I want Webpack to *also* process this file so I can remove
the self-executing function and require jQuery instead of *hoping* it's included
on the page:

[[[ code('05f4197363') ]]]

## Every Page is an App

Ok, let me paint you a picture. I want you to start thinking about every page that
has its own JavaScript as its own mini-*application*. Yep, from a JavaScript perspective,
we have a "login" application and also a "rep log" application. These two apps run
completely independent of each other, and each deserves its own, webpack-ified, built
file. Unless you're creating a true single-page app, this is your reality.

So let's Webpackify `login.js`! Start by removing the self-executing function:

[[[ code('cef664e7bf') ]]]

Then, since we're relying on the `$` variable, add `const $ = require('jquery')`:

[[[ code('8912995be9') ]]]

This file is ready!

## webpack.config.js & Multiple entry

Next, open `webpack.config.js`. We have a problem: we really only have the ability
to configure *one* entry file... which creates *one* output file:

[[[ code('74916a45f6') ]]]

How can we tell Webpack to *also* look at `login.js` and build a *second* file?
The secret is that `entry` can *actually* contain *multiple* things.

Copy the original path and set `entry` to `{}`:

[[[ code('29a3abf77b') ]]]

For the first entry, put `rep_log` as the key set to the copied path:

[[[ code('b8dd89efeb') ]]]

Then, repeat that for a new entry called `login` that points to our source `login.js` file:

[[[ code('f7b0e57364') ]]]

Woohoo! Webpack will now read these *two* entry files. To have it *output* two built
files, we need to change the `filename`. In place of `rep_log`, use a special placeholder:
`[name].js`:

[[[ code('c075e7cc4b') ]]]

The name is referring to the keys I created under `entry`: `rep_log` and `login`.
These could have been anything. For consistency, they match the source filenames,
but really, you can choose whatever you want. The only significance of these keys
is that they become the name of the final, dumped file.

You guys know the drill: we just made a change to `webpack.config.js`. And that means
it's time to stop the watch script with `Control`+`C` and restart it:

```terminal-silent
./node_modules/.bin/webpack --watch
```

Ah... yes! It dumped `login.js`. There it is, sitting beautifully inside `build/`.

In `login.html.twig`, make sure to update the `script` tag to point to `build/login.js`:

[[[ code('fbb7e6cbe0') ]]]

Then, head over to your browser and refresh the rep log page first. It still works.
Go to `/login`... and *it* works!

This was another *huge* step! We now have the power to create as many different
distinct JavaScript applications as we need.

## Adding the Layout Entry

In fact, surprise! We already have a *third* app. Inside `web/assets/js/`, in
addition to `login.js` and `rep_log.js`, we have a file called `layout.js`:

[[[ code('24f4818b9f') ]]]

It's pretty simple: it just activates Bootstrap tooltips across the site... which
is why we see some tool tips when we hover over parts of the header.

So yes, you can even think of the layout *itself* as a separate JavaScript application
that deserves its own entry.

Leave the self-executing function for now and skip straight to `webpack.config.js`.
Add a third entry called `layout`:

[[[ code('ced323f0fb') ]]]

Then, inside our base layout - `app/Resources/views/base.html.twig`, I'll change
the script tag to point to `build/layout.js`:

[[[ code('6895adafd3') ]]]

Let's go make that: `Control`+`C` the webpack script and restart it:

```terminal-silent
./node_modules/.bin/webpack --watch
```

Yes! It dumped `layout.js`. Refresh the page. Those tooltips are *still* kicking.

This is *wonderful*. But, we still have a few issues. Like, both `login.js` and
`rep_log.js` contain their *own* copies of jQuery. You can see the file sizes for
these are huge. We're actually making our user download jQuery *three* times: once
in each of these two files and a *third* time *still* via the `script` tag in our
layout. Geez.

That's something we *will* fix. I promise.

But first... we have a more immediate problem. When we refactor `layout.js` to use
proper `require` statements... we're in for a surprise.
