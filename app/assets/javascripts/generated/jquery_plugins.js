"use strict";
$.fn.throwIfEmpty = function () {
    if (this.length == 0) {
        throw 'No matched elements';
    }
    return this;
};
//# sourceMappingURL=jquery_plugins.js.map