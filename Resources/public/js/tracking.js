var gat = gat||{};

gat.strings={
  _def_account: '=> You must define "account" parameter',
  _def_ga_page: '=> attribute "data-ga-page" must be defined once per document',
  _def_ga_page_attr: '=> You must define "page" attribute',
  _def_ga_index_attr: '=> You must define "index" attribute',
  _def_ga_value_attr: '=> You must define "value" attribute',
  _def_ga_value_nan: '=> You must provide a number for "value" attribute',
  _def_ga_event_category_attr: '=> You must define "eventCategory" attribute',
  _def_ga_event_action_attr: '=> You must define "eventAction" attribute',
  _def_ga_social_network_attr: '=> You must define "socialNetwork" attribute',
  _def_ga_social_action_attr: '=> You must define "socialAction" attribute',
  _def_ga_social_target_attr: '=> You must define "socialTarget" attribute'
};

gat.init=function(account, debug){
  if(undefined==account){
    throw this.strings._def_account
  }
  debug=(debug==undefined?'':'_debug');
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
      (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics'+debug+'.js','ga');
  ga('create',account,'auto');
};

gat.go=function(){
  // handle data-ga-xxx attributes
  (function(f,a,b,i,e,n){
    var na,nb,nc,nd;
    // Page
    n=a.querySelectorAll('[data-ga-page]');
    if (n.length>1) {
      //throw self.strings._def_ga_page
      throw b.strings._def_ga_page
    }
    n=n[0];
    na=JSON.parse(n.getAttribute('data-ga-page').replace(/'/g,'"'));
    if (undefined==na['page']) {
      throw b.strings._def_ga_page_attr
    }
    ga('set',na);

    // Dimensions
    n=a.querySelectorAll('[data-ga-dimension]');
    for(i=0;i< n.length;i++) {
      nb=JSON.parse(n[i].getAttribute('data-ga-dimension').replace(/'/g,'"'));
      if (undefined==nb['index']) {
        throw b.strings._def_ga_index_attr
      }
      if (undefined==nb['value']) {
        throw b.strings._def_ga_value_attr
      }
      nb['dimension'+nb['index']]=nb['value'];
      delete nb['index'];
      delete nb['value'];
      ga('set',nb);
    }

    // Metrics
    n=a.querySelectorAll('[data-ga-metric]');
    for(i=0;i< n.length;i++) {
      nb=JSON.parse(n[i].getAttribute('data-ga-metric').replace(/'/g,'"'));
      if (undefined==nb['index']) {
        throw b.strings._def_ga_index_attr
      }
      if (undefined==nb['value']) {
        throw b.strings._def_ga_value_attr
      }
      if (isNaN(parseFloat(nb['value'])) || !isFinite(nb['value'])) {
        throw b.strings._def_ga_value_nan
      }
      nb['metric'+nb['index']]=nb['value'];
      delete nb['index'];
      delete nb['value'];
      ga('set',nb);
    }

    // Events
    n=a.querySelectorAll('[data-ga-event]');
    for(i=0;i<n.length;i++) {
      nc=JSON.parse(n[i].getAttribute('data-ga-event').replace(/'/g,'"'));
      nc['hitType']='event';
      if (undefined==nc['eventCategory']){
        throw b.strings._def_ga_event_category_attr
      }
      if (undefined==nc['eventAction']){
        throw b.strings._def_ga_event_action_attr
      }
      nc['hitCallback']=(function(el){
        if (el.href||el.getAttribute('data-url')) {
          f.location=el.href||el.getAttribute('data-url')
        }
      }).bind(null,n[i]);
      n[i].addEventListener('click',(function(inc){
        return function(ev){ev.preventDefault();ga('send',inc)}
      })(nc));
    }

    // Social (for homemade social buttons)
    n=a.querySelectorAll('[data-ga-social]');
    for(i=0;i<n.length;i++) {
      nd=JSON.parse(n[i].getAttribute('data-ga-social').replace(/'/g,'"'));
      nd['hitType']='social';
      if (undefined==nd['socialNetwork']){
        throw b.strings._def_ga_social_network_attr
      }
      if (undefined==nd['socialAction']){
        throw b.strings._def_ga_social_action_attr
      }
      if (undefined==nd['socialTarget']){
        throw b.strings._def_ga_social_target_attr
      }
      n[i].addEventListener('click',(function(inc){
        return function(ev){
          var _this = this;
          if(!_this.hasAttribute('ga-social-done')){
            ev.preventDefault();
            ga('send',inc);
            _this.setAttribute('ga-social-done','1');
            setTimeout(function(){_this.click();_this.removeAttribute('ga-social-done')},100);
          }
        }
      })(nd));
    }
  })(window, document, this);

  ga('send', 'pageview');
};
