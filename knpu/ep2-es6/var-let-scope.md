# var Versus let: Scope!

When you look at ES2015 code, one thing tends to jump out immediately: suddenly
instead of seeing `var` everywhere... you see something called `let`! In our JS
file, if you scroll down to the bottom, PhpStorm has highlighted my `var` with a
warning:

> `var` used instead of `let` or `const`

What's going on?

To find out, change `var` to `let` and then `console.log(totalWeight)`:

[[[ code('cfc043e9c9') ]]]

Now, go refresh. This function is called a *bunch* of times as the table is loading.
And... it looks like everything works fine. It looks like `var` and `let` are equivalent?

In most cases, that's true! `let` is a new way to initialize a variable that's
*almost* the same as `var`. 99% of the time, you can use either one, and it won't
make a difference.

## Understanding the Scope of var

So... what about that last 1%? Well, it has to do with variable *scope*. To understand,
go back to `play.js`. At the top, add something silly: `if (true)` then `aGreatNumber = 42`,
which of course, *is* a great number:

[[[ code('997da96c9b') ]]]

When we run it, it re-assigns the variable to 42. No surprises. But what if we added
`var aGreatNumber = 42`?

[[[ code('25d97028a1') ]]]

I shouldn't need to say `var` again: the variable has already been initialized.
But, will this give us an error? Or change anything?

Let's find out! No! We still see 42. When we use the second `var`, it re-declares
a *new* variable called `aGreatNumber`. But that doesn't make any real difference:
down below, it prints the new variable's value: 42.

But now, wrap this *same* code in a self-executing function. Use the new arrow syntax
to be trendy, then execute it immediately:

[[[ code('1ad1b94a65') ]]]

Will this change anything? Try it!

Woh! It prints as *10*! Why!?

Remember, the *scope* of a variable created with `var` is whatever *function* it
is inside of. Let's follow the code. First, we create the variable and set it to 10.
Then we create a *new* variable set to 42. But since this is inside of a function,
its scope is *only* this function. In other words, inside of the self-executing
block, `aGreatNumber` is 42. But outside, the original variable still exists, and
it's still set to 10. Since we're printing it from *outside* the function, we see
10.

Okay okay, I know, this can be confusing. And most of the time... this subtle scope
stuff doesn't make any difference. But, this is *exactly* where `var` and `let` different.

## The "Block" Scope of let

Let me show you. Remove the self-executing function and change each `var` to `let`:

[[[ code('94b7d16362') ]]]

*If* `let` and `var` behaved exactly the same, we would expect this - just like
before - to print 42. Try it.

But no! It prints 10! And this is the difference between `var` and `let`. With `var` -
just like with any variable in PHP - a variable's scope is the function it's inside
of, plus any embedded functions. But `let` is different: it's said to be "block-scoped".
That means that anytime you have a new open curly brace (`{`) - like an `if` statement
or `for` loop - you've entered a new scope for `let`. In this case, `let` is equal
to 42, *only* inside of the `if` statement. Outside, it's a completely different
variable, which is set to 10.

Of course, if we remove the extra `let` statement and try it, *now* we get 42:

[[[ code('0a3ba77bf7') ]]]

This is because without the `let`, we're no longer creating a new variable: we're
simply changing the existing variable to 42.

If this makes your head spin, me too! In practice, there are *very* few situations
where `var` and `let` behave different. So, use your favorite. But there is *one*
other tiny thing that makes me like `let`, and it deals with variable hoisting.
