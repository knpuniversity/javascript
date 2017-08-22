# Production Build

So, one big missing piece right now is that all of our built assets are not minified; they include lots of comments; basically they're not optimized at all for production. So we need to prepare a production build, which minifies everything. So, that means that we actually need to know inside of our webpack.config.js file whether we want to compile things in a development mode right now or in a production mode.

Now the way ... There's a really common way to do this in node applications and it's by setting an environment variable called node_env. The way read that inside of node, is by saying process.env.node_env.

So, let's just dump that out. Now right now if you just run webpack like normal, you'll see that that prints out as undefined. So how do we set that? Well if you're on a Unix file system, before the command you say NODE_ENV=production and then the command.

And then it prints production. If you're on Windows, there's also a library called cross env, which is gonna help you do that. The point is we can send a flag into webpack to figure out what the environment is. This is awesome!

So, first thing we're gonna do is minify our java script. And there's a plugin to do that called Uglify JS. So instead of saying module that exports here, I'm actually gonna set a variable called webpack. So I'll say const webpack = ... const webpackconfig = and then all the way at the bottom I'll add module.exports = webpackconfig.

But now before that we can add "if" statements that says, if process.env.node_ENV === production. Then we're going to add that plugin, which is very simply webpack.config.plugins so we can add to our existing plugins key dot push.

Inside here, we'll say new webpack.optimize.UglifyJSplugin. And that is it. So let's check this out. But if you're running webpack like normal, it's not going to apply the Uglify plugin, which gives us assets of, let's see, layout.JS is 1.62 megabytes. If you stop that and re-run it with the flag, you'll notice it takes a little bit longer to run, which makes sense. And the Java Script files are way way smaller.

And you can prove it by opening any of those login.JS files and yup, there is one beautiful line. So of course remembering how to run that long command is kind of a bummer. So there's a really cool feature inside of node that we can take advantage of.

Open up your package.json. And one of the keys you're allowed to have in here is called "scripts", Which is set to an object. Inside of here you can put something like Dev and we'll set that to node_ENV = Dev webpack. So just by having that, we can now go over here and run yarn run ... just yarn dev. And it runs node_ENV = Dev webpack and we don't have to say node module/ dot bin/webpack. Here we can just say webpack and it knows to run that from inside of our node modules directory.

And you can see that our layout files is huge again. So let's add two more here. Let's add a watch script, which will be the same thing as that but with a -- watch flag on the end. And we'll add one more called production. We'll set the node ENV to production.

Awesome. So with this, we can say yarn watch, which runs it with a -- watch flag. I'll stop that. Or more importantly for our case we can run yarn production. Can see the command it's running. It's setting our environment variable. It's super short. And then we see our super small layout.JS file.

So our isn't done yet 'cause we still need to take care of CSS files and a few other things.

