<?php


namespace Hamaryuginh\GoogleAnalyticsBundle\Twig;

use Symfony\Component\DependencyInjection\ContainerInterface;
use Twig_Environment as Environment;

/**
 * Class FeedbackExtension
 * @package RMO\FeedbackBundle\Twig
 */
class GAExtension extends \Twig_Extension
{
    private $twig;
    private $parameters;

    public function __construct(Environment $twig, array $parameters)
    {
        $this->twig = $twig;
        $this->parameters = $parameters;
    }

    /**
     * @return array
     */
    public function getFunctions()
    {
        return [
            new \Twig_SimpleFunction('ga_initialize',[$this,'initialize']),
            new \Twig_SimpleFunction('ga_start',[$this,'start'])
        ];
    }

    public function initialize()
    {
        if ($this->parameters['enabled']) {
            return $this->twig
                ->render(
                    'HamaryuginhGoogleAnalyticsBundle:GA:render.html.twig',
                    array(
                        'account' => $this->parameters['account'],
                        'debug'   => $this->parameters['debug']
                    )
                );
        }
    }

    public function start()
    {
        if ($this->parameters['enabled']) {
            return $this->twig
                ->render(
                    'HamaryuginhGoogleAnalyticsBundle:GA:start_ga.html.twig');
        }
    }

    /**
     * @return string
     */
    public function getName()
    {
        return 'ga_extension';
    }
}
