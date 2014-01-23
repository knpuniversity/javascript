<?php

namespace Acme\LiftStuffBundle\Controller;

use Acme\LiftStuffBundle\Form\Type\RepLogType;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Template;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\Security\Core\Exception\AccessDeniedException;

class LiftController extends Controller
{
    /**
     * @Route("/lift", name="lift")
     * @Template()
     */
    public function indexAction(Request $request)
    {
        if (!$this->get('security.context')->isGranted('IS_AUTHENTICATED_REMEMEBRED')) {
            throw new AccessDeniedException();
        }

        $form = $this->createForm(new RepLogType());
        $form->handleRequest($request);

        if ($form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $repLog = $form->getData();
            $repLog->setUser($this->getUser());

            $em->persist($repLog);
            $em->flush();

            $request->getSession()->getFlashbag()->add('notice', 'Reps crunched!');

            return $this->redirect($this->generateUrl('lift'));
        }

        return array('form' => $form->createView());
    }
}
