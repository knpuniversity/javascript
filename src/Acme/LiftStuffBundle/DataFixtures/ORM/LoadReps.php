<?php

namespace Acme\LiftStuffBundle\DataFixtures\ORM;

use Doctrine\Common\DataFixtures\FixtureInterface;
use Doctrine\Common\Persistence\ObjectManager;
use Acme\LiftStuffBundle\Entity\User;
use Acme\LiftStuffBundle\Entity\RepLog;

class LoadUserData implements FixtureInterface
{
    /**
     * {@inheritDoc}
     */
    public function load(ObjectManager $manager)
    {
        $items = RepLog::getThingsYouCanLiftChoices();

        $names = array(
            array('Brad', 'Kitt'),
            array('Cat', 'Middleton'),
            array('Cindy', 'Clawford'),
            array('Diane', 'Kitten'),
            array('Fuzz', 'Aldrin'),
            array('Hunter S.', 'Thomcat'),
            array('J.R.R', 'Tollkitten'),
            array('Madelion', 'Albright'),
            array('Meowly,', 'Cyrus'),
            array('Ron', 'Furgandy'),
        );

        for ($i = 0; $i < 10; $i++) {
            $user = new User();
            $user->setUsername(sprintf('%s_%s', $names[$i][0], $names[$i],[1]));
            $user->setEmail('user'.$i.'@gmail.com');
            $user->setPlainPassword('password');
            $user->setFirstName($names[$i][0]);
            $user->setLastName($names[$i][1]);
            $manager->persist($user);

            for ($j = 0; $j < rand(1, 5); $j++) {
                $repLog = new RepLog();
                $repLog->setUser($user);
                $repLog->setReps(rand(1, 30));
                $repLog->setItem(array_rand($items));
                $manager->persist($repLog);
            }
        }

        $manager->flush();
    }
}