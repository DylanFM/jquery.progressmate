(function() {
  var $, ProgressDisplay;
  $ = jQuery;
  $.fn.extend({
    progressmate: function(opts) {
      if (this.length) {
        return this.each(function() {
          var attrs, el;
          el = $(this);
          if (el.is('progress')) {
            attrs = {
              max: el.attr('max'),
              min: el.attr('min'),
              value: el.attr('value')
            };
            return el.data('progressmate', new ProgressDisplay(el, $.extend({}, attrs, opts)));
          }
        });
      }
    }
  });
  ProgressDisplay = function() {
    function ProgressDisplay(el, opts) {
      this.el = $(el);
      this.opts = $.extend({}, this.defaults, opts);
      if (!this.el.hasClass('has_progressmate')) {
        this.el.addClass('has_progressmate');
        this.mate = $('<div class="progressmate"></div>');
        this.el.after(this.mate);
        this.setupCanvas();
      }
    }
    ProgressDisplay.prototype.defaults = {
      value: 0,
      max: 100,
      min: 0,
      width: 160,
      height: 32
    };
    ProgressDisplay.prototype.makeNamespace = function() {
      if (Raphael.fn.progressmate == null) {
        return Raphael.fn.progressmate = {};
      }
    };
    ProgressDisplay.prototype.setValue = function(value) {
      this.value = parseInt(value, 10);
      return this.el.attr('value', this.value);
    };
    ProgressDisplay.prototype.setupCanvas = function() {
      this.makeNamespace();
      this.canvas = Raphael(this.mate.get()[0], this.opts.width, this.opts.height);
      return this.attackCanvas();
    };
    ProgressDisplay.prototype.attackCanvas = function() {};
    return ProgressDisplay;
  }();
}).call(this);
