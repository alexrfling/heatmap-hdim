// NOTE http://www.htmlwidgets.org/develop_intro.html

HTMLWidgets.widget({

    name: 'heatmap',

    type: 'output',

    factory: function (el, width, height) {

        var heatmap = new Heatmap(el.id);

        return {
            renderValue: function (x) {
                var scaleBy = x.options.scaleBy;

                if (!heatmap.dataset) {
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
                        colClustOrder: x.options.colClustOrder,
                        rowClustOrder: x.options.rowClustOrder,
                        height: height,
                        renderOnBrushEnd: true,
                        bucketColors: ['#a1d99b', '#74c476', '#41ab5d', '#238b45', '#006d2c'].reverse(),
                        parsed: true
                    };

                    heatmap.initialize(dataset, options);

                } else if (scaleBy !== heatmap.scalingDim) {

                    heatmap.updateColorScaling(scaleBy);

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
                        colClustOrder: x.options.colClustOrder,
                        rowClustOrder: x.options.rowClustOrder,
                        height: height,
                        renderOnBrushEnd: true,
                        bucketColors: ['#a1d99b', '#74c476', '#41ab5d', '#238b45', '#006d2c'].reverse(),
                        parsed: true
                    };

                    heatmap.initializeVis(dataset, options);
                }
            },

            resize: function (width, height) {
                // Heatmap handles its own resizing (except for height...)
            }
        };
    }
});
