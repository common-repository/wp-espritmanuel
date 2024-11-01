function espritmanuel_plugin() {
    return "[espritmanuel-plugin]";
}

(function() {
    tinymce.create('tinymce.plugins.EspritManuel', {
        init : function(ed, url) {
            ed.addButton('espritmanuel', {
                title : 'Insérer un guide EspritManuel',
                image : url+'/em.png',
                onclick : function() {
                    var width = jQuery(window).width(), H = 300, W = ( 720 < width ) ? 720 : width;
					W = W - 80;
					H = H - 84;
					tinymce.DOM.setStyles('TB_window', {
						'height':300+'px'						
					});
					tb_show( 'Insérer un guide EspritManuel', '#TB_inline?width=' + W + '&height=300&inlineId=espritmanuel-form' );
                }
            });
        },
        createControl : function(n, cm) {
            return null;
        },
        getInfo : function() {
			return {
                longname : "Insérer un guide EspritManuel",
                author : 'Vincent Brossier',
                authorurl : 'http://www.espritmanuel.com/',
                infourl : 'http://www.espritmanuel.com/',
                version : "1.0"
            };
        }
    });
    tinymce.PluginManager.add('espritmanuel', tinymce.plugins.EspritManuel);
	
	jQuery(function(){
		var form = jQuery('<div id="espritmanuel-form"><table id="espritmanuel-table" class="form-table">\
			<tr>\
				<th><label for="espritmanuel-id">Identifiant du guide</label></th>\
				<td><input type="text" name="id" id="espritmanuel-guide_id" value="" style="width:300px;"/><br />\
				<small>Entrer le numéro du guide fournit par <a target="_blank" href="http://www.espritmanuel.com">espritmanuel.com</a>. </small>\
			</tr>\
			<tr>\
				<th><label for="espritmanuel-width">Largeur</label></th>\
				<td><select name="width" id="espritmanuel-width"><option value="560">560px</option><option value="640">640px</option></select><br />\
				<small>Sélectionner la largeur du guide dans la page</small>\
			</tr>\
		</table>\
		<p class="submit">\
			<input type="button" id="espritmanuel-submit" class="button-primary" value="Insérer le Guide" name="submit" />\
		</p>\
		</div>');
		
		var table = form.find('table');
		form.appendTo('body').hide();
		
		form.find('#espritmanuel-submit').click(function(){
			var options = { 
				/*'align' : 'center',
				'width': 640,*/
				/*'height' : 580,*/
				'width': 560,
				'guide_id' :''				
				};
			var shortcode = '[em';
			
			for( var index in options) {
				var value = table.find('#espritmanuel-' + index).val();
				
				if ( value !== options[index] )
					shortcode += ' ' + index + '="' + value + '"';
			}
			
			shortcode += ']';
			
			tinyMCE.activeEditor.execCommand('mceInsertContent', 0, shortcode);
			
			tb_remove();
		});
	});
	
})();
