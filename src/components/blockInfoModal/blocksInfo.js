export const blocksInfo = [
  {
    blockType: "variables_set",
    blockTitle: "'Setter'",
    blockInfo: "Asigna valor a la variable.",
  },
  {
    blockType: "variables_get",
    blockTitle: "'Getter'",
    blockInfo: "Obtiene el valor de la variable.",
  },
  {
    blockType: "comparison",
    blockTitle: "'Comparación'",
    blockInfo: "Realiza filtros dentro de columnas de un DataFrame.",
  },
  {
    blockType: "read_csv",
    blockTitle: "'Read CSV'",
    blockInfo: "Convierte a DataFrame el CSV ingresado.",
  },
  {
    blockType: "property",
    blockTitle: "'Columnas'",
    blockInfo:
      "A partir de un DataFrame, obtiene sus columnas para poder operar con ellas.",
  },
  {
    blockType: "head",
    blockTitle: "'Head'",
    blockInfo:
      "Por defecto obtiene las primeras 5 filas del DataFrame y, sino, se puede indicar la cantidad deseada.",
  },
  {
    blockType: "info",
    blockTitle: "'Info'",
    blockInfo:
      "Obtiene características del DataFrame, incluyendo las columnas, tipos de datos y memoria utilizada.",
  },
  {
    blockType: "describe",
    blockTitle: "'Describe'",
    blockInfo:
      "Genera estadísticas de las columnas numéricas del DataFrame: promedio, valor máximo, mínimo, entre otros.",
  },
  {
    blockType: "dtypes",
    blockTitle: "'Dtypes'",
    blockInfo: "Obtiene los tipos de datos de las columnas del DataFrame.",
  },
  {
    blockType: "column",
    blockTitle: "'Columns'",
    blockInfo: "Obtiene los nombres de las columnas del DataFrame.",
  },
  {
    blockType: "shape",
    blockTitle: "'Shape'",
    blockInfo: "Obtiene el número de filas y columnas del DataFrame.",
  },
  {
    blockType: "count",
    blockTitle: "'Count'",
    blockInfo:
      "Obtiene la cantidad de valores no nulos que hay en cada columna del DataFrame.",
  },
  {
    blockType: "max",
    blockTitle: "'Max'",
    blockInfo: "Obtiene el valor máximo de cada columna del DataFrame.",
  },
  {
    blockType: "min",
    blockTitle: "'Min'",
    blockInfo: "Obtiene el valor mínimo de cada columna del DataFrame.",
  },
  {
    blockType: "mean",
    blockTitle: "'Mean'",
    blockInfo:
      "Calcula el promedio de cada columna del DataFrame. Todas ellas deben ser numéricas para que funcione.",
  },
  {
    blockType: "unique",
    blockTitle: "'Unique'",
    blockInfo:
      "Obtiene los valores únicos de una columna específica del DataFrame.",
  },
  {
    blockType: "nullSum",
    blockTitle: "'IsNull + Sum'",
    blockInfo:
      "Obtiene la cantidad de valores nulos de cada columna del DataFrame.",
  },
  {
    blockType: "sort",
    blockTitle: "'Sort'",
    blockInfo:
      "Ordena el DataFrame de forma ascendente o descendente a partir de una columna.",
  },
  {
    blockType: "bar",
    blockTitle: "'Bar'",
    blockInfo:
      "Genera un gráfico de barras a partir de dos columnas del DataFrame (x, y).",
  },
  {
    blockType: "line",
    blockTitle: "'Line'",
    blockInfo:
      "Genera un gráfico de líneas a partir de dos columnas del DataFrame (x, y).",
  },
  {
    blockType: "pie",
    blockTitle: "'Pie'",
    blockInfo:
      "Genera un gráfico de torta a partir de dos columnas del DataFrame. La de 'values' debe ser numérica.",
  },
  {
    blockType: "scatter",
    blockTitle: "'Scatter'",
    blockInfo:
      "Genera un gráfico de puntos a partir de dos columnas del DataFrame (x, y).",
  },
  {
    blockType: "print_with_argument",
    blockTitle: "'Print'",
    blockInfo: "Imprime en consola el resultado de las operaciones realizadas.",
  },
  {
    blockType: "show",
    blockTitle: "'Show'",
    blockInfo: "Imprime en una pestaña nueva el gráfico generado.",
  },
  {
    blockType: "showInConsole",
    blockTitle: "'Show'",
    blockInfo: "Imprime en consola el gráfico generado.",
  },
  {
    blockType: "groupby",
    blockTitle: "'Group by'",
    blockInfo:
      "Agrupa un DataFrame por una columna y permite aplicar operaciones agregadas (como suma, promedio o máximo) a cada grupo resultante.",
  },
  {
    blockType: "sum",
    blockTitle: "'Sum'",
    blockInfo:
      "Se utiliza para sumar los valores numéricos en una columna o un DataFrame.",
  },
  {
    blockType: "valueCounts",
    blockTitle: "'Values Counts'",
    blockInfo:
      "Cuenta cuántas veces aparece cada valor único en una columna o DataFrame.",
  },
  {
    blockType: "values",
    blockTitle: "'Values'",
    blockInfo: "Obtiene los datos almacenados en una columna.",
  },
  {
    blockType: "index",
    blockTitle: "'Index'",
    blockInfo: "Obtiene las etiquetas asociadas a los datos de una columna.",
  },
  {
    blockType: "map_viewer",
    blockTitle: "'Generador de Mapas'",
    blockInfo: "Genera un mapa a partir de un DataFrame con marcadores basados en las columnas proporcionadas.",
  },
    {
    blockType: "get_column_name",
    blockTitle: "'Obtener Nombre de Columna'",
    blockInfo: "Obtiene el nombre de una columna como texto.",
  },
];
