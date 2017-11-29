'use strict';
app.controller('dashboardController', ['$scope', function ($scope) {
    $scope.dataSource = filterData("");
    $scope.isFirstLevel = true;

    $scope.chartOptions = {
        bindingOptions: {
            dataSource: "dataSource",
        },
        //title: "Ticket Statuses per category",
        series: {
            type: "bar"
        },
        legend: {
            visible: false
        },
        valueAxis: {
            label: { format: "thousands" },
            showZero: false
        },
        onPointClick: function (e) {
            if ($scope.isFirstLevel) {
                $scope.isFirstLevel = false;
               // removePointerCursor($element);
                $scope.dataSource = filterData(e.target.originalArgument);
            }
        },
        customizePoint: function () {
            var pointSettings = {
                color: colors[Number($scope.isFirstLevel)]
            };

            if (!$scope.isFirstLevel) {
                pointSettings.hoverStyle = {
                    hatching: "none"
                };
            }

            return pointSettings;
        }
    };
    $scope.buttonOptions = {
        text: "Back",
        icon: "chevronleft",
        bindingOptions: {
            visible: "!isFirstLevel"
        },
        onClick: function () {
            if (!$scope.isFirstLevel) {
                $scope.isFirstLevel = true;
               // addPointerCursor($element);
                $scope.dataSource = filterData("");
            }
        }
    };


    $scope.chartPie = {
        size: {
            width: 500
        },
        palette: "bright",
        dataSource: dataSourcePie,
        series: [
            {
                argumentField: "country",
                valueField: "area",
                label: {
                    visible: true,
                    connector: {
                        visible: true,
                        width: 1
                    }
                }
            }
        ],
        //title: "Number Of Tickets Assigned To Departments",
        "export": {
            enabled: true
        },
        onPointClick: function (e) {
            var point = e.target;

            toggleVisibility(point);
        },
        onLegendClick: function (e) {
            var arg = e.target;

            toggleVisibility(this.getAllSeries()[0].getPointsByArg(arg)[0]);
        }
    };

    function toggleVisibility(item) {
        if (item.isVisible()) {
            item.hide();
        } else {
            item.show();
        }
    }

    $scope.chartSelection = {
        rotated: true,
        pointSelectionMode: "multiple",
        dataSource: dataSource,
        commonSeriesSettings: {
            argumentField: "country",
            type: "stackedbar",
            selectionStyle: {
                hatching: {
                    direction: "left"
                }
            }
        },
        series: [
            { valueField: "gold", name: "Complaint", color: "#ffd700" },
            //{ valueField: "silver", name: "Silver Medals", color: "#c0c0c0" },
            { valueField: "bronze", name: "Anonymous", color: "#cd7f32" }
        ],
        //title: {
        //    text: "Complainant vs Anonymous"
        //},
        "export": {
            enabled: true
        },
        legend: {
            verticalAlignment: "bottom",
            horizontalAlignment: "center"
        },
        onPointClick: function (e) {
            var point = e.target;
            if (point.isSelected()) {
                point.clearSelection();
            } else {
                point.select();
            }
        }
    };

    $scope.chartPie2 = {
        palette: "bright",
        dataSource: dataPie2,
        //title: "Ticket Issues For November",
        legend: {
            orientation: "horizontal",
            itemTextPosition: "right",
            horizontalAlignment: "right",
            verticalAlignment: "bottom",
            columnCount: 4
        },
        "export": {
            enabled: true
        },
        series: [{
            argumentField: "country",
            valueField: "medals",
            label: {
                visible: true,
                font: {
                    size: 16
                },
                connector: {
                    visible: true,
                    width: 0.5
                },
                position: "columns",
                customizeText: function (arg) {
                    return arg.valueText + " (" + arg.percentText + ")";
                }
            }
        }]
    };



   // addPointerCursor($element);
}]);

function filterData(name) {
    return data.filter(function (item) {
        return item.parentID === name;
    });
}

function addPointerCursor(element) {
    element.find("#chart").addClass("pointer-on-bars");
}

