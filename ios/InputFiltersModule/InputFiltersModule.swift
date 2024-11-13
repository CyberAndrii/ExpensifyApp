import Foundation
import UIKit
import React

struct InputFiltersError: Error {
  let message: String
  
  init(_ message: String) {
    self.message = message
  }
}

@objc(InputFiltersModule)
class InputFiltersModule: NSObject, RCTBridgeModule {
    
  // todo: remove from this array when component unmounts
  private var delegates: [InputFilterDelegate] = []
  
  static func moduleName() -> String {
    return "InputFiltersModule"
  }
  
  @objc func install(_ viewId: NSNumber, filterOptions: NSArray, onError: @escaping RCTResponseSenderBlock) {
    DispatchQueue.main.async {
      do {
        guard let reactView = UIApplication.shared.delegate?.window??.rootViewController?.view,
              let textField = reactView.viewWithTag(viewId.intValue) as? UITextField else {
          throw InputFiltersError("Text input with node handle \"\(viewId.intValue)\" was not found or is not a UITextField")
        }
        
        let filters = try self.getFilters(filterOptions)
        let delegate = InputFilterDelegate(filters)
        self.delegates.append(delegate)
        textField.delegate = delegate
      } catch let error as InputFiltersError {
        onError([error.message])
      } catch {
        onError([error.localizedDescription])
      }
    }
  }
  
  private func getFilters(_ filterOptions: NSArray) throws -> [InputFilter] {
    var filters: [InputFilter] = []
    
    for option in filterOptions {
      guard let optionDict = option as? [String: Any],
            let type = optionDict["type"] as? String else {
        throw InputFiltersError("Input filter's type is nil")
      }
      
      // todo: use strategy pattern. Also on web and android
      if type == "DecimalNumber",
         let maxDigitsBeforeDecimal = optionDict["maxDigitsBeforeDecimal"] as? Int,
         let maxDigitsAfterDecimal = optionDict["maxDigitsAfterDecimal"] as? Int {
        
        filters.append(DecimalNumberFilter(maxDigitsBeforeDecimal, maxDigitsAfterDecimal))
        continue
      }
      
      throw InputFiltersError("Input Filter of type \"\(type)\" was not found")
    }
    
    return filters
  }
}
