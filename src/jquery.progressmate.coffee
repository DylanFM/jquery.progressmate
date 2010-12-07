$ = jQuery
  
# Now we'll have a $(...).progressmate() function
$.fn.extend
  progressmate: (opts) ->

    # If we are working on elements
    if this.length
      this.each ->

        el = $ this
        if el.is 'progress'

          # Read the attributes and use them as options, but override with passed options
          attrs =
            max: el.attr('max')
            min: el.attr('min')
            value: el.attr('value')

          # Initialise the progress display
          el.data 'progressmate', new ProgressDisplay el, $.extend {}, attrs, opts 

##################################################
##################################################

# This is the progress display
# It's a Raphaël canvas and looks like a progress bar
class ProgressDisplay

  constructor: (el, opts) ->

    # Let's keep a jQuery object in here
    @el = $ el

    # Merge the default options with the supplied ones
    @opts = $.extend {}, @defaults, opts

    # Make sure this isn't progressmated already
    unless @el.hasClass 'has_progressmate'

      # Add a class to show this is going on
      @el.addClass 'has_progressmate'

      # We're going to put the display in a sibling
      @mate = $ '<div class="progressmate"></div>'

      # Insert it after the element
      @el.after @mate

      # Let's do the important stuff now...
      @setupCanvas()
      @setValue()


  defaults:
    value: 0
    max: 100
    min: 0
    width: 160
    height: 32


  setValue: (value) ->

    # Set the passed value or the one stored in opts
    value ?= @opts.value

    # Set it in this class
    @value = parseInt value, 10

    # Set it on the element
    @el.attr 'value', @value

    # Show the value
    @showValue()


  # This is just going to call a couple of methods responsible for setting this up
  setupCanvas: ->

    # We want a Raphaël canvas
    @canvas = Raphael @mate.get()[0], @opts.width, @opts.height

    # Paint the picture
    @attackCanvas()


  # We want to make a progress bar
  attackCanvas: ->

    # Draw a bar with full progress
    @bar = @canvas.rect 0, 0, @opts.width, @opts.height
    
    # Make it pretty
    @bar.attr 'fill', '90-#fff-#000'


  # Take the stored value and make the display reflect it
  showValue: ->

    # Set the size to represent the % of bar's total width
    @bar.attr 'width', ((@value - @opts.min) / (@opts.max - @opts.min)) * @opts.width


