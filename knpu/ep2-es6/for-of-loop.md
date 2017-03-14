# The for of Loop

One of the *crazy* things about JavaScript... is that there's not *one* good way
to loop over a collection! In PHP, we have `foreach`, and it works perfectly. But
in JavaScript, you need to create an ugly custom `for` loop. Well actually, there
*is* a `.forEach()` function, but it *only* works on arrays, not other loopable
things, like the Set object we'll talk about later. And, with `forEach`, there is
no `break` if you want to exit the loop early.

That's why we've been using jQuery's `$.each`. But guess what? ES2015 fixes this,
finally. Introducing, the `for of` loop!

It looks like this: `for (let repLog of data.items)`. And it's pretty easy to follow:
`repLog` is the new variable inside the loop, and `data.items` is the thing we want
to loop over. We're no longer passing this an anonymous function, so we can get rid
of everything else. That's it. Say hello to your new best friend: the for of loop.

Let's look for the other `$.each` spots and update those too! Instead, say
for `let fieldData of $form.serializeArray()`. Before, the anonymous function
received a key and *then* the `fieldData`. But, we didn't actually need the key:
the `$.each` function just forced us to add it. Now, things are cleaner!

Make this same change in two more places: for `$element of $form.find(':input')`.
Ah, don't forget your `let` or `var`.

Then, one more below: for `let $element of $elements`.

Oh, and PhpStorm is warning me because I forgot to remove one of my closing parentheses!
And, we don't need that semicolon! Yay!

So, use the `for of` loop for everything! Well actually, that's not 100% true. `for of`
is perfect when you want to loop over a collection of items. But, if you want to
loop over an *associative* array... or object, and you need to know the *key* for
each item, then you'll use `for in`. This is the one limitation of `for of`: it gives
you the *value* of the item you're looping over, but not its key, or index. In fact,
if try to use `for of` with an object, you'll get an error. So if you ever need to
do the equivalent of `foreach ($items as $key => $val)` from PHP, use `for in`. 

I know, I know, not *quite* as easy as PHP, but just remember these two things and
you'll be unstoppable!
