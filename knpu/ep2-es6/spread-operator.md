# The... Spread Operator

The second thing weird thing we need to talk about is much more important. It's
called the *spread operator*. Open up `play.js` and clear everything out. Create a
new function called `printThreeThings(thing1, thing2, thing3)`. Inside,
`console.log()` our three things:

[[[ code('78bf4b791a') ]]]

Easy enough!

Below that, create a new array called `yummyThings`, which of course naturally will
include pizza, gelato, and sushi:

[[[ code('0c9df2b1f4') ]]]

All delicious, but maybe not if you eat them all at the same time.

Here's the question: 

> How can I pass the three yummy things as the first, second, and third argument
> to `printThreeThings()`?

Well, we *could* say `printThreeThings()` with `yummyThings[0]`, `yummyThings[1]`
and `yummyThings[2]`. But! Not cool enough! In ES2015, you can use the spread operator:
`printThreeThings(...yummyThings)`:

[[[ code('6551e295c7') ]]]

Woh.

If we try that, it prints our three things! That's crazy! The `...` is called the
"spread operator": it's always `...` and then your array. When you do this, it's
almost as if somebody went through and literally just wrote out all of the items
in your array manually, instead of us doing it by hand.

But of course, there are a lot of yummy things in the world, and since I'm from the
US, my `yummyThings` should probably have a cheeseburger:

[[[ code('646dda7025') ]]]

What will happen now? The array has *4* things, but we only have 3 arguments?
Let's find out! Run the script!

It's the *same* result! Thanks to the spread operator, `pizza` is passed as the
first argument, then `gelato`, `sushi` and finally, cheeseburger is passed as the 4th
argument. Since the function doesn't have a 4th argument, it's just ignored!

## Spread Operator as an Array Merge

Ok great! But you're probably asking yourself: how could this ever be useful in
any real world scenario?

Dang, good question. Actually, there are two really great use-cases. One is in ReactJS.
I won't talk about it now... just trust me! The second deals with merging arrays
together.

Suppose we need to create another array called `greatThings`. And we decide that
`swimming` is super great, and `sunsets` are the best. They are the best. We also
decide that anything "yummy" must also be great, so I want to add all four of these
`yummyThings` into the `greatThings` array. In PHP, we might use `array_merge()`.
In JavaScript, one option is the spread operator. Add a comma - as *if* we were going
to add another entry - and then say `...yummyThings`. We could even keep going and add
something else great, like `New Orleans`. Because `New Orleans` is a really great place:

[[[ code('da1cf27983') ]]]

***TIP
There are often many ways to do the same thing in JavaScript, especially with
arrays and objects. In this case, `greatThings.concat(yummyThings)` is also an
option.
***

Ok, `console.log(greatThings)` to see if it works!

[[[ code('2f46fceec9') ]]]

It does: `swimming`, `sunset`, 4 yummy things, and `New Orleans` at the bottom.

## Spread Operator for Creating a new Array

But the spread operator has *one* more cool trick. At the bottom, add another variable:
`let copyOfGreatThings = greatThings`:

[[[ code('6bfe70cf45') ]]]

Now, add something else to this new variable: use `copyOfGreatThings.push()` to add something
that we *all* know is great: `summer`:

[[[ code('e82c2818a0') ]]]

At the bottom, `console.log(copyOfGreatThings)`:

[[[ code('c110d060bf') ]]]

Here's the question: we know `summer` now lives in `copyOfGreatThings()`. But does
it also now live inside of `greatThings`? Try it! It *does*! Summer lives in *both*
arrays! And this makes sense: arrays are *objects* in JavaScript, and just like
in PHP, objects are passed by reference. In reality, `greatThings` and `copyOfGreatThings`
are *identical*: they both point to the same array in memory.

As we get more advanced, especially in React.js, the idea of not *mutating* objects
will become increasingly important. What I mean is, there will be times when it
wil be really important to *copy* an object, instead of modifying the original.

So how could we make `copyOfGreatThings` a *true* copy? The spread operator has
an answer: re-assign `copyOfGreatThings` to `[...greatThings]`:

[[[ code('5db9a05190') ]]]

And that is it! This will create a new array, and then put each item from `greatThings`
into it, one-by-one.

Try it! Yes! We can see summer in the copy, but we did *not* modify the original
array.

Ok, let's move on something that's *instantly* useful: *template strings*!
