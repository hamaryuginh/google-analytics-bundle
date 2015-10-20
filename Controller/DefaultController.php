<?php

namespace Hamaryuginh\GoogleAnalyticsBundle\Controller;

use Symfony\Bundle\FrameworkBundle\Controller\Controller;

class DefaultController extends Controller
{
    public function indexAction($name)
    {
        return $this->render('HamaryuginhGoogleAnalyticsBundle:Default:index.html.twig', array('name' => $name));
    }
}
