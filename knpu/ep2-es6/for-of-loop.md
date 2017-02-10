# For of Loop

One of the things that's crazy about JavaScript is that there's not a good way to loop over things. If you have an array and you want to loop over the items in that array, you normally would actually need to make this custom for loop, and go over the indexes. It's just kind of annoying. That's why we have been using jQuery to actually do $.each to fill in that missing piece. Guess what? AquaScript 2015 fixed that, finally. In PHP we have a for each loop, and now in JavaScript there is a for of loop.

It looks like this. For let [rap-log 00:00:47], so that will be the variable that is going to be available inside of our loop, of, and then the thing you want to loop over, data.items. That is it. We're no longer passing it an anonymous function, so we can actually get rid of everything else. That's it. Welcome to your new best friend, the for of.

Let's look for other $.eachs and get rid of those as well. That will say, "for let field data of form.serializearray. Before, we were passing key and then field data, but we didn't actually need the key. We just needed to pass in the two arguments, because that's how the .[really-son 00:01:38] .each function worked. Now, things are a little bit simpler. We'll change that in two more places. For element of form.findinput. Don't forget your "let" or "var", if you want that. Then, one more down here. For let element of .elements.

Oh, and PhpStorm is warning me because I left one of my closing parentheses on my for loops. Also, don't need that semicolon. Yeah, it just simplified things. It made our life a lot easier, and it works exactly like before, so there we go. That's any easy on. For of, you're welcome.
