# Template Strings

All right, so one of the things that is always a bummer, especially in Java
Script, but also in pHp is concatenating scripts. I know, that doesn't sound
like that big of a deal. But for example, let's say that our favorite food is,
of course, gelato. And below that we're going to create another variable called
"I love Food" set to a complex sentence like "the year is" and then the current
year, so "new Data dot get full year". And then another plus, so quote open
space, and my favorite food is end single quote, plus, favorite food.

So perfectly straightforward and also perfectly ugly. And I even need to try
this to make sure that I didn't mess any spaces. Okay, looks good. So this is
the way that we used to do things inside of java Script, but thanks to
ECMAScript 2015, we now have something called Template Strings. And it's a
really cool idea. Instead of using single quotes, you use the tick mark. And as
soon as you do that, you're allowed to put variables inside of your string. So
I'll get rid of these single quote plus, and instead, you always start the
variable with dollar sign open curly. And then, over here when I'm done, I do
closing curly. And it means we can get rid of all this extra garbage of closing
and opening everything, and instead, we just always put dollar sign, open
curly, whatever expression we want, as you can see it's usually a variable
name, but we can do something more complicated. And it just works like that.

So there, we get the exact same thing. And you know there's one other
superpower of the template strings. And that is dealing with line breaks. So,
you remember from the first episode, we actually created a client side
template. And we used underscore dot js to render this template. And we put our
template right inside of twig. And then we read the idea off of this to get
this template, and then we render it inside of our rep log. And if you want to
see that all happens inside of add row. So here's the thing: why did we put the
template inside of twig?

Well, it's not a bad option but one of the reasons that we did this is that
putting a template inside of our java script file just wouldn't work. I mean,
let's try it. Let's copy our row here, let's go to the bottom of the file.
Let's add a new const row template. And I'm going to use the old method of
single quote. And then I'll add the paste, then I'll add single quote, semi
colon. And you can see, php storm is so angry with me right now. And that's
because, unlike php and java script, when you have strings with normal single
or double quotes, you're actually not allowed to have line breaks. That's
illegal. So it makes doing something like this, basically impossible.

Well fortunately, the template strings fix that. If we just change the single
quotes to ticks, everything is happy. And now the cool thing is is since we
have this inside of this java script file, we don't actually need it inside of
here anymore. We can simplify our code a little bit. And then up inside of our
at row function, we need to say var const tpl text equals row template. We
don't even need that variable, but I'll keep it that way for now. So nice.

So let's go a step further. Now that we have this nice ability to embed
variables into our strings like we maybe don't even need to use the underscore
templating engine anymore. Not that we should avoid it on purpose, but let's
see if we can do this entirely on our own. What I mean is let's just render
some variables inside of our row template. So what I'll do is, we'll do dollar
sign open curly, and then ultimately what I'm going to make available is a rep
log object. So we'll say rep log dot total weight lifted. And over here we'll
do closing curly. And now if I say there is no rep log variable right now, so
we're going to need to fix that.

And we'll just make the same change very carefully in all of the other spots.
Replacing the kind of uglier syntax that we had before with this new prettier
syntax. And one more down here with the lengths. And I feel like we need to be
careful, because, there we go. I like to keep those extra characters in there.

So this is a valid template string. Of course the problem is we don't have a
rep log variable. So if we refreshed right now, of course we're going to get
rep log is not defined. So the goal then is for us, down inside add row, to
somehow use that template string and pass it our rep log variable here. You
know the tricky part here is we need the rep log to be defined down here. So
I'm not really sure how we can do that. So, there's a really cool way of doing
this. Which is just to wrap our row template in a function. So instead of row
template simply being a string, let's turn it into a function. So we'll say
that as an argument rep log, we use it in a error function. And suddenly, row
template is now a function that takes a rep log argument. So when we call it,
we'll pass it to rep log, and it's going to use it down here.

So let's go back up to our add row. And we can get rid of all this stuff, very
simply, we can say html equals row template rep log. And that's it. Let's try
that out, refresh the page. And the fact that it even loaded means that it
works because that's used to build all over those rows. So really, really
powerful stuff. Now there's one other thing that you're going to see with
template strings, that you may or may not use, but if you don't understand it,
it might surprise you when you see it.

In your project you should have a tutorial directory, with an upper dot js file
that I've created. Go copy that function and then down at the bottom of the
file, paste it right before template. Now to use that function, right before
the tick, we're going to say the function's name, upper. So literally upper,
then without any spaces, the opening tick. Now this is weird, but basically
this is called a tag template. And effectively, the purpose of this is that now
all of the individual things that were printing are going to be passed into
this function so that we can put some sort of transformation on it. In
particular, this function upper is going to make all of our text go uppercase.
Other used cases for tagged templates might be for you to do html escaping, so
that you don't have xss attacks. So may or may not be something that you
actually use, and honestly these functions are a little bit complicated. I'm
actually using another ECMAScript 2015 operator that we didn't even talk about
called the spread operator. But if you do see these, I want you to know how
they work.

So now if we go back and refresh, everything goes into uppercase. And again,
that's happening because it's passing each of these as arguments into this and
it's setting them to uppercase. So that's not something we're going to use, but
just watch our for that syntax. So let's get rid of that, let's get rid of the
upper, and everything's back to normal.
