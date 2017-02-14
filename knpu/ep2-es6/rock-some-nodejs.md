# Rocking Some NodeJS

Look, I realize that this course is aimed at using JavaScript in a *browser*. But
even so, we still need to talk about Node.js! In case you haven't used it before,
Node.js is JavaScript that you execute on your server. We all know that we can write
a PHP file, execute it on our server, and see whatever it prints out. Well, you can
do the same things with Node.js: write a JavaScript file, execute it from the command
line, and see some output!

So why are we talking about it? For this tutorial, it's going to be a handy way to
test out some new features. But in the *next* tutorial on Webpack, we'll be working
even more with Node.js.

## Creating a Simple Node.js Script

Step one for you is to install Node.js. Because I'm on a Mac, I've already installed
it using [Brew](http://brew.sh/). If you don't have it installed, just check out
their docs.

One you're ready, you should be able to execute `node -v` from the command line.
Ok, let's experiment! At the root of your project, create a new file called `play.js`...
because of course, Node.js code is JavaScript!

Inside, use the familiar `console.log('OMG! Node is JS on the server!')`.

How do we run that? Simple:

```terminal
node play.js
```

Boom! And now we can easily start experimenting with new ES6 features... without
needing to constantly refresh the browser. Let's play a bit more with our arrow
functions. I'll create a new variable called `aGreatNumber` set to 10. Then, call
`setTimeout` and pass it an arrow function. Inside, `console.log(aGreatNumber)`.
Delay that call for 1 second. At the bottom, just log `waiting`.

Head back to the terminal and try it out! It prints, waits and then prints! That
proves Node.js is all setup. So let's go learn about let and const!
