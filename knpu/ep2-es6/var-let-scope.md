# var vs let: Scope!

One of the most noticeable things in ES 2015 code is that - suddenly - instead of
seeing `var` everywhere... you're going to see something called `let`! In our JS
file, if you scroll down to the bottom, PhpStorm has highlighted my `var` with a
warning:

> var used instead of let or const

What's going on?

To find out, change `var` to `let` and then `console.log(totalWeight)`. Now, go
refresh. This function is called a *bunch* of times as the table is loading. And
it looks like everything is working fine. It looks like `var` and `let` are equivalent?

And basically, that's true! `let` is a new way to initialize a variable that's
*almost* identical to `var`. 99% of the time, you can use either one, and it won't
make a difference.

## Understanding the Scope of var

So what about that last 1%? Well, it has to do with variable *scope*. To understand,
go back to `play.js`. At the top, add something silly: `if (true)` then `aGreatNumber = 42`,
which of course, *is* a great number.

When we run it, it of *course* re-assigns the variable to 42. No surprises. But
what if we added `var aGreatNumber = 42`? I shouldn't need to say `var` again:
the variable has already been initialized. So, will this give us an error? Or change
anything?

Try it! The answer is... no! We still see 42. When we use the second var, it re-declares
a *new* variable. But it doesn't really make any difference: down below, it prints
the new variable's value: 42.

But now, wrap this *same* code in a self-executing function. Use the new arrow syntax
to be trendy, then execute it immediately. Will this change anything? Try it out!

Woh, it prints as *10*! What!? 

Remember, the *scope* of a variable created with `var` is whatever *function* it
is inside of. Let's follow the logic. First, we create the variable and set it to 10.
Then we create a *new* variable set to 42. But since this is inside of a function,
its scope is *only* this function. In other words, inside of the self-executing
block, `aGreatNumber` is 42. But outside, it's still 10. Since we're printing it
from *outside* the function, we see 10.

Okay okay, I know, this can be confusing. And most of the time... this subtle scope
stuff doesn't make any difference. But now we can easily see the difference between
var and let.

## The "Block" Scope of let

Let me show you. Remove the self-executing function and change each `var` to `let`.
*If* `let` and `var` behaved exactly the same, we would expect this - just like
before - to print 42. Try it.

But it prints 10! And this is the difference between `var` and `let`. With `var` -
just like with any variables in PHP - a variable's scope is the function it's inside
of, plus any embedded functions. But `let` is different: it's said to be "block-scoped".
That means that anytime you have a new open curly brace (`{`) - like an `if` statement
or `for` loop - you've entered a new scope for `let`. In this case, `let` is equal
to 42, *only* inside of the `if` statement. Outside, it's a completely different
variable, which is set to 10.

Of course, if we remove the extra `let` statement and try it, *now* we get 42. This
is because without the `let`, we're not creating a new variable, we're changing
the existing variable to 42.

If this is makes your head spin, that's okay. In practice, there are *very* few
situations where `var` and `let` behave different. So, use your favorite. But there
is *one* other tiny thing that makes me like `let`, and it deals with variable
hoisting.