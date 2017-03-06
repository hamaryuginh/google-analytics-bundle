# GoogleAnalyticsBundle

_Work in progress_

This [Symfony](https://symfony.com/) bundle will simplify the management of interactions with google analytics.


# Installation

Install [composer](https://getcomposer.org/)

Add the following to your require block in composer.json config

```
"hamaryuginh/google-analytics-bundle": "dev-master"
```

Then, execute the following command in your symfony poject root

```
$ composer install
```


# Configuration

Register the bundle in `app/AppKernel.php`:

```php
public function registerBundles()
{
    ...
    new Hamaryuginh\GoogleAnalyticsBundle\HamaryuginhGoogleAnalyticsBundle(),
    ...
}
```

Add to your `app/config/config.yml` the following:

```yaml
hamaryuginh_google_analytics:
    account: UA-XXXXXX-Y   # Your GA account ID
    debug:   false         # [Facultative] set to true to activate debug mode
    enabled: false         # Enable or disable tracking
```


Add the following before `</head>` tag:

```twig
{{ ga_initialize()|raw }}
```

At the end of your document, before the `</body>` tag, add:

```twig
{{ ga_start()|raw }}
```

Install assets (from your symfony project root):

```bash
$ php app/console assets:install --symlink
```


# Usage

Globally, you define a `data-ga-xxx` attribute on any tag and you give arguments as JSON string (ex: `data-ga-page="{'page':'/home'}"`)

__Page tracking__

Add `data-ga-page` attribute on `<body>` tag or any other tag:

```html
<body data-ga-page="{'page':'/home'}">
  ...
</body>
```

Or:

```html
<body>
  ...
  <div data-ga-page="{'page':'/home'}"></div>
  ...
</body>
```

Or whatever you want...

> **Warning!** `data-ga-page` must be defined only **once** per document !

For further information, take a look at the [Page tracking](https://developers.google.com/analytics/devguides/collection/analyticsjs/pages) documentation.

__Custom dimentions and metrics__

Add `data-ga-dimension` attribute on any tag:

```html
<body>
  ...
  <div data-ga-dimension="{'index':1, 'value':'Hello'}"></div>
  <div data-ga-dimension="{'index':2, 'value':'World!!!'}"></div>
  ...
  <div data-ga-metric="{'index':18, 'value':8000}"></div>
  <div data-ga-metric="{'index':19, 'value':24.99}"></div>
  ...
</body>
```

For further information, take a look at the [Custom dimensions and metrics](https://developers.google.com/analytics/devguides/collection/analyticsjs/custom-dims-mets) documentation.

__Event tracking (only "click" event at the moment)__

Add `data-ga-event` attribute on any tag:

```html
<body>
  ...
  <a href="#" data-ga-event="{'eventCategory':'Link','eventAction':'click','eventLabel':'link 1'}">Home</a>
  ...
  <div data-ga-event="{'eventCategory':'Element','eventAction':'click','eventLabel':'On div'}"></div>
  ...
</body>
```

For further information, take a look at the [Event tracking](https://developers.google.com/analytics/devguides/collection/analyticsjs/events) documentation.

__Social interactions (only homemade social buttons at the moment)__

Add `data-ga-social` attribute on any tag:

```html
<body>
  ...
  <a href="http://example.com/hello" target="_blank" data-ga-social="{'socialNetwork':'facebook','socialAction':'like','socialTarget':'http://example.com/hello'}">
    <img src="facebook.png" alt="Facebook">
  </a>
  ...
</body>
```

For further information, take a look at the [Social interactions](https://developers.google.com/analytics/devguides/collection/analyticsjs/social-interactions) documentation.

__Last but not least__

Obviously, you can still use the **Google Analytics** library by the default way:

```html
<script type="text/javascript">
  ga('set', 'dimension1', 'toto');
  ...
  ga('send', 'event', ...);
  ...
  ga('send', 'pageview');
</script>
```

# Ecommerce usage

__1. Start the ecommerce tracking__  

Be sure to only declare this once and AFTER initializing the GA tracker (see Configuration)
```twig
{{ ga_ecommerce_initialize() }}
```

__2. Add a transaction__  

A transaction is like a basket
```twig
{{ ga_ecommerce_addTransaction('transactionid',
                            'affiliation',
                            'totalAmount',
                            'shipping',
                            'taxRate') }}
```

__3.Add an item to the transaction__  

An item is a product in your basket. Add as many items in your transaction as you want.
```twig
{{ ga_ecommerce_addItem('transactionId',
                        'productName',
                        'sku',
                        'category',
                        'price',
                        'quantity') }}
```

__4. Send the transaction to GA__  

Call this after having added all the items to the transaction.
```twig
{{ ga_ecommerce_send() }}
```


__Have fun!__


# Contributions

Feel free to open an issue or add a pull request.
