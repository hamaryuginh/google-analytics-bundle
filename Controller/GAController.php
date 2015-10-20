<?php

namespace Hamaryuginh\GoogleAnalyticsBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class GAController extends Controller
{
    public function renderAction()
    {
        return $this->render(
            'HamaryuginhGoogleAnalyticsBundle:GA:render.html.twig',
            array(
                'account' => $this->getParameter('ga_tracking.account'),
                'debug'   => $this->getParameter('ga_tracking.debug'),
            )
        );
    }
}
