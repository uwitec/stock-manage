
ASPxClientGridView = _aspxCreateClass(ASPxClientControl, {
	constructor: function(name){
		this.constructor.prototype.constructor.call(this, name);
		this.callBacksEnabled = true;
        this.custwindowLeft = null;
        this.custwindowTop = null;
        this.custwindowVisible = null;
        this.activeElement = null;
        this.filterKeyPressInputValue = "";
        this.userChangedSelection = false;
        this.lockFilter = false;
        this.confirmDelete = "";
        this.filterKeyPressTimerId = -1;
        this.savedScrollPosition = 0;
        this.lastMultiSelectIndex = -1;
        this.filterPopupWindow = null;
        this.filterPopupActiveColumnIndex = -1;
        this.filterRowMenuColumnIndex = -1;
        this.editorIDList = [ ];    
        this.SelectionChanged = new ASPxClientEvent();    
        this.FocusedRowChanged = new ASPxClientEvent();  
        this.ColumnSorting = new ASPxClientEvent();    
        this.ColumnGrouping = new ASPxClientEvent();    
        this.ColumnStartDragging  = new ASPxClientEvent();    
        this.ColumnResizing  = new ASPxClientEvent();    
        this.RowExpanding  = new ASPxClientEvent();    
        this.RowCollapsing  = new ASPxClientEvent();    
        this.DetailRowExpanding  = new ASPxClientEvent();    
        this.DetailRowCollapsing  = new ASPxClientEvent();    
        this.RowClick  = new ASPxClientEvent();    
        this.RowDblClick  = new ASPxClientEvent();    
        this.ContextMenu = new ASPxClientEvent();    
        this.CustomizationWindowCloseUp = new ASPxClientEvent();
        this.CustomButtonClick = new ASPxClientEvent();

        this.funcCallbacks = new Array();

        //set from server
		this.pageRowCount = 0;
        this.allowFocusedRow = false;
        this.allowMultiSelection = false;
        this.focusedRowIndex = -1;
        this.selectedWithoutPageRowCount = 0;
        this.visibleStartIndex = 0;
        this.columns = new Array();
        this.isColumnsResizable = false;
        this.isMainControlResizable = false;
        this.isVerticalScrolling = false;
        this.callbackOnFocusedRowChanged = false;
        this.callbackOnSelectionChanged = false;
        this.autoFilterDelay = 1200;
	},
	ClearColumns: function() {
        this.columns = new Array();
	},
    CreateColumn: function (name, index, fieldName) {
        if(!_aspxIsExists(this.columns)) 
            this.columns = new Array();
        this.columns.push(new ASPxClientGridViewColumn(name, index, fieldName));    
    },
	
	_constDXDataRow: function() { return "DXDataRow"; },
	_constDXGroupRow: function() { return "DXGroupRow"; },
	_constDXCustWindow: function() { return "_DXTDcustwindow"; },
	_constDXEmptyHeader: function() { return "_DXTDemptyheader"; },
	_constDXDropTarget: function() { return "_DXT"; },
	_constDXDropSource: function() { return "_DXTD"; },
	_constDXCanGroup: function() { return "_DXTDG"; },
	_constDXMainTable: function() { return "DXMainTable"; },
	_isGroupRow: function(row) { return row.id.indexOf(this._constDXGroupRow()) > -1; },
	GetRootTable: function() { return _aspxGetElementById(this.name); },
	GetGridTD: function() { 
	    var table = this.GetRootTable();
	    if(!_aspxIsExists(table)) return null;
	    return table.rows[0].cells[0];
	},
    GetArrowDragDownImage: function() { return this.GetChildElementById("IADD"); },
    GetArrowDragUpImage: function() { return this.GetChildElementById("IADU"); },
    GetArrowDragFieldImage: function() { return this.GetChildElementById("IDHF"); },
    GetCallbackState: function() { return this.GetChildElementById("CallbackState"); },
	GetSelectionInput: function() { return this.GetChildElementById("DXSelInput"); },
	GetFocusedRowInput: function() { return this.GetChildElementById("DXFocusedRowInput"); },
	GetColResizedInput: function() { return this.GetChildElementById("DXColResizedInput"); },
    GetLoadingPanelDiv: function() {  return this.GetChildElementById("LPD"); },
    GetRow: function(visibleIndex) { 
        var res = this.GetDataRow(visibleIndex);
        if(res == null) res = this.GetGroupRow(visibleIndex);
        return res;
    },
	GetDataRow: function(visibleIndex) { return this.GetChildElementById(this._constDXDataRow() + visibleIndex); },
	GetGroupRow: function(visibleIndex) { return this.GetChildElementById(this._constDXGroupRow() + visibleIndex); },
    GetDataRowSelBtn: function(index) { return this.GetChildElementById("DXSelBtn" + index); },
	GetMainTable: function() { return this.GetChildElementById(this._constDXMainTable()); },
	GetStyleTable: function() { return this.GetChildElementById("DXStyleTable"); },
	GetLoadingPanelContainer: function() { return this.GetChildElementById("DXLPContainer"); },
    IsGroupHeader: function(id) { return id.indexOf("_DXTDgroup") > 0; },
    GetHeadersRow: function() { 
        return this.GetChildElementById("DXHeadersRow"); 
    },
    GetEditingRow: function(obj) { return _aspxGetElementById(obj.name + "_DXEditingRow"); },
    GetEditingErrorRow: function(obj) { return _aspxGetElementById(obj.name + "_DXEditingErrorRow"); },
    GetEditFormTable: function() { return _aspxGetElementById(this.name + "_DXEFT"); },

	GetCustomizationWindow: function() { return aspxGetControlCollection().Get(this.name + this._constDXCustWindow()); },
	GetParentRowsWindow: function() { return aspxGetControlCollection().Get(this.name + "_DXparentrowswindow"); },
    GetEditorPrefix: function() { return "DXEditor"; },
    GetPopupEditForm: function() { return aspxGetControlCollection().Get(this.name  + "_DXPEForm"); },
    GetFilterWindowContent: function(){ return this.GetChildElementById("FPC"); },
    GetFilterRowMenu: function() { return aspxGetControlCollection().Get(this.name + "_DXFilterRowMenu"); },
    
    GetEditorByColumnIndex: function(colIndex) { 
        var list = this._getEditors();
        for(var i = 0; i < list.length; i++) {
            if(this._getNumberFromEndOfString(list[i].name) == colIndex) return list[i];
        }
        return null;
    },    
    Initialize: function(){
        this.constructor.prototype.Initialize.call(this);
        this.SetHeadersClientEvents();
        this._setFocusedRowInputValue();
    },
    AdjustControlCore: function() {
        ASPxClientControl.prototype.AdjustControlCore.call(this);
        this.correctHeaderFooterColumnsWith();
    },
    GetChildElementById: function(childName){
        if(!_aspxIsExists(this.childrenCache)) 
            this.childrenCache = new Object();
        if(!_aspxIsExistsElement(this.childrenCache[childName])) 
            this.childrenCache[childName] = _aspxGetElementById(this.name + "_" + childName);
        return this.childrenCache[childName];
    },
	gridCallBack: function(args) {
	    if(!this.isInitialized) return;
	    this.OnBeforeCallbackOrPostBack();
	    if(!_aspxIsExists(this.callBack) || !this.callBacksEnabled) {
	            this.SendPostBack(args);
	        return;
	    } 
	    var rootTD = this.GetGridTD();
	    this.OnBeforeCallback();
	    var command = this.GetCorrectCommand(args);
        args = this.prepareCallbackArgs(args, rootTD);
        this.lockFilter = true;
   	    this.userChangedSelection = false;
        this.CreateCallback(args, command);
	},
	GetCorrectCommand: function(args) {
	    if(typeof(args) != "string") return "";
	    if(args.indexOf('|') < 0) return args;
        var command = args.substr(0, args.indexOf('|'));
        if(command == "COLUMNMOVE") {
            var list = args.split('|');
            if(list[list.length - 1] == "true") {
                command = "UNGROUP";
            }
            if(list[list.length - 2] == "true") {
                command = "GROUP";
            }
        }
        return command;
	},
	FuncGetCallBackIndex: function(onCallBack) {
	    for(var i = 0; i < this.funcCallbacks.length; i ++) {
	        if(this.funcCallbacks[i] == null) {
	            this.funcCallbacks[i] = onCallBack;
	            return i;
	        }
	    }
	    this.funcCallbacks.push(onCallBack);
	    return this.funcCallbacks.length - 1;
	},
	GetFuncCallBack: function(index) {
	    if(index < 0 || index >= this.funcCallbacks.length) return null;
	    var result = this.funcCallbacks[index];
	    this.funcCallbacks[index] = null;
	    return result;
	},
	gridFuncCallBack: function(args, onCallBack) {
        args = this.formatCallbackArg("FB", this.FuncGetCallBackIndex(onCallBack).toString())
            + this.prepareCallbackArgs(args, null);
        this.CreateCallback(args, "FUNCTION");
    },	
    prepareCallbackArgs: function(args, rootTD) {
        args = this.formatCallbackArg("EV", this.GetEditorValues(rootTD)) +
            this.formatCallbackArg("SR", this.GetSelectedState()) +
            this.formatCallbackArg("FR", this.GetFocusedRowInput()) +
            this.formatCallbackArg("CR", this.GetColResizedInput()) + 
            this.formatCallbackArg("GB", args); 
        return args;
    },
    formatCallbackArg: function(prefix, arg) {
        if(arg == null) return "";
        if(!_aspxIsExists(arg.length) && _aspxIsExists(arg.value)) {
            arg = arg.value;
        }
        if(arg == null || arg == "") return "";
        return prefix + "|" + arg.length + ';' + arg + ';';
    },
	OnCallback: function(result){
	    if(result.indexOf("FB|") == 0) {
	        _aspxSetTimeout("aspxGVFuncCallback(\""+this.name+"\", \"" + escape(result.substr(3)) +"\");", 0);
	    } else {
	        var rootTD = this.GetGridTD();
	        if(rootTD != null) {
	            rootTD.innerHTML = result;
	        }
            _aspxSetTimeout("aspxRestoreCallBackTimer(\""+this.name+"\");", 0);
	    }
	},
	OnFuncCallback: function(result) {
	    var pos = result.indexOf("|");
	    if(pos < 0) return;
	    var index = parseInt(result.substr(0, pos), 10);
	    var onCallBack = this.GetFuncCallBack(index);
	    if(onCallBack == null) return;
	    result = result.substr(pos + 1);
	    onCallBack(eval(result));
	},
	OnCallbackError: function(result, data){
	    var rootTD = this.GetGridTD();
	    this.showingError = result;
	    if(rootTD != null) 
            _aspxSetTimeout("aspxRestoreCallBackTimer(\"" + this.name + "\");", 0);
	},
	ShowError: function(errorText) {
	    var displayIn = this;
        if(_aspxIsExists(this.GetPopupEditForm())) {
            displayIn = this.GetPopupEditForm();
            if(!this.GetPopupEditForm().IsVisible()) {
                this.GetPopupEditForm().Show();	    
            }
        }
	    var errorRow = this.GetEditingErrorRow(displayIn);
	    if(errorRow == null) {
    	    var editRow = this.GetEditingRow(displayIn);
    	    if(editRow != null) {
            	    errorRow = editRow.parentNode.insertRow(editRow.sectionRowIndex + 1);
            	    errorRow.id = editRow.id.replace("DXEditingRow", "DXEditingErrorRow");
        	    this.ApplyEditingErrorRowStyle(errorRow);
    	    }
	    }
	    if(errorRow != null) {
	        errorRow.cells[errorRow.cells.length - 1].innerHTML = errorText;
	    } else {
	      alert(errorText);
	    }
	},
	ApplyEditingErrorRowStyle: function(errorRow) {
	    var row = this.GetStyleTable().rows[1];
	    errorRow.className = row.className;
	    errorRow.style.cssText = row.style.cssText;
	    for(var i = 0; i < row.cells.length; i ++) {
	        errorRow.appendChild(row.cells[i].cloneNode(true));
	    }
	},
	OnBeforeCallbackOrPostBack: function() {
	    this.lastMultiSelectIndex = -1;
	    this.HidePopupEditForm();
	},
	OnBeforeCallback: function() {
	    this.CreateLoadingPanel(this.GetGridTD());
	    this.SaveCallbackSettings();
	},
	OnAfterCallback: function() {
	    if(_aspxIsExists(this.showingError) && this.showingError != "") {
  	        this.ShowError(this.showingError);
       	    this.showingError = null;
  	    }
	    this.childrenCache = new Object();
	    this.lockFilter = true;
	    try {
	        this.SetHeadersClientEvents();
	        this.RestoreCallbackSettings();
	    }
	    finally {
	        this.lockFilter = false;
	    }
	},
	SaveCallbackSettings: function() {
	    this.saveScrollPosition();
	    var el = this.activeElement;
	    this.activeElement = null;
	    this.savedActiveElementId = null;
	    if(el != null && el.id.indexOf(this.name) == 0) {
	        this.SaveActiveElementSettings(el);
	    }
	    var custWindow = this.GetCustomizationWindow();
	    if(custWindow != null) {
            var custWindowElement = custWindow.GetWindowElement(-1);
            if(_aspxIsExists(custWindowElement )){
                this.custwindowLeft = _aspxGetAbsoluteX(custWindowElement) - _aspxGetIEDocumentClientOffset(true);
                this.custwindowTop = _aspxGetAbsoluteY(custWindowElement) - _aspxGetIEDocumentClientOffset(false);
                this.custwindowVisible = custWindow.IsVisible();
            }
	    } else {
    	    this.custwindowVisible = null;
	    }
	},
	RestoreCallbackSettings: function() {
	    var custWindow = this.GetCustomizationWindow();
	    if(custWindow != null && this.custwindowVisible != null) {
            if(this.custwindowVisible){
                custWindow.enableAnimation = false;
                custWindow.ShowAtPos(this.custwindowLeft, this.custwindowTop);
            }
	    }
	    this.RestoreActiveElementSettings();
	    this.correctHeaderFooterColumnsWith();
	    this.restoreScrollPosition();
	},
	SaveActiveElementSettings: function(element) {
	    if(element.tagName.toUpperCase() != "INPUT") return;
	    this.savedActiveElementId = element.id;
	    this.savedActiveElementCaret = _aspxGetCaretEnd(element);
	},
	RestoreActiveElementSettings: function() {
	    if(this.savedActiveElementId == null) return;
	    var element = _aspxGetElementById(this.savedActiveElementId);
	    if(_aspxIsExists(element)) {
	        element.focus();
	        _aspxSetCaret(element, this.savedActiveElementCaret);
	    }
	    this.savedActiveElementId = null;
	},
	HidePopupEditForm: function() {
	    var popup = this.GetPopupEditForm();
	    if(popup != null) {
            popup.CloseUp.ClearHandlers();
            popup.Hide();
        }
	},
	_isRowSelected: function(visibleIndex) {
	    if(!_aspxIsExists(this.GetDataRow(visibleIndex))) return false;
	    var index = this._getRowIndexOnPage(visibleIndex);
	    var selInput = this.GetSelectionInput();
	    if(!_aspxIsExists(selInput)) return false;
	    return this._isTrueInCheckList(selInput.value, index);
	},
	_isTrueInCheckList: function(checkList, index) {
        if(index < 0 ||  index >= checkList.length) return false;
        return checkList.charAt(index) == "T";
	},
	_getSelectedRowCount: function() {
	    var res = this.selectedWithoutPageRowCount;
	    var selInput = this.GetSelectionInput();
	    if(!_aspxIsExists(selInput)) return res;
        var checkList = selInput.value;
        var selCount = 0;
        for(var i = 0; i < checkList.length; i++) {
            if(checkList.charAt(i) == "T") selCount ++;
        }
        return res + selCount;
	},
	_selectAllRowsOnPage: function(checked) {
	    var selInput = this.GetSelectionInput();
	    if(!_aspxIsExists(selInput)) return;
        this._selectAllSelBtn(checked);
	    for(var i = 0; i < this.pageRowCount; i ++) {
	        if(this._isTrueInCheckList(selInput.value, i) != checked) {
	            this.ChangeRowStyle(i + this.visibleStartIndex, checked ? 0 : 3);
	        }
	    }
	    var selValue = "";
	    if(checked) {
	        for(var i = 0; i < this.pageRowCount; i ++)
	            selValue += this.IsDataRow(this.visibleStartIndex + i ) ? "T" : "F";
	    }
	    if(selValue != selInput.value) {
    	    this.userChangedSelection = true;
    	    if(selValue == "") selValue = "U";
	        selInput.value = selValue;
	        //todo fire event
	    }
	    this.DoSelectionChanged(-1, checked, true);
	},
	DeleteGridRow: function(visibleIndex) {
	    if(this.confirmDelete != "" && !confirm(this.confirmDelete)) return;
	    this.DeleteRow(visibleIndex);
	},
	_selectAllSelBtn: function(checked) {
	    if(this.pageRowCount <= 0) return;
	    for(var i = 0; i < this.pageRowCount; i ++) {
	        var element = this.GetDataRowSelBtn(i + this.visibleStartIndex);
	        if(element != null) {
	            element.checked = checked;
	        }
	    }
	},
	SelectRowCore: function(visibleIndex, check) {
	    var checked = false;
	    var isCheckBox = _aspxIsExists(check) && _aspxIsExists(check.checked) && _aspxIsExists(check.type) && check.type.toLowerCase() == "checkbox";
	    if(!isCheckBox) {
	        checked = !this._isRowSelected(visibleIndex);
	    } else {
	        checked = check.checked;
	    }
        this.SelectRow(visibleIndex, checked, isCheckBox);
    },
    doRowMultiSelect: function(row, rowIndex, evt) {
        _aspxClearSelection();
        if(!evt.ctrlKey && !evt.shiftKey) {
            this._selectAllRowsOnPage(false);
            this.SelectRow(rowIndex, true);
            this.lastMultiSelectIndex = rowIndex;
        } else {
            if(evt.ctrlKey) {
                this.SelectRow(rowIndex, !this._isRowSelected(rowIndex));
                this.lastMultiSelectIndex = rowIndex;
            } else {
                var startIndex = rowIndex > this.lastMultiSelectIndex ? this.lastMultiSelectIndex + 1 : rowIndex;
                var endIndex = rowIndex > this.lastMultiSelectIndex ? rowIndex : this.lastMultiSelectIndex - 1;
                for(var i = this.visibleStartIndex; i < this.pageRowCount + this.visibleStartIndex; i ++) {
                    if(i == this.lastMultiSelectIndex) continue;
                    this.SelectRow(i, i >= startIndex && i <= endIndex);
                }
            }
        }
    },
	SelectRow: function(visibleIndex, checked, fromCheckBox) {
	    if(!this.IsDataRow(visibleIndex)) return;
	    if(_aspxIsExists(fromCheckBox)) fromCheckBox = false;
	    var index = this._getRowIndexOnPage(visibleIndex);
	    if(index < 0) return;
	    var selInput = this.GetSelectionInput();
	    if(_aspxIsExists(selInput)) {
	        this.userChangedSelection = true;
	        var checkList = selInput.value;
	        if(index >= checkList.length) {
	            if(!checked) return;
	            for(var i = checkList.length; i <= index; i ++)
	                checkList += "F";
	        }
	        checkList = checkList.substr(0, index) + (checked ? "T" : "F") + checkList.substr(index + 1, checkList.length - index - 1);
	        if(checkList.indexOf("T") < 0) checkList = "U";
	        selInput.value = checkList;
	    }
	    if(!fromCheckBox) {
	        var checkBox = this.GetDataRowSelBtn(visibleIndex);
	        if(checkBox != null) checkBox.checked = checked;
	    }
	    this.ChangeRowStyle(visibleIndex, checked ? 0 : 3);
	    this.DoSelectionChanged(visibleIndex, checked, false);
	},
	getRowByHtmlEvent: function(evt) {
	    var row = _aspxGetParentByPartialId(_aspxGetEventSource(evt), this._constDXDataRow());
	    if(!_aspxIsExists(row))
	        row = _aspxGetParentByPartialId(_aspxGetEventSource(evt), this._constDXGroupRow());
	    return row;
	},
	mainTableClick: function(evt) { this.getGridByRow(evt).mainTableClickCore(evt); },
	mainTableClickCore: function(evt) {
	    var row = this.getRowByHtmlEvent(evt);
	    if(_aspxIsExists(row)) {
	        var rowIndex = this.getRowIndex(row.id);
	        if(this.RaiseRowClick(rowIndex, evt)) return;    
    	    if(this.allowFocusedRow) {
	            this.focusRow(row);
	        }
	        if(this.allowMultiSelection) {
	            if(_aspxGetEventSource(evt) != this.GetDataRowSelBtn(rowIndex)) {
	                this.doRowMultiSelect(row, rowIndex, evt);
	            }
	        }
	    }
	},
	mainTableDblClick: function(evt) { this.getGridByRow(evt).mainTableDblClickCore(evt); },
	mainTableDblClickCore: function(evt) {
	    var row = this.getRowByHtmlEvent(evt);
	    if(_aspxIsExists(row)) {
	        this.RaiseRowDblClick(this.getRowIndex(row.id), evt);    
	    }
	},
	getGridByRow: function(rowEvt) {
	    var row = this.getRowByHtmlEvent(rowEvt);
	    if(!_aspxIsExists(row)) return this;
	    var id = row.offsetParent.id;
	    id = id.substr(0, id.length - this._constDXMainTable().length - 1);
	    var table = aspxGetControlCollection().Get(id);
	    return _aspxIsExists(table) ? table : this;
    },
	focusRow: function(row) {
	    if(!_aspxIsExists(row)) return;
	    var index = this.getRowIndex(row.id);
	    this._setFocusedRowIndex(index);
	},
	_setFocusedRowIndex: function(visibleIndex) {
		if(visibleIndex < 0) visibleIndex = -1;
	    if(!this.allowFocusedRow) return;
	    var row = this.GetRow(visibleIndex);
	    if((visibleIndex > -1 && row == null) || visibleIndex == this.focusedRowIndex) return;
	    var oldFocusedRow = this.focusedRowIndex;
	    this.focusedRowIndex = visibleIndex;
	    this.ChangeRowStyle(oldFocusedRow, this._isRowSelected(oldFocusedRow) ? 0 : 3);
	    if(this.focusedRowIndex > -1)
	    this.ChangeRowStyle(this.focusedRowIndex, this._isGroupRow(row) ? 2 : 1);
	    this._setFocusedRowInputValue();
	    if(this.callbackOnFocusedRowChanged) {
	        this.gridCallBack("FOCUSEDROW");
	        return;
	    }
        this.RaiseFocusedRowChanged();
	},
	_setFocusedRowInputValue: function() {
	    if(this.GetFocusedRowInput() != null) {
	        this.GetFocusedRowInput().value = this.focusedRowIndex;
	    }
	},
    _getFocusedRowIndex: function() {
	    if(!this.allowFocusedRow) return -1;
	    return this.focusedRowIndex;
    },
    getColumnIndex: function(colId) { 
        if(colId.indexOf(this._constDXEmptyHeader()) > -1) return 0;
        var index = this._getNumberFromEndOfString(colId); 
        return colId.indexOf("col" + index) > -1 ? index : -1;
    },
    getRowIndex: function(rowId) { return this._getNumberFromEndOfString(rowId); },
    _getNumberFromEndOfString: function(st) {
        var value = -1;
        var n = st.length - 1;
        while(parseInt(st.substr(n), 10) >= 0) {
            value = parseInt(st.substr(n), 10);
            n --;
        }
        return value;
    },
	GetSelectedState: function() {
	    if(!this.userChangedSelection) return null;
	    if(!_aspxIsExists(this.GetSelectionInput())) return null;
	    return this.GetSelectionInput().value;
	},
	//rowStyle -> 0 - selected, 1 - focused Row, 2 - focused GroupRow, 3 - regular row
	ChangeRowStyle: function(visibleIndex, rowStyle) {
	    if(this._getFocusedRowIndex() == visibleIndex && rowStyle != 1 && rowStyle != 2) return;
	    var row = this.GetRow(visibleIndex);
	    if(!_aspxIsExists(row)) return;
	    if(rowStyle == 0 && this._isGroupRow(row)) return; // do not select the group row
	    var index = this._getRowIndexOnPage(visibleIndex);
	    var styleRow = this._getStyleRow(index, rowStyle);
	    if(!_aspxIsExists(styleRow)) return;
	    row.className = styleRow.className;
	    row.style.cssText = styleRow.style.cssText;
	},
	_getRowIndexOnPage: function(visibleIndex) { 
	    return visibleIndex - this.visibleStartIndex; 
	},
    _getColumnIndexByColumnObject: function(column) {
        if(!_aspxIsExists(column)) return null;
        //if(typeof(column) == "number") return column;
        if(_aspxIsExists(column.index)) return column.index;
        return column;
    },
    _getColumnObjectByArg: function(arg) {
        if(!_aspxIsExists(arg)) return null;
        if(typeof(arg) == "number") return this._getColumn(arg);
        if(_aspxIsExists(arg.index)) return arg;
        var column = this._getColumnById(arg);
        if(_aspxIsExists(column)) return column;
        return this._getColumnByField(arg);        
    },
    _getColumnsCount: function() { return this.columns.length; },
    _getColumn: function(index) { 
        if(index < 0 || index >= this.columns.length) return null;
        return this.columns[index];
    },
    _getColumnById: function(id) {
        if(!_aspxIsExists(id)) return null;
        for(var i = 0; i < this.columns.length; i++) {
            if(this.columns[i].id == id) return this.columns[i];
        }
        return null;
    },
    _getColumnByField: function(fieldName) {
        if(!_aspxIsExists(fieldName)) return null;
        for(var i = 0; i < this.columns.length; i++) {
            if(this.columns[i].fieldName == fieldName) return this.columns[i];
        }
        return null;
    },
	//0 - selected, 1 - focused data row,  2  - focused group row, 3 - regular
	_getStyleRow: function(index, rowStyle) {
	    var styleTable = this.GetStyleTable();
	    if(!_aspxIsExists(styleTable)) return null;
	    if(rowStyle < 3) return styleTable.rows[rowStyle + 2];
	    return styleTable.rows[5 + index];
	},
    DoSelectionChanged: function(index, isSelected, isSelectAllOnPage){
        if(this.callbackOnSelectionChanged) {
            this.gridCallBack("SELECTION");
            return;
        }
        this.RaiseSelectionChanged(index, isSelected, isSelectAllOnPage, false);
    },
    CommandCustomButton:function(id, index) {
		var processOnServer = true;
		if(!this.CustomButtonClick.IsEmpty()) {
			var e = new ASPxClientGridViewCustomButtonEventArgs(index, id);
			this.CustomButtonClick.FireEvent(this, e);
			processOnServer = e.processOnServer;
		}
		if(processOnServer)
			this.gridCallBack("CUSTOMBUTTON|" + id +"|" + index);
    },
    HeaderColumnResizing: function(e){
        var element = _aspxGetEventSource(e);
        if(!_aspxIsExists(element)) return;
        if(!_aspxIsExistsType(typeof(ASPxClientTableColumnResizing))) return;
        if(!_aspxIsExists(this.columnResizing)) {
            this.columnResizing = new ASPxClientTableColumnResizing(this, "DXMainTable", "DXHeaderTable", "DXFooterTable");
            this.columnResizing.CanResizeLastColumn = this.isMainControlResizable;
        }
        var cursor = this.columnResizing.GetCursor(element, e, this.indentColumnCount);
        if(_aspxIsExists(cursor) && cursor != "")
            element.style.cursor = cursor;
    },
	HeaderMouseDown: function(element, e){
        if(!_aspxGetIsLeftButtonPressed(e)) return;
        var source = _aspxGetEventSource(e);
        if(_aspxIsExists(source.onclick))
            return;
        if(this.startColumnResizing(element, e)) return;

        var column = this._getColumnObjectByArg(this.getColumnIndex(element.id));
        if(this.RaiseColumnStartDragging(column)) return;

        var canDrag = (element.id.indexOf(this._constDXDropSource()) > -1) && (source.tagName!="IMG");
	    var drag = this.createDrag(e, element, canDrag);
        this.createTargets(drag, e);
	},
	createDrag: function(e, element, canDrag) {
	    var drag = new ASPxClientDragHelper(e, element, true);
	    drag.canDrag = canDrag;
	    drag.onDragDivCreating = this.DragDivCreating;
	    drag.grid = this;
	    drag.ctrl = aspxGetCtrlKey(e);
	    drag.shift = aspxGetShiftKey(e);
        drag.onDoClick = this.headerDoClick;
        drag.onCloneCreating = this.cloneCreating;
        drag.onEndDrag = this.endDrag;
        drag.onCancelDrag = this.cancelDrag;
        return drag;
	},	
	createTargets: function(drag, e) {
	    if(!drag.canDrag) return;
        var targets = new ASPxClientCursorTargets();
        targets.obj = drag.obj;
        targets.grid = this;
        targets.onTargetChanging = this.targetChanging; 
        targets.onTargetChanged = this.targetChanged; 
        var targertIds = new Array();
        targertIds.push(this._constDXCustWindow());
        targertIds.push(this._constDXDropTarget());
        targets.RegisterTargets(this.GetRootTable(), targertIds);
        targets.removeInitialTarget(e.clientX, e.clientY);
	},
	startColumnResizing: function(element, e) {
        if(!_aspxIsExists(this.columnResizing)) return false;
        if(!this.columnResizing.CanStartResizing(element, e, this.indentColumnCount)) return false;
        
        var column = this._getColumnObjectByArg(this.getColumnIndex(element.id));
        if(this.RaiseColumnResizing(column)) return false;
        
        this.setScrollPosition(0);
        this.columnResizing.StartResizing(element, e, this.indentColumnCount);
        this.columnResizing.SetResizedInput(this.GetColResizedInput());
        if(this.isMainControlResizable) {
            this.columnResizing.SetResizableControl(this.GetRootTable());
        }
        this.columnResizing.SetEditorsList(this._getEditors());
        return true;
	},
	DragDivCreating: function(drag, dragDiv) {
	    var rootTable = drag.grid.GetRootTable();
	    if(!_aspxIsExists(dragDiv) || !_aspxIsExists(rootTable)) return;
	    dragDiv.className = rootTable.className;
	    dragDiv.style.cssText = rootTable.style.cssText;
	},
    headerDoClick: function(drag) {
        if(!drag.grid.getIsColumnCanSort(drag.obj)) return;
        var order = "";
        drag.grid.SortBy(drag.grid.getColumnIndex(drag.obj.id), drag.ctrl ? "NONE" : "", !drag.shift && !drag.ctrl);
    },
    cancelDrag: function(drag) {
        drag.grid.targetImagesChangeVisibility("hidden");
    },
    endDrag: function(drag) {
        if(drag.targetElement == null) return;
        var grid = drag.grid;        
        var column = grid.getColumnIndex(drag.obj.id);
        var id = drag.targetElement.id;
        var columnTo = grid.getColumnIndex(id);
        var isLeft = grid.IsRightToLeft() ? !drag.targetTag : drag.targetTag;
        grid.MoveColumn(column, columnTo, isLeft, grid.IsGroupHeader(id), grid.IsGroupHeader(drag.obj.id));
    },
    cloneCreating: function(clone) {
        var table = document.createElement("table");
        table.width = this.obj.offsetWidth + "px";
        var row = table.insertRow(-1);
        clone.style.borderLeftWidth = __aspxOpera ? "0px" : "";
        clone.style.borderTopWidth = "";
        clone.style.borderRightWidth = __aspxOpera ? "0px" : "";
        row.appendChild(clone);
        return table;
    },
    targetChanging: function(targets) {
        targets.targetTag = targets.isLeftPartOfElement();
        if(targets.grid.IsTagertElementGroupPanel(targets)) {
            targets.targetTag = true;
            if(!targets.grid.getIsColumnCanGroup(targets.obj)) {
                targets.targetElement = null;
            }
        }
    },
    IsTagertElementGroupPanel: function(targets) {
        return targets.targetElement != null && targets.targetElement.id.indexOf("grouppanel") > -1;
    },
    targetChanged: function(targets) {
       if(__aspxDragHelper == null) return;
       if(targets.targetElement == __aspxDragHelper.obj) return;
       if(targets.targetElement != null) {
            __aspxDragHelper.targetElement = targets.targetElement;
            __aspxDragHelper.targetTag = targets.targetTag;
            var left = _aspxGetAbsoluteX(targets.targetElement);
            if(targets.targetTag == false) {
                left += targets.targetElement.offsetWidth;
            }
            targets.grid.setDragImagesPosition(targets.targetElement, left);
        } else {
            __aspxDragHelper.targetElement = null;
            targets.grid.targetImagesChangeVisibility("hidden");
        }
    },
    targetImagesChangeVisibility: function(vis) {
        if(this.GetArrowDragDownImage() == null) return;
        this.GetArrowDragDownImage().style.visibility = vis;
        this.GetArrowDragUpImage().style.visibility = vis;
        if(__aspxDragHelper != null) {
            __aspxDragHelper.removeElementFromDragDiv();
        }
    },
    setDragImagesPosition: function(el, left) {
        this.targetImagesChangeVisibility("hidden");
        if(el == this.getCustomizationWindowElement()) {
            __aspxDragHelper.addElementToDragDiv(this.GetArrowDragFieldImage());
        } else {
            left -= _aspxGetPositionElementOffset(el, true);
            var top = _aspxGetAbsoluteY(el) - _aspxGetPositionElementOffset(el, false);
            this.targetImagesChangeVisibility("visible");
            if(this.GetArrowDragDownImage() != null) {
                this.GetArrowDragDownImage().style.left = left + "px";
                this.GetArrowDragUpImage().style.left = left + "px";
                this.GetArrowDragDownImage().style.top = (top - this.GetArrowDragDownImage().offsetHeight) + "px";
                this.GetArrowDragUpImage().style.top = (top + el.offsetHeight) + "px";
            }
        }
    },
    getCustomizationWindowElement: function() {
        if(this.GetCustomizationWindow() != null) 
            return this.GetCustomizationWindow().GetWindowElement(-1);
        return null;
    },
    OnParentRowMouseEnter: function(element) {
        if(this.GetParentRowsWindow() == null) return;
        if(this.GetParentRowsWindow().IsWindowVisible()) return;
        this.ParentRowsTimerId = _aspxSetTimeout("aspxGVParentRowsTimer(\""+this.name+"\", \"" + element.id + "\");", 500);
    },
    OnParentRowMouseLeave: function(evt) {
        if(_aspxIsExists(this.ParentRowsTimerId)) {
            _aspxClearTimer(this.ParentRowsTimerId);
        }
        if(this.GetParentRowsWindow() == null) return;
        if(_aspxIsExists(evt) && _aspxIsExists(evt.toElement)) {
            if(_aspxGetParentByPartialId(evt.toElement, this.GetParentRowsWindow().name) != null)
              return;
        }
        this.HideParentRows();
    },
    ShowParentRows: function(element) {
        this.ParentRowsTimerId = null;
        if(this.GetParentRowsWindow() != null) {
            this.GetParentRowsWindow().ShowAtElement(element);
            //this.GetParentRowsWindow().ShowAtPos(_aspxGetAbsoluteX(element) + element.offsetWidth - 1, _aspxGetAbsoluteY(element) - 1);
        }
    },
    ShowFilterPopup: function(headerName, colIndex, htmlEvent) {
        if(this.filterPopupWindow == null) {
            this.filterPopupWindow = new ASPxClientPopupFilterWindow(this.name);
        }
        if(this.filterPopupWindow.IsShowing() && this.filterPopupActiveColumnIndex == colIndex) {
			this.HideFilterPopup();
			return;
		}
        var header = this.GetChildElementById(headerName);
        if(header == null) return;
        this.filterPopupWindow.Show(header, this.GetMainTable());
        this.filterPopupActiveColumnIndex = colIndex;
        this.gridFuncCallBack("FILTERPOPUP|" + this.name + "|" + colIndex + "|" + (aspxGetShiftKey(htmlEvent) ? "T" : ""), this.onFilterPopupCallback);
        var content = this.GetFilterWindowContent();
        if(content != null) {
			content.innerHTML = "";
            var el = this.CreateLoadingPanelInsideContainer(content);
            _aspxRemoveBorders(el);
            var contentStyle = _aspxGetCurrentStyle(content);
            if(contentStyle != null) {
                _aspxSetBackground(el, contentStyle.backgroundColor);
            }
        }
    },
    HideFilterPopup: function() {
        if(this.filterPopupWindow == null) return;
        this.filterPopupWindow.Hide();
        this.filterPopupWindow = null;
        this.filterPopupActiveColumnIndex = -1;
    },
    onFilterItemOver: function(row) {
        row.oldclassName = row.className;
        row.oldcssText = row.style.cssText;
        var table = row.offsetParent;
        var selRow = table.rows[table.rows.length - 1];
        row.className = selRow.className;
        row.style.cssText = selRow.style.cssText;
    }, 
    onFilterItemOut: function(row) {
        row.className = row.oldclassName;
        row.style.cssText = row.oldcssText;
    }, 
    onFilterPopupCallback: function(values) {
        var grid = aspxGetControlCollection().Get(values[0]);
        if(grid == null) return;
        var fwContent = grid.GetFilterWindowContent();
        if(fwContent == null) return;
        fwContent.innerHTML = values[1];
    },
    HideParentRows: function() {
        this.ParentRowsTimerId = null;
        if(this.GetParentRowsWindow() != null) {
            this.GetParentRowsWindow().Hide();
        }
    },
    getIsColumnCanSort: function(colElement) {
        return this.getIsColumnCanDoOperation(colElement, "S");
    },
    getIsColumnCanGroup: function(colElement) {
        return colElement.id.indexOf(this._constDXCanGroup()) > -1;
    },
    getIsColumnCanDoOperation: function(colElement, op) {
        return colElement.id.indexOf(op) > -1;
    },
    doPagerOnClick: function(id) {
        if(!_aspxIsExists(id)) return;
        this.gridCallBack("PAGERONCLICK|"+id);
    },
    OnColumnFilterInputChanged: function(editor) {
        this.ApplyColumnAutoFilterCore(editor);
    },
    OnColumnFilterInputSpecKeyPress: function(editor, e) {
        if(_aspxIsExists(e.htmlEvent)) e = e.htmlEvent;
        if(e.keyCode == 13) {
            e.cancelBubble = true;
            e.returnValue = false;
            editor.Validate();
            this.ApplyColumnAutoFilterCore(editor);
            return;
        }
        if(e.keyCode == 46 && e.ctrlKey) {
            e.cancelBubble = true;
            e.returnValue = false;
            editor.SetValue(null);
            this.ApplyColumnAutoFilterCore(editor);
            return;
        }
    },
    OnColumnFilterInputKeyPress: function(editor, e) {
        this.OnColumnFilterInputSpecKeyPress(editor, e);
        if(_aspxIsExists(e.htmlEvent)) e = e.htmlEvent;
        if(e.keyCode == 9) {
            e.cancelBubble = true;
        }
        if(e.keyCode == 13) return;
        if(e.keyCode == 46 && e.ctrlKey) return;
        this.ClearAutoFilterInputTimer();
        if(editor != this.FilterKeyPressEditor) {
            this.filterKeyPressInputValue = editor.GetValueString();
        }
        this.FilterKeyPressEditor = editor;
        this.filterKeyPressTimerId = _aspxSetTimeout("aspxGVTimer(\""+this.name+"\");", this.autoFilterDelay);
    },
    ClearAutoFilterInputTimer: function() {
        this.filterKeyPressTimerId = _aspxClearTimer(this.filterKeyPressTimerId);
    },
    GetAutoFilterEditorInputElement: function(editor) {
        if(_aspxIsExists(document.activeElement)) return document.activeElement;
        if(_aspxIsExists(editor.GetInputElement)) return editor.GetInputElement();
        return null;
    
    },
    OnFilterKeyPressTick: function() {
        if(_aspxIsExists(this.FilterKeyPressEditor)) {
            this.ApplyColumnAutoFilterCore(this.FilterKeyPressEditor);
        }
    },
    ApplyColumnAutoFilterCore: function(editor) {
        if(this.lockFilter) return;
        this.ClearAutoFilterInputTimer();
        if(_aspxIsExists(this.FilterKeyPressEditor) && editor == this.FilterKeyPressEditor) {
            if(this.FilterKeyPressEditor.GetValueString() == this.filterKeyPressInputValue) return;
        }
        var column = this.getColumnIndex(editor.name);
        if(column < 0) return;
        this.activeElement = this.GetAutoFilterEditorInputElement(editor);
        this.AutoFilterByColumn(column, editor.GetValueString());
    },
    FilterRowMenuButtonClick: function(columnIndex, element) {    
		var menu = this.GetFilterRowMenu();
		if(!menu) return;
		for(var i = menu.GetItemCount() - 1; i >= 0; i--) {
			var item = menu.GetItem(i);
			item.SetChecked(item.name == this.filterRowConditions[columnIndex]);		
		}
		menu.ShowAtElement(element);
		this.filterRowMenuColumnIndex = columnIndex;
    },
    FilterRowMenuItemClick: function(item) {
		this.gridCallBack("FILTERROWMENU|" + this.filterRowMenuColumnIndex + "|" + item.name);
    },
    
    //loading panel
    CreateLoadingPanel: function(content) {
        if(content == null) return;
        
        this.CreateLoadingDiv(content);
        var lpContainer = this.GetLoadingPanelContainer();
        if(lpContainer == null)
			this.CreateLoadingPanelWithAbsolutePosition(content);
	    else
			this.CreateLoadingPanelInline(lpContainer);
    },
    ///Editors
    _updateEdit: function() {
		if(window.ASPxClientEdit && !ASPxClientEdit.ValidateEditorsInContainer(this.GetEditFormTable(), this.name))
			return;
        var list = this._getEditors();
        if(list.length != 0) {
            if(!this._validate(list)) return;
        }
        this.gridCallBack("UPDATEEDIT");
    },
    _validate: function(list) {
        var isValid = true;
        var firstInvalid = null;
        var edit;
        for(var i = 0; i < list.length; i ++) {
            edit = list[i];
            edit.Validate();
            isValid = edit.GetIsValid() && isValid;
            if(firstInvalid == null && edit.setFocusOnError && !edit.GetIsValid())
                firstInvalid = edit;
        }
        if (firstInvalid != null)
            firstInvalid.Focus();
        return isValid;
    },
    _getEditors: function() {
		var list = [ ];
		for(var i = 0; i < this.editorIDList.length; i++) {
			var editor = aspxGetControlCollection().Get(this.editorIDList[i]);
			if(editor && editor.GetMainElement && _aspxIsExistsElement(editor.GetMainElement()))
				list.push(editor);
        }
        return list;
    },
    GetEditorValues: function() {
        var list = this._getEditors();
        if(list.length == 0) return null;
        //if(!this.Validate(list)) return null;
        var res = list.length + ";";
        for(var i = 0; i < list.length; i ++) {
            res += this.GetEditorValue(list[i]);
        }
        return res;
    },
    GetEditorValue: function(editor) {
        var value = editor.GetValueString();
        var valueLength = -1;
        if(!_aspxIsExists(value)) {
            value = "";
        } else {
            value = value.toString();
            valueLength = value.length;
        }
        return this.GetEditorIndex(editor.name) + "," + valueLength + "," + value + ";";
    },
    GetEditorIndex: function(editorId) {
        var i = editorId.lastIndexOf(this.GetEditorPrefix());
        if(i < 0) return -1;
        return editorId.substr(i + this.GetEditorPrefix().length);
    },
    saveScrollPosition: function() {
        this.savedScrollPosition = 0;
        var scrollDiv = this.getScrollableControl();
        if(scrollDiv == null) return;
        this.savedScrollPosition = scrollDiv.scrollTop;
    },
    restoreScrollPosition: function() {
        if(this.savedScrollPosition == 0) return;
        this.setScrollPosition(this.savedScrollPosition);
    },
    setScrollPosition: function(newScrolPos) {
        var scrollDiv = this.getScrollableControl();
        if(scrollDiv != null) {
            scrollDiv.scrollTop = newScrolPos;
        }
    },
    getScrollableControl: function() {
        if(!this.isVerticalScrolling) return null;
        return this.GetMainTable().offsetParent;
    },
    getScrollableHelper: function() {
        if(!this.isVerticalScrolling) return null;
        if(!_aspxIsExists(this.scrollableHelper)) {
            this.scrollableHelper = new ASPxClientTableScrollerHelper(this, "DXMainTable", "DXHeaderTable", "DXFooterTable");
            if(_aspxIsExists(this.isWidthTypePercent)) {
                this.scrollableHelper.IsWidthTypePercent = true;
            }
        }
        return this.scrollableHelper;
    },
    correctHeaderFooterColumnsWith: function() {
        var helper = this.getScrollableHelper();
        if(helper == null) return;
        helper.CorrectHeaderFooterColsWidth(false);
    },
    SetHeadersClientEvents: function() {
        var row = this.GetHeadersRow();
        if(row == null) return;
        for(var i = 0; i < row.cells.length; i ++) {
            if(this.isColumnsResizable) {
                _aspxAttachEventToElement(row.cells[i], "mousemove", new Function("event", "aspxGVHeaderColumnResizing('" + this.name + "', event);"));
            }
        }
    },
    // API
    PerformCallback: function(args){
        if(!_aspxIsExists(args)) args = "";
        this.gridCallBack("CUSTOMCALLBACK|" + args);
    },
    GetValuesOnCustomCallback: function(args, onCallBack) {
        this.gridFuncCallBack("CUSTOMVALUES|" + args, onCallBack);
    },
    GotoPage: function(pageIndex){
        this.gridCallBack("GOTOPAGE|" + pageIndex);
    },
    NextPage: function(){
        this.gridCallBack("NEXTPAGE");
    },
    PrevPage: function(){
        this.gridCallBack("PREVPAGE");
    },
    UnGroup: function(column){
        column = this._getColumnIndexByColumnObject(column);
        this.GroupBy(column, -1);
    },
    ExpandAll: function(){
        this.gridCallBack("EXPANDALL");
    },
    CollapseAll: function(){
        this.gridCallBack("COLLAPSEALL");
    },
    ExpandAllDetailRows: function(){
        this.gridCallBack("SHOWALLDETAIL");
    },
    CollapseAllDetailRows: function(){
        this.gridCallBack("HIDEALLDETAIL");
    },
    ExpandRow: function(visibleIndex, recursive){
        if(this.RaiseRowExpanding(visibleIndex)) return;
        if(!_aspxIsExists(recursive)) recursive = false;
        this.gridCallBack("EXPANDROW|"+visibleIndex+"|"+recursive);
    },
    CollapseRow: function(visibleIndex, recursive){
        if(this.RaiseRowCollapsing(visibleIndex)) return;
        if(!_aspxIsExists(recursive)) recursive = false;
        this.gridCallBack("COLLAPSEROW|"+visibleIndex+"|"+recursive);
    },
    ExpandDetailRow: function(visibleIndex){
        if(this.RaiseDetailRowExpanding(visibleIndex)) return;
        this.gridCallBack("SHOWDETAILROW|"+visibleIndex);
    },
    CollapseDetailRow: function(visibleIndex){
        if(this.RaiseDetailRowCollapsing(visibleIndex)) return;
        this.gridCallBack("HIDEDETAILROW|"+visibleIndex);
    },
    StartEditRow: function(visibleIndex){
        this.gridCallBack("STARTEDIT|"+visibleIndex);
    },
    UpdateEdit: function(){
        this._updateEdit();
    },
    CancelEdit: function(){
        this.gridCallBack("CANCELEDIT");
    },
    AddNewRow: function(){
        this.gridCallBack("ADDNEWROW");
    },
    DeleteRow: function(visibleIndex){
        this.gridCallBack("DELETEROW|"+visibleIndex);
    },
    ApplyFilter: function(expression){
        if(!_aspxIsExists(expression)) expression = "";
        this.gridCallBack("APPLYFILTER|"+expression);
    },
    ClearFilter: function(){
        this.ApplyFilter();
    },
    AutoFilterByColumn: function(column,val){
        column = this._getColumnIndexByColumnObject(column);
        if(!_aspxIsExists(column)) return;
        if(!_aspxIsExists(val)) val = "";
        if(val.length > 255) val = val.substr(0, 255);
        this.gridCallBack("APPLYCOLUMNFILTER|"+column+"|"+val);
    },
    ApplyHeaderFilterByColumn: function(column,val){
        column = this._getColumnIndexByColumnObject(column);
        if(!_aspxIsExists(column)) return;
        if(!_aspxIsExists(val)) val = "";
        if(val.length > 500) val = val.substr(0, 500);
        this.gridCallBack("APPLYHEADERCOLUMNFILTER|"+column+"|"+val);
    },
    GroupBy: function(column, groupIndex, sortOrder){
        if(this.RaiseColumnGrouping(this._getColumnObjectByArg(column))) return;

        column = this._getColumnIndexByColumnObject(column);
        if(!_aspxIsExists(groupIndex)) groupIndex = "";
        if(!_aspxIsExists(sortOrder)) sortOrder = "ASC";
        this.gridCallBack("GROUP|"+column+"|"+groupIndex+"|"+sortOrder);
    },
    SortBy: function(column, sortOrder, reset, sortIndex){
        if(this.RaiseColumnSorting(this._getColumnObjectByArg(column))) return;
        
        column = this._getColumnIndexByColumnObject(column);
        if(!_aspxIsExists(sortIndex)) sortIndex = "";
        if(!_aspxIsExists(sortOrder)) sortOrder = "";
        if(!_aspxIsExists(reset)) reset = true;
        this.gridCallBack("SORT|"+column+"|"+sortIndex+"|"+sortOrder + "|" + reset);
    },
    MoveColumn: function(column, columnMoveTo, moveBefore, moveToGroup, moveFromGroup){
        if(!_aspxIsExists(column)) return;
        if(!_aspxIsExists(columnMoveTo)) columnMoveTo = -1;
        if(!_aspxIsExists(moveBefore)) moveBefore = true;
        if(!_aspxIsExists(moveToGroup)) moveToGroup = false;
        if(!_aspxIsExists(moveFromGroup)) moveFromGroup = false;
        if(moveToGroup) {
            if(this.RaiseColumnGrouping(this._getColumnObjectByArg(column))) return;
        }
        column = this._getColumnIndexByColumnObject(column);
        this.gridCallBack("COLUMNMOVE|"+column+"|"+columnMoveTo+"|"+moveBefore+"|"+moveToGroup + "|" + moveFromGroup);
    },
    GetFocusedRowIndex: function() {
        return this._getFocusedRowIndex();
    },
    SetFocusedRowIndex: function(visibleIndex) {
        return this._setFocusedRowIndex(visibleIndex);
    },
    IsCustomizationWindowVisible: function(){
        var custWindow = this.GetCustomizationWindow();
        return custWindow != null && custWindow.IsVisible();
    },
    ShowCustomizationWindow: function(showAtElement){
        var custWindow = this.GetCustomizationWindow();
        if(!_aspxIsExists(showAtElement)) showAtElement = this.GetMainTable();
        custWindow.ShowAtElement(showAtElement);
    },
    HideCustomizationWindow: function(){
        var custWindow = this.GetCustomizationWindow();
        if(custWindow != null) custWindow.Hide();
    },
    SelectRows: function(visibleIndices, selected){
        if(!_aspxIsExists(selected)) selected = true;
        if(!_aspxIsExists(visibleIndices)) {
            selected = selected ? "all" : "unall";
            visibleIndices = "|0";
        } else {
            var res = "";
            if(_aspxIsFunction(visibleIndices.push)) {
                for(var i = 0; i < visibleIndices.length; i++) { res = res + "|" + visibleIndices[i]; }
            } else {
                res = "|" + visibleIndices;
            }
            visibleIndices = res;
        }
        this.gridCallBack("SELECTROWS|" + selected + visibleIndices);
    },
    SelectRowsByKey: function(keys, selected){
        if(!_aspxIsExists(selected)) selected = true;
        if(!_aspxIsExists(keys)) return;
        var res = "";
        if(_aspxIsFunction(keys.push)) {
            for(var i = 0; i < keys.length; i++) { res = res + "|" + keys[i]; }
        } else {
            res = "|" + keys;
        }
        keys = res;
        this.gridCallBack("SELECTROWSKEY|" + selected + keys);
    },
    UnselectRowsByKey: function(keys){
        this.SelectRowsByKey(keys, false);
    },
    UnselectRows: function(visibleIndices){
        this.SelectRows(visibleIndices, false);
    },
    SelectRowOnPage: function(visibleIndex, selected){
        if(!_aspxIsExists(selected)) selected = true;
        this.SelectRow(visibleIndex, selected);
    },
    UnselectRowOnPage: function(visibleIndex){
        this.SelectRowOnPage(visibleIndex, false);
    },
    SelectAllRowsOnPage: function(selected){
        if(!_aspxIsExists(selected)) selected = true;
        this._selectAllRowsOnPage(selected);
    },
    UnselectAllRowsOnPage: function(){
        this._selectAllRowsOnPage(false);
    },
    GetSelectedRowCount: function() {
        return this._getSelectedRowCount();
    },
    GetSelectedFieldValues: function(fieldNames, onCallBack) {
        this.gridFuncCallBack("SELFIELDVALUES|" + fieldNames, onCallBack);
    },
    GetRowValues: function(visibleIndex, fieldNames, onCallBack) {
        this.gridFuncCallBack("ROWVALUES|" + visibleIndex + "|" + fieldNames, onCallBack);
    },
    GetPageRowValues: function(fieldNames, onCallBack) {
        this.gridFuncCallBack("PAGEROWVALUES|" + fieldNames, onCallBack);
    },
    GetVisibleRowsOnPage: function() {
        return this.pageRowCount;
    },
    GetTopVisibleIndex: function() {
        return this.visibleStartIndex;
    },
    IsGroupRow: function(visibleIndex) {
        return this.GetGroupRow(visibleIndex) != null;
    },
    IsDataRow: function(visibleIndex) {
        return this.GetDataRow(visibleIndex) != null;
    },
    IsGroupRowExpanded: function(visibleIndex) { 
        return this.GetChildElementById(this._constDXGroupRow() + visibleIndex + "Exp") != null; 
    },
    GetColumnsCount: function() {
        return this._getColumnsCount();
    },
    GetColumn: function(index) {
        return this._getColumn(index);
    },
    GetColumnById: function(id) {
        return this._getColumnById(id);
    },
    GetColumnByField: function(fieldName) {
        return this._getColumnByField(fieldName);
    },
    GetEditor: function(column) {
        var columnObject = this._getColumnObjectByArg(column);
        return columnObject != null ? this.GetEditorByColumnIndex(columnObject.index) : null;
    },
    FocusEditor: function(column) {
        var editor = this.GetEditor(column);
        if(editor != null && _aspxIsExists(editor.SetFocus)) {
            editor.SetFocus();        
        }
    },
    GetEditValue: function(column) {
        var editor = this.GetEditor(column);
        return editor != null ? editor.GetValue() : null;
    },
    SetEditValue: function(column, value) {
        var editor = this.GetEditor(column);
        if(editor != null) {
            editor.SetValue(value);
        }
    },

    RaiseSelectionChanged: function(visibleIndex, isSelected, isAllRecordsOnPage, isChangedOnServer) {
        if(!this.SelectionChanged.IsEmpty()){
            var args = new ASPxClientGridViewRowEventArgs(visibleIndex, isSelected, isAllRecordsOnPage, isChangedOnServer);
            this.SelectionChanged.FireEvent(this, args);
            if(args.processOnServer) {
                this.gridCallBack("SELECTION");
            }
        }
        return false; 
    },
    RaiseFocusedRowChanged: function() {
        if(!this.FocusedRowChanged.IsEmpty()){
            var args = new ASPxClientProcessingModeEventArgs(false);
            this.FocusedRowChanged.FireEvent(this, args);
            if(args.processOnServer) {
                this.gridCallBack("FOCUSEDROW");
            }
        }
        return false; 
    },
    RaiseColumnSorting: function(column) {
        if(!this.ColumnSorting.IsEmpty()){
            var args = new ASPxClientGridViewColumnCancelEventArgs(column);
            this.ColumnSorting.FireEvent(this, args);
            return args.cancel;
        }
        return false; 
    },
    RaiseColumnGrouping: function(column) {
        if(!this.ColumnGrouping.IsEmpty()){
            var args = new ASPxClientGridViewColumnCancelEventArgs(column);
            this.ColumnGrouping.FireEvent(this, args);
            return args.cancel;
        }
        return false; 
    },
    RaiseColumnStartDragging: function(column) {
        if(!this.ColumnStartDragging.IsEmpty()){
            var args = new ASPxClientGridViewColumnCancelEventArgs(column);
            this.ColumnStartDragging.FireEvent(this, args);
            return args.cancel;
        }
        return false; 
    },
    RaiseColumnResizing: function(column) {
        if(!this.ColumnResizing.IsEmpty()){
            var args = new ASPxClientGridViewColumnCancelEventArgs(column);
            this.ColumnResizing.FireEvent(this, args);
            return args.cancel;
        }
        return false; 
    },
    RaiseRowExpanding: function(visibleIndex) {
        if(!this.RowExpanding.IsEmpty()){
            var args = new ASPxClientGridViewRowCancelEventArgs(visibleIndex);
            this.RowExpanding.FireEvent(this, args);
            return args.cancel;
        }
        return false; 
    },
    RaiseRowCollapsing: function(visibleIndex) {
        if(!this.RowCollapsing.IsEmpty()){
            var args = new ASPxClientGridViewRowCancelEventArgs(visibleIndex);
            this.RowCollapsing.FireEvent(this, args);
            return args.cancel;
        }
        return false; 
    },
    RaiseDetailRowExpanding: function(visibleIndex) {
        if(!this.DetailRowExpanding.IsEmpty()){
            var args = new ASPxClientGridViewRowCancelEventArgs(visibleIndex);
            this.DetailRowExpanding.FireEvent(this, args);
            return args.cancel;
        }
        return false; 
    },
    RaiseDetailRowCollapsing: function(visibleIndex) {
        if(!this.DetailRowCollapsing.IsEmpty()){
            var args = new ASPxClientGridViewRowCancelEventArgs(visibleIndex);
            this.DetailRowCollapsing.FireEvent(this, args);
            return args.cancel;
        }
        return false; 
    },
    RaiseRowClick: function(visibleIndex, htmlEvent) {
        if(!this.RowClick.IsEmpty()){
            var args = new ASPxClientGridViewRowClickEventArgs(visibleIndex, htmlEvent);
            this.RowClick.FireEvent(this, args);
            return args.cancel;
        }
        return false; 
    },
    RaiseRowDblClick: function(visibleIndex, htmlEvent) {
        if(!this.RowDblClick.IsEmpty()){
            var args = new ASPxClientGridViewRowClickEventArgs(visibleIndex, htmlEvent);
            this.RowDblClick.FireEvent(this, args);
            return args.cancel;
        }
        return false; 
    },
    RaiseContextMenu: function(objectType, index, htmlEvent) {
        if(!this.ContextMenu.IsEmpty()){
            var args = new ASPxClientGridViewContextMenuEventArgs(objectType, index, htmlEvent);
            this.ContextMenu.FireEvent(this, args);
            return true;
        }
        return false; 
    },
    RaiseCustomizationWindowCloseUp: function() {
        if(!this.CustomizationWindowCloseUp.IsEmpty()){
            var args = new ASPxClientEventArgs();
            this.CustomizationWindowCloseUp.FireEvent(this, args);
        }
        return false; 
    }
});
ASPxClientGridViewColumn = _aspxCreateClass(null, {
	constructor: function(name, index, fieldName){
        this.name = name;
        this.id = name;
        this.index = index;
        this.fieldName = fieldName;
	}
});
ASPxClientGridViewColumnCancelEventArgs = _aspxCreateClass(ASPxClientCancelEventArgs, {
	constructor: function(column){
	    this.constructor.prototype.constructor.call(this, true);
        this.column = column;
    }
});
ASPxClientGridViewRowCancelEventArgs = _aspxCreateClass(ASPxClientCancelEventArgs, {
	constructor: function(visibleIndex){
	    this.constructor.prototype.constructor.call(this, true);
        this.visibleIndex = visibleIndex;
    }
});
ASPxClientGridViewRowEventArgs = _aspxCreateClass(ASPxClientProcessingModeEventArgs, {
	constructor: function(visibleIndex, isSelected, isAllRecordsOnPage, isChangedOnServer){
	    this.constructor.prototype.constructor.call(this, false);
        this.visibleIndex = visibleIndex;
        this.isSelected = isSelected;
        this.isAllRecordsOnPage = isAllRecordsOnPage;
        this.isChangedOnServer = isChangedOnServer;
    }
});
ASPxClientGridViewRowClickEventArgs = _aspxCreateClass(ASPxClientGridViewRowCancelEventArgs, {
	constructor: function(visibleIndex, htmlEvent){
	    this.constructor.prototype.constructor.call(this, visibleIndex);
        this.htmlEvent = htmlEvent;
    }
});
ASPxClientGridViewContextMenuEventArgs = _aspxCreateClass(ASPxClientEventArgs, {
	constructor: function(objectType, index, htmlEvent){
	    this.constructor.prototype.constructor.call(this);
        this.objectType = objectType;
        this.index = index;
        this.htmlEvent = htmlEvent;
    }
});
ASPxClientGridViewCustomButtonEventArgs = _aspxCreateClass(ASPxClientProcessingModeEventArgs, {
	constructor: function(visibleIndex, buttonID) {
		this.constructor.prototype.constructor.call(this, false);
		this.visibleIndex = visibleIndex;
		this.buttonID = buttonID;
	}	
});

