
export class GithubCommitFilter{

    constructor(){}

    removeElements(elementClass: string): void {
        // Removes an element from the document
        let elements: HTMLCollection = document.getElementsByClassName(elementClass);
        for(let i: number = 0; i < elements.length; ++i){
            let element: Element = elements[i];
            if(element !== null && element !== undefined && element.parentNode !== null && element.parentNode !== undefined) {
                element.parentNode.removeChild(element);
            }
        }
    }

    getAsArray(htmlCol: HTMLCollection): HTMLElement[] {
        let res: HTMLElement[] = [];
        for(let i = 0; i < htmlCol.length; ++i) {
            res.push(<HTMLElement>htmlCol[i]);
        }
        return res;
    }

    getCommitTitle(commitElem: HTMLDivElement): string {
        let pTitle: HTMLParagraphElement = <HTMLParagraphElement>commitElem.querySelectorAll('p.commit-title')[0];
        //console.log(pTitle.innerText);

        return pTitle
            ? pTitle.innerText
            : ''; // TODO check usage
    }

    getCommitVal(commitElem: HTMLDivElement): string{
        let pTitle: HTMLAnchorElement = <HTMLAnchorElement>commitElem.querySelectorAll('a.sha.btn')[0];

        let splitHref: string[] = pTitle
            ? pTitle.href.split('/')
            : [];

        return splitHref.length > 0
            ? splitHref[splitHref.length - 1]
            : ''; // TODO check usage
    }

    showPrOnly(filterText: string): void {
        const allCommitItems: HTMLCollectionOf<HTMLDivElement> = <HTMLCollectionOf<HTMLDivElement>>document.getElementsByClassName('commits-list-item');
        let commitElems: HTMLDivElement[] = <HTMLDivElement[]>this.getAsArray(allCommitItems);

        commitElems.map( (c: HTMLDivElement) => {
            const title: string = this.getCommitTitle(c);
            if(filterText.length === 0){
                c.style.display = '';
            }
            else if(title && title.toLowerCase().indexOf(filterText.toLowerCase()) === -1){
                c.style.display = 'None';
            }
        } );
    }

    showPrOnlyCommit(commitText: string): void {
        const allCommitItems: HTMLCollectionOf<HTMLDivElement> = <HTMLCollectionOf<HTMLDivElement>>document.getElementsByClassName('commits-list-item');
        let commitElems: HTMLDivElement[] = <HTMLDivElement[]>this.getAsArray(allCommitItems);

        let found: boolean = false;
        commitElems.map( (c: HTMLDivElement) => {
            const commitVal: string = this.getCommitVal(c);
            if(found === true || commitText.length === 0){
                c.style.display = '';
            }
            else if(commitVal && commitVal.toLowerCase().indexOf(commitText.toLowerCase()) !== 0){
                c.style.display = 'None';
            }
            else{
                found = true;
            }
        } );
    }

    doFilter(filterClassName: string): void {
        var filterElement: HTMLInputElement = <HTMLInputElement>document.getElementsByClassName(filterClassName)[0];
        var filterText: string = filterElement.value;

        this.showPrOnly(filterText);

        console.log('filtered');
    }

    doFilterCommit(filterClassName: string): void {
        var filterElement: HTMLInputElement = <HTMLInputElement>document.getElementsByClassName(filterClassName)[1];
        var filterText: string = filterElement.value;

        this.showPrOnlyCommit(filterText);

        console.log('filtered commit');
    }

    createFilterName(className: string): HTMLInputElement {
        let para: HTMLInputElement = document.createElement("input");

        para.className = className + ' form-control';
        para.style.cssText = 'margin: 0;';
        para.setAttribute('placeholder', 'Filter by name');
        para.onchange = ($event) => {
            this.doFilter(className);
        };

        return para;
    }

    createFilterCommit(className: string): HTMLInputElement {
        let para: HTMLInputElement = document.createElement("input");

        para.className = className + ' form-control';
        para.style.cssText = 'margin: 0;';
        para.setAttribute('placeholder', 'Filter by commit');
        para.onchange = ($event) => {
            this.doFilterCommit(className);
        };

        return para;
    }

    createBootstrapForm(className: string): HTMLFormElement {
        let formE: HTMLFormElement = document.createElement("form");
        formE.className = 'commitFilterForm form-inline offset-md-2';

        let formGroupNameE: HTMLDivElement = document.createElement("div"),
            formGroupCommitE: HTMLDivElement = document.createElement("div");

        formGroupNameE.className = 'form-group col-md-3';
        formGroupNameE.style.cssText = 'display: inline-block; margin-top: 0;';
        formGroupCommitE.className = 'form-group col-md-3';
        formGroupCommitE.style.cssText = 'display: inline-block; margin-top: 0;';

        let inputName: HTMLInputElement = this.createFilterName(className),
            inputCommit: HTMLInputElement = this.createFilterCommit(className);

        formGroupNameE.append(inputName);
        formGroupCommitE.append(inputCommit);

        formE.append(formGroupNameE);
        formE.append(formGroupCommitE);

        return formE;
    }

    createBootstrapForm1(): HTMLDivElement {
        let template = '<form class="commitFilterForm form-inline offset-md-2"><div class="form-group col-md-3" style="display: inline-block; margin-top: 0px;"><input class="commitFilter form-control" style="margin: 0px;" placeholder="Filter by name"></div><div class="form-group col-md-3" style="display: inline-block; margin-top: 0px;"><input class="commitFilter form-control" style="margin: 0px;" placeholder="Filter by commit"></div></form>';
        let mainFilterWraper: HTMLDivElement = document.createElement("div");
        mainFilterWraper.innerHTML = template;

        return mainFilterWraper;
    }

    addFilter(): void{
        const className: string = 'commitFilter';

        const allForm: HTMLFormElement = this.createBootstrapForm(className);
            // const test1: HTMLDivElement = this.createBootstrapForm1();

        this.removeElements('commitFilterForm');
        let element = document.getElementsByClassName("file-navigation")[0];

        element.append(allForm);
        // element.append(test1);
        console.log('Added');
    }
}

//let filter: GithubCommitFilter = new GithubCommitFilter();
//filter.addFilter();