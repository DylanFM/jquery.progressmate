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
      height: 20,
      bg_fill: '90-#efefef-#e0e0e0-#ececec-#b2b2b2',
      bar_fill: '90-#aed9ef-#4ba7e5-#9ac6e7-#245ebb'
    };
    ProgressDisplay.prototype.setValue = function(value) {
      var width;
      value != null ? value : value = this.opts.value;
      this.value = parseInt(value, 10);
      this.el.attr('value', this.value);
      width = ((this.value - this.opts.min) / (this.opts.max - this.opts.min)) * this.opts.width;
      return this.bar.animate({
        width: width
      }, 600, '<>');
    };
    ProgressDisplay.prototype.setupCanvas = function() {
      this.canvas = Raphael(this.mate.get()[0], this.opts.width, this.opts.height);
      this.bg = this.canvas.rect(0, 0, this.opts.width, this.opts.height, 5);
      this.bg.attr({
        fill: this.opts.bg_fill,
        'stroke-width': 0
      });
      this.bar = this.canvas.rect(0, 0, 0, this.opts.height, 5);
      return this.bar.attr({
        fill: this.opts.bar_fill,
        'stroke-width': 0
      });
    };
    return ProgressDisplay;
  }();
}).call(this);
