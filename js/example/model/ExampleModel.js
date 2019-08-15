// Copyright 2013-2018, University of Colorado Boulder

/**
 * Model for the 'Example' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Steele Dalton (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var BarMagnet = require( 'EXAMPLE_SIM/example/model/BarMagnet' );
  var Dimension2 = require( 'DOT/Dimension2' );
  var exampleSim = require( 'EXAMPLE_SIM/exampleSim' );
  var inherit = require( 'PHET_CORE/inherit' );
  var Vector2 = require( 'DOT/Vector2' );

  /**
   * Main constructor for ExampleModel, which contains the bar magnet.
   * @constructor
   */
  function ExampleModel() {

    /**
     * The region, in model coordinates, where we can draw a bar magnet is calculated from:
     *  - LayoutBounds defined in ExampleScreenViews as (768, 504)
     *  - The bar magnet dimensions set below as (262.5, 52.5)
     * Could have not hard coded this (passing LayoutBounds down from the ScreenView), but went for simplicity.
     * Also, the sim retains its aspect ratio of course, so will only spawn within Layout bounds, not anywhere in the canvas.
     */

    this.randomBarLocation = () => new Vector2( Math.random() * (758 - 262.5) - (758 - 262.5) / 2,
                                                Math.random() * (504 -  52.5) - (504 -  52.5) / 2 );

    // If specified, returns a BarMagnet at location, otherwise will return at a random location.
    this.newBarMagnet = (location) => new BarMagnet( new Dimension2( 262.5, 52.5 ),
                                                     location || this.randomBarLocation(),
                                                     0 );

    // This is the special bar magnet which is created at init. It will not be removed from the ScreenView.
    this.originalBarMagnet = this.newBarMagnet( new Vector2( 0, 0 ) );

  }

  exampleSim.register( 'ExampleModel', ExampleModel );

  return inherit( Object, ExampleModel, {

    /**
    * Restores the initial state of all model elements. This method is called when the simulation "Reset All" button is
    * pressed.
    * @public
    */
    reset: function() {
      this.originalBarMagnet.reset();
      this.removeAddedMagnetsFromView();
    }
  } );
} );
