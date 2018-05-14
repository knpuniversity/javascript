# Building for Production

I *love* our new setup! So it's time to talk about optimizing our build files for
production. Yep, it's time to get serious, and make sure our files are minified
and optimized to kick some performance butt!

Because, right now, if you check out the size of the build directory:

```terminal-silent
ls -la public/build
```

... yea! These files are pretty huge - `rep_log.js` is over 1 megabyte and so is
`layout.js`! If you looked inside, you would find the problem *immediately*:

[[[ code('af8cd42a80') ]]]

jQuery is packaged individually inside *each* of these! That's super wasteful!
Our users should *only* need to download jQuery *one* time.

## The Shared Entry

No problem! Webpack has an *awesome* solution. Open `webpack.config.js`. Move the
layout entry to the top - though, order doesn't matter. Now, change the method to
`createSharedEntry()`:

[[[ code('c7279cdaac') ]]]

Before we talk about this, move back to your terminal and restart Encore:

```terminal-silent
yarn run encore dev --watch
```

Then, I'll open a *new* tab - I love tabs! - and, when it finishes, check the file
sizes again:

```terminal-silent
ls -la public/build
```

Woh! `rep_log.js` is down from 1 megabyte to 300kb! `layout.js` is still big because
it *does* still contain jQuery. But `login.js` - which was almost 800kb is now... 4!

What is this *magical* shared entry!? To *slightly* over-simplify it, each project
should have exactly *one* shared entry. And its JS file and CSS file should be included
on *every* page.

When you set `layout.js` as a shared entry, any modules included in `layout.js`
are *not* repeated in other files. For example, when Webpack sees that `jquery`
is required by `login.js`, it says:

> Hold on! `jquery` is already included in `layout.js` - the *shared* entry. So,
> I don't need to *also* put it in `login.js`.

It's a *great* solution to the duplication problem: if you have a library that
is commonly used, just make sure that you import it in `layout.js`, even if you
don't need it there. You can experiment with the right balance.

## The manifest.js File

As *soon* as you do this, if you refresh, it works! I'm kidding - you'll totally
get an error:

> `webpackJsonp` is not defined

To fix that, in your base layout, *right* before `layout.js`, add one more script
tag. Point it to a new `build/manifest.js` file:

[[[ code('b8c192282d') ]]]

The *reason* we need to do this is... well.. a bit technical. But basically, this
helps with long-term caching, because it allows your giant `layout.js` file to
*change* less often between deploys.

## Production Build

Ok, this is *great*, but the files are still *pretty* big because they're *not*
being minified. How can we tell Encore to do that? In your terminal, run:

```terminal
yarn run encore production
```

That's it! This will take a bit longer: there's more magic happening behind
the scenes. When it finishes, go back to your first open tab and run:

```terminal
ls -la public/build
```

Let's check out the file sizes! The development `rep_log.js` that *was* 310kb is
down to 74! Layout went from about 1Mb to 125kb. The CSS files are also way
smaller. Yep, building for production is just *one* command: Encore handles all
the details.

## Adding Shortcut scripts

Oh, and here's a trick to be even *lazier*. Open `package.json`. I'm going to paste
a new `script` section:

[[[ code('cc7b0aa23a') ]]]

This gives you different shortcut commands for the different ways that you'll run
Encore. Oh, we didn't talk about the `dev-server`, but it's *another* option for
local development.

Anyways, *now*, in the terminal, we can just say:

```terminal
yarn watch
```

Or any of the other script commands - like `yarn build` for production.

## How to Deploy

Talking about production, there's *one* last *big* question we need to answer: how
the heck do you *deploy* your assets to production? Do we need to install Node on
the production server?

The answer is.... it depends. It depends on how sophisticated your deployment system
is. Honestly, if you have a *very* simple deploy system - like a simple script,
or maybe even some commands you run manually - then the easiest option is to install
Node and yarn on your server and run `encore production` *on* your server after
pulling down the latest files.

I know: this isn't a *great* solution: it's a bummer to install Node *just* for
this reason. But, it *is* a valid option and *totally* simple.

A *better* solution is to run Encore on a *different* machine and then send the
final, built files to your server. This highlights an important point: after you
execute Encore, 100% of the files you need live in `public/build`. So, for example,
after you execute:

```terminal
yarn run encore production
```

you could send the `public/build` directory to your production machine and it would
work perfectly. If you have a "build" server, that's a *great* place to run this
command. Or, if you watched our [Ansistrano Tutorial][ansistrano_tutorial], you
could run Encore locally, and use the `copy` module to deploy those files.

If you have any questions on your specific situation, you can ask us in the
comments.


[ansistrano_tutorial]: https://knpuniversity.com/screencast/ansistrano
