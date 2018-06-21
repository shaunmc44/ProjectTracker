angular.module("ProjectTrackerApp").service("GridUtility", class GridUtility {
    Sort: string;
    Reverse: boolean;
    Filter: string;
    numItems: number;
    currentPage: number;
    minTabShown: number;
    maxTabShown: number;
    ItemsPerPage: number;

    constructor() {

        this.Sort = "";
        this.Reverse = false;
        this.Filter = "";
        this.numItems = 0;
        this.currentPage = 0;
        this.minTabShown = 0;
        this.maxTabShown = 9;
        this.ItemsPerPage = 50;
    }

    SortCommand(ColumnName) {
        if (this.Sort == ColumnName) {
            this.Reverse = !this.Reverse;
        } else {
            this.Reverse = false;
        }

        this.Sort = ColumnName;
    }

    SetNumberOfItems(NumberOfItems) {
        this.numItems = NumberOfItems;
        this.currentPage = 0;
        this.minTabShown = 0;
        if (NumberOfItems > 9) {
            this.maxTabShown = 9;
        } else {
            this.maxTabShown = NumberOfItems;
        }
    }

    Offset(input) {
        if (input) {
            return input.slice(this.currentPage * this.ItemsPerPage);
        }
    }

    NumberOfPages() {
        return Math.ceil(this.numItems / this.ItemsPerPage);
    }

    PageNumbers() {
        var response = [];
        for (var i = 0; i < this.NumberOfPages(); i++) {
            response.push(i);
        }
        return response;
    }


    CanExecuteFirstCommand() {
        return this.NumberOfPages() > 1 && this.currentPage > 0;
    }

    //Removed the if (self.CanExecuteFirstCommand())
    //This will still be handled on the ng-disabled for the first button.
    FirstCommand() {
        this.currentPage = 0;
        this.minTabShown = 0;
        if (this.numItems > 9) {
            this.maxTabShown = 9;
        } else {
            this.maxTabShown = this.numItems;
        }
    }

    CanExecutePrevCommand() {
        return this.NumberOfPages() > 1 && this.currentPage > 0;
    }

    PrevCommand() {
        if (this.CanExecutePrevCommand()) {
            this.currentPage--;
            if (this.currentPage < 0) this.currentPage = 0;
            if (this.currentPage < this.minTabShown) {
                this.minTabShown--;
                this.maxTabShown--;
            }
        }
    }


    CanExecutePageCommand(PageNumber) {
        return this.NumberOfPages() > 1 && this.currentPage != PageNumber && PageNumber >= 0 && PageNumber < this.NumberOfPages();
    }

    PageCommand(PageNumber) {
        if (this.CanExecutePageCommand(PageNumber)) {
            this.currentPage = PageNumber;
        }
    }


    CanExecuteNextCommand() {
        return this.NumberOfPages() > 1 && this.currentPage < (this.NumberOfPages() - 1);
    }

    NextCommand() {
        if (this.CanExecuteNextCommand()) {
            this.currentPage++;
            if (this.currentPage >= this.NumberOfPages()) this.currentPage = (this.NumberOfPages() - 1);
            if (this.currentPage >= this.maxTabShown) {
                this.maxTabShown++;
                this.minTabShown++;
            }
        }
    }

    CanExecuteLeftEllipseCommand() {
        return this.NumberOfPages() > 9 && this.currentPage > 9;
    }

    LeftEllipseCommand() {
        if (this.CanExecuteLeftEllipseCommand()) {
            this.currentPage = this.maxTabShown - 11;
            if (this.currentPage <= 0) this.currentPage = 0;
            if (this.currentPage <= this.minTabShown) {
                this.maxTabShown -= 10;
                this.minTabShown -= 10;
            }
        }
    }

    CanExecuteRightEllipseCommand() {
        return this.NumberOfPages() > 1 && this.currentPage < (this.NumberOfPages() - 10);
    }

    RightEllipseCommand() {
        if (this.CanExecuteRightEllipseCommand()) {
            this.currentPage = this.minTabShown + 10;
            if (this.currentPage >= this.NumberOfPages()) this.currentPage = (this.NumberOfPages() - 1);
            if (this.currentPage >= this.maxTabShown) {
                this.maxTabShown = this.currentPage + 10;
                this.minTabShown = this.currentPage;
            }
        }
    }

    GetMinTab() {
        return this.minTabShown;
    }

    CanExecuteLastCommand() {
        return this.NumberOfPages() > 1 && this.currentPage < (this.NumberOfPages() - 1);
    }

    LastCommand() {
        if (this.CanExecuteLastCommand()) {
            this.currentPage = this.NumberOfPages() - 1;
            this.maxTabShown = this.currentPage + 1;
            this.minTabShown = this.maxTabShown - 10;
        }
    }
})
