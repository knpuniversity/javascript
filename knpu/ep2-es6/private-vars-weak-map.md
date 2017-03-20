# Private Variables & WeakMap

To see a real-world `WeakMap` use-case, go back into `RepLogApp` and scroll to the
top. Remember, this file holds two classes: `RepLogApp` and, at the bottom, `Helper`:

[[[ code('68adba2a1f') ]]]

The purpose of `Helper` is to be a private object that we can *only* reference from
inside of this self-executing function.

## Making Helper a Private Object

But check out the constructor for `RepLogApp`:

[[[ code('778c61be7d') ]]]

We set `Helper` onto a `helper` property. We do this so that we can use it later,
inside of `updateTotalWeightLifted()`. Here's the problem: the `helper` property
is *not* private. I mean, inside of our template, if we wanted, we could say:
`repLogApp.helper.calculateTotalWeight()`.

Dang! We went to *all* of that trouble to create a private `Helper` object... and
it's not actually private! Lame!

How can we fix this? Here's an idea: above the class, create a new `HelperInstance`
variable set to `null`:

[[[ code('dde55b131e') ]]]

Then, instead of setting the `new Helper` onto a property - which is accessible from
outside, say: `HelperInstance = new Helper()`:

[[[ code('6f3d3ae67a') ]]]

And that's it! The `HelperInstance` variable is *not* available outside our self-executing
function. And of course down below, in `updateTotalWeightLifted()`, the code will
now read: `HelperInstance.getTotalWeightString()`:

[[[ code('594e640724') ]]]

And just like that, we've made `Helper` truly private.

## Multiple Instances with Map!

Well... you might already see the problem! Even though we're not doing it here,
it *is* legal to create *multiple* `RepLogApp` objects. And if we *did* create two
`RepLogApp` objects, well the second would replace the `HelperInstance` from the
first! We can only ever have one `HelperInstance`... even though we may have
*multiple* `RepLogApp` objects. Bad design Ryan!

Ok, so why not use our cool new `Map` object to store a *collection* of `Helper`
objects? `let HelperInstances = new Map()`:

[[[ code('cf9c70fa9b') ]]]

In the `constructor()`, set the new object into that map: `HelperInstances.set()`...
and for the key - this may look a little weird - use `this`:

[[[ code('84a2d250ca') ]]]

In other words, we key this `HelperInstance` to *ourselves*, our instance. That
means that later, to use it, say `HelperInstances.get(this).getTotalWeightString()`:

[[[ code('876412932b') ]]]

This is awesome! `Helper` is still private, but now each `RepLogApp` instance will
have its own instance of `Helper` in the `Map`.

Just to prove this is not breaking everything, refresh! Woohoo!

## Playing with Garbage Collection

Time for an experiment! Go all the way to the bottom of the file. Create a new `RepLogApp`
object... and just pass in the `body` tag. Copy this and repeat it three other times:

[[[ code('15e93df081') ]]]

Notice that these are *not* being used: I'm not setting them to a variable. In other
words, they are created, and then they're gone: no longer referenced by anything.
Below that - and this won't make sense yet, call `setTimeout()`, pass it an arrow
function, and inside, `console.log(HelperInstances)`. Set that to run five seconds
after we load the page:

[[[ code('bba49ba3ba') ]]]

Mysterious!?

Ok, refresh! And then wait a few seconds... we should see the `Map` printed with
*five* `Helper` objects inside. Yep, we do! One `Helper` for each `RepLogApp` we
created.

But now, back in `RepLogApp`, after we set the `HelperInstance`, simply return:

[[[ code('e6832a7e5a') ]]]

This is a temporary hack to show off garbage collection. Now that we're returning
immediately, when we create a new `RepLogApp` object, it's not attaching any listeners
or adding itself as a reference to *anything* in the code. In other words, this object
is *not* attached or referenced *anywhere* in memory. Because of that, `RepLogApp`
objects - and their `Helper` objects - should be eligible for garbage collection.

Now, garbage collection isn't an instant process - it takes places at intervals,
and it's up to your JavaScript engine to worry about that. But if you're using Chrome,
you can *force* garbage collection! On the timeline tab, you should see a little
garbage icon. Try this: refresh! Quickly click the "collect garbage" button, and
then see what prints in the console.

Ok, so `HelperInstances` *still* has 5 objects inside. In other words, the Helper
objects were *not* garbage collected. Why? Because they are still being referenced
in the code... by the `Map` itself!

Now, change the `Map` to a `WeakMap`:

[[[ code('86d608e48c') ]]]

Go back and repeat the dance: refresh, hit the garbage icon, and then go to the
console. Woh! Check this out! The `WeakMap` is *empty*. Remember, this is its
superpower! Since none of the `RepLogApp` objects are being referenced in memory
anymore, both those *and* their `Helper` instances are eligible for garbage collection.
When you use `Map`, it prevents this: simply being *inside* of the `Map` counts as
a reference. With `WeakMap` that doesn't happen.

Ok, I know, this was still pretty darn advanced. So you may or may not have this use
case. But this is when you will see `WeakMap` used instead of `Map`. For us it means
we should use `Map` in normal situations... and `WeakMap` only if we find ourselves
with this problem.

Get rid of all our debug code:

[[[ code('1d2c854357') ]]]

And our page is happy again!
