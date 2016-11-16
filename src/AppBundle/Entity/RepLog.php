<?php

namespace AppBundle\Entity;

use Doctrine\ORM\Mapping as ORM;
use Symfony\Component\Serializer\Annotation as Serializer;
use Symfony\Component\Validator\Constraints as Assert;

/**
 * RepLog
 *
 * @ORM\Table(name="rep_log")
 * @ORM\Entity(repositoryClass="AppBundle\Repository\RepLogRepository")
 */
class RepLog
{
    const ITEM_LABEL_PREFIX = 'liftable_thing.';

    const WEIGHT_FAT_CAT = 18;

    private static $thingsYouCanLift = array(
        'cat' => '9',
        'fat_cat' => self::WEIGHT_FAT_CAT,
        'laptop' => '4.5',
        'coffee_cup' => '.5',
    );

    /**
     * @var integer
     *
     * @Serializer\Groups({"Default"})
     * @ORM\Column(name="id", type="integer")
     * @ORM\Id
     * @ORM\GeneratedValue(strategy="AUTO")
     */
    private $id;

    /**
     * @var integer
     *
     * @Serializer\Groups({"Default"})
     * @ORM\Column(name="reps", type="integer")
     * @Assert\NotBlank(message="How many times did you lift this?")
     * @Assert\GreaterThan(value=0, message="You can certainly life more than just 0!")
     */
    private $reps;

    /**
     * @var string
     *
     * @Serializer\Groups({"Default"})
     * @ORM\Column(name="item", type="string", length=50)
     * @Assert\NotBlank(message="What did you lift?")
     */
    private $item;

    /**
     * @var float
     *
     * @Serializer\Groups({"Default"})
     * @ORM\Column(name="totalWeightLifted", type="float")
     */
    private $totalWeightLifted;

    /**
     * The user who lifted these items
     *
     * @var User
     *
     * @ORM\ManyToOne(targetEntity="User")
     * @ORM\JoinColumn(name="user_id", referencedColumnName="id", nullable=false)
     */
    private $user;

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
        if (!isset(self::$thingsYouCanLift[$item])) {
            throw new \InvalidArgumentException(sprintf('You can\'t lift a "%s"!', $item));
        }

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

    public function getItemLabel()
    {
        return self::ITEM_LABEL_PREFIX.$this->getItem();
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
            $choices[self::ITEM_LABEL_PREFIX.$thingKey] = $thingKey;
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

    /**
     * @return \AppBundle\Entity\User
     */
    public function getUser()
    {
        return $this->user;
    }

    /**
     * @param \AppBundle\Entity\User $user
     */
    public function setUser($user)
    {
        $this->user = $user;
    }
}
