import { Component } from "@angular/core";

@Component({
    selector: 'project-tracker',
    template: `<div class="box-header no-border" style="height: 30px; margin-top: 15px;">
    <h3 id="pagemessage" class="box-title">Project Tracker</h3>
    <div class="alert alert-success pull-right text-black" data-ng-hide="$ctrl.isHidden" style="margin-left: 5px; margin-bottom: 0 !important; padding-left: 10px !important; padding-right: 10px !important; padding-bottom: 3px !important;  padding-top: 3px !important;">
        <span data-ng-bind="$ctrl.viewModel.Message"></span>
    </div>
    <div class="alert alert-danger pull-right" data-ng-hide="$ctrl.isErrorHidden" style="margin-bottom: 0 !important; padding-left: 10px !important; padding-right: 10px !important; padding-bottom: 3px !important;  padding-top: 3px !important;">
        <span data-ng-bind="$ctrl.viewModel.ErrorMessage"></span>
    </div>
</div>
<div class="box-body" data-ng-show="$ctrl.viewModel.IsInListMode()">
    <div class="col-xs-12">
        <button id="addnew" event-focus="click" event-focus-id="ProjectId" data-ng-click="$ctrl.viewModel.NewCommand()" data-ng-if="$ctrl.viewModel.CanExecuteNewCommand()" class="btn btn-primary pull-left" title="Add New Project">+ Add New Project</button>
        <label class="pull-right" style="padding-top: 12px !important;">
            Items Per Page
            <select id="quantity" data-ng-model="$ctrl.projectGrid.ItemsPerPage" data-ng-change="$ctrl.projectGrid.FirstCommand()">
                <option>5</option>
                <option>10</option>
                <option>20</option>
                <option>50</option>
                <option>100</option>
                <option>200</option>
            </select>
        </label>
        <a ng-show="$ctrl.projectGrid.ItemsPerPage > 20 && $ctrl.filteredProjects.length > 25" href="#bottom" target="_self" title="Jump to Bottom" class="btn btn-primary"><span class="fa fa-level-down" style="margin: 0px 3px 0px 1px !important; padding: 3px !important;"></span></a><a name="top"></a>
    </div>
    <table id="projects" class="table table-striped table-hover table-responsive no-border">
        <thead>
            <tr id="sortrow" class="bg-info DNABorderBottom">
                <th class="col-xs-3">
                    <a href="#" data-ng-click="$ctrl.projectGrid.SortCommand('ProjectName')">
                        Project Name
                        <span data-ng-show="$ctrl.projectGrid.Sort == 'ProjectName'" class="glyphicon glyphicon-sort pull-right"></span>
                    </a><br />
                    <input ng-model="projectGridFilter.ProjectName" type="search" data-ng-change="$ctrl.projectGrid.FirstCommand()" style="width: 100% !important;" />
                </th>
                <th class="col-xs-1">
                    <a href="#" data-ng-click="$ctrl.projectGrid.SortCommand('StartDate')">
                        Start Date
                        <span data-ng-show="$ctrl.projectGrid.Sort == 'StartDate'" class="glyphicon glyphicon-sort pull-right"></span>
                    </a><br />
                    <input ng-model="projectGridFilter.StartDate" type="search" data-ng-change="$ctrl.projectGrid.FirstCommand()" style="width: 100% !important;" />
                </th>
                <th class="col-xs-1">
                    <a href="#" data-ng-click="$ctrl.projectGrid.SortCommand('ProjectEndDate')">
                        End Date
                        <span data-ng-show="$ctrl.projectGrid.Sort == 'ProjectEndDate'" class="glyphicon glyphicon-sort pull-right"></span>
                    </a><br />
                    <input ng-model="projectGridFilter.ProjectEndDate" type="search" data-ng-change="$ctnl.projectGrid.FirstCommand()" style="width: 100% !important;" />
                </th>
                <th class="col-xs-2">
                    <a href="#" data-ng-click="$ctrl.projectGrid.SortCommand('ProjectOwner')">
                        Project Owner
                        <span data-ng-show="$ctrl.projectGrid.Sort == 'ProjectOwner'" class="glyphicon glyphicon-sort pull-right"></span>
                    </a><br />
                    <input ng-model="projectGridFilter.ProjectOwner" type="search" data-ng-change="$ctrl.projectGrid.FirstCommand()" style="width: 100% !important;" />
                </th>
                <th class="col-xs-2">
                    <a href="#" data-ng-click="$ctrl.projectGrid.SortCommand('ProjectManager')">
                        Project Manager
                        <span data-ng-show="$ctrl.projectGrid.Sort == 'ProjectManager'" class="glyphicon glyphicon-sort pull-right"></span>
                    </a><br />
                    <input ng-model="projectGridFilter.ProjectManager" type="search" data-ng-change="$ctrl.projectGrid.FirstCommand()" style="width: 100% !important;" />
                </th>
                <th class="col-xs-2">
                    <a href="#" data-ng-click="$ctrl.projectGrid.SortCommand('ProjectPhaseName')">
                        Project Phase
                        <span data-ng-show="$ctrl.projectGrid.Sort == 'ProjectPhaseName'" class="glyphicon glyphicon-sort pull-right"></span>
                    </a><br />
                    <input ng-model="projectGridFilter.ProjectPhaseName" type="search" data-ng-change="$ctrl.projectGrid.FirstCommand()" style="width: 100% !important;" />
                </th>
                <th class="col-xs-1">
                    <a href="#" data-ng-click="$ctrl.projectGrid.SortCommand('ProjectStatusName')">
                        Project Status
                        <span data-ng-show="$ctrl.projectGrid.Sort == 'ProjectStatusName'" class="glyphicon glyphicon-sort pull-right"></span>
                    </a><br />
                    <input ng-model="projectGridFilter.ProjectStatusName" type="search" data-ng-change="$ctrl.projectGrid.FirstCommand()" style="width: 100% !important;" />
                </th>
            </tr>
        </thead>
        <tbody>
            <tr data-ng-repeat="project in filteredProject = ($ctrl.viewModel.List.AllProjects | filter: projectGridFilter) | orderBy: $ctrl.projectGrid.Sort:$ctrl.projectGrid.Reverse | limitTo: $ctrl.projectGrid.ItemsPerPage">
                <td>
                    <a href="#" title="View/Edit" event-focus="click" event-focus-id="ProjectName" data-ng-click="$ctrl.viewModel.SelectProject(project)"><strong data-ng-bind="project.ProjectName"></strong></a>
                </td>
                <td data-ng-bind="project.FormattedStartDate()"></td>
                <td data-ng-bind="project.FormattedEndDate()"></td>
                <td data-ng-bind="project.ProjectOwner"></td>
                <td data-ng-bind="project.ProjectManager"></td>
                <td data-ng-bind="project.ProjectPhaseName"></td>
                <td data-ng-bind="project.ProjectStatusName"></td>
            </tr>
        </tbody>
        <tfoot>
            <tr class="bg-info">
                <th>Project Name</th>
                <th>Start Date</th>
                <th>End Date</th>
                <th>Project Owner</th>
                <th>Project Manager</th>
                <th>Project Phase</th>
                <th>Project Status</th>
            </tr>
        </tfoot>
    </table>

    <div id="pagination" class="btn-group pull-right" style="margin-top: 5px !important;">
        <button data-ng-click="$ctrl.projectGrid.FirstCommand()" data-ng-disabled="!$ctrl.projectGrid.CanExecuteFirstCommand()" class="btn btn-default"><span class="glyphicon glyphicon-fast-backward"></span> First</button>
        <button data-ng-click="$ctrl.projectGrid.PrevCommand()" data-ng-disabled="!$ctrl.projectGrid.CanExecutePrevCommand()" class="btn btn-default"><span class="glyphicon glyphicon-step-backward"></span> Prev</button>
        <button data-ng-click="$ctrl.projectGrid.LeftEllipseCommand()" data-ng-show="$ctrl.projectGrid.CanExecuteLeftEllipseCommand()" class="btn btn-default"><span class="glyphicon glyphicon-option-horizontal"></span></button>
        <button data-ng-repeat="n in $ctrl.projectGrid.PageNumbers() | limitTo:10:$ctrl.projectGrid.GetMinTab()" data-ng-click="$ctrl.projectGrid.PageCommand(n)" data-ng-disabled="!$ctrl.projectGrid.CanExecutePageCommand(n)" data-ng-bind="n+1" class="btn btn-default"></button>
        <button data-ng-click="$ctrl.projectGrid.RightEllipseCommand()" data-ng-show="$ctrl.projectGrid.CanExecuteRightEllipseCommand()" class="btn btn-default"><span class="glyphicon glyphicon-option-horizontal"></span></button>
        <button data-ng-click="$ctrl.projectGrid.NextCommand()" data-ng-disabled="!$ctrl.projectGrid.CanExecuteNextCommand()" class="btn btn-default">Next <span class="glyphicon glyphicon-step-forward"></span></button>
        <button data-ng-click="$ctrl.projectGrid.LastCommand()" data-ng-disabled="!$ctrl.projectGrid.CanExecuteLastCommand()" class="btn btn-default">Last <span class="glyphicon glyphicon-fast-forward"></span></button>
    </div>
</div>
<div data-ng-show="$ctrl.viewModel.IsInDetailMode()">
    <div class="box-body">
        <br />
        <div class="nav-tabs-custom">
            <ul class="nav nav-tabs">
                <li id="tab1" data-ng-class="$ctrl.viewModel.Detail.IsInRecordMode() ? 'active' : 'bg-gray-light'"><a href="#" data-ng-click="$ctrl.viewModel.Detail.RecordCommand()" title="Project" data-ng-disabled="!$ctrl.viewModel.Detail.CanExecuteRecordCommand()"><strong>Project: </strong>{{$ctrl.viewModel.Detail.Project.ProjectName}}</a></li>
            </ul>
            <div class="tab-content">
                <div class="margin" data-ng-show="$ctrl.viewModel.Detail.IsInRecordMode()" id="recordform">
                    <div class="col-lg-1"></div>
                    <div class="col-lg-12" style="margin-top: 25px;">
                        <form name="projectForm" id="projectForm">
                            <div class="form-group">
                                <label>Project Name</label>
                                <input data-ng-model="$ctrl.viewModel.Detail.Record.Project.ProjectName" type="text" class="form-control" placeholder="..." data-ng-disabled="$ctrl.viewModel.Detail.Record.IsInUpdateMode() ? 'disabled' : ''" id="projectname" maxlength="50" required="required">
                            </div>
                            <div class="form-group">
                                <label>Project Owner</label>
                                <input data-ng-model="$ctrl.viewModel.Detail.Record.Project.ProjectOwner" type="text" class="form-control" placeholder="..." id="projectowner" maxlength="50">
                            </div>
                            <div class="form-group">
                                <label>Project Manager</label>
                                <input data-ng-model="$ctrl.viewModel.Detail.Record.Project.ProjectManager" type="text" class="form-control" placeholder="..." id="projectmanager" maxlength="50">
                            </div>
                            <div class="form-group">
                                <label>Project Type</label>
                                <select data-ng-model="$ctrl.viewModel.Detail.Record.Project.ProjectTypeId"
                                        data-ng-options="item.ProjectTypeId as item.ProjectTypeName for item in $ctrl.viewModel.Detail.Record.AllTypes" class="form-control" name="projecttype" id="projecttype" required="required">
                                    <option value=""></option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label>Project Start Date</label>
                                <input data-ng-model="$ctrl.viewModel.Detail.Record.Project.StartDate" type="date" class="form-control" placeholder="..." id="projectstartdate">
                            </div>
                            <div class="form-group">
                                <label>Project End Date</label>
                                <input data-ng-model="$ctrl.viewModel.Detail.Record.Project.ProjectEndDate" type="date" class="form-control" placeholder="..." id="projectenddate">
                            </div>
                            <div class="form-group">
                                <label>Overall Percent Complete</label>
                                <input data-ng-model="$ctrl.viewModel.Detail.Record.Project.OverallPercentComplete" type="number" class="form-control" placeholder="..." id="overallpercentcomplete" maxlength="3">
                            </div>
                            <div class="form-group">
                                <label>Current Project Phase</label>
                                <select data-ng-model="$ctrl.viewModel.Detail.Record.Project.ProjectPhaseId"
                                        data-ng-options="item.ProjectPhaseId as item.ProjectPhaseName for item in $ctrl.viewModel.Detail.Record.AllPhases" class="form-control" name="projectphase" id="projectphase" required="required">
                                    <option value=""></option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label>Current Phase Estimated End Date</label>
                                <input data-ng-model="$ctrl.viewModel.Detail.Record.Project.PhaseEndDate" type="date" class="form-control" placeholder="..." id="phaseenddate">
                            </div>
                            <div class="form-group">
                                <label>Current Phase Percent Complete</label>
                                <input data-ng-model="$ctrl.viewModel.Detail.Record.Project.PhasePercentComplete" type="number" class="form-control" placeholder="..." id="phasepercentcomplete" maxlength="3">
                            </div>
                            <div class="form-group">
                                <label>Project Status</label>
                                <select data-ng-model="$ctrl.viewModel.Detail.Record.Project.ProjectStatusId"
                                        data-ng-options="item.ProjectStatusId as item.ProjectStatusName for item in $ctrl.viewModel.Detail.Record.AllStatuses" class="form-control" name="projectstatus" id="projectstatus" required="required">
                                    <option value=""></option>
                                </select>
                            </div>
                            <div class="form-group">
                                <label>Internal IT Project?</label>
                                <div class="radio">
                                    <label>
                                        <input type="radio" name="isinternal" id="internalyes" data-ng-model="$ctrl.viewModel.Detail.Record.Project.IsInternalIT" data-ng-value="1" data-ng-checked="$ctrl.viewModel.Detail.Record.Project.IsInternalIT==1" data-ng-required="true">
                                        Yes
                                    </label>
                                </div>
                                <div class="radio">
                                    <label>
                                        <input type="radio" name="isinternal" id="internalno" data-ng-model="$ctrl.viewModel.Detail.Record.Project.IsInternalIT" data-ng-value="0" data-ng-checked="$ctrl.viewModel.Detail.Record.Project.IsInternalIT==0" data-ng-required="true">
                                        No
                                    </label>
                                </div>
                            </div>
                            <div class="form-group">
                                <label>Waiting on Others? (Add Details In Comments)</label>
                                <div class="radio">
                                    <label>
                                        <input type="radio" name="iswaiting" id="waitingyes" data-ng-model="$ctrl.viewModel.Detail.Record.Project.IsWaiting" data-ng-value="1" data-ng-checked="$ctrl.viewModel.Detail.Record.Project.IsWaiting==1" data-ng-required="true">
                                        Yes
                                    </label>
                                </div>
                                <div class="radio">
                                    <label>
                                        <input type="radio" name="iswaiting" id="waitingno" data-ng-model="$ctrl.viewModel.Detail.Record.Project.IsWaiting" data-ng-value="0" data-ng-checked="$ctrl.viewModel.Detail.Record.Project.IsWaiting==0" data-ng-required="true">
                                        No
                                    </label>
                                </div>
                            </div>
                            <div class="form-group">
                                <label>Comments</label>
                                <textarea data-ng-model="$ctrl.viewModel.Detail.Record.Project.Comments" type="text" class="form-control" placeholder="..." id="comments" maxlength="500" required="required"></textarea>
                            </div>
                            <div class="form-group" id="formbuttons">
                                <button id="save" data-ng-click="$ctrl.viewModel.Detail.Record.SaveCommand(projectForm)" data-ng-if="($ctrl.viewModel.Detail.Record.CanExecuteSaveCommand() || $ctrl.viewModel.Detail.Record.CanExecuteEditCommand() && projectForm.$valid)" type="submit" class="btn btn-danger">Save</button>
                                <button id="cancel" type="button" class="btn btn-primary" data-ng-click="$ctrl.viewModel.CloseCommand('Modifications to the project have been cancelled')" title="Close" data-ng-disabled="!$ctrl.viewModel.CanExecuteCloseCommand()">Cancel</button>
                            </div>

                        </form>
                    </div>
                    <div class="col-lg-1"></div>

                </div>
            </div>
        </div>
    </div>
</div>`
})
export class AppComponent { }