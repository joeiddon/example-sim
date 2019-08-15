// Copyright 2013-2018, University of Colorado Boulder

/**
 * View for the 'Example' screen.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 * @author Sam Reid (PhET Interactive Simulations)
 * @author Steele Dalton (PhET Interactive Simulations)
 */
define( function( require ) {
  'use strict';

  // modules
  var BarMagnetNode = require( 'EXAMPLE_SIM/example/view/BarMagnetNode' );
  var Bounds2 = require( 'DOT/Bounds2' );
  var ControlPanel = require( 'EXAMPLE_SIM/example/view/ControlPanel' );
  var exampleSim = require( 'EXAMPLE_SIM/exampleSim' );
  var inherit = require( 'PHET_CORE/inherit' );
  var ModelViewTransform2 = require( 'PHETCOMMON/view/ModelViewTransform2' );
  var ScreenView = require( 'JOIST/ScreenView' );
  var Vector2 = require( 'DOT/Vector2' );

  /**
   * Constructor for the ExampleScreenView, it creates the bar magnet node and control panel node.
   *
   * @param {ExampleModel} model - the model for the entire screen
   * @constructor
   */
  function ExampleScreenView( model ) {

    ScreenView.call( this, {
      layoutBounds: new Bounds2( 0, 0, 768, 504 )
    } );

    // model-view transform
    var center = new Vector2( this.layoutBounds.width / 2, this.layoutBounds.height / 2 );
    var modelViewTransform = ModelViewTransform2.createOffsetScaleMapping( center, 1 );

    // An array of BarMagnetNodes that have been added after the initial node
    var addedMagnetNodes = [];

    /**
     * This code assumes that there will only be one view of the model. When model wants to
     * add a new BarMagnet, or remove all added ones, it needs a reference to `this`
     * to be able to [add|remove]Child from this ExampleScreenView Node.
     * By passing this through directly, if two views on the model were required this would not work.
     */
    var thisView = this;

    // Creates a new BarMagnetNode by transforming the barMagnetModel passed in.
    // If added is true, then the node is appended to an array of nodes to be removed on reset.
    function newMagnetChild ( barMagnetModel, added ) {
        var node = new BarMagnetNode( barMagnetModel, modelViewTransform );
        if ( added ) addedMagnetNodes.push( node );
        thisView.addChild( node );
    }

    newMagnetChild( model.originalBarMagnet, false );
    this.addChild( new ControlPanel( model, {
      x: 50,
      y: 50
    } ) );

    // The model object needs references to our methods to add new magnets and remove added ones.
    model.addMagnetToView = ( barMagnetModel ) => newMagnetChild( barMagnetModel, true );
    model.removeAddedMagnetsFromView = () => {
        while ( addedMagnetNodes.length ) thisView.removeChild( addedMagnetNodes.pop() );
    }
  }

  exampleSim.register( 'ExampleScreenView', ExampleScreenView );

  return inherit( ScreenView, ExampleScreenView );
} );