//TODO move to classes
///////////////////////////////////////////////////////////////////////////////////
//function _aspxGetParentByPartialId(element, idPart){
//	element = _aspxGetParentNode(element);
//	while(element != null){
//	    if(_aspxIsExists(element.id)) {
//		    if(element.id.indexOf(idPart) > -1) return element;
//		}
//		element = _aspxGetParentNode(element);
//	}
//	return null;
//}

function aspxGetCtrlKey(evt) { 
	if(__aspxIE) return (event != null) ? event.ctrlKey : false;
	else return (evt != null) ? evt.ctrlKey : false;
}
function aspxGetAltKey(evt) { 
	if(__aspxIE) return (event != null) ? event.altKey : false;
	else return (evt != null) ? evt.altKey : false;
}

function aspxGetShiftKey(evt) { 
	if(__aspxIE) return (event != null) ? event.shiftKey : false;
	else return (evt != null) ? evt.shiftKey : false;
}

function _aspxGetIECaretInfo(element, operation){
	if(!_aspxIsExists(document.selection) || !_aspxIsExists(document.selection.createRange)) 
	    return -1;
	var origionalRange = document.selection.createRange();
	try {
		var range = origionalRange.duplicate();
		range.moveToElementText(element);
	} 
	catch(e){
	    try {
		    var range = element.createTextRange();
		}
		catch(ee) {
		    return -1;
		}
	}
	range.setEndPoint(operation, origionalRange);
	var result = range.text.length;
	return result > element.value.length ? -1 : result;
}

