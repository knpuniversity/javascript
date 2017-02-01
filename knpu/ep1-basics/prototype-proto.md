# prototype Versus __proto__

Suddenly, after adding `calculateTotalWeight` to some strange `prototype` key, we
can call this method on any new *instance* of the `Helper` object. But go back to
your browser and check out the first log. Huh, our helper instance *still* only has
one key: `$wrapper`. I don't see `calculateTotalWeight` here... so how the heck is
that working? I mean, I don't see the method we're calling!

## Hello __proto__

Check out that `__proto__` property. Every object has a magic property called
`__proto__`. And if you open it, *it* holds the `calculateTotalWeight` function.
Here's the deal: when you call a method or access a property on an object, JavaScript
first looks for it on the object itself. But if it doesn't find it there, it looks
at the `__proto__` property to see if it exists on *that* object. If it does, JavaScript
uses it. If it does not exist, it actually keeps going to the next `__proto__` property
*inside* of the original `__proto__` and tries to look for it there. It repeats
that until it gets to the top level. What you are seeing here is the top-level
`__proto__` that *every* object shares. In other words, these methods
and properties exist on *every* object in JavaScript.

Boy, if you think about it, this is a lot like class inheritance, where each `__proto__`
acts like a class we extend. And this last `__proto__` is like some base class
that *everything* extends.

## __proto__ and prototype?

Ok, so how does this relate to the `prototype` key in our code?

[[[ code('d86247e5ba') ]]]

Whenever you use the `new` keyword, anything on the `prototype` key of that object
becomes the `__proto__` of the newly instantiated object.

Ok, let's play with this!

Create a new variable called `playObject` set to an object with a `lift` key set
to `stuff`:

[[[ code('050d3df5f6') ]]]

Next, say `playObject.__proto__.cat = 'meow'`:

[[[ code('d9621cfe55') ]]]

You shouldn't *normally* access or set the `__proto__` property directly, but for
playing around now, it's great. Finally, `console.log(playObject.lift)`, which we
know will work, but also `playObject.cat`:

[[[ code('8a0657a2ea') ]]]

Ok, try it. Refresh! Hey, `stuff` and `meow`! That's the `__proto__` property in
action!

## Decomposing the String, Array and DateTime Object

And hey! Remember how I said that *everything* is an object in JavaScript, including
strings and arrays? Yep, that means that they *also* have an `__proto__`. This time,
`console.log('foo'.__proto__)` to see what methods and properties belong to a string
object. I wonder what things I can call on an array? Let's find out: `[].__proto__`.
And what about a `new Date()` object? Print its `__proto__` too:

[[[ code('b5aa33ae4a') ]]]

Let's see what happens! Refresh! Nice! Each is a big list of things that we can call
on each type of object. Apparently strings have an `indexOf()` method, a `match()`
method, `normalize()`, `search()`, `slice()` and a lot more. The Array has its own
big list. If you have a `DateTime` instance, you'll be able to call `getHours()`,
`getMilliseconds()` and `getMinutes()`, to name a few.

To compare, let's Google for "JavaScript string methods". Check out the
[W3Schools][string_object] result. This basically gives you the exact same information
we just found ourselves: these are the methods you can call on a string. The *cool* part
is that we now understand how this works: these are all stored on the `__proto__`
of each string object.

## Creating Multiple Instances

The *whole* point of this new constructor and `prototype` setup is so that we could
have multiple instances of our `Helper` object. The `prototype` is just the key to
take advantage of it.

To prove it all works, add `var helper2 = new Helper()` and pass it a different
`$wrapper`, like the footer on our page:

[[[ code('b7e5df9b0c') ]]]

Since the footer doesn't have any rows that have weight on it, this should return zero.
Log that: `this.helper.calculateTotalWeight()` and `helper2.calculateTotalWeight()`:

[[[ code('c25687454d') ]]]

Try that! Cool! 157.5 and of course, zero.

Here's the point of all of this: you *do* want to setup your objects so that they
can be instantiated. And now we know how to do this. First, set your variable to
a function: this will become the constructor:

[[[ code('fc37968d20') ]]]

And second, add any methods or properties you need under the `prototype` key:

[[[ code('a1e82e0b6d') ]]]

You *can* still add keys directly to `Helper`, and these are basically the equivalent
of static methods: you can only call them by using the original object name,
like `Helper.foo` or `Helper.bar`.

Let's keep going: we can organize all of this a bit better. And once we have, we'll
be able to make `RepLogApp` object a proper, instantiatable object... with almost
no work.


[string_object]: http://www.w3schools.com/jsref/jsref_obj_string.asp
