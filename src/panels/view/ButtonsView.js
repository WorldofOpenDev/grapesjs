define(['backbone','./ButtonView'], 
	function (Backbone, ButtonView) {
	/** 
	 * @class ButtonsView
	 * */
	return Backbone.View.extend({
		
		initialize: function(o) {
			this.opt 		= o;
			this.config		= o.config;
			this.pfx		= o.config.stylePrefix;
			this.parentM	= o.parentM || null;
			this.listenTo( this.collection, 'add', this.addTo );
			this.listenTo( this.collection, 'reset', this.render );
			this.className 	= this.pfx + 'buttons';
		},
		
		/**
		 * Add to collection
		 * @param Object Model
		 * 
		 * @return Object
		 * */
		addTo: function(model){
			this.addToCollection(model);
		},
		
		/**
		 * Add new object to collection
		 * @param	Object	Model
		 * @param	Object 	Fragment collection
		 * 
		 * @return Object Object created
		 * */
		addToCollection: function(model, fragmentEl){
			var fragment	= fragmentEl || null;
			var viewObject	= ButtonView;
			
			var view 		= new viewObject({
				model 	: model, 
				config	: this.config,
				parentM	: this.parentM
			});
			var rendered	= view.render().el;
			
			if(fragment){
				fragment.appendChild(rendered);
			}else{
				this.$el.append(rendered);
			}
			
			return rendered;
		},
		
		render: function() {
			var fragment = document.createDocumentFragment();
			this.$el.empty();
			
			this.collection.each(function(model){
				this.addToCollection(model, fragment);
			}, this);
			
			this.$el.append(fragment);
			this.$el.attr('class', _.result(this, 'className'));
			return this;
		}
	});
});