function _aspxGetCaretEnd(element){
    try {
	    if(_aspxIsExists(element.selectionEnd))
		    return element.selectionEnd;
	    return _aspxGetIECaretInfo(element, "EndToEnd");
	}
	catch(e) {
	    return null;
	}
}
function _aspxCaretStart(element){
	if(_aspxIsExists(element.selectionStart)) 
	    return element.selectionStart;
	return _aspxGetIECaretInfo(element, "EndToStart");
}

function _aspxSetCaret(element, pos){
	element.focus();
    if(_aspxIsExists(element.type) && element.type != "text") return;
	if(_aspxIsExists(element.setSelectionRange)){
		element.setSelectionRange(pos, pos);
		return;
	}
	if(_aspxIsExists(element.createTextRange)){
		range = element.createTextRange();		
		range.moveStart('character',pos);
		range.collapse();
		range.select();
	}
}

////////////////////////////////////////////////////////////////////
function aspxGVContextMenu(name, objectType, index, e) {
    var gv = aspxGetControlCollection().Get(name);
    if(gv != null) {
        gv.RaiseContextMenu(objectType, index, e);
    }
}
function aspxGVExpandRow(name, value) {
    var gv = aspxGetControlCollection().Get(name);
    if(gv != null) 
        gv.ExpandRow(value);
}
function aspxGVCollapseRow(name, value) {
    var gv = aspxGetControlCollection().Get(name);
    if(gv != null) 
        gv.CollapseRow(value);
}
function aspxGVShowDetailRow(name, value) {
    var gv = aspxGetControlCollection().Get(name);
    if(gv != null) 
        gv.ExpandDetailRow(value);
}
function aspxGVHideDetailRow(name, value) {
    var gv = aspxGetControlCollection().Get(name);
    if(gv != null) 
        gv.CollapseDetailRow(value);
}
function aspxGVStartEditRow(name, value) {
    var gv = aspxGetControlCollection().Get(name);
    if(gv != null) 
        gv.StartEditRow(value);
}
function aspxGVDeleteRow(name, value) {
    var gv = aspxGetControlCollection().Get(name);
    if(gv != null) 
        gv.DeleteGridRow(value);
}
function aspxGVClearFilter(name) {
    var gv = aspxGetControlCollection().Get(name);
    if(gv != null) 
        gv.ClearFilter();
}
function aspxGVUpdateEdit(name) {
    var gv = aspxGetControlCollection().Get(name);
    if(gv != null) 
        gv.UpdateEdit();
}
function aspxGVCancelEdit(name) {
    var gv = aspxGetControlCollection().Get(name);
    if(gv != null) 
        gv.CancelEdit();
}
function aspxGVAddNewRow(name) {
    var gv = aspxGetControlCollection().Get(name);
    if(gv != null) 
        gv.AddNewRow();
}
function aspxGVSelectRow(name, index, value) {
    var gv = aspxGetControlCollection().Get(name);
    if(gv != null) 
        gv.SelectRowCore(index, value);
}
function aspxGVCommandCustomButton(name, id, index) {
    var gv = aspxGetControlCollection().Get(name);
    if(gv != null) 
        gv.CommandCustomButton(id, index);
}
function aspxGVHeaderMouseDown(name, element, e) {
    var gv = aspxGetControlCollection().Get(name);
    if(gv != null) 
        gv.HeaderMouseDown(element, e);
}
function aspxGVHeaderColumnResizing(name, e) {
    var gv = aspxGetControlCollection().Get(name);
    if(gv != null) 
        gv.HeaderColumnResizing(e);
}

