# Static Class Methods

Go back and look at the new `get _selectors()` method:

[[[ code('3bb4721ca3') ]]]

Interesting: PhpStorm is highlighting it like something is wrong! If you hover
over it, it says:

> Method can be static.

In the first episode, we talked about how when you add your methods to the `prototype`,
it's like creating non-static methods on PHP classes:

```javascript
Greeter = function (greeting) {
    this.greeting = greeting;
}

Greeter.prototype.sayHi = function () {
    console.log(this.greeting);
}
```

In other words, when you create new instances of your object, each method has access
to its own instance properties:

```javascript
greeter = new Greeter('YO!');
greeter.sayHi(); // YO!
```

I also said that if you decided *not* to put a method on the `prototype`, that is
legal, but it effectively becomes static:

```javascript
Greeter = function (greeting) {
    // ...
}

Greeter.sayHi = function () {
    console.log('YO!');
}

Greeter.sayHi(); // YO!
```

If that didn't make a lot of sense then, it's okay. Because with the new `class` syntax,
it's *much* easier to think about!

PhpStorm is suggesting that this method could be static for one simple reason: the
method doesn't use the `this` variable. That's the same as in PHP: if a method doesn't
use the `this` variable, it could be made static if we wanted.

It's probably fine either way, but let's make this static! Add `static` before `get _selectors()`:

[[[ code('8868bcee06') ]]]

And as soon as we do that, we can't say `this._selectors` anymore. Instead, we need
to say `RepLogApp._selectors`:

[[[ code('b034893d65') ]]]

And that makes sense: in PHP, we do the same thing: we use the *class* name to reference
items statically. Let's change that in a few other places:

[[[ code('32bc7ad78e') ]]]

Perfect!

Time to try things! Refresh! Yes! No errors!

Let's see one more example: scroll *all* the way down to the `Helper` class. Create
a new method: `static _calculateWeight()` with an `$elements` argument:

[[[ code('abde1dc2e5') ]]]

This will be a new static utility method whose job is to loop over whatever elements I pass,
look for their `weight` data attribute, and then return the total weight:

[[[ code('b98cfcfe60') ]]]

We don't really *need* to make this change, but it's valid.

Now, in `calculateTotalWeight()`, just say: return `Helper` - because we need to reference
the static method by its class name `Helper._calculateTotalWeight()` and pass it the
elements: `this.$wrapper.find('tbody tr')`:

[[[ code('3aaa97ae9e') ]]]

Coolio! Try that out! And we *still* see the correct total.

And that is *10* times easier to understand as a PHP developer! Sure, JavaScript
still has prototypical inheritance behind the scenes... but most of the time, we
won't know or care.
