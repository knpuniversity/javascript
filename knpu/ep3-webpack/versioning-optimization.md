# Versioning Optimization

Thanks to the hash, under output for our final name, whenever the contents of our java script files change, the final output files gonna have a slightly different hash in the java script final name. But, there's a problem in some edge cases, sometimes that final name on the hash will change even when the contents didn't change.

This is a bug that I ... This is potentially a bug in one that maybe fixed in the future, but basically hash is good but not perfect. So, to get around this, I actually install a plugin, which gives me a more dependable hash. New terminal run yarn add webpack-chunk-hash --dev. Copy that library name, and then at the top of our webpack file, we'll bring it in with const webpack chunk hash = require. Webpack-chunk-hash, this is a plugin.

It's gonna go all the way down to the end of our plugins, and very simply say new webpack chunk hash and that's it. I'm an add a little note about this. This gives us a new wild card in the output, called chunk hash, which literally means we can go back up to our output, and change hash to chunk hash, and that's it. It just seems to be more a dependable hash.

So, if you re run webpack, with yarn dev now, we should see the same files output, but they're gonna have a different hash algorithm to use their hashes. Yep, we now see duplicate versions of every file, and Manifest is updated to use the latest one. So, that's just a little bit of work that we needed to do.

Now, there's one other slight problem with the versioning. I mentioned earlier that internally, in the final built files, all of our different modules, or chunks, are given ID's. So, you see funny things like this like var jquery = webpack require 45. Because for this particular build, 45 apparently represents the jquery module.

Well, sometimes those module ID's change between builds, and the result of that is, that even if we don't change any of the files that go into creating login.js, some of the module IDs referenced by login.js could change. Like 45 could become 46, and that means that sometimes, even though you didn't change anything in your login java script, your login.js will now output a new file name, which will bust all of the caches of your users unnecessarily.

It's not that big of a deal, but it is an imperfection. So the way to change this is to use a plugin that actually allows you to control the IDs of the modules. So, at the bottom of our webpack.config.js in the plugin section, we're gonna use a two core modules. Actually we're gonna use an is production flag, and if we're in production, we're gonna use new webpack.hashedmoduleIDsplugin, otherwise we gonna use a new webpack.namedmodulesplugin.

So the hashed module IDs plugin make sure the module ID is something that is built off of the module name itself, but it's hashed so that it's invisible to the user. It's also capped a little bit short. Now, using the hashed module IDs plugin will make your final production build slightly bigger. Because instead of using really short numbers like 45, it's gonna use a slightly longer hash.

Now in the development environment, we're gonna use the named modules plugin and basically instead of using the number 45, it's gonna use something that actually has the named jquery in it. That's not really that important, but sometimes when you're using hot module reloading and trying to debug it, webpack will give you errors with the module ID in it. If the module ID is something helpful, well that just make debugging a little bit easier.

So, let's run our yarn production build, so we can see what that looks like. Actually, let's run our yarn dev build, so we can see what that looks like. In the latest login.js which is 391, you can see that the module IDs are now very clear what those refer to, which is kind of cool.

If it's your production build, you'd see a hashed version of that. Okay, those are the two edge cases we needed to take care of. Now we do have one small problem, which is that every time we run a build, we're getting more and more files in our build directory, which technically isn't a problem, but it gets messy, it's confusing. So, you might want to clear that out, and there's a really nice plugin that allows us to do that.

So, let's run yarn add clean-webpack-plugin --dev, now copy that package name. Instead of our webpack.config.js on top, we'll bring that in with const clean webpack plugin = require package name. You guys can probably guess how's this is going to work. The bottom of our plugin section, we're just gonna say new clean webpack plugin, and we're gonna pass it a directory that should be cleaned out every time a build is made, even in watch mode.

So, pass it web/build/**/*.*. The ** says look at web/build recursively, and then the *.* says delete all file names. So, don't delete directories, but delete file names. All right, perfect. As soon as we do that, let's run yarn watch. Oh, and I have an error, which I did not catch, but I'm missing my comma at the end of the previous line, shame on me. Try that again, and you can see a little log message from the clean webpack plugin that says the build directory has been removed. Sure enough, there's nothing inside of web/build, and as soon as it finishes, boom! Everything gets put back, which is perfect!

