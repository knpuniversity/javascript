# Require CSS!?

Oh, *before* we talk about CSS, I forgot to mention that these `public/build` files
do *not* need to be committed to the repository: we can rebuild them whenever we
want from the source files. So inside `.gitignore`, add `/public/build/*` to make
sure we don't commit those.

Ok: onto something more important! Go to `/login`. Thanks to some JavaScript, if
you type a really long username, a message pops up. The styling for this message
comes from `login.css`. This is included in the template: `login.html.twig`.

This makes sense: we have a script tag for `login.js` and also a link tag for
`login.css`. But remember: I want you to start thinking about your JavaScript
as an *application*... and application that can *require* its dependencies. And...
isn't this CSS a *really* of dependency of our app? I mean, if we forgot to include
include the CSS on this page, the application wouldn't *break* exactly... but it
would look horrible! Honestly, it would look like I designed it.

What I'm saying is: wouldn't it be *cool* if we could *require* CSS from right
inside our JavaScript?

## Requiring CSS

Whelp... surprise! We can! Inside `login.js`, add `require('../css/login.css')`.
We don't need to assign this to any variable.

So... what the heck does that do? Does that somehow magically embed it on our page?
Well, it's not *that* magic. Look inside the `build/` directory - you may need to
right click on it and click "Synchronize" to update it. Woh! Suddenly, there is
a new `login.css` file... which contains all of the stuff from our *source* `login.css`!

So here's what's happening: we point Webpack and our login entry file: `login.js`.
Then, it parses *all* of the require statements inside. For any required JS files,
it puts them in the final `login.js`. But it *also* parses the CSS files... and
puts any CSS it finds into a final file - called `login.css`.

Actually, the it's a bit confusing: the name `login.css` comes from the name of
the *entry*: `login`. Yep, each entry will cause one JavaScript file to be built
*and* - if any of that JavaScript requires a CSS file - than it will *also* cause
on CSS file to be created with the same name.

Of course, to use this in the template, we now need to update the link tag to be
`build/login.css`.

Let's try it - refresh! If you type a long name... it *still* works! And... bonus
time! When we talk about creating a *production* build later, this CSS file will
be automatically minified.

## Requiring the Layout CSS

So let's do this *everywhere*. Open `layout.js` and also the base layout: `base.html.twig`.
Look at the top: we have a *few* css files, the first is `main.css`.

In `layout.js`, require this: `../css/main.css`. As *soon* as we hit save, synchronize
the build directory again... yes! We have a *new* `layout.css` file! In `base.html.twig`,
update the `link` tag to use this.

Yep... everything still looks *fine*.

## Handling Images

But... wait! Something amazing just happened! Look inside `main.css`. Woh! We're
referencing a background image: `../images/dumbell-mini.png`. That's a problem!
Why? Because the final file lives in a completely *different* directory, so that
`../` path will *break*!

Ok... actually... it's *not* a problem. Webpack is amazing! It parses our CSS
looking for any background images or fonts. When it finds one, it *moves* it into
the `build/images/` directory and rewrites the path inside the final CSS file to
point here.

The point is: all *we* need to do is write our CSS files correctly and... well...
Webpack takes care of the rest!

## Requiring Bootstrap & FontAwesome CSS

We're on a roll! There are *two* CSS files left in `base.html.twig`: Bootstrap
and FontAwesome. You know the drill: require this! Remove the Bootstrap link tag
first. In `layout.js`, *above* `main.css`, so that our CSS overrides their stuff,
add `require()`... um... reuqire... what? If we just `require('bootstrap')`, that
will require the *JavaScript* file!

So... how can we include CSS files? Look in the `node_modules/` directory... and
scroll down to find `bootstrap`. Ah, ok. Inside, there is a `dist/` directory,
then `css/` and `bootstrap.css`.

A *little* bit of explanation: when you require the name of a module, Node reads
a special key in that package's `package.json` called `main` to figure out *which*
file to *actually* require. But, if you want to require a specific file... just
do it: `bootstrap/dist/css/bootstrap.css`.

This time, we don't need to make *any* other changes to `base.html.twig`: we already
have a `link` tag for `layout.css`, which has everything we need. To prove it, go
back and refresh! It's still beautiful!

Yep, the built `layout.css` *now* has Bootstrap inside. And actually, Bootstrap
itself references some fonts... and hey! There are now *fonts* in the `build/`
directory! Those are handling *just* like background images.

Ok: *one* more CSS File to remove: FontAwesome. Remove the `link` tag from the
layout first. Next, get that library installed:

```terminal
yarn add font-awesome@4 --dev
```

I added `@4` to make sure we get the version compatible with *this* project. Oh,
and how did I know to use `font-awesome` as the exact library name? I cheated:
I already used [npms.io](https://npms.io/) before recording to find what I needed.

Back in `layout.js`, require `font-awesome`. Oh, but we need to find the *exact*
file... ah! It looks like `css/font-awesome.css`: add that to the require.

And Webpack is happy! Try it out! Find the site and refresh! We still have our
Bootstrap CSS and... yes! Our little user icon from FontAwesome is there! And on
the homepage... yep! Those trash icons are from FontAwesome too.

Now, in `base.html.twig`, we're in *really* great shape! We have one CSS file
and one JS file. And *all* or dependencies are being require internally.
