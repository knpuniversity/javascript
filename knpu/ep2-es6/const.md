# const Versus let

The ECMAScript gods didn't stop with `let` - they added a *third* way to declare
a new variable: `var`, `let` and `cat`. Wait, that's not right - `var`, `let` and
`const`.

Back in our play file, remove the log and initialize the variable with `const`:

[[[ code('a350dae2a0') ]]]

As you're probably already guessing - and as you can see from PhpStorm being very
angry - when you initialize a variable with `const`, it can't be reassigned.

When we try this now, we get a huge error!

> TypeError: Assignment to constant variable.

But if we comment-out the line where we change the variable, it works just like we
expect:

[[[ code('f824d2f7fe') ]]]

As far as scope goes, `const` and `let` work the same. So really, `const` and `let`
are identical... except that you can't modify a `const` variable.

## You can Change a const?

Well actually, that's not completely accurate. Create another `const` variable called
`aGreatObject`. Inside it, set `withGreatKeys` to `true`. Below, *change* that object:
`aGreatObject.withGreatKeys = false`:

[[[ code('1c7b8749fb') ]]]

Log that object at the bottom:

[[[ code('e192cf2e7b') ]]]

Will this work?

Try it! It *does* work! The `withGreatKeys` property *did* change! Here's the truth:
when you use `const`, it's not that the *value* of that variable can't change. The
object *can* change. Instead, using `const` means that you cannot reassign the `aGreatObject`
variable to something else in memory. It must be assigned only once, to this object.
But after that, the object is free to change.

## var, let and const

Phew! Okay, in ES2015, `var`, `let`, and `const` *do* have some differences. But
a lot of the time, you will see people use one or the other purely based on personal
preference, or whatever is trendy that week. The differences are minor.

In our case, because you know I love to write hipster code, let's change each `let`
to `const`. Start at the top: `const $link` makes sense. We don't need to reassign
that. The same is true for `deleteUrl`, `$row`, `$form`, and `formData`:

[[[ code('86ead45c57') ]]]

Sure, we *modify* `formData`, but we know that's ok with `const`!

Keep going: `$form`, `fieldName`, `$wrapper`, `$error`... and eventually we get to
the last one: `totalWeight`. But this variable *can't* be set to a `const`: we set
it to 0, but then reassign it in each loop. This is a perfect case for `let`:

[[[ code('ffa8249906') ]]]

Let's take our app for a spin! Refresh! And try deleting something. Woohoo! Yep,
you can pretty much choose between `var`, `let` and `cat`, I mean, `const`.
