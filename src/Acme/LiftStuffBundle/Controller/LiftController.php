<?php

namespace Acme\LiftStuffBundle\Controller;

use Acme\LiftStuffBundle\Entity\RepLog;
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
        if (!$this->get('security.context')->isGranted('IS_AUTHENTICATED_REMEMBERED')) {
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

        $repLogs = $this->getDoctrine()->getRepository('AcmeLiftStuffBundle:RepLog')
            ->findBy(array('user' => $this->getUser()))
        ;

        return array('form' => $form->createView(), 'repLogs' => $repLogs);
    }

    /**
     * @Template
     * @return array
     */
    public function leaderboardAction()
    {
        $leaderboardDetails = $this->getDoctrine()->getRepository('AcmeLiftStuffBundle:RepLog')
            ->getLeaderboardDetails()
        ;

        $userRepo = $this->getDoctrine()->getRepository('AcmeLiftStuffBundle:User');
        $leaderboard = array();
        foreach ($leaderboardDetails as $details) {
            $leaderboard[] = array(
                'user' => $userRepo->find($details['user_id']),
                'weight' => $details['weightSum'],
                'in_cats' => $details['weightSum']/RepLog::WEIGHT_FAT_CAT,
            );
        }

        return array('leaderboard' => $leaderboard);
    }

}
