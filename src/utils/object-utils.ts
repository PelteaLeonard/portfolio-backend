import StringUtils from "./string-utils";

class ObjectUtils {
  public static objectKeysToSnakeCase(
    obj: Record<string, any>
  ): Record<string, any> {
    const result: Record<string, any> = {};

    Object.entries(obj).forEach(([key, value]) => {
      const snakeCaseKey = StringUtils.camelCaseToSnakeCase(key);
      result[snakeCaseKey] = value;
    });

    return result;
  }

  public static objectKeysToCamelCase(
    obj: Record<string, any>
  ): Record<string, any> {
    return Object.keys(obj).reduce((result, key) => {
      const camelCaseKey = StringUtils.snakeCaseToCamelCase(key);
      result[camelCaseKey] = obj[key];
      return result;
    }, {} as Record<string, any>);
  }
}

export default ObjectUtils;
