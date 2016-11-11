<?php

namespace AppBundle\Form\Type;

use AppBundle\Entity\RepLog;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

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

    public function configureOptions(OptionsResolver $resolver)
    {
        $resolver->setDefaults(array(
            'data_class' => RepLog::class
        ));
    }
} 