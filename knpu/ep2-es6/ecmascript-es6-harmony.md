# ECMAScript 2015 / ES6 / Harmony / Cookies

Welcome back! Oh man am I super excited about  this tutorial. In the first episode,
we dug deep into JavaScript: its great features, its weird features, and ultimately,
enough good stuff to start getting our code organized.

But, uh, I ignored a gigantic thing in the JavaScript world. I mean, *really* big,
like trying to stay cool when Godzilla is stomping on cars all around you! JavaScript...
has a new version... with a *ton* of new features and *significant* changes to the
language! And guess what? It's not even new anymore - it came out in *2015*! That's
all the more reason that it's time for us to understand what it brings. Because if
you eventually want to use a frontend framework like ReactJS, you *need* to know
this stuff!

## Project Setup

Before we dive in and meet Godzilla, you should *totally* code along with me. To do
that, use the download button on this page to get the course code. When you unzip
it, there will be a `start/` directory which will have the same code that I have
here. Check out the `README.md` file for witty banter and setup instructions.

The last step will be to open a terminal, go into the directory and run:

```terminal
php bin/console server:run
```

to start the built-in PHP web server. Find your browser and open `http://localhost:8000`.
You can login with `ron_furgandy`, password `pumpup`. Welcome back to `LiftStuff`.
Our app for keeping track of everything we lift during the day to stay in top shape.
This is a Symfony application, but that's not really important: almost everything
we've been doing lives inside a single JavaScript file called `RepLogApp.js`.

## New Shiny JavaScript Version?

Now, about this new JavaScript version. From time to time, *every* language comes
out with new versions. In our world, the PHP core team dreams up some new ideas,
writes a bunch of code, and then releases it. We all happily install the new version
on our servers and use the cool new stuff!

JavaScript is no different. Wait, that's not right! JavaScript is *totally* different.
When a new version of JavaScript comes out, well, what does that even mean? Because
there isn't just *one* JavaScript, there are many: Chrome has a JavaScript engine,
Internet Explorer maintains its own... crappy one, and of course, Node.js is *another*
JavaScript engine. So when the JavaScript community decides it wants to add a new
function... well, it can't! All it can *really* do is *recommend* that the new function
be added... and then wait for all the browsers to add it!

## There is only ECMAScript

Ok, the situation isn't *that* bad. But, JavaScript is not a language like PHP that
has one core code. In reality, JavaScript is nothing more than a *standard*. When
a new version of JavaScript is released, it simply means that the core group has said:

> Here are some functions and language changes that we think would make JavaScript
> more hipster. Now, quick, everyone go and implement these!

And guess what? The *language* isn't even called JavaScript! It's called ECMAScript.
And there is a group of smart people that work on new versions of ECMAScript. But
unlike PHP, that doesn't mean they're writing code: they're simply deciding *what*
should be included in the next version. Then, it's up to each browser and JavaScript
engine to implement that. But as we will learn later... some smart people in the JS
world have found a way *around* needing to wait for browser support...

## ECMAScript 2015?

Back to the story: in 2015 - after over *5* years of work - ECMAScript released a
new version. What's it called? Um, yea, it has a *bunch* of names: ES6, ECMAScript 6,
ECMAScript 2015, Harmony, or, to its closest friends, Larry. Ok, maybe nobody calls
it Larry.

The *official* name is ECMAScript 2015, though you'll even hear me call it ES6 because
it's the sixth version of ECMAScript.

As we'll learn, ES2015 comes with a lot of new functions and tools. But, more importantly,
it comes with new *language* constructs - new syntaxes that weren't allowed before.
In fact, it comes with *so* many new syntaxes, that if you look at a JavaScript file
that uses everything, you might not even recognize it as JavaScript. 

And that's not okay: because you and I, we need to be able to understand and write
modern JavaScript.

***TIP
There is already *another* new version of ECMAScript: ECMAScript 2016. But it only
contains a few, minor features.
***

So here's our mission: jump into the important stuff of ES2015 that will let us
understand, and *write* truly, modern JavaScript. Let's start with my absolute
favorite, game-changing feature of ES2015: arrow functions.
