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
            new \Twig_SimpleFunction('ga_start',[$this,'start']),
            new \Twig_SimpleFunction('ga_ecommerce_initialize',[$this,'ecommerceInitialize']),
            new \Twig_SimpleFunction('ga_ecommerce_addTransaction',[$this,'addTransaction']),
            new \Twig_SimpleFunction('ga_ecommerce_addItem',[$this,'addItem']),
            new \Twig_SimpleFunction('ga_ecommerce_send',[$this,'send']),
        ];
    }

    /**
     * Initializes the GA tracker
     */
    public function initialize()
    {
        if ($this->parameters['enabled']) {
            return $this->twig
                ->display(
                    'HamaryuginhGoogleAnalyticsBundle:GA:render.html.twig',
                    array(
                        'account' => $this->parameters['account'],
                        'debug'   => $this->parameters['debug']
                    )
                );
        }
    }

    /**
     * Starts the GA tracker
     */
    public function start()
    {
        if ($this->parameters['enabled']) {
            return $this->twig
                ->display(
                    'HamaryuginhGoogleAnalyticsBundle:GA:start_ga.html.twig');
        }
    }

    /**
     * Initializes the ecommerce GA module
     * CAUTION : Call this after initializing the GA tracker
     */
    public function ecommerceInitialize()
    {
        if ($this->parameters['enabled']) {
            return $this->twig
                ->display(
                    'HamaryuginhGoogleAnalyticsBundle:GA:start_ga_ecommerce.html.twig');
        }
    }

    public function addTransaction($id, $affiliation, $revenue, $shipping, $tax)
    {
        if ($this->parameters['enabled']) {
            return $this->twig
                ->display(
                    'HamaryuginhGoogleAnalyticsBundle:GA:ga_ecommerce_add_transaction.html.twig',
                    array(
                        'id' => $id,
                        'affiliation'   => $affiliation,
                        'revenue'   => $revenue,
                        'shipping'   => $shipping,
                        'tax'   => $tax
                    )
                );
        }
    }

    public function addItem($transactionId,
                            $productName,
                            $sku,
                            $category,
                            $price,
                            $quantity)
    {
        if ($this->parameters['enabled']) {
            return $this->twig
                ->display(
                    'HamaryuginhGoogleAnalyticsBundle:GA:ga_ecommerce_add_item.html.twig',
                    array(
                        'transactionId' => $transactionId,
                        'productName'   => $productName,
                        'sku'   => $sku,
                        'category'   => $category,
                        'price'   => $price,
                        'quantity'   => $quantity
                    )
                );
        }
    }

    public function send()
    {
        if ($this->parameters['enabled']) {
            return $this->twig
                ->display(
                    'HamaryuginhGoogleAnalyticsBundle:GA:ga_ecommerce_send.html.twig');
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
