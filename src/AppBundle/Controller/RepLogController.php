<?php

namespace AppBundle\Controller;

use AppBundle\Entity\RepLog;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Bundle\FrameworkBundle\Controller\Controller;
use Symfony\Component\HttpFoundation\Response;

class RepLogController extends Controller
{
    /**
     * @Route("/reps/{id}", name="reps_delete")
     * @Method("DELETE")
     */
    public function deleteRepLogAction(RepLog $repLog)
    {
        $em = $this->getDoctrine()->getManager();
        $em->remove($repLog);
        $em->flush();

        return new Response(null, 204);
    }
}
