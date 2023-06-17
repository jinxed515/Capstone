import { BottomTabScreenProps, createBottomTabNavigator } from "@react-navigation/bottom-tabs"
import { CompositeScreenProps } from "@react-navigation/native"
import React from "react"
import { TextStyle, ViewStyle } from "react-native"
import { useSafeAreaInsets } from "react-native-safe-area-context"
import { Icon } from "../components"
import { translate } from "../i18n"
import { DemoCommunityScreen, DemoShowroomScreen, DemoDebugScreen, NavigationScreen, StreetLightsScreen } from "../screens"
import { DemoPodcastListScreen } from "../screens/DemoPodcastListScreen"
import { colors, spacing, typography } from "../theme"
import { AppStackParamList, AppStackScreenProps } from "./AppNavigator"
import { ViewAllUnsafeRoutes } from "app/screens/ViewAllUnsafeRoutes"

export type DemoTabParamList = {
  Navigate: undefined
  DemoCommunity: undefined
  DemoShowroom: { queryIndex?: string; itemIndex?: string }
  DemoDebug: undefined
  DemoPodcastList: undefined
  StreetLights: undefined
  UnsafePaths:undefined
}

/**
 * Helper for automatically generating navigation prop types for each route.
 *
 * More info: https://reactnavigation.org/docs/typescript/#organizing-types
 */
export type DemoTabScreenProps<T extends keyof DemoTabParamList> = CompositeScreenProps<
  BottomTabScreenProps<DemoTabParamList, T>,
  AppStackScreenProps<keyof AppStackParamList>
>

const Tab = createBottomTabNavigator<DemoTabParamList>()

export function DemoNavigator() {
  const { bottom } = useSafeAreaInsets()

  return (
    <Tab.Navigator
      screenOptions={{
        headerShown: false,
        tabBarHideOnKeyboard: true,
        tabBarStyle: [$tabBar, { height: bottom + 90 }],
        tabBarActiveTintColor: "#f7c100",
        tabBarInactiveTintColor: colors.textDim,
        tabBarLabelStyle: $tabBarLabel,
        tabBarItemStyle: $tabBarItem,
      }}
    >
      {/* <Tab.Screen
        name="DemoShowroom"
        component={DemoShowroomScreen}
        options={{
          tabBarLabel: translate("demoNavigator.componentsTab"),
          tabBarIcon: ({ focused }) => (
            <Icon icon="components" color={focused ? colors.tint : colors.textDim} size={30} />
          ),
        }}
      /> */}

      <Tab.Screen
        name="StreetLights"
        component={StreetLightsScreen}
        options={{
          tabBarLabel: translate("demoNavigator.streetLightsTab"),
          tabBarIcon: ({ focused }) => (
            <Icon icon="view" color={focused ? "#f7c100" : colors.textDim} size={30} />
          ),
        }}
      /> 
{/*       
      <Tab.Screen
        name="UnsafePaths"
        component={ViewAllUnsafeRoutes}
        options={{
          tabBarLabel: translate("demoNavigator.ViewAllUnsafeRoutes"),
          tabBarIcon: ({ focused }) => (
            <Icon icon="x" color={focused ? colors.tint : colors.textDim} size={30} />
          ),
        }}
      />  */}

      <Tab.Screen
        name="Navigate"
        component={NavigationScreen}
        options={{
          tabBarLabel: translate("demoNavigator.navigationTab"),
          tabBarIcon: ({ focused }) => (
            <Icon icon="pin" color={focused ? "#f7c100" : colors.textDim} size={30} />
          ),
        }}
      />

      <Tab.Screen
        name="DemoDebug"
        component={DemoDebugScreen}
        options={{
          tabBarLabel: translate("demoNavigator.debugTab"),
          tabBarIcon: ({ focused }) => (
            <Icon icon="settings" color={focused ? "#f7c100" : colors.textDim} size={30} />
          ),
        }}
      />

      {/* <Tab.Screen
        name="DemoPodcastList"
        component={DemoPodcastListScreen}
        options={{
          tabBarLabel: translate("demoNavigator.podcastListTab"),
          tabBarIcon: ({ focused }) => (
            <Icon icon="components" color={focused ? colors.tint : colors.textDim} size={30} />
          ),
        }}
      />  */}

    </Tab.Navigator>
  )
}

const $tabBar: ViewStyle = {
  backgroundColor: "#00204f",
  borderTopColor: colors.transparent,
}

const $tabBarItem: ViewStyle = {
  paddingTop: spacing.small,
}

const $tabBarLabel: TextStyle = {
  fontSize: 12,
  fontFamily: typography.primary.medium,
  lineHeight: 16,
  flex: 1,
}

// @demo remove-file
