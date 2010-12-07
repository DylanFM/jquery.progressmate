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
        this.setValue();
      }
    }
    ProgressDisplay.prototype.defaults = {
      value: 0,
      max: 100,
      min: 0,
      width: 160,
      height: 32
    };
    ProgressDisplay.prototype.setValue = function(value) {
      value != null ? value : value = this.opts.value;
      this.value = parseInt(value, 10);
      this.el.attr('value', this.value);
      return this.showValue();
    };
    ProgressDisplay.prototype.setupCanvas = function() {
      this.canvas = Raphael(this.mate.get()[0], this.opts.width, this.opts.height);
      return this.attackCanvas();
    };
    ProgressDisplay.prototype.attackCanvas = function() {
      this.bar = this.canvas.rect(0, 0, this.opts.width, this.opts.height);
      return this.bar.attr('fill', '90-#fff-#000');
    };
    ProgressDisplay.prototype.showValue = function() {
      return this.bar.attr('width', ((this.value - this.opts.min) / (this.opts.max - this.opts.min)) * this.opts.width);
    };
    return ProgressDisplay;
  }();
}).call(this);
