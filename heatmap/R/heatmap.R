#' @import htmlwidgets
#' @export

# You can learn more about package authoring with RStudio at:
#
#   http://r-pkgs.had.co.nz/
#
# Some useful keyboard shortcuts for package authoring:
#
#   Build and Reload Package:  'Cmd + Shift + B'
#   Check Package:             'Cmd + Shift + E'
#   Test Package:              'Cmd + Shift + T'
heatmap <- function (matrix,
                     width = NULL,
                     height = NULL,
                     colClustOrder = NULL,
                     rowClustOrder = NULL,
                     loColor = 'cornflowerblue',
                     hiColor = 'orange',
                     colorsBucket = c('red', 'orange', 'yellow', 'gray', 'cornflowerblue'),
                     dividersBucket = c(25, 50, 100, 500),
                     colCatScheme = 'rainbow',
                     colConScheme = 'rainbow',
                     colAnnoHeatScheme = 'plasma',
                     rowCatScheme = 'google',
                     rowConScheme = 'cubehelix',
                     rowAnnoHeatScheme = 'magma',
                     categorical = TRUE,
                     scalingDim = 'col',
                     renderOnBrushEnd = TRUE) {

    # read the matrix
    data <- matrix
    origColnames <- colnames(data)
    data <- cbind(rownames(data), data)
    colnames(data) <- c('X', origColnames)
    obj <- stats::heatmap(as.matrix(matrix))
    colClustOrder <- colnames(matrix)[obj$colInd]
    rowClustOrder <- rownames(matrix)[obj$rowInd][nrow(matrix):1]

    options <- list(
        id = 'heatmap',
        colClustOrder = colClustOrder,
        rowClustOrder = rowClustOrder,
        loColor = loColor,
        hiColor = hiColor,
        colorsBucket = colorsBucket,
        dividersBucket = dividersBucket,
        colCatScheme = colCatScheme,
        colConScheme = colConScheme,
        colAnnoHeatScheme = colAnnoHeatScheme,
        rowCatScheme = rowCatScheme,
        rowConScheme = rowConScheme,
        rowAnnoHeatScheme = rowAnnoHeatScheme,
        categorical = categorical,
        scalingDim = scalingDim,
        renderOnBrushEnd = renderOnBrushEnd
    )

    # pass the data and settings using 'x'
    x <- list(
        data = data,
        options = options
    )

    htmlwidgets::createWidget('heatmap', x, width = width, height = height)
}

#' @export
heatmapOutput <- function (outputId, width = '100%', height = '400px') {
    shinyWidgetOutput(outputId, 'heatmap', width, height, package = 'heatmap')
}

#' @export
renderHeatmap <- function (expr, env = parent.frame(), quoted = FALSE) {
    if (!quoted) { expr <- substitute(expr) } # force quoted
    shinyRenderWidget(expr, heatmapOutput, env, quoted = TRUE)
}
