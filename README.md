# Progressmate

Make the HTML5 progress element look hot across different browsers with jQuery.progressmate and Raphaël.

It seems Safari 5 on OS X has issues with the progress element. I've added support for the meter element and any element with data attributes that match those of progress (min, max, value).

This is similar to another plugin I've put together, [jQuery.ratemate](https://github.com/DylanFM/jquery.ratemate), for star ratings using HTML5 input elements and the meter element.

This plugin is being developed in CoffeeScript. Grab the compiled jQuery plugin from src/compiled/.

## Requirements

Progressmate is being developed using jQuery 1.4.4 and Raphaël 1.5.2. These libraries can be found via their websites or in the lib/ directory of this project.
