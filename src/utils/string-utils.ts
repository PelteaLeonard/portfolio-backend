class StringUtils {
  public static camelCaseToSnakeCase(str: string): string {
    return (
      str
        // Prima data, inseram (adaugam) un underscore inainte de fiecare litera mare
        .replace(/([A-Z])/g, "_$1")
        // Facem toate literele mici
        .toLowerCase()
        // Stergem primul underscore din string, daca cumva stringul incepea cu litera mare
        .replace(/^_/, "")
    );
  }

  public static snakeCaseToCamelCase(str: string): string {
    // Inlocuieste toate underscores cu nimic si face prima litera dupa underscore litera mare
    // snake_case -> snakeCase
    return str.replace(/(_\w)/g, (match) => match[1].toUpperCase());
  }

  public static capitalize(str: string): string {
    return str.charAt(0).toUpperCase() + str.slice(1).toLowerCase();
  }
}

export default StringUtils;
