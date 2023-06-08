import { observer } from "mobx-react-lite"
import React, { FC, useEffect, useMemo } from "react"
import {
  AccessibilityProps,
  ActivityIndicator,
  FlatList,
  Image,
  ImageStyle,
  Platform,
  StyleSheet,
  TextStyle,
  View,
  ViewStyle,
} from "react-native"
import Animated, {
  Extrapolate,
  interpolate,
  useAnimatedStyle,
  useSharedValue,
  withSpring,
} from "react-native-reanimated"
import { Button, Card, EmptyState, Icon, Screen, Text, Toggle } from "../components"

import { DemoTabScreenProps } from "../navigators/DemoNavigator"
import { colors, spacing } from "../theme"




export const ViewAllUnsafeRoutes: FC<DemoTabScreenProps<"UnsafePaths">> = observer(
  function ViewAllUnsafeRoutes() {
 

    return (
      <Screen
        preset="fixed"
        safeAreaEdges={["top"]}
        contentContainerStyle={$screenContentContainer}
      >

        
        <View style={$heading}>
              <Text preset="heading" tx="ViewAllUnsafeRoutes.title" />
              <Text preset="subheading" tx="ViewAllUnsafeRoutes.subtitle"  />
        </View>          


        


      
      </Screen>
    )
  },
)

// #region Styles
const $screenContentContainer: ViewStyle = {
  flex: 1,
  height:"100%",
    paddingTop: spacing.large + spacing.extraLarge,
    paddingHorizontal: spacing.large,
}

const $heading: ViewStyle = {
  marginBottom: spacing.medium,
}
