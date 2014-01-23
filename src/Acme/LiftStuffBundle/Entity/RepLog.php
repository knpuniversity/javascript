<?php

namespace Acme\LiftStuffBundle\Entity;

use Doctrine\ORM\Mapping as ORM;

/**
 * RepLog
 *
 * @ORM\Table()
 * @ORM\Entity(repositoryClass="Acme\LiftStuffBundle\Repository\RepLogRepository")
 */
class RepLog
{
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
     */
    private $reps;

    /**
     * @var string
     *
     * @ORM\Column(name="item", type="string", length=50)
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
     * Set totalWeightLifted
     *
     * @param float $totalWeightLifted
     * @return RepLog
     */
    public function setTotalWeightLifted($totalWeightLifted)
    {
        $this->totalWeightLifted = $totalWeightLifted;

        return $this;
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
}
