import UIKit

class InputFilterDelegate: NSObject, UITextFieldDelegate {

  private let filters: [InputFilter]

  init(_ filters: [InputFilter]) {
    self.filters = filters
  }

  func textField(_ textField: UITextField, shouldChangeCharactersIn range: NSRange, replacementString string: String) -> Bool {
    let currentText = textField.text ?? ""
    let newText = (currentText as NSString).replacingCharacters(in: range, with: string)

    var filteredText = newText
    for filter in filters {
      if let result = filter.filter(input: filteredText) {
        filteredText = result
      }
    }

    if filteredText != newText {
      textField.text = filteredText
      return false
    }

    return true

  }
}