function aspxGVPagerOnClick(name, value) {
    var gv = aspxGetControlCollection().Get(name);
    if(gv != null) 
        gv.doPagerOnClick(value);
}
function aspxGVFilterKeyPress(name, element, e) {
    var gv = aspxGetControlCollection().Get(name);
    if(gv != null) 
        gv.OnColumnFilterInputKeyPress(element, e);
}
function aspxGVFilterSpecKeyPress(name, element, e) {
    var gv = aspxGetControlCollection().Get(name);
    if(gv != null) 
        gv.OnColumnFilterInputSpecKeyPress(element, e);
}
function aspxGVFilterChanged(name, element) {
    _aspxSetTimeout("aspxGVFilterChangedDelayed(\""+name+"\", \"" + element.name + "\");", 0);
}
function aspxGVFilterChangedDelayed(name, elementName) {
    var gv = aspxGetControlCollection().Get(name);
    var element = aspxGetControlCollection().Get(elementName);
    if(gv != null && element != null) 
        gv.OnColumnFilterInputChanged(element);
}
function aspxGVTimer(name) {
    var gv = aspxGetControlCollection().Get(name);
    if(gv != null) 
        gv.OnFilterKeyPressTick();
}
function aspxGVFocusedRowChanged(name) {
    var gv = aspxGetControlCollection().Get(name);
    if(gv != null) 
        gv.RaiseFocusedRowChanged();
}
function aspxGVSelectionChanged(name) {
    var gv = aspxGetControlCollection().Get(name);
    if(gv != null) 
        gv.RaiseSelectionChanged(-1, false, false, true);
}
function aspxGVFuncCallback(name, result) {
    var gv = aspxGetControlCollection().Get(name);
    if(gv != null) 
        gv.OnFuncCallback(unescape(result));
}

