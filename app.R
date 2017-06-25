# if not installed already, run
#   install.packages('htmlwidgets')
#   install.packages('/path/to/heatmap_0.1.tar.gz', repos = NULL, type = 'source')
library(htmlwidgets)
library(heatmap)

COLORS = list(
    Corn = 'cornflowerblue',
    Red = '#dc3912',
    Orange = '#e67300',
    Yellow = '#ff9900',
    Green = '#109618',
    Blue = '#3366cc',
    Purple = '#990099'
)

ui <- fluidPage(

    absolutePanel(top = '0.5%', left = '0.5%', width = '19%', fixed = TRUE,
        wellPanel(style = 'overflow-y: scroll; height: 99vh;',

            fileInput(inputId = 'file',
                      label = 'Choose a file:'),

            selectInput(inputId = 'scalingDim',
                        label = 'Scale by:',
                        choices = list(
                            'Z-score (column)' = 'col',
                            'Z-score (row)' = 'row',
                            'None' = 'none',
                            'Buckets' = 'bucket'
                        )),

            radioButtons(inputId = 'rowNamesIndex',
                         label = 'Row names index:',
                         choices = c(1, 'none')),

            selectInput(inputId = 'loColor',
                        label = 'Low color:',
                        choices = COLORS,
                        selected = COLORS$Corn),

            selectInput(inputId = 'hiColor',
                        label = 'High color:',
                        choices = COLORS,
                        selected = COLORS$Orange)
        )
    ),

    absolutePanel(top = '0.5%', left = '20%', right = '0.5%', style = 'height: 99vh',

        heatmapOutput(outputId = 'map', width = '100%', height = '100%')

    )
)

server <- function (input, output) {

    output$map <- renderHeatmap({

        if (is.null(input$file)) {
            return(NULL)
        }

        removeColsWithNas <- function (df) {
            colsWithNas <- NULL
            cnames <- colnames(df)

            for (name in cnames) {
                if (any(is.na(df[, name]))) {
                    colsWithNas <- c(colsWithNas, name)
                }
            }

            df <- df[, !(cnames %in% colsWithNas)]

            return(df)
        }

        getDataFrame <- function (file, rowNamesIndex) {
            if (is.null(file)) {
                return(NULL)
            }

            if (rowNamesIndex == 'none') {
                df <- read.csv(file$datapath, stringsAsFactors = FALSE)
                rownames(df) <- sapply(1:nrow(df), function (j) { return(paste('Row', j)) })
            } else {
                df <- read.csv(file$datapath, row.names = as.numeric(rowNamesIndex), stringsAsFactors = FALSE)
            }

            return(df)
        }

        df <- removeColsWithNas(getDataFrame(input$file, input$rowNamesIndex))

        heatmap(df,
                width = '100%',
                height = '100%',
                loColor = input$loColor,
                hiColor = input$hiColor,
                scalingDim = input$scalingDim,
                colorsBucket = rev(c('#a1d99b', '#74c476', '#41ab5d', '#238b45', '#006d2c')))
    })
}

shinyApp(ui, server)
