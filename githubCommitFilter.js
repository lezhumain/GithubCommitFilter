function removeElements(elementClass) {
    // Removes an element from the document
    var elements = document.getElementsByClassName(elementClass);
    for(var i = 0; i < elements.length; ++i){
    	var element = elements[i];
    	element.parentNode.removeChild(element);
    }
}

function getAsArray(htmlCol){
	res = [];
	for(var i = 0; i < htmlCol.length; ++i) {
		res.push(htmlCol[i]);
	} 
	return res;
}

function getCommitTitle(commitElem){
	var pTitle = commitElem.querySelectorAll('p.commit-title')[0];
	//console.log(pTitle.innerText);

	return pTitle
		? pTitle.innerText
		: null;
}

function getCommitVal(commitElem){
	var pTitle = commitElem.querySelectorAll('a.sha.btn')[0];
	//console.log(pTitle.innerText);

	var splitHref = pTitle
		? pTitle.href.split('/')
		: [];

	return splitHref.length > 0
		? splitHref[splitHref.length - 1]
		: null;
}

function showPrOnly(filterText){
	var allCommitItems = document.getElementsByClassName('commits-list-item');
	var commitElems = getAsArray(allCommitItems);
	commitElems.map( (c) => {
		var title = getCommitTitle(c);
		if(filterText.length === 0){
			c.style.display = '';
		}
		else if(title && title.toLowerCase().indexOf(filterText.toLowerCase()) === -1){
			c.style.display = 'None';
		}
	} );
}

function showPrOnlyCommit(commitText){
	var allCommitItems = document.getElementsByClassName('commits-list-item');
	var commitElems = getAsArray(allCommitItems);
	var found = false;
	commitElems.map( (c) => {
		var commitVal = getCommitVal(c);
		if(found === true || commitText.length === 0){
			c.style.display = '';
		}
		else if(commitVal && commitVal.toLowerCase().startsWith(commitText.toLowerCase()) === false){
			c.style.display = 'None';
		}
		else{
			found = true;
		}
	} );
}

function doFilter(filterClassName){
	var filterElement = document.getElementsByClassName(filterClassName)[0];
	var filterText = filterElement.value;

	showPrOnly(filterText);

	console.log('filtered');
}

function doFilterCommit(filterClassName){
	var filterElement = document.getElementsByClassName(filterClassName)[1];
	var filterText = filterElement.value;

	showPrOnlyCommit(filterText);

	console.log('filtered commit');
}

function createFilterName(className){
	var para = document.createElement("input");
	
	para.className = className + ' form-control';
	//para.style.cssText = 'position: absolute; bottom: 0; z-index: 999; top: -50px; left: 150px;';
	//para.style.cssText = 'margin-left: 15px; margin-top: 0;';
	para.style.cssText = 'margin: 0;';
	para.setAttribute('placeholder', 'Filter by name');
	para.onchange = function($event){
		doFilter(className);
	};
	
	//removeElements('commitFilter');
	//var element = document.getElementsByClassName("file-navigation")[0];
	//element.append(para);
	//console.log('Added');
	return para;
}

function createFilterCommit(className){
	var para = document.createElement("input");
	
	para.className = className + ' form-control';
	//para.style.cssText = 'position: absolute; bottom: 0; z-index: 999; top: -50px; left: 150px;';
	//para.style.cssText = 'margin-left: 15px; margin-top: 0;';
	para.style.cssText = 'margin: 0;';
	para.setAttribute('placeholder', 'Filter by commit');
	para.onchange = function($event){
		doFilterCommit(className);
	};
	
	return para;
}

function createBootstrapForm(className){
	var formE = document.createElement("form");
	formE.className = 'commitFilterForm form-inline offset-md-2';

	var formGroupNameE = document.createElement("div"),
		formGroupCommitE = document.createElement("div");
	
	formGroupNameE.className = 'form-group col-md-3';
	formGroupNameE.style.cssText = 'display: inline-block; margin-top: 0;';
	formGroupCommitE.className = 'form-group col-md-3';
	formGroupCommitE.style.cssText = 'display: inline-block; margin-top: 0;';
	
	var inputName = createFilterName(className),
		inputCommit = createFilterCommit(className);

	formGroupNameE.append(inputName);
	formGroupCommitE.append(inputCommit);

	formE.append(formGroupNameE);	
	formE.append(formGroupCommitE);	

	return formE;
}

function addFilter(){
	var className = 'commitFilter';

	var allForm = createBootstrapForm(className);
	
	removeElements('commitFilterForm');
	var element = document.getElementsByClassName("file-navigation")[0];
	//element.append(para);
	//element.append(para1);
	element.append(allForm);
	console.log('Added');
}

//document.body.style.border = "5px solid red";
addFilter();