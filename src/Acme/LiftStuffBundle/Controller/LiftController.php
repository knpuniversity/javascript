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

        return array('form' => $form->createView());
    }

    /**
     * @Template()
     */
    public function repLogsAction($userId)
    {
        $repLogs = $this->getDoctrine()->getRepository('AcmeLiftStuffBundle:RepLog')
            ->findBy(array('user' => $userId))
        ;

        return array('repLogs' => $repLogs);
    }

    /**
     * @Template
     * @return array
     */
    public function leaderboardAction()
    {
        return array('leaderboard' => $this->getLeaders());
    }

    /**
     * @return \Doctrine\Common\Persistence\ObjectRepository
     */
    private function getUserRepository()
    {
        return $this->getDoctrine()->getRepository('AcmeLiftStuffBundle:User');
    }

    /**
     * Returns an array of leader information
     *
     * @return array
     */
    private function getLeaders()
    {
        $leaderboardDetails = $this->getDoctrine()->getRepository('AcmeLiftStuffBundle:RepLog')
            ->getLeaderboardDetails()
        ;

        $userRepo = $this->getUserRepository();
        $leaderboard = array();
        foreach ($leaderboardDetails as $details) {
            if (!$user = $userRepo->find($details['user_id'])) {
                // interesting, this user is missing...
                continue;
            }

            $leaderboard[] = array(
                'username' => $user->getUsername(),
                'weight' => $details['weightSum'],
                'in_cats' => number_format($details['weightSum']/RepLog::WEIGHT_FAT_CAT, 1),
            );
        }

        return $leaderboard;
    }
}
