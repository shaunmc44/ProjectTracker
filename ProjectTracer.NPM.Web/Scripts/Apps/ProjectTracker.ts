angular.module("ProjectTrackerApp").component("projectTracker", {
    templateUrl: '../../Templates/ProjectTracker.html',
    bindings: {},
    controller: class ProjectTrackerCtrl {

        viewModel: any;
        projectGrid: any;
        isHidden: boolean;
        isErrorHidden: boolean;
        filteredProjects: any;
        projectPageQuantity: any;

        constructor($scope, ProjectTrackerAdminViewModel, ProjectsDataAccess, EventUtility, GridUtility, PageQuantityUtility) {
            this.projectPageQuantity = PageQuantityUtility;

            this.viewModel = ProjectTrackerAdminViewModel;
            this.projectGrid = GridUtility;
            this.isHidden = this.viewModel.Message === '';
            this.isErrorHidden = this.viewModel.ErrorMessage === '';

            this.projectGrid.ItemsPerPage = this.projectPageQuantity.GetDefaultPageQuantity(50).toString();

            EventUtility.Subscribe(EVENT_PROJECT_LIST_LOADED, (Message, AllProjects) => {
                this.projectGrid.SetNumberOfItems(AllProjects.length);
            });

            $scope.$watch('filteredProjects', function (filteredProjects) {
                if (filteredProjects != undefined && this.projectGridFilter !== undefined) {
                    if (this.projectGridFilter !== "") {
                        this.projectGrid.SetNumberOfItems(this.filteredProjects.length);
                        this.viewModel.Message = this.filteredProjects.length + " project(s) were found.";
                    }
                    else {
                        this.projectGrid.SetNumberOfItems(this.viewModel.List.AllProjects.length);
                        this.viewModel.Message = this.viewModel.List.AllProjects.length + " project(s) were found.";
                    }
                }
            }, true);
        }
        IsFormValid(isValid) {
            if (!isValid)
                return "radioInvalid";
            else
                return "";
        }
    }
});