function removePointerCursor(element) {
    element.find("#chart").removeClass("pointer-on-bars");
}

var colors = ["#e55253", "#70c92f"];

var data = [
    { arg: "New", val: 30761, parentID: "" }, //Asia
    { arg: "Resolved", val: 10960, parentID: "" }, //North America
    { arg: "Escalated", val: 43857, parentID: "" }, //Europe
    { arg: "Assigned", val: 15133, parentID: "" }, //Africa
    { arg: "Pending Resolution", val: 33112, parentID: "" }, //South America
    { arg: "Education & Skills development", val: 8156, parentID: "Assigned" },
    { arg: "Safety, Health & Environment", val: 9848, parentID: "Assigned" },
    { arg: "Enterprise Development", val: 7743, parentID: "Assigned" },
    { arg: "Employment", val: 18156, parentID: "Assigned" },
    { arg: "Education & Skills development", val: 13800, parentID: "New" },
    { arg: "Safety, Health & Environment", val: 13066, parentID: "New" },
    { arg: "Enterprise Development", val: 19388, parentID: "New" },
    { arg: "Employment", val: 12695, parentID: "New" },
    { arg: "Education & Skills development", val: 4680, parentID: "Resolved" },
    { arg: "Safety, Health & Environment", val: 8217, parentID: "Resolved" },
    { arg: "Enterprise Development", val: 14680, parentID: "Resolved" },
    { arg: "Employment", val: 6673, parentID: "Resolved" },
    { arg: "Infrastructural, General", val: 6339, parentID: "Resolved" },
    { arg: "Education & Skills development", val: 32531, parentID: "Escalated" },
    { arg: "Safety, Health & Environment", val: 12100, parentID: "Escalated" },
    { arg: "Enterprise Development", val: 3604, parentID: "Escalated" },
    { arg: "Employment", val: 1123, parentID: "Escalated" },
    { arg: "Education & Skills development", val: 1573, parentID: "Pending Resolution" },
    { arg: "Safety, Health & Environment", val: 4840, parentID: "Pending Resolution" },
    { arg: "Enterprise Development", val: 3076, parentID: "Pending Resolution" },
    { arg: "Employment", val: 2822, parentID: "Pending Resolution" },
    { arg: "Infrastructural, General", val: 1800, parentID: "Pending Resolution" }
];

var dataSourcePie = [{
    country: "UnAssigned",
    area: 70
}, {
    country: "Protection Services",
    area: 750
}, {
    country: "Social Performance",
    area: 600
}, {
    country: "Safety, Health and Environment",
    area: 999
}, {
    country: "Procurement/SCM",
    area: 2410
}, {
    country: "Human Resources ",
    area: 3000
}];

var dataSource = [{
    country: "January",
    gold: 36,
    silver: 38,
    bronze: 36
}, {
    country: "February",
    gold: 51,
    silver: 21,
    bronze: 28
}, {
    country: "March",
    gold: 23,
    silver: 21,
    bronze: 28
}, {
    country: "April",
    gold: 19,
    silver: 13,
    bronze: 15
}, {
    country: "May",
    gold: 14,
    silver: 15,
    bronze: 17
}, {
    country: "June",
    gold: 16,
    silver: 10,
    bronze: 15
}, {
    country: "July",
    gold: 18,
    silver: 10,
    bronze: 7
}, {
    country: "August",
    gold: 40,
    silver: 10,
    bronze: 3
}, {
    country: "September",
    gold: 11,
    silver: 10,
    bronze: 25
}, {
    country: "October",
    gold: 36,
    silver: 10,
    bronze: 8
}, {
    country: "November",
    gold: 30,
    silver: 10,
    bronze: 5
}, {
    country: "December",
    gold: 25,
    silver: 10,
    bronze: 15
}];

var dataPie2 = [{
    country: "Complaint",
    medals: 110
}, {
    country: "Commitment",
    medals: 100
}, {
    country: "Compliance",
    medals: 72
}, {
    country: "UnAssigned",
    medals: 47
}, {
    country: "Goodwill",
    medals: 46
}];