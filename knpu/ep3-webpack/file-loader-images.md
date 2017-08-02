# File Loader Images

Most of the CSS on the site is actually coming from our base layout, base dot html dot twig. On top there's a link tag that points to assets, css slash main dot css. But, to keep with our new theme, instead of adding this link tag manually, I want to actually require the CSS I need from my entry, so in this case, our layout dot J S entry. So, we move the link tag for main dot css, which is going to completely make our site ugly for a moment.

Then, in the source layout dot JS, we'll add require dot dot slash CSS slash main dot CSS, and that should work just fine.

So refresh. And as promised, never mind, it looks terrible. What happened here? We have an error, it says module parse failed, dumbbell dash mini, unexpected character. Huh. Actually, over in our watch tab, we have a very similar error. Module parse fail, unexpected character, and it looks like it's when it was trying to load main dot CSS.

So, let's check this out. In main dot CSS, whoa, there it is right there. We have a back ground image pointing to a dumbbell dash mini file. So this is very interesting. When we tell Webpack to load a CSS file, it actually reads our background images and also tries to load those. And as you'll see in a second, it does the same thing for font files. It tries to load your font files. It even processes at imports and tries to load those CSS files.

So why is this failing? It's failing because just like with CSS, a minute ago, Webpack does not know how to understand PNG files.

So, what's the fix in this case? Well, what we basically want is we want Webpack to read the dumbbell dot mini dot png, but not really do anything with it, other than maybe copy it to our build directory so that it sits with all our other files, and then when it writes the final CSS, to make sure that it changes this path to point to the new path of the dumbbell dash mini file in the build directory.

That didn't make total sense, that's okay. Let's see this in action. Head over to Webpack dot JS dot org, click on guides, and then asset management and loading images.

Here it talks about something called the file loader. The file loader has one simple job. It loads a file and then moves it into your build directory. But when it does that, it actually returns the file name to that new file so that Webpack can appropriately update our final CSS to point to the new location.

So first, let's get it installed. I'll copy the name and the module, then in my last terminal tab, we'll run yarn add file dash loader dash dash dev.

Back in Webpack dot config dot JS, we will had a third loader. Copy the CSS loader, and then for the test, you notice in the docs, it basically looks for any image file. So, we're going to do something similar but actually even a little stronger. I'm going to paste a test, that's our PNGs, jpegs, gifs, icons and SEGs. And then for the U statement, we're going to pass this through the file loader.

So before we do anything else, let's head over, and restart Webpack. And now look at the output. Not only did it write a layout, rep log and log in dot JS, it actually wrote a ping file with a big funny long name. You can see this in our build directory. This is our mini dumbbell.

And if you go and refresh the page, this mini dumbbell should be showing up right ... huh, it should be right on this menu link here. And actually, you can see a 404 down here, it's still not working.

So let's do an inspect element. And if you look, the style that's brought in for the mini dumbbell actually points at background image and then the name of the background image. In other words, it's looking for local host colon 8000 slash the name of our PNG. It's missing the build directory.

So I open that up in a new tab and just added build slash, then it would actually work.

So Webpack is doing almost everything correctly. It's moving the file into a new build directory. It's even updating our CSS to point to that file name. But, if you look in our Webpack dot config dot JS file, even though we've told Webpack to put things in the web slash build directory, it doesn't actually know what the public path is to the files in this directory. Webpack doesn't know that web is our document root, so everything in build is accessible via slash build and then the file name. That's something that we need to tell it so that it can actually create the correct link to the image files.

How? By adding public path slash build slash. Head back to your Webpack [inaudible 00:07:14] tab and restart it. Everything looks the same here, but now, when we refresh, go to our menu, there is our little icon. And you can see down here it's actually rendering the CSS with the URL slash build slash the file name.

So this is another huge step. It means that whenever we reference background images or fonts, we want to reference them truly relative to our source file. Our main dot CSS, we go up one directory and then dumbbell dash mini dot PNG. We don't need to worry about, oh, what happens if Webpack moves my CSS file. And so then this link breaks. Webpack takes care of correcting that link for you. You can write your source code perfectly and when Webpack moves everything to the build directory, it makes sure that all of your links are still active. Even better. You can't mess things up. If I have a typo in my file name here, you're actually going to get a build error. There's no way to accidentally have a broken link.

