BBC Academy Style Guide
========

Welcome to the living styleguide for BBC Academy.

## Tasks

To install the last version of **Hologram** (required) :

````
$ gem install hologram
````

Hologram will build and watch your sass files automaically when you run

````
NODE_ENV=prod gulp
````

To run and build your styleguide  manually to the docs folder :

````
gulp hologram
````

## Generating the styleguide from within your SCSS files

````
/*doc
---
title: Title of block element
category: Category - Subcategory
---

Block description:

Example markup for block

*/

````

## BEM SCSS code example

Declare the base style attribute, and seperate each part of the block using BEM... Block, Elements, Modifiers then at the base of each block set the styles for each breakpoint.

````
/* ==========================================================================
   BASE BLOCK STYLES
   ========================================================================== */

//=======================BLOCK
.block {

   //=======================ELEMENT
   &__element {

   }

   //=======================MODIFIER
   &--modifier {

   }

   //=======================BREAKPOINTS - xs, s, m, l
   @include bp(xs, min-width) {

   }

   @include bp(s, min-width, portrait) {

   }

   @include bp(m, min-width, true) {

   }

   @include bp(l, min-width) {

   }
}

//* ===========================STYLE GUIDE

/*doc
---
title: Standard list 
category: Core - Lists
---

Block description:

<ul class="list">
    <li class="list__item">List item one</li>
    <li class="list__item">List item two</li>
    <li class="list__item">List item three</li>
    <li class="list__item">List item four with a <a href="#">link</a></li>
</ul>

*/

````

## SCSS file structure

````
static:
  - scss
  	- base
  		- helpers,resets and mixins
  	- core
  		- default-styles
  	- layout
  		- global
  	- modules
  		- example-block
  	- vendor
  		- gel-framework
 ````

## JS file structure

````
static:
  - js
  	- components
  		- jsComponent
````

## Wrapper, Rows and Columns

````
/* To add a wrapper which has a max-width of 1248px to a block.
@extend .wrapper;

/* Set the block or element as a row.
@extend .row;

/* Set its child element as a column if you want gutters - don't extend .col for colummns without gutters.
@extend .col;

/* Then set the width of columns for specific blocks or elements within that block.
width: gel-columns(1, 1);
width: gel-columns(1, 2);
width: gel-columns(1, 3);
width: gel-columns(1, 4);
width: gel-columns(1, 5);
width: gel-columns(1, 6);
````

## Colour variables

````
$palettes: (
    brand: (
        a               : #402963,
        b               : #4a5aa8,
        c               : #3CFAEC,
        d               : #e4e4e4,
        e               : #1A1A1A
    ),
    shades: (
        white           : $shades,
        lightergray     : darken($shades,10),
        lightgray       : darken($shades,20),
        gray            : darken($shades,30),
        darkergray      : darken($shades,40),
        darkgray        : darken($shades,50),
        black           : hsl(0, 0%, 0%)
    ),
    links: (
        menu-btn        : #271349
    ),
    alerts: (
        info            : #4babcc,
        warn            : #ffdc48,
        error           : #fa453d,
        success         : #02CA9C
    ),
    type: (
        body            : #404040,
        grey            : #656565
    )
);
````

## Colour usage

````
background-color: palette(brand, a);
color: palette(shades, white);
border-color: palette(alerts, warn);
````

## Spacing

````
padding: halve($gel-spacing-unit); = 4px
padding: $gel-spacing-unit; = 8px
padding: double($gel-spacing-unit); = 16px
padding: quadruple($gel-spacing-unit); = 32px
````

## Maintain aspect ratio

````
@extend .ratio;
@extend .ratio--16-9;
````

## Example transition mixin

````
@include transition(max-height .5s ease);
@include transition(all .5s ease);
@include transition(opacity .5s ease);
````

## SVG to PNG Fallback background image mixin
Name both the SVG and PNG the same name and include the svg in the svg folder and the png in the svg-fallbacks folder.
Then replace sad-icon with the name of the file.

````
@include svg-bg-fallback(sad-icon);
````

## Media queries and IE8 support
IE8 support is baked into the media query function so all you have to do is specify which breakpoint content you want to use for IE8 by adding true to that media query.

Or add overwriting styles for ie8 by using the i8 mixin.

````
@include bp(m, min-width, true) {
   .specific styles to output into the legay.css file
}

@include ie8 {
	.specific styles to output into the legay.css file
}
````

## Browser prefixing
Gulp has a task to autoprefix any styles that require it.

````
// Autoprefixer array
var autoprefixerBrowsers = [
  'ie >= 8',
  'ie_mob >= 10',
  'ff >= 28',
  'chrome >= 34',
  'safari >= 7',
  'opera >= 23',
  'ios >= 7',
  'android >= 4.4',
  'bb >= 10'
];
````