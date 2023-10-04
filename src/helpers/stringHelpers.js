/* eslint-disable radix */
const stringHelpers = {};

stringHelpers.extractLeadingNumber = (str) => {
  const GLOBAL_WHITE_SPACE = /\s/g;
  str = str.replace(GLOBAL_WHITE_SPACE, "");
  return parseInt(str.slice(0, str.indexOf("-")), 10);
};

stringHelpers.sortByLeadingNumber = (array) =>
  array.sort(function (a, b) {
    var numA = parseInt(a.substring(0, 3)); // Extraer los primeros 3 dígitos y convertir a número
    var numB = parseInt(b.substring(0, 3));
    if (numA === numB) {
      return a.localeCompare(b); // Si los primeros 3 dígitos son iguales, utilizar ordenación alfabética
    } else {
      return numA - numB; // Ordenar en función de la diferencia numérica de los primeros 3 dígitos
    }
  });
export { stringHelpers };
