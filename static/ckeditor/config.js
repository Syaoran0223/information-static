/**
 * @license Copyright (c) 2003-2017, CKSource - Frederico Knabben. All rights reserved.
 * For licensing, see LICENSE.md or http://ckeditor.com/license
 */

CKEDITOR.editorConfig = function( config ) {
	
	// %REMOVE_START%
	// The configuration options below are needed when running CKEditor from source files.
	config.plugins = 'basicstyles,notification,button,toolbar,clipboard,enterkey,entities,floatingspace,wysiwygarea,indent,indentlist,dialogui,dialog,fakeobjects,link,list,undo,autogrow,lineutils,widgetselection,widget,mathjax';
	config.skin = 'moono';
	// %REMOVE_END%

	// Define changes to default configuration here.
	// For complete reference see:
	// http://docs.ckeditor.com/#!/api/CKEDITOR.config

	// The toolbar groups arrangement, optimized for a single toolbar row.
	config.toolbarGroups = [
		{ name: 'document',	   groups: [ 'mode', 'document', 'doctools' ] },
		{ name: 'clipboard',   groups: [ 'clipboard', 'undo' ] },
		{ name: 'editing',     groups: [ 'find', 'selection', 'spellchecker' ] },
		{ name: 'forms' },
		{ name: 'basicstyles', groups: [ 'basicstyles', 'cleanup' ] },
		{ name: 'paragraph',   groups: [ 'list', 'indent', 'blocks', 'align', 'bidi' ] },
		{ name: 'links' },
		{ name: 'insert' },
		{ name: 'styles' },
		{ name: 'colors' },
		{ name: 'tools' },
		{ name: 'others' },
		{ name: 'about' }
	];

    config.language = 'zh-CN';
    // config.uiColor = '#AADC6E';
    // %REMOVE_START%
    config.mathJaxLib = 'http://www.i3ke.com/static/siming/base/js/MathJax/MathJax.js?config=TeX-AMS-MML_HTMLorMML';
    config.extraPlugins = 'kityformula,pastefromword,pastebase64';
    config.pasteFromWord_heuristicsEdgeList = false;
    config.pasteFromWordPromptCleanup = false;
    config.autoGrow_minHeight = 100;
    config.autoGrow_maxHeight = 600;
    config.allowedContent = true;
    config.pasteFilter = 'semantic-content';
    config.enterMode = CKEDITOR.ENTER_BR;

    //config.forcePasteAsPlainText = false;
    //config.pasteFromWordRemoveFontStyles = false;
    //config.pasteFromWordRemoveStyles = false;
    //config.allowedContent = true;
    //config.extraAllowedContent = 'p(mso*,Normal)';
    //config.pasteFilter = null;

    // The default plugins included in the basic setup define some buttons that
    // are not needed in a basic editor. They are removed here.
    // config.removeButtons = 'Cut,Copy,Paste,Undo,Redo,Anchor,Underline,Strike,Subscript,Superscript';
    config.removeButtons = 'Cut,Copy,Paste,Anchor,Underline,Strike,Subscript,Superscript';

	// The default plugins included in the basic setup define some buttons that
	// are not needed in a basic editor. They are removed here.
	// config.removeButtons = 'Cut,Copy,Paste,Undo,Redo,Anchor,Underline,Strike,Subscript,Superscript';

	// Dialog windows are also simplified.
	config.removeDialogTabs = 'link:advanced';
};
