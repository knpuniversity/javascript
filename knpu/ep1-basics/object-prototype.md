# The Object prototype!

In `RepLogApp`, when we try to call `this.helper.calculateTotalWeight`, for some
reason, it doesn't think this is a function!

[[[ code('698420622c') ]]]

But down below, we can plainly see: `calculateTotalWeight` *is* a function! What
the heck is going on?

To find out, in `initialize`, let's log a few things: `console.log(this.helper)`
and then `Object.keys(this.helper)`:

[[[ code('2d0321b3f2') ]]]

The `Object.keys` method is an easy way to print the properties and methods *inside*
an object.

## Comparing the Helper object and new Helper instance

Do the same thing for `Helper` and `Object.keys(Helper)`:

[[[ code('0ecb4cba80') ]]]

Let's look at what the difference is between our *instance* of the `Helper` object
and the `Helper` object itself.

Ok, find your browser, refresh, and check this out! There's the `helper` *instance*
object, but check out the *methods* and properties on it: it has `$wrapper`. Wait,
so when we create a `new Helper()`, that *instance* object *does* have the `$wrapper`
property... but somehow it does *not* have a `calculateTotalWeight` method!

That's why we're getting the error. The question is why? Below, where we printed
the upper-case "H" `Helper` object, it prints out as a function, but in its keys,
it *does* have one called `calculateTotalWeight`. Oooh, mystery!

This can be very confusing. So follow this next part closely and all the way to
the end.

At this point, the `calculateTotalWeight` function is effectively still static. The
only way that we can call that method is by saying `Helper.calculateTotalWeight` -
by calling the method on the original, static object. We *cannot* call this method
on the instantiated instance: we can't say `this.helper.calculateTotalWeight()`.
It just doesn't work!

## Introducing the Prototype

To fix this, instead of adding the method via `Helper.calculateTotalWeight`, we
need to say `Helper.prototype.calculateTotalWeight`:

[[[ code('2a282e6cbb') ]]]

That weird little trick fixes everything. To test it easily, back up in `initialize()`,
let's try calling `this.helper.calculateTotalWeight()`:

[[[ code('2c3d5426c0') ]]]

This did not work before, but refresh! 157.5 - it works now!

The short explanation is that when you create objects that need to be instantiated,
you need to add its properties and methods to this special `prototype` key.

Once you've done that and create a `new Helper`, magically, anything on the prototype,
like `calculateTotalWeight`, becomes part of that object.

But, that superficial explanation is crap! Let's find out how this really works!
