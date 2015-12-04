/**
 * @fileoverview Panel class for VLayout module
 * @author NHN Ent. FE Development Team <dl_javascript@nhnent.com>
 */
'use strict';
var util = global.tui.util;
var config = require('../config'),
    common = require('./common'),
    domutil = require('./domutil'),
    View = require('../view/view');

/**
 * @constructor
 * @extends {View}
 * @param {object} options - options for VPanel
 *  @param {number} [options.minHeight=0] - minimum height of panel
 *  @param {number} [options.height] - initial height of panel
 *  @param {boolean} [options.isSplitter=false] - set true then this panel works splitter
 *  @param {boolean} [options.autoHeight=false] - set true then this panel use remain height after other panel resized.
 *  @param {string} [options.className] - additional class name to add element
 * @param {HTMLElement} container - container element
 */
function VPanel(options, container) {
    View.call(this, container);

    /**
     * @type {object}
     */
    this.options = util.extend({
        minHeight: 0,
        height: null,
        isSplitter: false,
        autoHeight: false,
        className: ''
    }, options);

    this._initPanel(this.options, container);
}

util.inherit(VPanel, View);

/**
 * whether this panel is splitter?
 * @returns {boolean} panel is splitter?
 */
VPanel.prototype.isSplitter = function() {
    return this.options.isSplitter;
};

/**
 * set height of html element
 * @param {HTMLElement} [container] - container element
 * @param {number} newHeight - height
 */
VPanel.prototype.setHeight = function(container, newHeight) {
    container = container || this.container;
    container.style.height = newHeight + 'px';
};

/**
 * Calculate new height of panel and remains by supplied height growth
 * @param {number} growth - growth value
 * @returns {number[]} newHeight, remainHeight
 */
VPanel.prototype.getResizeInfoByGrowth = function(growth) {
    var height = this.getHeight(),
        newHeight = height + growth,
        resizeTo = Math.max(0, newHeight, this.options.minHeight);

    return [resizeTo, height - resizeTo];
};

/**
 * get outer height of panel element
 * @returns {number} outer height of panel element
 */
VPanel.prototype.getHeight = function() {
    return domutil.getSize(this.container)[1];
};

/**
 * add design class to panel element
 * @param {string} className - classname string
 */
VPanel.prototype.addClass = function(className) {
    domutil.addClass(this.container, className);
}

/**
 * remove design class to panel element
 * @param {string} className - classname string
 */
VPanel.prototype.removeClass = function(className) {
    domutil.removeClass(this.container, className);
};

/**
 * initialize panel element
 * @param {PanelOptions} options - options for panel
 * @param {HTMLDivElement} container - panel element
 */
VPanel.prototype._initPanel = function(options, container) {
    var height;

    if (options.isSplitter) {
        domutil.addClass(container, config.classname('splitter'));
        return;
    }

    if (options.className) {
        domutil.addClass(container, options.className);
    }

    if (options.autoHeight) {
        domutil.setData(container, 'autoHeight', true);
    } else {
        height = common.limit(options.height || 0, 
            [options.minHeight],
            [options.maxHeight || options.height]
        );

        this.setHeight(container, height);
    }
};

module.exports = VPanel;

