/**
 * https://github.com/sidratul/modalbot
 */

var Modalbot
(function(){
	"use strict"

	Modalbot = function(opts){
		this.options = {
			showHeader : true,
			showFooter : false,
			showClose : false,
			showReset : false,
			showSubmit : false,
			closeLabel : "Close",
			submitLabel : "Submit",
			closeable : true,
			showEvent : function(e){},
			hideEvent : function(e){},
			hiddenEvent : function(e){},
			submitEvent : function(e){ return true },
			hideSubmit : false, 
			hiddenSubmit : false, 
			bodyHtml : "", 
			modalWidth : "normal",
			bReset : '<button type="reset" class="btn btn-default" data-dismiss="modal"></button>',
			bClose : '<button type="button" class="btn btn-default" data-dismiss="modal"></button>',
			bSubmit : '<button type="submit" class="btn btn-default"></button>',
			modalContainer : '<div class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"></div>',
			modalDialog : '<div class="modal-dialog" role="document"></div>',
			modalContent : '<div class="modal-content"></div>',
			modalHeader : '<div class="modal-header"></div>',
			modalBody : '<div class="modal-body"></div>',
			modalFooter : '<div class="modal-footer"></div>',
			headerHtml : '<h4 class="modal-title"></h4>',
			headerTitle : 'Modal title',
			headerClose : '<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>',
		}

		this.elements = {
			modal : $(this.options.modalContainer),
			modalDialog : $(this.options.modalDialog),
			modalHeader : $(this.options.modalHeader),
			modalContent : $(this.options.modalContent),
			modalBody : $(this.options.modalBody),
			modalFooter : $(this.options.modalFooter),
			headerHtml : $(this.options.headerHtml),
			headerClose : $(this.options.headerClose),
			bClose : $(this.options.bClose),
			bSubmit : $(this.options.bSubmit),
		}

		$.extend(this.options,opts)
		this.generate()
	}
	
	function setEvent(el,opts){
		var showEvent = function(e){
			opts.showEvent(e)
		}

		var hideEvent = function(e){
			el.modal.off('hide.bs.modal')
			opts.hideEvent(e)
		}

		var hiddenEvent = function(e){
			el.modal.off('hidden.bs.modal')
			opts.hiddenEvent(e)
		}

		var submitEvent = function(e){
			if(!opts.hideSubmit) el.modal.off('hide.bs.modal',hideEvent)	
			if(!opts.hiddenSubmit) el.modal.off('hidden.bs.modal',hiddenEvent)
			$.when(opts.submitEvent(e)).done(function(hide){
				if(hide !== false) el.modal.modal('hide')
			})
		}

		el.modal.on("show.bs.modal",showEvent);
		el.modal.on("hide.bs.modal",hideEvent);
		el.modal.on("hidden.bs.modal",hiddenEvent);
		el.bSubmit.bind("click",submitEvent);

		if(!opts.closeable){
			el.modal.off("hide.bs.modal")
			el.modal.on("hide.bs.modal",function(e){
				e.preventDefault()
			})
		}
	}

	Modalbot.prototype.generate = function(opts) {
		if(typeof opts !== "undefined") $.extend(this.options,opts);

		var contentEl = [],footerEl = [];

		this.elements.modalDialog.attr("class","modal-dialog")

		if(this.options.modalWidth.match(/large/i)) this.elements.modalDialog.addClass("modal-lg")
		else if(this.options.modalWidth.match(/small/i)) this.elements.modalDialog.addClass("modal-sm")

		this.elements.modalHeader.append(this.elements.headerClose)	
		this.elements.modalDialog.html(this.elements.modalContent)

		this.elements.modal.html(this.elements.modalDialog)
		this.elements.modalHeader.append(this.elements.headerHtml)
		this.elements.headerHtml.html(this.options.headerTitle)

		if(this.options.showHeader) contentEl[0] = this.elements.modalHeader
		if(this.options.showFooter) contentEl[2] = this.elements.modalFooter
		contentEl[1] = this.elements.modalBody

		if(!this.options.showHeader && !this.options.showFooter) this.elements.modalBody.html(this.elements.headerClose)
		this.elements.modalBody.html(this.options.bodyHtml)
		this.elements.modalContent.html(contentEl)

		if(this.options.showClose) footerEl[0] = this.elements.bClose
		if(this.options.showSubmit) footerEl[1] = this.elements.bSubmit
		this.elements.modalFooter.html(footerEl)

		this.elements.bClose.html(this.options.closeLabel)
		this.elements.bSubmit.html(this.options.submitLabel)

		setEvent(this.elements,this.options)
		return this
	};

	Modalbot.prototype.showEvent = function(sf){
		this.elements.modal.on("show.bs.modal",function(e){
			$(this).off('show.bs.modal');
			sf(e)
		});

		return this;
	}

	Modalbot.prototype.hideEvent = function(hf){
		this.elements.modal.on("hide.bs.modal",function(e){
			$(this).off('hide.bs.modal');
			hf(e)
		});

		return this;
	}

	Modalbot.prototype.title = function(title){
		this.elements.headerHtml.html(title);
		return this;
	}

	Modalbot.prototype.body = function(body){
		this.elements.modalBody.html(body);
		return this;
	}

	Modalbot.prototype.show = function(body,title) {
		this.elements.modal.modal('show');
		return this;
	}

	Modalbot.prototype.hide = function() {
		this.elements.modal.modal('hide');
		return this;
	}

	Modalbot.prototype.updateHandler = function() {
		this.elements.modal.modal('updateHandler')
		return this
	}

})()