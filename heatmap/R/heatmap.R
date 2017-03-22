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
heatmap <- function (matrix, width = NULL, height = NULL, scaleBy = 'col') {

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
        scaleBy = scaleBy
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
