# Template Strings

You know what's always *kind of* a bummer... in any language? Creating strings that
have variables inside. I know, that doesn't sound like *that* big of a deal, but
it kind of is... especially in JavaScript!

For example, let's say that our favorite food is, of course, gelato:

[[[ code('e5dd0be465') ]]]

And below that, we want to create a string that talks about this: The year is, end quote,
plus, and then `new Date().getFullYear()`, another plus, open quote, space, my favorite
food is, another quote, one more plus, and `favoriteFood`:

[[[ code('568ce720e1') ]]]

Perfectly straightforward and perfectly ugly! At the bottom, log that:

[[[ code('8e9b3a0e47') ]]]

Now, go enjoy our finished work.

## ES2015: Nicer Strings!

This is the way we *used* to do things in JavaScript. But no more! Thanks to ES2015,
we now have something called Template Strings. And it's awesome. Instead of quotes,
use a tick. And as *soon* as you do that, you're allowed to put variables *inside*
of your string! Remove this single quote plus garbage. Replace it with `${`, the
variable name, then `}`. Then, remove *all* the ugliness!

[[[ code('573ecb1cbb') ]]]

Usually, you'll use this to print a variable, but you can use any expression you want:
like we just did with the date.

Try it out! Ah, the same, wonderful string.

## Template Strings and Line Breaks

There's something else that makes strings *especially* annoying in JavaScript:
line breaks. In the first episode, we created a client side template and used
Underscore.js to render it. We decided to put the template itself into Twig:

[[[ code('308906fd23') ]]]

Then, in `_addRow()`, we found that `script` element by its id and fetched the string:

[[[ code('81990f7449') ]]]

So, why did we put the the template in Twig? Well, it's not a bad option, but mostly,
we did it because putting that template into JavaScript was, basically, impossible.

Why? Try it! Copy the template, find the bottom of `RepLogApp.js`, create
a new `const rowTemplate` and paste the string inside single quotes:

[[[ code('388fc50149') ]]]

Oh wow, PHP storm is SO angry with me. Furious! And that's because, unlike PHP,
you are *not* allowed to have line breaks inside traditional strings. And that makes
putting a template inside of JavaScript basically impossible.

Guess what? Template strings fix that! Just change those quotes to ticks, and
everything is *happy*:

[[[ code('b55c708d6b') ]]]

To celebrate, remove the template from Twig:

[[[ code('d702743cf8') ]]]

Now, we can simplify things! Up in `_addRow()`, set `tplText` to simply equal `rowTemplate`:

[[[ code('0d89f48eec') ]]]

## Using Template Strings as a Template Engine

But let's go a step further! Now that we have this nice ability to embed variables
into our strings, could we create our *own* templating engine, instead of using
the one from Underscore? I mean, there's nothing wrong with Underscore, but we *can*
accomplish this with pure template strings.

First, update the template with `${repLog.totalWeightLifted}`. In a moment, instead
of making the individual variables available, we'll just set one variable: the
`repLog` object:

[[[ code('fbd8928aef') ]]]

Of course, PhpStorm is angry because there *is* no `repLog` variable... but we can
fix that!

Next, make the same change very carefully to the other variables: replacing the
kind of ugly syntax with the template string syntax. And yea, be more careful than
I am: I keep adding extra characters!

[[[ code('5737d4547e') ]]]

At this point, this is a valid template string... with one screaming problem: there
is no `repLog` variable! If we refresh now, we of course see:

> `repLog` is not defined

## Turning our Template into a Function

Here's the goal: inside of `_addRow()`, we need to somehow use that template string,
and pass it the `repLog` variable we have here. But... how can we make this variable
available... way down here?

Hey! Here's an idea: let's wrap this in a function! Instead of `rowTemplate` simply
being a string, set it to an arrow function with a `repLog` argument:

[[[ code('3d00af6d44') ]]]

And suddenly, the template string *will* have access to a `repLog` variable.

Back in `_addRow()`, remove all this stuff and very simply say
`html = rowTemplate(repLog)`:

[[[ code('281c616e8c') ]]]

And that is it! Try that out! Refresh! The fact that it *even* loaded proves it
works: all of these rows are built from that template.

## Tagged Template Strings

Before we move on, there's *one* other strange thing you might see with template
strings.

If you downloaded the start code for this project, you should have a `tutorial` directory
with an `upper.js` file inside. Copy that function. And then, at the bottom of
`RepLogApp.js`, paste it before the template:

[[[ code('c331c2046f') ]]]

Just follow me on this: right before the tick that starts the template string, add the
function's name: `upper`:

[[[ code('ae9c2128e5') ]]]

So literally `upper`, then without *any* spaces, the opening tick. This is called
a tagged template. And by doing this, the string and its embedded expressions will
be passed *into* that function, allowing it to do some transformations. In this case,
it'll upper case all the words.

Other *possible* uses for tagged templates might be to escape variables. But honestly,
the web seems to be filled mostly with *possible* use-cases, without too many real-world
examples. And also, these functions are really complex to write and even harder to
read!

Oh, btw, the `upper` function uses the spread operator in a different way: to allow
the function to have a variable number of arguments!

[[[ code('82d797a5ed') ]]]

Anyways, let's see if it works! Refresh! Hey, all uppercase! Ok, kinda cool! You
may not use tagged template strings, but you might *see* them. And now, you'll
understand what the heck is going on!

Remove the `upper` function and put everything back to normal:

[[[ code('60775e5da3') ]]]
