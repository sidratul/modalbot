modal bot

OPTION

Name | value | default | description
-----|-------|---------|------------
showHeader | boolean | true | menampilkan header
showFooter | boolean | false | menampilkan footer
showClose | boolean | true | menampilkan close button
showSubmit | boolean| false | menampilkan submit button
closeLabel | string | "Close" | close button label 
submitLabel | string| "Submit" | submit button label
closeable | boolean | true | is close able modal
hideEvent | function | function(e){} | fucntion called when hide event initiated
hiddenEvent | function| function(e){} | function called when hidden
submitEvent | function | function(e){} | function called when submit
hideSubmit | boolean | false | determinate if hideEvent called after submit
hiddenSubmit | boolean | false |  determinate if hiddenEvent called after submit
bodyHtml | string | "" |  the modal body
modalWidth | string (large,normal,small) | "normal" |  the modal body
bClose | string| `<button type="button" class="btn btn-default" data-dismiss="modal"></button>` | 
bSubmit | string| `<button type="button" class="btn btn-default" data-dismiss="modal"></button>` | 
modalContainer | string| `<div class="modal fade" tabindex="-1" role="dialog" aria-labelledby="myModalLabel"></div>` | 
modalDialog | string| `<div class="modal-dialog" role="document"></div>` | 
modalContent | string| `<div class="modal-content"></div>` | 
modalHeader | string| `<div class="modal-header"></div>` | 
modalBody | string | `<div class="modal-body"></div>` | 
modalFooter | string| `<div class="modal-footer"></div>` | 
headerHtml | string| `<h4 class="modal-title">Modal title</h4>` | 
headerClose | string| `<button type="button" class="close" data-dismiss="modal" aria-label="Close"><span aria-hidden="true">&times;</span></button>` | 

You can call the following method:

* `generate(options)` : generate or regenerate modal object and its event but not yet showm
* `show(body)` : show modal. body parameter can be empty. default : bodyHtml 
* `hide()` : hide modal
* `updateHandler()` : see bootsrap modal updateHandler method