function aspxRestoreCallBackTimer(name) {
    var gv = aspxGetControlCollection().Get(name);
    if(gv != null) 
        gv.OnAfterCallback();
}
function aspxGVShowParentRows(name, evt, element) {
    var gv = aspxGetControlCollection().Get(name);
    if(gv != null) {
        if(_aspxIsExists(element)) {
            gv.OnParentRowMouseEnter(element);
        }
        else gv.OnParentRowMouseLeave(evt);
    }
}
function aspxGVTableClick(name, evt) {
    var gv = aspxGetControlCollection().Get(name);
    if(gv != null) {
        gv.mainTableClick(evt);
    }
}
function aspxGVTableDblClick(name, evt) {
    var gv = aspxGetControlCollection().Get(name);
    if(gv != null) {
        gv.mainTableDblClick(evt);
    }
}
function aspxGVParentRowsTimer(name, rowId) {
    var gv = aspxGetControlCollection().Get(name);
    var element = _aspxGetElementById(rowId);
    if(!_aspxIsExists(element) || gv == null) return;
    gv.ShowParentRows(element);
}

function aspxGVCustWindowCloseUp(name) {
    var gv = aspxGetControlCollection().Get(name);
    if(gv != null) {
        gv.RaiseCustomizationWindowCloseUp();
    }
}

