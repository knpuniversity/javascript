# Array Destructuring

Let's talk about two kinda *weird* things. At first, these next two things may not
seem *all* that useful. But even if that *were* true, you're going to start to see
them *a lot*, even in PHP, so we need to understand them!

## Destructuring

The first has a cool name: destructuring! In `RepLogApp`, find `_addRow()`. To start,
just dump the `repLog` variable.

Now, refresh! This is called a *bunch* of times, and each `repLog` has the same
keys: `id`, `itemLabel`, `_links`, `reps` and `totalWeightLifted`. Destructuring
allows us to do this weird thing: `let {id, itemLabel, reps} = repLog`. Below, log
`id`, `itemLabel` and `reps`.

Yep, this weird line is actually going to create three *new* variables - `id`,
`itemLabel`, and `reps` - set to the value of the `id`, `itemLabel` and `reps`
keys in `repLog`.

Let's see it in action: refresh! Got it! This is called destructuring, and you can
even do it with true arrays, which looks even stranger. In that case, the variables
are assigned by position, instead of by name. Oh, and side-note, PHP7 introduced
destructuring - so this also exists in PHP!

## Destructuring & Default Values

What if we try to create a variable that does *not* match a key, like, I don't know,
`totallyMadeUpKey`. Try to print that. What will happen now?

It's not an error: it just prints as undefined. Destructuring is friendly: if something
goes wrong, it doesn't kill your code: it just assigs undefined. If you think this
might be possible, you can give that variable a default, like `whatever`. Now, if
the key doesn't exist, it'll get set to `whatever`.

So, this is destructuring. It may or may not be useful for you, but you *will* see
it in code: don't let it surprise you!
