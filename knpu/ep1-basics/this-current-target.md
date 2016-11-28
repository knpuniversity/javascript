# This Current Target

Clicking the trash icon and having it turn red is cool, but what we are really going to want is for that to turn into a spinning icon so that the user knows that the eventual AJAX call is being made. Before we do that I'm going to show off a problem.

After the trash icon, type delete. Now we have a trash icon with the word delete next to it. Now down in the javascript once again consul that log, e.target, which we know is the element that is clicked. Now check this out, if I click the trash icon I get a span as the target, but if I click the delete link, it's actually the anchor.

True to what I said, e.currenttarget is exactly the one element that is clicked and that can be a problem for us. Because what I want to do inside of our function here, is actually find the span that has the trash icon and change that to a spinning icon. That's going to be a little bit difficult, because if we click on the trash icon, then e.target is the element whose classes we should change, but if we click on the word delete, then we should actually look inside of the link tag to find the span and then change it.

It would be much better if we could actually somehow get the element that the listener was attached to, which was the js-delete-rep-log element which is actually the link. If we could somehow always get the link inside of here, then we could easily find the span inside of it, and change that text.

Well, the way to do that is not e.target, but e.currentTarget. This ends up being much more useful than e.target. If we refresh now, click the trash icon, it's the anchor tag. Click the delete icon, it's the anchor tag. No matter what element we're actually clicking, this now returns the original elements that we attached the listener to.

In fact, check this out. console.log[e.currentTarget === this]. If you refresh and start clicking anywhere around here now, you're going to get true. See, most of you are probably used to using the this variable inside of your click callbacks. Well hear now that this and e.currentTarget are exactly the same thing. If you want to return the element that is receiving the event, both of these ways are equivalent. Ultimately that means that we can actually say, [diarson 00:03:25](this).addClass, text.danger. That's going to always add the text-danger link to the anchor tag.

It also means we can do what I originally want, which is by saying, (this).find('.fa'), because that will help us find the span inside of it. Then we can say, .removeClass['fa-trash'] .addClass['fa-spinner'] .addClass['fa-spin']. And that should always work. Refresh, click delete, it changes. If we click the trash icon, it doesn't matter.

Use the this variable. It's your friend. But realize what's going on. That is actually the same as e.currentTarget. That fact is going to become important in just a little while. Now that we know this, we can [ruth 00:04:44] the delete link because it's kind of ugly. The trash icon is enough.
