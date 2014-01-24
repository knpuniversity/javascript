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

#### 4) Installing FOSRestBundle

- comp require friendsofsymfony/rest-bundle ~1.2.2
- comp require jms/serializer-bundle ~0.13.0

#### 5) Form: JSON Form Response

#### 6) Form: Handling client-side errors

#### 7) Form: Adding error highlights

#### 8) Form: Show a notification on save

#### 9) Form: Handling success with a message

- yet more custom code for our errors messaging spot
Problems:
- the errorList thing is redundtant and a disaster
- a lot of work to handle parsing through Symfony errors and fields
- all this stuff is inline
Solutions:
- generic error list object
- centralized parsing of Symfony error responses
- get this into its own little module

#### 10) Form: Refactoring into simple object

- not really helpping yet, one gigantic object
- differences between objects and hashes? :)

#### 11) Form: Adding more methods to the object

- forced to pass $form into the function
- forced to re-look up for errorList
- referring to repForm, not this

#### 12) Form: Instantiated object

- created the construct function
- instantiated the guy

#### 13) Form: Tweak methods in object

- used $.proxy so we could get "this"
- used self later to keep this

3) Add another form field after submitting
* introduce delegate events

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