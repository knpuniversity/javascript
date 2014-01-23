<?php

namespace Acme\LiftStuffBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * RepLog
 *
 * @ORM\Table(name="rep_log")
 * @ORM\Entity(repositoryClass="Acme\LiftStuffBundle\Repository\RepLogRepository")
 */
class RepLog
{
    private static $thingsYouCanLift = array(
        'cat' => '9',
        'fat_cat' => '18',
        'laptop' => '4.5',
        'coffee_cup' => '.5',
    );

    /**
     * @var integer
     *
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @var integer
     *
     * @ORM\Column(name="reps", type="integer")
     * @Assert\NotBlank(message="How many times did you lift this?")
     * @Assert\GreaterThan(value=0, message="You can certainly life more than just 0!")
     */
    private $reps;

    /**
     * @var string
     *
     * @ORM\Column(name="item", type="string", length=50)
     * @Assert\NotBlank(message="What did you lift?")
     */
    private $item;

    /**
     * @var float
     *
     * @ORM\Column(name="totalWeightLifted", type="float")
     */
    private $totalWeightLifted;


    /**
     * Get id
     *
     * @return integer 
     */
    public function getId()
    {
        return $this->id;
    }

    /**
     * Set reps
     *
     * @param integer $reps
     * @return RepLog
     */
    public function setReps($reps)
    {
        $this->reps = $reps;

        $this->calculateTotalLifted();

        return $this;
    }

    /**
     * Get reps
     *
     * @return integer 
     */
    public function getReps()
    {
        return $this->reps;
    }

    /**
     * Set item
     *
     * @param string $item
     * @return RepLog
     */
    public function setItem($item)
    {
        $this->item = $item;

        $this->calculateTotalLifted();

        return $this;
    }

    /**
     * Get item
     *
     * @return string 
     */
    public function getItem()
    {
        return $this->item;
    }

    /**
     * Get totalWeightLifted
     *
     * @return float 
     */
    public function getTotalWeightLifted()
    {
        return $this->totalWeightLifted;
    }

    /**
     * Returns an array that an be used in a form drop down
     *
     * @return array
     */
    public static function getThingsYouCanLiftChoices()
    {
        $things = array_keys(self::$thingsYouCanLift);
        $choices = array();
        foreach ($things as $thingKey) {
            $choices[$thingKey] = 'liftable_thing.'.$thingKey;
        }

        return $choices;
    }

    /**
     * Calculates the total weight lifted and sets it on the property
     */
    private function calculateTotalLifted()
    {
        if (!$this->getItem()) {
            return;
        }

        $weight = self::$thingsYouCanLift[$this->getItem()];
        $totalWeight = $weight * $this->getReps();

        $this->totalWeightLifted = $totalWeight;
    }
}
