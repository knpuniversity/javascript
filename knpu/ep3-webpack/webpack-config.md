# webpack.config.js

 Now
instead of actually passing these command line options, what you usually do is
create a Webpac dot Config dot JS file. So at the root of your project, add
that, Webpac dot Config dot JS. If you make a file with exactly that name when
you run Webpac, it looks for it. Guess what this file looks like.

It starts with a module dot exports set to a configuration array and inside of
here we're gonna have two major things. In entry, set to, not slash Web, slash
Assets slash JS slash Rep Log App dot JS. Entry is Webpac's name for your input
file. The main one file that it should start looking into. Then, of course, we
need to tell it the output and here I'm actually gonna set this to a hash with
a path, underscore underscore Dirname plus slash Web slash Build. So this will
be the directory where we want files to be built and underscore underscore
Dirname is a special variable that's available when you're inside of node. Then
we'll set file name to Re underscore Log dot JS. That now allows us to run
things a little bit easier, so we're here and instead of this long thing here,
we can just say dot slash Node Modules dot Bin Webpac. We get the same result.
Actually, if you go to Webpac dot JS dot org, and make sure you're on Webpac
dot JS dot org. They had a different website, Webpac dot GetHub dot org for the
Webpac version one.

We are using Webpac version three and under the Main Concepts page, they're
gonna a little bit about this configuration format. You'll notice that for
their path, they actually use this weird path dot Resolve things. This is a
minor detail on Node dot JS that I want you guys to see. In Node dot JS, you
never see strings concatenated together like this. To keep things portable
between Unix and Windows, they instead use a function called Path dot Resolve
or Path dot something to concatenate, in this case, the directory name and
Dist. So we're gonna do the same things here. We're gonna say Path dot Resolve,
then we'll say Dirname and we'll actually pass it to String Web. Then we'll
actually pass it to String Build, so we can pass as many arguments as we want.
It's just going to concatenate those together and return the file path, but
when we try it, it's going to blow up. Path is not defined. Here's an important
distinction to make. When this file is being executed, when Webpac dot Config
dot JS, this is a Node JS file. This will never be run in our browser.

It will only be run on our machine to create our final packages and that means
that we have all of the tools that you normally have in Node dot JS. Node dot
JS actually comes with many core packages. You can see up here at the top,
there's a [Const 00:08:02] paths equals Require path. That's actually what we
need and when we put it there, everything's happy again. Now notice this is
does not dot slash path. Dot slash tells Node to look for things relative to
this file, but when you don't have a dot slash, it looks for either core
modules in node dot JS itself, path is one of those, or it actually looks in
your node module directory to import one of those. So if you don't start with a
dot, it's going to look for a core module or a module in your node modules
directory. Now one that little thing here. You'll see when I hover over path,
it looks like there's an error and it says, "Node dot JS coding assistance is
disabled."

If you go to your Peachpit Storm settings, which is command comma on a Mac, and
search for Node dot JS, There's [inaudible 00:09:08] here called Node dot JS
and NPM and you can see it highlighted, "Node dot JS core library's not
enabled." Make sure you hit Enable on that and then hit Okay. You can see
instantly, everything is happy and this is actually gonna give you auto
complete on all the core Node dot JS features. All right. Next, let's make our
setup more interesting by using the Launch command.