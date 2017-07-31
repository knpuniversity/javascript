# Watch JQuery Sweet Alert

The downside of using something like Webback or anything that builds your assets, is that every time you make a change, you have to run Webback again to see those changes. Obviously, that's not going to work. Like many tools, Webback has a watch built in. Right now if I click delete, it says, "Delete this log." Now, I'm actually going to run Webback with a dash, dash, watch flag. It will do the same thing, it will dump the assets, but now it's watching for file changes.

If at ReplogApp.js, let's add a couple more question marks to delete this log. Save. Refresh. Instantly get that change.

It's nothing too special to Webback, but it's something that you need, and it's really easy to do. Our terminal even shows, that dumped out our new asset.

All right, let's turn to a really important and powerful new tool that we've just unlocked. Which are N-P-M packages. Now check this out. Right now this ReplogApp only works because jquery is available globally. We have a self executing block here, which expects Jquery to be a global variable by the time that this file is executed. That works, because in our base layout, at Resources views base.html.twig, in our layout we're including Jquery. Normally when you include Jquery, it actually creates a Jquery and dollar sign global variable, and that's how we use it everywhere else in our application.

This is the classic problem, whenever we write Java script, our Java script does not self contain. We always need to be very careful to make sure that we have any dependent script log included and included before we include our Java script. This is a very error prone process. We don't need to do it any more with Webback. Instead, we want to make Rep log app use require statements to bring in everything it needs, including Jquery.

Check this out. We've already opened up a third terminal tab. We've already used yarn to install Webback itself. We can also use yarn to install other libraries, like [inaudible 00:02:59] libraries that we want. Try yarn add Jquery dash dash dev.

Just like that, Jquery now lives inside our application. That's great. Before Webback, we still have the problem of how do we actually pull this into our application, but not anymore. The top of Replogapp.js, just say const$ = require 'jquery'. Now we can remove the dollar sign from our self executing function and our jquery call, jquery argument down at the bottom.

Basically, now the dollar sign variable will be assigned to the jquery module returns, and that's actually what we're going to use whenever we reference dollar sign down inside our code.

Now there are two very important things that just happened. Notice that our require does not start with a dot slash. When you're require does not start with a dot slash, it either looks for a core node module, like the path module that we saw earlier in our Webpack and [Fig 00:04:15] file, or it looks for something in your node modules directory. In this case, jquery.

The second very, very, very important thing is that jquery acts different depending on whether or not it's being included with a traditional script tag, like in our layout, or if it's being required by a module system. This is something that is very common in this world.

Our whole command had actually clicked into the Jquery file. It's a little hard to read. But up here you can see if type of module equals equals object, and type of module.exports equals equals objects, it makes something different. Basically what you're seeing here is jquery is detecting whether or not it is being used inside of a module environment called a common JS environment.

If it is, instead of creating a global Jquery variable, it actually just adds it to the module.exports. This means that requiring Jquery returns the Jquery variable, but does not actually create a global variable. Most libraries now work like this. All right, let's try it out. Go back to return, I'll go back to the watch tab. You can see that this is still humming along just fine. Let's flip over, refresh, and everything is still fine. With no errors.

You can't really notice it yet, but our Rep Log App is now using this Jquery instead of the globally included jquery. I'm not going to remove jquery yet from our base layout, because we have other pages that are depending on it. The time being, our users actually download jquery once in our layout. And the rep log app file actually contains Jquery as well. We are going to fix that.

In fact if you look at the build/rep_log.js file, you'll see that now most of this file is actually jquery. All right, let's do this one more time for the sweet alert. It's the exact same situation, except that this time, there is actually included on this specific page, not in the layout. If you open app resources views, lift/index.html.twig, at the bottom you can see a script tag for sweet alert. We don't want that anymore. We want rep log app to require everything that it needs.

First, we just need to download it via yarn. With jquery I just guessed it was yarn@jquery. But if you're not sure, you can go to npms.io. We'll search for sweet alert 2. There's one with that exact name. We click it, yep. This is the library that we're using, awesome.

Now we know we can go over, find our third terminal tab, yarn add sweet alert 2 dash dash dash.

Perfect. Now we do the same thing, constswal = require sweet alert 2. I'll remove the swal, from the self executing function so that it just uses r variable, no need for that complexity. In this case, sweet alert is only used by rep log app, so I'm actually going to remove it from my layout. All right, let's try it out. Go back to lift stuff, refresh. It looks like it worked.

When you hit delete, it doesn't look quite right. You can see it's a little crowded. I can't hit cancel, so what's going on here? Inspect the element, there aren't any errors, everything seems to be working fine. This is actually a CSS problem. Check this out, when we just installed sweet alert, it installed a version 6.6.6. When you use sweet alert, you actually need the javascript on the page, but also the sweet alert CSS on the page, to make things work. Before, we were loading that from a CDN. But check this out, on version 6.1, the .0. There's a mismatch between the Javascript and our CS that's causing the problem. For now, I should change this to 6.6.0. That's a close enough version of the CSS file, and it should get things working just fine. Yeah, much better.

But this highlights a problem. This CSS file is really a dependency of a rep log app. We still have the situation where whenever we want to use sweet alert, to remember to include the style sheet. That is something that we are going to fix. Not quite yet, but stay tuned.

