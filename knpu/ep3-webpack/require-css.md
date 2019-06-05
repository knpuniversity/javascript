# Require CSS Files

When you type a really long username on the login page, we give you a fancy error.
Hey! Stop making things so long!

Open this pages's template: `login.html.twig`. We include `build/login.js` and we
*also* include a CSS file: `login.css`:

[[[ code('0069a7a4cd') ]]]

That lives at `web/assets/css/login.css`. If we *forgot* to include this, the page
would look *terrible*. But, it's even more important than that! Our JavaScript adds
this error div to the page. And that element is *styled* thanks to code in `login.css`.

What I'm saying is: our "login app" *depends* on the `login.css` file... it's as
much of a *dependency* as any JavaScript files! But right now, we still need to
*remember* to include `login.css`. I want to stop doing that!

Instead, let's treat `login.css` like any other dependency: by *requiring* it.
I know it sounds crazy, but, at the top, add `require('../css/login.css')`:

[[[ code('a6e554ca0f') ]]]

What!? This is outrageous!!? Requiring a CSS file from JavaScript doesn't even
make sense! Or... does it?

## The css-loader

Go over to your terminal and find the watch tab. It's *so* angry!

> Module parse failed: login.css unexpected token.

It *tries* to open `login.css`... but surprise! It's not a JavaScript file, so Webpack
explodes! But, the error says a bit more:

> You may need an appropriate loader to handle this file type.

*This* is where Webpack becomes *incredible*. Webpack can load *more* than mere
JavaScript files. It can load anything! It can load CSS files, JSON files, HTML
files, image files from your vacation! Heck, you an even load *markdown* files or
Twig templates! Webpack can load *anything*... as long as you have a *loader* that
can read that file type.

In your browser, google for [css-loader][css_loader] and open its GitHub page.
Copy the name of the library: let's get it installed! In your open terminal, run:

```terminal
yarn add css-loader style-loader --dev
```

***TIP
To avoid incompatibility problems in further chapters make sure to install `css-loader`
version 0.28:

```terminal-silent
yarn add css-loader@0.28 --dev
```
***

We'll need `style-loader` in a minute.

Ok, when you try to require something that is *not* a JavaScript file, the job of
the loader is to somehow *convert* that file to JavaScript. I realize that still
doesn't make sense - "Convert a CSS file to JavaScript?" - but stay with me!

Back in `webpack.config.js`, add a *second* rule. This time with
`test: /\.css$/` and `use: ['css-loader']`:

[[[ code('03a0a77a63') ]]]

This is just a shorter syntax than the `loader` and `options` format we used above...
but it means the same thing.

To see what this *actually* does, open `login.js` and assign a new `css` variable
to the `require()` call. Then, `console.log(css)`:

[[[ code('e90aa2a976') ]]]

Because, if I'm telling you that *somehow* Webpack can *require* css files...
well... I'm curious. What does that mean? What will the `require` function *actually*
return?

Let's find out! Go over to your watch terminal, hit `Control`+`C`, and re-run webpack:

```terminal-silent
./node_modules/.bin/webpack --watch
```

Hey! No errors! Find the login page and refresh. First... yes, the page looks *really*
ugly. This should *not* work yet. But check out the console: our `css` variable is
a JavaScript *array*, and it includes all the css on one of its keys. Weird! The
`css-loader` converted our CSS into a JavaScript object... which is interesting...
but still not useful.

## Adding style-loader

But now, go back to `webpack.config.js` and, *before* `css-loader`, add `style-loader`:

[[[ code('97a8367609') ]]]

Remember how I said you can have *multiple* loaders? In this case, we're using
`css-loader` *and* `style-loader`. When you activate loaders with the *inline* syntax
we saw earlier, you read the loaders from right to left. Here, it's similar: read
the loaders from bottom to top.

So, this says: when we require a file ending in `.css`, first send its contents through
`css-loader` - which converts it to that JavaScript object - and *then* send *that*
through `style-loader`.

And what does `style-loader` do? Let's find out! Go back to your watch tab and
restart webpack:

```terminal-silent
./node_modules/.bin/webpack --watch
```

Ok, find your browser and refresh.

What!? It works! Our CSS is back... even though we don't have a link tag on the
page! The console logs an empty value.

But if you inspect the page and look in the head tag, there's a surprise: a new
`style` element with all our CSS. Yep! the style-loader's job is to package the
CSS *inside* `login.js`, along with some extra JavaScript that injects that CSS
onto the page in a `style` tag. It's *incredible*.

But, it does have one downside. Refresh and watch closely: the page is ugly for
just a moment, before the JavaScript loads. Then, it looks fine. But, for production,
that's a problem. Yep, `style-loader` is a *development-only* tool. But, I promise
to show you a proper, *great* solution for production later.

For now, celebrate! We can require CSS from our JavaScript! We are *truly* creating
self-contained JavaScript apps.

## Requiring CSS from node_modules

Remove `console.log` and the `const css =` part:

[[[ code('f1a4635d4c') ]]]

Let's require one more CSS file right now. Open `RepLogApp.js`. This uses `sweetalert2`,
which itself needs a CSS File:

[[[ code('eaa33fa784') ]]]

In `app/Resources/views/lift/index.html.twig`, we manually added a `link` tag
for that:

[[[ code('969c000637') ]]]

Get rid of it!

Go back to `RepLogApp`. Hmm, this is a little bit more interesting. We know how
to import the SweetAlert *JavaScript*: `require('sweetalert2')`. But, what about
the CSS file? Did yarn even download a CSS file when it installed SweetAlert?

Open up `node_modules/` and go all the way down to find `sweetalert2/`. Inside, there
is a `dist/` directory and - awesome! *It* has a `sweetalert2.css` file. How can we
require it? With `require('sweetalert2/dist/sweetalert2.css')`:

[[[ code('4f12f00320') ]]]

I'll talk more soon about requiring files in this way, but, it should make sense:
look in the `sweetalert2` directory and then go require `dist/sweetalert2.css`.

Go back to the "Lift Stuff" main page, and hit delete. I *love* it. I just love
it.

Let's keep going and require CSS across our *entire* app! When we do, we're going
to find a few surprises.


[css_loader]: https://github.com/webpack-contrib/css-loader
