# Extract Text Webpack Plugin

Ever since we've started requiring CSS from our JS, we've had this problem of when we refresh there's no CSS for a second and then it loads. That's because the CSS is packaged inside of our Java script so we need to wait for the Java script to be executed so that I can actually add CSS to our page.

This is not a production setting. This sucks. The fix is to use a very important and confusing plug in called 'Extract Text Webpack Plug In'. What this is effectively going to do is to dump a CSS file for every output JS file.

So let's just try it out. Find your open terminal tab and run 'yard add extract-text-webpack-plugin--dev'.

Now flip over to webpack.config.js. As you'll remember before, we have a couple of ... loaders set up. We have a CSS-loader and we have a SASS-loader. And down here whenever we load in these CSS files, we load through the CSS-loader then the style-loader or for SASS files, we load through the SASS-loader then the resolve-URL-loader, then the CSS-loader and then the style-loader. The style-loader's what actually puts it on the page as a style tag. So what we basically want to do is replace this style-loader with something that instead, dumps a real CSS file. And that's what the 'Extract Text Plugin' does.

So at the top, first add 'const ExtractTextPlugin=RequireExtractTextPluginExtractText Webpack Plugin'. Now this is going to look a little bit weird at first.

Down far as CSS-loader, I'm actually going to remove those and instead we are going to use 'ExtractTextPlugin.Extract' and pass that some options. First we are going to say 'use CSS-loader' and then we are going to pass another one called Fallback. We'll pass that the style-loader. What this does is it actually adds a loader to our stack so effectively we're still going to the CSS-loader and then we'll go through a special extract text loader. So, if you actually dumped what this does it just creates an aray with two loaders.

This fallback is one of the least important but confusing parts. Basically, this says use this loader if CSS isn't extracted and I'm going to talk about what that does in a second.

Down below we're going to do the same thing. I'm actually going to copy our three loaders and then say ExtractTextPlugin.Extract and then say Use et cetra three loaders and then same thing, fallback style-loader.

Now the last thing we need to do to activate this is actually go down to the plug in section and here we'll say new ExtractTextPlugin and we'll pass it a special name '[name].CSS'. Alright, so that was a lot.

So let's go over another tab and restart the web pack dev server. Here is what I want you to see: If you scroll up a little bit, look at the files that are being served through webpack now. Look at, there's a log-in.js, there's a log-in.CSS, there's layout.js, there's layout.CSS and rep_log.js and rep_log.CSS. So, instead of the CSS being packaged inside the Java Script file, it's been moved to it's own CSS file. Every entry gets its own CSS file.

Then, this fixes our problem. The downside is that now we need to manually include link tags just like we always did. So, base.html.twig, we will need a link tag for build/layout.css. I'll copy that. We'll also go do our two pages which are app resources FOSUserBundle, view security login.html/twig. We'll override the block style sheets called Parent and put one there for login.css and finally we'll do that inside of our index.html.twig. This is where we include repblog.js so we will include rep_log.css.

Alright, so let's try it. Refresh the page and now it looks good and if you notice, there was no flash that time. If you view the source and click and do rep_log.css it's a good, old-fashioned CSS file, exactly what you'd expect. So this is the way you're actually going to have your application set up. Now there are two important things I haven't mentioned. First of all, back in webpack.config.js, this Fallback style-loader. What the heck is that used for? Because, it doesn't look like we're using the style loader at all. The Style Loader is what puts CSS into the style tag. That's not happening anymore.

Well, as I mentioned here, this is what is used if the CSS isn't extracted. When would that happen? Well, later on we're going to talk about something called Code Splitting and that is actually where you can tell webpack to lazily load modules via ajax. For example, when we require rep_log.js, instead of packaging replogapp.js, inside of this Java Script file, it's only loaded lazily later when it's needed. That's important because by default if you Code Split CSS, it is not included in the initially written CSS file. It's actually lazily loaded via ajax. Then, in this case, applied via the Style Loader.

If that didn't make sense, just know this: later, I'm going to show you a way to lazily load CSS onto your page with ajax. When you do that, that CSS will be passed through the style-loader and the Style tabs will be added to the page just as before.

The second thing I want to tell is that we just killed Hot Module Reloading. I know I just showed you this crazy cool Hot Module Reloading thing and now it's dead. If you flip over here, it just says, "App is up to date. Nothing to update." When you're using ExtractTextPlugin, Hot Module Reloading does not work for CSS. There are some libraries that are trying to add this but for the most part what webpacks authors tell you is you should use ExtractTextPlugin only in the Production environment and not use it in the Dev environment.

The problem I have with that is that it means that everything could work great in the Dev environment but then when I go to Production, it doesn't work because I forgot to add my link tag to the page and to me, that kind of sucks so I use the ExtractTextPlugin always because that forces me to make sure that I have my link tag but it also kills Hot Module Reloading as of this time. So if you don't like it, you'll want to conditionally do Hot Module Reloading. In a little bit I'll show you a way that you can add some flags into your webpack.config.js to do some things for a dev build versus a production build.

So, because I'm not going to use the webpack dev server, I'm actually going to go up to the top of my file, set Use Dev Server to False and then add app-config-config.yml, I'm going to comment out the base URL stuff. Instead of using the webpack dev server, I'm going to go back to the good old-fashioned webpack--watch.
