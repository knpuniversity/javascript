# The Magical this Variable & currentTarget

Turning the icon red is jolly good and all, but since we'll soon make an AJAX call,
it would be *way* jollier if we could turn that icon into a spinning loader icon.
But, there's a problem.

After the trash icon, type "Delete":

[[[ code('260a3f6fa9') ]]]

Now we have a trash icon with the word delete next to it. Back in our JavaScript,
once again, `console.log()` the actual element that was clicked: `e.target`:

[[[ code('0c8226ebdd') ]]]

## e.target is Fooling Us!

Now, behold the madness! If I click the trash icon, `e.target` is a span. But if
I click the delete text, it's actually the anchor! Woh!

True to what I said, `e.target` will be the *exact* one element that originally received
the event, so click in this case. And that's a problem for us! Why? Well, I want
to be able to find the `fa` span element and change it to a spinning icon. Doing
that is going to be annoying, because if we click on the trash icon, `e.target`
*is* that element. But if we click on the word delete, then we need to look inside
of `e.target` to find the span.

## Hello e.currentTarget

It would be WAY more hipster if we could retrieve the element that the listener was
*attached* to. In other words, which `js-delete-rep-log` was clicked? That would
make it *super* easy to look for the `fa` span inside of it and make the changes
we need.

No problem! Change `e.target` to `e.currentTarget` and high-five yourself:

[[[ code('3f1b6c7c61') ]]]

Yep, this ends up being *much* more useful than `e.target`. Now when we refresh and click
the trash icon, it's the anchor tag. Click the delete icon, it's *still* the anchor
tag. No matter which element we *actually* click, `e.currentTarget` returns the original
element that we attached the listener to.

## Enter: this (versus currentTarget)

In fact, try this: `console.log(e.currentTarget === this)`:

[[[ code('cc1b2efd8b') ]]]

Refresh! And click anywhere on the delete link. It's *always* `true`.

There's a good chance that you've been using the `this` variable for years inside
of your listener functions to find the element that was clicked. And now we know the
true and dramatic story behind it! `this` is equivalent to `e.currentTarget`, the
DOM Element that we originally attached our listener to.

Ultimately that means that we can say, `$(this).addClass('text-danger')`:

[[[ code('cb38d7df56') ]]]

That will always add the `text-danger` link to the anchor tag.

And finally, we can *easily* change our icon to a spinner! Just use `$(this).find('.fa')`
to find the icon inside of the anchor. Then, `.removeClass('fa-trash')`,
`.addClass('fa-spinner')` and `.addClass('fa-spin')`:

[[[ code('2f3ea2b5f0') ]]]

Refresh! Show me a spinner! There it is! It doesn't matter if we click the "Delete"
text or the trash icon itself.

So, use the `this` variable, it's your friend. But realize what's going on: `this`
is just a shortcut to `e.currentTarget`. That fact is going to become *critically*
important in just a little while.

Now that we've learned this, remove the "delete" text... it's kinda ugly:

[[[ code('08f80f5868') ]]]
