export class CommonValidator {
  // password regex: just letters and number (min length: 8, max: 25)
  private static regIsPassword = new RegExp('^.{8,32}$')
  private static regIsPhoneNumber = new RegExp('^09[0-9]{9}$')
  private static regIsEmail =
    /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/

  public static isArray(value: readonly any[]): boolean {
    return value != null && value.constructor === Array
  }

  public static isEmptyArray(val: readonly any[]): boolean {
    if (CommonValidator.isArray(val) === false) {
      return false
    }
    return val.length === 0
  }

  public static isNullOrEmpty(str: string): boolean {
    return str == null || str.trim() === ''
  }

  public static isNumber(val: any): boolean {
    return val != null && !isNaN(val)
  }

  public static isZeroOrEmptyNumber(val: number): boolean {
    if (val == null) {
      return true
    }
    return val === 0
  }
  public static isPersian(c: string) {
    return CommonValidator.isNullOrEmpty(c) ? false : c[0].match(this.regIsPersian) !== null
  }
  public static isEmptyMap(value: Map<any, any>): boolean {
    return value == null || value.size === 0
  }
  public static isPhoneNumber(c: string): boolean {
    return CommonValidator.isNullOrEmpty(c) ? false : this.regIsPhoneNumber.test(c)
  }

  public static isPassword(c: string): boolean {
    return CommonValidator.isNullOrEmpty(c) ? false : this.regIsPassword.test(c)
  }

  public static isEmail(c: string): boolean {
    return CommonValidator.isNullOrEmpty(c) ? false : this.regIsEmail.test(c)
  }

  private static regIsPersian = new RegExp(
    '[\u0622|\u0627-\u0628|\u062a-\u0649|\u067e|\u06af|\u0686|\u0698|\u06a9|\u06CC|0-9]',
    'g'
  )
}
