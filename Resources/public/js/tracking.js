var gat = gat||{};

gat.init=function(account, debug){
  if(undefined==account){throw "argument 'account' must be defined"}
  debug=(debug==undefined?'':'_debug');
  (function(i,s,o,g,r,a,m){i['GoogleAnalyticsObject']=r;i[r]=i[r]||function(){
      (i[r].q=i[r].q||[]).push(arguments)},i[r].l=1*new Date();a=s.createElement(o),
    m=s.getElementsByTagName(o)[0];a.async=1;a.src=g;m.parentNode.insertBefore(a,m)
  })(window,document,'script','//www.google-analytics.com/analytics'+debug+'.js','ga');
  ga('create',account,'auto');
};

gat.go=function(){
  // handle data-ga-xxx
  (function(f,a,b,i,e,n){
    // Page
    n=a.querySelectorAll('[data-ga-page]');
    if (n.length>1){throw "attribute 'data-ga-page' must be defined once per document"}
    n=n[0];var d=JSON.parse(n.getAttribute('data-ga-page').replace(/'/g,'"'));
    if (undefined==d['page']){throw "You must define 'page' attribute"}
    ga('set',d);
    // Dimensions
    n=a.querySelectorAll('[data-ga-dimension]');
    for(i=0;i< n.length;i++){
      var d=JSON.parse(n[i].getAttribute('data-ga-dimension').replace(/'/g,'"'));
      if (undefined==d['index']){throw "You must define 'index' attribute"}
      if (undefined==d['value']){throw "You must define 'value' attribute"}
      d['dimension'+d['index']]=d['value'];delete d['index'];delete d['value'];
      ga('set',d);
    }
    // Events
    n=a.querySelectorAll('[data-ga-event]');
    for(i=0;i< n.length;i++){
      var d=JSON.parse(n[i].getAttribute('data-ga-event').replace(/'/g,'"'));d['hitType']='event';
      if (undefined==d['eventCategory']){throw "You must define 'eventCategory' attribute"}
      if (undefined==d['eventAction']){throw "You must define 'eventAction' attribute"}
      d['hitCallback']=(function(el){f.location=el.href||el.getAttribute('data-url')}).bind(null,n[i]);
      n[i].addEventListener('click',function(ev){ev.preventDefault();ga('send',d)});
    }
  })(window, document);

  ga('send', 'pageview');/*Must be launch at the end of the document, just before </body>*/
};
