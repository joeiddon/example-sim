// Copyright 2002-2013, University of Colorado

/**
 * View container.
 *
 * @author Chris Malley (PixelZoom, Inc.)
 * @author Sam Reid (PhET Interactive Simulations)
 */
define( function( require ) {
          "use strict";

          var CanvasQuirks = require( 'PHETCOMMON/view/CanvasQuirks' );
          var PerformanceMonitor = require( 'PHETCOMMON/view/PerformanceMonitor' );
          var ExampleSimStage = require( 'view/ExampleSimStage' );
          var ControlPanel = require( 'view/ControlPanel' );
          var strings = require( 'i18n!../../nls/example-sim-strings' );

          function ExampleSimView( imagesLoader, model ) {

            var that = this;

            // browser window title
            $( 'title' ).html( strings.title );

            // canvas
            var canvas = document.getElementById( 'example-sim-canvas' ); //TODO replace with jquery selector
            CanvasQuirks.fixTextCursor( canvas );

            // stage
            this.stage = new ExampleSimStage( imagesLoader, canvas, model );

            // performance monitor
            this.performanceMonitor = new PerformanceMonitor();

            // view-specific properties
            model.link( 'performanceMonitorVisible', function( model, visible ) {
              that.performanceMonitor.setVisible( visible );
            } );

            // control panel
            ControlPanel.init( strings, model, this );
          }

          // Called by the animation loop
          ExampleSimView.prototype.step = function() {
            this.stage.tick();
          };

          return ExampleSimView;
        }
);