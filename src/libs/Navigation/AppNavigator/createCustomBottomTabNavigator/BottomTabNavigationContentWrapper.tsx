import type {EventMapBase, ParamListBase} from '@react-navigation/native';
import {View} from 'react-native';
import ScreenWrapper from '@components/ScreenWrapper';
import useThemeStyles from '@hooks/useThemeStyles';
import type {NavigationContentWrapperProps} from '@libs/Navigation/PlatformStackNavigation/createPlatformStackNavigatorComponent/types';
import type {PlatformSpecificEventMap, PlatformSpecificNavigationOptions} from '@libs/Navigation/PlatformStackNavigation/types';

function BottomTabNavigationContentWrapper({
    children,
    displayName,
}: NavigationContentWrapperProps<PlatformSpecificNavigationOptions, PlatformSpecificEventMap & EventMapBase, ParamListBase>) {
    const styles = useThemeStyles();

    return (
        <ScreenWrapper
            testID={displayName}
            shouldShowOfflineIndicator={false}
        >
            <View style={styles.flex1}>{children}</View>
        </ScreenWrapper>
    );
}

export default BottomTabNavigationContentWrapper;
