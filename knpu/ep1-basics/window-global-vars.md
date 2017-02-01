# The window Object & Global Variables

Now that we're using this fancy self-executing function, we don't have access to
`RepLogApp` anymore:

[[[ code('4f060a5d7c') ]]]

How can we fix that? Very simple. Instead of `var RepLogApp`, say `window.RepLogApp`:

[[[ code('bc4b09aa4e') ]]]

Back in the template, I'll delete the `console.log()` for Helper:

[[[ code('608f3dce22') ]]]

And then go back and refresh. It works! No error in the console, and delete does
its job!

## What is this window?

So what the heck just happened? Here's the deal: when you're executing JavaScript
in a browser - which for you is probably always - you always have access to a global
`window` variable. In fact, it's even more important than that. This `window` variable
*holds* all of the global variables. What I mean is: if you set a key on the `window`
object, like `RepLogApp`, this becomes a global variable. That means you can reference
`RepLogApp` from *anywhere* else, and this is *actually* referencing `window.RepLogApp`.
More on that in a second.

## Passing Yourself Global Variables

Inside of our self-executing function, we - of course - also have access to any global
variables, like window or the `$` jQuery variable. But, instead of relying on these
global variables, you'll often see people *pass* those variables *into* the function.
It's a little weird, so let's see it.

Right now, inside of our self-executing function, we're using two global variables:
`window` and `$`, for `$.ajax`, for example:

[[[ code('64599cc046') ]]]

At the bottom of the file, between the parentheses, reference the global `window`
and `jQuery` variables and pass them as *arguments* to our function. On top, add
those arguments: `window` and `$`:

[[[ code('13bd267582') ]]]

Now, when we reference `window` and `$` in our code, we're no longer referencing
the global objects directly, we're referencing those arguments.

Why the heck would you do this? There are two reasons, and neither are *huge*. First,
you can alias global variables. At the bottom, we reference the `jQuery` global variable,
which is even better than referencing `$` because sometimes people setup `jQuery`
in no conflict mode, where it does *not* create a `$` variable. But then above,
we alias this to `$`, meaning it's safe inside for us to use that shortcut. You probably
don't have this problem, but you'll see stuff like this in third-party libraries.

Second, when you pass in a global variable as an argument, it protects you from
making a really silly mistake in your code, like accidentally setting `$ = null`.
If you do that now, it'll set `$` to `null` only inside this function. But before,
you would have overwritten that variable *globally*. It's yet another way that
self-executing blocks help to sandbox us.

## Fun with window

Ok, back to this mysterious `window` variable. Inside `index.html.twig`, `console.log()`
`window`:

[[[ code('8a41386dc1') ]]]

This is pretty cool, because it will show us *all* global variables that are available.

And Boom! This is a *huge* object, and includes the `$` variable, `jQuery`, and eventually,
`RepLogApp`.

But notice what's *not* here. As expected, there is no `Helper`. 

## Forget var? It goes Global!

Now, go back into `RepLogApp`, find `Helper`, and remove the `var`:

[[[ code('6ffc55d013') ]]]

You've probably been taught to *never* do this. And that's right! But you may not
realize exactly what happens if you do.

Refresh again and open the `window` variable. Check this out! It's a little hard
to find, but all of a sudden, there *is* a global `Helper` variable! So if you
forget to say `var` - which you shouldn't - it makes that variable a global object,
which means it's set on `window`.

There's one other curious thing about `window`: if you're in a global context where
there is no `this` variable... then `this` is actually equal to `window`:

[[[ code('f43457f4eb') ]]]

If you refresh, this expression returns true. Oh JavaScript!

## Be Better: use strict

Back in `RepLogApp`, forgetting `var` is actually a mistake, but JavaScript is friendly,
and it allows us to make mistakes. In real life, friendly and forgiving people are
great friends! In programming, friendly and forgiving languages mean more bugs!

To tell JavaScript to *stop* being such a pushover, at the top of the `RepLogApp.js`
file, inside quotes, say `'use strict'`:

[[[ code('a26af1496d') ]]]

***TIP
Even better! Put `'use strict'` inside the self-executing function. Adding `'use strict'`
applies to the function its inside of and any functions inside of that (just like
creating a variable with `var`). If you add it outside of a function (like we did),
it affects the entire file. In this case, both locations are effectively identical.
But, if you use a tool that concatenates your JS files into a single file, it's safer
to place `'use strict'` inside the self-executing function, to ensure it doesn't affect
those other concatenated files!
***

I know, weird. This is a special JavaScript directive that tells your browser to
activate a more strict parsing mode. Now, certain things that *were* allowed before,
will cause legit errors. And sure enough, when we refresh, we get:

> Uncaught reference: Helper is not defined

Sweeeet! Even PhpStorm isn't fooled anymore, it's reporting an:

> Unresolved variable or type Helper

Re-add `var`, and life is good!

[[[ code('81017de9f8') ]]]
