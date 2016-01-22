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
                'enabled'   => $this->getParameter('ga_tracking.enabled'),
            )
        );
    }

    public function renderStartAction()
    {
        return $this->render(
            'HamaryuginhGoogleAnalyticsBundle:GA:start_ga.html.twig',
            array(
                'enabled'   => $this->getParameter('ga_tracking.enabled'),
            )
        );
    }
}
