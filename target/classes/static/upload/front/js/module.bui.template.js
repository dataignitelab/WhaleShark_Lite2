"use strict";

/*
 * @ layerPopupTypeA
 */
var layerPopupTypeA = new buiToggle('[data-bui-toggle="layerPopupTypeA"]', {
  close: true,
  closeButtonText: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" focusable="false"><title>close</title><path d="M12 11.293l10.293-10.293.707.707-10.293 10.293 10.293 10.293-.707.707-10.293-10.293-10.293 10.293-.707-.707 10.293-10.293-10.293-10.293.707-.707 10.293 10.293z"/></svg>',
  closeButtonArea: '.popup-item',
  closeButtonClass: 'btn popup-close',
  reactTarget: 'body',
  reactTargetActiveClass: 'active-layer-popup',
  focusin: true,
  focusout: true
});
/*
 * @ layerPopupTypeB
 */

var layerPopupTypeB = new buiToggle('[data-bui-toggle="layerPopupTypeB"]', {
  reactTarget: 'body',
  reactTargetActiveClass: 'active-layer-popup',
  focusin: true,
  focusout: true
});

var layerPopupTypeC = new buiToggle('[data-bui-toggle="layerPopupTypeC"]', {
  close: true,
  closeButtonText: '<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" width="24" height="24" focusable="false"><title>close</title><path d="M12 11.293l10.293-10.293.707.707-10.293 10.293 10.293 10.293-.707.707-10.293-10.293-10.293 10.293-.707-.707 10.293-10.293-10.293-10.293.707-.707 10.293 10.293z"/></svg>',
  closeButtonArea: '.popup-item',
  closeButtonClass: 'btn popup-close',
  reactTarget: 'body',
  reactTargetActiveClass: 'active-layer-popup',
  focusin: true,
  focusout: true
});