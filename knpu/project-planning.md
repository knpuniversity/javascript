## JavaScript Project

Premise: A spot where developers can come to get tough. Entering in # of
reps of weight and climbing up a leaderboard.

### Starting Project

Start with a basic design and:

* working registration
* non-JavaScript page where we can enter reps (units include, lbs, kg, cats, etc)
* non-JavaScript leaderboard

### Building

#### 1) Bower: Setup

- Added the .bowerrc file
- bower init

#### 1) Bower: Install Bootstrap and jQuery

- bower install bootstrap --save
- ignored web/assets/vendor in gitignore

#### 2) Include them in the base template

#### 3) Rep Form: AJAX Submit

- using .preventDefault()
- using document.ready

1) Make the reps-entering submit via JavaScript
* inline JavaScript handling form submit
* ?? what response should the server have

2) Show a notification on save
* little listener inline that pushes something into the DOM

3) Add another form field after submitting
* introduce delegate events

4) Refactor into a JavaScript object (inline)
* just point to methods instead of inline functions

5) Introduce constructor
* prototype model
* keep all the selectors internally to the wrapper

6) Isolate into its own file
* self-executing function
* window object

7) Render the leaderboard clent-side
* client-side templates
* dumping JSON into Twig
* creating another object

8) Add an update-leaderboard button
* Using $.ajax
* adding the button via JS - delegate selector
* Routing.generate

9) Add a nice message when the leaderboard updates
* Create a new Messaging object
* "Inject" it into each object

10) Refactor to AJAX-load leaderboard from server
* move loading logic into its own method. Will cause problems with "this"

11) On hover of .username-info elements, let's pop up a cute-box
* jQuery plugin
* Routing.generate, but we could set that on some global config in Core
to make this plugin even more re-usable

12) On homepage, include the leaderboard
* breaks because no leaderboard object
* breaks again because no Messaging object

13) Introduce RequireJS
* basic setup
* roll out to each page

14) RequireJS Optimizer
* do we move assets out of web?

15) Grunt
* move in RequireJS
* add in jshint
* add in css-min

16) Less/Sass extra credit?
* add watch task

17) Refactor entry into AngularJS

### Questions

- what is the bower.json ignore section?


### Random Notes

- you don't need "script type="
- what is document.ready really?