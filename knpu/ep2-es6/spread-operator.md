# The... Spread Operator

The second thing weird thing we need to talk about is much more important. It's
called the spread operator. Open up `play.js` and clear everything out. Let's create
a new function called `printThreeThings(thingOne, thingTwo, thingThree)`. Inside,
just `console.log` our three things. Easy enough!

Below that, create a new array called `yummyThings`, which of course naturally
should include pizza, gelato, and sushi. All delicious, but maybe you shouldn't eat
those all at the same time.

Here's the question: 

> How can I pass the three things yummy things as the first, second, and
> third argument to `printThreeThings()`?

Well, we *could* say `printThreeThings()` and then `yummyThings[0]`, `yummyThings[1]`
and `yummyThings[2]`. But in ES2015, you can use the spread operator:
`printThreeThings(...yummyThings)`. Woh.

If we try that, it prints our three things! That's crazy! The `...` is called the
"spread operator": it's always `...` and then your array. When you do this, it's
almost as if somebody went through and literally just wrote out all of the items
in your array manually, instead of us doing it by hand. It's a neat feature!

And of course, there are a lot of yummy things in the world, and since I'm from the
US, my `yummyThings` should probably have a cheeseburger.

So what will happen now? The array has *4* things, but we only have 3 arguments?
Let's find out! Run the script.

It's the *same* results! Thanks to the spread operator, `pizza` is passed as the
first argument, then `gelato`, `sushi` and finally, hamburger is passed as a 4th
argument. Since the function doesn't have a 4th argument, it's juts ignored!

## Spread Operator as an Array Merge

Ok great! But you're probably asking yourself: how could this ever be useful in
any real world scenario?

Dang, good question. Actually, there are two really great use-cases. One is in ReactJS.
I won't talk about it now... just trust me! The second deals with merging arrays
together.

Suppose we need to create another array called `greatThings`. And we decide that
`sunshine` is great, `swimming` is super great, and `sunsets` are the best. They
are the best. We also decide that anything "yummy" must also be great, so I want
to add all four of these `yummyThings` into the `greatThings` array. In PHP, we
would use `array_merge`. In JavaScript, one option is the spread operator. Add a
comma - as if we were going to add another entry - and then say `...yummyThings`.
We could even keep going and add something else great, like `New Orleans`. Because
`New Orleans` is a really great place.

***TIP
There are often many ways to do the same thing in JavaScript, especially with
arrays and objects. In this case, `greatThings.concat(yummyThings)` is also an
option.
***

Ok, `console.log(greatThings)` to see if it works! It does: `swimming`, `sunset`,
4 yummy things, and `New Orleans` at the bottom.

## Spread Operator for Creating a new Array

Oh, but there's one other related trick. At the bottom, add another variable:
`let copyOfGreatThings = greatThings`. Now, let's add something else to this new
variable: use `copyOfGreatThings.push()` to add something else that we *all* know
is great: `summer`. At the bottom, `console.log(copyOfGreatThings)`.

Here's the question: we know `summer` now lives in `copyOfGreatThings`. But does
it also now live inside of `greatThings`? Try it! it *does*! Summer now lives in
*both* arrays! This makes sense: arrays are *objects* in JavaScript, and just like
in PHP, objects are passed by reference. I *intended* to make a *copy* of the array,
but instead, we still have just *one* array, with two variables that point to it.

As we get more advanced, especially in React.js, the idea of not *mutating* objects
will become increasingly important. What I mean is, there will be times when it
wil be really important to truly *copy* an object, instead of modifying the original.

So how could we make `copyOfGreatThings` a *true* copy? The spread operator has
an answer: re-assign `copyOfGreatThings` to `[...greatThings]`.

And that's it! This will create a new array, and then put each item from `greatThings`
into it, one-by-one.

Try it! Yes! We can see summer in the copy, but we did *not* modify the original
array.

Ok, let's move into something that's *instantly* useful: template strings!