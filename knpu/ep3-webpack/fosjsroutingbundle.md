# FOS JS RoutingBundle

Open up our base layout: appresourcesviewsbase.html.twig. If you scroll down to the bottom here, in a perfect world, we would only have one js file, layout.js, but we actually still have two script files here. These are bringing in a routing file from FOS JsRouting Bundle. I told you to ignore that until now. When you include this first script tag, it creates a global routing variable. This second script tab actually injects all of the routing data into that object. That allows us, for example, in replogapp.js, to say routing.generate and then use the name of our route. Routing is that global variable. This is the last case where we are actually including an external script tag and relying on global variables, so I want to fix this.

Now, the kind of interesting thing about this JavaScript file is it doesn't come from a Node library, so it doesn't live inside of node-modules. It actually comes from a PHP library, and it lives way down here, in Vendor, Friends of Symphony, JsRouting Bundle, Resources, Public, js, router.js. That is actually the JavaScript file that we're currently including from the front end. Okay, so let's just try to require this instead. For example, I could say const routing = require, and the path is not going to be pretty here, but we can say ../../../vendor/friendsofsymphony/jsroutingbundle/resources/public/js/router. Phew.

It's not very pretty, but it makes sense. Right? Let's try that out. Refresh, and oh, it did not like that. Check this out. Type error. Cannot read property navigator of undefined. It's coming from router.js, line eight. Huh. If you check out this file, I'll hold command and click into it, you can see it's a minified file. Basically, the way this file is created is using a Google closure library, which is an older library that generates JavaScript that is completely incompatible with a module system. Basically, the way this is written out, we cannot require it normally. This is something that I hope will be fixed in that library soon. I know there's a pull request open for it, but as of this recording, we cannot require this.

That means we must continue to bring it in our base layout like this. Not ideal, but not that big of a deal. However, it does bother me a little bit that inside of my [inaudible 00:03:21] app.js, this is the one spot that where I am relying on global variables. I really want this file to be self contained. I want to have require statements that explicitly import anything that I'm using. Here is a little trick that I use, to make this not such a bad situation, and a situation where we could upgrade more easily in the future, once the library is updated. Inside of your components directory, create a new file called routing.js, and here, add module.exports = window.routing.

I had a little comment above this. Basically, we must remember to put the router.js script tag in our layout, but then, by creating this module, it at least gives us a module that we can require from the rest of our files, so that most of our code looks clean. If later, if the routing file suddenly is fixed, we only need to update this one spot to go require the new router file, and everything else in our code is still going to work just fine. In other words, in replogapp.js, I can now say const routing = require./routing. At least from the perspective of this file, I am actually requiring everything just the way I should.

I want to refresh. It still works, so a pretty good solution for now. Ideally, in the future, that library will be updated, and then we can require the correct module from this file instead of using the window variable.
