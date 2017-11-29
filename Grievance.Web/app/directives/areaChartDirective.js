(function () {
    'use strict';

    angular.module('AngularAuthApp').directive('productAreaChart', function ($filter) {
            return { restrict: 'E', scope: { products: '=products'},template: '<canvas></canvas>',replace: true,link: function (scope, element, attrs) {
                    scope.$watch('products', function (products) {
                        if (products.length != null) {

                            var productCanvas = document.getElementById(attrs.id).getContext('2d');


                            var areaChartData = {
                                labels: products[0].monthNames,
                                datasets: [
                                    {
                                        label: products[0].productName,
                                        fillColor: "rgba(210, 214, 222, 1)",
                                        strokeColor: "rgba(210, 214, 222, 1)",
                                        pointColor: "rgba(210, 214, 222, 1)",
                                        pointStrokeColor: "#c1c7d1",
                                        pointHighlightFill: "#fff",
                                        backgroundColor: 'rgba(210, 214, 222, 1)',
                                        data: products[0].monthTotals
                                    },
                                    {
                                        label: products[1].productName,
                                        fillColor: "rgba(60,141,188,0.9)",
                                        strokeColor: "rgba(60,141,188,0.8)",
                                        pointColor: "#3b8bba",
                                        pointStrokeColor: "rgba(60,141,188,1)",
                                        pointHighlightFill: "#fff",
                                        pointHighlightStroke: "rgba(60,141,188,1)",
                                        backgroundColor: 'rgba(60,141,188,0.9)',
                                        data: products[1].monthTotals
                                    }
                                ]
                            };

                            var areaChartOptions = {
                                //Boolean - If we should show the scale at all
                                showScale: true,
                                //Boolean - Whether grid lines are shown across the chart
                                scaleShowGridLines: false,
                                //String - Colour of the grid lines
                                scaleGridLineColor: "rgba(0,0,0,.05)",
                                //Number - Width of the grid lines
                                scaleGridLineWidth: 1,
                                //Boolean - Whether to show horizontal lines (except X axis)
                                scaleShowHorizontalLines: true,
                                //Boolean - Whether to show vertical lines (except Y axis)
                                scaleShowVerticalLines: true,
                                //Boolean - Whether the line is curved between points
                                bezierCurve: true,
                                //Number - Tension of the bezier curve between points
                                bezierCurveTension: 0.3,
                                //Boolean - Whether to show a dot for each point
                                pointDot: false,
                                //Number - Radius of each point dot in pixels
                                pointDotRadius: 4,
                                //Number - Pixel width of point dot stroke
                                pointDotStrokeWidth: 1,
                                //Number - amount extra to add to the radius to cater for hit detection outside the drawn point
                                pointHitDetectionRadius: 20,
                                //Boolean - Whether to show a stroke for datasets
                                datasetStroke: true,
                                //Number - Pixel width of dataset stroke
                                datasetStrokeWidth: 2,
                                //Boolean - Whether to fill the dataset with a color
                                datasetFill: true,                                                          
                                //Boolean - whether to maintain the starting aspect ratio or not when responsive, if set to false, will take up entire container
                                maintainAspectRatio: true,
                                //Boolean - whether to make the chart responsive to window resizing
                                responsive: true,
                                //config legends  
                                legend: { legend: { display: true } }
                            };

                            var productChart = new Chart(productCanvas, {
                                type: 'line',
                                data: areaChartData,
                                options: areaChartOptions
                            });



                        };
                    });

                }
            }
        });
})();