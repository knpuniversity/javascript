<?php

namespace AppBundle\Controller;

use AppBundle\Entity\RepLog;
use AppBundle\Form\Type\RepLogType;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Route;
use Sensio\Bundle\FrameworkExtraBundle\Configuration\Method;
use Symfony\Component\HttpFoundation\Request;
use Symfony\Component\HttpFoundation\Response;
use Symfony\Component\HttpKernel\Exception\BadRequestHttpException;

class RepLogController extends BaseController
{
    /**
     * @Route("/reps/{id}", name="rep_log_delete")
     * @Method("DELETE")
     */
    public function deleteRepLogAction(RepLog $repLog)
    {
        $this->denyAccessUnlessGranted('IS_AUTHENTICATED_REMEMBERED');
        $em = $this->getDoctrine()->getManager();
        $em->remove($repLog);
        $em->flush();

        return new Response(null, 204);
    }

    /**
     * @Route("/reps", name="rep_log_new")
     * @Method("POST")
     */
    public function newRepLogAction(Request $request)
    {
        $this->denyAccessUnlessGranted('IS_AUTHENTICATED_REMEMBERED');
        $data = json_decode($request->getContent(), true);
        if ($data === null) {
            throw new BadRequestHttpException('Invalid JSON');
        }

        $form = $this->createForm(RepLogType::class);
        $form->submit($data);
        if (!$form->isValid()) {
            $errors = $this->getErrorsFromForm($form);

            return $this->createApiResponse([
                'errors' => $errors
            ], 400);
        }

        /** @var RepLog $repLog */
        $repLog = $form->getData();

        return $this->createApiResponse($repLog);
    }
}
