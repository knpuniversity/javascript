# Rocking Some NodeJS

I know this course is aimed at using JavaScript in a *browser*. Even still... we
need to talk about Node.js! If you haven't used it before, Node.js is basically
JavaScript... that you execute on your server! In the same way that we can write
a PHP file and run it... we can do the same thing with Node.js: write a JavaScript
file, execute it from the command line, and see the output!

So *why* are we talking about it? Well, it's going to give us a really easy way to
test out some of these new ES2015 features. And in the *next* tutorial on Webpack,
we'll be working with it even more.

## Creating a Simple Node.js Script

Step one for you is to install Node.js. Because I'm on a Mac, I've already installed
it using [Brew][brew]. If you don't have it installed, just check out their docs - it's
a bit different on every system.

Once you're ready, you should be able to execute `node -v` from the command line.
Ok, let's experiment! At the root of your project, create a new file called `play.js`...
because of course, Node.js is JavaScript!

Inside, use the familiar `console.log('OMG! Node is JS on the server!')`:

[[[ code('fa22de60a9') ]]]

Now, how do we run that? Simple:

```terminal
node play.js
```

Boom! And now we can start experimenting with new ES2015 features... without
needing to constantly refresh the browser. Let's play a bit more with our arrow
functions. Create a new variable called `aGreatNumber` set to 10:

[[[ code('e3afd03eac') ]]]

Then, call `setTimeout()` and pass it an arrow function. Inside, `console.log(aGreatNumber)`:

[[[ code('9ec62c1c94') ]]]

Delay that call for 1 second, and, at the bottom, just log `waiting`:

[[[ code('639f81be2f') ]]]

Head back to the terminal and run that! It prints, waits and prints! Sweet!
Now let's go learn about `let` and `const`!


[brew]: https://brew.sh/
