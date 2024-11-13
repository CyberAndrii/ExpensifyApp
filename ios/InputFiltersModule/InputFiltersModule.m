#import "React/RCTBridgeModule.h"

@interface RCT_EXTERN_MODULE(InputFiltersModule, NSObject)

RCT_EXTERN_METHOD(install:(nonnull NSNumber *)viewId filterOptions:(nonnull NSArray *)filterOptions onError:(RCTResponseSenderBlock)onError)

@end

