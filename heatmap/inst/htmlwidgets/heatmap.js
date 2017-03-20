HTMLWidgets.widget({

    name: 'heatmap',

    type: 'output',

    factory: function (el, width, height) {

        // http://www.htmlwidgets.org/develop_intro.html

        return {
            renderValue: function (x) {
                var data = HTMLWidgets.dataframeToD3(x.data);
                var colnames = Object.keys(x.data).map(function (d) { return String(d); });
                var rowKey = colnames.shift();
                var rownames = x.data[rowKey].map(function (d) { return String(d); });

                var matrix = rownames.map(function (rowname, index) {
                    return colnames.map(function (colname) {
                        return {
                            key: rowname + ' ' + colname,
                            row: rowname,
                            col: colname,
                            value: x.data[colname][index]
                        };
                    });
                });

                var df = {
                    matrix: matrix,
                    rownames: rownames,
                    colnames: colnames
                };

                var options = {
                    colClustOrder: x.settings.colClustOrder,
                    rowClustOrder: x.settings.rowClustOrder,
                    height: height,
                    renderOnBrushEnd: true,
                    parsed: true
                };

                heatmap(el.id, df, options);
            },

            resize: function (width, height) {
                // heatmap handles its own resizing (except for height...)
            }
        };
    }
});
