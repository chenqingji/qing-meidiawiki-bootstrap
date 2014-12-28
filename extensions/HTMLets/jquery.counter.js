/*
	AJAX DOWNLOAD COUNTER
	Author: 	Michael Spyratos ( mspyratos.com )
	Version:	2.0
*/

(function($) {
	
	$.downloadCounter = function( options ) {
	
		// Set default options
		$.downloadCounter.defaults = {
			path 				:	'http://www.mediawikibootstrapskin.co.uk//extensions/HTMLets/counter.php',
			link_class			:	'counter-link',
			result_class		:	'counter-result',
			time				:	0,
			increment			:	1,
			file_id				:	'auto',
			file_name			:	'auto',
			no_downloads		:	0,
			parent_class		:	0
		}
		
		// Set Options
		options = $.extend(
					{},
					$.downloadCounter.defaults,
					options
		);
		var path 				=	options.path;
		var link_class			=	options.link_class;
		var result_class		=	options.result_class;
		var time				=	options.time;
		var increment			=	options.increment;
		var file_id				=	options.file_id;
		var file_name			=	options.file_name;
		var no_downloads		=	options.no_downloads;
		var parent_class		=	options.parent_class;
		
		// Configure prevention time
		var time_value = parseInt(time, 10);
		if( typeof time_value != 'undefined' && !isNaN( time_value ) ) {
			// If seconds were given
			time = time_value;
		} else {
			// Else translate the value given
			switch( time ) {
				case "hour" :
					time = 60 * 60;
				break;
				case "day" :
					time = 60 * 60 * 24;
				break;
				case "week" :
					time = 60 * 60 * 24 * 7;
				break;
				case "month" :
					time = 60 * 60 * 24 * 30;
				break;
				case "year" :
					time = 60 * 60 * 24 * 365;
				break;
				case "none" :
					time = 0;
				break;
			}
		}
		
		// Configure increment number
		var increment_value = increment;
		if( /[-]/.test(increment) ) {
			var increment_random = increment.split('-');
			var min = increment_random[0];
			var max = increment_random[1];
			increment = Math.floor( Math.random() * (max - min + 1)) + min;
		}
		
		// Display Counts
		$('.'+link_class).each( function() {
			var $this = $(this); // This result div
			if( file_id == 'auto' ) {
				var the_file_id = $this.attr('data-id'); // The file id from data-id attribute
			} else {
				var the_file_id = file_id; // The file id given by the user
			}
			counter("display", the_file_id); // Call counter to display downloads
		});
		
		// Count Downloads
		$("." + link_class).on( 'click', function(e) {
			e.preventDefault(); // Prevent download until we call the counter
			var $this = $(this); // This clicked
			if( file_id == 'auto' ) {
				var the_file_id = $this.attr('data-id'); // The file id from data-id attribute
			} else {
				var the_file_id = file_id; // The file id given by the user
			}
			if( file_name == 'auto' ) {
				var the_file_name = $this.attr('data-name'); // The file name from data-name attribute
				if( typeof the_file_name == 'undefined' ) {
					the_file_name = "unknown";
				}
			} else {
				var the_file_name = file_name; // The file name given by the user
			}
			counter("count", the_file_id, the_file_name); // Call counter to count download
		});
		
		/**
		 * The function that counts the downloads
		 * @param {the_action} [string]. Action to perform. Count a new download or display the total downloads
		 * @param {the_file_id} [int]. Unique ID of the file
		 * @param {the_file_name} [string]. Optional the name of the file
		*/
		function counter( the_action, the_file_id, the_file_name ) {
			// Make the ajax call to counter.php			
			$.ajax({
				type	: "POST",
				url		: path,
				data	: {
					get_action		: the_action,
					get_target_id	: the_file_id,
					get_target_name	: the_file_name,
					get_increment	: increment,
					get_time		: time
				}
			}).success( function( total_counts ) {
				// On success
				if(
					( file_id == 'auto' && $("." + link_class + "[data-id="+the_file_id+"]").siblings("." + result_class).length != 0 ) ||
					( file_id == 'auto' && $("." + link_class + "[data-id="+the_file_id+"]").parents("." + parent_class).find("." + result_class).length != 0 ) ||
					( file_id != 'auto' && $("." + result_class).length != 0 )
				) {
					if( total_counts == 0 ) {
						total_counts = no_downloads;
					}
					if( file_id == 'auto' && parent_class == 0 ) {
						$("." + link_class + "[data-id="+the_file_id+"]").siblings( "." + result_class ).text( total_counts );
					} else if( file_id == 'auto' && parent_class != 0 ) {
						$("." + link_class + "[data-id="+the_file_id+"]").parents("." + parent_class).find( "." + result_class ).text( total_counts );
					} else {
						$( "." + result_class ).text( total_counts );
					}
				} else {
					$( "." + result_class ).text( total_counts );
				}
				if( the_action == "count" ) {
					if( file_id == 'auto' ) {
						window.location.href = $("." + link_class + "[data-id="+the_file_id+"]").attr("href");
					} else {
						window.location.href = $("." + link_class).attr("href");
					}
				}
			}).fail(function() {
				// On fail
				if( file_id == 'auto' && the_action != "display" ) {
					window.location.href = $("." + link_class + "[data-id="+the_file_id+"]").attr("href");
				} else if( the_action != "display" ) {
					window.location.href = $("." + link_class).attr("href");
				}
			});			
		}
		

	}
	
})(jQuery);