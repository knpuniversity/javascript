# Babel

At the beginning of this tutorial, we talked about how when PHP releases a new version, the creators make it available for download. We all download it, we put it on our servers, we high-five, we're done.

Well the JavaScript [inaudible 00:00:13] it's not the same. When they release a new version of ECMAScript, it's just a standard. Unfortunately, we as developers then need to wait for all of the browsers to support those features, and for all of our lazy users to update their browsers. This is a huge problem in the JavaScript community, because it means they can't update and iterate very quickly.

So, they solved it with an amazing tool called Babel. Now before we get there, we need to do a little bit of installation. Now in the Node.js world, they have a package manager called NPM. You've probably heard of it before. It comes installed when you install Node. NPM is the composer for Node.js.

Now there's another package manager called Yarn, which you probably don't have installed yet. Yarn is a competitor to NPM. It would be as if somebody came and wrote a different library that competed with Composer. The really cool thing is they both use the same file to track their dependencies, so in PHP we have composer.json, in NPM, in Node, they have packages.json. Both Yarn and NPM use that same file.

This is a long way of saying that NPM and Yarn can both be used as a Node package manager, and you can use whichever one you want, and they effectively work the same. You could even have different people on your team using one, and other people using the other one.

We're gonna use Yarn, because it's a little bit more sophisticated, which means you need to install it. I'm on a Mac, so I already installed it via brew. Now in our project, in order to install Babel, we're gonna actually install it via Yarn right into our project, which means we need to have a packages.json file. We don't have one right now.

To create one, we're gonna say yarn init. It'll ask you a bunch of questions. You're gonna answer those however you want, and afterwards we magically have a package.json. Awesome.

The wonderful tool that is gonna fix all of our problems with browser compatibility is called Babel. Google for Babel and find babeljs.io.

Now of course we have been successfully using all of these new features in the latest Chrome version, but we can't trust that our users all have the latest Chrome version. Enter Babel.

Basically, Babel is able to look at new JavaScript, like ECMAScript 2015, and recompile it to old JavaScript, so that all browsers can understand it.

Let's go to Setup. In our case, for showing this off, we're gonna use the CLI, which means we'll be able to run Babel from the command line. Now check this out, in order to install Babel CLI, it says npm install --save-dev babel-cli. This is the name of the library.

Instead, since we're using Yarn, we'll use yarn add babel-cli --dev. That does its thing. Awesome.

This made a few changes to our project. Most importantly, added this dev dependencies, babel-cli. Yarn also includes a yarn.lock file. That's like the composer.lock file. The end result of running that command is that it added a node_modules directory, where it downloaded a bunch of stuff. That's the vendor directory for Node.

Actually, I'm gonna go into my .gitignore file right now, and down here I'm gonna ignore node_modules, because we don't need to commit that because with have the package.json and the yarn.lock file.

Okay, so let's use Babel. The way you use it is you can say ./node_modules/.bin/babel. That's the path to the executable for Babel. What you'll do is you'll just point that at our source file. Then we'll say -d and we'll tell it to put the finished file inside of a new web/assets/dist directory.

You can see that wrote a new ... Oh that's out of date. Damn it. It's -f isn't it? [inaudible 00:05:43]. Oh.

You'll have to use it by saying ./node_modules/.bin/babel, which is the path to the Babel executable. Then we'll pass the path to our source file, web/assets/js/RepLogApp.js, and then -o for output. Then we'll say put it in a new web/assets/dist/RepLogApp.js.

Before you run that command, go in your web_assets directory, make sure you create that new dist directory. Then you can run that, and boom. There is our new RepLogApp.js file.

Now before we look at it, let's go into our index.html.twig, and we're actually gonna point at our new dist version of that instead of our original one. We go over and refresh. It still works.

What's the difference between those two files? Let's actually look at the new version of it. If you look, it actually doesn't look any different. In fact, you can prove this by saying diff -u web/assets/js/RepLogApp.js. Let's compare that to web/assets/dist/RepLogApp.js.

As you can see, the differences are all very superficial. It's all just little coding standards. Little spaces here and not spaces there, but it didn't actually convert this to old JavaScript. You can see it's still using the arrow functions. Nothing significant actually changed. Here's the reason. As crazy as it sounds, by default, Babel does nothing. Babel actually is called a transpiler, which means it reads source code, and then actually dumps source code. Out of the box it doesn't make any transformations. We actually need to add a little bit of configuration to tell Babel to do the ECMAScript 2015 transformation to convert our code to old JavaScript.

This is actually something that they mention right on the installation page. Down at the bottom they tell you that you probably need something called the babel-preset-env. In Babel language, a preset is a transformation. If we want Babel to make the ECMAScript 2015 transformation, we need to install a preset that does that. The env preset is one of those that do that. There are actually other presets that can make other transformations, and we'll talk about that in the future.

Let's install this with Yarn. So yarn add babel-preset-env --dev. Perfect. Then in order for Babel to know to use that preset, at the [inaudible 00:09:18] project, we'll create a new .babelrc file. Babel will automatically read that file from whatever, as long as we run the commands in that directory. Inside here we can just say "presets":["env"], and that's it. This is taken right from their documentation here.

All right, so now let's try our command again. Then go back to our diff. Now there are big differences between these files. In fact, it looks almost like every single line changed. A better way is actually now to go look at the dist RepLogApp, and it's really interesting.

First at top it adds a couple of utility functions that it's gonna use down inside of our code. Then you can see instead of actually using the new class queuer, it calls its _createClass function, which is something that imitates the new class syntax. You can also see that our arrow functions are gone, and it's replaced them with classic anonymous functions.

There's a lot of really cool complexity going on, but we don't have to worry about any of this. It's done all the work for us to convert new JavaScript to old JavaScript. Now even if we did have an old browser, our code would work.

The one interesting thing you'll see in here, is notice it did not change our WeakMap. WeakMap is an object that's only available in ECMAScript 2015. It turns out that Babel's job is to change all of the language constructs to the old version. If there are new features like this, like new objects or new functions that you want to use, then you're gonna need to use something called a polyfill. Specifically, babel-polyfill. This is another JavaScript library that adds missing functionality, like our WeakMap, into JavaScript if it doesn't exist. We actually did this in the first episode, when we started using promises, we used a polyfill library for the promise.

Now in order to use this though, we're gonna need to go a little bit further and learn about something called webpack. That's the topic of our next tutorial, where we really take things to a big next level.

All right guys, I hope you learned tons about ECMAScript 2015. You can already start using it by using Babel, or if your users all have brand-new browsers, then you don't even have to worry about it. All right guys, I'll see you next time.
