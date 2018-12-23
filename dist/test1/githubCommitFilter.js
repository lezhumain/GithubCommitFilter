"use strict";
if(window.exports === undefined) // hacked a bit
	window.exports = {}
exports.__esModule = true;
var GithubCommitFilter = /** @class */ (function () {
    function GithubCommitFilter() {
    }
    GithubCommitFilter.prototype.removeElements = function (elementClass) {
        // Removes an element from the document
        var elements = document.getElementsByClassName(elementClass);
        for (var i = 0; i < elements.length; ++i) {
            var element = elements[i];
            if (element !== null && element !== undefined && element.parentNode !== null && element.parentNode !== undefined) {
                element.parentNode.removeChild(element);
            }
        }
    };
    GithubCommitFilter.prototype.getAsArray = function (htmlCol) {
        var res = [];
        for (var i = 0; i < htmlCol.length; ++i) {
            res.push(htmlCol[i]);
        }
        return res;
    };
    GithubCommitFilter.prototype.getCommitTitle = function (commitElem) {
        var pTitle = commitElem.querySelectorAll('p.commit-title')[0];
        //console.log(pTitle.innerText);
        return pTitle
            ? pTitle.innerText
            : ''; // TODO check usage
    };
    GithubCommitFilter.prototype.getCommitVal = function (commitElem) {
        var pTitle = commitElem.querySelectorAll('a.sha.btn')[0];
        var splitHref = pTitle
            ? pTitle.href.split('/')
            : [];
        return splitHref.length > 0
            ? splitHref[splitHref.length - 1]
            : ''; // TODO check usage
    };
    GithubCommitFilter.prototype.showPrOnly = function (filterText) {
        var _this = this;
        var allCommitItems = document.getElementsByClassName('commits-list-item');
        var commitElems = this.getAsArray(allCommitItems);
        commitElems.map(function (c) {
            var title = _this.getCommitTitle(c);
            if (filterText.length === 0) {
                c.style.display = '';
            }
            else if (title && title.toLowerCase().indexOf(filterText.toLowerCase()) === -1) {
                c.style.display = 'None';
            }
        });
    };
    GithubCommitFilter.prototype.showPrOnlyCommit = function (commitText) {
        var _this = this;
        var allCommitItems = document.getElementsByClassName('commits-list-item');
        var commitElems = this.getAsArray(allCommitItems);
        var found = false;
        commitElems.map(function (c) {
            var commitVal = _this.getCommitVal(c);
            if (found === true || commitText.length === 0) {
                c.style.display = '';
            }
            else if (commitVal && commitVal.toLowerCase().indexOf(commitText.toLowerCase()) !== 0) {
                c.style.display = 'None';
            }
            else {
                found = true;
            }
        });
    };
    GithubCommitFilter.prototype.doFilter = function (filterClassName) {
        var filterElement = document.getElementsByClassName(filterClassName)[0];
        var filterText = filterElement.value;
        this.showPrOnly(filterText);
        console.log('filtered');
    };
    GithubCommitFilter.prototype.doFilterCommit = function (filterClassName) {
        var filterElement = document.getElementsByClassName(filterClassName)[1];
        var filterText = filterElement.value;
        this.showPrOnlyCommit(filterText);
        console.log('filtered commit');
    };
    GithubCommitFilter.prototype.createFilterName = function (className) {
        var _this = this;
        var para = document.createElement("input");
        para.className = className + ' form-control';
        para.style.cssText = 'margin: 0;';
        para.setAttribute('placeholder', 'Filter by name');
        para.onchange = function ($event) {
            _this.doFilter(className);
        };
        return para;
    };
    GithubCommitFilter.prototype.createFilterCommit = function (className) {
        var _this = this;
        var para = document.createElement("input");
        para.className = className + ' form-control';
        para.style.cssText = 'margin: 0;';
        para.setAttribute('placeholder', 'Filter by commit');
        para.onchange = function ($event) {
            _this.doFilterCommit(className);
        };
        return para;
    };
    GithubCommitFilter.prototype.createBootstrapForm = function (className) {
        var formE = document.createElement("form");
        formE.className = 'commitFilterForm form-inline offset-md-2';
        var formGroupNameE = document.createElement("div"), formGroupCommitE = document.createElement("div");
        formGroupNameE.className = 'form-group col-md-3';
        formGroupNameE.style.cssText = 'display: inline-block; margin-top: 0;';
        formGroupCommitE.className = 'form-group col-md-3';
        formGroupCommitE.style.cssText = 'display: inline-block; margin-top: 0;';
        var inputName = this.createFilterName(className), inputCommit = this.createFilterCommit(className);
        formGroupNameE.append(inputName);
        formGroupCommitE.append(inputCommit);
        formE.append(formGroupNameE);
        formE.append(formGroupCommitE);
        return formE;
    };
    GithubCommitFilter.prototype.addFilter = function () {
        var className = 'commitFilter';
        var allForm = this.createBootstrapForm(className);
        this.removeElements('commitFilterForm');
        var element = document.getElementsByClassName("file-navigation")[0];
        element.append(allForm);
        console.log('Added');
    };
    return GithubCommitFilter;
}());
exports.GithubCommitFilter = GithubCommitFilter;
var filter = new GithubCommitFilter();
filter.addFilter();
//# sourceMappingURL=githubCommitFilter.js.map