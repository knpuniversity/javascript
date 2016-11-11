<?php

namespace AppBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use AppBundle\Entity\User;
use Symfony\Component\HttpFoundation\JsonResponse;

class DefaultController extends Controller
{
    /**
     * @Route("/", name="homepage")
     */
    public function indexAction()
    {
        return $this->render('default/index.html.twig');
    }

    /**
     * @Route(
     *      "/users/{username}.{_format}",
     *      name="user_show",
     *      requirements= {"_format": "json"}
     * )
     */
    public function userAction($username)
    {
        /** @var User $user */
        $user = $this->getUserRepository()->findOneBy(array('username' => $username));
        if (!$user) {
            throw $this->createNotFoundException(sprintf('No user '.$username));
        }

        $details = array(
            'username' => $user->getUsername(),
            'firstName' => $user->getFirstName(),
            'lastName'  => $user->getLastName(),
            'avatar' => $user->getAvatar(),
        );

        return new JsonResponse($details);
    }

    /**
     * @return \Doctrine\Common\Persistence\ObjectRepository
     */
    private function getUserRepository()
    {
        return $this->getDoctrine()->getRepository('AppBundle:User');
    }
}
