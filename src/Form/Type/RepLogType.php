<?php

namespace App\Form\Type;

use App\Entity\RepLog;
use Symfony\Component\Form\AbstractType;
use Symfony\Component\Form\Extension\Core\Type\ChoiceType;
use Symfony\Component\Form\Extension\Core\Type\IntegerType;
use Symfony\Component\Form\FormBuilderInterface;
use Symfony\Component\OptionsResolver\OptionsResolver;

class RepLogType extends AbstractType
{
    public function buildForm(FormBuilderInterface $builder, array $options)
    {
        $builder
            ->add('reps', IntegerType::class)
            ->add('item', ChoiceType::class, array(
                'choices' => RepLog::getThingsYouCanLiftChoices(),
                'placeholder' => 'What did you lift?',
                'invalid_message' => 'Please lift something that is understood by our scientists.'
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