function aspxGVShowFilterPopup(name, elementName, colIndex, buttonElement, htmlEvent) {	
    var gv = aspxGetControlCollection().Get(name);
    if(gv != null) {
		buttonElement.DXFilterPopupButton = 1;
		gv.ShowFilterPopup(elementName, colIndex, htmlEvent);
    }
}
function aspxGVApplyFilterPopup(name, colIndex, row) {
    var gv = aspxGetControlCollection().Get(name);
    if(gv != null) {
        gv.HideFilterPopup();
        gv.ApplyHeaderFilterByColumn(colIndex, _aspxGetAttribute(row, "filterValue"));
    }
}
function aspxGVFilterPopupItemOver(name, row) {
    var gv = aspxGetControlCollection().Get(name);
    if(gv != null) {
        gv.onFilterItemOver(row);
    }
}
function aspxGVFilterPopupItemOut(name, row) {
    var gv = aspxGetControlCollection().Get(name);
    if(gv != null) {
        gv.onFilterItemOut(row);
    }
}

function aspxGVFilterRowMenu(name, columnIndex, element) {
    var gv = aspxGetControlCollection().Get(name);
    if(gv != null)
        gv.FilterRowMenuButtonClick(columnIndex, element);
}
function aspxGVFilterRowMenuClick(name, e) {
    var gv = aspxGetControlCollection().Get(name);
    if(gv != null)
		gv.FilterRowMenuItemClick(e.item);
}