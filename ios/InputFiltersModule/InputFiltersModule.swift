import Foundation
import UIKit
import React

enum InputFiltersError: Error {
  case filterNotFound(String)
}

@objc(InputFiltersModule)
class InputFiltersModule: NSObject, RCTBridgeModule {

  // todo: remove from this array when component unmounts
  private var delegates: [InputFilterDelegate] = []

  static func moduleName() -> String {
    return "InputFiltersModule"
  }

  @objc func install(_ viewId: NSNumber, filterOptions: NSArray) {
    DispatchQueue.main.async {
      guard let reactView = UIApplication.shared.delegate?.window??.rootViewController?.view,
            let textField = reactView.viewWithTag(viewId.intValue) as? UITextField else {
        return
      }

      let filters = try! self.getFilters(filterOptions)
      let delegate = InputFilterDelegate(filters)
      self.delegates.append(delegate)
      textField.delegate = delegate
    }
  }

  private func getFilters(_ filterOptions: NSArray) throws -> [InputFilter] {
    var filters: [InputFilter] = []

    for option in filterOptions {
      guard let optionDict = option as? [String: Any],
            let type = optionDict["type"] as? String else {
        throw InputFiltersError.filterNotFound("Input Filter type is nil")
      }

      // todo: use strategy pattern. Also on web and android
      if type == "DecimalNumber",
         let maxDigitsBeforeDecimal = optionDict["maxDigitsBeforeDecimal"] as? Int,
         let maxDigitsAfterDecimal = optionDict["maxDigitsAfterDecimal"] as? Int {

        filters.append(DecimalNumberFilter(maxDigitsBeforeDecimal, maxDigitsAfterDecimal))
        continue
      }

      throw InputFiltersError.filterNotFound("Input Filter of type \"\(type)\" was not found")
    }

    return filters
  }
}
