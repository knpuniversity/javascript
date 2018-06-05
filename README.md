Javascript for PHP Geeks Tutorial
=================================

This repository holds the screencast code, script and all the AJAX
you can eat for the [Modern JavaScript Tutorials](http://knpuniversity.com/tracks/javascript#modern-javascript)
on KnpUniversity.

## Setup

If you've just downloaded the code, congratulations!

To get it working, follow these steps:

**Download Composer dependencies**

Make sure you have [Composer installed](https://getcomposer.org/download/)
and then run:

```
composer install
```

You may alternatively need to run `php composer.phar install`, depending
on how you installed Composer.

**Setup the Database**

Open `.env` and make sure the `DATABASE_URL` setting is
correct for your system.

Then, create the database and the schema!

```
php bin/console doctrine:database:create
php bin/console doctrine:migrations:migrate
php bin/console doctrine:fixtures:load
```

If you get an error that the database exists, that should
be ok. But if you have problems, completely drop the
database (`doctrine:database:drop --force`) and try again.

**Start the built-in web server**

You can use Nginx or Apache, but the built-in web server works
great:

```
php bin/console server:run
```

Now check out the site at `http://localhost:8000`

**For convenience**

If you are using PhpStorm you may install and enable
the [Symfony Plugin](https://plugins.jetbrains.com/idea/plugin/7219-symfony-plugin)
via the preferences which provides more auto-completion for Symfony projects.  

Have fun!

## Have some Ideas or Feedback?

And as always, thanks so much for your support and letting us do what
we love!

If you have suggestions or questions, please feel free to
open an issue or message us.

<3 Your friends at KnpUniversity
