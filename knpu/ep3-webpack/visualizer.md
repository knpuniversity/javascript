# Visualizer

All right. Last part. Let's do something fun with Webpack. One of the things that was weird for me when I first started using Webpack is to stop thinking about exactly what files need to go in exactly which output file, and just to start thinking about building nice modules that require whatever they need. Webpack takes care of the rest.

However, there is sometimes, especially when working with your shared entry, where you might not really have an optimum setup. For example, you might have ... Maybe there's a module you're using over and over again that you should move into your commons entry, for us, layout.js. Or maybe you're requiring a huge library, and you only need to use a small part, and you don't realize it.

So one of the cool things is, you can actually get a visualizer to look at what your assets look like. Google for Webpack visualizer, and there's a fun one called ... by Chris Bateman.

So here's what we're going to do. We can actually run Webpack and tell it to dump a JSON file that describes our setup. So flip over to your second terminal tab, stop it. And we're actually going to manually run our long version of the command. So we're going to say NODE_ENV=production. And then, ./node_modules/.bin/webpack opacity --json >, and save that to a stats.json file.

So Webpack will run like normal, but its output is actually JSON. And it saves it to this cool stats.json file, which you see has errors, warning versions, and it just has tons and tons of information about all of the assets that it dumped out. I hit Q to get out of that.

Awesome. So now, we can flip back over to our browser. I'll click this box here and upload our stats.json file, and boom. Check this out. So here we have everything. If you go out a little bit, you can see that 97.6 percent of our JavaScript code is actually coming from stuff in node modules. So only this tiny chunk here which is coming from assets directory, which is interesting.  And then, as you go out, it describes the pieces in smaller and smaller portions. And then, notice up here, this is showing all chunks. You can also look specifically at specific JavaScript files that were dumped. This 02D here is actually our code split segment, but I'm going to look at everything.

Inside node modules, jquery actually takes up 39 percent. Something called core-js takes up 29.5 percent, which is really interesting. More on that in a second. And then, we have bootstrap-sass, sweetalert, and then css-loader. If you actually look, this is font-awesome. Makes sense, and then something called regenerator-runtime. And then, we have lodash over here.

So we have a couple of surprises here. The biggest one is this core-js. What the heck is that? What's going on with this core.js? Where did this come from? Well, if you do a little bit of digging, you'll find that this is actually coming from our layout.js file, and it's our babel polyfill. Remember, we included this so that we got the promise object, in case all the browsers don't have that.

Now, if you look inside of the babel polyfill ... I'm actually going to hold command and click this, and this moves us to node modules, babelPolyfill lib/index.js. You can actually that it is actually more or less just leveraging another library called core-js. And it's actually importing the entire thing. If you follow this shim file, that's going to import lots and lots and lots of things. So we've actually imported a huge library just to get the promise object.

So if promise is the only polyfill we need, we can actually do a much better job than this. Let's actually run yarn remove babel-polyfill, and then yard add core-js --dev. We're actually going to install that core-js library directly.

While we're waiting for that, I want you to Google for core-js, and you can see this is basically a library full of lots of polyfills for ES6, and also things like ES7 proposals and other things. Inside of here, you can see, here's ES6 polyfills. Here's ES7 plus polyfills, and even some other things. And do you see the one called ECMAScript 6, promise? And it's just showing you how to use the promise.

What we are really interested in is this common JS entry points. It's actually telling you, if you need the promise polyfill on your project, you can just include core.js/library/ES6 promise or this equivalent /fn/promise. It gives you a couple different ways to grab it.

In other words, in our layout.js file, instead of importing everything from babel-polyfill, we can actually say import core-js/library/es6/promise. And everything in our application is still going to be very happy.

Alright. So let's rerun our production Webpack and dump it to stats. All right. It's done, so let's flip over. I'll refresh our visualizer so we can get a fresh one. Upload our stats.json, and oh, way better. Now, jquery takes up 53%, not because it's taking up more, but because our package is so much smaller than bootstrap-sass, sweetalert. Core.js went from 30-something percent to 8.1 percent only. And then, font-awesome, lodash, and a couple other things.

So yeah, this is a great tool. I have discovered things in my project that were definitely not set up correctly. And by switching over to your other files, you might discover some other things that are not as efficient as they should be.

All right, guys, that is it. Thank you for sticking with me. Webpack is an amazing library, but it gives you so many ways just to shoot yourself in the foot. So I hope you feel very, very confident now, and I hope you'll join us for another tutorial that we will release on Webpack Encore, a library created by Symphony to help make all of this Webpack configuration easier, faster, and more bulletproof.

All right, guys. See you next time.

