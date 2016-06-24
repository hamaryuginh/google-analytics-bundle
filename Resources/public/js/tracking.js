var gat = gat||{};

gat.strings={
  _def_account: '=> You must define "account" parameter',
  _def_ga_page: '=> attribute "data-ga-page" must be defined once per document',
  _def_attr_tmpl: '=> You must define "%attr%" attribute for data-ga-%prop% property',
  _def_type_tmpl: '=> Attribute "%attr%" must be of type "%type%"',
  _def_card_tmpl: '=> Attribute "%attr%" must be defined "%times%" per document'
};

gat.attrError=function(prop, attr){
  throw this.strings._def_attr_tmpl.replace('%prop%', prop).replace('%attr%', attr);
};
gat.typeError=function(type, attr){
  throw this.strings._def_type_tmpl.replace('%type%', type).replace('%attr%', attr);
};
gat.cardError=function(times, attr){
  var timesString = '';
  switch (times) {
    case 0:
      timesString = 'no time';
      break;
    case 1:
      timesString = 'once';
      break;
    case 'n':
    case 'N':
      timesString = 'several times';
      break;
    default:
      timesString = times + ' times';
  }
  throw this.strings._def_card_tmpl.replace('%times%', timesString).replace('%attr%', attr);
};

gat.init=function(account, debug){
  if(undefined==account){
    throw this.strings._def_account
  }
  debug=(debug==undefined||debug==false?'':'_debug');
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
    // Shim
    if (!Date.now){Date.now = function() { return new Date().getTime(); }}
    // Generic parser
    var __l = {
      page:{
        required: ['page'],
        optional: ['location','title'],
        cardinality: 1,
        init: function(el){
          el.ga_data.hitType = 'page';
          ga('set', el.ga_data)
        }
      },
      dimension:{
        required: ['index','value'],
        optional: [],
        init: function(el){
          el.ga_data['dimension'+el.ga_data.index] = el.ga_data.value;
          delete el.ga_data.index;
          delete el.ga_data.value;
          ga('set',el.ga_data)
        }
      },
      metric:{
        required: ['index','value'],
        optional: [],
        init: function(el){
          if (isNaN(parseFloat(el.ga_data.value)) || !isFinite(el.ga_data.value)) {
            b.typeError('Number', 'value')
          }
          el.ga_data['metric'+el.ga_data.index] = el.ga_data.value;
          delete el.ga_data.index;
          delete el.ga_data.value;
          ga('set',el.ga_data)
        }
      },
      event:{
        required: ['eventCategory','eventAction'],
        optional: ['eventLabel','eventValue'],
        init: function(el){
          el.ga_data.hitType = 'event';
          //el.ga_data.hitCallback = (function(el){
          //  if (el.href||el.getAttribute('data-url')) {
          //    f.location=el.href||el.getAttribute('data-url')
          //  }
          //}).bind(null,el);
          el.addEventListener('click',(function(gad){
            return function(e){ga('send',gad)}
          })(el.ga_data))
        }
      },
      social:{
        required: ['socialNetwork','socialAction','socialTarget'],
        optional: [],
        init: function(el){
          el.ga_data.hitType = 'social';
          el.addEventListener('click',(function(gad){
            return function(e){
              var _this = this;
              if(!_this.hasAttribute('ga-social-done')){
                e.preventDefault();
                ga('send',gad);
                _this.setAttribute('ga-social-done','1');
                setTimeout(function(){_this.click();_this.removeAttribute('ga-social-done')},100);
              }
            }
          })(el.ga_data))
        }
      },
      timing:{
        required: ['timingCategory','timingVar'], // required attribute "timingValue" is calculated
        optional: ['timingLabel'],
        init: function(el){
          el.ga_data.hitType = 'timing';
          el.start = function() {
            this.timing_start = Date.now()
          };
          el.stop = function() {
            if (!this.timing_start) return;
            this.ga_data['timingValue'] = Date.now() - this.timing_start;
            ga('send',this.ga_data)
          };
        }
      }
    };
    for (var key in __l) {
      if (!__l.hasOwnProperty(key)) return;
      var __ld = __l[key];
      var __n = a.querySelectorAll('[data-ga-'+key+']');
      // Check cardinality
      if (undefined !== __ld.cardinality && __n.length > __ld.cardinality) {
        b.cardError(__ld.cardinality, key);
      }
      for (var j=0; j<__n.length; j++) {
        (function(el,dat,prop) {
          // Get ga-data
          el.ga_data = JSON.parse(el.getAttribute('data-ga-'+key).replace(/'/g,'"'));
          // Check parameters
          dat['required'].forEach(function(attr){
            if (undefined==el.ga_data[attr]) {
              b.attrError(prop, attr)
            }
          });
          // Init
          dat.init(el)
        })(__n[j],__ld,key)
      }
    }
  })(window, document, this);

  ga('send', 'pageview');
};
