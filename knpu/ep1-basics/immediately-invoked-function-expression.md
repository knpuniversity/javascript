# Immediately Invoked Function Expression!

Our code is growing up! And to keep going, it's really time to move our `RepLogApp`
into its own external JavaScript file. For now, let's keep this real simple: inside
the `web/` directory - which is the public document root for the project - and in
`assets/`, I'll create a new `js/` directory. Then, create a new file:
`RepLogApp.js`. Copy *all* of our `RepLogApp` object and paste it here:

[[[ code('fedec743c4') ]]]

Add a good old-fashioned `script` tag to bring this in:

[[[ code('0e49b73bcc') ]]]

If you don't normally use Symfony, ignore the `asset()` function: it doesn't do
anything special.

To make sure we didn't mess anything up, refresh! Let's add a few items to our list.
Then, delete one. It works!

# Private Functions in JavaScript

One of the advantages of having objects in PHP is the possibility of having *private*
functions and properties. But, that doesn't exist in JavaScript: everything is publicly
accessible! That means that anyone could call any of these functions, even if we
don't intend for them to be used outside of the object.

That's not the end of the world, but it *is* a bummer! Fortunately, by being clever,
we *can* create private functions and variables. You just need to think differently
than you would in PHP.

## Creating a Faux-Private Method

First, create a function at the bottom of this object called `_calculateTotalWeight`:

[[[ code('49f03157da') ]]]

Its job will be to handle the total weight calculation logic that's currently inside
`updateTotalWeightLifted`:

[[[ code('1472bf4529') ]]]

We're making this change *purely* for organization: my intention is that we will *only*
use this method from inside of this object. In other words, ideally, `calculateTotalWeight`
would be private!

But since *everything* is public in JavaScript, a common standard is to prefix methods
that should be treated as private with an underscore. It's a nice convention, but
it doesn't enforce anything. Anybody could still call this from outside of the object.

Back in `updateTotalWeightLifted`, call it: `this._calculateTotalWeight()`:

[[[ code('9eee09312e') ]]]

## Creating a Private Object

So how could we make this *truly* private? Well, you *can't* make methods or properties
in an object private. BUT, you can make *variables* private, by taking advantage
of variable *scope*. What I mean is, if I have access to the `RepLogApp` object,
then I can call any methods on it. But if I *didn't* have access to this, or some
other object, then of course I *wouldn't* be able to call any methods on it. I know
that sounds weird, so let's do it!

At the bottom of this file, create another object called: `var Helper = {}`:

[[[ code('2d04eaf58f') ]]]

Commonly, we'll organize our code so that each file has just one object, like in PHP.
But eventually, this variable *won't* be public - it's just a helper meant to be used
only inside of this file.

I'll even add some documentation: this is private, not meant to be called from
outside!

[[[ code('a47447f656') ]]]

Just like before, give this an initialize, function with a `$wrapper` argument.
And then say: `this.$wrapper = $wrapper`:

[[[ code('f0fef3d429') ]]]

Move the `calculateTotalWeight()` function into *this* object, but take off the
underscore:

[[[ code('2f88dd3f58') ]]]

Technically, if you have access to the `Helper` variable, then you're allowed
to call `calculateTotalWeight`. Again, that whole `_` thing is just a convention.

Back in our original object, let's set this up: call `Helper.initialize()` and
pass it `$wrapper`:

[[[ code('8b738c777f') ]]]

Down below, call this: `Helper.calculateTotalWeight()`:

[[[ code('26191a95a4') ]]]

Double-check that everything still works: refresh! It does!

But, this `Helper` object is *still* public. What I mean is, we *still* have access
to it *outside* of this file. If we try to `console.log(Helper)` from our template,
it works just fine:

[[[ code('2fdff99dde') ]]]

What I *really* want is the ability for me to choose *which* variables I want to make
available to the outside world - like `RepLogApp` - and which I *don't*, like `Helper`.

## The Self-Executing Function

The way you do that is with - dun dun dun - an *immediately invoked function
expression*. Also known by its friends as a *self-executing function*. Basically, that
means we'll wrap all of our code inside a function... that calls itself. It's weird,
but check it out: `(function() {`, then indent everything. At the bottom, add the
`})` and then `()`:

[[[ code('356902578e') ]]]

What?

There are two things to check out. First, all we're doing is creating a function:
it starts on top, and ends at the bottom with the `}`. But by adding the `()`, we
are immediately executing that function. We're creating a function and then calling
it!

Why on earth would we do this? Because! Variable scope in JavaScript is function
based. When you create a variable with `var`, it's only accessible from inside of the
function where you created it. If you have functions inside of that function, they
have access to it too, but ultimately, that function is its home.

Before, when we weren't inside of *any* function, our two variables effectively
became global: we could access them from *anywhere*. But now that we're inside of
a function, the `RepLogApp` and `Helper` variables are *only* accessible from inside
of this self-executing function.

This means that when we refresh, we get `Helper` is not defined. We just made the
`Helper` variable private!

Unfortunately... we also made our `RepLogApp` variable private, which means the code
in our template will *not* work. We still need to somehow make `RepLogApp` available
publicly, but not `Helper`. How? By taking advantage of the magical `window` object.
