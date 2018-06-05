<?php

namespace AppBundle\Controller;

use AppBundle\Entity\RepLog;
use AppBundle\Form\Type\RepLogType;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;

class LiftController extends BaseController
{
    /**
     * @Route("/lift", name="lift")
     */
    public function indexAction(Request $request)
    {
        $this->denyAccessUnlessGranted('IS_AUTHENTICATED_REMEMBERED');

        $form = $this->createForm(RepLogType::class);
        $form->handleRequest($request);

        if ($form->isValid()) {
            $em = $this->getDoctrine()->getManager();
            $repLog = $form->getData();
            $repLog->setUser($this->getUser());

            $em->persist($repLog);
            $em->flush();

            $this->addFlash('notice', 'Reps crunched!');

            return $this->redirectToRoute('lift');
        }

        $repLogs = $this->getDoctrine()->getRepository('AppBundle:RepLog')
            ->findBy(array('user' => $this->getUser()))
        ;
        $totalWeight = 0;
        foreach ($repLogs as $repLog) {
            $totalWeight += $repLog->getTotalWeightLifted();
        }

        return $this->render('lift/index.html.twig', array(
            'form' => $form->createView(),
            'repLogs' => $repLogs,
            'leaderboard' => $this->getLeaders(),
            'totalWeight' => $totalWeight,
        ));
    }

    /**
     * Returns an array of leader information
     *
     * @return array
     */
    private function getLeaders()
    {
        $leaderboardDetails = $this->getDoctrine()->getRepository('AppBundle:RepLog')
            ->getLeaderboardDetails()
        ;

        $userRepo = $this->getDoctrine()->getRepository('AppBundle:User');
        $leaderboard = array();
        foreach ($leaderboardDetails as $details) {
            if (!$user = $userRepo->find($details['user_id'])) {
                // interesting, this user is missing...
                continue;
            }

            $leaderboard[] = array(
                'username' => $user->getUsername(),
                'weight' => $details['weightSum'],
                'in_cats' => number_format($details['weightSum']/RepLog::WEIGHT_FAT_CAT),
            );
        }

        return $leaderboard;
    }
}
