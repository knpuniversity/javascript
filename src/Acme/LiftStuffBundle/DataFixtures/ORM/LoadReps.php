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

        for ($i = 0; $i < 10; $i++) {
            $user = new User();
            $user->setUsername('user'.$i);
            $user->setEmail('user'.$i.'@gmail.com');
            $user->setPlainPassword('password');
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