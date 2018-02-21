## Installing Encore

Hiya guys! And welcome to our tutorial on Webpack Encore! I have to admit, this
tutorial is near and dear to my heart, because I helped *write* Webpack Encore. But
also because I think you're going to *love* working with it and I *know* that it's
going to *drastically* improve the way you write JavaScript.

Basically, Encore is a wrapper around Webpack... because honestly, Webpack - while
*amazing* - is a pain to setup. And what does Webpack do? We'll get
to that.

## Setting up the Project

And when we do.... you're *definitely* going to want to code along with me. Because,
we're going to code JavaScript... dramatic pause... *correctly*!

Download the course code from this page. After you unzip it, you'll find a `start/`
directory that has the same code you see here. Follow the `README.md` file to get
setup details and, of course, a Haiku about Webpack.

The last step will be to find a terminal, move into the project, and run

```terminal
php bin/console server:start
```

to start the built-in web server. Find your most favorite browser and go to:
http://localhost:8000.

Aw yea, it's Lift Stuff! Our startup for keeping track of all of the stuff...
we lift! Login with username `ron_furgandy` password `pumpup`.

This is a two-page app: the login page and *this* incredible page: where we can record
that - while programming today - we lifted our cat 10 times. I *love* exercise!
Everything on this page works via AJAX and JavaScript... but the JavaScript is
pretty traditional. If you watched our Webpack tutorial, we've actually reset
this project back to *before* we introduced Webpack. Yep, in the `public/` directory,
there are some normal CSS and JavaScript files. Nothing special.

Oh, and this is a Symfony *4* application... but that won't matter much. For
you Symfony users out there, the only special setup I've done is to install the
Asset component so that we can use the Twig `asset()` function. On a fresh Symfony 4
project, run:

```terminal
composer require asset
```

to get it.

## The Magical require Statement

Ok... so what's all the fuss about with Webpack anyways? Well, the JavaScript file
that runs the main page is called `RepLogApp.js`. Look inside: it holds *two*
classes. If you haven't see the `class` syntax in JavaScript, go back and watch
[episode 2](https://knpuniversity.com/screencast/JavaScript-es6) of our JavaScript
series. It's cool stuff.

Anyways, we have a class `RepLogApp` and then.... way down below, we have `Helper`.
In PHP, we would *never* do this: we would organize each class into a different
file. But in JavaScript, that's a pain! Because, if I move this `Helper` code to
another file, then in my template, I need to remember to include a second `script`
tag. This is why we can't have nice things.

But... what if we could *require* files in JavaScript... just like we can in PHP?
Um... let's try it! Copy the Helper class, remove it, then - in the `js/` directory,
add a new file: `RepLogHelper.js`. Paste the class here - I'll remove the comment
on top.

You see, in Node - which is server-side JavaScript, they have this idea of *modules*.
Each file is a "module"... which doesn't mean much except that each file can export
a *value* from itself. Then, other files, um, modules, can *require* that file
to get that value.

In `RepLogHelper.js`, we really to make this `Helper` class available to other
files. To *export* it, at the bottom, add `module.exports = Helper`. Now,
in `RepLogApp`, at the top, add `const Helper = require('./RepLogHelper');`.

I want to highlight *two* things. First, you do *not* need the `.js` at the end
of the filename. You *can* add it... but you don't need it - it's assumed. Second,
the `./` *is* important: this tells the `require` function to look relative to this
file. Later, we'll find out what it means to *not* start with `./`.

So here's the reality: if we ran this code on the *server* via Node... it would
work! Yea! This `require` thing is real! But... does it work in a browser?

Let's find out! Move over, open the debugging console and... refresh! Oh man!

> require is not defined

Booo! So... the `require` function is *not* something that works in a browser...
in *any* browser. And, the thing is, it *can't* work. PHP and Node are *server-side*
languages, so Node can instantly read this file from the filesystem. But in a
browser, in order to get this `RepLogHelper.js` file, it would need to make an
AJAX request... and of course that's *far* from instant.

The point is: the `require` function just doesn't make sense in a browser. And *this*
is the problem that Webpack solves. Webpack is a command that can read this file,
parse through *all* of the require calls and create one final JavaScript file packed
with *all* the code we need.

But, we're not going to install Webpack directly. Google for "Webpack Encore" to
find its [documentation on symfony.com](https://symfony.com/doc/current/frontend.html).

## Installing Webpack Encore

Click into the Installation page and copy the `yarn add` line. And, some background:
Webpack is a Node executable, so you'll need to make sure it's installed. And second...
Node has *two* package managers: yarn and npm. You can use either - I'll use Yarn.
So make sure you have that installed too.

Then, find your terminal, open a fresh new tab, lift your cat, and then run:

```terminal
yarn add @symfony/webpack-encore --dev
```

If you're a Symfony user, there is also a composer line you can use. Actually,
all it *really* does is install a Flex recipe that creates a few files for you
to get you started faster. We'll do everything manually so that we can see how it
works.

Move back and... it's done! If you're new to Yarn, this did two things. First, it
created a `package.json` file - that's just like `composer.json` for Node - and
also a `yarn.lock` file - that's like `composer.lock`. Second, it downloaded everything
into a `node_modules/` directory: that's the `vendor/` directory for Node.

And *just* like in PHP, we do *not* want to commit all those vendor files. Open
your `.gitignore` file and ignore `/node_modules/*`.

Brilliant! Encore is installed. Let's do some webpacking!
