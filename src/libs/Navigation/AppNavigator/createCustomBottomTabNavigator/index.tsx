import type {EventMapBase, ParamListBase} from '@react-navigation/native';
import {createNavigatorFactory} from '@react-navigation/native';
import React from 'react';
import createPlatformStackNavigatorComponent from '@libs/Navigation/PlatformStackNavigation/createPlatformStackNavigatorComponent';
import type {TransformStateProps} from '@libs/Navigation/PlatformStackNavigation/createPlatformStackNavigatorComponent/types';
import type {
    PlatformSpecificEventMap,
    PlatformSpecificNavigationOptions,
    PlatformStackNavigationEventMap,
    PlatformStackNavigationOptions,
    PlatformStackNavigationState,
} from '@libs/Navigation/PlatformStackNavigation/types';
import type {NavigationStateRoute} from '@libs/Navigation/types';
import SCREENS from '@src/SCREENS';
import BottomTabBar from './BottomTabBar';
import BottomTabNavigationContentWrapper from './BottomTabNavigationContentWrapper';

function transformState({state}: TransformStateProps<PlatformSpecificNavigationOptions, PlatformSpecificEventMap & EventMapBase, ParamListBase>) {
    const routesToRender = [state.routes.at(-1)] as NavigationStateRoute[];

    // We need to render at least one HOME screen to make sure everything load properly. This may be not necessary after changing how IS_SIDEBAR_LOADED is handled.
    // Currently this value will be switched only after the first HOME screen is rendered.
    if (routesToRender[0].name !== SCREENS.HOME) {
        const routeToRender = state.routes.find((route) => route.name === SCREENS.HOME);
        if (routeToRender) {
            routesToRender.unshift(routeToRender);
        }
    }

    return {stateToRender: {...state, routes: routesToRender, index: routesToRender.length - 1}};
}

const defaultScreenOptions: PlatformStackNavigationOptions = {
    animation: 'none',
};

const CustomBottomTabNavigator = createPlatformStackNavigatorComponent('CustomBottomTabNavigator', {
    transformState,
    defaultScreenOptions,
    NavigationContentWrapper: BottomTabNavigationContentWrapper,
    ExtraContent: () => <BottomTabBar />,
});

function createCustomBottomTabNavigator<ParamList extends ParamListBase>() {
    return createNavigatorFactory<PlatformStackNavigationState<ParamList>, PlatformStackNavigationOptions, PlatformStackNavigationEventMap, typeof CustomBottomTabNavigator>(
        CustomBottomTabNavigator,
    )<ParamList>();
}

export default createCustomBottomTabNavigator;
