import Foundation

class DecimalNumberFilter: InputFilter {

  private let pattern: String

  init(_ maxDigitsBeforeDecimal: Int, _ maxDigitsAfterDecimal: Int) {
    self.pattern = "^\\d{0,\(maxDigitsBeforeDecimal)}(\\.\\d{0,\(maxDigitsAfterDecimal)})?$"
  }

  func filter(input: String) -> String? {
    let regex = try? NSRegularExpression(pattern: pattern, options: [])
    
    // todo: replace comma with a decimal point
    // todo: prepend "0" if the first character is a decimal point

    let range = NSRange(location: 0, length: input.count)
    if let match = regex?.firstMatch(in: input, options: [], range: range) {
      return input
    }

    return nil
  }
}
