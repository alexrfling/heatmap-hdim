// NOTE http://www.htmlwidgets.org/develop_intro.html

HTMLWidgets.widget({

    name: 'heatmap',

    type: 'output',

    factory: function (el, width, height) {

        var chart = new Heatmap(el.id);

        // booleans converted from R may be true, false, 'TRUE', or 'FALSE'
        function getBool (bool) {
            return (bool === true || bool === 'TRUE');
        }

        return {
            renderValue: function (x) {
                var colClustOrder = x.options.colClustOrder;
                var rowClustOrder = x.options.rowClustOrder;
                var loColor = x.options.loColor;
                var hiColor = x.options.hiColor;
                var colorsBucket = x.options.colorsBucket;
                var dividersBucket = x.options.dividersBucket;
                var colCatScheme = x.options.colCatScheme;
                var colConScheme = x.options.colConScheme;
                var colAnnoHeatScheme = x.options.colAnnoHeatScheme;
                var rowCatScheme = x.options.rowCatScheme;
                var rowConScheme = x.options.rowConScheme;
                var rowAnnoHeatScheme = x.options.rowAnnoHeatScheme;
                var categorical = getBool(x.options.categorical);
                var scalingDim = x.options.scalingDim;
                var renderOnBrushEnd = getBool(x.options.renderOnBrushEnd);

                if (!chart.data) {
                    var data = HTMLWidgets.dataframeToD3(x.data);
                    var colnames = Object.keys(x.data).map(String);
                    var rowKey = colnames.shift();
                    var rownames = x.data[rowKey].map(String);

                    var matrix = rownames.map(function (rowname, j) {
                        return colnames.map(function (colname, k) {
                            return {
                                key: j + ' ' + k,
                                row: rowname,
                                col: colname,
                                value: x.data[colname][j]
                            };
                        });
                    });

                    var dataset = {
                        matrix: matrix,
                        rownames: rownames,
                        colnames: colnames
                    };

                    var options = {
                        colClustOrder: colClustOrder,
                        rowClustOrder: rowClustOrder,
                        loColor: loColor,
                        hiColor: hiColor,
                        colorsBucket: colorsBucket,
                        dividersBucket: dividersBucket,
                        colCatScheme: colCatScheme,
                        colConScheme: colConScheme,
                        colAnnoHeatScheme: colAnnoHeatScheme,
                        rowCatScheme: rowCatScheme,
                        rowConScheme: rowConScheme,
                        rowAnnoHeatScheme: rowAnnoHeatScheme,
                        categorical: categorical,
                        scalingDim: scalingDim,
                        renderOnBrushEnd: renderOnBrushEnd
                    };

                    chart.initialize(dataset, options);

                } else if (scalingDim !== chart.scalingDim) {

                    chart.updateColorScaling(scalingDim);

                } else {
                    var data = HTMLWidgets.dataframeToD3(x.data);
                    var colnames = Object.keys(x.data).map(String);
                    var rowKey = colnames.shift();
                    var rownames = x.data[rowKey].map(String);

                    var matrix = rownames.map(function (rowname, j) {
                        return colnames.map(function (colname, k) {
                            return {
                                key: j + ' ' + k,
                                row: rowname,
                                col: colname,
                                value: x.data[colname][j]
                            };
                        });
                    });

                    var dataset = {
                        matrix: matrix,
                        rownames: rownames,
                        colnames: colnames
                    };

                    var options = {
                        width: width,
                        height: height,
                        colClustOrder: colClustOrder,
                        rowClustOrder: rowClustOrder,
                        loColor: loColor,
                        hiColor: hiColor,
                        colorsBucket: colorsBucket,
                        dividersBucket: dividersBucket,
                        colCatScheme: colCatScheme,
                        colConScheme: colConScheme,
                        colAnnoHeatScheme: colAnnoHeatScheme,
                        rowCatScheme: rowCatScheme,
                        rowConScheme: rowConScheme,
                        rowAnnoHeatScheme: rowAnnoHeatScheme,
                        categorical: categorical,
                        scalingDim: scalingDim,
                        renderOnBrushEnd: renderOnBrushEnd
                    };

                    chart.initialize(dataset, options);
                }
            },

            resize: function (width, height) {
                chart.resize(width, height);
            }
        };
    }
});
