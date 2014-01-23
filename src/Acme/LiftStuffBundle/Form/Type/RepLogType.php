<?php

namespace Acme\LiftStuffBundle\Form\Type;

use Acme\LiftStuffBundle\Entity\RepLog;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolverInterface;

class RepLogType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('reps', 'integer')
            ->add('item', 'choice', array(
                'choices' => RepLog::getThingsYouCanLiftChoices(),
                'empty_value' => 'What did you lift?'
            ))
        ;
    }

    public function setDefaultOptions(OptionsResolverInterface $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => 'Acme\LiftStuffBundle\Entity\RepLog'
        ));
    }


    /**
     * Returns the name of this type.
     *
     * @return string The name of this type
     */
    public function getName()
    {
        return 'rep_log';
    }

} 