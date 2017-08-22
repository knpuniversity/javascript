# Pass Data to JS

Alright, so watch, if I refresh right now, there's actually a slight delay before the table loads, and this is because in assets > js > Components > RepLogApp.js, in the constructor we call this.loadRepLogs(); and that actually initially populates the table while making an ajax call. And that's fine, but what if I want this to load instantly? What if right on page load, I want the repLogs to be there? Well back when we use to write more of our java script in the template, this was easier, since our java script was in the template, if we needed to print out a bunch of Json from the server, we could just mix twig inside of here, and maybe print out some repLogs.Json. And then that would instantly be available to our java script.

It's not like we can go right in the middle of replogapp.js and replace this ajax call with some twig code that print out the Json. Nope, we need a new way of allowing our server to communicate with our java script. There's actually a really nice and powerful way to do this.

First, let's get rid of loadRepLogs. What I'm going to do instead is I'm going to have whoever uses me pass the initialRepLogs as a second argument. Down here, we'll just loop over those for (latRepLog of initialRepLogs) we'll say this._addRowRepLog. Now, who calls this? It's actually our assets > js > rep_log.js entry point.

We have the same problem here, we still can't just printout twig code, so we still have that same problem. But for now, just to see if this is working, I'm going to paste two hard coded logs above this. This is the exact format that the logs had in our ajax end point. Then I'll pass the logs as the second argument. So in theory, this should work. I'm gonna refresh, we instantly see those two rep logs. Okay, so we are a little bit closer.

Now if you go into the server code for this src > AppBundle > Controller > RepLogController. You'll see that this is actually the ajax end point where you were using a second ago. What I'm going to do is in our LiftController index action this is actually the page renders that template. What I want to do is make the repLogJson available in the template. So I'm actually going to steal the first line of code here that gets all of our repLogModels. Rename that to repLogModels then I'll create another variable called repLogsJson = $this->get('serializer') -> serialize($repLogModels, 'Json') Then I'm going to pass that in as another variable linked into my twig template repLogsJson => $replogsjson.

So what that sets up for me is now in my twig template for this page, which is App > Resources > views > lift > index.html.twig. We now have access to the Json that we want to somehow pass into our repLog java script file.

So, how can we actually do that? The answer is by leveraging data attributes. This is the very, very simple key. So, if we look at our replog that js file we actually look for a js-replog-table element. That is near the top of my file. So, to end this I'm going to add new data attribute called data-rep-logs="{{ repLogsJson|e('html_attr') }}">. That does actually print all of that Json right onto this html attribute. And the pipe e html attr make sure that it's escaped correctly so that it can live safely on that attribute.

So what we've done is basically put all of the data that we need right into the DOM. And that lets us very easily inside replog.js. We can delete the old logs variable and say $wrapper.data('rep-logs') And that's it. Now when we refresh we instantly have our real table.

That's the key that I wanted to show you. Whenever you want to pass data from your server to java script, that's totally cool, just set it on data attributes on your elements and then read those preferably in your entry java script file. Just pass that, and use that data however you need to.

